import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-yUNcF_nZ.mjs";
import { o as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { r as useMyRole, t as useActiveBusiness } from "./use-business-CaDVo25M.mjs";
import { E as MessageCircle, Q as ChevronLeft, Z as ChevronRight, b as Plus, c as Trash2, j as Lock } from "../_libs/lucide-react.mjs";
import { r as PageHeader } from "./page-utils-DmKdauOh.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Skeleton } from "./skeleton-D9W9wFsj.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shifts-C275opmf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DAYS = [
	"Lunes",
	"Martes",
	"Miércoles",
	"Jueves",
	"Viernes",
	"Sábado",
	"Domingo"
];
function getWeekStart(offsetWeeks = 0) {
	const now = /* @__PURE__ */ new Date();
	const day = now.getDay() === 0 ? 7 : now.getDay();
	const monday = new Date(now);
	monday.setDate(now.getDate() - day + 1 + offsetWeeks * 7);
	return monday.toISOString().slice(0, 10);
}
function ShiftsTable({ businessId }) {
	const [weekOffset, setWeekOffset] = (0, import_react.useState)(0);
	const weekStart = (0, import_react.useMemo)(() => getWeekStart(weekOffset), [weekOffset]);
	const queryClient = useQueryClient();
	const { data: shifts, isLoading } = useQuery({
		queryKey: [
			"shifts",
			businessId,
			weekStart
		],
		queryFn: async () => {
			const { data, error } = await supabase.from("shifts").select("id, employee_name, employee_phone, day_of_week, start_time, end_time, week_start").eq("business_id", businessId).eq("week_start", weekStart).order("day_of_week", { ascending: true });
			if (error) throw error;
			return data ?? [];
		}
	});
	const [draft, setDraft] = (0, import_react.useState)({
		employee_name: "",
		employee_phone: "",
		day_of_week: 0,
		start_time: "09:00",
		end_time: "18:00"
	});
	async function addShift() {
		if (!draft.employee_name.trim()) {
			toast.error("Ingresa el nombre del empleado");
			return;
		}
		const { error } = await supabase.from("shifts").insert({
			business_id: businessId,
			week_start: weekStart,
			employee_name: draft.employee_name.trim(),
			employee_phone: draft.employee_phone.trim() || null,
			day_of_week: draft.day_of_week,
			start_time: draft.start_time,
			end_time: draft.end_time
		});
		if (error) {
			toast.error("No se pudo guardar el turno");
			return;
		}
		setDraft((d) => ({
			...d,
			employee_name: "",
			employee_phone: ""
		}));
		queryClient.invalidateQueries({ queryKey: [
			"shifts",
			businessId,
			weekStart
		] });
		toast.success("Turno agregado");
	}
	async function deleteShift(id) {
		const { error } = await supabase.from("shifts").delete().eq("id", id);
		if (error) {
			toast.error("No se pudo eliminar");
			return;
		}
		queryClient.invalidateQueries({ queryKey: [
			"shifts",
			businessId,
			weekStart
		] });
	}
	function sendWhatsApp(shift) {
		if (!shift.employee_phone) {
			toast.error("Este empleado no tiene teléfono registrado");
			return;
		}
		const msg = encodeURIComponent(`Hola ${shift.employee_name}, tu turno es el ${DAYS[shift.day_of_week]} de ${shift.start_time.slice(0, 5)} a ${shift.end_time.slice(0, 5)}.`);
		const phone = shift.employee_phone.replace(/\D/g, "");
		window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
	}
	function sendAllWhatsApp() {
		if (!shifts || shifts.length === 0) return;
		const withPhone = shifts.filter((s) => s.employee_phone);
		if (withPhone.length === 0) {
			toast.error("Ningún empleado tiene teléfono registrado");
			return;
		}
		withPhone.forEach((s, i) => setTimeout(() => sendWhatsApp(s), i * 400));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "icon",
							onClick: () => setWeekOffset((w) => w - 1),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm font-medium",
							children: [
								"Semana del",
								" ",
								(/* @__PURE__ */ new Date(weekStart + "T00:00:00")).toLocaleDateString("es-CL", {
									day: "2-digit",
									month: "long"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "icon",
							onClick: () => setWeekOffset((w) => w + 1),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					onClick: sendAllWhatsApp,
					disabled: !shifts?.length,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4 mr-2" }), " Enviar todos por WhatsApp"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-4 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: "Agregar turno"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 sm:grid-cols-5 gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Nombre del empleado",
								value: draft.employee_name,
								onChange: (e) => setDraft((d) => ({
									...d,
									employee_name: e.target.value
								}))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Teléfono (56912345678)",
								value: draft.employee_phone,
								onChange: (e) => setDraft((d) => ({
									...d,
									employee_phone: e.target.value
								}))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: "border rounded-md px-3 py-2 text-sm bg-background",
								value: draft.day_of_week,
								onChange: (e) => setDraft((d) => ({
									...d,
									day_of_week: Number(e.target.value)
								})),
								children: DAYS.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: i,
									children: d
								}, i))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "time",
								value: draft.start_time,
								onChange: (e) => setDraft((d) => ({
									...d,
									start_time: e.target.value
								}))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "time",
								value: draft.end_time,
								onChange: (e) => setDraft((d) => ({
									...d,
									end_time: e.target.value
								}))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: addShift,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4 mr-2" }), " Agregar"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "p-0 overflow-hidden",
				children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-6 w-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-6 w-full" })]
				}) : !shifts?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "p-6 text-sm text-muted-foreground text-center",
					children: "Sin turnos asignados esta semana."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Empleado" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Día" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Horario" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: "Acciones"
					})
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: shifts.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: s.employee_name }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: DAYS[s.day_of_week] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: [
						s.start_time.slice(0, 5),
						" – ",
						s.end_time.slice(0, 5)
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
						className: "text-right space-x-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: () => sendWhatsApp(s),
							title: "Enviar por WhatsApp",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: () => deleteShift(s.id),
							title: "Eliminar",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
						})]
					})
				] }, s.id)) })] })
			})
		]
	});
}
function ShiftsPage() {
	const { active } = useActiveBusiness();
	const { data: myRole } = useMyRole();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Turnos",
			description: "Organiza y asigna los horarios de tu equipo, semana a semana."
		}), !(myRole === "owner" || myRole === "admin") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-6 flex items-center gap-2 text-muted-foreground text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4" }), "Solo el propietario o administradores pueden gestionar los turnos."]
		}) : active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShiftsTable, { businessId: active.id }) : null]
	});
}
//#endregion
export { ShiftsPage as component };
