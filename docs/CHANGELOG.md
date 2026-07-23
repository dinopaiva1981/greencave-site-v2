# Changelog

## v2.0.1 — Preparação de arquitetura (atual)

Rodada de infraestrutura pura, sem nenhuma mudança de layout, conteúdo ou funcionalidade visual — critério de aceite explícito desta etapa. Referência: `docs/Greencave_CMS_v2_Preparacao_Arquitetura_Claude.docx`.

- `schemaVersion` e `generatedAt` no topo do `content.json`
- **IDs estáveis e permanentes** em todo bloco repetível (cases, serviços, dores, Lab, conquistas, time, pilares) — gerados também para qualquer item novo criado pelo admin
- **Validação bloqueante antes de publicar**: campos obrigatórios, IDs duplicados, estrutura geral
- **Backup automático** do `content.json` antes de cada publicação, em `backups/content-<timestamp>.json`
- **`config.json`**: repositório, branch, caminhos e versões centralizados, com fallback embutido se o arquivo não existir
- **`migration.js`**: sistema de migração de schema, testado com um caso real (adiciona IDs a conteúdo migrado de antes desta versão)
- **`.cms-log.json`**: histórico estruturado de publicações (data, SHA, versão, avisos)
- **`index.html` mais resiliente**: agora valida a *forma* do `content.json` recebido (não só se o fetch funcionou), com fallback seguro em qualquer cenário de falha
- **`modules/`**: pasta reservada e documentada para a futura extração de código em módulos (cms/seo/analytics/portfolio/blog/careers) — decisão deliberada de **não** fatiar o código monolítico ainda, para não introduzir risco de regressão numa etapa que deveria ser só de preparação
- Importação/exportação de `content.json` pelo painel — já existia, confirmada e mantida

**Critério de aceite verificado**: site permanece visualmente idêntico, CMS publica normalmente, todo conteúdo preservado, zero regressão (12/12 itens auditados com testes automatizados).

## v2.0 — CMS com conteúdo separado

Marco arquitetural principal: o conteúdo do site saiu de dentro do `index.html` e passou a viver em `content.json`, um arquivo próprio buscado em tempo de execução. Na prática, isso já adianta o item central do roadmap de v2.1 do PRD.

**Implementado de ponta a ponta** (referência: `docs/CMS-PRD.docx`):
- Conteúdo separado da lógica (`content.json` próprio, com fallback embutido de segurança)
- Controle de Git: SHA consultado ao abrir o painel e novamente antes de publicar
- Bloqueio de publicação em conflito (se alguém publicou por cima, o painel avisa e pede recarregar)
- `.cms-state.json` gerado a cada publicação (SHA, data, autor, versão do CMS)
- Token do GitHub: opção "Lembrar neste navegador" / "Esquecer", nunca gravado no repositório
- Publicação com etapas visíveis (preparando → verificando conflito → gravando → confirmado)
- Histórico de publicações com restauração de qualquer versão anterior em um clique
- Mídia: arrastar-e-soltar, múltiplos arquivos, compressão automática para WebP, prevenção de duplicados
- Estrutura de pastas por categoria (`team/clients/cases/logos/icons/backgrounds/downloads`)
- Preview antes de publicar, indicador de alterações pendentes, autosave e recuperação de rascunho
- Redesign completo do painel: animações, sidebar com gaveta no mobile, tela de login com identidade visual

**Implementado em versão simplificada** (por não haver servidor):
- "Backup automático antes de cada publicação" → cumprido pelo próprio histórico de commits do Git, não por uma cópia à parte
- "Upload de mídia" como etapa do fluxo de publicação → mídia é enviada antes, numa aba própria, não durante o clique em Publicar

**Ainda não implementado — pertence ao próximo salto (v2.1/v3.0 do próprio roadmap)**:
- Geração automática do `index.html` a partir do `content.json` via pipeline de build (ex.: GitHub Actions) — hoje a geração é feita manualmente a cada evolução de código
- Fluxo `git pull --rebase` — é processo do desenvolvedor no terminal, fora do escopo do painel

## v1.x — Fundação

- Site institucional completo: hero, dores por segmento, serviços, portfólio (cases e trabalhos), unidade Lab, estúdio/time, contato
- Sistema de 5 idiomas (PT/EN/ES/ZH/NO) com auto-tradução assistida
- Painel de administração inicial: CRUD completo de todo o conteúdo, publicação via API do GitHub, upload de mídia
- Identidade visual: loader animado, cursor customizado, tipografia sob medida, showreel em destaque
- Migração de conteúdo do Webflow, correções de responsividade (mobile/tablet), correções de acessibilidade e performance
