# Versão: v012

## Alterações

### 1. Bug de duplicação na biblioteca de mídia — corrigido
**Causa raiz encontrada**: a pasta de cada projeto (`media/projetos/<slug-do-cliente>/`) era recalculada toda vez a partir do campo de texto "Cliente" — editável. Qualquer ajuste no nome (acento, maiúscula, espaço) gerava um slug novo, "trocando" a pasta em silêncio: as imagens antigas ficavam órfãs, e a próxima imagem enviada ia para uma pasta nova — na Biblioteca, isso aparecia como o mesmo projeto duplicado.
**Correção**: a pasta agora é travada (`w.mediaFolder`) na primeira vez que é calculada e nunca muda depois, mesmo que o nome do cliente seja editado. Compatível com o que já existe no repositório — o valor calculado na primeira execução após esta correção é idêntico ao nome de pasta que já estava em uso.

### 2. Rascunho / Publicado — novo
Cada projeto (Trabalhos/Cases) agora tem um campo de status: **Publicado** (padrão) ou **Rascunho**. Rascunho fica salvo no admin, com selo visual amarelo no card, mas **some do site** — do grid de Cases, do grid de Trabalhos, do slider do hero e da navegação "próximo case" (que agora pula rascunhos automaticamente). Resolve exatamente o cenário de "cliente pediu pra esperar antes de publicar" sem precisar excluir o trabalho.

### 3. Dashboard — métricas revisadas
- **Novo**: "Arquivos na biblioteca" — métrica real, consultando o GitHub ao vivo (mesmo mecanismo do card de Status do Git). Antes, o painel só contava URLs *referenciadas* dentro do content.json (galeria, blocos), que é sempre um número menor que o total real de arquivos enviados — por isso "não batia".
- **Novo**: contador de "Rascunhos" (só aparece se houver algum).

### 4. Ícones — migração completa para o sistema SVG
Auditoria encontrou um bug de verdade: **o menu lateral inteiro estava sem nenhum ícone visível.** O CSS já tinha sido preparado para ícones SVG modernos (`.gc-ico`), mas o JavaScript nunca foi atualizado — ainda desenhava os glifos Unicode antigos, que o próprio CSS esconde (`display:none`). Corrigido, e estendido para:
- Menu lateral (12 seções, cada uma com ícone próprio e coerente)
- Métricas do Dashboard (Cases, Clientes, Serviços, Time, Idiomas, Números, Imagens, Galeria, Blocos, Rascunhos, Arquivos)
- Card de Status do Git (relógio, commit, foguete)
- Controles de item em toda a plataforma — subir/descer/duplicar/excluir (usado em Cases, Serviços, Clientes, Time, Blocos, Conquistas, Números — todo lugar que lista itens)
- 7 ícones novos desenhados no mesmo traço fino do sistema existente: globo, camadas, pasta, olho riscado, galeria, relógio, commit, seta-cima, seta-baixo, duplicar, lixeira.

## Arquivos alterados
- admin.html (os 4 pontos acima)
- index.html (esconder rascunhos — já estava assim desde a v011, confirmado idêntico)
- content.json (sem alteração — os campos novos se autopreenchem na primeira vez que o admin roda, retrocompatível)
- config.json (sem alteração)

## QA executado
- Sintaxe de todos os blocos de script validada (`node --check`)
- Chaves CSS balanceadas (saldo zero)
- Simulação dos 3 cenários críticos: pasta de mídia permanece estável após editar o nome do cliente; rascunho fica oculto no site preservando compatibilidade com content.json antigo (sem o campo `status`); navegação "próximo case" pula rascunhos corretamente
- Confirmado que markDirty() (disparado pelo fix da pasta) não aciona re-render — sem risco de loop
- content.json não precisou de nenhuma migração manual

## Observações importantes
- **Ação nenhuma necessária no content.json** — os campos `mediaFolder` e `status` se preenchem sozinhos na primeira vez que você abrir cada projeto no admin depois de publicar esta versão.
- Itens que ficaram de fora desta rodada por escopo (posso atacar a seguir se topar): os ícones de ação menores (copiar URL ⧉, excluir ✕, fechar de modais, checkmarks de seleção) ainda usam glifo Unicode — funcionam bem, mas não fazem parte do sistema SVG novo. Dá pra padronizar também, se quiser ir até o fim.
