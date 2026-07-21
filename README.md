# Tobi Yusuf — Landing Site

Editorial single page site for marriage, relationships, and experiences.

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Resend](https://img.shields.io/badge/Resend-Email-000000?logo=resend&logoColor=white)](https://resend.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)

## Overview

Built with the Next.js App Router, with brand tokens defined in [`app/globals.css`](app/globals.css). Form intents are routed server side through ConvertKit via [`app/api/subscribe/route.ts`](app/api/subscribe/route.ts) (all subscribe intents except Love Reset), and through Resend for contact enquiries, speaking notifications, and the Love Reset transactional email.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| UI | React 19, TypeScript |
| Styling | Tailwind CSS, custom brand tokens |
| Animation | Framer Motion |
| Email | Resend (contact, speaking, Love Reset), ConvertKit (subscriber intents) |
| Forms | Tally webhooks |
| Testing | Playwright |
| Hosting | Vercel |

## Getting Started

```bash
npm install
cp .env.example .env.local
# Edit .env.local, at minimum set CONVERTKIT_API_KEY and form IDs (or DEFAULT_FORM_ID for testing)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm start
```

## Content and Data

Common edits live in these files, no component changes required:

| File | Purpose |
|---|---|
| [`lib/data/prices.ts`](lib/data/prices.ts) | Offer prices (`PRICES`), confirm with Tobi before launch |
| [`lib/data/reflections.ts`](lib/data/reflections.ts) | Reflection cards (`reflections[]`) |
| [`lib/data/site.ts`](lib/data/site.ts) | `INTENTIONAL_SPACE_REMAINING_PLACES`, public URL env wiring |

## Email Integrations

### ConvertKit

- The browser never receives `CONVERTKIT_API_KEY`.
- `POST /api/subscribe` accepts JSON: `{ "intent": "...", "email": "...", "firstName": "..." }`, plus an optional `fields` object for custom fields (used by the booking page).
- The `love-reset` intent is handled by Resend, not ConvertKit. The subscriber receives a branded email with `LOVE_RESET_AUDIO_URL` (see below). `CONVERTKIT_FORM_LOVE_RESET` is not required for that flow.
- For all other intents, map each to a form ID in `.env.local`, or set `CONVERTKIT_DEFAULT_FORM_ID` for a single test form.
- Optional: set `CONVERTKIT_TAG_ID_*` env vars to also call the [tag subscribe](https://developers.convertkit.com/#tag-a-subscriber) endpoint.

### Resend (contact, speaking, Love Reset)

- `POST /api/contact` sends the contact form to `tobi@tobiyusuf.com` via `CONTACT_NOTIFICATION_EMAIL`.
- The contact email subject matches the selected dropdown option (`General enquiry`, `Forever & A Day`, etc.).
- `POST /api/speaking` sends speaking enquiries to `tobi@tobiyusuf.com`.
- `POST /api/subscribe` with `intent: "love-reset"` sends a transactional email to the subscriber with the Love Reset link (`LOVE_RESET_AUDIO_URL` in `.env.local`, see [`.env.example`](.env.example)). Optional: `LOVE_RESET_EMAIL_SUBJECT`, comma separated `LOVE_RESET_BCC` for a copy to your inbox.
- Required env vars in `.env.local`: `MY_RESEND_API`, `RESEND_FROM`.

### Tally webhooks

- Choosing Us waitlist should POST to `https://www.tobiyusuf.com/api/tally-waitlist`
- Use the shared `TALLY_WEBHOOK_SIGNING_SECRET` for signed webhook verification.

### Intents to brief tags (configure in Kit)

| Intent | Tag |
|---|---|
| `love-reset` | Resend email to subscriber, not ConvertKit |
| `intentional-space` | Intentional Space |
| `ct-collab` | CT Collaboration |
| `forever-day` | Forever & A Day |
| `forever-table` | Forever Table |
| `circle` | Choosing Us Waitlist |
| `speaking` | Speaking |
| `general` | General Enquiry |
| `newsletter` | Newsletter |

## Pre-launch Checklist

- [ ] Intentional Space booking form: in ConvertKit, set Subscriber notification for that form to `bookings@tobiyusuf.com`
- [ ] Ensure `CONVERTKIT_FORM_INTENTIONAL_SPACE` matches the fields defined in `content/intentional-space-booking.md`
- [ ] Substack subscribe and article URLs: `NEXT_PUBLIC_SUBSTACK_URL` and `reflections[].substackUrl`
- [ ] Instagram: `NEXT_PUBLIC_INSTAGRAM_URL`
- [ ] Confirmed prices in [`lib/data/prices.ts`](lib/data/prices.ts)
- [ ] `INTENTIONAL_SPACE_REMAINING_PLACES` in [`lib/data/site.ts`](lib/data/site.ts)
- [ ] Real testimonials (placeholders in [`components/landing/LandingView.tsx`](components/landing/LandingView.tsx))
- [ ] ConvertKit API key and form IDs set in `.env.local` (never commit)

## Environment Variables

`.env.local` is ignored via `.gitignore` (`.env*`). Copy from [`.env.example`](.env.example).
