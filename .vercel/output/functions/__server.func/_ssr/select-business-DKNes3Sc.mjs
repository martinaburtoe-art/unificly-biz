import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-yUNcF_nZ.mjs";
import { o as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useBusinesses } from "./use-business-CaDVo25M.mjs";
import { A as LogOut, at as Building2, b as Plus, d as Sparkles } from "../_libs/lucide-react.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/select-business-DKNes3Sc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SelectBusiness() {
	const navigate = useNavigate();
	const { data: businesses, isLoading } = useBusinesses();
	(0, import_react.useEffect)(() => {
		supabase.auth.getUser().then(({ data }) => {
			if (!data.user) navigate({ to: "/auth" });
		});
	}, [navigate]);
	(0, import_react.useEffect)(() => {
		if (!isLoading && businesses && businesses.length === 0) navigate({ to: "/onboarding" });
		if (!isLoading && businesses && businesses.length === 1) {
			localStorage.setItem("novaflow.active_business_id", businesses[0].id);
			navigate({ to: "/dashboard" });
		}
	}, [
		businesses,
		isLoading,
		navigate
	]);
	function select(id) {
		localStorage.setItem("novaflow.active_business_id", id);
		navigate({ to: "/dashboard" });
	}
	async function logout() {
		await supabase.auth.signOut();
		navigate({ to: "/auth" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-gradient-mesh",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-4xl px-6 py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-primary-foreground" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold tracking-tight",
							children: "Nüva One"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: logout,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "mr-1.5 h-4 w-4" }), "Salir"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-4xl font-bold tracking-tight",
						children: "Selecciona tu negocio"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-muted-foreground",
						children: "Elige el negocio con el que quieres trabajar."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: [businesses?.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						onClick: () => select(b.id),
						className: "group cursor-pointer p-6 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-elegant",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-6 w-6" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 font-semibold",
								children: b.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs uppercase tracking-wide text-muted-foreground",
								children: b.industry
							})
						]
					}, b.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/onboarding",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "flex h-full cursor-pointer items-center justify-center border-dashed p-6 transition-all hover:-translate-y-1 hover:border-primary hover:bg-accent",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mx-auto flex h-12 w-12 items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/40",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-6 w-6 text-muted-foreground" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-sm font-medium",
									children: "Crear nuevo negocio"
								})]
							})
						})
					})]
				})
			]
		})
	});
}
//#endregion
export { SelectBusiness as component };
