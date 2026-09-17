# Beer Money Club — Product Blueprint

## Princípio central
O utilizador não abre a aplicação para navegar. Abre-a para saber o que aconteceu desde a última visita. A abertura deve responder, em menos de cinco segundos: quantas oportunidades chegaram, quais aumentaram de valor, quais ficaram urgentes e quanto está disponível agora.

## Wireframes e fluxo
```text
Primeira abertura
  → Promessa → Oportunidade a expirar → Alerta → Total disponível
  → Google / Apple
  → Adicionar ao ecrã principal
  → Hoje: “3 novidades desde ontem”

Regresso
  → Hoje: resumo de mudanças
  → Abrir oportunidade → verificar passos → guardar ou começar
  → “Estás em dia” quando todas as mudanças foram vistas

Exploração intencional
  → Explorar → pesquisa/categoria/filtro → detalhe → começar

Alertas
  → Timeline → mudança de valor/prazo/nova oportunidade → detalhe

Conta
  → preferências de alerta → Discord → guardadas/histórico
```

## Design system
- Direção: consumo editorial premium, inspirada em Apple Wallet, Revolut, Linear e Arc; nunca dashboard financeiro.
- Hierarquia obrigatória: marca → oportunidade → valor → detalhes. A recompensa apoia a decisão, mas não lidera o ecrã.
- Cores: Warm White `#FCFBF8`, Warm Grey `#EDEAE3`, Editorial Green `#173F32`, Beer Gold `#C99A3D`, Ink `#222222`.
- Tipografia: Outfit para marca, títulos e valores; Figtree para interface, leitura e metadados.
- Estrutura: ritmo magazine, divisórias finas, muito espaço negativo, cartões simples e navegação monocromática.
- Marcas: logótipos grandes e nomes explícitos; monogramas neutros apenas quando não existe ativo oficial.
- Raios: 6–10 px. Cartões nunca aninhados e sem cápsulas decorativas ou categorias coloridas.
- Espaçamento base: 4 px; grelha principal 20/24 px.
- Ícones: contorno de 1,75 px; sem emojis como iconografia estrutural.
- Tom: factual, português europeu, benefício primeiro, condições explícitas.

## Motion guidelines
- Entrada de novidade: 320 ms, deslocamento vertical de 12 px e fade.
- Mudança de valor: número antigo reduz e sobe; novo valor entra de baixo, 420 ms.
- Guardar: escala 0,96 → 1 com preenchimento do marcador, 180 ms.
- Mudança de página: fade curto de 180 ms; sem transições decorativas contínuas.
- Vibração: apenas em dispositivo compatível e após ação direta; padrão máximo de 12 ms.
- `prefers-reduced-motion`: remover deslocamentos e contagens, preservar mudança instantânea de estado.

## PWA install flow
1. Mostrar depois da primeira autenticação, nunca antes de o utilizador entender o valor.
2. iPhone/iPad: Partilhar → Adicionar ao Ecrã Principal → Adicionar.
3. Android: usar o prompt nativo quando disponível; caso contrário, Menu → Adicionar ao ecrã principal.
4. Explicar o benefício: acesso num toque e alertas quando estiverem configurados.
5. Permitir “Agora não”; voltar a sugerir apenas na Conta, sem insistência.

## Estrutura de dados
- `opportunities`: conteúdo, categoria, intervalo de recompensa, esforço, prazo, destaque, novidade, passos e estado.
- `profiles`: preferências, onboarding, instalação, notificações e última visita.
- `saved_opportunities`: relação pessoal com guardadas/concluídas.
- `user_roles`: permissões editoriais separadas do perfil.
- Futuro V2: `opportunity_events`, `device_tokens`, `alert_preferences`, `referral_sources`.

## Roadmap MVP
- Onboarding, Google/Apple, instalação PWA.
- Hoje orientado a mudanças desde a última visita.
- Explorar, pesquisar, filtrar, guardar e detalhe.
- Feed de alertas e preferências essenciais.
- Operação editorial inicial e métricas de abertura → detalhe → começar.

## Roadmap V2
- Alertas push segmentados por categoria e valor mínimo.
- Personalização baseada em interações declaradas, não em padrões obscuros.
- Comparador de requisitos e tempo real investido.
- Confirmação comunitária de campanhas terminadas ou alteradas.
- Histórico de valores e credibilidade das fontes.
- Discord ligado a oportunidades específicas, sem substituir a aplicação.

## Retenção sem gamificação
- Resumo “desde a última visita”, curto e finito.
- Alertas apenas quando existe mudança material.
- Aumentos de valor apresentados como atualização, não como urgência artificial.
- Digest configurável por categoria e valor mínimo.
- Estado “Estás em dia” que recompensa confiança e reduz ansiedade.
- Guardadas com lembrete antes do prazo e confirmação de conclusão.
- Transparência: última verificação, condições e motivo da recomendação.
- Rotina semanal com total novo, expirado e aproveitado — sem XP, níveis ou rankings.
