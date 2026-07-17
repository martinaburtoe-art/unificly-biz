import { i as __toESM } from "../_runtime.mjs";
import { o as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { C as Package, b as Plus, c as Trash2, n as X } from "../_libs/lucide-react.mjs";
import { n as EmptyState, r as PageHeader } from "./page-utils-DmKdauOh.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { a as useBizUpdate, i as useBizList, n as useBizDelete, r as useBizInsert, t as fmtCLP } from "./biz-data-DA3ngMFB.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as DialogTrigger, i as DialogTitle, n as DialogContent, r as DialogHeader, t as Dialog } from "./dialog-OJN88XlQ.mjs";
import { t as Skeleton } from "./skeleton-D9W9wFsj.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/purchases-CWF3WeCs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Purchases() {
	const { data, isLoading } = useBizList("purchases", { order: "purchase_date" });
	const { data: products } = useBizList("products", {
		order: "name",
		ascending: true
	});
	const insert = useBizInsert("purchases");
	const del = useBizDelete("purchases");
	const upd = useBizUpdate("purchases");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [supplierName, setSupplierName] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("pending");
	const [items, setItems] = (0, import_react.useState)([{
		product_id: null,
		name: "",
		qty: 1,
		price: 0
	}]);
	const [manualTotal, setManualTotal] = (0, import_react.useState)(null);
	const computedTotal = items.reduce((s, i) => s + i.qty * i.price, 0);
	const total = manualTotal ?? computedTotal;
	function pickProduct(idx, productId) {
		const p = (products ?? []).find((x) => x.id === productId);
		const copy = [...items];
		if (p) copy[idx] = {
			product_id: p.id,
			name: p.name,
			qty: copy[idx].qty || 1,
			price: Number(p.cost) || copy[idx].price
		};
		setItems(copy);
	}
	async function onSubmit(e) {
		e.preventDefault();
		const validItems = items.filter((i) => i.name.trim() !== "");
		await insert.mutateAsync({
			supplier_name: supplierName,
			total,
			status,
			items: validItems
		});
		setOpen(false);
		setSupplierName("");
		setItems([{
			product_id: null,
			name: "",
			qty: 1,
			price: 0
		}]);
		setManualTotal(null);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Compras",
		description: "Órdenes de compra — al marcarlas como Recibida o Pagada, suma stock y registra el gasto automáticamente",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
			open,
			onOpenChange: setOpen,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1.5 h-4 w-4" }), "Nueva orden"] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "max-w-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Nueva orden de compra" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "supplier_name",
							children: "Proveedor"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "supplier_name",
							name: "supplier_name",
							value: supplierName,
							onChange: (e) => setSupplierName(e.target.value),
							required: true
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Productos a reabastecer" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
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
										placeholder: "Costo unit.",
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Estado" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: status,
								onValueChange: setStatus,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "pending",
										children: "Pendiente"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "received",
										children: "Recibida"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "paid",
										children: "Pagada"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "cancelled",
										children: "Cancelada"
									})
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "\"Recibida\" o \"Pagada\" suman el stock automáticamente."
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							className: "w-full",
							disabled: insert.isPending,
							children: "Guardar orden"
						})
					]
				})]
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-6 space-y-3",
		children: [...Array(4)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-12 w-full" }, i))
	}) : !data || data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: Package,
		title: "Sin órdenes de compra",
		description: "Registra tu primera orden a un proveedor."
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Proveedor" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Fecha" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Items" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Estado" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
			className: "text-right",
			children: "Total"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {})
	] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: data.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			className: "font-medium",
			children: p.supplier_name ?? "—"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			className: "text-muted-foreground",
			children: new Date(p.purchase_date).toLocaleDateString("es-CL")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			className: "text-xs text-muted-foreground",
			children: Array.isArray(p.items) && p.items.length > 0 ? `${p.items.length} producto(s)` : "—"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
			value: p.status,
			onChange: (e) => upd.mutate({
				id: p.id,
				patch: { status: e.target.value }
			}),
			className: "rounded-md border bg-background px-2 py-1 text-xs",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "pending",
					children: "Pendiente"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "received",
					children: "Recibida"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "paid",
					children: "Pagada"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "cancelled",
					children: "Cancelada"
				})
			]
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			className: "text-right",
			children: fmtCLP(Number(p.total))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "ghost",
			size: "icon",
			onClick: () => del.mutate(p.id),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
		}) })
	] }, p.id)) })] }) })] });
}
//#endregion
export { Purchases as component };
