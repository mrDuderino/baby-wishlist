# Deployment Guide

Baby Wishlist is designed for **Vercel + Supabase**. Follow this guide to go from local development to production.

## Prerequisites

- GitHub repository with this project
- [Vercel](https://vercel.com) account
- [Supabase](https://supabase.com) project (free tier is enough to start)
- Node.js 22 and pnpm 9+ for local verification

## 1. Create a production Supabase project

1. Create a new project in the Supabase dashboard.
2. Link the CLI and push migrations:

```bash
pnpm dlx supabase login
pnpm dlx supabase link --project-ref <your-project-ref>
pnpm supabase:push
```

3. In **Authentication → Providers → Email**:
   - Enable the Email provider
   - Disable public sign-ups (invite-only admins)
4. In **Authentication → URL Configuration**:
   - Site URL: `https://your-domain.vercel.app` (or custom domain)
   - Redirect URLs: `https://your-domain.vercel.app/**`
5. Create the first admin:
   - **Authentication → Users → Add user**
   - A row in `profiles` is created automatically via trigger

## 2. Environment variables

Set these in **Vercel → Project → Settings → Environment Variables** (Production + Preview).

| Variable                        | Required   | Notes                                        |
| ------------------------------- | ---------- | -------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | Yes        | Public site URL, e.g. `https://….vercel.app` |
| `NEXT_PUBLIC_SUPABASE_URL`      | Yes        | Project URL from Supabase Settings → API     |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes        | `anon` / `public` key                        |
| `SUPABASE_SERVICE_ROLE_KEY`     | Yes        | Server only — never expose to the client     |
| `CRON_SECRET`                   | Yes (prod) | Random secret for `/api/cron/*`              |
| `TELEGRAM_BOT_TOKEN`            | Optional   | Bot token for reservation notifications      |
| `TELEGRAM_CHAT_ID`              | Optional   | Chat / channel id for alerts                 |
| `NEXT_PUBLIC_TELEGRAM_URL`      | Optional   | Public contact link                          |
| `NEXT_PUBLIC_WHATSAPP_URL`      | Optional   | Public contact link                          |
| `SUPABASE_JWT_SECRET`           | Optional   | Only if you need custom JWT verification     |

Generate a cron secret:

```bash
openssl rand -hex 32
```

## 3. Deploy to Vercel

### Option A — Dashboard

1. Import the GitHub repository in Vercel.
2. Framework Preset: **Next.js**
3. Install Command: `pnpm install`
4. Build Command: `pnpm build`
5. Add all environment variables.
6. Deploy.

### Option B — CLI

```bash
pnpm dlx vercel
pnpm dlx vercel --prod
```

`vercel.json` already configures the hourly cron:

```json
{
  "crons": [
    {
      "path": "/api/cron/expire-reservations",
      "schedule": "0 * * * *"
    }
  ]
}
```

Vercel sends `Authorization: Bearer $CRON_SECRET` to cron routes when `CRON_SECRET` is set.

## 4. Post-deploy checklist

- [ ] Open the production URL — landing + wishlist load
- [ ] Reserve a test gift — status updates via realtime
- [ ] Telegram notification arrives (if configured)
- [ ] `/login` works with the admin user
- [ ] `/admin` dashboard shows products and reservations
- [ ] Upload an image in Media Library
- [ ] Confirm cron is listed under Vercel → Cron Jobs
- [ ] `robots.txt` disallows `/admin` and `/login`
- [ ] Custom domain + HTTPS (optional)

## 5. Local production verification

Before deploying, run:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm start
```

Then open [http://localhost:3000](http://localhost:3000).

## 6. Preview deployments

Every pull request gets a Vercel Preview URL automatically when the repo is connected. Use the same env vars for Preview (or a separate Supabase staging project).

## 7. Rollback

In Vercel → Deployments → open a previous successful deployment → **Promote to Production**.

## Notes

- Storage bucket `wishlist` is created by migrations; public read + admin write.
- Pending reservations expire after 72 hours via cron + `expire_pending_reservations()`.
- Do not commit `.env.local` or service role keys.
