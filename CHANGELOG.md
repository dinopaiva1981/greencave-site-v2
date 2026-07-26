# Versão: v004

## Alterações
- **Reconciliação de conteúdo**: comparado o `index-2.html` (build de 24/07, V4.1·2026-07-24-2115) com o `content.json` mais recente. Confirmado que todo item do dia 24/07 já existe na versão mais nova, com o mesmo ID interno e mais completo — nada tinha sido perdido, ao contrário do que parecia.
- Adicionado ao case Aché o vídeo do YouTube (campanha Awareness) que existia no build de 24/07 e não estava na versão mais recente. Nenhum outro conteúdo foi alterado ou removido.
- **Reaplicados os 4 fixes de responsividade mobile** (menu cortado no topo, logos desalinhadas, cursor customizado vazando em telas de toque, título/tags dos cards de case colidindo) — não estavam presentes na base de arquivos mais recente enviada, então foram reincorporados para manter a entrega cumulativa.
- Arquitetura mantida 100% a atual: `admin.html` com repositório `dinopaiva1981/greencave-site-v2` centralizado via `config.json`, feature "IA aplicada" (checkbox + selo no site) intacta.

## Arquivos alterados
- content.json (vídeo do YouTube acrescentado ao case Aché)
- index.html (4 fixes de responsividade mobile reaplicados)
- admin.html (sem alteração — já estava na arquitetura correta)
- config.json (sem alteração)

## Observações importantes
- **12 trabalhos confirmados no content.json**, incluindo os que tinham sumido da vista no `index-2.html` de 24/07 (Sadia, Café Pilão - ESPN, Polônia) — na real nunca sumiram, só foram editados/renomeados depois (ex: "Documentário Internacional" virou "Polônia" com o mesmo ID interno).
- Case Aché agora com 10 blocos: 2 vídeos (Vimeo + YouTube), 1 dupla de GIFs, 1 imagem, 1 galeria de 8 peças, 1 imagem final, e os 4 blocos de texto (O que já entregamos / Confiança estratégica / Robustez de workflow / Potencial).
- QA rodado cobrindo: arquitetura (repo, config centralizado, feature IA), os 4 fixes mobile, e integridade de conteúdo (12 works, blocos do Ache intactos, schema válido para o loader do site).
