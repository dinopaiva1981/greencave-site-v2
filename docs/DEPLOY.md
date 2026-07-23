# Greencave no GitHub Pages — Guia de Deploy e Publicação
### (com domínio próprio no GoDaddy)

## Como funciona o fluxo

O site é 100% estático, então o GitHub Pages serve tudo de graça. O admin fica no mesmo repositório e usa a API oficial do GitHub para fazer o commit do site atualizado — o Pages detecta o commit e republica sozinho em cerca de 1 minuto. Nenhum servidor, nenhum banco de dados.

Fluxo do dia a dia, depois de tudo configurado: abrir `seusite.com/admin.html` → senha → editar → 🚀 Publicar → pronto.

**Ordem recomendada dos passos:** 1) subir o site → 2) ativar o Pages → 3) configurar o admin → 4) só então mexer no domínio no GoDaddy. Fazer nessa ordem evita ficar com o domínio "no ar" apontando pra um site que ainda não existe.

---

## Passo 1 — Baixar as imagens dos projetos

Antes de subir qualquer coisa, dentro da pasta `media/` que você recebeu, rode:
```
bash download-assets.sh
```
Isso baixa as ~40 imagens dos projetos direto do Webflow e organiza em subpastas. Sem esse passo, os cases aparecem com a arte gerada da identidade no lugar da foto real — bonito, mas não é a imagem certa.

## Passo 2 — Criar o repositório e subir os arquivos

1. Crie um repositório no GitHub (ex.: `greencave-site`). Pode ser público ou privado (Pages em repo privado exige plano pago; público funciona no plano gratuito).
2. Envie para a **raiz** do repositório: `index.html`, `admin.html`, `content.json`, **`config.json`** e **`migration.js`** (novos arquivos da preparação de arquitetura — sem eles o admin usa valores padrão embutidos, mas é melhor tê-los), o `CNAME` (se usar domínio próprio), e a pasta `media/` inteira (já com as imagens baixadas no passo 1).
3. Vá em **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, Branch = `main` / `/ (root)`. Salve.
4. Em 1–2 minutos o site estará em `https://SEU-USUARIO.github.io/greencave-site/`. Confira que abre certinho **antes** de mexer no domínio.

## Passo 3 — Criar o token de publicação (uma vez)

1. GitHub → **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**.
2. Repository access: **Only select repositories** → selecione apenas o repo do site.
3. Permissions → Repository permissions → **Contents: Read and write**. Nada mais.
4. Defina uma expiração (ex.: 90 dias) e gere. **Guarde o token num gerenciador de senhas** — o GitHub só mostra uma vez.

Por que assim: o token restrito a um repo com uma permissão só é o menor privilégio possível. Mesmo que vaze, o estrago máximo é editar este site — e você revoga em um clique.

## Passo 4 — Configurar o admin (uma vez)

**Já veio pronto**: o `admin.html` entregue está pré-configurado com o seu repositório real (`dinopaiva1981/Greencave-site`, branch `main`). A senha de entrada atual é `greencave2026` — pra trocar, abra o arquivo num editor de texto e mude a linha `const PASS = "greencave2026";` no topo do script.

Suba o `admin.html` no repo e teste o fluxo completo uma vez (editar algo pequeno → Publicar).

---

## Passo 5 — Domínio próprio no GoDaddy

Seu domínio (`greencave.co`) está hospedado no GoDaddy hoje apontando pro Webflow. Vamos trocar esse apontamento pro GitHub Pages. São três lugares diferentes que precisam "se falar": o GitHub (repo), o GoDaddy (DNS) e de volta o GitHub (certificado).

### 5.1 — No GitHub: avise que o domínio é seu

No repositório → **Settings → Pages → Custom domain** → digite `greencave.co` → **Save**.

Isso faz o GitHub criar um arquivo `CNAME` no seu repositório automaticamente. Vai aparecer um aviso de "improperly configured" — é esperado, porque o DNS ainda não foi ajustado. Ignore por enquanto e siga pro GoDaddy.

### 5.2 — No GoDaddy: trocar os registros de DNS

