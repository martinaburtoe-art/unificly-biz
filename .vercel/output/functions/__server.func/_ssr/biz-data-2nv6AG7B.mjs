import { t as supabase } from "./client-_TVG0p1v.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as useActiveBusiness } from "./use-business-DMRC1wIA.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/biz-data-2nv6AG7B.js
function useBizList(table, opts) {
	const { active } = useActiveBusiness();
	return useQuery({
		enabled: !!active?.id,
		queryKey: [table, active?.id],
		queryFn: async () => {
			const q = supabase.from(table).select("*").eq("business_id", active.id);
			if (opts?.order) q.order(opts.order, { ascending: opts.ascending ?? false });
			const { data, error } = await q;
			if (error) throw error;
			return data ?? [];
		}
	});
}
function useBizInsert(table) {
	const { active } = useActiveBusiness();
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (row) => {
			if (!active) throw new Error("Selecciona un negocio");
			const { error, data } = await supabase.from(table).insert({
				...row,
				business_id: active.id
			}).select().single();
			if (error) throw error;
			return data;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: [table, active?.id] });
			toast.success("Guardado");
		},
		onError: (e) => toast.error(e.message ?? "Error al guardar")
	});
}
function useBizDelete(table) {
	const { active } = useActiveBusiness();
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (id) => {
			const { error } = await supabase.from(table).delete().eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: [table, active?.id] });
			toast.success("Eliminado");
		},
		onError: (e) => toast.error(e.message ?? "Error al eliminar")
	});
}
function useBizUpdate(table) {
	const { active } = useActiveBusiness();
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async ({ id, patch }) => {
			const { error } = await supabase.from(table).update(patch).eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: [table, active?.id] });
			toast.success("Actualizado");
		},
		onError: (e) => toast.error(e.message ?? "Error")
	});
}
var fmtCLP = (n) => new Intl.NumberFormat("es-CL", {
	style: "currency",
	currency: "CLP",
	maximumFractionDigits: 0
}).format(n);
//#endregion
export { useBizUpdate as a, useBizList as i, useBizDelete as n, useBizInsert as r, fmtCLP as t };
