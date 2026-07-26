# Versão: v002

## Alterações
- **Correção de arquitetura**: o texto do case Aché — Cuidados Pela Vida (blocos "O que já entregamos", "Confiança estratégica, não só execução", "Robustez de workflow", "Isso é só uma pequena parte do nosso potencial") estava sendo editado por engano dentro do snapshot de fallback embutido no index.html (`<script id="gc-content">`), que só é lido se o content.json falhar. Por isso a mudança nunca aparecia no site publicado.
- Agora o texto correto está no `content.json`, que é a fonte de verdade real lida pelo index.html em produção.
- index.html e admin.html desta versão são idênticos ao v001 (fixes de responsividade mobile mantidos: menu, logos, cursor, cards de case). Nenhuma mudança de arquitetura ou de código foi feita além da correção do local do conteúdo.

## Arquivos alterados
- content.json (novo — conteúdo correto do case Aché)
- index.html (sem mudança de código em relação ao v001, incluído para manter o pacote completo)
- admin.html (sem mudança em relação ao v001, incluído para manter o pacote completo)

## Observações importantes
- **Ação necessária**: suba o content.json desta pasta na raiz do repositório (mesmo local do index.html), substituindo o content.json atual. Esse é o arquivo que realmente muda o que aparece no site.
- Confirmado no código: o index.html sempre tenta `fetch('./content.json')` primeiro; só usa o snapshot embutido se esse fetch falhar. Ou seja, 100% das seções do site (hero, clients, services, stats, hslide, works/cases, craft, quem, lab, about, awards, footer, textos de UI) são hoje renderizadas a partir do content.json — nenhuma seção tem conteúdo real hardcoded no index.html.
- admin.html continua sendo o editor/publicador correto do content.json (via GitHub). Qualquer alteração de texto futura deve passar por ele ou por este content.json — nunca pelo snapshot embutido do index.html.
