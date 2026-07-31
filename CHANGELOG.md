# Versão: v014 — correção crítica (tela preta)

## O que quebrava
Você reportou: ao subir o `admin.html`, a tela ficava toda preta, sem conteúdo. Reproduzi o travamento de verdade, simulando o painel num navegador headless com o `content.json` real que você baixou do git. Eram **dois bugs reais**, um deles introduzido por mim numa correção anterior:

### 1. Transição de entrada travava a tela em preto
Ao digitar a senha, uma animação (`miniCave()`) pinta a tela inteira de preto antes de "abrir um buraco" revelando o painel por trás. Se o canvas falhasse por qualquer motivo (extensão de privacidade que bloqueia canvas/fingerprinting, navegador in-app restrito, etc.), a função quebrava **antes** de completar a animação — a camada preta ficava presa na tela pra sempre. E como a quebra acontecia antes da linha que carrega o conteúdo, nada aparecia atrás dela.
**Corrigido**: qualquer falha na transição agora é blindada com try/catch em dois níveis, mais um cronômetro de segurança de 2s que remove a camada preta de qualquer jeito — pior caso, a transição bonita não roda, mas o conteúdo sempre carrega.

### 2. `svg is not defined` — bug meu, da migração de ícones anterior
Quando migrei os ícones do menu lateral para SVG (release anterior), coloquei o sistema de ícones dentro de um bloco de função fechado — mas o `renderSide()`, que usa esse sistema, vive fora desse bloco. Resultado: toda vez que o menu tentava desenhar um ícone, a função quebrava com `ReferenceError: svg is not defined`, o que interrompia silenciosamente todo o carregamento do conteúdo (a função que carrega o `content.json` engole esse tipo de erro num catch genérico).
**Corrigido**: o sistema de ícones foi movido para o escopo global do arquivo, acessível de qualquer função.

### 3. Bônus: painel de métricas duplicado
No caminho, encontrei um "wrapper" de uma correção anterior (de outra sessão) que desenhava um **segundo card de "Visão geral do conteúdo"**, com ícones antigos e números desatualizados, por cima do card correto — exatamente o tipo de coisa que faz as métricas parecerem "não bater". Removido o card duplicado; só sobra a versão certa e atualizada.

## Validação
Reproduzi o crash exato num navegador headless (jsdom) com o seu `content.json` real, confirmei os dois erros específicos, apliquei as correções, e rodei a simulação completa de novo: painel carrega do início ao fim sem nenhum erro, menu lateral com 21 itens renderizados, painel de conteúdo com os números corretos, seção de Trabalhos com os 10 campos de Status (Publicado/Rascunho) funcionando. Também revalidei que todos os fixes das rodadas anteriores (pasta de mídia travada, rascunho/publicado, tradução em tempo real) continuam intactos.

## Arquivos alterados
- admin.html (os 3 pontos acima)
- index.html (sem alteração nesta rodada — já estava correto)
- content.json (**usei o arquivo real que você baixou do git agora**, não uma versão minha anterior — ver observação abaixo)
- config.json (sem alteração)

## Observação importante sobre o content.json
O arquivo que você me mandou (baixado agora do repositório) tem **10 projetos e 3 pessoas no time** — sem o Adrian (CTO) e sem os 2 projetos extras (Sadia, Café Pilão) que tínhamos adicionado em rodadas anteriores, e **sem o link do banco de talentos preenchido**. Isso não é bug de código — é o estado real que está no seu repositório hoje, provavelmente de uma publicação anterior a partir de uma aba do navegador desatualizada.
Decidi **não mexer nesse conteúdo** e usar exatamente o que você mandou como fonte da verdade, para não repetir o erro de sobrescrever seu trabalho real com uma versão minha antiga. Se quiser recuperar o Adrian, os 2 projetos e o link do banco de talentos, me avisa que eu recomponho com cuidado a partir daqui — ou você mesmo re-adiciona pelo admin, já que o código já dá suporte total a tudo isso.
