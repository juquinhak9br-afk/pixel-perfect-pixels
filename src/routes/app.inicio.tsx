import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Beef, Coffee, Sparkles, Scissors, ShoppingBasket, LayoutGrid, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BellLink, DemoBadge, FCardRow, Logo, Wordmark } from "@/components/fz/ui";
import { fcards, posts, storeById, stores } from "@/lib/demo-data";

export const Route = createFileRoute("/app/inicio")({
  head: () => ({
    meta: [
      { title: "Início — Fideliza Club" },
      { name: "description", content: "Ofertas exclusivas dos parceiros e suas FCards." },
      { property: "og:title", content: "Início — Fideliza Club" },
      { property: "og:description", content: "Ofertas exclusivas e cartões de fidelidade." },
    ],
  }),
  component: Inicio,
});

const cats = [
  { label: "Burgers", icon: Beef }, { label: "Cafés", icon: Coffee }, { label: "Beleza", icon: Sparkles },
  { label: "Serviços", icon: Scissors }, { label: "Mercados", icon: ShoppingBasket }, { label: "Ver todas", icon: LayoutGrid },
];

const banners = [
  { storeId: "burger-craft", title: "Burger Craft", text: "Ganhe 1 selo a cada R$ 30 em compras" },
  { storeId: "cafe-do-povo", title: "Café do Povo", text: "Café especial + pão de queijo" },
  { storeId: "studio-beleza", title: "Studio Beleza", text: "Selo em dobro nesta semana" },
];

function Inicio() {
  const [idx, setIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % banners.length), 20000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (el) el.scrollTo({ left: idx * el.clientWidth, behavior: "smooth" });
  }, [idx]);
  const mine = fcards.filter((c) => c.stamps > 0);

  return (
    <div className="fade-up">
      <header className="flex items-center justify-between px-4 pt-4">
        <div className="flex items-center gap-2"><Logo size={30} /><Wordmark className="text-base" /></div>
        <div className="flex items-center gap-2">
          <BellLink to="/app/notificacoes" />
          <Link to="/app/perfil" className="grid h-10 w-10 place-items-center rounded-full bg-primary-soft text-sm font-bold text-primary">MA</Link>
        </div>
      </header>

      <section className="px-4 pt-6">
        <h1 className="text-2xl font-extrabold">Seja bem-vindo!</h1>
        <p className="text-sm text-muted-foreground">Ofertas exclusivas de nossos parceiros.</p>
      </section>

      <div className="no-scrollbar mt-5 flex gap-4 overflow-x-auto px-4">
        {cats.map(({ label, icon: Icon }) => (
          <button key={label} className="flex shrink-0 flex-col items-center gap-1.5">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary"><Icon className="h-6 w-6" /></span>
            <span className="text-[11px] font-semibold">{label}</span>
          </button>
        ))}
      </div>

      <section className="mt-6 px-4">
        <div ref={ref} onScroll={(e) => { const el = e.currentTarget; const i = Math.round(el.scrollLeft / el.clientWidth); if (i !== idx) setIdx(i); }} className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto rounded-2xl">
          {banners.map((b) => {
            const s = storeById(b.storeId);
            return (
              <div key={b.storeId} className="relative h-44 w-full shrink-0 snap-center overflow-hidden rounded-2xl">
                <img src={s.image} alt={s.name} width={1024} height={768} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/40 to-transparent" />
                <div className="relative flex h-full max-w-[60%] flex-col justify-center gap-2 p-5 text-primary-foreground">
                  <p className="text-xl font-extrabold">{b.title}</p>
                  <p className="text-xs opacity-90">{b.text}</p>
                  <Link to="/app/fclub" className="mt-1 w-fit rounded-full bg-primary px-4 py-1.5 text-xs font-bold">Ver mais</Link>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-3 flex justify-center gap-1.5">
          {banners.map((_, i) => (
            <button key={i} aria-label={`Banner ${i + 1}`} onClick={() => setIdx(i)} className={cn("h-1.5 rounded-full transition-all", i === idx ? "w-5 bg-primary" : "w-1.5 bg-border")} />
          ))}
        </div>
      </section>

      <section className="mt-6 px-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-extrabold">Minhas FCards</h2>
          <Link to="/app/fcards" className="flex items-center text-sm font-semibold text-primary">Ver todas <ChevronRight className="h-4 w-4" /></Link>
        </div>
        <DemoBadge className="mb-3" />
        <div className="space-y-3">{mine.slice(0, 3).map((c) => <FCardRow key={c.id} card={c} />)}</div>
      </section>

      <section className="mt-7 px-4">
        <h2 className="mb-3 text-lg font-extrabold">Promoções em destaque</h2>
        <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4">
          {posts.filter((p) => p.promo).map((p) => {
            const s = storeById(p.storeId);
            return (
              <Link key={p.id} to="/app/fclub" className="w-60 shrink-0 overflow-hidden rounded-2xl border bg-card">
                <img src={s.image} alt={p.title} width={240} height={140} loading="lazy" className="h-32 w-full object-cover" />
                <div className="p-3">
                  <p className="text-xs text-muted-foreground">{s.name}</p>
                  <p className="font-bold">{p.title}</p>
                  <p className="text-sm font-extrabold text-primary">{p.promo}</p>
                </div>
              </Link>
            );
          })}
          {stores.length === 0 && null}
        </div>
      </section>
    </div>
  );
}
