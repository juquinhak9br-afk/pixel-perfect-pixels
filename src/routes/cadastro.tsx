import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/fz/ui";
import { BackendPending, PasswordInput, btnPrimary, inputCls, useSubmitPending } from "@/components/fz/auth-form";

export const Route = createFileRoute("/cadastro")({
  head: () => ({
    meta: [
      { title: "Criar conta — Fideliza Club" },
      { name: "description", content: "Crie sua conta de cliente ou lojista no Fideliza Club." },
      { property: "og:title", content: "Criar conta — Fideliza Club" },
      { property: "og:description", content: "Cadastre-se como cliente ou lojista." },
    ],
  }),
  component: Cadastro,
});

function Cadastro() {
  const [role, setRole] = useState<"cliente" | "lojista">("cliente");
  const { pending, onSubmit } = useSubmitPending();
  const tab = "flex-1 rounded-full py-2.5 text-sm font-bold transition";
  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6 py-10">
      <div className="mb-6 flex flex-col items-center text-center">
        <Logo size={56} />
        <h1 className="mt-4 text-xl font-extrabold">Criar conta</h1>
      </div>
      <form onSubmit={onSubmit} className="space-y-3">
        <div className="flex gap-2 rounded-full border p-1">
          {(["cliente", "lojista"] as const).map((r) => (
            <button type="button" key={r} onClick={() => setRole(r)} className={cn(tab, role === r ? "bg-primary text-primary-foreground" : "text-muted-foreground")}>
              {r === "cliente" ? "Cliente" : "Lojista"}
            </button>
          ))}
        </div>
        <input required placeholder={role === "cliente" ? "Nome completo" : "Nome do responsável"} className={inputCls} />
        {role === "lojista" && <input required placeholder="Nome comercial" className={inputCls} />}
        <input required type="email" placeholder="E-mail" className={inputCls} />
        <input required type="tel" placeholder="Telefone" className={inputCls} />
        <PasswordInput />
        <button className={btnPrimary}>Criar conta</button>
        {pending && <BackendPending demoTo={role === "cliente" ? "/app/inicio" : "/loja/dashboard"} />}
      </form>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Já tem conta? <Link to="/login" className="font-bold text-primary">Entrar</Link>
      </p>
    </main>
  );
}
