import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-yUNcF_nZ.js
function createSupabaseClient() {
	return createClient("https://vnzyecnbdqbfuxawzrda.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZuenllY25iZHFiZnV4YXd6cmRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2MTUzMDUsImV4cCI6MjA5MTE5MTMwNX0.KjXT7vEF2fPgjG48wMMsOjiiWbyaTgC8ZNpOlDEXj6Q", { auth: {
		storage: typeof window !== "undefined" ? localStorage : void 0,
		persistSession: true,
		autoRefreshToken: true
	} });
}
var _supabase;
var supabase = new Proxy({}, { get(_, prop, receiver) {
	if (!_supabase) _supabase = createSupabaseClient();
	return Reflect.get(_supabase, prop, receiver);
} });
//#endregion
export { supabase as t };
