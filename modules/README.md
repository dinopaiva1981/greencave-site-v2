# modules/

Esta pasta é a reserva estrutural para a evolução modular do CMS Greencave — prevista no roadmap v2/v3, mas **ainda não ativada**.

## Por que está vazia (de propósito)

Hoje, `index.html` e `admin.html` são aplicações de arquivo único — decisão deliberada desde o início do projeto, pensada para funcionar em GitHub Pages sem nenhuma ferramenta de build. Quebrar esse código em módulos de verdade (arquivos `.js` separados, importados via `<script type="module">` ou bundler) é uma refatoração de risco real: muda como tudo é carregado, testado e depurado.

O princípio que guiou esta etapa de preparação foi **"nenhuma regressão, cada evolução reversível"** — por isso, em vez de fatiar código que já funciona e está testado, esta pasta só reserva o *espaço* e a *intenção* de cada futuro módulo. A extração de código de verdade para dentro dela deve ser sua própria etapa, feita com testes antes/depois, não embutida silenciosamente numa preparação de arquitetura.

## O que cada pasta vai abrigar, quando chegar a hora

- **cms/** — lógica do painel hoje dentro de `admin.html` (validação, publicação, mídia, migrações)
- **seo/** — geração de meta tags, sitemap, structured data
- **analytics/** — integração com Plausible/GA4 (mencionada no dashboard do CMS)
- **portfolio/** — lógica hoje dentro de `index.html` referente a cases e trabalhos
- **blog/** — novo módulo de conteúdo, ainda não existente no site
- **careers/** — novo módulo de vagas/carreiras, ainda não existente no site

## Como migrar de verdade, quando decidir fazer

1. Escolher UM módulo por vez (sugestão: começar por `seo/`, que é o mais isolado e de menor risco)
2. Extrair a lógica correspondente de `admin.html`/`index.html` para um arquivo `.js` dentro da pasta
3. Referenciar via `<script src="modules/seo/seo.js"></script>`
4. Testar exaustivamente antes de remover o código antigo do arquivo monolítico
5. Registrar a mudança em `docs/CHANGELOG.md`
