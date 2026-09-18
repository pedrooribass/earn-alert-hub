export type Opportunity = {
  id: string;
  brand: string;
  title: string;
  summary: string;
  category: string;
  reward: number;
  rewardLabel: string;
  previousReward?: number;
  rewardType: string;
  time: string;
  difficulty: "Muito fácil" | "Fácil" | "Média";
  deadline: string;
  urgent?: boolean;
  isNew?: boolean;
  discovery: string[];
  status: string;
  change: "new" | "improved" | "ending" | "ongoing";
  steps: string[];
  url: string;
  insight?: string;
  capitalRequired: string;
  payoutTime: string;
  actionLabel: string;
};

export const opportunities: Opportunity[] = [
  { id: "myfin-recompensa", brand: "MyFin", title: "Criar conta, depositar e fazer uma compra de 10€", summary: "Cria uma conta, adiciona o cartão virtual e faz uma compra elegível.", category: "Contas", reward: 20, rewardLabel: "20€", rewardType: "Bónus de registo", time: "10 min", difficulty: "Fácil", deadline: "[PREENCHER]", capitalRequired: "10€", payoutTime: "[PREENCHER]", actionLabel: "Abrir conta na MyFin", discovery: ["Destaques", "Dinheiro rápido", "Contas"], status: "Disponível", change: "improved", steps: ["Criar conta", "Depositar 10€", "Criar cartão virtual gratuito", "Gastar 10€", "Receber a recompensa elegível"], url: "https://myfin.bg/" },
  { id: "coinbase-recompensa", brand: "Coinbase", title: "Verificar identidade e depositar 10€ em Bitcoin", summary: "O bónus é atribuído depois da verificação e do primeiro depósito elegível.", category: "Crypto", reward: 20, rewardLabel: "20€", rewardType: "Bónus de registo", time: "5 min", difficulty: "Fácil", deadline: "[PREENCHER]", capitalRequired: "10€", payoutTime: "3 dias", actionLabel: "Abrir conta na Coinbase", discovery: ["Destaques", "Dinheiro rápido", "Crypto"], status: "Disponível", change: "improved", steps: ["Criar conta", "Verificar identidade", "Depositar 10€ em Bitcoin", "Aguardar cerca de 3 dias", "Receber a recompensa elegível"], url: "https://www.coinbase.com/" },
  { id: "robinhood-bonus", brand: "Robinhood", title: "Depositar 50€ e manter a recompensa bloqueada", summary: "A recompensa em crypto fica bloqueada durante 180 dias.", category: "Crypto", reward: 50, rewardLabel: "50€", rewardType: "Bónus de registo", time: "8 min", difficulty: "Fácil", deadline: "[PREENCHER]", capitalRequired: "50€", payoutTime: "180 dias", actionLabel: "Abrir conta na Robinhood", discovery: ["Destaques", "Crypto"], status: "Disponível", change: "new", steps: ["Criar conta", "Depositar 50€", "Receber 50€ em crypto", "Manter a recompensa bloqueada durante 180 dias"], url: "https://robinhood.com/" },
  { id: "bybit-recompensa", brand: "Bybit", title: "Depositar 100€ para receber 25€ e um valor adicional possível", summary: "A campanha indica 25€ garantidos e até 30€ adicionais.", category: "Crypto", reward: 55, rewardLabel: "25€–55€", rewardType: "Bónus de depósito", time: "10 min", difficulty: "Média", deadline: "[PREENCHER]", capitalRequired: "100€", payoutTime: "[PREENCHER]", actionLabel: "Abrir conta na Bybit", discovery: ["Destaques", "Crypto"], status: "Disponível", change: "improved", steps: ["Criar conta", "Depositar 100€", "Receber 25€ garantidos em [PREENCHER] dias", "Cumprir as condições para até 30€ adicionais", "Consultar as condições do cartão cashback"], url: "https://www.bybit.com/" },
  { id: "kraken-recompensa", brand: "Kraken", title: "Depositar 260€ para receber um valor aleatório", summary: "A recompensa indicada pela campanha varia entre 5€ e 200€.", category: "Crypto", reward: 200, rewardLabel: "5€–200€", rewardType: "Bónus variável", time: "10 min", difficulty: "Média", deadline: "[PREENCHER]", capitalRequired: "260€", payoutTime: "[PREENCHER]", actionLabel: "Abrir conta na Kraken", discovery: ["Destaques", "Crypto"], status: "Disponível", change: "ongoing", steps: ["Criar conta", "Depositar 260€", "Cumprir as condições da campanha", "Receber entre 5€ e 200€ em [PREENCHER] dias"], url: "https://www.kraken.com/" },
  { id: "atapoll-inqueritos", brand: "AttaPoll", title: "Responder a questionários aprovados", summary: "O valor depende dos questionários disponíveis e aceites pela plataforma.", category: "Questionários", reward: 5, rewardLabel: "[PREENCHER]", rewardType: "Pagamento por questionário", time: "7 min", difficulty: "Muito fácil", deadline: "[PREENCHER]", capitalRequired: "0€", payoutTime: "[PREENCHER]", actionLabel: "Instalar a AttaPoll", discovery: ["Destaques", "Dinheiro rápido", "Questionários"], status: "Disponível", change: "ongoing", insight: "Valor por questionário: [PREENCHER]", steps: ["Instalar a aplicação", "Completar o perfil", "Escolher um questionário disponível", "Receber por cada conclusão aprovada em [PREENCHER] dias"], url: "https://attapoll.app/" },
  { id: "cashback-lojas", brand: "Beruby", title: "Comprar através de uma loja aderente", summary: "O cashback depende da loja e das condições apresentadas antes da compra.", category: "Cashback", reward: 15, rewardLabel: "[PREENCHER]", rewardType: "Cashback", time: "2 min", difficulty: "Muito fácil", deadline: "[PREENCHER]", capitalRequired: "[PREENCHER]", payoutTime: "[PREENCHER]", actionLabel: "Consultar lojas na Beruby", discovery: ["Cashback"], status: "Disponível", change: "ongoing", steps: ["Escolher uma loja elegível", "Abrir a loja através da campanha", "Concluir a compra na mesma sessão", "Receber o cashback em [PREENCHER] dias"], url: "https://pt.beruby.com/" }
];

export const totalAvailable = 145;
