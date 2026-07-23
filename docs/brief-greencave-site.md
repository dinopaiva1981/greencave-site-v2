# BRIEF — Novo site Greencave.Co

## 1. Contexto
A Greencave é um hub criativo fundado por Dino Paiva que atende canais de televisão, agências e holdings que investem em comunicação e experimentação de conteúdo em novas mídias. Atua desde 2017 com direção criativa, design, estúdio virtual (Unreal Engine, Aximmetry, Zero Density), brand entertainment e minilabs customizados em 3 tamanhos conforme a necessidade do cliente.

**Job do site:** ser um portfólio vivo — provar autoridade criativa por meio de cases e converter decisores (diretores de canal, heads de marketing, C-levels de holdings) em contato comercial.

**Tom:** confiante, direto, criativo sem ser barulhento. Estúdio premium, não agência genérica.

---

## 2. Proposta de valor (copy do Hero)
Resumo direto do que entregamos: **operação criativa para todas as telas** — do broadcast ao virtual production, do design ao brand entertainment. Copy curta, afirmativa, sem jargão vazio.

Direção de copy (refinar em 2–3 variações):
- "Operação criativa para todas as telas."
- Sublinha: "Design, virtual production e brand entertainment para quem faz televisão, mídia e marcas acontecerem — desde 2017."
- CTA único: "Ver nossos cases" (scroll) + CTA secundário discreto "Falar com a Greencave".

---

## 3. Estrutura da Home (ordem das seções)

### 3.1 Loader
- Loader de entrada inspirado no "Hey Visual" da Greencave.Co: curto (máx. 1.5–2s), tipográfico, com contagem ou reveal do logotipo.
- Aparece apenas no primeiro acesso da sessão (sessionStorage) — nunca punir revisitas.
- Respeitar `prefers-reduced-motion`.

### 3.2 Hero
- Copy da proposta de valor + elementos gráficos minimalistas (formas geométricas sutis, grid visível ou traço fino animado — não ilustração pesada).
- Tipografia como protagonista: display grande, animação de reveal por linha (stagger).
- Indicador de scroll discreto.

### 3.3 Carrossel de clientes
- Slider/marquee minimalista com logos: Disney, TV TEM, Fremantle, Record TV, VMLY&R, Stone, Suzano, New Content etc.
- Logos monocromáticos (cinza/tinta), ganham cor ou contraste no hover.
- Animação contínua suave, pausa no hover, arrastável no mobile.

### 3.4 O que fazemos
- Seção clara com 3–4 pilares de serviço (ex.: Direção Criativa & Design / Estúdio Virtual & Virtual Production / Brand Entertainment & Novas Mídias / Minilabs Greencave — P, M, G).
- Cada pilar: título, 1 parágrafo curto, sem ícones genéricos de stock. Preferir numeração ou tipografia como estrutura.
- Reveal on-scroll sutil.

### 3.5 Crawl / Trajetória (assinatura da página)
- Marquee/crawl tipográfico grande e elegante: **"Operação Criativa para todas as telas desde 2017."**
- Complementar com números em contadores animados on-scroll: anos de operação, projetos entregues, clientes atendidos, telas/formatos, países. (Deixar campos editáveis no CMS — valores reais serão preenchidos por nós.)
- Este é o elemento memorável do site: o crawl responde ao scroll (velocidade/direção), estilo Awwwards, mas com precisão nórdica — nada excessivo.

### 3.6 Works (cases)
- Grid de thumbs grandes e imersivos (16:9 ou variados), hover com leve zoom/parallax + título do case.
- Cada case abre página própria: hero full-bleed, desafio, solução, resultados, galeria (imagem + vídeo), cliente, ano, serviços, créditos do time.
- Filtro simples por categoria (Broadcast, Virtual Production, Branding, Digital...).
- Ordem dos cases controlada pelo CMS (destaques primeiro).

### 3.7 About / Time
- História curta da Greencave + fotos e bios do time.
- Grid de retratos com hover (foto alternativa ou leve efeito).
- Fechamento com CTA de contato.

