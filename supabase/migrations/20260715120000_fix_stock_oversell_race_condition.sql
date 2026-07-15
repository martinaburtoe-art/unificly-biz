-- FIX: apply_sale_effects() silently clamped stock at 0 with GREATEST(0, stock - qty)
-- instead of blocking the sale when there isn't enough stock. Under concurrent sales
-- (e.g. two Caja/POS tablets selling the last unit at the same time), both sales could
-- succeed and the shop would oversell without any error — the exact race condition the
-- Caja/POS module was supposed to prevent.
--
-- This migration makes the stock decrement atomic AND authoritative: the UPDATE only
-- succeeds if there is enough stock (row-locked, race-safe under Postgres's default
-- read-committed behavior), and raises an exception otherwise. Because the trigger runs
-- BEFORE INSERT, the exception rolls back the entire sale (and its stock/transaction
-- side effects) — no partial state, matching the original "single atomic transaction"
-- requirement.

CREATE OR REPLACE FUNCTION public.apply_sale_effects()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  item JSONB;
  tx_id UUID;
  should_apply BOOLEAN;
  qty_needed INT;
  product_name TEXT;
  updated_id UUID;
BEGIN
  should_apply := (NEW.status IN ('paid','pending')) AND NOT NEW.stock_applied;

  IF should_apply THEN
    FOR item IN SELECT * FROM jsonb_array_elements(COALESCE(NEW.items, '[]'::jsonb))
    LOOP
      IF (item->>'product_id') IS NOT NULL AND (item->>'product_id') != '' THEN
        qty_needed := COALESCE((item->>'qty')::int, 0);

        UPDATE public.products
        SET stock = stock - qty_needed
        WHERE id = (item->>'product_id')::uuid
          AND business_id = NEW.business_id
          AND stock >= qty_needed
        RETURNING id INTO updated_id;

        IF updated_id IS NULL THEN
          SELECT name INTO product_name FROM public.products
            WHERE id = (item->>'product_id')::uuid AND business_id = NEW.business_id;
          RAISE EXCEPTION 'Stock insuficiente para "%": no hay % unidades disponibles',
            COALESCE(product_name, item->>'name'), qty_needed
            USING ERRCODE = 'check_violation';
        END IF;
      END IF;
    END LOOP;

    IF NEW.transaction_id IS NULL AND NEW.total > 0 THEN
      INSERT INTO public.transactions (business_id, type, category, amount, description, tx_date)
      VALUES (NEW.business_id, 'income', 'Ventas', NEW.total, 'Venta: ' || COALESCE(NEW.customer_name, 'Cliente'), NEW.sale_date)
      RETURNING id INTO tx_id;
      NEW.transaction_id := tx_id;
    END IF;

    NEW.stock_applied := true;
  END IF;

  RETURN NEW;
END;
$$;
