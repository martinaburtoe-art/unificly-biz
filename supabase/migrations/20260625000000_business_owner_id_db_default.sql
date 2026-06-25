-- Fix: a one-off 42501 (RLS violation) was observed creating a business
-- where owner_id, built client-side from supabase.auth.getUser(), did not
-- match auth.uid() as evaluated by PostgREST for that specific request --
-- most likely a session/token refresh race on the client between reading
-- the user id in JS and the request actually going out.
--
-- Rather than trust the client to send the correct owner_id at all, let
-- Postgres fill it in itself from the JWT attached to the very request
-- being evaluated. This removes the race entirely: there is no longer a
-- window where a JS-held user id and the request's actual auth.uid() can
-- diverge, because the column default IS auth.uid() at insert time.

ALTER TABLE public.businesses ALTER COLUMN owner_id SET DEFAULT auth.uid();

-- Defense in depth: even if a client still sends an owner_id explicitly,
-- the existing "Owner creates business" WITH CHECK (auth.uid() = owner_id)
-- policy continues to reject any mismatched value. This migration only
-- removes the failure mode where the client's own value was the problem.
