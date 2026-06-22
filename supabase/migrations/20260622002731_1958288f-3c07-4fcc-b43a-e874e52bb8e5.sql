
REVOKE EXECUTE ON FUNCTION public.is_business_member(UUID, UUID) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.has_business_role(UUID, UUID, public.member_role[]) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.add_owner_as_member() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.is_business_member(UUID, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_business_role(UUID, UUID, public.member_role[]) TO authenticated;
