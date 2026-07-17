import { t as supabase } from "./client-yUNcF_nZ.mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as useActiveBusiness } from "./use-business-CaDVo25M.mjs";
import { V as DollarSign, ct as ArrowUpRight, f as ShoppingCart, o as TrendingUp, ot as Boxes, s as TrendingDown } from "../_libs/lucide-react.mjs";
import { r as PageHeader } from "./page-utils-DmKdauOh.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as fmtCLP } from "./biz-data-DA3ngMFB.mjs";
import { a as XAxis, d as ResponsiveContainer, f as Tooltip, i as YAxis, o as Area, s as CartesianGrid, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-DJdR-ZTr.js
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const { active } = useActiveBusiness();
	const { data: kpis } = useQuery({
		enabled: !!active?.id,
		queryKey: ["kpis", active?.id],
		queryFn: async () => {
			const bid = active.id;
			const [sales, expenses, products, salesCount] = await Promise.all([
				supabase.from("transactions").select("amount").eq("business_id", bid).eq("type", "income"),
				supabase.from("transactions").select("amount").eq("business_id", bid).eq("type", "expense"),
				supabase.from("products").select("stock, price").eq("business_id", bid),
				supabase.from("sales").select("id", {
					count: "exact",
					head: true
				}).eq("business_id", bid).neq("status", "cancelled")
			]);
			const income = (sales.data ?? []).reduce((s, r) => s + Number(r.amount), 0);
			const expense = (expenses.data ?? []).reduce((s, r) => s + Number(r.amount), 0);
			const inventoryValue = (products.data ?? []).reduce((s, r) => s + Number(r.stock) * Number(r.price), 0);
			return {
				income,
				expense,
				net: income - expense,
				inventoryValue,
				salesCount: salesCount.count ?? 0
			};
		}
	});
	const { data: chartData } = useQuery({
		enabled: !!active?.id,
		queryKey: ["chart", active?.id],
		queryFn: async () => {
			const { data } = await supabase.from("transactions").select("amount, type, tx_date").eq("business_id", active.id);
			const byMonth = {};
			const now = /* @__PURE__ */ new Date();
			for (let i = 5; i >= 0; i--) {
				const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
				const key = `${d.getFullYear()}-${d.getMonth()}`;
				byMonth[key] = {
					mes: d.toLocaleDateString("es-CL", { month: "short" }),
					ingresos: 0,
					gastos: 0
				};
			}
			(data ?? []).forEach((r) => {
				const d = new Date(r.tx_date);
				const key = `${d.getFullYear()}-${d.getMonth()}`;
				if (byMonth[key]) if (r.type === "income") byMonth[key].ingresos += Number(r.amount);
				else byMonth[key].gastos += Number(r.amount);
			});
			return Object.values(byMonth);
		}
	});
	const cards = [
		{
			l: "Ingresos",
			v: fmtCLP(kpis?.income ?? 0),
			i: TrendingUp,
			c: "text-success"
		},
		{
			l: "Gastos",
			v: fmtCLP(kpis?.expense ?? 0),
			i: TrendingDown,
			c: "text-destructive"
		},
		{
			l: "Flujo neto",
			v: fmtCLP(kpis?.net ?? 0),
			i: DollarSign,
			c: "text-primary"
		},
		{
			l: "Ventas",
			v: String(kpis?.salesCount ?? 0),
			i: ShoppingCart,
			c: "text-foreground"
		},
		{
			l: "Valor inventario",
			v: fmtCLP(kpis?.inventoryValue ?? 0),
			i: Boxes,
			c: "text-foreground"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: `Hola, ${active?.name ?? "negocio"}`,
			description: "Esto es lo que está pasando hoy."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5",
			children: cards.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5 transition-all hover:-translate-y-0.5 hover:shadow-soft",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-medium text-muted-foreground",
						children: c.l
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(c.i, { className: `h-4 w-4 ${c.c}` })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 text-2xl font-bold tracking-tight",
					children: c.v
				})]
			}, c.l))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-6 lg:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6 lg:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-4 flex items-center justify-between",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold",
						children: "Ingresos vs Gastos"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Últimos 6 meses"
					})] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: 280,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
						data: chartData ?? [],
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
								id: "gi",
								x1: "0",
								y1: "0",
								x2: "0",
								y2: "1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "0%",
									stopColor: "oklch(0.65 0.22 268)",
									stopOpacity: .4
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "100%",
									stopColor: "oklch(0.65 0.22 268)",
									stopOpacity: 0
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
								id: "ge",
								x1: "0",
								y1: "0",
								x2: "0",
								y2: "1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "0%",
									stopColor: "oklch(0.6 0.22 25)",
									stopOpacity: .3
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "100%",
									stopColor: "oklch(0.6 0.22 25)",
									stopOpacity: 0
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								strokeDasharray: "3 3",
								stroke: "oklch(0.92 0.008 270)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "mes",
								stroke: "oklch(0.5 0.02 270)",
								fontSize: 12
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								stroke: "oklch(0.5 0.02 270)",
								fontSize: 12,
								tickFormatter: (v) => `${(v / 1e3).toFixed(0)}k`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
								borderRadius: 12,
								border: "1px solid oklch(0.92 0.008 270)"
							} }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								type: "monotone",
								dataKey: "ingresos",
								stroke: "oklch(0.55 0.22 268)",
								fill: "url(#gi)",
								strokeWidth: 2
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								type: "monotone",
								dataKey: "gastos",
								stroke: "oklch(0.6 0.22 25)",
								fill: "url(#ge)",
								strokeWidth: 2
							})
						]
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold",
						children: "Acciones rápidas"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Lo más usado"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 space-y-2",
						children: [
							{
								l: "Registrar venta",
								h: "/sales"
							},
							{
								l: "Agregar producto",
								h: "/inventory"
							},
							{
								l: "Nueva cotización",
								h: "/quotes"
							},
							{
								l: "Registrar gasto",
								h: "/finance"
							}
						].map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: a.h,
							className: "flex items-center justify-between rounded-lg border p-3 text-sm transition-colors hover:border-primary hover:bg-accent",
							children: [
								a.l,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4 text-muted-foreground" })
							]
						}, a.l))
					})
				]
			})]
		})
	] });
}
//#endregion
export { Dashboard as component };
