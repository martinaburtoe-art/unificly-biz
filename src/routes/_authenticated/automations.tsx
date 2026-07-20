import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageHeader, EmptyState } from "@/components/page-utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Workflow,
  Plus,
  Trash2,
  MessageSquare,
  Bell,
  Mail,
  ShoppingCart,
  Zap,
  Phone,
  CheckCircle2,
} from "lucide-react";
import { useBizList, useBizInsert, useBizUpdate, useBizDelete } from "@/lib/biz-data";
import { useActiveBusiness, useMyRole, canWriteOperations } from "@/lib/use-business";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/automations")({
  head: () => ({ meta: [{ title: "Automatizaciones — Nüva One" }] }),
  component: Automations,
});

const templates = [
  {
    icon: MessageSquare,
    n: "WhatsApp → Lead en CRM",
    t: "Nuevo mensaje en WhatsApp",
    a: "Crear lead",
  },
  { icon: Bell, n: "Stock bajo → Alerta", t: "Stock bajo umbral", a: "Enviar alerta" },
  {
    icon: Mail,
    n: "Cotización aceptada → Notificar equipo",
    t: "Cotización aceptada",
    a: "Email al equipo",
  },
  {
    icon: ShoppingCart,
    n: "Nueva venta → Email de agradecimiento",
    t: "Venta creada",
    a: "Email al cliente",
  },
];

