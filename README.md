# Baby Wishlist

Premium web application for a baby wishlist — a warm, personal landing page where friends and family can browse and reserve gifts without registration.

## Tech Stack

- **Framework:** Next.js 15 (App Router), TypeScript, React Server Components
- **Styling:** Tailwind CSS v4, shadcn/ui, Framer Motion, Lucide Icons
- **Backend:** Supabase (PostgreSQL, Auth, Realtime, Storage)
- **Deployment:** Vercel with Analytics and Speed Insights
- **Package manager:** pnpm

## Requirements

- Node.js 22 LTS (see `.nvmrc`)
- pnpm 9+ (project pins `packageManager` in `package.json`)
- Docker (for local Supabase)

## Getting Started

```bash
pnpm install
cp .env.example .env.local
pnpm supabase:start
pnpm supabase:status   # copy anon/service keys into .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command               | Description                                |
| --------------------- | ------------------------------------------ |
| `pnpm dev`            | Start development server                   |
| `pnpm build`          | Production build                           |
| `pnpm start`          | Start production server                    |
| `pnpm lint`           | Run ESLint                                 |
| `pnpm typecheck`      | Run TypeScript                             |
| `pnpm format`         | Format with Prettier                       |
| `pnpm test`           | Run Vitest unit/API tests                  |
| `pnpm test:watch`     | Vitest watch mode                          |
| `pnpm verify`         | Lint + typecheck + test + production build |
| `pnpm supabase:start` | Start local Supabase stack                 |
| `pnpm supabase:stop`  | Stop local Supabase stack                  |
| `pnpm supabase:reset` | Reset DB and apply migrations + seed       |
| `pnpm supabase:push`  | Push migrations to linked remote project   |
| `pnpm supabase:types` | Generate TypeScript types from local DB    |

## Project Structure

```
app/                 # Next.js App Router routes
components/
  ui/                # shadcn/ui primitives
  shared/            # Reusable shared components
  widgets/           # Composite UI blocks
  features/          # Feature-specific components
  entities/          # Domain entity components
  providers/         # React context providers
lib/
  data/              # Server-side data access
  supabase/          # Supabase clients, realtime, constants
hooks/               # Custom React hooks
types/               # Shared TypeScript types
supabase/
  migrations/        # SQL migrations
  config.toml        # Supabase CLI config
public/              # Static assets
```

## Supabase Setup

### Local development

1. Install Docker and start Supabase:

```bash
pnpm supabase:start
pnpm supabase:reset
pnpm supabase:status
```

2. Copy keys from `supabase status` into `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

