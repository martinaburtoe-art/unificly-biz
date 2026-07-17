import { i as __toESM } from "../_runtime.mjs";
import { o as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { U as Clock, b as Plus, c as Trash2, f as ShoppingCart, n as X } from "../_libs/lucide-react.mjs";
import { n as EmptyState, r as PageHeader } from "./page-utils-DmKdauOh.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { a as useBizUpdate, i as useBizList, n as useBizDelete, r as useBizInsert, t as fmtCLP } from "./biz-data-DA3ngMFB.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Switch } from "./switch-Cn1w-cIH.mjs";
import { a as DialogTrigger, i as DialogTitle, n as DialogContent, r as DialogHeader, t as Dialog } from "./dialog-OJN88XlQ.mjs";
import { t as Skeleton } from "./skeleton-D9W9wFsj.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sales-Z31WMa9s.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Sales() {
	const { data: sales, isLoading } = useBizList("sales", { order: "sale_date" });
	const { data: products } = useBizList("products", {
		order: "name",
		ascending: true
	});
	const { data: customers } = useBizList("customers", {
		order: "name",
		ascending: true
	});
	const insert = useBizInsert("sales");
	const del = useBizDelete("sales");
	const upd = useBizUpdate("sales");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [customerName, setCustomerName] = (0, import_react.useState)("");
	const [customerId, setCustomerId] = (0, import_react.useState)(null);
	const [channel, setChannel] = (0, import_react.useState)("tienda");
	const [status, setStatus] = (0, import_react.useState)("paid");
	const [items, setItems] = (0, import_react.useState)([{
		product_id: null,
		name: "",
		qty: 1,
		price: 0
	}]);
	const [manualTotal, setManualTotal] = (0, import_react.useState)(null);
	const [isCredit, setIsCredit] = (0, import_react.useState)(false);
	const [dueDate, setDueDate] = (0, import_react.useState)("");
	const selectedCustomerPhone = (customers ?? []).find((c) => c.id === customerId)?.phone;
	const computedTotal = items.reduce((s, i) => s + i.qty * i.price, 0);
	const total = manualTotal ?? computedTotal;
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
	async function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const validItems = items.filter((i) => i.name.trim() !== "");
		await insert.mutateAsync({
			customer_name: customerName,
			customer_id: customerId,
			channel,
			status,
			total,
			items: validItems,
			notes: fd.get("notes") || null,
			is_credit: isCredit,
			due_date: isCredit && dueDate ? dueDate : null
		});
		setOpen(false);
		setCustomerName("");
		setCustomerId(null);
		setItems([{
			product_id: null,
			name: "",
			qty: 1,
			price: 0
		}]);
		setManualTotal(null);
		setIsCredit(false);
		setDueDate("");
	}
	function stockHint(productId) {
		if (!productId) return null;
		const p = (products ?? []).find((x) => x.id === productId);
		return p ? p.stock : null;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Ventas",
		description: "Pedidos y transacciones — se conecta automáticamente con Inventario y Finanzas",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
			open,
			onOpenChange: setOpen,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "shadow-elegant",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1.5 h-4 w-4" }), "Nueva venta"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "max-w-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Registrar venta" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "customer_name",
								children: "Cliente"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "customer_name",
								name: "customer_name",
								value: customerName,
								onChange: (e) => setCustomerName(e.target.value),
								required: true
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
									if (c) setCustomerName(c.name);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "mt-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Vincular a cliente existente (opcional, necesario para fiado)" })
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between rounded-lg border p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "is_credit",
								className: "cursor-pointer",
								children: "Venta a crédito / fiado"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Activa seguimiento de cobranza y recordatorios automáticos por WhatsApp."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								id: "is_credit",
								checked: isCredit,
								onCheckedChange: setIsCredit
							})]
						}),
						isCredit && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "due_date",
								children: "Fecha de vencimiento"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "due_date",
								type: "date",
								value: dueDate,
								onChange: (e) => setDueDate(e.target.value),
								required: true
							}),
							!selectedCustomerPhone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-warning",
								children: "Este cliente no tiene teléfono registrado — no podremos enviarle recordatorios por WhatsApp."
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Canal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: channel,
								onValueChange: setChannel,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "tienda",
										children: "Tienda"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "online",
										children: "Online"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "whatsapp",
										children: "WhatsApp"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "instagram",
										children: "Instagram"
									})
								] })]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Estado" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: status,
								onValueChange: setStatus,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "pending",
										children: "Pendiente"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "paid",
										children: "Pagada"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "draft",
										children: "Borrador"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "cancelled",
										children: "Cancelada"
									})
								] })]
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Productos (opcional, descuenta stock automáticamente)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
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
										className: "col-span-5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											value: it.product_id ?? "__free__",
											onValueChange: (v) => v === "__free__" ? null : pickProduct(idx, v),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Producto del catálogo o texto libre" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "__free__",
												children: "— Texto libre —"
											}), (products ?? []).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
												value: p.id,
												children: [
													p.name,
													" (",
													p.stock,
													" en stock)"
												]
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
										max: it.product_id ? stockHint(it.product_id) ?? void 0 : void 0,
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
									}),
									it.product_id && it.qty > (stockHint(it.product_id) ?? Infinity) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "col-span-12 -mt-1 text-xs text-destructive",
										children: [
											"Stock insuficiente: solo quedan ",
											stockHint(it.product_id),
											" unidades."
										]
									})
								]
							}, idx))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 rounded-lg bg-secondary/40 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "total",
								className: "shrink-0",
								children: "Total (CLP)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "total",
								type: "number",
								min: 0,
								value: total,
								onChange: (e) => setManualTotal(Number(e.target.value)),
								className: "text-right text-base font-semibold"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "notes",
							children: "Notas"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "notes",
							name: "notes"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							className: "w-full",
							disabled: insert.isPending,
							children: "Guardar venta"
						})
					]
				})]
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-6 space-y-3",
		children: [...Array(5)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-12 w-full" }, i))
	}) : !sales || sales.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: ShoppingCart,
		title: "Sin ventas todavía",
		description: "Empieza registrando tu primera venta.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			onClick: () => setOpen(true),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1.5 h-4 w-4" }), "Nueva venta"]
		})
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Cliente" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Fecha" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Canal" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Items" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Estado" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Cobro" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
			className: "text-right",
			children: "Total"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {})
	] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: sales.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			className: "font-medium",
			children: s.customer_name ?? "—"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			className: "text-muted-foreground",
			children: new Date(s.sale_date).toLocaleDateString("es-CL")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			variant: "outline",
			className: "capitalize",
			children: s.channel
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			className: "text-xs text-muted-foreground",
			children: Array.isArray(s.items) && s.items.length > 0 ? `${s.items.length} producto(s)` : "—"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
			value: s.status,
			onChange: (e) => upd.mutate({
				id: s.id,
				patch: { status: e.target.value }
			}),
			className: "rounded-md border bg-background px-2 py-1 text-xs",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "pending",
					children: "Pendiente"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "paid",
					children: "Pagada"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "draft",
					children: "Borrador"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "cancelled",
					children: "Cancelada"
				})
			]
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: !s.is_credit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs text-muted-foreground",
			children: "Contado"
		}) : Number(s.paid_amount) >= Number(s.total) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			className: "bg-success/15 text-success",
			children: "Pagada"
		}) : s.due_date && new Date(s.due_date) < /* @__PURE__ */ new Date() ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
			className: "bg-destructive/15 text-destructive",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "mr-1 h-3 w-3" }), "Vencida"]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			className: "bg-warning/15 text-warning",
			children: "Por cobrar"
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
			className: "text-right font-medium",
			children: [fmtCLP(Number(s.total)), s.is_credit && Number(s.paid_amount) < Number(s.total) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs font-normal text-muted-foreground",
				children: ["Pagado: ", fmtCLP(Number(s.paid_amount))]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "ghost",
			size: "icon",
			onClick: () => del.mutate(s.id),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
		}) })
	] }, s.id)) })] }) })] });
}
//#endregion
export { Sales as component };
