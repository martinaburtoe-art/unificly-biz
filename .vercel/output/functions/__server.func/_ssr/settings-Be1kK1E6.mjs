import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-_TVG0p1v.mjs";
import { o as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { r as useMyRole, t as useActiveBusiness } from "./use-business-DMRC1wIA.mjs";
import { B as Download, M as LoaderCircle, W as ClipboardList, a as TriangleAlert, c as Trash2, j as Lock, m as ShieldCheck, p as Shield } from "../_libs/lucide-react.mjs";
import { r as PageHeader, t as ComingSoonBadge } from "./page-utils-DmKdauOh.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CCJRliUM.mjs";
import { t as Skeleton } from "./skeleton-D9W9wFsj.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { t as downloadCsv } from "./export-CDq3cmOv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-Be1kK1E6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MfaSetup() {
	const [factors, setFactors] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [enrolling, setEnrolling] = (0, import_react.useState)(null);
	const [code, setCode] = (0, import_react.useState)("");
	async function refresh() {
		const { data, error } = await supabase.auth.mfa.listFactors();
		if (error) return;
		setFactors(data.totp ?? []);
	}
	(0, import_react.useEffect)(() => {
		refresh();
	}, []);
	async function startEnroll() {
		setLoading(true);
		const { data, error } = await supabase.auth.mfa.enroll({
			factorType: "totp",
			friendlyName: `Nüva One ${(/* @__PURE__ */ new Date()).toLocaleDateString("es-CL")}`
		});
		setLoading(false);
		if (error || !data) {
			toast.error(error?.message || "No se pudo iniciar el registro");
			return;
		}
		setEnrolling({
			id: data.id,
			qr: data.totp.qr_code,
			secret: data.totp.secret
		});
	}
	async function verify() {
		if (!enrolling) return;
		setLoading(true);
		const challenge = await supabase.auth.mfa.challenge({ factorId: enrolling.id });
		if (challenge.error || !challenge.data) {
			setLoading(false);
			toast.error(challenge.error?.message || "Error al desafiar el código");
			return;
		}
		const { error } = await supabase.auth.mfa.verify({
			factorId: enrolling.id,
			challengeId: challenge.data.id,
			code
		});
		setLoading(false);
		if (error) {
			toast.error(error.message || "Código incorrecto");
			return;
		}
		toast.success("2FA activado");
		setEnrolling(null);
		setCode("");
		refresh();
	}
	async function unenroll(id) {
		if (!confirm("¿Desactivar 2FA?")) return;
		const { error } = await supabase.auth.mfa.unenroll({ factorId: id });
		if (error) toast.error(error.message);
		else {
			toast.success("2FA desactivado");
			refresh();
		}
	}
	const verified = (factors ?? []).filter((f) => f.status === "verified");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-4",
		children: verified.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: verified.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between rounded-md border border-border/60 bg-secondary/40 p-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-primary" }),
						f.friendly_name || "Autenticador TOTP",
						" — Activo"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "sm",
					onClick: () => unenroll(f.id),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
				})]
			}, f.id))
		}) : enrolling ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-md border bg-white p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto h-44 w-44",
						dangerouslySetInnerHTML: { __html: enrolling.qr }
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [
						"Escanea con Google Authenticator, 1Password o Authy. También puedes ingresar la clave manualmente:",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "rounded bg-muted px-1 py-0.5 text-[11px]",
							children: enrolling.secret
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "mfa-code",
					children: "Código de 6 dígitos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "mfa-code",
					inputMode: "numeric",
					maxLength: 6,
					value: code,
					onChange: (e) => setCode(e.target.value.replace(/\D/g, "")),
					placeholder: "123456"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: verify,
						disabled: loading || code.length !== 6,
						children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }), "Verificar y activar"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: () => setEnrolling(null),
						children: "Cancelar"
					})]
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			onClick: startEnroll,
			disabled: loading,
			children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }), "Activar 2FA"]
		})
	});
}
function AuditLogView() {
	const { active } = useActiveBusiness();
	const { data, isLoading } = useQuery({
		enabled: !!active?.id,
		queryKey: ["audit_log", active?.id],
		queryFn: async () => {
			const { data, error } = await supabase.from("audit_log").select("id, created_at, action, entity, user_id, metadata").eq("business_id", active.id).order("created_at", { ascending: false }).limit(200);
			if (error) throw error;
			return data ?? [];
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Últimas 200 acciones registradas en este negocio."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				size: "sm",
				disabled: !data || data.length === 0,
				onClick: () => downloadCsv(`auditoria-${active?.name ?? "negocio"}.csv`, (data ?? []).map((r) => ({
					fecha: new Date(r.created_at).toLocaleString("es-CL"),
					accion: r.action,
					entidad: r.entity ?? "",
					usuario: r.user_id ?? "",
					metadata: r.metadata ?? ""
				}))),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-1.5 h-4 w-4" }), " Exportar CSV"]
			})]
		}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-40" }) : !data || data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground",
			children: "Aún no hay actividad registrada."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden rounded-md border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Fecha" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Acción" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Entidad" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Usuario" })
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: data.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "whitespace-nowrap text-xs text-muted-foreground",
					children: new Date(r.created_at).toLocaleString("es-CL")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-medium",
					children: r.action
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-xs",
					children: r.entity ?? "—"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-mono text-[11px] text-muted-foreground",
					children: r.user_id ? r.user_id.slice(0, 8) : "sistema"
				})
			] }, r.id)) })] })
		})]
	});
}
function Settings() {
	const { active } = useActiveBusiness();
	const { data: myRole } = useMyRole();
	const canManage = myRole === "owner" || myRole === "admin";
	const isOwner = myRole === "owner";
	const navigate = useNavigate();
	const [name, setName] = (0, import_react.useState)(active?.name ?? "");
	const [taxId, setTaxId] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (active) setName(active.name);
	}, [active]);
	async function save() {
		if (!active) return;
		const { error } = await supabase.from("businesses").update({
			name,
			tax_id: taxId
		}).eq("id", active.id);
		if (error) toast.error("Error");
		else toast.success("Guardado");
	}
	async function deleteBusiness() {
		if (!active) return;
		if (!confirm(`¿Eliminar el negocio "${active.name}"? Esta acción no se puede deshacer.`)) return;
		const { error } = await supabase.from("businesses").delete().eq("id", active.id);
		if (error) toast.error("Error");
		else {
			localStorage.removeItem("novaflow.active_business_id");
			navigate({ to: "/select-business" });
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Configuración",
		description: "Gestiona tu negocio, equipo y preferencias"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
		defaultValue: "business",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "business",
					children: "Negocio"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "team",
					children: "Equipo"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "security",
					children: "Seguridad"
				}),
				canManage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "audit",
					children: "Auditoría"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "billing",
					children: "Facturación"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
				value: "business",
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold",
						children: "Perfil del negocio"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "bname",
								children: "Nombre"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "bname",
								value: name,
								onChange: (e) => setName(e.target.value),
								disabled: !canManage
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "tax",
								children: "RUT / Tax ID"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "tax",
								value: taxId,
								onChange: (e) => setTaxId(e.target.value),
								placeholder: "76.123.456-7",
								disabled: !canManage
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: save,
								disabled: !canManage,
								children: "Guardar cambios"
							}),
							!canManage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex items-center gap-1.5 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-3 w-3" }), " Solo el propietario o administradores pueden editar el perfil del negocio."]
							})
						]
					})]
				}), isOwner && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "border-destructive/30 p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-destructive",
							children: "Zona peligrosa"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Eliminar este negocio borra todos sus datos. No se puede revertir."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "destructive",
							className: "mt-4",
							onClick: deleteBusiness,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-1.5 h-4 w-4" }), "Eliminar negocio"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "team",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold",
							children: "Miembros del equipo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Invita personas y asigna roles (Propietario, Admin, Staff, Solo lectura)."
						}),
						canManage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "email",
								placeholder: "email@ejemplo.cl",
								disabled: true
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								disabled: true,
								children: "Invitar"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-xs text-muted-foreground flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-3 w-3" }),
								" Funcionalidad de invitaciones por email",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComingSoonBadge, {})
							]
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 flex items-center gap-1.5 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-3 w-3" }), " Solo el propietario o administradores pueden gestionar al equipo."]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "security",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "p-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold",
									children: "Autenticación de dos factores (2FA)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: "Añade una capa extra de seguridad a tu cuenta con una app autenticadora (TOTP)."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MfaSetup, {})
								})
							]
						})]
					})
				})
			}),
			canManage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "audit",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "p-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold",
									children: "Registro de auditoría"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: "Quién hizo qué y cuándo — visible solo para propietarios y administradores. Cada venta, cambio de stock, cotización o gasto queda registrado automáticamente y no puede editarse ni borrarse, ni siquiera por un administrador."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuditLogView, {})
								})
							]
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "billing",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BillingTab, {})
			})
		]
	})] });
}
function BillingTab() {
	const { active } = useActiveBusiness();
	const { data: myRole } = useMyRole();
	const canManage = myRole === "owner" || myRole === "admin";
	const [loading, setLoading] = (0, import_react.useState)(false);
	const plan = active?.plan ?? "starter";
	const status = active?.subscription_status ?? "active";
	const isPro = plan === "pro";
	const createdAt = active?.created_at ? new Date(active.created_at) : null;
	const trialDaysLeft = createdAt ? Math.max(0, 15 - Math.floor((Date.now() - createdAt.getTime()) / 864e5)) : 15;
	const trialExpired = !isPro && trialDaysLeft <= 0;
	async function callBillingEndpoint(path) {
		if (!active) return;
		setLoading(true);
		try {
			const { data: sessionData } = await supabase.auth.getSession();
			const token = sessionData.session?.access_token;
			const json = await (await fetch(`/api/billing/${path}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({ business_id: active.id })
			})).json();
			if (json.url) window.location.href = json.url;
			else toast.error(json.error ?? "No se pudo iniciar el proceso de pago");
		} catch {
			toast.error("Error de conexión con el sistema de pagos");
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "font-semibold",
					children: ["Plan actual: ", isPro ? "Pro" : "Prueba gratuita"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: isPro ? "rounded-full bg-gradient-primary px-2 py-0.5 text-xs font-medium text-primary-foreground" : trialExpired ? "rounded-full bg-destructive/15 px-2 py-0.5 text-xs font-medium text-destructive" : "rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground",
					children: isPro ? status === "active" ? "Activo" : status : trialExpired ? "Vencida" : `${trialDaysLeft} días restantes`
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: isPro ? "Tienes acceso completo a todas las funciones de Nüva One." : trialExpired ? "Tu prueba gratuita de 15 días terminó. Actualiza a Pro para seguir usando Nüva One." : "Prueba gratuita de 15 días con acceso completo — sin tarjeta. Al terminar, necesitas el plan Pro para seguir usando la app."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-4 space-y-2 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "flex items-center gap-2",
						children: "✅ Negocios y productos ilimitados"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "flex items-center gap-2",
						children: "✅ Ventas, compras, inventario y Caja"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "flex items-center gap-2",
						children: "✅ Asistente IA"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "flex items-center gap-2",
						children: "✅ Automatizaciones y bot de WhatsApp"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "flex items-center gap-2",
						children: "✅ Cotizaciones en PDF"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "flex items-center gap-2",
						children: "✅ Marketing con IA"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "flex items-center gap-2",
						children: "✅ Roles de equipo y auditoría"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-muted-foreground",
				children: "Todo Nüva One tiene un único nivel de funciones. La única diferencia entre Prueba gratuita y Pro es el tiempo de acceso."
			}),
			!canManage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 flex items-center gap-1.5 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-3 w-3" }), " Solo el propietario o administradores pueden gestionar el plan."]
			}) : isPro ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-4",
				variant: "outline",
				disabled: loading,
				onClick: () => callBillingEndpoint("portal"),
				children: "Gestionar suscripción"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-4",
				disabled: loading,
				onClick: () => callBillingEndpoint("checkout"),
				children: "Actualizar a Pro — $29.990/mes"
			})
		]
	});
}
//#endregion
export { Settings as component };
