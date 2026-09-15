# PraiaDigital Site

Site estático em Astro para [PraiaDigital](https://praia.digital), com foco em SEO técnico, performance e conversão para inbound marketing de imóveis no litoral norte de São Paulo.

## Stack

- Astro 5
- Tailwind CSS 4
- TypeScript
- GitHub Pages (deploy via Actions); Vercel/Netlify ready

## Instalação

```bash
npm install
cp .env.example .env
npm run dev
```

## Variáveis de ambiente

| Variável | Exemplo | Descrição |
|----------|---------|-----------|
| `SITE_URL` | `https://praia.digital` | URL base do site |
| `WHATSAPP_NUMBER` | `5511954346288` | Número para CTA/formulário |

## Estrutura

```
src/
  components/    # Header, Footer, BaseHead, LeadForm
  layouts/       # BaseLayout (skip link, head slot, header/footer)
  pages/         # Rotas do site
    blog/        # Index + posts (guias, SEO, IA, cases)
    servicos/    # Index + gestão, assessoria, zeladoria
    hub/         # Hub de IA para corretores
    404.astro    # Página de erro amigável
  styles/        # global.css
  data/          # cidades.ts
public/
  sitemap.xml    # Sitemap estático de todas as páginas
  robots.txt     # Allow all + referência ao sitemap
  favicon.svg / favicon.ico / apple-touch-icon.png
  img/og-default.png
```

## Estratégia de interlinks

- Header/Footer: navegação global para serviços, blog, hub, FAQ, contato
- Home: seções de serviços, cidades e últimos conteúdos com links contextuais
- Páginas de serviço: seção "Serviços relacionados" cruzando as 3 páginas + cases
- Blog: index → posts e cases; posts → serviços correspondentes, hub e outros posts
- Hub: leituras relacionadas → posts e cases
- Sobre/Contato/FAQ: links contextuais nos textos + grade de serviços

## Deploy

- GitHub Pages: push em `main` dispara `.github/workflows/deploy.yml`
- Vercel: `vercel --prod`
- Netlify: `netlify deploy --prod`

## Validação pós-deploy

```bash
curl -I https://praia.digital/
curl -I https://praia.digital/hub/ia-corretores-litoral.html
curl -I https://praia.digital/sitemap.xml
```

Valide HTTP 200, `cache-control` e OG tags com `curl` + ferramentas de SEO.

## Checklist

- [ ] `npm run build` sem erros
- [ ] HTTP 200 na home e nas páginas principais
- [ ] Meta description, canonical e OG por página
- [ ] Formulário de lead apontando para WhatsApp
- [ ] LGPD em `/privacidade`
- [ ] Sitemap e robots acessíveis
