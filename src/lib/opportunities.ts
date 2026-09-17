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
};

export const opportunities: Opportunity[] = [
  { id: "myfin-recompensa", brand: "MyFin", title: "Recebe 20€ ao aderir", summary: "A recompensa duplicou. Adesão simples com crédito imediato após validação.", category: "Bónus", reward: 20, rewardLabel: "20€", previousReward: 10, rewardType: "Recompensa imediata", time: "5 min", difficulty: "Muito fácil", deadline: "Disponível agora", isNew: true, discovery: ["Destaques", "Dinheiro imediato", "Bónus", "Apps"], status: "Melhorou hoje", change: "improved", steps: ["Abrir a campanha MyFin", "Criar e validar a conta", "Cumprir as condições indicadas", "Receber a recompensa"], url: "https://myfin.bg/" },
  { id: "coinbase-recompensa", brand: "Coinbase", title: "Recebe 20€", summary: "A recompensa aumentou de 10€ para 20€ para novas contas elegíveis.", category: "Bónus", reward: 20, rewardLabel: "20€", previousReward: 10, rewardType: "Recompensa imediata", time: "5 min", difficulty: "Fácil", deadline: "Disponível agora", isNew: true, discovery: ["Destaques", "Dinheiro imediato", "Bónus", "Apps"], status: "Aumentou hoje", change: "improved", steps: ["Abrir a campanha Coinbase", "Criar e verificar a conta", "Concluir a ação elegível", "Receber a recompensa"], url: "https://www.coinbase.com/" },
  { id: "robinhood-bonus", brand: "Robinhood", title: "Recebe 25€", summary: "Deposita 100€ e mantém o valor durante o período indicado para desbloquear 25€.", category: "Bónus", reward: 25, rewardLabel: "25€", rewardType: "Bónus de adesão", time: "10 min", difficulty: "Fácil", deadline: "Prazo de 6 meses", isNew: true, discovery: ["Destaques", "Bónus", "Referências", "Apps"], status: "Nova oportunidade", change: "new", steps: ["Criar e validar a conta", "Depositar 100€", "Manter o depósito pelo período indicado", "Receber 25€ após cerca de 6 meses"], url: "https://robinhood.com/" },
  { id: "bybit-recompensa", brand: "Bybit", title: "Recebe entre 25€ e 55€", summary: "Deposita 100€ e desbloqueia uma recompensa variável conforme as condições da campanha.", category: "Bónus", reward: 55, rewardLabel: "25€–55€", previousReward: 25, rewardType: "Recompensa variável", time: "8 min", difficulty: "Média", deadline: "Termina em 5 dias", isNew: true, discovery: ["Destaques", "Bónus", "A terminar"], status: "Melhorou hoje", change: "improved", steps: ["Criar e verificar a conta", "Depositar 100€", "Ativar a campanha", "Confirmar a recompensa atribuída"], url: "https://www.bybit.com/" },
  { id: "kraken-recompensa", brand: "Kraken", title: "Recebe entre 5€ e 200€", summary: "Deposita 260€ para aceder a uma recompensa variável da campanha atual.", category: "Bónus", reward: 200, rewardLabel: "5€–200€", rewardType: "Recompensa variável", time: "10 min", difficulty: "Média", deadline: "Termina em 3 dias", urgent: true, discovery: ["Bónus", "A terminar"], status: "Termina em breve", change: "ending", steps: ["Criar e verificar a conta", "Abrir a campanha elegível", "Depositar 260€", "Aguardar a confirmação da recompensa"], url: "https://www.kraken.com/" },
  { id: "atapoll-inqueritos", brand: "AttaPoll", title: "Ganha com inquéritos pagos", summary: "Escolhe inquéritos no telemóvel e recebe por cada participação concluída.", category: "Apps", reward: 5, rewardLabel: "Valor variável", rewardType: "Ganhos contínuos", time: "3–15 min", difficulty: "Muito fácil", deadline: "Sempre disponível", isNew: true, discovery: ["Destaques", "Dinheiro imediato", "Apps"], status: "Nova campanha", change: "new", steps: ["Instalar a aplicação", "Completar o perfil", "Escolher um inquérito disponível", "Receber por cada conclusão validada"], url: "https://attapoll.app/" },
  { id: "cashback-lojas", brand: "Beruby", title: "Cashback reforçado em lojas", summary: "Recebe uma parte das compras elegíveis de volta durante esta campanha limitada.", category: "Cashback", reward: 15, rewardLabel: "Até 15€", rewardType: "Cashback", time: "2 min", difficulty: "Muito fácil", deadline: "Termina amanhã", urgent: true, discovery: ["Compras", "Cashback", "A terminar"], status: "Termina amanhã", change: "ending", steps: ["Escolher uma loja elegível", "Abrir a loja através da campanha", "Concluir a compra na mesma sessão", "Aguardar a validação do cashback"], url: "https://pt.beruby.com/" },
  { id: "perplexity-pro", brand: "Perplexity", title: "Acesso Pro em campanha", summary: "Experimenta ferramentas avançadas de IA através de uma oferta por tempo limitado.", category: "IA", reward: 10, rewardLabel: "1 mês Pro", rewardType: "Teste gratuito com valor", time: "3 min", difficulty: "Muito fácil", deadline: "Termina em 7 dias", discovery: ["Apps", "IA"], status: "Disponível", change: "ongoing", steps: ["Abrir a campanha", "Criar ou ligar uma conta", "Confirmar elegibilidade", "Ativar o período promocional"], url: "https://www.perplexity.ai/" }
];

export const totalAvailable = 145;
