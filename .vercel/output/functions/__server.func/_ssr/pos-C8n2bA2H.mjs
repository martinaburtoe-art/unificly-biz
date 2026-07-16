import { i as __toESM } from "../_runtime.mjs";
import { o as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useActiveBusiness } from "./use-business-DMRC1wIA.mjs";
import { _ as Search, a as TriangleAlert, b as Plus, c as Trash2, f as ShoppingCart, l as Star, u as StarOff, v as Receipt, w as Minus, y as Printer } from "../_libs/lucide-react.mjs";
import { r as PageHeader } from "./page-utils-DmKdauOh.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as useBizList, r as useBizInsert, t as fmtCLP } from "./biz-data-2nv6AG7B.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { i as DialogTitle, n as DialogContent, r as DialogHeader, t as Dialog } from "./dialog-OJN88XlQ.mjs";
import { t as Skeleton } from "./skeleton-D9W9wFsj.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pos-C8n2bA2H.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function POS() {
	const { active } = useActiveBusiness();
	const { data: products, isLoading } = useBizList("products", {
		order: "name",
		ascending: true
	});
	const { data: sales } = useBizList("sales", { order: "created_at" });
	const insert = useBizInsert("sales");
	const [query, setQuery] = (0, import_react.useState)("");
	const [cart, setCart] = (0, import_react.useState)([]);
	const [method, setMethod] = (0, import_react.useState)("efectivo");
	const [received, setReceived] = (0, import_react.useState)(0);
	const [showReceipt, setShowReceipt] = (0, import_react.useState)(null);
	const favKey = active ? `nuva.pos.favs.${active.id}` : null;
	const [favs, setFavs] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		if (!favKey) return;
		try {
			setFavs(JSON.parse(localStorage.getItem(favKey) ?? "[]"));
		} catch {
			setFavs([]);
		}
	}, [favKey]);
	function toggleFav(id) {
		if (!favKey) return;
		setFavs((prev) => {
			const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
			localStorage.setItem(favKey, JSON.stringify(next));
			return next;
		});
	}
	const list = products ?? [];
	const filtered = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		if (!q) return list;
		return list.filter((p) => p.name?.toLowerCase().includes(q) || p.sku?.toLowerCase?.().includes(q) || p.category?.toLowerCase?.().includes(q));
	}, [list, query]);
	const favorites = list.filter((p) => favs.includes(p.id));
	function addToCart(p) {
		if (Number(p.stock) <= 0) {
			toast.error(`${p.name} sin stock`);
			return;
		}
		setCart((c) => {
			const existing = c.find((i) => i.product_id === p.id);
			if (existing) {
				if (existing.qty + 1 > Number(p.stock)) {
					toast.error(`Solo quedan ${p.stock} de ${p.name}`);
					return c;
				}
				return c.map((i) => i.product_id === p.id ? {
					...i,
					qty: i.qty + 1
				} : i);
			}
			return [...c, {
				product_id: p.id,
				name: p.name,
				qty: 1,
				price: Number(p.price),
				stock: Number(p.stock)
			}];
		});
	}
	function updateQty(pid, qty) {
		setCart((c) => c.map((i) => {
			if (i.product_id !== pid) return i;
			const capped = Math.min(Math.max(1, qty), i.stock);
			if (qty > i.stock) toast.error(`Máximo ${i.stock} unidades`);
			return {
				...i,
				qty: capped
			};
		}).filter((i) => i.qty > 0));
	}
	function removeFromCart(pid) {
		setCart((c) => c.filter((i) => i.product_id !== pid));
	}
	const total = cart.reduce((s, i) => s + i.qty * i.price, 0);
	const change = method === "efectivo" ? Math.max(0, received - total) : 0;
	const canPay = cart.length > 0 && total > 0 && (method !== "efectivo" || received >= total);
	const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	const todaySales = (sales ?? []).filter((s) => (s.sale_date ?? s.created_at?.slice(0, 10)) === today);
	const todayTotal = todaySales.reduce((s, x) => s + Number(x.total), 0);
	async function checkout() {
		if (!canPay) return;
		const notes = [`Caja · ${method}`, method === "efectivo" ? `Recibido ${fmtCLP(received)} · Vuelto ${fmtCLP(change)}` : null].filter(Boolean).join(" — ");
		try {
			setShowReceipt({
				id: (await insert.mutateAsync({
					customer_name: "Venta mostrador",
					channel: "tienda",
					status: "paid",
					total,
					sale_date: today,
					items: cart.map((i) => ({
						product_id: i.product_id,
						name: i.name,
						qty: i.qty,
						price: i.price
					})),
					notes
				}))?.id,
				items: cart,
				total,
				method,
				received,
				change,
				at: /* @__PURE__ */ new Date()
			});
			setCart([]);
			setReceived(0);
			setMethod("efectivo");
		} catch {}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Caja",
			description: "Punto de venta rápido para mostrador — tap, cobra, imprime",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border bg-card px-4 py-2 text-right",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: "Hoy"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-lg font-bold",
						children: fmtCLP(todayTotal)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[10px] text-muted-foreground",
						children: [todaySales.length, " venta(s)"]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-4 lg:grid-cols-[1fr_380px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: query,
							onChange: (e) => setQuery(e.target.value),
							placeholder: "Buscar por nombre, SKU o categoría…",
							className: "h-12 pl-10 text-base",
							autoFocus: true
						})]
					}),
					favorites.length > 0 && !query && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 text-warning" }), " Favoritos"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4",
							children: favorites.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => addToCart(p),
								className: "flex flex-col items-start rounded-lg border bg-primary/5 p-3 text-left transition hover:bg-primary/10",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium leading-tight",
										children: p.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 text-sm font-bold",
										children: fmtCLP(Number(p.price))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[10px] text-muted-foreground",
										children: ["Stock: ", p.stock]
									})
								]
							}, p.id))
						})]
					}),
					isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4",
						children: [...Array(8)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-28 w-full" }, i))
					}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "p-10 text-center text-sm text-muted-foreground",
						children: "Sin productos que coincidan."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4",
						children: filtered.map((p) => {
							const stock = Number(p.stock);
							const inCart = cart.find((c) => c.product_id === p.id)?.qty ?? 0;
							const remaining = stock - inCart;
							const low = stock > 0 && stock <= 3;
							const willDeplete = inCart > 0 && remaining <= 0;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => addToCart(p),
									disabled: stock <= 0,
									className: cn("flex h-full w-full flex-col items-start gap-1 rounded-xl border bg-card p-3 text-left transition active:scale-[0.98]", stock <= 0 ? "opacity-50" : "hover:border-primary hover:shadow-elegant"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex w-full items-start justify-between gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "line-clamp-2 text-sm font-medium leading-tight",
											children: p.name
										}), (low || willDeplete) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: cn("h-3.5 w-3.5 shrink-0", willDeplete ? "text-destructive" : "text-warning") })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-auto flex w-full items-end justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-base font-bold",
											children: fmtCLP(Number(p.price))
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("text-[10px]", stock <= 0 ? "text-destructive" : low ? "text-warning" : "text-muted-foreground"),
											children: stock <= 0 ? "Sin stock" : `${remaining} disp.`
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: (e) => {
										e.stopPropagation();
										toggleFav(p.id);
									},
									className: "absolute right-1 top-1 rounded-md p-1 text-muted-foreground hover:bg-accent",
									"aria-label": "Favorito",
									children: favs.includes(p.id) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-warning text-warning" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarOff, { className: "h-3.5 w-3.5" })
								})]
							}, p.id);
						})
					}),
					todaySales.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "h-3.5 w-3.5" }), " Últimas ventas de hoy"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "max-h-48 space-y-1 overflow-y-auto",
							children: todaySales.slice(0, 8).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-accent/60",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted-foreground",
									children: [
										new Date(s.created_at).toLocaleTimeString("es-CL", {
											hour: "2-digit",
											minute: "2-digit"
										}),
										" · ",
										Array.isArray(s.items) ? s.items.length : 0,
										" ítem(s)"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: fmtCLP(Number(s.total))
								})]
							}, s.id))
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "sticky top-16 flex h-fit max-h-[calc(100vh-6rem)] flex-col p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 font-semibold",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-4 w-4" }),
								" Carrito",
								cart.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "secondary",
									children: cart.length
								})
							]
						}), cart.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => setCart([]),
							children: "Vaciar"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 space-y-2 overflow-y-auto",
						children: cart.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "py-10 text-center text-sm text-muted-foreground",
							children: "Toca un producto para agregarlo"
						}) : cart.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border p-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium",
										children: i.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => removeFromCart(i.product_id),
										className: "text-muted-foreground hover:text-destructive",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "icon",
												variant: "outline",
												className: "h-8 w-8",
												onClick: () => updateQty(i.product_id, i.qty - 1),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3 w-3" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												type: "number",
												min: 1,
												max: i.stock,
												value: i.qty,
												onChange: (e) => updateQty(i.product_id, Number(e.target.value)),
												className: "h-8 w-14 text-center"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "icon",
												variant: "outline",
												className: "h-8 w-8",
												onClick: () => updateQty(i.product_id, i.qty + 1),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" })
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-semibold",
										children: fmtCLP(i.qty * i.price)
									})]
								}),
								i.qty >= i.stock && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 text-[10px] text-warning",
									children: "Stock máximo alcanzado"
								})
							]
						}, i.product_id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 space-y-3 border-t pt-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "mb-1.5 block text-xs",
								children: "Método de pago"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-3 gap-1.5",
								children: [
									"efectivo",
									"tarjeta",
									"transferencia"
								].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setMethod(m),
									className: cn("rounded-lg border px-2 py-2 text-xs font-medium capitalize transition", method === m ? "border-primary bg-primary text-primary-foreground" : "hover:bg-accent"),
									children: m
								}, m))
							})] }),
							method === "efectivo" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Recibido"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: 0,
									value: received || "",
									onChange: (e) => setReceived(Number(e.target.value)),
									className: "h-10 text-right"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Vuelto"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-10 items-center justify-end rounded-md border bg-muted/40 px-3 text-sm font-semibold",
									children: fmtCLP(change)
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between rounded-lg bg-secondary/50 p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-medium",
									children: "Total"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl font-bold",
									children: fmtCLP(total)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "h-12 w-full text-base shadow-elegant",
								onClick: checkout,
								disabled: !canPay || insert.isPending,
								children: insert.isPending ? "Procesando…" : `Cobrar ${fmtCLP(total)}`
							})
						]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!showReceipt,
			onOpenChange: (v) => !v && setShowReceipt(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "max-w-sm print:shadow-none",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Boleta" }) }),
					showReceipt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-base font-bold",
									children: active?.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground",
									children: showReceipt.at.toLocaleString("es-CL")
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "border-t border-dashed" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-1",
								children: showReceipt.items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										i.qty,
										"× ",
										i.name
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fmtCLP(i.qty * i.price) })]
								}, i.product_id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "border-t border-dashed" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between font-bold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fmtCLP(showReceipt.total) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-muted-foreground capitalize",
								children: ["Pago: ", showReceipt.method]
							}),
							showReceipt.method === "efectivo" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Recibido" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fmtCLP(showReceipt.received) })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Vuelto" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fmtCLP(showReceipt.change) })]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pt-2 text-center text-[10px] text-muted-foreground",
								children: "¡Gracias por su compra!"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 print:hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							className: "flex-1",
							onClick: () => setShowReceipt(null),
							children: "Cerrar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "flex-1",
							onClick: () => window.print(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "mr-1.5 h-4 w-4" }), " Imprimir"]
						})]
					})
				]
			})
		})
	] });
}
//#endregion
export { POS as component };