1. Entre em [dcc.godaddy.com](https://dcc.godaddy.com) (ou **Meus Produtos → Domínios**) e clique em **DNS** ao lado de `greencave.co`.
2. Você vai ver uma lista de registros deixados pelo Webflow — provavelmente registros **A** e/ou **CNAME** apontando para os servidores deles. **Esses precisam ser removidos** (clique no ícone de lixeira/editar em cada um), senão eles competem com os novos.
3. Adicione estes registros novos:

   **Quatro registros tipo A**, todos com Nome/Host `@` (representa o domínio raiz, sem `www`):
   | Tipo | Nome | Valor |
   |---|---|---|
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |

   **Um registro CNAME** para a versão com `www`:
   | Tipo | Nome | Valor |
   |---|---|---|
   | CNAME | www | SEU-USUARIO.github.io |

4. Salve. O GoDaddy costuma ter TTL padrão de 1 hora — pode deixar como está.

*Esses quatro IPs são os servidores oficiais do GitHub Pages (documentação atual do GitHub); não mudam com frequência, mas se algum dia o GitHub trocar, o aviso de "domain improperly configured" na aba Pages avisa.*

### 5.3 — Esperar a propagação

DNS não é instantâneo: pode levar de 10 minutos a algumas horas (raramente até 24h) pra internet inteira "aprender" o novo endereço. Pra checar se já propagou, rode no terminal:
```
dig greencave.co +short
```
Se aparecerem os quatro IPs do GitHub, propagou.

### 5.4 — Voltar no GitHub e ativar HTTPS

Volte em **Settings → Pages**. Quando o DNS propagar, o aviso de erro some e aparece a opção **Enforce HTTPS** — marque essa caixa. O GitHub emite o certificado SSL sozinho (pode levar alguns minutos a mais na primeira vez).

Pronto: `https://greencave.co` passa a servir o site do GitHub Pages, com cadeado e tudo.

### Um detalhe sobre o Webflow

Só desative/cancele o plano do Webflow **depois** de confirmar que `greencave.co` já está abrindo o site novo com HTTPS funcionando. Assim você nunca fica com o domínio "no vácuo" entre as duas hospedagens.

---

## CMS v2.0 — o que mudou na arquitetura

A partir desta versão, o conteúdo do site não fica mais embutido dentro do `index.html`. Ele mora em **`content.json`**, um arquivo separado que o site busca sozinho ao carregar. Na prática, isso significa:

- **Publicar ficou mais rápido e mais seguro**: cada vez que você publica, o painel grava só o `content.json` (o `index.html` fica parado, só muda quando há atualização de código/design).
- **Checagem de conflito automática**: se alguém (ou você em outra aba) publicar enquanto o painel está aberto, o botão Publicar percebe e avisa antes de sobrescrever — nunca publica por cima de uma mudança que ele não viu.
- **Um arquivo `.cms-state.json`** é criado/atualizado sozinho a cada publicação, registrando quando e qual foi o commit — é o que alimenta o card "Status do Git" no Dashboard.
- **Rascunho automático**: toda edição fica salva no navegador a cada poucos segundos. Se a aba fechar sem publicar, ao reabrir o painel ele oferece recuperar o rascunho.
- **Mídia organizada por categoria** (`media/team/`, `media/clients/`, `media/cases/`, `media/logos/`, `media/icons/`, `media/backgrounds/`, `media/downloads/`), com arrastar-e-soltar e compressão automática para WebP nas imagens grandes.

Compatibilidade: se por algum motivo `content.json` não existir ainda no repositório, o site funciona igual, usando um retrato do conteúdo guardado dentro do próprio `index.html` como reserva.

## Passo 6 — O dia a dia de edição

1. Acesse `https://greencave.co/admin.html` (ou o link "Área do time" no rodapé do site).
2. Digite a senha. O admin **carrega o conteúdo do site publicado automaticamente**.
3. Edite o que quiser: textos (a auto-tradução PT → 4 idiomas dispara ao sair do campo), cases e blocos, imagens por URL, conquistas, fontes.
4. Clique **🚀 Publicar**, cole o token, confirme. O commit aparece no repo e o Pages republica em ~1 minuto.
5. Se o navegador mostrar a versão antiga, force o refresh (Ctrl+Shift+R) — é só cache.

Alternativa sem token: **⬇ Baixar (manual)** gera o `index.html` novo para você commitar por conta própria.

## Imagens e vídeos — depois do deploy

- **Novas imagens**: use a aba **Mídia** do admin — ela sobe direto pro repositório via API do GitHub (mesmo token da publicação).
- **Vídeos**: sempre YouTube ou Vimeo (cole o link normal — o site converte em player embutido). Nunca hospede vídeo no repositório.

## Segurança — o combinado honesto

- A **senha do admin** é uma cortina de conveniência: o admin é um arquivo público e a senha está no código dele. Quem protege a publicação de verdade é o **token do GitHub**, que só você tem. Por padrão ele vive só na memória da aba, mas você pode marcar **"Lembrar token neste navegador"** — aí ele fica salvo apenas no armazenamento local do seu navegador (nunca no repositório nem no site público). Não use essa opção em computador compartilhado; para esquecer, é só desmarcar a caixa.
- Se quiser esconder o painel de curiosos, renomeie o arquivo para algo não óbvio (ex.: `gc-estudio-painel.html`) e ajuste o link do rodapé.
- Nunca commite o token em lugar nenhum. Se suspeitar de vazamento: GitHub → token → Revoke — o estrago máximo é editar este site, nada além disso.
- Ative 2FA na sua conta do GitHub — essa é a proteção que realmente importa, porque é ela quem guarda a chave da publicação.

## Limites do Pages que valem saber

Repo recomendado até 1 GB, sites até 1 GB publicados, ~100 GB de banda/mês e 10 builds/hora — folgadíssimo para o site atual. Se o portfólio crescer muito em vídeo, mantenha os vídeos no Vimeo/YouTube e o Pages nunca vai reclamar.
