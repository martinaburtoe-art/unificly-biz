import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { G as objectType, K as stringType, W as enumType } from "../_libs/@ai-sdk/gateway+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-BTbV_eN7.js
var $$splitComponentImporter = () => import("./auth-Cib5CNEo.mjs");
var searchSchema = objectType({
	mode: enumType(["login", "signup"]).optional(),
	redirect: stringType().optional()
});
var Route = createFileRoute("/auth")({
	validateSearch: searchSchema,
	head: () => ({ meta: [{ title: "Iniciar sesión — Nüva One" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
