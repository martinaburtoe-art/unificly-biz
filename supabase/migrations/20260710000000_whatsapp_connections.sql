-- WhatsApp Business Cloud API connection per business. Powers a built-in
-- ("por defecto") automation: once a business links its own WhatsApp number,
-- customers can message it and get real stock/price answers automatically --
-- no external automation tool (n8n, Make, etc.) required for this flow.
-- Meta's Cloud API is free up to 1,000 conversations/month.
CREATE TABLE public.whatsapp_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  phone_number_id text NOT NULL UNIQUE,
  waba_id text,
  display_phone_number text,
  access_token text NOT NULL,
  auto_stock_query boolean NOT NULL DEFAULT true,
  auto_price_query boolean NOT NULL DEFAULT true,
  auto_general_ai boolean NOT NULL DEFAULT true,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (business_id)
);

ALTER TABLE public.whatsapp_connections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owner/admin manage whatsapp connection" ON public.whatsapp_connections
  FOR ALL USING (private.has_business_role(business_id, auth.uid(), ARRAY['owner'::member_role, 'admin'::member_role]))
  WITH CHECK (private.has_business_role(business_id, auth.uid(), ARRAY['owner'::member_role, 'admin'::member_role]));

CREATE INDEX idx_whatsapp_connections_business_id ON public.whatsapp_connections(business_id);
CREATE INDEX idx_whatsapp_connections_phone_number_id ON public.whatsapp_connections(phone_number_id);

CREATE TRIGGER touch_whatsapp_connections
  BEFORE UPDATE ON public.whatsapp_connections
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE public.whatsapp_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  from_number text NOT NULL,
  direction text NOT NULL CHECK (direction IN ('in', 'out')),
  intent text,
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.whatsapp_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members view whatsapp messages" ON public.whatsapp_messages
  FOR SELECT USING (private.is_business_member(business_id, auth.uid()));

CREATE INDEX idx_whatsapp_messages_business_id ON public.whatsapp_messages(business_id, created_at DESC);