### 3.8 Footer
- Contato, redes, seletor de idioma, endereço/atuação, copyright.

---

## 4. Direção de arte

### Tipografia (design nórdico: Sans + Cursiva)
- **Display Sans:** grotesca de personalidade nórdica — ex. *Neue Haas Grotesk*, *Suisse Int'l*, ou livres como *Space Grotesk* / *Hanken Grotesk*. Pesos bem definidos, tracking apertado nos títulos grandes.
- **Cursiva de acento:** usada com muita parcimônia — uma palavra destacada no hero, legendas de case, detalhes. Ex. *Instrument Serif Italic* ou uma script elegante tipo *Nautica* / *Silk Serif Italic*. Nunca em parágrafos.
- **Corpo/utilidade:** a mesma sans em peso regular, escala tipográfica clara e generosa em respiro.

### Paleta
- Base minimalista nórdica: off-white frio + tinta quase preta + 1 acento (sugestão: o verde da marca Greencave, usado cirurgicamente — links, hover, detalhes do crawl). Definir 4–6 tokens nomeados.
- Muito espaço em branco. O conteúdo dos cases traz a cor; a interface fica quieta.

### Motion (referência Awwwards)
- Animações inteligentes e intencionais, não decorativas: reveal por linha no hero, marquee reativo ao scroll no crawl, parallax leve nos thumbs, transições de página suaves.
- Uma orquestração forte (loader → hero) vale mais que efeitos espalhados.
- Sempre respeitar `prefers-reduced-motion` e manter performance (LCP rápido, sem jank).

---

## 5. CMS / Painel Admin
Requisito central: **tudo administrável sem código**, painel fora do site público (rota protegida, ex. `/admin`, com login).

O painel deve gerenciar:
- **Cases:** criar/editar/ordenar/ocultar; upload de imagens e vídeos; campos estruturados (cliente, ano, categoria, desafio, solução, resultados, galeria, destaque sim/não).
- **Clientes/logos:** upload de SVG/PNG, ordem do carrossel.
- **Números da trajetória:** editar valores e labels dos contadores.
- **Time:** membros, fotos, bios, ordem.
- **Textos gerais:** hero, seção "o que fazemos", about, footer, SEO (title/description por página).
- **Traduções:** cada campo de texto com abas por idioma (PT / EN / ES / ZH / NO) lado a lado, com indicador visual de tradução pendente.

UX do painel: prático, intuitivo, organizado — listas com drag-and-drop para ordenação, preview antes de publicar, salvar como rascunho.

---

## 6. Idiomas (i18n)
- 5 idiomas: **Português (padrão), Inglês, Espanhol, Mandarim (simplificado), Norueguês (Bokmål)**.
- URLs por idioma (`/en`, `/es`, `/zh`, `/no`) + hreflang correto para SEO.
- Seletor de idioma discreto no header/footer.
- Tipografia precisa suportar caracteres CJK com fallback elegante para o mandarim (ex. *Noto Sans SC* combinando com a grotesca).
- Traduções impecáveis: nada de tradução literal — adaptar copy criativa por idioma (transcriação), mantendo o tom.

---

## 7. Requisitos técnicos
- Responsivo impecável (mobile-first nos cases — thumbs continuam imersivos).
- Performance: imagens otimizadas/lazy load, vídeos em loop leves (webm/mp4 curtos) nos cases.
- SEO técnico: metadados por página e idioma, Open Graph com thumbs dos cases, sitemap.
- Acessibilidade: contraste AA, foco visível, reduced motion.
- Analytics básico (page views e cliques em CTA).

---

## 8. O que a Greencave fornece
- Logos dos clientes (SVG), imagens/vídeos dos cases, fotos do time, números reais da trajetória, marca Greencave (logo + verde institucional).
- Até lá: usar placeholders bem diagramados e campos prontos no CMS.

## 9. Critério de sucesso
Um visitante decisor entende em 10 segundos o que a Greencave faz, se impressiona com os cases em 60, e encontra o contato sem esforço. E o time interno atualiza um case novo em menos de 5 minutos pelo painel.
