import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-yUNcF_nZ.mjs";
import { n as DefaultChatTransport, o as require_react, t as useChat } from "../_libs/@ai-sdk/react+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useActiveBusiness } from "./use-business-CaDVo25M.mjs";
import { M as LoaderCircle, d as Sparkles, g as Send } from "../_libs/lucide-react.mjs";
import { r as PageHeader } from "./page-utils-DmKdauOh.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-Cvo25wT3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AiPage() {
	const [input, setInput] = (0, import_react.useState)("");
	const [token, setToken] = (0, import_react.useState)(null);
	const [sessionReady, setSessionReady] = (0, import_react.useState)(false);
	const [limitReached, setLimitReached] = (0, import_react.useState)(false);
	const { active } = useActiveBusiness();
	const tokenRef = (0, import_react.useRef)(null);
	const businessIdRef = (0, import_react.useRef)("");
	(0, import_react.useEffect)(() => {
		businessIdRef.current = active?.id ?? "";
	}, [active?.id]);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			tokenRef.current = data.session?.access_token ?? null;
			setToken(tokenRef.current);
			setSessionReady(true);
		});
		const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
			tokenRef.current = session?.access_token ?? null;
			setToken(tokenRef.current);
		});
		return () => sub.subscription.unsubscribe();
	}, []);
	const { messages, sendMessage, status } = useChat({
		transport: new DefaultChatTransport({
			api: "/api/chat",
			fetch: (input, init) => {
				const headers = new Headers(init?.headers);
				headers.set("x-business-id", businessIdRef.current);
				if (tokenRef.current) headers.set("Authorization", `Bearer ${tokenRef.current}`);
				return fetch(input, {
					...init,
					headers
				});
			}
		}),
		onError: (err) => {
			let msg = err.message || "Error al conectar con el asistente. Intenta nuevamente.";
			try {
				const parsed = JSON.parse(err.message);
				if (parsed?.error) msg = parsed.error;
			} catch {}
			if (/límite.*(diari|starter)/i.test(msg)) setLimitReached(true);
			else toast.error(msg);
		}
	});
	const loading = status === "submitted" || status === "streaming";
	const suggestions = [
		"¿Cuál fue mi mejor producto del último mes?",
		"¿Cómo está mi flujo de caja?",
		"Sugiéreme un plan de reposición de stock",
		"Redacta un mensaje de bienvenida para clientes nuevos"
	];
	async function handleSend(e) {
		e.preventDefault();
		if (!input.trim() || loading) return;
		if (!token) {
			toast.error("Tu sesión aún se está cargando, intenta de nuevo en un segundo.");
			return;
		}
		setLimitReached(false);
		await sendMessage({ text: input });
		setInput("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Asistente IA",
		description: "Pregunta cualquier cosa sobre tu negocio"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "flex h-[calc(100dvh-14rem)] flex-col p-0 overflow-hidden md:h-[calc(100vh-12rem)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 space-y-4 overflow-y-auto p-6",
				children: [
					messages.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-2xl pt-12 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-8 w-8 text-primary-foreground" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-6 text-2xl font-bold",
								children: "¿Cómo te puedo ayudar?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Pregunta sobre ventas, inventario, finanzas o marketing."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-8 grid gap-3 sm:grid-cols-2",
								children: suggestions.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setInput(s),
									className: "rounded-xl border border-border/60 bg-secondary/30 p-4 text-left text-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-accent",
									children: s
								}, s))
							})
						]
					}),
					messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("flex gap-3", m.role === "user" ? "justify-end" : "justify-start"),
						children: [m.role !== "user" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-primary-foreground" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("max-w-2xl rounded-2xl px-4 py-3 text-sm leading-relaxed", m.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"),
							children: m.parts.map((p, i) => p.type === "text" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.text }, i) : null)
						})]
					}, m.id)),
					loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " Pensando..."]
					})
				]
			}),
			limitReached && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-4 mb-2 flex items-center justify-between gap-3 rounded-xl border border-primary/30 bg-accent/40 px-4 py-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Alcanzaste el límite diario de mensajes del plan Starter." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/settings",
					className: "shrink-0 rounded-lg bg-gradient-primary px-3 py-1.5 text-xs font-medium text-primary-foreground",
					children: "Actualizar a Pro"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSend,
				className: "flex gap-2 border-t bg-background/60 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: input,
					onChange: (e) => setInput(e.target.value),
					placeholder: sessionReady ? "Pregunta algo sobre tu negocio..." : "Cargando sesión...",
					disabled: loading || !sessionReady || limitReached,
					className: "h-11"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					size: "lg",
					disabled: loading || !sessionReady || !input.trim() || limitReached,
					className: "shadow-elegant",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })
				})]
			})
		]
	})] });
}
//#endregion
export { AiPage as component };
