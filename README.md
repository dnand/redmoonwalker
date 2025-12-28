# Redmoon Walkers

A modern online store and learning platform for the shoemaking/cobbling community. Sell patterns, materials, and step-by-step guides with a premium UI and delightful micro-animations.

## Tech Stack

- **Next.js 14+** (App Router) + TypeScript
- **Tailwind CSS** + shadcn/ui
- **Framer Motion** for animations
- **Supabase** (Auth + Postgres + Storage) - Optional for local dev
- **Stripe** for payments - Optional for local dev
- **Prisma** as ORM

## Local Development Setup

### Quick Start (No External Services Required)

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and set at minimum:
```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

3. **Set up Prisma with SQLite (easiest for local dev):**

Update `prisma/schema.prisma` to use SQLite:
```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

Then run:
```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

4. **Start the development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Features Available Without External Services

- ✅ Browse products and shop pages
- ✅ View product details
- ✅ Browse catalog with filters
- ✅ View admin pages (basic)
- ✅ All UI components and animations

### Features Requiring Configuration

- 🔐 Authentication (requires Supabase)
- 💳 Checkout (requires Stripe)
- 📚 Library access (requires auth)
- 🎓 Course player (requires auth)

## Database Options

### Option 1: SQLite (Easiest for Local Dev)

1. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

2. Run:
```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

### Option 2: PostgreSQL (Production-like)

1. Install PostgreSQL locally or use Docker:
```bash
docker run --name redmoonwalkers-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=redmoonwalkers -p 5432:5432 -d postgres
```

2. Set `DATABASE_URL` in `.env.local`:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/redmoonwalkers?schema=public"
```

3. Run:
```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

## Adding External Services (Optional)

### Supabase Setup (for Auth)

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key
3. Add to `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL="your-project-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

4. Create storage buckets:
   - `product-assets` (public)
   - `pattern-files` (private)

### Stripe Setup (for Payments)

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your test API keys
3. Add to `.env.local`:
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."  # For local: use Stripe CLI
```

4. For local webhook testing:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## Development Commands

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run db:push` - Push Prisma schema changes
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio (database GUI)

## Project Structure

```
/app
  /api          - API routes
  /admin        - Admin pages
  /auth         - Authentication (requires Supabase)
  /cart         - Shopping cart
  /checkout     - Checkout pages (requires Stripe)
  /learn        - Course player (requires auth)
  /library      - User library (requires auth)
  /product      - Product pages
  /shop         - Shop catalog
/components     - React components
/lib            - Utilities and helpers
/prisma         - Prisma schema and migrations
```

## Key Components

- **AccessGate** - Handles product access logic (sign in / buy / access)
- **FacetFilters** - Reusable filtering system
- **StepBlockRenderer** - Renders course content blocks
- **CoursePlayerShell** - Course navigation and progress UI

## Notes

- The app gracefully handles missing Supabase/Stripe configuration
- All UI components work without external services
- Authentication and payment features require proper configuration
- For production, you'll need to set up Supabase and Stripe properly

## License

MIT