function Automations() {
  const { data: myRole } = useMyRole();
  const canWrite = canWriteOperations(myRole);
  const { data, isLoading } = useBizList<any>("automations", { order: "created_at" });
  const { active } = useActiveBusiness();
  const insert = useBizInsert("automations");
  const upd = useBizUpdate("automations");
  const del = useBizDelete("automations");
  const [open, setOpen] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState(
    active?.id ? `https://app.nuvaone.cl/webhooks/${active.id}` : "",
  );

  // WhatsApp — automatización por defecto: no requiere n8n, solo los datos
  // del número de Meta Cloud API. Una vez guardado, el chatbot responde solo.
  const { data: waConnections, isLoading: waLoading } = useBizList<{
    id: string;
    phone_number_id: string;
    waba_id: string | null;
    display_phone_number: string | null;
    access_token: string;
    auto_stock_query: boolean;
    auto_price_query: boolean;
    auto_general_ai: boolean;
    active: boolean;
  }>("whatsapp_connections");
  const waInsert = useBizInsert("whatsapp_connections");
  const waUpdate = useBizUpdate("whatsapp_connections");
  const wa = waConnections?.[0];
  const [waForm, setWaForm] = useState({
    phone_number_id: "",
    waba_id: "",
    display_phone_number: "",
    access_token: "",
  });

  useEffect(() => {
    if (wa) {
      setWaForm({
        phone_number_id: wa.phone_number_id,
        waba_id: wa.waba_id ?? "",
        display_phone_number: wa.display_phone_number ?? "",
        access_token: wa.access_token,
      });
    }
  }, [wa?.id]);

  async function saveWhatsApp() {
    if (!waForm.phone_number_id || !waForm.access_token) {
      toast.error("Completa el Phone Number ID y el Access Token de Meta");
      return;
    }
    if (wa) {
      await waUpdate.mutateAsync({ id: wa.id, patch: waForm });
    } else {
      await waInsert.mutateAsync({
        ...waForm,
        auto_stock_query: true,
        auto_price_query: true,
        auto_general_ai: true,
        active: true,
      });
    }
  }

  useEffect(() => {
    if (!active) return;
    setWebhookUrl(active.webhook_url || `https://app.nuvaone.cl/webhooks/${active.id}`);
  }, [active]);

  async function saveWebhook() {
    if (!active) return;
    const { error } = await supabase
      .from("businesses")
      .update({ webhook_url: webhookUrl })
      .eq("id", active.id);
    if (error) toast.error("Error al guardar");
    else toast.success("Webhook guardado");
  }

  async function fromTemplate(tpl: (typeof templates)[number]) {
    await insert.mutateAsync({
      name: tpl.n,
      trigger_type: tpl.t,
      action_type: tpl.a,
      enabled: true,
    });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await insert.mutateAsync({
      name: fd.get("name"),
      trigger_type: fd.get("trigger_type"),
      action_type: fd.get("action_type"),
      enabled: true,
    });
    setOpen(false);
  }

  return (
    <>
      <PageHeader
        title="Automatizaciones"
        description="Conecta tu motor de automatización (n8n u otro) y deja que Nüva One trabaje por ti"
        action={
          !canWrite ? undefined : (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-1.5 h-4 w-4" />
                  Nueva automatización
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Crear automatización</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nombre</Label>
                    <Input id="name" name="name" required />
                  </div>
                  <div>
                    <Label htmlFor="trigger_type">Trigger (cuándo)</Label>
                    <Input
                      id="trigger_type"
                      name="trigger_type"
                      placeholder="Ej: Nueva venta"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="action_type">Acción (qué hacer)</Label>
                    <Input
                      id="action_type"
                      name="action_type"
                      placeholder="Ej: Enviar email"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Crear
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          )
        }
      />

      <Card className="mb-6 border-primary/30 bg-accent/40 p-6">
        <div className="flex items-start gap-3">
          <Zap className="mt-0.5 h-5 w-5 text-primary" />
          <div className="flex-1">
            <h3 className="font-semibold">Conecta tu motor de automatización</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Usa este webhook como punto de conexión para n8n u otro motor externo.
            </p>
            <div className="mt-3 flex gap-2">
              <Input
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="font-mono text-xs"
              />
              <Button onClick={saveWebhook} variant="outline">
                Guardar
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Card className="mb-6 p-6">
        <div className="flex items-start gap-3">
          <Phone className="mt-0.5 h-5 w-5 text-primary" />
          <div className="w-full flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Chatbot de WhatsApp (automatización por defecto)</h3>
              {wa?.active && <CheckCircle2 className="h-4 w-4 text-green-600" />}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Ingresa los datos de tu número en Meta Cloud API una sola vez (gratis hasta 1.000
              conversaciones/mes). Desde ese momento, tus clientes pueden escribirte por WhatsApp y
              el sistema responde solo con tu stock, precios y datos reales — no necesitas
              configurar nada más.
            </p>

            {waLoading ? (
              <Skeleton className="mt-4 h-32 w-full" />
            ) : (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <Label htmlFor="wa_phone_id">Phone Number ID (Meta)</Label>
                  <Input
                    id="wa_phone_id"
                    value={waForm.phone_number_id}
                    onChange={(e) => setWaForm((f) => ({ ...f, phone_number_id: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="wa_display">Número visible (opcional)</Label>
                  <Input
                    id="wa_display"
                    placeholder="+56 9 1234 5678"
                    value={waForm.display_phone_number}
                    onChange={(e) =>
                      setWaForm((f) => ({ ...f, display_phone_number: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="wa_waba">WhatsApp Business Account ID (opcional)</Label>
                  <Input
                    id="wa_waba"
                    value={waForm.waba_id}
                    onChange={(e) => setWaForm((f) => ({ ...f, waba_id: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="wa_token">Access Token (Meta)</Label>
                  <Input
                    id="wa_token"
                    type="password"
                    value={waForm.access_token}
                    onChange={(e) => setWaForm((f) => ({ ...f, access_token: e.target.value }))}
                  />
                </div>
              </div>
            )}

            {wa && (
              <div className="mt-4 space-y-2 border-t pt-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto_stock" className="font-normal">
                    Responder consultas de stock
                  </Label>
                  <Switch
                    id="auto_stock"
                    checked={wa.auto_stock_query}
                    onCheckedChange={(v) =>
                      waUpdate.mutate({ id: wa.id, patch: { auto_stock_query: v } })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto_price" className="font-normal">
                    Responder consultas de precio
                  </Label>
                  <Switch
                    id="auto_price"
                    checked={wa.auto_price_query}
                    onCheckedChange={(v) =>
                      waUpdate.mutate({ id: wa.id, patch: { auto_price_query: v } })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto_general" className="font-normal">
                    Responder preguntas generales con IA
                  </Label>
                  <Switch
                    id="auto_general"
                    checked={wa.auto_general_ai}
                    onCheckedChange={(v) =>
                      waUpdate.mutate({ id: wa.id, patch: { auto_general_ai: v } })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="wa_active" className="font-normal">
                    Chatbot activo
                  </Label>
                  <Switch
                    id="wa_active"
                    checked={wa.active}
                    onCheckedChange={(v) => waUpdate.mutate({ id: wa.id, patch: { active: v } })}
                  />
                </div>
              </div>
            )}

            <Button onClick={saveWhatsApp} className="mt-4">
              {wa ? "Actualizar conexión" : "Conectar WhatsApp"}
            </Button>
          </div>
        </div>
      </Card>

      <div className="mb-8">
        <h3 className="mb-3 text-sm font-semibold text-muted-foreground">PLANTILLAS</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {templates.map((tpl) => (
            <Card
              key={tpl.n}
              className="cursor-pointer p-4 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-soft"
              onClick={() => fromTemplate(tpl)}
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground">
                <tpl.icon className="h-4 w-4" />
              </div>
              <div className="text-sm font-medium">{tpl.n}</div>
              <div className="mt-1 text-xs text-muted-foreground">
                {tpl.t} → {tpl.a}
              </div>
            </Card>
          ))}
        </div>
      </div>

      <h3 className="mb-3 text-sm font-semibold text-muted-foreground">TUS AUTOMATIZACIONES</h3>
      {isLoading ? (
        <Skeleton className="h-40 w-full" />
      ) : !data || data.length === 0 ? (
        <EmptyState
          icon={Workflow}
          title="Sin automatizaciones activas"
          description="Empieza con una plantilla arriba o crea una nueva."
        />
      ) : (
        <div className="space-y-3">
          {data.map((a) => (
            <Card key={a.id} className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                  <Workflow className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium">{a.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {a.trigger_type} → {a.action_type} · {a.run_count} ejecuciones
                  </div>
                </div>
                <Switch
                  checked={a.enabled}
                  onCheckedChange={(v) => upd.mutate({ id: a.id, patch: { enabled: v } })}
                />
                <Button variant="ghost" size="icon" onClick={() => del.mutate(a.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
