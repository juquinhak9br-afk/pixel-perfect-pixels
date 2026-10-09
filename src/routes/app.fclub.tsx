import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { BellLink, DemoBadge, StoreAvatar, TopBar } from "@/components/fz/ui";
import { posts, storeById, stores } from "@/lib/demo-data";

export const Route = createFileRoute("/app/fclub")({
  head: () => ({
    meta: [
      { title: "F-Club — Fideliza Club" },
      { name: "description", content: "Feed de publicações e promoções dos estabelecimentos parceiros." },
      { property: "og:title", content: "F-Club — Fideliza Club" },
      { property: "og:description", content: "Publicações, stories e ofertas das lojas parceiras." },
    ],
  }),
  component: FClub,
});

function FClub() {
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const share = async (title: string) => {
    if (navigator.share) await navigator.share({ title, url: location.href }).catch(() => {});
    else await navigator.clipboard?.writeText(location.href);
  };
  return (
    <div>
      <TopBar title={<span className="text-primary">F-Club</span>} right={<BellLink to="/app/notificacoes" />} />
      <div className="px-4 pt-3">
        <label className="flex h-11 items-center gap-2 rounded-xl border px-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input placeholder="Buscar estabelecimentos" className="w-full bg-transparent text-sm outline-none" />
        </label>
      </div>
      <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 py-4">
        {stores.map((s) => (
          <div key={s.id} className="flex w-16 shrink-0 flex-col items-center gap-1">
            <div className="rounded-full bg-brand p-[2.5px]"><StoreAvatar storeId={s.id} size={58} /></div>
            <span className="w-full truncate text-center text-[10px] font-semibold">{s.name}</span>
          </div>
        ))}
      </div>
      <div className="px-4"><DemoBadge /></div>
      <div className="mt-3 space-y-6 pb-4">
        {posts.map((p) => {
          const s = storeById(p.storeId);
          const on = liked[p.id];
          return (
            <article key={p.id} className="fade-up">
              <div className="flex items-center gap-3 px-4 pb-3">
                <StoreAvatar storeId={s.id} size={38} />
                <div className="min-w-0"><p className="truncate text-sm font-bold">{s.name}</p><p className="text-xs text-muted-foreground">{p.time}</p></div>
              </div>
              <div className="relative">
                <img src={s.image} alt={p.title} width={1024} height={768} loading="lazy" className="aspect-[4/5] w-full object-cover" />
                {p.promo && (
                  <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-foreground/70 p-4 text-primary-foreground backdrop-blur">
                    <p className="text-xl font-extrabold">{p.title}</p>
                    <p className="text-sm opacity-90">{p.text}</p>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4 px-4 pt-3">
                <button onClick={() => setLiked({ ...liked, [p.id]: !on })} className={cn("flex items-center gap-1 text-sm font-semibold", on && "text-primary")}>
                  <Heart className={cn("h-6 w-6", on && "fill-primary")} /> {p.likes + (on ? 1 : 0)}
                </button>
                <span className="flex items-center gap-1 text-sm font-semibold"><MessageCircle className="h-6 w-6" /> {p.comments}</span>
                <button onClick={() => share(p.title)} aria-label="Compartilhar"><Share2 className="h-6 w-6" /></button>
                <button onClick={() => setSaved({ ...saved, [p.id]: !saved[p.id] })} aria-label="Salvar" className="ml-auto">
                  <Bookmark className={cn("h-6 w-6", saved[p.id] && "fill-primary text-primary")} />
                </button>
              </div>
              {!p.promo && <p className="px-4 pt-2 text-sm"><b>{p.title}</b> {p.text}</p>}
            </article>
          );
        })}
      </div>
    </div>
  );
}
