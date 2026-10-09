import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { DemoBadge, FCardRow, TopBar } from "@/components/fz/ui";
import { fcards, storeById } from "@/lib/demo-data";

export const Route = createFileRoute("/app/fcards/")({
  head: () => ({
    meta: [
      { title: "Minhas FCards — Fideliza Club" },
      { name: "description", content: "Suas cartelas digitais de fidelidade ativas e concluídas." },
      { property: "og:title", content: "Minhas FCards — Fideliza Club" },
      { property: "og:description", content: "Cartelas de selos digitais." },
    ],
  }),
  component: FCards,
});

function FCards() {
  const [tab, setTab] = useState<"ativas" | "concluidas">("ativas");
  const [q, setQ] = useState("");
  const list = fcards
    .filter((c) => (tab === "ativas" ? c.stamps < c.goal : c.stamps >= c.goal))
    .filter((c) => storeById(c.storeId).name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <TopBar title="Minhas FCards" back={<Link to="/app/inicio" aria-label="Voltar"><ChevronLeft className="h-6 w-6" /></Link>} />
      <div className="space-y-4 p-4">
        <div className="flex gap-2">
          {(["ativas", "concluidas"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={cn("rounded-full px-5 py-2 text-sm font-bold transition", tab === t ? "bg-primary text-primary-foreground" : "border text-muted-foreground")}>
              {t === "ativas" ? "Ativas" : "Concluídas"}
            </button>
          ))}
        </div>
        <label className="flex h-11 items-center gap-2 rounded-xl border px-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar estabelecimento" className="w-full bg-transparent text-sm outline-none" />
        </label>
        <DemoBadge />
        <div className="space-y-3">
          {list.map((c) => <FCardRow key={c.id} card={c} />)}
          {list.length === 0 && <p className="py-10 text-center text-sm text-muted-foreground">Nenhuma cartela aqui ainda. Sua FCard aparece após o primeiro selo registrado pela loja.</p>}
        </div>
      </div>
    </div>
  );
}
