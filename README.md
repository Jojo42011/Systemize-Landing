# SystemizeTX LLC Landing Funnel

The landing funnel for Botox and filler clinics, with a questionnaire, CRM lead capture, and embedded consultation booking.

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
npm test
npm run build
```

## Configuration

All integrations are environment-driven and documented in [`.env.example`](.env.example). The page degrades gracefully when they are unset:

| Variable | Purpose | Unset behavior |
| --- | --- | --- |
| `NEXT_PUBLIC_VIDALYTICS_EMBED_ID` + `..._LOADER_URL` | Main page VSL | Branded 16:9 poster, no layout shift |
| `NEXT_PUBLIC_VIDALYTICS_EMBED_ID_CONFIRM` + `..._LOADER_URL_CONFIRM` | `/confirm` preparation video | Branded poster |
| `NEXT_PUBLIC_VIDALYTICS_EMBED_ID_FAQ` + `..._LOADER_URL_FAQ` | `/faq` pre-call video | Branded poster |
| `NEXT_PUBLIC_CAL_LINK` | Cal.com booking link (main-page CTA target) | CTA falls back to the SystemizeTX LLC contact page |
| `NEXT_PUBLIC_CAL_REDIRECT_URL` | Post-booking redirect override | Defaults to `/confirm`; also set "Redirect on booking" in Cal.com event settings |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata | Falls back to default (empty/malformed values are tolerated) |

## Funnel flow

Main page → questionnaire → confirmed CRM save → embedded Cal.com booking. Opening the calendar does not count as a booking.

## Lead capture and Meta tracking

The main questionnaire posts JSON directly to `https://systemizetx-crm.fly.dev/api/leads` using the public form key in the `x-stx-key` header. This key permits public form submissions and is intentionally browser visible. Never replace it with an administrative credential.

Existing form answers map to `name`, `email`, `phone`, `business`, and `revenue`. Decision maker status, preferred start time, and the optional note are preserved together in `problem`. The form sends an empty `company_site` bot trap. It does not send city, state, or invented consent values.

Ad URL parameters supply the UTM fields and `fbclid`. Meta cookies supply `fbp` and `fbc`; a missing `fbc` can be derived only from an actual captured click ID. Attribution stays in session storage. Only the recognized campaign parameters are retained in `page_url`.

| Event | Trigger | Identity |
| --- | --- | --- |
| PageView | Production page load | Existing pixel base event |
| QuestionnaireStarted | First questionnaire opening in the current page | Random journey ID |
| Lead | CRM responds with `ok: true` and an ID, without `duplicate: true` | Exact `event_id` posted to the CRM |
| CalendarOpened | Cal.com reports `bookerViewed` | Submission ID with a calendar prefix |
| Schedule | Cal.com reports `bookingSuccessfulV2`, with `ACCEPTED` status, no payment required, a booking UID, and a saved CRM lead ID | `stx-schedule-` followed by the CRM lead ID |

Lead and Schedule are Meta standard events. The other funnel events are custom events. Pixel ID: `1059058030467363`. The browser event payload does not contain questionnaire answers. Events queue until the pixel bootstrap is ready. Conversion IDs are retained for the session to suppress repeated callbacks. Development and localhost browser tracking are disabled. The live CRM can still send server events if you submit from localhost, so use mocked tests for routine checks.

Saving failures keep the form open. A retry after a confirmed save only retries the calendar, without submitting the lead again. Retries after an ambiguous network failure reuse the event ID, and the CRM also detects repeated emails within a day.

The CRM uses the supplied `event_id` for its Lead Conversions API event. Its Cal.com webhook and manual Call booked action send one Schedule per lead using `stx-schedule-{id}`. The browser saves the returned CRM ID in session storage as `stx_lead_id` and uses that exact Schedule event ID on pixel `1059058030467363`. A repeated booking for the same lead does not create another browser Schedule. If no lead ID is available, the browser skips Schedule. An in memory fallback preserves the ID when storage is unavailable.

The calendar is prefilled with the submitted email because the CRM matches bookings to leads by email. Changing the email in the calendar can prevent that backend match. The browser only counts a confirmed fresh booking from the embed, never an ordinary visit to `/confirm`. Pending approvals, reschedules, and bookings outside the embed rely on the CRM webhook. Live delivery to Meta and the backend webhook configuration cannot be verified from this repository. Do not install a second button based Lead or Schedule event in Meta Event Setup Tool or Cal.com, as that can count conversions twice.

Before using the events for campaign optimization, check an authorized real submission and booking in Meta Events Manager Test Events and confirm browser and server deduplication. The automated tests use mocked responses and never create production leads or bookings. See [Cal.com embed events](https://cal.com/help/embedding/embed-events) for the booking event contract.

## Architecture notes

- `lib/config.ts` — single source of truth for env config and route constants.
- `components/SiteHeader.tsx` / `SiteFooter.tsx` — shared chrome, ready for reuse by `/confirm` and `/faq`.
- `components/VslPlayer.tsx` — 16:9 container ready for the Vidalytics loader.
- `components/CalBooking.tsx` — inline Cal.com embed with success-redirect hook and deliberate fallback.
- `components/FaqSection.tsx` — native `<details>` accordion (keyboard accessible, zero JS); its data also feeds the FAQPage structured data.
- Legal links point to local `/privacy` and `/terms` pages.

## Content rules

Use the approved clinic campaign images and testimonial for this site. New performance claims require supporting evidence. Keep the terms of any appointment or payment offer documented and consistent with the published copy.
