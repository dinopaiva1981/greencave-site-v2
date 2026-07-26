# Versão: v001

## Alterações
- Fix do menu mobile: item de navegação cortado no topo e espaço vazio excessivo (justify-content:center trocado por flex-start)
- Logos Hotmilk/PUCPR desalinhadas no mobile: agora centralizadas na grade de 2 colunas
- Cursor customizado ("VER CASE"): reforço para nunca aparecer em telas de toque/estreitas (<900px)
- Cards de Cases/Trabalhos: título e tags empilham verticalmente abaixo de 1080px (antes ficavam lado a lado e quebravam palavra por palavra, parecendo sobrepor o card vizinho); respiro entre cards aumentado em telas médias e pequenas
- Texto definitivo do case Aché — Cuidados Pela Vida, com 4 blocos: "O que já entregamos", "Confiança estratégica, não só execução", "Robustez de workflow" e "Isso é só uma pequena parte do nosso potencial". Esse modelo de 5 blocos (Contexto + os 4 acima) fica como padrão para os próximos cases.

## Arquivos alterados
- index.html
- admin.html

## Observações importantes
- Este pacote parte da base de arquivos que o Dino confirmou estar funcionando (index.html reenviado em 25/07), com os fixes de responsividade e o texto do case reaplicados por cima — não da versão gerada anteriormente pelo Claude.
- admin.html não teve alteração de conteúdo própria nesta versão (o texto do case é lido do mesmo JSON do index.html), mas está incluído para manter o par sempre sincronizado.
- A partir desta entrega, o fluxo de versionamento passa a ser por pasta release_vXXX (substituindo o padrão anterior de sufixo _v001 no nome do arquivo).
