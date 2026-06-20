---
name: testing-techible
description: Test the Techible platform end-to-end. Use when verifying UI changes, admin panel functionality, auth flows, resume builder, subscriptions, or payment integration.
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
- **HMR caching issues**: After many hot-reloads, API routes may start returning 500 errors with empty bodies. Restart the dev server (`pkill -f "next dev" && npm run dev`) to resolve. This is a dev-mode issue only.
- After server restart, you will need to log in again (session cookies survive but server-side session validation resets)

## Test Credentials

- **Admin**: admin@techible.io / admin123 (role: admin)
- **User**: user@techible.io / user123 (role: user)

## Key Routes to Test

| Route | Type | What to verify |
|-------|------|----------------|
| `/` | Public | Homepage hero, stats, course carousel, CTA cards |
| `/internships` | Public | Listing with filter pills, cards, pagination |
| `/courses` | Public | Course grid with thumbnails |
| `/courses/[slug]` | Public | Detail with gradient hero, syllabus, skills, EnrollButton |
| `/login` | Public | Auth form, redirect after login |
| `/resume-builder` | Protected | 6 template cards, "Your Resumes" list |
| `/resume-builder/edit` | Protected | Multi-section form, save & preview |
| `/resume-builder/preview` | Protected | Rendered resume, download paywall |
| `/subscription` | Public | 3 plan cards, payment methods section |
| `/admin` | Protected | Dashboard with stat cards (requires admin login) |
| `/admin/internships` | Protected | CRUD table with edit/delete actions |
| `/admin/subscriptions` | Protected | Plan table, Add/Edit/Delete plans |
| `/admin/payments` | Protected | Settings tab (Razorpay config), Transactions tab |

## Resume Builder Testing

1. **Template Selection** (`/resume-builder`): 6 cards - Professional, Minimal, Creative, Executive, Tech Modern, Academic
2. **Form** (`/resume-builder/edit?template=professional`): Fill all sections (Personal, Experience, Education, Skills, Projects)
3. **Save & Preview**: Click top "Save & Preview" button (not the bottom one). After save, redirects to `/resume-builder/preview?id=<id>`
4. **Preview Page**: Shows formatted resume with name, title in blue, contact info, experience, education, skill pills
5. **Download Paywall**: Click "Download PDF" shows modal with crown icon, "Subscription Required" text, "View Plans" link
6. **Free Plan Banner**: Yellow info banner at top: "You're on the free plan. Upgrade to download..."

## Subscription & Payment Testing

1. **Plans Page** (`/subscription`): Shows Free (₹0), Pro (₹299/30 days, MOST POPULAR badge), Premium (₹999/365 days)
2. **Payment Flow**: Clicking "Subscribe Now" without Razorpay keys configured shows alert "Payment gateway not configured"
3. **Course Enrollment**: Paid courses show "Enroll Now - ₹{price}" button; click triggers same gateway error
4. **Free Courses**: Show "Enroll Now (Free)" button and enroll directly without payment
5. **With Razorpay keys configured**: Would open Razorpay Checkout modal (UPI, cards, wallets)

## Admin Payment Settings

- **Settings Tab**: Razorpay Key ID, Key Secret, Webhook Secret, Test Mode toggle (SANDBOX badge), Currency (INR/USD), Tax % (GST)
- **Transactions Tab**: Table of payments (User, Type, Amount, Status, Payment ID, Date)
- **Default state**: Test Mode ON, empty keys, INR currency, 18% tax

## Admin Subscription CRUD

- Table shows all plans with name, price, duration, downloads, status, actions
- "Add Plan" opens form: Plan Name, Price, Duration, Resume Downloads, Features (textarea), Mark as popular checkbox
- Edit/Delete buttons per row
- **Initial load quirk**: First navigation may show "No plans yet" — refresh the page to see data (client-side hydration timing issue in dev mode)

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
- Resume/subscription pages check auth via `getSession()` which reads the same cookie

## Common Issues

- **Admin redirect loop**: If admin panel keeps redirecting to `/login`, check that `admin/layout.tsx` reads cookie `"session_token"` (not `"session"`) and splits on `:` to extract userId.
- **Turbopack crash on Windows**: Use `--webpack` flag for dev server.
- **API 500 with empty body**: HMR cache corruption. Restart dev server.
- **Admin page shows empty data on first load**: Client-side fetch timing issue. Refresh the page.
- **Type mismatches**: Prisma schema field names differ from what UI might expect (e.g., `thumbnail` not `imageUrl`, `stipend` not `isPaid`, `isPublished` not `published`).
- **Payment "not configured"**: Expected when no Razorpay keys are in PaymentSettings table. Admin must configure via Admin > Payments.

## Devin Secrets Needed

None - all credentials are local test accounts seeded in the database.
Razorpay test keys (rzp_test_*) needed only if testing actual payment checkout modal.
