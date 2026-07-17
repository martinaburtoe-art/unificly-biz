import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-yUNcF_nZ.mjs";
import { o as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useActiveBusiness } from "./use-business-CaDVo25M.mjs";
import { K as CircleCheck, T as MessageSquare, b as Plus, c as Trash2, f as ShoppingCart, k as Mail, r as Workflow, st as Bell, t as Zap, x as Phone } from "../_libs/lucide-react.mjs";
import { n as EmptyState, r as PageHeader } from "./page-utils-DmKdauOh.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as useBizUpdate, i as useBizList, n as useBizDelete, r as useBizInsert } from "./biz-data-DA3ngMFB.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Switch } from "./switch-Cn1w-cIH.mjs";
import { a as DialogTrigger, i as DialogTitle, n as DialogContent, r as DialogHeader, t as Dialog } from "./dialog-OJN88XlQ.mjs";
import { t as Skeleton } from "./skeleton-D9W9wFsj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/automations-_xSU6AA0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var templates = [
	{
		icon: MessageSquare,
		n: "WhatsApp → Lead en CRM",
		t: "Nuevo mensaje en WhatsApp",
		a: "Crear lead"
	},
	{
		icon: Bell,
		n: "Stock bajo → Alerta",
		t: "Stock bajo umbral",
		a: "Enviar alerta"
	},
	{
		icon: Mail,
		n: "Cotización aceptada → Notificar equipo",
		t: "Cotización aceptada",
		a: "Email al equipo"
	},
	{
		icon: ShoppingCart,
		n: "Nueva venta → Email de agradecimiento",
		t: "Venta creada",
		a: "Email al cliente"
	}
];
function Automations() {
	const { data, isLoading } = useBizList("automations", { order: "created_at" });
	const { active } = useActiveBusiness();
	const insert = useBizInsert("automations");
	const upd = useBizUpdate("automations");
	const del = useBizDelete("automations");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [webhookUrl, setWebhookUrl] = (0, import_react.useState)(active?.id ? `https://app.nuvaone.cl/webhooks/${active.id}` : "");
	const { data: waConnections, isLoading: waLoading } = useBizList("whatsapp_connections");
	const waInsert = useBizInsert("whatsapp_connections");
	const waUpdate = useBizUpdate("whatsapp_connections");
	const wa = waConnections?.[0];
	const [waForm, setWaForm] = (0, import_react.useState)({
		phone_number_id: "",
		waba_id: "",
		display_phone_number: "",
		access_token: ""
	});
	(0, import_react.useEffect)(() => {
		if (wa) setWaForm({
			phone_number_id: wa.phone_number_id,
			waba_id: wa.waba_id ?? "",
			display_phone_number: wa.display_phone_number ?? "",
			access_token: wa.access_token
		});
	}, [wa?.id]);
	async function saveWhatsApp() {
		if (!waForm.phone_number_id || !waForm.access_token) {
			toast.error("Completa el Phone Number ID y el Access Token de Meta");
			return;
		}
		if (wa) await waUpdate.mutateAsync({
			id: wa.id,
			patch: waForm
		});
		else await waInsert.mutateAsync({
			...waForm,
			auto_stock_query: true,
			auto_price_query: true,
			auto_general_ai: true,
			active: true
		});
	}
	(0, import_react.useEffect)(() => {
		if (!active) return;
		setWebhookUrl(active.webhook_url || `https://app.nuvaone.cl/webhooks/${active.id}`);
	}, [active]);
	async function saveWebhook() {
		if (!active) return;
		const { error } = await supabase.from("businesses").update({ webhook_url: webhookUrl }).eq("id", active.id);
		if (error) toast.error("Error al guardar");
		else toast.success("Webhook guardado");
	}
	async function fromTemplate(tpl) {
		await insert.mutateAsync({
			name: tpl.n,
			trigger_type: tpl.t,
			action_type: tpl.a,
			enabled: true
		});
	}
	async function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		await insert.mutateAsync({
			name: fd.get("name"),
			trigger_type: fd.get("trigger_type"),
			action_type: fd.get("action_type"),
			enabled: true
		});
		setOpen(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Automatizaciones",
			description: "Conecta tu motor de automatización (n8n u otro) y deja que Nüva One trabaje por ti",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1.5 h-4 w-4" }), "Nueva automatización"] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Crear automatización" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "name",
							children: "Nombre"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "name",
							name: "name",
							required: true
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "trigger_type",
							children: "Trigger (cuándo)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "trigger_type",
							name: "trigger_type",
							placeholder: "Ej: Nueva venta",
							required: true
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "action_type",
							children: "Acción (qué hacer)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "action_type",
							name: "action_type",
							placeholder: "Ej: Enviar email",
							required: true
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							className: "w-full",
							children: "Crear"
						})
					]
				})] })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mb-6 border-primary/30 bg-accent/40 p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "mt-0.5 h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold",
							children: "Conecta tu motor de automatización"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Usa este webhook como punto de conexión para n8n u otro motor externo."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: webhookUrl,
								onChange: (e) => setWebhookUrl(e.target.value),
								className: "font-mono text-xs"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: saveWebhook,
								variant: "outline",
								children: "Guardar"
							})]
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mb-6 p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "mt-0.5 h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold",
								children: "Chatbot de WhatsApp (automatización por defecto)"
							}), wa?.active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-green-600" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Ingresa los datos de tu número en Meta Cloud API una sola vez (gratis hasta 1.000 conversaciones/mes). Desde ese momento, tus clientes pueden escribirte por WhatsApp y el sistema responde solo con tu stock, precios y datos reales — no necesitas configurar nada más."
						}),
						waLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-4 h-32 w-full" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 grid gap-3 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "wa_phone_id",
									children: "Phone Number ID (Meta)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "wa_phone_id",
									value: waForm.phone_number_id,
									onChange: (e) => setWaForm((f) => ({
										...f,
										phone_number_id: e.target.value
									}))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "wa_display",
									children: "Número visible (opcional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "wa_display",
									placeholder: "+56 9 1234 5678",
									value: waForm.display_phone_number,
									onChange: (e) => setWaForm((f) => ({
										...f,
										display_phone_number: e.target.value
									}))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "wa_waba",
									children: "WhatsApp Business Account ID (opcional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "wa_waba",
									value: waForm.waba_id,
									onChange: (e) => setWaForm((f) => ({
										...f,
										waba_id: e.target.value
									}))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "wa_token",
									children: "Access Token (Meta)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "wa_token",
									type: "password",
									value: waForm.access_token,
									onChange: (e) => setWaForm((f) => ({
										...f,
										access_token: e.target.value
									}))
								})] })
							]
						}),
						wa && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 space-y-2 border-t pt-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "auto_stock",
										className: "font-normal",
										children: "Responder consultas de stock"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										id: "auto_stock",
										checked: wa.auto_stock_query,
										onCheckedChange: (v) => waUpdate.mutate({
											id: wa.id,
											patch: { auto_stock_query: v }
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "auto_price",
										className: "font-normal",
										children: "Responder consultas de precio"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										id: "auto_price",
										checked: wa.auto_price_query,
										onCheckedChange: (v) => waUpdate.mutate({
											id: wa.id,
											patch: { auto_price_query: v }
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "auto_general",
										className: "font-normal",
										children: "Responder preguntas generales con IA"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										id: "auto_general",
										checked: wa.auto_general_ai,
										onCheckedChange: (v) => waUpdate.mutate({
											id: wa.id,
											patch: { auto_general_ai: v }
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "wa_active",
										className: "font-normal",
										children: "Chatbot activo"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										id: "wa_active",
										checked: wa.active,
										onCheckedChange: (v) => waUpdate.mutate({
											id: wa.id,
											patch: { active: v }
										})
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: saveWhatsApp,
							className: "mt-4",
							children: wa ? "Actualizar conexión" : "Conectar WhatsApp"
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mb-3 text-sm font-semibold text-muted-foreground",
				children: "PLANTILLAS"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: templates.map((tpl) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "cursor-pointer p-4 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-soft",
					onClick: () => fromTemplate(tpl),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(tpl.icon, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-medium",
							children: tpl.n
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 text-xs text-muted-foreground",
							children: [
								tpl.t,
								" → ",
								tpl.a
							]
						})
					]
				}, tpl.n))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "mb-3 text-sm font-semibold text-muted-foreground",
			children: "TUS AUTOMATIZACIONES"
		}),
		isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-40 w-full" }) : !data || data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: Workflow,
			title: "Sin automatizaciones activas",
			description: "Empieza con una plantilla arriba o crea una nueva."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: data.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-10 w-10 items-center justify-center rounded-lg bg-accent",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Workflow, { className: "h-5 w-5 text-primary" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-medium",
								children: a.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-muted-foreground",
								children: [
									a.trigger_type,
									" → ",
									a.action_type,
									" · ",
									a.run_count,
									" ejecuciones"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: a.enabled,
							onCheckedChange: (v) => upd.mutate({
								id: a.id,
								patch: { enabled: v }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: () => del.mutate(a.id),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
						})
					]
				})
			}, a.id))
		})
	] });
}
//#endregion
export { Automations as component };