3. Studio is available at [http://127.0.0.1:54323](http://127.0.0.1:54323).

### Database schema

Migrations create:

- `categories`, `products`, `reservations`, `settings`, `audit_logs`, `profiles`
- RLS policies for public read + admin CRUD
- Storage bucket `wishlist` (public read, admin write)
- Realtime on `products`, `reservations`, `settings`
- RPC functions: `create_reservation`, `expire_pending_reservations`

### Admin users

Public signup is disabled. Create admin users manually in Supabase Auth.  
On signup, a row is automatically created in `profiles`, which grants admin access via RLS.

## Environment Variables

| Variable                        | Scope  | Required                 |
| ------------------------------- | ------ | ------------------------ |
| `NEXT_PUBLIC_SITE_URL`          | Public | Yes                      |
| `NEXT_PUBLIC_SUPABASE_URL`      | Public | Yes (with Supabase)      |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | Yes (with Supabase)      |
| `SUPABASE_SERVICE_ROLE_KEY`     | Server | Yes (admin/server jobs)  |
| `SUPABASE_JWT_SECRET`           | Server | Optional                 |
| `TELEGRAM_BOT_TOKEN`            | Server | Optional (notifications) |
| `TELEGRAM_CHAT_ID`              | Server | Optional (notifications) |
| `CRON_SECRET`                   | Server | Production cron auth     |
| `NEXT_PUBLIC_TELEGRAM_URL`      | Public | Optional                 |
| `NEXT_PUBLIC_WHATSAPP_URL`      | Public | Optional                 |

Environment variables are validated with Zod in `lib/env.ts`.

## Design System (Stage 3)

Shared UI lives in `components/ui/` (primitives) and `components/shared/` (composed blocks).

| Category     | Location                                          |
| ------------ | ------------------------------------------------- |
| Typography   | `components/shared/typography.tsx`                |
| Layout       | `Container`, `Section`                            |
| States       | `EmptyState`, `ErrorState`, `LoadingButton`       |
| Product UI   | `ProductStatusBadge`, skeletons                   |
| Validation   | `lib/validation/`                                 |
| Strings (RU) | `lib/strings/ru.ts`                               |
| Helpers      | `lib/helpers/format.ts`, `lib/helpers/product.ts` |

Design tokens: cards 24px, buttons 18px, inputs 16px, soft shadows, warm palette from PRD.

## Reservation API (Stage 6)

- `POST /api/reservations` — create reservation via Supabase RPC `create_reservation`
- Rate limit: 5 reservations per IP per hour (HTTP 429)
- Telegram notification sent asynchronously after success (optional env vars)
- Audit log entry written via service role (non-blocking)
- `GET /api/cron/expire-reservations` — daily cron (Vercel Hobby) expires pending reservations after 72h

## Admin Panel (Stage 7)

Routes under `/admin` (protected by middleware):

| Route                 | Description                                   |
| --------------------- | --------------------------------------------- |
| `/admin`              | Dashboard with stats and latest reservations  |
| `/admin/products`     | Product list, create, edit, duplicate, delete |
| `/admin/categories`   | Category CRUD                                 |
| `/admin/reservations` | Reservation list and detail actions           |
| `/admin/media`        | Upload/delete images in Supabase Storage      |
| `/admin/settings`     | Edit landing content and social links         |
| `/admin/audit-log`    | View admin action history                     |
| `/admin/profile`      | Update admin name, logout                     |

Login at `/login` using Supabase Auth (email/password). Only users with a row in `profiles` get access.

### Create a local admin user

1. Open Supabase Studio → Authentication → Users → Add user
2. After signup, a profile row is created automatically via trigger
3. Sign in at [http://localhost:3000/login](http://localhost:3000/login)

## Development Stages

1. ✅ **Project Bootstrap**
2. ✅ **Supabase**
3. ✅ **Shared Infrastructure**
4. ✅ **Landing Page**
5. ✅ **Wishlist**
6. ✅ **Reservation System**
7. ✅ **Admin Panel**
8. ✅ **Polish**
9. ✅ **Testing**
10. ✅ **Deployment** — current stage

## Deployment (Stage 10)

Full guide: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

### Quick path

1. Create a Supabase project and run `pnpm supabase:push`
2. Import this repo into Vercel (Framework: Next.js, Install: `pnpm install`)
3. Set environment variables from `.env.example` / the table above
4. Deploy — preview URLs work automatically for PRs
5. Create an admin user in Supabase Auth and open `/login`

### CI

GitHub Actions (`.github/workflows/ci.yml`) runs on every push/PR:

```bash
pnpm lint && pnpm typecheck && pnpm test && pnpm build
```

Local equivalent:

```bash
pnpm verify
```

## Testing (Stage 9)

```bash
pnpm test        # run once
pnpm test:watch  # watch mode
```

Coverage includes:

- Helpers (`format`, `product`, `request`)
- Wishlist grouping/stats
- Reservation + login Zod validation
- Reservation RPC error mapping
- `POST /api/reservations` route responses (mocked service)
- `EmptyState` component (React Testing Library)

## Polish (Stage 8)

- Skip links, focus states, `prefers-reduced-motion`
- Route `loading.tsx` / `error.tsx` / `not-found.tsx` for public and admin
- Softer empty states in admin lists
- Security headers (`X-Frame-Options`, `nosniff`, Referrer-Policy)
- Richer metadata + JSON-LD graph
- Graceful public data fallbacks (no hard 500 when Supabase is briefly unavailable)

## Design Tokens

- Background: `#FAF8F5`
- Primary accent: `#B79E8B`
- Secondary accent: `#A9B7A2`
- Fonts: Inter (body), Cormorant Garamond (headings)

## License

Private project.
