import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Gift } from "lucide-react";
import { cn } from "@/lib/utils";
import { DemoBadge, FCardRow, TopBar } from "@/components/fz/ui";
import { fcards, storeById, stores } from "@/lib/demo-data";

export const Route = createFileRoute("/app/carteira")({
  head: () => ({
    meta: [
      { title: "Carteira — Fideliza Club" },
      { name: "description", content: "Suas FCards, recompensas disponíveis e histórico de resgates." },
      { property: "og:title", content: "Carteira — Fideliza Club" },
      { property: "og:description", content: "Carteira digital de fidelidade." },
    ],
  }),
  component: Carteira,
});

function Carteira() {
  const [state, setState] = useState<"todas" | "ativas" | "concluidas">("todas");
  const [store, setStore] = useState("");
  const list = fcards
    .filter((c) => (state === "todas" ? true : state === "ativas" ? c.stamps < c.goal : c.stamps >= c.goal))
    .filter((c) => !store || c.storeId === store);
  const rewards = fcards.filter((c) => c.stamps >= c.goal);
  return (
    <div>
      <TopBar title="Carteira" right={<DemoBadge />} />
      <div className="space-y-5 p-4">
        <section>
          <h2 className="mb-2 font-extrabold">Recompensas disponíveis</h2>
          {rewards.map((c) => (
            <div key={c.id} className="flex items-center gap-3 rounded-2xl bg-brand p-4 text-primary-foreground">
              <Gift className="h-8 w-8 shrink-0" />
              <div><p className="font-extrabold">{c.reward}</p><p className="text-xs opacity-90">{storeById(c.storeId).name} · apresente na loja</p></div>
            </div>
          ))}
        </section>
        <div className="flex flex-wrap gap-2">
          {(["todas", "ativas", "concluidas"] as const).map((t) => (
            <button key={t} onClick={() => setState(t)} className={cn("rounded-full px-4 py-1.5 text-sm font-bold capitalize", state === t ? "bg-primary text-primary-foreground" : "border text-muted-foreground")}>
              {t === "concluidas" ? "Concluídas" : t}
            </button>
          ))}
          <select value={store} onChange={(e) => setStore(e.target.value)} className="rounded-full border bg-surface px-3 py-1.5 text-sm">
            <option value="">Todas as lojas</option>
            {stores.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <div className="space-y-3">{list.map((c) => <FCardRow key={c.id} card={c} />)}</div>
        <section>
          <h2 className="mb-2 font-extrabold">Histórico de resgates</h2>
          <p className="rounded-xl border px-3 py-3 text-sm text-muted-foreground">Nenhum resgate registrado ainda.</p>
        </section>
      </div>
    </div>
  );
}
