import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X, Heart, Share2 } from "lucide-react";
import { DemoBadge, StoreAvatar, TopBar } from "@/components/fz/ui";
import { posts, storeById } from "@/lib/demo-data";

export const Route = createFileRoute("/app/fworlds")({
  head: () => ({
    meta: [
      { title: "F-Worlds — Fideliza Club" },
      { name: "description", content: "Galeria visual dos estabelecimentos parceiros." },
      { property: "og:title", content: "F-Worlds — Fideliza Club" },
      { property: "og:description", content: "Descubra lojas locais pela galeria." },
    ],
  }),
  component: FWorlds,
});

function FWorlds() {
  const items = [...posts, ...posts].map((p, i) => ({ ...p, key: `${p.id}-${i}` }));
  const [open, setOpen] = useState<(typeof items)[number] | null>(null);
  return (
    <div>
      <TopBar title="F-Worlds" right={<DemoBadge />} />
      <div className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-3">
        {items.map((p) => {
          const s = storeById(p.storeId);
          return (
            <button key={p.key} onClick={() => setOpen(p)} className="text-left">
              <img src={s.image} alt={p.title} width={300} height={300} loading="lazy" className="aspect-square w-full rounded-xl object-cover" />
              <p className="mt-1 truncate text-xs font-bold">{s.name}</p>
              <p className="truncate text-[11px] text-muted-foreground">{s.handle}</p>
            </button>
          );
        })}
      </div>
      {open && (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-foreground/50 sm:items-center" onClick={() => setOpen(null)}>
          <div onClick={(e) => e.stopPropagation()} className="fade-up w-full max-w-md overflow-hidden rounded-t-3xl bg-surface sm:rounded-3xl">
            <div className="flex items-center gap-3 p-4">
              <StoreAvatar storeId={open.storeId} size={38} />
              <p className="flex-1 font-bold">{storeById(open.storeId).name}</p>
              <button onClick={() => setOpen(null)} aria-label="Fechar"><X className="h-6 w-6" /></button>
            </div>
            <img src={storeById(open.storeId).image} alt={open.title} className="aspect-square w-full object-cover" />
            <div className="space-y-2 p-4 pb-8">
              <div className="flex gap-4"><span className="flex items-center gap-1 text-sm font-semibold"><Heart className="h-5 w-5" /> {open.likes}</span><Share2 className="h-5 w-5" /></div>
              <p className="text-sm"><b>{open.title}</b> {open.text}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
