# Direção final da Beer Money Club

## Objetivo
Transformar a aplicação numa experiência iOS premium centrada no valor ainda disponível e nas melhores oportunidades para o obter, sem linguagem de notícias, trading ou dashboard.

## Alterações
- Reconstruir Hoje com o progresso pessoal como elemento principal: valor disponível, campanhas por concluir, percentagem, valor reclamado e prova social.
- Substituir “O que mudou” por “As tuas melhores oportunidades”, com dois destaques e as restantes ordenadas por valor.
- Adicionar estados pessoais persistentes por campanha: não iniciada, em progresso e concluída; recalcular automaticamente valor reclamado, valor disponível e progresso.
- Atualizar os detalhes e passos de MyFin, Coinbase, Robinhood, Bybit, Kraken e AttaPoll conforme as condições fornecidas.
- Reorganizar Explorar em Destaques, Dinheiro rápido, Cashback, Contas, Crypto e Questionários.
- Tornar Alertas exclusivamente orientados a ações pessoais e conclusão de campanhas.
- Refinar a navegação inferior escura no estilo pedido: ativo verde e texto claro, inativos cinzentos, com transição e vibração discreta.
- Usar ativos oficiais e coloridos das marcas quando estiverem disponíveis, sem inventar logótipos; manter nome oficial claramente visível se um ativo oficial não puder ser obtido.
- Atualizar a documentação do produto e validar os fluxos em mobile e desktop.

## Detalhes técnicos
- Guardar o estado das campanhas localmente no dispositivo para o MVP e sincronizar todos os ecrãs através de um único hook.
- Manter `user-select: none` e `-webkit-touch-callout: none`, com exceção apenas para campos editáveis.
- Preservar Outfit para títulos e Figtree para interface e corpo.
- Respeitar movimento reduzido e manter metadados próprios em todas as páginas afetadas.
