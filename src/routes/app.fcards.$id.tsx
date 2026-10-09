import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, Nfc, QrCode, Keyboard, Info } from "lucide-react";
import { DemoBadge, Stamps, TopBar } from "@/components/fz/ui";
import { inputCls, btnPrimary } from "@/components/fz/auth-form";
import { fcards, storeById } from "@/lib/demo-data";

export const Route = createFileRoute("/app/fcards/$id")({
  loader: ({ params }) => {
    const card = fcards.find((c) => c.id === params.id);
    if (!card) throw notFound();
    return { card };
  },
  head: ({ loaderData }) => {
    const name = loaderData ? storeById(loaderData.card.storeId).name : "FCard";
    return {
      meta: [
        { title: `${name} — FCard · Fideliza Club` },
        { name: "description", content: `Sua cartela de fidelidade ${name}.` },
        { property: "og:title", content: `${name} — FCard` },
        { property: "og:description", content: "Selos, recompensa e regras da cartela." },
      ],
    };
  },
  notFoundComponent: () => <p className="p-10 text-center">Cartela não encontrada.</p>,
  component: Detail,
});

function Detail() {
  const { card } = Route.useLoaderData();
  const s = storeById(card.storeId);
  const [mode, setMode] = useState<null | "nfc" | "qr" | "manual">(null);
  const nfcSupported = typeof window !== "undefined" && "NDEFReader" in window;
  const options = [
    { k: "nfc" as const, icon: Nfc, t: "NFC", d: "Aproxime o celular da tag NFC da loja" },
    { k: "qr" as const, icon: QrCode, t: "QR Code", d: "Escaneie o QR Code da loja" },
    { k: "manual" as const, icon: Keyboard, t: "Código manual", d: "Digite o código fornecido pela loja" },
  ];
  return (
    <div className="fade-up">
      <TopBar title={s.name} back={<Link to="/app/fcards" aria-label="Voltar"><ChevronLeft className="h-6 w-6" /></Link>} />
      <div className="space-y-6 p-4">
        <div className="flex items-center gap-4">
          <img src={s.image} alt={s.name} width={80} height={80} className="h-20 w-20 rounded-2xl object-cover" />
          <div className="min-w-0">
            <p className="text-lg font-extrabold">{s.name}</p>
            <p className="text-sm text-muted-foreground">{card.campaign}</p>
            <DemoBadge className="mt-1" />
          </div>
        </div>
        <div className="rounded-2xl border p-4">
          <div className="mb-3 flex items-baseline justify-between">
            <p className="font-bold">Sua cartela</p>
            <p className="text-sm font-extrabold text-primary">{card.stamps}/{card.goal}</p>
          </div>
          <Stamps stamps={card.stamps} goal={card.goal} />
          <p className="mt-4 text-sm"><span className="text-muted-foreground">Recompensa:</span> <b>{card.reward}</b></p>
        </div>

        <section>
          <h2 className="mb-2 font-extrabold">Resgatar token</h2>
          <div className="divide-y rounded-2xl border">
            {options.map(({ k, icon: Icon, t, d }) => (
              <button key={k} onClick={() => setMode(k)} className="flex w-full items-center gap-3 p-4 text-left">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary"><Icon className="h-5 w-5" /></span>
                <span><span className="block text-sm font-bold">{t}</span><span className="text-xs text-muted-foreground">{d}</span></span>
              </button>
            ))}
          </div>
          {mode && (
            <div className="fade-up mt-3 space-y-3 rounded-2xl bg-secondary p-4 text-sm">
              {mode === "manual" && <input placeholder="Código do token" className={inputCls} />}
              {mode === "nfc" && !nfcSupported && <p>Seu navegador não suporta leitura NFC. Use o QR Code ou o código manual.</p>}
              {mode === "qr" && <p>A leitura por câmera será ativada quando o servidor estiver conectado.</p>}
              <p className="flex gap-2 text-xs text-muted-foreground"><Info className="h-4 w-4 shrink-0" /> A validação de tokens precisa do servidor, que ainda não foi configurado. Nenhum selo foi registrado.</p>
              {mode === "manual" && <button disabled className={btnPrimary + " opacity-50"}>Validar</button>}
            </div>
          )}
        </section>

        <section>
          <h2 className="mb-2 font-extrabold">Regras</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">{card.rules.map((r) => <li key={r}>{r}</li>)}</ul>
        </section>
        <section>
          <h2 className="mb-2 font-extrabold">Histórico</h2>
          <ul className="space-y-2 text-sm">{card.history.map((h) => <li key={h} className="rounded-xl border px-3 py-2">{h}</li>)}</ul>
        </section>
      </div>
    </div>
  );
}
