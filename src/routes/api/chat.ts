import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as { messages?: UIMessage[] };
        const messages = body.messages ?? [];
        const key = process.env.LOVABLE_API_KEY;
        if (!key) {
          return new Response(JSON.stringify({ error: "AI no configurado" }), { status: 500 });
        }
        const gateway = createLovableAiGatewayProvider(key);
        const model = gateway("google/gemini-3-flash-preview");

        const system = `Eres el asistente de NovaFlow, una plataforma de gestión para PYMEs en Chile y Latinoamérica. Respondes en español neutro de LatAm, en tono profesional pero cercano. Eres breve y accionable. Cuando el usuario pregunte por sus datos, indícale dónde verlos en la plataforma (Ventas, Inventario, Finanzas, Indicadores, etc.). Si no tienes contexto suficiente, pide los datos necesarios. Nunca inventes cifras del negocio.`;

        try {
          const result = streamText({
            model,
            system,
            messages: await convertToModelMessages(messages),
          });
          return result.toUIMessageStreamResponse({ originalMessages: messages });
        } catch (err: any) {
          console.error("AI error", err);
          const msg = err?.statusCode === 429
            ? "Has alcanzado el límite de uso. Intenta más tarde."
            : err?.statusCode === 402
            ? "Sin créditos de IA. Recarga tu plan."
            : "Error en la IA. Intenta nuevamente.";
          return new Response(JSON.stringify({ error: msg }), { status: err?.statusCode ?? 500 });
        }
      },
    },
  },
});
