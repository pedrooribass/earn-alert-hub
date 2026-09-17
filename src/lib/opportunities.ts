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
};

export const opportunities: Opportunity[] = [
  { id: "myfin-recompensa", brand: "MyFin", title: "Recebe 20€", summary: "Cria uma conta, adiciona um cartão virtual e recebe a recompensa após a primeira compra elegível.", category: "Contas", reward: 20, rewardLabel: "20€", rewardType: "Recompensa de adesão", time: "10 min", difficulty: "Fácil", deadline: "Disponível agora", discovery: ["Destaques", "Dinheiro rápido", "Contas"], status: "Disponível", change: "improved", steps: ["Criar conta", "Depositar 10€", "Criar cartão virtual gratuito", "Gastar 10€", "Receber 10€ de recompensa"], url: "https://myfin.bg/" },
  { id: "coinbase-recompensa", brand: "Coinbase", title: "Recebe 20€", summary: "Faz o primeiro depósito elegível e recebe a recompensa após a validação da campanha.", category: "Crypto", reward: 20, rewardLabel: "20€", rewardType: "Recompensa instantânea", time: "5 min + espera", difficulty: "Fácil", deadline: "Disponível agora", discovery: ["Destaques", "Dinheiro rápido", "Crypto"], status: "Disponível", change: "improved", steps: ["Criar conta", "Verificar identidade", "Depositar 10€ em Bitcoin", "Aguardar cerca de 3 dias", "Receber 10€ de recompensa"], url: "https://www.coinbase.com/" },
  { id: "robinhood-bonus", brand: "Robinhood", title: "Recebe 50€", summary: "Deposita 50€ e recebe a recompensa em crypto, bloqueada durante o período indicado.", category: "Crypto", reward: 50, rewardLabel: "50€", rewardType: "Recompensa após 6 meses", time: "8 min", difficulty: "Fácil", deadline: "Bloqueio de 6 meses", discovery: ["Destaques", "Crypto"], status: "Disponível", change: "new", steps: ["Criar conta", "Depositar 50€", "Receber 50€ em crypto", "Aguardar o período de bloqueio de 6 meses"], url: "https://robinhood.com/" },
  { id: "bybit-recompensa", brand: "Bybit", title: "Recebe 25€–55€", summary: "Deposita 100€ para desbloquear 25€ garantidos e uma possível recompensa adicional.", category: "Crypto", reward: 55, rewardLabel: "25€–55€", rewardType: "Melhor retorno", time: "10 min", difficulty: "Média", deadline: "Campanha limitada", discovery: ["Destaques", "Crypto"], status: "Disponível", change: "improved", steps: ["Criar conta", "Depositar 100€", "Receber 25€ garantidos após o período promocional", "Possibilidade de recompensa adicional até 30€", "Possibilidade de criar cartão cashback posteriormente"], url: "https://www.bybit.com/" },
  { id: "kraken-recompensa", brand: "Kraken", title: "Recebe 5€–200€", summary: "Deposita 260€ e participa numa recompensa aleatória entre 5€ e 200€.", category: "Crypto", reward: 200, rewardLabel: "5€–200€", rewardType: "Recompensa variável", time: "10 min", difficulty: "Média", deadline: "Campanha limitada", discovery: ["Destaques", "Crypto"], status: "Disponível", change: "ongoing", steps: ["Criar conta", "Depositar 260€", "Participar na recompensa aleatória", "Receber entre 5€ e 200€"], url: "https://www.kraken.com/" },
  { id: "atapoll-inqueritos", brand: "AttaPoll", title: "Questionários pagos", summary: "Responde a questionários curtos no telemóvel e recebe por cada conclusão aprovada.", category: "Questionários", reward: 5, rewardLabel: "Até 40€/mês", rewardType: "Potencial mensal estimado", time: "3–15 min", difficulty: "Muito fácil", deadline: "Sempre disponível", discovery: ["Destaques", "Dinheiro rápido", "Questionários"], status: "Disponível", change: "ongoing", insight: "6€/h em média · 7 min por questionário", steps: ["Instalar a aplicação", "Completar o perfil", "Escolher um questionário disponível", "Receber por cada conclusão aprovada"], url: "https://attapoll.app/" },
  { id: "cashback-lojas", brand: "Beruby", title: "Cashback em compras", summary: "Recupera parte do valor das compras elegíveis em lojas aderentes.", category: "Cashback", reward: 15, rewardLabel: "Até 15€", rewardType: "Cashback", time: "2 min", difficulty: "Muito fácil", deadline: "Campanha limitada", discovery: ["Cashback"], status: "Disponível", change: "ongoing", steps: ["Escolher uma loja elegível", "Abrir a loja através da campanha", "Concluir a compra na mesma sessão", "Aguardar a validação do cashback"], url: "https://pt.beruby.com/" }
];

export const totalAvailable = 145;
