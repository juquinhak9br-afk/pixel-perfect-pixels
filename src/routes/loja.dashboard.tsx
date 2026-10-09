import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileImage, Tag, Stamp, Users, Film, Send } from "lucide-react";
import { DemoBadge, StoreAvatar } from "@/components/fz/ui";

export const Route = createFileRoute("/loja/dashboard")({
  head: () => ({
    meta: [
      { title: "Painel da loja — Fideliza Club" },
      { name: "description", content: "Indicadores e atalhos de gestão da sua loja." },
      { property: "og:title", content: "Painel da loja — Fideliza Club" },
      { property: "og:description", content: "Gerencie sua loja no Fideliza Club." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [open, setOpen] = useState(true);
  const stats = [["Clientes fidelizados", "1.248"], ["Selos distribuídos", "5.930"], ["Recompensas resgatadas", "482"], ["Cartelas ativas", "736"]];
  const actions = [[FileImage, "Criar publicação"], [Tag, "Criar promoção"], [Stamp, "Gerenciar FCards"], [Users, "Ver clientes"], [Film, "Criar Story"], [Send, "Enviar notificação"]] as const;
  return (
    <div className="mx-auto min-h-screen max-w-md space-y-5 bg-surface p-4">
      <div className="flex items-center gap-3">
        <StoreAvatar storeId="burger-craft" size={52} />
        <div className="min-w-0 flex-1">
          <p className="text-lg font-extrabold">Olá, Burger Craft</p>
          <button onClick={() => setOpen(!open)} className="text-xs font-bold text-primary">{open ? "● Aberta" : "○ Fechada"} · alternar</button>
        </div>
      </div>
      <DemoBadge />
      <div className="grid grid-cols-2 gap-3">
        {stats.map(([l, v]) => (
          <div key={l} className="rounded-2xl border p-4"><p className="text-xs text-muted-foreground">{l}</p><p className="text-2xl font-extrabold">{v}</p></div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {actions.map(([Icon, l]) => (
          <div key={l} className="flex flex-col items-center gap-2 rounded-2xl border p-3 text-center text-[11px] font-semibold">
            <Icon className="h-5 w-5 text-primary" />{l}
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">Ferramentas de gestão ficam disponíveis após conectar o servidor.</p>
    </div>
  );
}
