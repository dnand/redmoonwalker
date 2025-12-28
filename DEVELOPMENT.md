# Local Development Guide

This guide helps you get Redmoon Walkers running on localhost without needing external services.

## Quick Start

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment:**
```bash
cp .env.local.example .env.local
```

Edit `.env.local` - minimum required:
```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

3. **Configure Prisma for SQLite:**

Edit `prisma/schema.prisma` and change:
```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

4. **Initialize database:**
```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

5. **Start dev server:**
```bash
npm run dev
```

Visit http://localhost:3000

## What Works Without External Services

✅ **Fully Functional:**
- Browse all products
- View product details
- Search and filter products
- Shopping cart (stored in cookies)
- Admin pages (basic CRUD)
- All UI components and animations

⚠️ **Requires Configuration:**
- User authentication (needs Supabase)
- Checkout/payments (needs Stripe)
- Library access (needs auth)
- Course player (needs auth)

## Database Setup

### SQLite (Recommended for Local Dev)

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

The database file `dev.db` will be created in your project root.

### PostgreSQL (Alternative)

If you prefer PostgreSQL:

1. Install PostgreSQL or use Docker:
```bash
docker run --name redmoonwalkers-db \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=redmoonwalkers \
  -p 5432:5432 -d postgres
```

2. Update `.env.local`:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/redmoonwalkers?schema=public"
```

3. Keep `prisma/schema.prisma` as PostgreSQL and run:
```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

## Viewing Your Data

Use Prisma Studio to browse your database:
```bash
npm run db:studio
```

This opens a web UI at http://localhost:5555 where you can view and edit data.

## Testing the App

1. **Browse Products:** Visit http://localhost:3000/shop
2. **View Product:** Click any product to see details
3. **Add to Cart:** Add items (works without auth in local dev)
4. **View Cart:** Visit http://localhost:3000/cart
5. **Admin:** Visit http://localhost:3000/admin (will redirect to auth if not logged in)

## Troubleshooting

### Database Connection Errors

If you see Prisma connection errors:
- Make sure `DATABASE_URL` is set in `.env.local`
- For SQLite: ensure the file path is correct
- For PostgreSQL: ensure the database server is running

### Auth Errors

If you see Supabase errors:
- This is normal! Auth features require Supabase configuration
- The app will work fine without it for browsing products
- To enable auth, see the main README for Supabase setup

### Build Errors

If you get build errors:
```bash
# Clear Next.js cache
rm -rf .next

# Regenerate Prisma client
npx prisma generate

# Restart dev server
npm run dev
```

## Next Steps

Once you have the app running locally:
1. Explore the UI and components
2. Test product browsing and filtering
3. Try the admin pages
4. When ready, configure Supabase for auth
5. When ready, configure Stripe for payments

## Notes

- The app gracefully handles missing Supabase/Stripe config
- Cart functionality works via browser cookies (no auth needed)
- All UI components are fully functional
- Database is required for product data
- Auth and payments are optional for local development

