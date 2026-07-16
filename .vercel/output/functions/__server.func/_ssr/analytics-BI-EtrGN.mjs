import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { C as Package, V as DollarSign, i as Users, o as TrendingUp } from "../_libs/lucide-react.mjs";
import { r as PageHeader } from "./page-utils-DmKdauOh.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { i as useBizList, t as fmtCLP } from "./biz-data-2nv6AG7B.mjs";
import { a as XAxis, c as Bar, d as ResponsiveContainer, f as Tooltip, i as YAxis, r as BarChart, s as CartesianGrid } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analytics-BI-EtrGN.js
var import_jsx_runtime = require_jsx_runtime();
function Analytics() {
	const { data: sales } = useBizList("sales");
	const { data: products } = useBizList("products");
	const { data: tx } = useBizList("transactions");
	const totalSales = (sales ?? []).reduce((s, x) => s + Number(x.total), 0);
	const avgTicket = sales && sales.length > 0 ? totalSales / sales.length : 0;
	const income = (tx ?? []).filter((t) => t.type === "income").reduce((s, t) => s + Number(t.amount), 0);
	const expense = (tx ?? []).filter((t) => t.type === "expense").reduce((s, t) => s + Number(t.amount), 0);
	const cashFlowMargin = income > 0 ? (income - expense) / income * 100 : 0;
	const inventoryUnits = (products ?? []).reduce((s, p) => s + p.stock, 0);
	const productById = {};
	(products ?? []).forEach((p) => {
		productById[p.id] = p;
	});
	let revenueFromItems = 0;
	let costFromItems = 0;
	(sales ?? []).forEach((s) => {
		(s.items ?? []).forEach((it) => {
			const qty = Number(it.qty) || 0;
			const price = Number(it.price) || 0;
			revenueFromItems += qty * price;
			const product = it.product_id ? productById[it.product_id] : null;
			if (product) costFromItems += qty * Number(product.cost ?? 0);
		});
	});
	const grossMargin = revenueFromItems > 0 ? (revenueFromItems - costFromItems) / revenueFromItems * 100 : null;
	const kpis = [
		{
			l: "Margen bruto (ventas)",
			v: grossMargin !== null ? `${grossMargin.toFixed(1)}%` : "Sin datos",
			i: TrendingUp
		},
		{
			l: "Margen de caja",
			v: `${cashFlowMargin.toFixed(1)}%`,
			i: DollarSign
		},
		{
			l: "Ticket promedio",
			v: fmtCLP(avgTicket),
			i: DollarSign
		},
		{
			l: "Unidades en stock",
			v: String(inventoryUnits),
			i: Package
		},
		{
			l: "Clientes únicos",
			v: String(new Set((sales ?? []).map((s) => s.customer_name)).size),
			i: Users
		}
	];
	const byChannel = {};
	(sales ?? []).forEach((s) => {
		byChannel[s.channel] = (byChannel[s.channel] ?? 0) + Number(s.total);
	});
	const channelData = Object.entries(byChannel).map(([canal, total]) => ({
		canal,
		total
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Indicadores",
			description: "Las métricas clave de tu negocio"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 md:grid-cols-2 lg:grid-cols-5",
			children: kpis.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground",
						children: k.l
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(k.i, { className: "h-4 w-4 text-primary" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 text-2xl font-bold",
					children: k.v
				})]
			}, k.l))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-6 p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-semibold",
				children: "Ventas por canal"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: 280,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
					data: channelData,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
							strokeDasharray: "3 3",
							stroke: "oklch(0.92 0.008 270)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
							dataKey: "canal",
							stroke: "oklch(0.5 0.02 270)",
							fontSize: 12
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
							stroke: "oklch(0.5 0.02 270)",
							fontSize: 12,
							tickFormatter: (v) => `${(v / 1e3).toFixed(0)}k`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							formatter: (v) => fmtCLP(v),
							contentStyle: {
								borderRadius: 12,
								border: "1px solid oklch(0.92 0.008 270)"
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							dataKey: "total",
							fill: "oklch(0.55 0.22 268)",
							radius: [
								8,
								8,
								0,
								0
							]
						})
					]
				})
			})]
		})
	] });
}
//#endregion
export { Analytics as component };
