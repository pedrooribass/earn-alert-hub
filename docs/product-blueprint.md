# Beer Money App — Product Blueprint

## Princípio central
A Beer Money App verifica bónus de registo para que o utilizador não tenha de o fazer. A interface funciona como um registo factual: recompensa, capital exigido e prazo de pagamento aparecem sempre em conjunto.

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
- Direção: produto de consumo premium, inspirado em Apple Wallet, Whop, Airbnb, Revolut e App Store Today; nunca dashboard financeiro, bolsa de crypto ou site de cupões.
- Hierarquia obrigatória por luminância, funcional em escala de cinzentos. Valores monetários usam tinta escura e nunca cor semântica.
- Cores: fundo `#FAFAFA`, superfícies brancas, azul `#2B44E0` apenas para ação/foco/separador ativo, verde `#0C6B48` apenas para verificado e concluído, âmbar `#9A4E00` apenas para capital exigido, bloqueios e esperas.
- Tipografia: Outfit para marca, títulos e valores; Figtree para interface, leitura e metadados.
- Estrutura: espaço negativo controlado, títulos compactos, informação densa mas respirável, poucas divisórias e cartões simples. Sem tipografia editorial.
- Tipografia: Outfit nos títulos; Figtree na interface e no corpo.
- Hoje: medidor contido com valor reclamado, valor disponível, percentagem e ofertas por concluir; sem prova social, contadores ou valores inventados.
- Explorar: Destaques, Dinheiro rápido, Cashback, Contas, Crypto e Questionários. A linguagem apresenta benefícios comerciais, nunca produtos financeiros.
- Alertas: apenas próximos passos pessoais, validações, levantamentos e novas recompensas relevantes.
- Progresso: cada campanha tem três estados — não iniciada, em progresso e concluída — que atualizam o valor reclamado e disponível.
- Peso informativo: oportunidades em curso e recompensas disponíveis têm maior peso; itens concluídos e históricos tornam-se mais leves e neutros.
- Navegação: superfície branca; estado ativo azul e estados inativos em cinzento neutro.
- Interação nativa: texto da interface não selecionável e `touch-callout` desativado; campos de introdução mantêm seleção normal.
- Marcas: usar sempre o ativo oficial colorido mais reconhecível quando a marca o disponibiliza; nunca gerar ou redesenhar logótipos.
- Raios: 6–10 px. Cartões nunca aninhados e sem cápsulas decorativas ou categorias coloridas.
- Espaçamento base: 4 px; grelha principal 20/24 px.
- Ícones: contorno de 1,75 px; sem emojis como iconografia estrutural.
- Tom: factual e notarial, em português europeu. Sem promessas de enriquecimento, urgência artificial ou linguagem de venda. Dados desconhecidos usam literalmente `[PREENCHER]`.
- CTA: nomeia sempre a consequência concreta, sem setas anexas ao texto.
- Estados: “Não iniciada” não aparece como etiqueta persistente; só progresso real é assinalado.

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
