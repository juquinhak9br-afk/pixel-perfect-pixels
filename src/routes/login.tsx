import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo, Wordmark } from "@/components/fz/ui";
import { BackendPending, PasswordInput, RoleToggle, btnPrimary, inputCls, useSubmitPending } from "@/components/fz/auth-form";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar — Fideliza Club" },
      { name: "description", content: "Acesse sua conta Fideliza Club e veja seus selos e recompensas." },
      { property: "og:title", content: "Entrar — Fideliza Club" },
      { property: "og:description", content: "Acesse suas FCards e recompensas." },
    ],
  }),
  component: Login,
});

function Login() {
  const { pending, onSubmit } = useSubmitPending();
  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6 py-10">
      <div className="mb-8 flex flex-col items-center text-center">
        <Logo size={64} />
        <Wordmark className="mt-3 text-2xl" />
        <h1 className="mt-6 text-xl font-extrabold">Bem-vindo!</h1>
        <p className="text-sm text-muted-foreground">Entre para continuar</p>
      </div>
      <form onSubmit={onSubmit} className="space-y-3">
        <RoleToggle role="cliente" />
        <input required placeholder="E-mail ou telefone" className={inputCls} />
        <PasswordInput />
        <button className={btnPrimary}>Entrar</button>
        {pending && <BackendPending demoTo="/app/inicio" />}
        <Link to="/recuperar-senha" className="block pt-1 text-center text-sm font-semibold text-primary">Esqueceu sua senha?</Link>
      </form>
      <p className="mt-10 text-center text-sm text-muted-foreground">
        Ainda não tem conta? <Link to="/cadastro" className="font-bold text-primary">Cadastre-se</Link>
      </p>
    </main>
  );
}
