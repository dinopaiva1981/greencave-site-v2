# Greencave — Site + CMS

Site institucional da Greencave, hospedado como página estática no GitHub Pages, com painel de administração próprio (sem servidor, sem banco de dados).

**No ar:** https://greencave.co
**Painel:** https://greencave.co/admin.html

---

## Estrutura do repositório

```
.
├── CNAME                  # domínio customizado (greencave.co) — arquivo do GitHub Pages, não tocar
├── index.html             # o site — muda raramente (só quando há evolução de código/design)
├── admin.html             # o painel de gestão de conteúdo (CMS)
├── content.json           # todo o conteúdo do site — schemaVersion + generatedAt + IDs estáveis em cada bloco
├── config.json            # configuração central (repositório, branch, versões, categorias de mídia)
├── migration.js           # migrações de schema do content.json — aplicadas automaticamente pelo admin
├── .cms-state.json        # gerado a cada publicação: SHA, data, versão do CMS/schema (não editar à mão)
├── .cms-log.json          # histórico estruturado de publicações (gerado automaticamente)
├── backups/                # cópia do content.json feita automaticamente antes de cada publicação
│
├── media/
│   ├── team/                fotos do time (dino.png, Ias.png, machado.png)
│   ├── pilao-espn/           imagens do case — uma pasta por projeto de portfólio
│   ├── huggies-disney/
│   ├── tv-tem/
│   ├── e-entertainment/
│   ├── stone-linx/
│   ├── gnt-barry-company/
│   ├── budweiser-disney-espn/
│   ├── espn-disney/
│   ├── weasyplan/
│   ├── clients/              logos de clientes (uploads futuros via admin)
│   ├── logos/                marca e identidade
│   ├── icons/                 ícones
│   ├── backgrounds/           fundos e texturas
│   └── downloads/              arquivos diversos
│
├── modules/                # reserva estrutural para a modularização futura (cms/seo/analytics/portfolio/blog/careers) — ver modules/README.md
│
├── scripts/
│   └── download-assets.sh  # baixa as imagens originais dos cases, caso precise recriá-las
│
└── docs/
    ├── DEPLOY.md            # passo a passo de publicação (GitHub Pages + domínio no GoDaddy)
    ├── CMS-PRD.docx          # documento de arquitetura do painel (visão de produto)
    ├── CHANGELOG.md          # histórico de versões do projeto
    └── brief-greencave-site.md  # brief original do projeto
```

**Nota sobre `media/`:** cada projeto de portfólio tem sua própria pasta plana (ex.: `media/pilao-espn/`). Novos uploads feitos pela aba Mídia do admin usam as pastas de categoria (`team/clients/logos/icons/backgrounds/downloads`) — é assim que o painel já está configurado, então não é preciso mover nada.

## Como o site funciona

O `index.html` **busca o `content.json` sozinho** ao carregar (`fetch('./content.json')`). Isso significa:

- **Editar conteúdo nunca exige tocar em código.** Tudo passa pelo `admin.html`.
- **Publicar é rápido**: o painel grava só o `content.json` (não o `index.html` inteiro) — menos dado trafegado, histórico do Git mais limpo.
- **Resiliência**: se por qualquer motivo o `content.json` não puder ser buscado, o site cai para um retrato de reserva embutido no próprio `index.html`.

## Como editar o conteúdo

1. Acesse `/admin.html`, faça login.
2. Edite o que quiser — o painel carrega o conteúdo publicado automaticamente.
3. Toda edição é salva como rascunho no seu navegador a cada poucos segundos (autosave).
4. Clique **Publicar**. O painel verifica se ninguém publicou por cima antes de você, grava o `content.json` e atualiza o `.cms-state.json` com data/commit da publicação.
5. O GitHub Pages atualiza o site em ~1 minuto.

Guia completo de configuração inicial (token, domínio, GoDaddy): veja **`docs/DEPLOY.md`**.

## Antes do primeiro deploy

Rode uma vez, na raiz do repositório:
```
bash scripts/download-assets.sh
```
Isso baixa as imagens originais dos projetos do portfólio para `media/cases/`.

## Vídeos

Nunca hospede vídeo neste repositório. Use YouTube ou Vimeo e cole o link no campo correspondente no painel — o site converte automaticamente em player embutido.

## Segurança — o combinado

- A senha do `admin.html` é uma cortina de conveniência (o arquivo é público). Quem protege a publicação de verdade é o **token do GitHub**, que nunca é gravado no repositório — fica só na memória da aba, ou (se você marcar a opção) no armazenamento local do seu navegador.
- Ative 2FA na conta do GitHub — essa é a proteção que realmente importa.
- Token com escopo restrito a este repositório e com expiração definida.

## Arquitetura de dados (v2 — preparação estrutural)

- **`content.json`** carrega `schemaVersion` e `generatedAt` no topo, e **todo bloco repetível tem um `id` estável e permanente** (cases, serviços, dores, itens do Lab, conquistas, time, pilares) — pensado para permitir sincronização e migração segura no futuro, sem depender da posição no array.
- **`config.json`** centraliza repositório, branch, caminhos de arquivo e versões — o admin busca esse arquivo ao abrir; se ele não existir ou falhar, usa valores padrão embutidos no próprio código (mesma filosofia de resiliência do `content.json`).
- **`migration.js`** aplica automaticamente qualquer migração de schema pendente sempre que o admin carrega um `content.json` mais antigo — nunca apaga dado, só adiciona o que falta.
- **Validação antes de publicar**: o admin verifica campos obrigatórios, IDs duplicados e estrutura geral. Erros bloqueiam a publicação; avisos pedem confirmação.
- **Backup automático**: antes de cada publicação, uma cópia do `content.json` anterior é salva em `backups/content-<timestamp>.json`.
- **Log de publicações**: `.cms-log.json` registra cada publicação (data, SHA, versão, avisos), até as últimas 200 entradas.

## Versão do CMS

Este projeto segue o roadmap definido em `docs/CMS-PRD.docx`. Versão atual do painel: **v2.0** (com adiantamentos de v2.1 — conteúdo já separado da lógica em arquivo próprio). Veja `docs/CHANGELOG.md` para o detalhe do que está implementado, simplificado ou pendente por item do roadmap.
