# PraiaDigital Site

Site estático em Astro para PraiaDigital, com foco em SEO técnico, performance e conversão para inbound marketing de imóveis no litoral norte de São Paulo.

## Stack

- Astro 5
- Tailwind CSS 4
- TypeScript
- Vercel/Netlify ready

## Instalação

```bash
npm install
cp .env.example .env
npm run dev
```

## Variáveis de ambiente

| Variável | Exemplo | Descrição |
|---------|---------|-----------|
| `SITE_URL` | `https://praia.digital` | URL base do site |
| `WHATSAPP_NUMBER` | `5511954346288` | Número para CTA/formulário |

## Estrutura

```
src/
  components/   # Header, Footer, BaseHead, LeadForm
  layouts/      # BaseLayout
  pages/        # Rotas do site
  styles/       # global.css
  data/         # cidades.ts
public/
```

## Deploy

- Vercel: `vercel --prod`
- Netlify: `netlify deploy --prod`
- Branch: `main`

## Validação pós-deploy

```bash
curl -I https://praia.digital/
curl -I https://praia.digital/?nocache=1
curl -I https://praia.digital/hub/ia-corretores-litoral.html
```

Valide HTTP 200, `cache-control` e OG tags com `curl` + ferramentas de SEO.

## Checklist

- [ ] `npm run build` sem erros
- [ ] HTTP 200 na home e nas páginas principais
- [ ] Meta description, canonical e OG por página
- [ ] Formulário de lead apontando para WhatsApp
- [ ] LGPD em `/privacidade`
