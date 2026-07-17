import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-yUNcF_nZ.mjs";
import { o as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { M as LoaderCircle, d as Sparkles, k as Mail, x as Phone } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Route } from "./auth-BTbV_eN7.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CCJRliUM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-Cib5CNEo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthPage() {
	const search = Route.useSearch();
	const navigate = useNavigate();
	const [tab, setTab] = (0, import_react.useState)(search.mode ?? "login");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [phoneStep, setPhoneStep] = (0, import_react.useState)("input");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [otp, setOtp] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) navigate({ to: search.redirect ?? "/select-business" });
		});
	}, [navigate, search.redirect]);
	async function handleEmail(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const email = String(fd.get("email") ?? "").trim();
		const password = String(fd.get("password") ?? "");
		const full_name = String(fd.get("full_name") ?? "").trim();
		setLoading(true);
		try {
			if (tab === "signup") {
				const { data, error } = await supabase.auth.signUp({
					email,
					password,
					options: {
						emailRedirectTo: `${window.location.origin}/onboarding`,
						data: { full_name }
					}
				});
				if (error) throw error;
				if (!data.session) {
					toast.success("¡Cuenta creada! Revisa tu correo y confirma tu cuenta para continuar.");
					setTab("login");
				} else {
					toast.success("¡Cuenta creada!");
					navigate({ to: "/onboarding" });
				}
			} else {
				const { error } = await supabase.auth.signInWithPassword({
					email,
					password
				});
				if (error) throw error;
				toast.success("Bienvenido de vuelta");
				navigate({ to: "/select-business" });
			}
		} catch (err) {
			toast.error(err.message ?? "Error de autenticación");
		} finally {
			setLoading(false);
		}
	}
	async function handleGoogle() {
		setLoading(true);
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: { redirectTo: `${window.location.origin}${search.redirect ?? "/select-business"}` }
		});
		if (error) {
			toast.error("No se pudo iniciar sesión con Google");
			setLoading(false);
		}
	}
	async function handlePhone(e) {
		e.preventDefault();
		setLoading(true);
		try {
			if (phoneStep === "input") {
				const { error } = await supabase.auth.signInWithOtp({ phone });
				if (error) throw error;
				toast.success("Código enviado");
				setPhoneStep("otp");
			} else {
				const { error } = await supabase.auth.verifyOtp({
					phone,
					token: otp,
					type: "sms"
				});
				if (error) throw error;
				toast.success("Bienvenido");
				navigate({ to: "/onboarding" });
			}
		} catch (err) {
			toast.error(err.message ?? "Error con SMS");
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-screen lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative hidden overflow-hidden bg-gradient-primary lg:flex lg:flex-col lg:justify-between lg:p-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-mesh opacity-50" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "relative flex items-center gap-2 text-primary-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-9 w-9 items-center justify-center rounded-xl bg-primary-foreground/10 backdrop-blur",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold tracking-tight",
						children: "Nüva One"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative max-w-md text-primary-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl font-bold leading-tight",
						children: "Tu negocio, todo conectado."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-primary-foreground/80",
						children: "Únete a miles de PYMEs que ya operan más rápido y mejor con Nüva One."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative text-xs text-primary-foreground/60",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" Nüva One"
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center justify-center px-6 py-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-md",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "mb-8 flex items-center gap-2 lg:hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 text-primary-foreground" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold tracking-tight",
							children: "Nüva One"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-bold tracking-tight",
						children: tab === "login" ? "Bienvenido de vuelta" : "Crea tu cuenta"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: tab === "login" ? "Inicia sesión para continuar" : "Empieza gratis en menos de un minuto"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 space-y-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: handleGoogle,
							variant: "outline",
							className: "w-full",
							disabled: loading,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								className: "mr-2 h-4 w-4",
								viewBox: "0 0 24 24",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										fill: "#4285F4",
										d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										fill: "#34A853",
										d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										fill: "#FBBC05",
										d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										fill: "#EA4335",
										d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
									})
								]
							}), "Continuar con Google"]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "my-6 flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-border" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: "o con"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-border" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
						value: tab,
						onValueChange: (v) => setTab(v),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "grid w-full grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "login",
								children: "Iniciar sesión"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "signup",
								children: "Registrarse"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: tab,
							className: "mt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
								defaultValue: "email",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
										className: "grid w-full grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
											value: "email",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "mr-1.5 h-3.5 w-3.5" }), "Email"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
											value: "phone",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "mr-1.5 h-3.5 w-3.5" }), "Teléfono"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
										value: "email",
										className: "mt-4 space-y-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
											onSubmit: handleEmail,
											className: "space-y-4",
											children: [
												tab === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "full_name",
													children: "Nombre completo"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "full_name",
													name: "full_name",
													required: true,
													className: "mt-1.5"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "email",
													children: "Email"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "email",
													name: "email",
													type: "email",
													required: true,
													className: "mt-1.5"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "password",
														children: "Contraseña"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "password",
														name: "password",
														type: "password",
														required: true,
														minLength: 8,
														className: "mt-1.5"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-1 text-xs text-muted-foreground",
														children: "Mínimo 8 caracteres"
													})
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													type: "submit",
													className: "w-full shadow-elegant",
													disabled: loading,
													children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }), tab === "login" ? "Entrar" : "Crear cuenta"]
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
										value: "phone",
										className: "mt-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
											onSubmit: handlePhone,
											className: "space-y-4",
											children: phoneStep === "input" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "phone",
												children: "Número de teléfono"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "phone",
												type: "tel",
												placeholder: "+56 9 1234 5678",
												value: phone,
												onChange: (e) => setPhone(e.target.value),
												required: true,
												className: "mt-1.5"
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												type: "submit",
												className: "w-full",
												disabled: loading,
												children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }), "Enviar código"]
											})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "otp",
													children: "Código recibido"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "otp",
													inputMode: "numeric",
													value: otp,
													onChange: (e) => setOtp(e.target.value),
													required: true,
													className: "mt-1.5"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													type: "submit",
													className: "w-full",
													disabled: loading,
													children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }), "Verificar"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setPhoneStep("input"),
													className: "text-xs text-muted-foreground hover:underline",
													children: "Cambiar número"
												})
											] })
										})
									})
								]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-8 text-center text-xs text-muted-foreground",
						children: [
							"Al continuar aceptas nuestros",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/terms",
								className: "underline",
								children: "Términos"
							}),
							" ",
							"y",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/privacy",
								className: "underline",
								children: "Política de Privacidad"
							}),
							"."
						]
					})
				]
			})
		})]
	});
}
//#endregion
export { AuthPage as component };
