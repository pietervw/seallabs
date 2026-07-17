# Seal Labs

Agency homepage for **[seallabs.io](https://seallabs.io)** — portfolio, services, and contact.

Canonical origin is the **apex** domain (`https://seallabs.io`, no `www`). `www` requests redirect permanently to apex.

## Stack

- Next.js 16 (App Router) with SSR marketing pages
- Tailwind CSS 4
- Coolify / Docker (`output: "standalone"`)

## SEO & LLM conventions

| Asset | Path |
| --- | --- |
| Sitemap | `/sitemap.xml` (`src/app/sitemap.ts`) |
| Robots | `/robots.txt` (`src/app/robots.ts`) |
| LLM map | `/llms.txt` (`src/app/llms.txt/route.ts`) — [llmstxt.org](https://llmstxt.org/) |
| Canonicals | Per-page via `createMarketingMetadata` |
| Schema.org | Organization, WebSite, WebPage, ProfessionalService, ItemList, SoftwareApplication |

Marketing page content is server-rendered so crawlers do not need JavaScript to read primary copy.

## Local development

```bash
cp .env.example .env.local
npm install
npm run dev
```

## Scripts

- `npm run dev` — local server
- `npm run build` / `npm start` — production
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript

## Deploy (Coolify / Docker)

Root `Dockerfile` + `output: "standalone"` in `next.config.ts`. Deploy a branch that includes the Dockerfile (not the empty Create-Next-App `master` commit).

### Coolify resource settings

| Setting | Value |
| --- | --- |
| Build Pack | Dockerfile |
| Dockerfile location | `/Dockerfile` |
| Ports Exposes | `3000` |
| Health Check Path | `/api/health` |
| Health Check Port | `3000` |

### Environment

1. **Build-time** `NEXT_PUBLIC_*` vars (especially `NEXT_PUBLIC_SITE_URL=https://seallabs.io`) — inlined at `next build`.
2. **Runtime** secrets: `SENDGRID_API_KEY` (or SMTP_*), optional `TURNSTILE_SECRET_KEY`, optional `PUSHOVER_API_TOKEN` + `PUSHOVER_USER_KEY`.
3. Point DNS apex `seallabs.io` at the deploy; `www` → apex redirect is in `next.config.ts`.

Local image check (requires Docker Engine, not the npm `docker` stub):

```bash
docker build -t seallabs --build-arg NEXT_PUBLIC_SITE_URL=https://seallabs.io .
docker run --rm -p 3000:3000 --env-file .env.local seallabs
curl -s http://127.0.0.1:3000/api/health
```

## Contact form

Prefers SendGrid (`SENDGRID_API_KEY`). Falls back to SMTP when configured. Optional Cloudflare Turnstile via `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY`.
