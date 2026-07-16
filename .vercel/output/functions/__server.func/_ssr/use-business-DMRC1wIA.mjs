import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-_TVG0p1v.mjs";
import { o as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-business-DMRC1wIA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var KEY = "novaflow.active_business_id";
function useBusinesses() {
	return useQuery({
		queryKey: ["businesses"],
		queryFn: async () => {
			const { data, error } = await supabase.from("businesses").select("id, name, industry, logo_url, owner_id, webhook_url").order("created_at", { ascending: true });
			if (error) throw error;
			return data ?? [];
		}
	});
}
function useActiveBusinessId() {
	const [id, setIdState] = (0, import_react.useState)(() => typeof window === "undefined" ? null : localStorage.getItem(KEY));
	const setId = (0, import_react.useCallback)((newId) => {
		if (typeof window !== "undefined") if (newId) localStorage.setItem(KEY, newId);
		else localStorage.removeItem(KEY);
		setIdState(newId);
	}, []);
	(0, import_react.useEffect)(() => {
		const onStorage = () => setIdState(localStorage.getItem(KEY));
		window.addEventListener("storage", onStorage);
		return () => window.removeEventListener("storage", onStorage);
	}, []);
	return [id, setId];
}
function useActiveBusiness() {
	const [activeId, setActiveId] = useActiveBusinessId();
	const { data: businesses, isLoading } = useBusinesses();
	const active = businesses?.find((b) => b.id === activeId) ?? businesses?.[0] ?? null;
	(0, import_react.useEffect)(() => {
		if (!activeId && businesses && businesses.length > 0) setActiveId(businesses[0].id);
	}, [
		activeId,
		businesses,
		setActiveId
	]);
	return {
		active,
		businesses: businesses ?? [],
		setActiveId,
		isLoading
	};
}
function useMyRole() {
	const { active } = useActiveBusiness();
	return useQuery({
		enabled: !!active?.id,
		queryKey: ["my-role", active?.id],
		queryFn: async () => {
			const { data: userData } = await supabase.auth.getUser();
			if (!userData.user || !active) return null;
			const { data, error } = await supabase.from("business_members").select("role").eq("business_id", active.id).eq("user_id", userData.user.id).maybeSingle();
			if (error) throw error;
			return data?.role ?? null;
		}
	});
}
//#endregion
export { useBusinesses as n, useMyRole as r, useActiveBusiness as t };
