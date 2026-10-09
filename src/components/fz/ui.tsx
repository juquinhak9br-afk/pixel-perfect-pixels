import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Heart, Globe, Wallet, User, Bell, Check, LayoutGrid, FileImage, Tag, Users, Settings } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { storeById, type FCard } from "@/lib/demo-data";

export function Logo({ size = 40, light = false }: { size?: number; light?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn("grid shrink-0 place-items-center rounded-full font-extrabold", light ? "bg-surface text-primary" : "bg-primary text-primary-foreground")}
        style={{ width: size, height: size, fontSize: size * 0.55 }}
      >
        F
      </div>
    </div>
  );
}

export function Wordmark({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <span className={cn("font-extrabold tracking-tight", className)}>
      <span className={light ? "text-primary-foreground" : "text-foreground"}>Fideliza </span>
      <span className={light ? "text-primary-foreground" : "text-primary"}>Club</span>
    </span>
  );
}

export function DemoBadge({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground", className)}>
      Dados de exemplo
    </span>
  );
}

export function StoreAvatar({ storeId, size = 44 }: { storeId: string; size?: number }) {
  const s = storeById(storeId);
  return (
    <img src={s.image} alt={s.name} width={size} height={size} loading="lazy" className="shrink-0 rounded-full border-2 border-surface object-cover" style={{ width: size, height: size }} />
  );
}

export function Stamps({ stamps, goal, size = 28 }: { stamps: number; goal: number; size?: number }) {
  return (
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: goal }).map((_, i) => (
        <div
          key={i}
          className={cn("grid place-items-center rounded-full border-2", i < stamps ? "border-primary bg-primary text-primary-foreground" : "border-border bg-surface")}
          style={{ width: size, height: size }}
        >
          {i < stamps && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
        </div>
      ))}
    </div>
  );
}

export function Progress({ value }: { value: number }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
      <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${Math.min(100, value * 100)}%` }} />
    </div>
  );
}

export function FCardRow({ card }: { card: FCard }) {
  const s = storeById(card.storeId);
  const done = card.stamps >= card.goal;
  return (
    <Link to="/app/fcards/$id" params={{ id: card.id }} className="flex gap-3 rounded-2xl border bg-card p-3 shadow-soft transition active:scale-[0.99]">
      <img src={s.image} alt={s.name} width={72} height={72} loading="lazy" className="h-[72px] w-[72px] shrink-0 rounded-xl object-cover" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate font-bold">{s.name}</p>
          {done ? <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-bold text-primary">Concluída</span> : <span className="text-xs font-semibold text-muted-foreground">{card.stamps}/{card.goal}</span>}
        </div>
        <p className="truncate text-xs text-muted-foreground">{card.stamps} de {card.goal} selos · {card.reward}</p>
        <div className="mt-3"><Progress value={card.stamps / card.goal} /></div>
      </div>
    </Link>
  );
}

export function TopBar({ title, right, back }: { title: ReactNode; right?: ReactNode; back?: ReactNode }) {
  return (
    <header className="sticky top-0 z-20 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b bg-surface/90 px-4 py-3 backdrop-blur">
      <div className="flex min-w-0 items-center gap-2">{back}<h1 className="truncate text-lg font-extrabold">{title}</h1></div>
      <div className="flex shrink-0 items-center gap-2">{right}</div>
    </header>
  );
}

export function BellLink({ to }: { to: "/app/notificacoes" | "/loja/dashboard" }) {
  return (
    <Link to={to} aria-label="Notificações" className="relative grid h-10 w-10 place-items-center rounded-full bg-secondary">
      <Bell className="h-5 w-5" />
      <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
    </Link>
  );
}

type NavItem = { to: string; label: string; icon: typeof Home };
const clientNav: NavItem[] = [
  { to: "/app/inicio", label: "Início", icon: Home },
  { to: "/app/fclub", label: "F-Club", icon: Heart },
  { to: "/app/fworlds", label: "F-Worlds", icon: Globe },
  { to: "/app/carteira", label: "Carteira", icon: Wallet },
  { to: "/app/perfil", label: "Perfil", icon: User },
];
const storeNav: NavItem[] = [
  { to: "/loja/dashboard", label: "Início", icon: LayoutGrid },
  { to: "/loja/publicacoes", label: "Postagens", icon: FileImage },
  { to: "/loja/promocoes", label: "Promoções", icon: Tag },
  { to: "/loja/clientes", label: "Clientes", icon: Users },
  { to: "/loja/configuracoes", label: "Mais", icon: Settings },
];

export function BottomNav({ variant }: { variant: "client" | "store" }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const items = variant === "client" ? clientNav : storeNav;
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t bg-surface pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto grid max-w-md grid-cols-5">
        {items.map(({ to, label, icon: Icon }) => {
          const active = path.startsWith(to) || (to === "/app/inicio" && path.startsWith("/app/fcards"));
          return (
            <Link key={to} to={to} className={cn("flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold transition-colors", active ? "text-primary" : "text-muted-foreground")}>
              <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 1.8} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function Shell({ children, variant }: { children: ReactNode; variant: "client" | "store" }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto min-h-screen max-w-md bg-surface pb-24 md:border-x">{children}</div>
      <BottomNav variant={variant} />
    </div>
  );
}
