import { i as __toESM } from "../_runtime.mjs";
import { o as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { B as Download, S as Pencil, a as TriangleAlert, b as Plus, c as Trash2, ot as Boxes } from "../_libs/lucide-react.mjs";
import { n as EmptyState, r as PageHeader } from "./page-utils-DmKdauOh.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { a as useBizUpdate, i as useBizList, n as useBizDelete, r as useBizInsert, t as fmtCLP } from "./biz-data-DA3ngMFB.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as DialogTrigger, i as DialogTitle, n as DialogContent, r as DialogHeader, t as Dialog } from "./dialog-OJN88XlQ.mjs";
import { t as Skeleton } from "./skeleton-D9W9wFsj.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { t as downloadCsv } from "./export-CDq3cmOv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inventory-C6CvtYD0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Inventory() {
	const { data, isLoading } = useBizList("products", { order: "created_at" });
	const insert = useBizInsert("products");
	const upd = useBizUpdate("products");
	const del = useBizDelete("products");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	function openCreate() {
		setEditing(null);
		setOpen(true);
	}
	function openEdit(p) {
		setEditing(p);
		setOpen(true);
	}
	async function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const payload = {
			sku: fd.get("sku"),
			name: fd.get("name"),
			category: fd.get("category"),
			cost: Number(fd.get("cost")),
			price: Number(fd.get("price")),
			stock: Number(fd.get("stock")),
			low_stock_threshold: Number(fd.get("low_stock_threshold")) || 5
		};
		if (editing) await upd.mutateAsync({
			id: editing.id,
			patch: payload
		});
		else await insert.mutateAsync(payload);
		setOpen(false);
		setEditing(null);
	}
	const lowStock = (data ?? []).filter((p) => p.stock <= p.low_stock_threshold);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Inventario",
			description: "Catálogo de productos y niveles de stock",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					disabled: !data || data.length === 0,
					onClick: () => downloadCsv("inventario.csv", (data ?? []).map((p) => ({
						sku: p.sku ?? "",
						nombre: p.name,
						categoria: p.category ?? "",
						costo: p.cost ?? 0,
						precio: p.price ?? 0,
						stock: p.stock ?? 0,
						alerta_stock_bajo: p.low_stock_threshold ?? 0
					}))),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-1.5 h-4 w-4" }), " Exportar CSV"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
					open,
					onOpenChange: (v) => {
						setOpen(v);
						if (!v) setEditing(null);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "shadow-elegant",
							onClick: openCreate,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1.5 h-4 w-4" }), "Agregar producto"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editing ? "Editar producto" : "Nuevo producto" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "sku",
									children: "SKU"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "sku",
									name: "sku",
									defaultValue: editing?.sku ?? ""
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "category",
									children: "Categoría"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "category",
									name: "category",
									defaultValue: editing?.category ?? ""
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "name",
								children: "Nombre"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "name",
								name: "name",
								defaultValue: editing?.name ?? "",
								required: true
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-3 gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "cost",
										children: "Costo"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "cost",
										name: "cost",
										type: "number",
										min: 0,
										defaultValue: editing?.cost ?? 0
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "price",
										children: "Precio"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "price",
										name: "price",
										type: "number",
										min: 0,
										defaultValue: editing?.price ?? "",
										required: true
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "stock",
										children: "Stock"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "stock",
										name: "stock",
										type: "number",
										min: 0,
										defaultValue: editing?.stock ?? 0
									})] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "low_stock_threshold",
								children: "Alerta stock bajo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "low_stock_threshold",
								name: "low_stock_threshold",
								type: "number",
								defaultValue: editing?.low_stock_threshold ?? 5
							})] }),
							editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Editar el stock aquí es un ajuste manual (conteo físico, merma). Las ventas y compras ya mueven el stock automáticamente."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "w-full",
								disabled: insert.isPending || upd.isPending,
								children: editing ? "Guardar cambios" : "Guardar"
							})
						]
					})] })]
				})]
			})
		}),
		lowStock.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mb-6 border-warning/40 bg-warning/5 p-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4 text-warning" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-sm font-medium",
					children: [lowStock.length, " producto(s) con stock bajo"]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-6 space-y-3",
			children: [...Array(5)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-12 w-full" }, i))
		}) : !data || data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: Boxes,
			title: "Tu catálogo está vacío",
			description: "Agrega tu primer producto para empezar a gestionar inventario.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: openCreate,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1.5 h-4 w-4" }), "Agregar producto"]
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "SKU" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Producto" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Categoría" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
				className: "text-right",
				children: "Stock"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
				className: "text-right",
				children: "Precio"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {})
		] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: data.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "font-mono text-xs text-muted-foreground",
				children: p.sku ?? "—"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "font-medium",
				children: p.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "text-muted-foreground",
				children: p.category ?? "—"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "text-right",
				children: p.stock <= p.low_stock_threshold ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					className: "bg-warning/15 text-warning",
					children: [p.stock, " bajo"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium",
					children: p.stock
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "text-right",
				children: fmtCLP(Number(p.price))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-end gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					onClick: () => openEdit(p),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					onClick: () => del.mutate(p.id),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
				})]
			}) })
		] }, p.id)) })] }) })
	] });
}
//#endregion
export { Inventory as component };
