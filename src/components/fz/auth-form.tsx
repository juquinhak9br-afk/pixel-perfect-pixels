import { Link } from "@tanstack/react-router";
import { Eye, EyeOff, Info } from "lucide-react";
import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";

export const inputCls = "h-12 w-full rounded-xl border bg-surface px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15";
export const btnPrimary = "inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground transition hover:bg-primary-dark active:scale-[0.99]";
export const btnOutline = "inline-flex h-11 items-center justify-center rounded-xl border border-primary px-4 text-sm font-bold text-primary transition hover:bg-primary-soft";

export function PasswordInput({ placeholder = "Senha" }: { placeholder?: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input type={show ? "text" : "password"} placeholder={placeholder} required minLength={6} className={inputCls} />
      <button type="button" onClick={() => setShow(!show)} aria-label="Mostrar senha" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
        {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </button>
    </div>
  );
}

export function BackendPending({ demoTo }: { demoTo: "/app/inicio" | "/loja/dashboard" }) {
  return (
    <div className="fade-up rounded-xl border border-primary/20 bg-primary-soft p-3 text-xs text-accent-foreground">
      <div className="flex gap-2">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          A conexão com o servidor ainda não foi configurada, então nenhuma conta foi criada ou acessada.{" "}
          <Link to={demoTo} className="font-bold underline">Explorar a demonstração</Link>
        </p>
      </div>
    </div>
  );
}

export function useSubmitPending() {
  const [pending, setPending] = useState(false);
  return { pending, onSubmit: (e: FormEvent) => { e.preventDefault(); setPending(true); } };
}

export function RoleToggle({ role }: { role: "cliente" | "lojista" }) {
  const base = "flex-1 rounded-full py-2.5 text-center text-sm font-bold transition";
  return (
    <div className="flex gap-2 rounded-full border p-1">
      <Link to="/login" className={cn(base, role === "cliente" ? "bg-primary text-primary-foreground" : "text-muted-foreground")}>Cliente</Link>
      <Link to="/loja/login" className={cn(base, role === "lojista" ? "bg-primary text-primary-foreground" : "text-muted-foreground")}>Lojista</Link>
    </div>
  );
}
