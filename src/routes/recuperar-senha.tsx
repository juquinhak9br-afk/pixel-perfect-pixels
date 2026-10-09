import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/fz/ui";
import { BackendPending, btnPrimary, inputCls, useSubmitPending } from "@/components/fz/auth-form";

export const Route = createFileRoute("/recuperar-senha")({
  head: () => ({
    meta: [
      { title: "Recuperar senha — Fideliza Club" },
      { name: "description", content: "Receba um link para redefinir sua senha do Fideliza Club." },
      { property: "og:title", content: "Recuperar senha — Fideliza Club" },
      { property: "og:description", content: "Recupere o acesso à sua conta." },
    ],
  }),
  component: Recuperar,
});

function Recuperar() {
  const { pending, onSubmit } = useSubmitPending();
  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6">
      <Logo size={56} />
      <h1 className="mt-6 text-xl font-extrabold">Recuperar senha</h1>
      <p className="mb-5 text-sm text-muted-foreground">Informe seu e-mail para receber o link de redefinição.</p>
      <form onSubmit={onSubmit} className="space-y-3">
        <input required type="email" placeholder="E-mail" className={inputCls} />
        <button className={btnPrimary}>Enviar link</button>
        {pending && <BackendPending demoTo="/app/inicio" />}
      </form>
      <Link to="/login" className="mt-6 text-center text-sm font-semibold text-primary">Voltar ao login</Link>
    </main>
  );
}
