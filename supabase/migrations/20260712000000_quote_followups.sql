-- Seguimiento automático de cotizaciones: re-enganche por WhatsApp cuando una
-- cotización queda en 'sent'/'viewed' sin respuesta, y auto-expiración cuando
-- pasa su valid_until. No toca el flujo manual existente (crear/editar/PDF/convertir a venta).

ALTER TABLE public.quotes
  ADD COLUMN IF NOT EXISTS sent_at TIMESTAMPTZ;

-- Registra cuándo una cotización pasó a 'sent' por primera vez (para medir
-- "días sin respuesta" de forma confiable, sin importar cuántas veces cambie de estado luego).
CREATE OR REPLACE FUNCTION public.stamp_quote_sent_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.status = 'sent' AND NEW.sent_at IS NULL THEN
    NEW.sent_at := now();
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_stamp_quote_sent_at ON public.quotes;
CREATE TRIGGER trg_stamp_quote_sent_at
  BEFORE INSERT OR UPDATE OF status ON public.quotes
  FOR EACH ROW EXECUTE FUNCTION public.stamp_quote_sent_at();

-- Log de mensajes de re-enganche enviados (misma auditoría que collection_reminders).
CREATE TABLE IF NOT EXISTS public.quote_followups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  quote_id UUID NOT NULL REFERENCES public.quotes(id) ON DELETE CASCADE,
  channel TEXT NOT NULL DEFAULT 'whatsapp',
  status TEXT NOT NULL DEFAULT 'sent' CHECK (status IN ('sent','failed')),
  message_content TEXT,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.quote_followups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members view quote followups" ON public.quote_followups
  FOR SELECT USING (private.is_business_member(business_id, auth.uid()));

CREATE INDEX IF NOT EXISTS idx_quotes_sent_pending
  ON public.quotes(business_id, sent_at)
  WHERE status IN ('sent','viewed');

CREATE INDEX IF NOT EXISTS idx_quote_followups_quote
  ON public.quote_followups(quote_id, sent_at DESC);
