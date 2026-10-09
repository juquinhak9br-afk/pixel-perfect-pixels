import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo, Wordmark } from "@/components/fz/ui";
import { BackendPending, PasswordInput, RoleToggle, btnPrimary, inputCls, useSubmitPending } from "@/components/fz/auth-form";

export const Route = createFileRoute("/loja/login")({
  head: () => ({
    meta: [
      { title: "Área do Lojista — Fideliza Club" },
      { name: "description", content: "Gerencie sua loja, promoções e clientes no Fideliza Club." },
      { property: "og:title", content: "Área do Lojista — Fideliza Club" },
      { property: "og:description", content: "Conecte sua loja a mais clientes." },
    ],
  }),
  component: LojaLogin,
});

function LojaLogin() {
  const { pending, onSubmit } = useSubmitPending();
  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6 py-10">
      <div className="mb-8 flex flex-col items-center text-center">
        <Logo size={64} />
        <Wordmark className="mt-3 text-2xl" />
        <h1 className="mt-6 text-xl font-extrabold">Área do Lojista</h1>
        <p className="text-sm text-muted-foreground">Conecte sua loja a mais clientes.</p>
      </div>
      <form onSubmit={onSubmit} className="space-y-3">
        <RoleToggle role="lojista" />
        <input required placeholder="E-mail ou telefone" className={inputCls} />
        <PasswordInput />
        <button className={btnPrimary}>Entrar</button>
        {pending && <BackendPending demoTo="/loja/dashboard" />}
      </form>
      <p className="mt-10 text-center text-sm text-muted-foreground">
        Ainda não tem conta? <Link to="/cadastro" className="font-bold text-primary">Cadastre sua loja</Link>
      </p>
    </main>
  );
}
