-- Root cause finally confirmed via browser network logs (both in the
-- Lovable preview and in a local dev run): the failing request was not the
-- INSERT into businesses itself, but the implicit SELECT PostgREST performs
-- right after an insert when the client calls .select("id") (Prefer:
-- return=representation). That SELECT is evaluated against the "Members
-- see business" policy, which depends entirely on is_business_member(),
-- which in turn depends on a row existing in business_members -- a row
-- only created by the trg_add_owner_as_member AFTER INSERT trigger.
--
-- Within the same statement-level transaction, the ordering/visibility of
-- that trigger's effect relative to the RETURNING clause's RLS check was
-- not reliable enough in practice, causing the return-representation
-- SELECT to fail with 403 even though the INSERT itself succeeded.
--
-- Fix: let the SELECT policy also directly recognize the business owner,
-- without requiring a business_members row to exist at all. This removes
-- the dependency on trigger timing entirely for this specific case --
-- ownership is a column on the row being read, so it can be checked
-- directly with no extra lookup.

DROP POLICY IF EXISTS "Members see business" ON public.businesses;

CREATE POLICY "Members or owner see business" ON public.businesses
  FOR SELECT
  USING (
    auth.uid() = owner_id
    OR public.is_business_member(id, auth.uid())
  );
