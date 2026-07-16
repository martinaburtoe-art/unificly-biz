import { i as __toESM } from "../_runtime.mjs";
import { o as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useActiveBusiness } from "./use-business-DMRC1wIA.mjs";
import { B as Download, H as CreditCard, L as FileText, R as FileDown, b as Plus, c as Trash2, j as Lock } from "../_libs/lucide-react.mjs";
import { n as EmptyState, r as PageHeader, t as ComingSoonBadge } from "./page-utils-DmKdauOh.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as useBizList, n as useBizDelete, r as useBizInsert, t as fmtCLP } from "./biz-data-2nv6AG7B.mjs";
import { d as ResponsiveContainer, f as Tooltip, l as Pie, n as PieChart, u as Cell } from "../_libs/recharts+[...].mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CCJRliUM.mjs";
import { a as DialogTrigger, i as DialogTitle, n as DialogContent, r as DialogHeader, t as Dialog } from "./dialog-OJN88XlQ.mjs";
import { t as Skeleton } from "./skeleton-D9W9wFsj.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { t as downloadCsv } from "./export-CDq3cmOv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/finance-DO5xJdrl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
async function generateMonthlyReportPdf(businessName, txs, monthLabel) {
	const mod = await import(
		/* @vite-ignore */
		"jspdf"
);
	const doc = new (mod.default ?? mod.jsPDF ?? mod)({
		unit: "pt",
		format: "a4"
	});
	const marginX = 48;
	let y = 56;
	doc.setFontSize(20);
	doc.setFont("helvetica", "bold");
	doc.text(businessName || "Reporte", marginX, y);
	y += 20;
	doc.setFontSize(12);
	doc.setFont("helvetica", "normal");
	doc.text(`Reporte financiero mensual — ${monthLabel}`, marginX, y);
	y += 30;
	const income = txs.filter((t) => t.type === "income").reduce((s, t) => s + Number(t.amount), 0);
	const expense = txs.filter((t) => t.type === "expense").reduce((s, t) => s + Number(t.amount), 0);
	const net = income - expense;
	const kpi = (label, val) => {
		doc.setFont("helvetica", "bold");
		doc.text(label, marginX, y);
		doc.setFont("helvetica", "normal");
		doc.text(val, 248, y);
		y += 18;
	};
	kpi("Ingresos totales:", fmtCLP(income));
	kpi("Gastos totales:", fmtCLP(expense));
	kpi("Flujo neto:", fmtCLP(net));
	y += 12;
	const byCat = /* @__PURE__ */ new Map();
	txs.forEach((t) => {
		const k = t.category || "Sin categoría";
		const cur = byCat.get(k) ?? {
			income: 0,
			expense: 0
		};
		if (t.type === "income") cur.income += Number(t.amount);
		else cur.expense += Number(t.amount);
		byCat.set(k, cur);
	});
	doc.setFont("helvetica", "bold");
	doc.setFontSize(13);
	doc.text("Desglose por categoría", marginX, y);
	y += 18;
	doc.setFontSize(10);
	doc.text("Categoría", marginX, y);
	doc.text("Ingresos", 308, y);
	doc.text("Gastos", 428, y);
	y += 6;
	doc.line(marginX, y, 547, y);
	y += 12;
	doc.setFont("helvetica", "normal");
	for (const [cat, v] of byCat.entries()) {
		if (y > 780) {
			doc.addPage();
			y = 56;
		}
		doc.text(cat.slice(0, 40), marginX, y);
		doc.text(fmtCLP(v.income), 308, y);
		doc.text(fmtCLP(v.expense), 428, y);
		y += 16;
	}
	y += 8;
	doc.setFontSize(8);
	doc.setTextColor(120);
	doc.text(`Generado por Nüva One — ${(/* @__PURE__ */ new Date()).toLocaleDateString("es-CL")}`, marginX, y + 10);
	doc.save(`reporte-${monthLabel.replace(/\s+/g, "-").toLowerCase()}.pdf`);
}
function Finance() {
	const { active } = useActiveBusiness();
	const { data: tx, isLoading } = useBizList("transactions", { order: "tx_date" });
	const { data: sales } = useBizList("sales");
	const { data: purchases } = useBizList("purchases");
	const insert = useBizInsert("transactions");
	const del = useBizDelete("transactions");
	const [open, setOpen] = (0, import_react.useState)(false);
	async function exportPdf() {
		const now = /* @__PURE__ */ new Date();
		const y = now.getFullYear();
		const m = now.getMonth();
		const monthTx = (tx ?? []).filter((t) => {
			const d = new Date(t.tx_date);
			return d.getFullYear() === y && d.getMonth() === m;
		});
		if (monthTx.length === 0) {
			toast.info("No hay movimientos este mes para reportar");
			return;
		}
		const label = now.toLocaleDateString("es-CL", {
			month: "long",
			year: "numeric"
		});
		try {
			await generateMonthlyReportPdf(active?.name ?? "Negocio", monthTx, label);
		} catch {
			toast.error("Error al generar el PDF");
		}
	}
	const autoTxIds = new Set([...(sales ?? []).map((s) => s.transaction_id).filter(Boolean), ...(purchases ?? []).map((p) => p.transaction_id).filter(Boolean)]);
	function handleDelete(t) {
		if (autoTxIds.has(t.id)) {
			toast.error("Este movimiento se generó automáticamente desde una venta o compra. Cancela o elimina el registro original en Ventas/Compras en su lugar.");
			return;
		}
		del.mutate(t.id);
	}
	async function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		await insert.mutateAsync({
			type: fd.get("type"),
			category: fd.get("category"),
			amount: Number(fd.get("amount")),
			description: fd.get("description")
		});
		setOpen(false);
	}
	const income = (tx ?? []).filter((t) => t.type === "income").reduce((s, t) => s + Number(t.amount), 0);
	const expense = (tx ?? []).filter((t) => t.type === "expense").reduce((s, t) => s + Number(t.amount), 0);
	const expByCat = {};
	(tx ?? []).filter((t) => t.type === "expense").forEach((t) => {
		expByCat[t.category ?? "Otros"] = (expByCat[t.category ?? "Otros"] ?? 0) + Number(t.amount);
	});
	const pieData = Object.entries(expByCat).map(([name, value]) => ({
		name,
		value
	}));
	const creditSales = (sales ?? []).filter((s) => s.is_credit && s.status !== "cancelled");
	const receivable = creditSales.reduce((sum, s) => sum + (Number(s.total) - Number(s.paid_amount)), 0);
	const overdueSales = creditSales.filter((s) => Number(s.paid_amount) < Number(s.total) && s.due_date && new Date(s.due_date) < /* @__PURE__ */ new Date());
	const overdueTotal = overdueSales.reduce((sum, s) => sum + (Number(s.total) - Number(s.paid_amount)), 0);
	const COLORS = [
		"oklch(0.55 0.22 268)",
		"oklch(0.6 0.22 25)",
		"oklch(0.75 0.17 70)",
		"oklch(0.65 0.17 155)",
		"oklch(0.5 0.15 320)"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Finanzas",
			description: "Ingresos, gastos y flujo de caja",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						disabled: !tx || tx.length === 0,
						onClick: () => downloadCsv("movimientos.csv", (tx ?? []).map((t) => ({
							fecha: t.tx_date,
							tipo: t.type,
							categoria: t.category ?? "",
							monto: t.amount,
							descripcion: t.description ?? ""
						}))),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-1.5 h-4 w-4" }), " CSV"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						onClick: exportPdf,
						disabled: !tx || tx.length === 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileDown, { className: "mr-1.5 h-4 w-4" }), " Reporte PDF"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
						open,
						onOpenChange: setOpen,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1.5 h-4 w-4" }), "Nuevo movimiento"] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Registrar movimiento" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit,
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Tipo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									name: "type",
									required: true,
									className: "mt-1.5 w-full rounded-md border bg-background px-3 py-2 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "income",
										children: "Ingreso"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "expense",
										children: "Gasto"
									})]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "category",
									children: "Categoría"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "category",
									name: "category",
									placeholder: "Ej: Ventas, Arriendo, Sueldos"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "amount",
									children: "Monto (CLP)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "amount",
									name: "amount",
									type: "number",
									min: 0,
									required: true
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "description",
									children: "Descripción"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "description",
									name: "description"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									className: "w-full",
									children: "Guardar"
								})
							]
						})] })]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: "Ingresos totales"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-2xl font-bold text-success",
						children: fmtCLP(income)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: "Gastos totales"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-2xl font-bold text-destructive",
						children: fmtCLP(expense)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: "Flujo neto"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-2xl font-bold text-primary",
						children: fmtCLP(income - expense)
					})]
				})
			]
		}),
		creditSales.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-4 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs text-muted-foreground",
					children: "Por cobrar (fiado)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 text-2xl font-bold text-warning",
					children: fmtCLP(receivable)
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs text-muted-foreground",
					children: [
						"Vencido (",
						overdueSales.length,
						" venta",
						overdueSales.length === 1 ? "" : "s",
						")"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 text-2xl font-bold text-destructive",
					children: fmtCLP(overdueTotal)
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "ledger",
			className: "mt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "ledger",
						children: "Movimientos"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "breakdown",
						children: "Gastos por categoría"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "receivables",
						children: "Por cobrar"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "invoicing",
						children: "Facturación"
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "ledger",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-6 space-y-3",
						children: [...Array(4)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-12 w-full" }, i))
					}) : !tx || tx.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						icon: CreditCard,
						title: "Sin movimientos",
						description: "Registra tu primer ingreso o gasto."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Fecha" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Tipo" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Categoría" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Descripción" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "text-right",
							children: "Monto"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: tx.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-muted-foreground",
							children: new Date(t.tx_date).toLocaleDateString("es-CL")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							className: t.type === "income" ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive",
							children: t.type === "income" ? "Ingreso" : "Gasto"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: t.category ?? "—" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5",
								children: [autoTxIds.has(t.id) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-3 w-3 shrink-0" }), t.description ?? "—"]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: `text-right font-medium ${t.type === "income" ? "text-success" : "text-destructive"}`,
							children: fmtCLP(Number(t.amount))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: () => handleDelete(t),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
						}) })
					] }, t.id)) })] }) })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "breakdown",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "p-6",
						children: pieData.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							title: "Sin datos para mostrar",
							description: "Registra gastos para ver la distribución."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: 320,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
								data: pieData,
								dataKey: "value",
								nameKey: "name",
								outerRadius: 120,
								label: true,
								children: pieData.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: COLORS[i % COLORS.length] }, i))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { formatter: (v) => fmtCLP(v) })] })
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "receivables",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: creditSales.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						icon: CreditCard,
						title: "Sin ventas a crédito",
						description: "Marca una venta como 'fiado' en Ventas para hacerle seguimiento aquí."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Cliente" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Vence" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Estado" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "text-right",
							children: "Pendiente"
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: creditSales.slice().sort((a, b) => new Date(a.due_date ?? 0).getTime() - new Date(b.due_date ?? 0).getTime()).map((s) => {
						const pending = Number(s.total) - Number(s.paid_amount);
						const isOverdue = pending > 0 && s.due_date && new Date(s.due_date) < /* @__PURE__ */ new Date();
						const isPaid = pending <= 0;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "font-medium",
								children: s.customer_name ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-muted-foreground",
								children: s.due_date ? new Date(s.due_date).toLocaleDateString("es-CL") : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: isPaid ? "bg-success/15 text-success" : isOverdue ? "bg-destructive/15 text-destructive" : "bg-warning/15 text-warning",
								children: isPaid ? "Pagada" : isOverdue ? "Vencida" : "Por cobrar"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right font-medium",
								children: fmtCLP(pending)
							})
						] }, s.id);
					}) })] }) })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "invoicing",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-6 w-6 text-primary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-semibold",
										children: "Facturación electrónica SII"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: "Conecta tu certificado digital para emitir DTE (Documentos Tributarios Electrónicos)."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComingSoonBadge, {})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							className: "mt-6",
							disabled: true,
							children: "Conectar SII"
						})]
					})
				})
			]
		})
	] });
}
//#endregion
export { Finance as component };
