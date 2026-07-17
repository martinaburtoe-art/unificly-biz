import { i as __toESM } from "../_runtime.mjs";
import { o as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useActiveBusiness } from "./use-business-CaDVo25M.mjs";
import { B as Download, L as FileText, b as Plus, c as Trash2, n as X, q as CircleArrowRight } from "../_libs/lucide-react.mjs";
import { n as EmptyState, r as PageHeader } from "./page-utils-DmKdauOh.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as useBizUpdate, i as useBizList, n as useBizDelete, r as useBizInsert, t as fmtCLP } from "./biz-data-DA3ngMFB.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as DialogTrigger, i as DialogTitle, n as DialogContent, r as DialogHeader, t as Dialog } from "./dialog-OJN88XlQ.mjs";
import { t as Skeleton } from "./skeleton-D9W9wFsj.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quotes-CZUHFoFa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var statusLabel = {
	draft: {
		l: "Borrador",
		c: "bg-muted text-muted-foreground"
	},
	sent: {
		l: "Enviada",
		c: "bg-primary/15 text-primary"
	},
	viewed: {
		l: "Vista",
		c: "bg-warning/15 text-warning"
	},
	accepted: {
		l: "Aceptada",
		c: "bg-success/15 text-success"
	},
	rejected: {
		l: "Rechazada",
		c: "bg-destructive/15 text-destructive"
	},
	expired: {
		l: "Expirada",
		c: "bg-muted text-muted-foreground"
	}
};
function Quotes() {
	const { active } = useActiveBusiness();
	const { data, isLoading } = useBizList("quotes", { order: "created_at" });
	const { data: products } = useBizList("products", {
		order: "name",
		ascending: true
	});
	const { data: sales } = useBizList("sales");
	const { data: customers } = useBizList("customers", {
		order: "name",
		ascending: true
	});
	const insert = useBizInsert("quotes");
	const upd = useBizUpdate("quotes");
	const del = useBizDelete("quotes");
	const insertSale = useBizInsert("sales");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [items, setItems] = (0, import_react.useState)([{
		product_id: null,
		name: "",
		qty: 1,
		price: 0
	}]);
	const [customer, setCustomer] = (0, import_react.useState)("");
	const [customerId, setCustomerId] = (0, import_react.useState)(null);
	const [convertingId, setConvertingId] = (0, import_react.useState)(null);
	const convertedQuoteIds = new Set((sales ?? []).map((s) => s.quote_id).filter(Boolean));
	const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
	const tax = Math.round(subtotal * .19);
	const total = subtotal + tax;
	function pickProduct(idx, productId) {
		const p = (products ?? []).find((x) => x.id === productId);
		const copy = [...items];
		if (p) copy[idx] = {
			product_id: p.id,
			name: p.name,
			qty: copy[idx].qty || 1,
			price: Number(p.price)
		};
		setItems(copy);
	}
	async function save(status = "draft") {
		if (!customer) return;
		const validItems = items.filter((i) => i.name.trim() !== "");
		await insert.mutateAsync({
			customer_name: customer,
			customer_id: customerId,
			items: validItems,
			subtotal,
			tax,
			total,
			status
		});
		setItems([{
			product_id: null,
			name: "",
			qty: 1,
			price: 0
		}]);
		setCustomer("");
		setCustomerId(null);
		setOpen(false);
	}
	async function convertToSale(quote) {
		setConvertingId(quote.id);
		try {
			const saleItems = (quote.items ?? []).map((it) => ({
				product_id: it.product_id ?? null,
				name: it.name,
				qty: Number(it.qty) || 0,
				price: Number(it.price) || 0
			}));
			await insertSale.mutateAsync({
				customer_name: quote.customer_name,
				channel: "tienda",
				status: "paid",
				total: quote.total,
				items: saleItems,
				quote_id: quote.id,
				notes: `Generada desde cotización`
			});
			await upd.mutateAsync({
				id: quote.id,
				patch: { status: "accepted" }
			});
			toast.success("Venta creada a partir de la cotización");
		} catch (e) {
			toast.error(e.message ?? "No se pudo convertir a venta");
		} finally {
			setConvertingId(null);
		}
	}
	async function downloadPdf(quote) {
		const { generateQuotePdf } = await import("./quote-pdf-C4X4wDgr.mjs");
		await generateQuotePdf(quote, active?.name ?? "Nüva One");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Cotizaciones",
		description: "Crea cotizaciones desde tu catálogo y convierte las aceptadas en ventas con un clic",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
			open,
			onOpenChange: setOpen,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "shadow-elegant",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1.5 h-4 w-4" }), "Nueva cotización"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "max-w-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Nueva cotización" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "customer",
								children: "Cliente"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "customer",
								value: customer,
								onChange: (e) => setCustomer(e.target.value)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: customerId ?? "__none__",
								onValueChange: (v) => {
									if (v === "__none__") {
										setCustomerId(null);
										return;
									}
									const c = (customers ?? []).find((x) => x.id === v);
									setCustomerId(v);
									if (c) setCustomer(c.name);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "mt-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Vincular a cliente existente (necesario para seguimiento por WhatsApp)" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "__none__",
									children: "— Sin vincular —"
								}), (customers ?? []).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
									value: c.id,
									children: [
										c.name,
										" ",
										c.phone ? `(${c.phone})` : "(sin teléfono)"
									]
								}, c.id))] })]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Items" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								size: "sm",
								variant: "outline",
								onClick: () => setItems([...items, {
									product_id: null,
									name: "",
									qty: 1,
									price: 0
								}]),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-3 w-3" }), "Agregar línea"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2",
							children: items.map((it, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-12 gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "col-span-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											value: it.product_id ?? "__free__",
											onValueChange: (v) => v === "__free__" ? null : pickProduct(idx, v),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Producto o texto libre" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "__free__",
												children: "— Texto libre —"
											}), (products ?? []).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: p.id,
												children: p.name
											}, p.id))] })]
										}), it.product_id === null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											className: "mt-1",
											placeholder: "Descripción",
											value: it.name,
											onChange: (e) => {
												const c = [...items];
												c[idx].name = e.target.value;
												setItems(c);
											}
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										className: "col-span-2",
										type: "number",
										min: 1,
										value: it.qty,
										onChange: (e) => {
											const c = [...items];
											c[idx].qty = Number(e.target.value);
											setItems(c);
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										className: "col-span-3",
										type: "number",
										min: 0,
										placeholder: "Precio",
										value: it.price,
										onChange: (e) => {
											const c = [...items];
											c[idx].price = Number(e.target.value);
											setItems(c);
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										size: "icon",
										variant: "ghost",
										className: "col-span-1",
										onClick: () => setItems(items.filter((_, i) => i !== idx)),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
									})
								]
							}, idx))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-secondary/40 p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Subtotal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fmtCLP(subtotal) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "IVA (19%)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fmtCLP(tax) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex justify-between border-t pt-2 text-base font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fmtCLP(total) })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								className: "flex-1",
								onClick: () => save("draft"),
								disabled: insert.isPending,
								children: "Guardar borrador"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "flex-1",
								onClick: () => save("sent"),
								disabled: insert.isPending,
								children: "Enviar"
							})]
						})
					]
				})]
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-6 space-y-3",
		children: [...Array(4)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-12 w-full" }, i))
	}) : !data || data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: FileText,
		title: "Sin cotizaciones",
		description: "Crea tu primera cotización profesional."
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Cliente" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Fecha" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Estado" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Seguimiento" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
			className: "text-right",
			children: "Total"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
			className: "text-right",
			children: "Acciones"
		})
	] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: data.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			className: "font-medium",
			children: q.customer_name
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			className: "text-muted-foreground",
			children: new Date(q.created_at).toLocaleDateString("es-CL")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
			value: q.status,
			onChange: (e) => upd.mutate({
				id: q.id,
				patch: { status: e.target.value }
			}),
			className: "rounded-md border bg-background px-2 py-1 text-xs",
			children: Object.entries(statusLabel).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: k,
				children: v.l
			}, k))
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			className: "text-xs text-muted-foreground",
			children: (q.status === "sent" || q.status === "viewed") && q.sent_at ? `${Math.floor((Date.now() - new Date(q.sent_at).getTime()) / 864e5)} día(s) sin respuesta` : "—"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			className: "text-right font-medium",
			children: fmtCLP(Number(q.total))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			className: "text-right",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-end gap-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						title: "Descargar PDF",
						onClick: () => downloadPdf(q),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" })
					}),
					q.status === "accepted" && !convertedQuoteIds.has(q.id) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						title: "Convertir a venta",
						disabled: convertingId === q.id,
						onClick: () => convertToSale(q),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleArrowRight, { className: "h-4 w-4 text-success" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => del.mutate(q.id),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
					})
				]
			})
		})
	] }, q.id)) })] }) })] });
}
//#endregion
export { Quotes as component };
