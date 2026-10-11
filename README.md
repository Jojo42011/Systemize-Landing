# Aethon Intelligence — VSL Funnel

The video-sales-letter landing funnel for [Aethon Intelligence](https://aethonintelligence.com), targeting Texas real-estate operators with the AI lead-response system offer.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS v4 (brand tokens defined in `app/globals.css`)
- Deploys to Vercel with zero extra configuration

## Development

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
```

Checks:

```bash
npm run typecheck
npm run build
```

## Configuration

All integrations are environment-driven and documented in [`.env.example`](.env.example). The page degrades gracefully when they are unset:

| Variable | Purpose | Unset behavior |
| --- | --- | --- |
| `NEXT_PUBLIC_VIDALYTICS_EMBED_ID` + `..._LOADER_URL` | Main page VSL | Branded 16:9 poster, no layout shift |
| `NEXT_PUBLIC_VIDALYTICS_EMBED_ID_CONFIRM` + `..._LOADER_URL_CONFIRM` | `/confirm` preparation video | Branded poster |
| `NEXT_PUBLIC_VIDALYTICS_EMBED_ID_FAQ` + `..._LOADER_URL_FAQ` | `/faq` pre-call video | Branded poster |
| `NEXT_PUBLIC_CAL_LINK` | Cal.com booking link (main-page CTA target) | CTA falls back to the Aethon contact page |
| `NEXT_PUBLIC_CAL_REDIRECT_URL` | Post-booking redirect override | Defaults to `/confirm`; also set "Redirect on booking" in Cal.com event settings |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata | Falls back to default (empty/malformed values are tolerated) |

## Funnel flow

Main VSL page → Cal.com booking → `/confirm` (preparation) → discovery call → `/faq` (pre-second-call education) → second call. `/confirm` and `/faq` intentionally contain **no booking CTAs** — visitors there have already booked.

## Architecture notes

- `lib/config.ts` — single source of truth for env config and route constants.
- `components/SiteHeader.tsx` / `SiteFooter.tsx` — shared chrome, ready for reuse by `/confirm` and `/faq`.
- `components/VslPlayer.tsx` — 16:9 container ready for the Vidalytics loader.
- `components/CalBooking.tsx` — inline Cal.com embed with success-redirect hook and deliberate fallback.
- `components/FaqSection.tsx` — native `<details>` accordion (keyboard accessible, zero JS); its data also feeds the FAQPage structured data.
- Legal links currently point to the pages on aethonintelligence.com; swap them in `lib/config.ts` when local `/privacy` and `/terms` routes are built.

## Content rules

Claims on this page are limited to evidence documented on aethonintelligence.com (Lead Smart and Aquatic Pools case studies, labeled with their real industries). Draft claims from campaign planning (conversion percentages, guaranteed appointment counts, "we already built your blueprint") are **not** published here and must not be added until their definitions and evidence are finalized.
