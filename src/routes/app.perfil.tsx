import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronRight, LogOut, Bell, FileText, Shield, History, Pencil } from "lucide-react";
import { DemoBadge, TopBar } from "@/components/fz/ui";

export const Route = createFileRoute("/app/perfil")({
  head: () => ({
    meta: [
      { title: "Meu perfil — Fideliza Club" },
      { name: "description", content: "Seus dados, preferências e atividades no Fideliza Club." },
      { property: "og:title", content: "Meu perfil — Fideliza Club" },
      { property: "og:description", content: "Gerencie sua conta." },
    ],
  }),
  component: Perfil,
});

function Perfil() {
  const [notif, setNotif] = useState(true);
  const rows = [
    { icon: Pencil, t: "Editar dados" }, { icon: History, t: "Histórico de atividades" },
    { icon: FileText, t: "Termos de uso" }, { icon: Shield, t: "Política de privacidade" },
  ];
  return (
    <div>
      <TopBar title="Meu perfil" />
      <div className="space-y-5 p-4">
        <div className="flex flex-col items-center text-center">
          <div className="grid h-24 w-24 place-items-center rounded-full bg-primary-soft text-3xl font-extrabold text-primary">MA</div>
          <p className="mt-3 text-lg font-extrabold">Maria Alves</p>
          <p className="text-sm text-muted-foreground">maria@email.com · (61) 99999-9999</p>
          <DemoBadge className="mt-2" />
        </div>
        <div className="divide-y rounded-2xl border">
          <label className="flex items-center gap-3 p-4">
            <Bell className="h-5 w-5 text-primary" />
            <span className="flex-1 text-sm font-semibold">Notificações</span>
            <input type="checkbox" checked={notif} onChange={() => setNotif(!notif)} className="h-5 w-5 accent-primary" />
          </label>
          {rows.map(({ icon: Icon, t }) => (
            <button key={t} className="flex w-full items-center gap-3 p-4 text-left">
              <Icon className="h-5 w-5 text-primary" /><span className="flex-1 text-sm font-semibold">{t}</span><ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>
        <Link to="/login" className="flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-bold text-destructive"><LogOut className="h-4 w-4" /> Sair da conta</Link>
      </div>
    </div>
  );
}
