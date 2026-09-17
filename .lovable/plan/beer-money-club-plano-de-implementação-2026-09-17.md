# Beer Money Club — plano de implementação

## Objetivo
Criar uma PWA mobile-first em português, centrada em responder instantaneamente ao que mudou desde a última visita e nas oportunidades novas e urgentes. A experiência deverá transmitir rapidez, confiança e organização, sem parecer um casino, site de cupões ou produto crypto agressivo.

## Experiência a construir
1. **Onboarding em quatro momentos**
   - Promessa “Nunca mais percas uma oportunidade”.
   - Oportunidade que aparece e expira com movimento subtil.
   - Notificação visual “Bybit aumentou para 50€”.
   - Contador animado até 287€ e botão “Começar”.
   - Progresso discreto, navegação por gesto/botão e respeito por movimento reduzido.

2. **Entrada e instalação**
   - Ecrã apenas com “Continuar com Google” e “Continuar com Apple”.
   - Ativação de Lovable Cloud para autenticação e dados persistentes.
   - Fluxo premium pós-login para adicionar ao ecrã principal, com instruções específicas para iPhone e Android.
   - Manifesto, ícones e metadados para instalação; sem modo offline nesta fase.

3. **Aplicação principal**
   - “Hoje” abre num resumo temporal direto: novas desde a última visita, alterações de valor, prazos que ficaram urgentes e total disponível agora.
   - O estado “Estás em dia” substitui a navegação infinita quando não há novidades.
   - Quatro abas inferiores: Hoje, Explorar, Alertas e Conta.
   - Explorar com pesquisa, categorias e filtros úteis.
   - Alertas como timeline cronológica.
   - Conta com perfil, Discord, preferências e histórico.
   - Detalhe da oportunidade com passos, tempo, dificuldade, valor esperado, prazo e ação principal.

4. **Conteúdo inicial**
   - Oportunidades realistas de exemplo para bancos, investimento, cashback, IA, telecom, gaming e compras.
   - Estados de nova, urgente, guardada e expirada.
   - Texto português europeu curto, transparente e sem linguagem promocional agressiva.

## Direção visual
- Paleta fornecida: cream white, warm white, dark green, beer gold, warm grey e text dark.
- Tipografia editorial moderna, hierarquia muito clara e formas compactas inspiradas em Revolut, Vinted, Apple Wallet, Linear, Notion e Arc.
- Ícone BMC minimalista: tampa abstrata com moeda/B integrada, legível em tamanho de aplicação.
- Cartões com pouca curvatura, sem excesso de sombras, sem gradientes chamativos e sem banners.
- Movimento com propósito: entradas suaves, atualização de valores, guardar e transições entre onboarding.

## Estrutura técnica
- Rotas separadas para `/`, `/onboarding`, `/login`, `/explorar`, `/alertas`, `/conta` e `/oportunidades/$id`, cada uma com metadados próprios.
- Componentes partilhados para navegação inferior, cartões, etiquetas, filtros e modais.
- Dados iniciais incluídos na base de dados através de migração, com políticas de acesso seguras.
- Papéis de utilizador separados dos perfis caso seja necessária administração futura.
- Estado de onboarding e instalação associado à conta; nenhum armazenamento local como fonte de verdade para permissões.

## Entregáveis de produto
- Wireframes completos refletidos nos ecrãs implementados.
- Fluxo do utilizador documentado.
- Design system e motion guidelines documentados.
- Fluxo PWA documentado e implementado.
- Estrutura de dados documentada e preparada.
- Roadmap MVP e V2.
- Lista de mecanismos de retenção sem dependência de gamificação.

## Validação
- Testar visualmente em 390×844 e desktop.
- Confirmar onboarding, navegação, pesquisa/filtros, guardar, detalhe e instalação.
- Verificar legibilidade, ausência de sobreposições, estados vazios e movimento reduzido.
- Confirmar que a aplicação compila sem erros e que todas as páginas têm metadados próprios.
