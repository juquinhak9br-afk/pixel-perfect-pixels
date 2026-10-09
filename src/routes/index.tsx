import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo, Wordmark } from "@/components/fz/ui";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fideliza Club — Fidelidade digital para o comércio local" },
      { name: "description", content: "Ganhe selos, acumule recompensas e aproveite ofertas exclusivas dos seus estabelecimentos favoritos." },
      { property: "og:title", content: "Fideliza Club — Mais que clientes, uma comunidade" },
      { property: "og:description", content: "Cartões de selos digitais, recompensas e promoções de lojas locais." },
    ],
  }),
  component: Splash,
});

function Splash() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-brand px-6 py-14 text-primary-foreground">
      <div />
      <div className="fade-up flex flex-col items-center text-center">
        <Logo size={96} light />
        <Wordmark light className="mt-5 text-4xl" />
        <p className="mt-3 max-w-xs text-base opacity-90">Mais que clientes, uma comunidade.</p>
      </div>
      <div className="w-full max-w-sm space-y-4 text-center">
        <Link to="/cadastro" className="inline-flex h-12 w-full items-center justify-center rounded-full bg-surface text-sm font-bold text-primary">Começar</Link>
        <Link to="/login" className="block text-sm font-semibold underline opacity-90">Já tenho uma conta</Link>
        <Link to="/loja/login" className="block text-xs opacity-75">Sou lojista</Link>
      </div>
    </main>
  );
}
