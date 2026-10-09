import burger from "@/assets/burger.jpg";
import cafe from "@/assets/cafe.jpg";
import barbearia from "@/assets/barbearia.jpg";
import beleza from "@/assets/beleza.jpg";

/**
 * DADOS DE EXEMPLO — o backend ainda não está conectado.
 * Tudo aqui é demonstração e é sinalizado na interface.
 */
export type Store = { id: string; name: string; handle: string; category: string; image: string; initials: string; open: boolean };
export type FCard = { id: string; storeId: string; campaign: string; stamps: number; goal: number; reward: string; rules: string[]; history: string[] };

export const stores: Store[] = [
  { id: "burger-craft", name: "Burger Craft", handle: "@burgercraft", category: "Burgers", image: burger, initials: "BC", open: true },
  { id: "cafe-do-povo", name: "Café do Povo", handle: "@cafedopovo", category: "Cafés", image: cafe, initials: "CP", open: true },
  { id: "barbearia-ze", name: "Barbearia do Zé", handle: "@barbeariadoze", category: "Serviços", image: barbearia, initials: "BZ", open: false },
  { id: "studio-beleza", name: "Studio Beleza", handle: "@studiobeleza", category: "Beleza", image: beleza, initials: "SB", open: true },
];

export const storeById = (id: string) => stores.find((s) => s.id === id)!;

export const fcards: FCard[] = [
  { id: "fc1", storeId: "burger-craft", campaign: "Ganhe 1 selo a cada R$ 30 em compras", stamps: 8, goal: 12, reward: "Hambúrguer grátis", rules: ["1 selo por compra acima de R$ 30", "Válido de seg a dom", "Não cumulativo com outras promoções"], history: ["05/10 · Selo 8", "28/09 · Selo 7", "20/09 · Selo 6"] },
  { id: "fc2", storeId: "barbearia-ze", campaign: "1 selo por corte", stamps: 4, goal: 10, reward: "Corte grátis", rules: ["1 selo por corte de cabelo", "Validade de 6 meses"], history: ["01/10 · Selo 4", "10/09 · Selo 3"] },
  { id: "fc3", storeId: "cafe-do-povo", campaign: "1 selo por café especial", stamps: 2, goal: 8, reward: "Café + pão de queijo", rules: ["1 selo por café especial"], history: ["07/10 · Selo 2"] },
  { id: "fc4", storeId: "studio-beleza", campaign: "1 selo por atendimento", stamps: 10, goal: 10, reward: "Manicure grátis", rules: ["1 selo por atendimento"], history: ["02/10 · Selo 10"] },
];

export const posts = [
  { id: "p1", storeId: "burger-craft", time: "2h", title: "Hoje tem promoção!", text: "X-Bacon + batata por apenas R$ 24,90. Só hoje!", likes: 1200, comments: 245, promo: "R$ 24,90" },
  { id: "p2", storeId: "cafe-do-povo", time: "4h", title: "Pão de queijo quentinho", text: "Saiu agora do forno. Venha tomar um café com a gente.", likes: 312, comments: 40 },
  { id: "p3", storeId: "studio-beleza", time: "1d", title: "Semana da beleza", text: "Agende sua manicure e ganhe selo em dobro.", likes: 540, comments: 61, promo: "Selo em dobro" },
  { id: "p4", storeId: "barbearia-ze", time: "2d", title: "Novo horário", text: "Agora abrimos também aos domingos!", likes: 188, comments: 12 },
];

export const notifications = [
  { id: "n1", title: "Você ganhou um selo!", body: "Burger Craft · 8 de 12 selos", time: "10 min", read: false },
  { id: "n2", title: "Sua loja favorita está aberta!", body: "Café do Povo", time: "1h", read: false },
  { id: "n3", title: "Recompensa disponível", body: "Studio Beleza · Manicure grátis", time: "1d", read: true },
  { id: "n4", title: "Nova promoção", body: "Burger Craft · X-Bacon + batata", time: "2d", read: true },
];

export const categories = ["Burgers", "Cafés", "Beleza", "Serviços", "Mercados"];
