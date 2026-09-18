# Sistema editorial verificável da Beer Money App

## Objetivo
Refinar a interface existente sem alterar páginas, navegação, fluxos ou lógica, reposicionando a app como um registo factual de bónus verificados — nunca como promessa de “ganhar dinheiro”.

## Alterações
- Atualizar o sistema visual global para hierarquia por luminância: valores monetários em tinta escura, ações e foco em azul `#2B44E0`, e verde `#0C6B48` exclusivamente para estados verificados ou concluídos.
- Remover gradientes pesados, sombras difusas e uniformidade excessiva de raios; separar superfícies sobretudo com bordas de 1px e usar raios distintos por função.
- Eliminar todos os eyebrows em maiúsculas, incluindo títulos de páginas, rótulos “Podes ganhar” e destaques “Melhor oportunidade/retorno”.
- Tornar a transparência estrutural obrigatória em cartões, destaques, listas e detalhe: recompensa, capital exigido e prazo de pagamento aparecem sempre com peso equivalente e em campos separados.
- Substituir prazos vagos por números de dias; quando o dado real não existe, mostrar literalmente `[PREENCHER]`.
- Trocar CTAs genéricos por consequências concretas, como “Abrir conta na Coinbase” ou “Responder no AttaPoll”, sem setas junto ao texto.
- Remover etiquetas permanentes “Não iniciada”; manter apenas estados que comunicam progresso real, como “Em progresso” e “Concluída”.
- Remover metadados unidos por pontos médios e apresentar cada condição em linha ou célula própria.
- Retirar estatísticas, contagens, urgência, testemunhos e texto legal inventados; usar `[PREENCHER]` apenas quando o espaço exige um dado real ainda não fornecido.
- Aplicar a mesma linguagem factual ao início, Explorar, Alertas, Conta, onboarding, login, instalação e detalhe, preservando a arquitetura existente.

## Dados das ofertas
- Acrescentar a cada oferta campos explícitos para capital exigido e prazo de pagamento em dias.
- Usar apenas condições fornecidas no produto; marcar AttaPoll/Beruby ou qualquer prazo/capital desconhecido com `[PREENCHER]`.
- Corrigir copy vaga existente, incluindo “5 min + espera”, “após validação”, “período indicado” e “em breve”.

## Validação
- Verificar todas as rotas em mobile e desktop, incluindo contraste em escala de cinzentos, cor dos valores, CTAs, navegação e estados.
- Confirmar por pesquisa que não restam eyebrows em maiúsculas, CTAs genéricos, pontos médios em metadados, estatísticas inventadas ou prazos vagos.
- Confirmar interação dos estados e atualização do progresso, sem erros de execução ou compilação.
