import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { DemoBadge, Logo, TopBar } from "@/components/fz/ui";
import { notifications } from "@/lib/demo-data";

export const Route = createFileRoute("/app/notificacoes")({
  head: () => ({
    meta: [
      { title: "Notificações — Fideliza Club" },
      { name: "description", content: "Selos, recompensas e novidades das suas lojas." },
      { property: "og:title", content: "Notificações — Fideliza Club" },
      { property: "og:description", content: "Central de notificações." },
    ],
  }),
  component: Notificacoes,
});

function Notificacoes() {
  const [items, setItems] = useState(notifications);
  const unread = items.filter((n) => !n.read);
  const read = items.filter((n) => n.read);
  const Item = ({ n }: { n: (typeof items)[number] }) => (
    <button onClick={() => setItems(items.map((x) => (x.id === n.id ? { ...x, read: true } : x)))} className={cn("flex w-full gap-3 rounded-2xl border p-3 text-left", !n.read && "border-primary/30 bg-primary-soft")}>
      <Logo size={36} />
      <div className="min-w-0 flex-1"><p className="text-sm font-bold">{n.title}</p><p className="truncate text-xs text-muted-foreground">{n.body} · {n.time}</p></div>
    </button>
  );
  return (
    <div>
      <TopBar title="Notificações" back={<Link to="/app/inicio" aria-label="Voltar"><ChevronLeft className="h-6 w-6" /></Link>} right={<DemoBadge />} />
      <div className="space-y-5 p-4">
        <section className="space-y-2"><h2 className="text-sm font-extrabold text-muted-foreground">Não lidas ({unread.length})</h2>{unread.map((n) => <Item key={n.id} n={n} />)}</section>
        <section className="space-y-2"><h2 className="text-sm font-extrabold text-muted-foreground">Lidas</h2>{read.map((n) => <Item key={n.id} n={n} />)}</section>
      </div>
    </div>
  );
}
