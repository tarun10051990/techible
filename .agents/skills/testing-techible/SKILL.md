---
name: testing-techible
description: Test the Techible platform end-to-end. Use when verifying UI changes, admin panel functionality, or auth flows.
---

# Testing Techible Platform

## Quick Start

```bash
cd /path/to/techible
npm install
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts
npm run dev
```

App runs at http://localhost:3000

## Dev Server Notes

- Uses `next dev --webpack` (NOT Turbopack) to avoid file locking issues on Windows
- SQLite database at `./dev.db`
- Requires `.env` file with `DATABASE_URL="file:./dev.db"`

## Test Credentials

- **Admin**: admin@techible.io / admin123 (role: admin)
- **User**: user@techible.io / user123 (role: user)

## Key Routes to Test

| Route | Type | What to verify |
|-------|------|----------------|
| `/` | Public | Homepage hero, stats, course carousel, CTA cards |
| `/internships` | Public | Listing with filter pills, cards, pagination |
| `/courses` | Public | Course grid with thumbnails |
| `/courses/[slug]` | Public | Detail with gradient hero, syllabus, skills |
| `/login` | Public | Auth form, redirect after login |
| `/admin` | Protected | Dashboard with stat cards (requires admin login) |
| `/admin/internships` | Protected | CRUD table with edit/delete actions |

## Design System Assertions

When testing UI redesign changes, verify:

1. **Font**: `document.body` computed `font-family` should contain "Nunito Sans"
2. **Icons**: Check for `<i class="fa-*">` elements (Font Awesome 6.5.1 CDN)
3. **No Lucide**: Zero `<svg>` elements with `lucide` class patterns
4. **Primary color**: Buttons should use `rgb(26, 115, 232)` / `#1a73e8`
5. **Yellow accent**: "For Business" button border `rgb(245, 158, 11)` / `#f59e0b`

## Auth Flow

- Login POST to `/api/auth` with `{ action: "login", email, password }`
- Sets `session_token` cookie with format `userId:randomUUID`
- Admin layout at `/admin` checks `session_token` cookie, parses userId, verifies role
- Navbar detects auth state via GET `/api/auth`

## Common Issues

- **Admin redirect loop**: If admin panel keeps redirecting to `/login`, check that `admin/layout.tsx` reads cookie `"session_token"` (not `"session"`) and splits on `:` to extract userId.
- **Turbopack crash on Windows**: Use `--webpack` flag for dev server.
- **Type mismatches**: Prisma schema field names differ from what UI might expect (e.g., `thumbnail` not `imageUrl`, `stipend` not `isPaid`, `isPublished` not `published`).

## Devin Secrets Needed

None - all credentials are local test accounts seeded in the database.
