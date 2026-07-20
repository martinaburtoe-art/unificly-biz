-- Viewers pueden leer pero no escribir/borrar en tablas operativas.
DO $$
DECLARE t TEXT;
BEGIN
  FOR t IN SELECT unnest(ARRAY['customers','suppliers','products','sales','purchases','transactions','quotes','automations','marketing_posts','audit_log'])
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS "Members access %1$s" ON public.%1$I', t);
    EXECUTE format('CREATE POLICY "Members read %1$s" ON public.%1$I FOR SELECT USING (private.is_business_member(business_id, auth.uid()))', t);
    EXECUTE format('CREATE POLICY "Staff+ write %1$s" ON public.%1$I FOR INSERT WITH CHECK (private.has_business_role(business_id, auth.uid(), ARRAY[''owner'',''admin'',''staff'']::member_role[]))', t);
    EXECUTE format('CREATE POLICY "Staff+ update %1$s" ON public.%1$I FOR UPDATE USING (private.has_business_role(business_id, auth.uid(), ARRAY[''owner'',''admin'',''staff'']::member_role[]))', t);
    EXECUTE format('CREATE POLICY "Staff+ delete %1$s" ON public.%1$I FOR DELETE USING (private.has_business_role(business_id, auth.uid(), ARRAY[''owner'',''admin'',''staff'']::member_role[]))', t);
  END LOOP;
END $$;
