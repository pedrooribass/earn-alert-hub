export type Opportunity = {
  id: string;
  brand: string;
  title: string;
  summary: string;
  category: string;
  reward: number;
  previousReward?: number;
  time: string;
  difficulty: "Muito fácil" | "Fácil" | "Média";
  deadline: string;
  urgent?: boolean;
  isNew?: boolean;
  accent: "green" | "gold" | "coral" | "blue";
  steps: string[];
  url: string;
};

export const opportunities: Opportunity[] = [
  { id: "trading-212-fracao", brand: "Trading 212", title: "Recebe uma ação fracionada", summary: "Abre uma conta e recebe uma ação escolhida aleatoriamente.", category: "Investimentos", reward: 100, time: "5 min", difficulty: "Fácil", deadline: "Termina em 2 dias", urgent: true, isNew: true, accent: "green", steps: ["Criar a conta através da campanha", "Validar a identidade", "Fazer um depósito mínimo de 1€", "Receber a ação em até 3 dias úteis"], url: "https://www.trading212.com/" },
  { id: "bybit-bonus-50", brand: "Bybit", title: "Bónus aumentado", summary: "O valor subiu hoje. Confirma as condições antes de aderir.", category: "Crypto", reward: 50, previousReward: 20, time: "8 min", difficulty: "Média", deadline: "Termina em 5 dias", isNew: true, accent: "gold", steps: ["Criar conta", "Completar a verificação", "Consultar os requisitos de depósito", "Ativar a recompensa"], url: "https://www.bybit.com/" },
  { id: "moey-conta", brand: "moey!", title: "Bónus por abrir conta", summary: "Conta portuguesa sem mensalidade, com adesão totalmente digital.", category: "Bancos", reward: 20, time: "6 min", difficulty: "Muito fácil", deadline: "Termina em 9 dias", isNew: true, accent: "coral", steps: ["Instalar a aplicação moey!", "Abrir conta", "Validar os dados", "Cumprir as condições da campanha"], url: "https://moey.pt/" },
  { id: "beruby-cashback", brand: "Beruby", title: "Cashback reforçado", summary: "Recebe parte do valor de volta em lojas selecionadas.", category: "Cashback", reward: 35, time: "3 min", difficulty: "Muito fácil", deadline: "Termina amanhã", urgent: true, accent: "blue", steps: ["Abrir a loja através da campanha", "Concluir a compra na mesma sessão", "Aguardar a validação do cashback"], url: "https://pt.beruby.com/" },
  { id: "perplexity-pro", brand: "Perplexity", title: "Acesso Pro em campanha", summary: "Experimenta pesquisa avançada com uma campanha limitada.", category: "IA", reward: 40, time: "4 min", difficulty: "Fácil", deadline: "Termina em 4 dias", isNew: true, accent: "green", steps: ["Abrir a campanha", "Criar ou ligar uma conta", "Confirmar a elegibilidade", "Ativar o período promocional"], url: "https://www.perplexity.ai/" },
  { id: "woo-dados", brand: "WOO", title: "Dados móveis extra", summary: "Campanha temporária para novos tarifários digitais.", category: "Telecom", reward: 25, time: "5 min", difficulty: "Fácil", deadline: "Termina em 3 dias", accent: "coral", steps: ["Escolher o tarifário elegível", "Pedir o cartão ou eSIM", "Ativar dentro do prazo"], url: "https://www.woo.pt/" },
  { id: "xbox-game-pass", brand: "Xbox", title: "Primeiro mês com desconto", summary: "Acesso ao catálogo Game Pass por um preço reduzido.", category: "Gaming", reward: 12, time: "2 min", difficulty: "Muito fácil", deadline: "Termina em 6 dias", isNew: true, accent: "green", steps: ["Entrar na conta Microsoft", "Confirmar elegibilidade", "Ativar a campanha"], url: "https://www.xbox.com/pt-PT/xbox-game-pass" },
  { id: "vinted-portes", brand: "Vinted", title: "Envios com desconto", summary: "Poupa nos portes em compras elegíveis este fim de semana.", category: "Compras", reward: 5, time: "2 min", difficulty: "Muito fácil", deadline: "Termina hoje", urgent: true, isNew: true, accent: "blue", steps: ["Encontrar um artigo elegível", "Confirmar o desconto no checkout", "Concluir a compra antes do fim"], url: "https://www.vinted.pt/" }
];

export const totalAvailable = opportunities.reduce((sum, item) => sum + item.reward, 0);
