# Versão: v003

## Alterações
- **Correção crítica**: a v002 tinha sobrescrito o `content.json` a partir de um snapshot antigo que eu mesmo havia gerado — isso apagou conteúdo real que o Dino já tinha atualizado via admin.html (ex: 12 works em vez de menos, blocos de mídia reais do case Aché: vídeo Vimeo, GIFs "duo", imagem, galeria de 8 imagens do Behance).
- Nesta versão, o `content.json` enviado pelo Dino (backup real, pós-atualizações no admin) foi usado como base **intocada**. A única mudança: no case Aché — Cuidados Pela Vida, o campo `body` foi atualizado com o texto novo, e 4 blocos do tipo "text" (O que já entregamos / Confiança estratégica, não só execução / Robustez de workflow / Isso é só uma pequena parte do nosso potencial) foram ACRESCENTADOS ao final da lista de blocos — sem remover nenhum dos 5 blocos de mídia originais (vídeo, duo, imagem, galeria, imagem).
- index.html, admin.html e config.json desta versão são exatamente os arquivos que o Dino reenviou — nenhuma edição de código foi feita neles.

## Arquivos alterados
- content.json (único arquivo com mudança de conteúdo)
- index.html (reenviado pelo Dino, sem alteração)
- admin.html (reenviado pelo Dino, sem alteração)
- config.json (reenviado pelo Dino, sem alteração — incluído só para manter o pacote completo)

## Observações importantes
- QA rodado e confirmado: os outros 11 "works" do content.json são idênticos byte-a-byte ao backup do Dino. Todas as demais seções (hero, clients, services, stats, about, contact, awards, quem, reel, lab, ui, meta) permanecem intocadas.
- Os 5 blocos de mídia originais do case Aché (vídeo, duo de GIFs, imagem, galeria de 8 peças, imagem final) foram preservados na íntegra, na mesma ordem.
- **Lição interna**: daqui pra frente, qualquer atualização de conteúdo parte sempre do último content.json que o Dino confirmar como "no ar" — nunca de um snapshot gerado por mim em sessão anterior.
