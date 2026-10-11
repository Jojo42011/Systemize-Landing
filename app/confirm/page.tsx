import type { Metadata } from "next";
import ProofSection from "@/components/ProofSection";
import SiteFooter from "@/components/SiteFooter";
import VslPlayer from "@/components/VslPlayer";
import { routes, vsl } from "@/lib/config";

export const metadata: Metadata = {
  title: "Your Call Is Scheduled | Aethon Intelligence",
  description:
    "Your walkthrough call with Aethon Intelligence is booked. Watch the short preparation video and confirm your calendar invitation.",
  // Post-booking page. Not meant to be found via search.
  robots: { index: false, follow: false },
};

const prepItems = [
  "Where your leads come from: ads, listings, portals, content, referrals",
  "Roughly how many leads you receive per month",
  "What you spend on advertising or content each month",
  "How new leads are responded to today, and by whom",
  "The CRM and tools your team currently runs on",
  "Your booking and close rates if you know them. Rough numbers are fine",
];

export default function ConfirmPage() {
  return (
    <>
      <main>
        {/* Headline + supporting sentence */}
        <section
          aria-labelledby="confirm-heading"
          className="mx-auto w-full max-w-4xl px-5 pt-16 text-center sm:px-8 sm:pt-24"
        >
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-saffron">
            You are booked
          </p>
          <h1
            id="confirm-heading"
            className="font-display mx-auto mt-4 max-w-3xl text-[2rem] leading-[1.15] sm:text-[2.75rem] sm:leading-[1.14]"
          >
            Congratulations, Your Walkthrough Call Is{" "}
            <span className="text-saffron">Scheduled</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-2 sm:text-xl">
            Before the call, do two things: watch the short video below, and
            confirm the calendar invitation in your inbox.
          </p>

          {/* Preparation video */}
          <div className="mx-auto mt-10 max-w-3xl">
            <VslPlayer
              video={vsl.confirm}
              posterTitle="Watch this before your call"
              posterText="Three minutes on what the walkthrough covers, what to bring, and how we will decide together whether it fits."
            />
          </div>
        </section>

        {/* Calendar confirmation steps with visuals */}
        <section
          aria-labelledby="calendar-heading"
          className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8 sm:py-20"
        >
          <h2
            id="calendar-heading"
            className="font-display text-center text-2xl sm:text-3xl"
          >
            First: confirm your calendar invitation
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-ink-2">
            This is what it looks like. Three quick steps so the call is locked
            on both calendars.
          </p>

          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {/* Step 1: check email */}
            <li className="flex min-w-0 flex-col rounded-2xl border border-line bg-white p-7">
              <StepBadge n={1} />
              <h3 className="mt-3 text-xl font-bold">Check your email</h3>
              <p className="mt-2 text-base leading-relaxed text-ink-2">
                A confirmation with your call details is in the inbox you used
                when booking.
              </p>
              <div className="mt-auto pt-6">
                <EmailVisual />
              </div>
            </li>

            {/* Step 2: open the invitation */}
            <li className="flex min-w-0 flex-col rounded-2xl border border-line bg-white p-7">
              <StepBadge n={2} />
              <h3 className="mt-3 text-xl font-bold">
                Open the calendar invitation
              </h3>
              <p className="mt-2 text-base leading-relaxed text-ink-2">
                Inside that email you will find a calendar invitation for the
                time you selected.
              </p>
              <div className="mt-auto pt-6">
                <InviteVisual />
              </div>
            </li>

            {/* Step 3: click yes */}
            <li className="flex min-w-0 flex-col rounded-2xl border border-line bg-white p-7">
              <StepBadge n={3} />
              <h3 className="mt-3 text-xl font-bold">
                Click &ldquo;Yes&rdquo; to confirm
              </h3>
              <p className="mt-2 text-base leading-relaxed text-ink-2">
                Accepting the invitation locks the time on both calendars, so
                the call actually happens.
              </p>
              <div className="mt-auto pt-6">
                <RsvpVisual />
              </div>
            </li>
          </ol>
        </section>

        {/* How to prepare */}
        <section
          aria-labelledby="prepare-heading"
          className="border-y border-line-soft bg-canvas-tint"
        >
          <div className="mx-auto w-full max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
            <h2
              id="prepare-heading"
              className="font-display text-center text-2xl sm:text-3xl"
            >
              How to prepare
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-ink-2">
              The walkthrough is built on your real numbers, not a generic
              pitch. The more of these you can bring, the more useful the call
              will be:
            </p>
            <ul className="mx-auto mt-10 max-w-2xl space-y-3.5">
              {prepItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-line bg-white px-5 py-4 text-base leading-relaxed text-ink-2"
                >
                  <svg
                    aria-hidden="true"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-1 shrink-0 text-saffron"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Proof */}
        <div className="border-t border-line-soft">
          <ProofSection />
        </div>

        {/* Reschedule / contact */}
        <section
          aria-labelledby="reschedule-heading"
          className="border-t border-line-soft bg-canvas-tint"
        >
          <div className="mx-auto w-full max-w-3xl px-5 py-14 text-center sm:px-8 sm:py-16">
            <h2
              id="reschedule-heading"
              className="font-display text-2xl sm:text-3xl"
            >
              Need to reschedule?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-2">
              Life happens. Use the reschedule link in your confirmation email
              to pick a new time. It takes a few seconds and keeps your spot.
              If anything else comes up before the call,{" "}
              <a
                href={routes.contact}
                className="font-semibold text-saffron underline-offset-4 hover:underline"
              >
                reach out to us directly
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Step visuals: simple brand-styled mockups of what the prospect      */
/* will actually see in their inbox and calendar.                      */
/* ------------------------------------------------------------------ */

function StepBadge({ n }: { n: number }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold text-base font-bold text-ink"
    >
      {n}
    </span>
  );
}

/** Mock inbox row showing the confirmation email arriving. */
function EmailVisual() {
  return (
    <div
      aria-hidden="true"
      className="rounded-xl border border-line bg-canvas p-3"
    >
      <div className="rounded-lg border border-line bg-white p-3 shadow-sm">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-soft">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#7a5200"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-10 6L2 7" />
            </svg>
          </span>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-bold text-ink">
              Booking confirmed: Walkthrough Call
            </p>
            <p className="truncate text-xs text-muted">
              Aethon Intelligence · just now
            </p>
          </div>
          <span className="ml-auto h-2 w-2 shrink-0 rounded-full bg-saffron" />
        </div>
      </div>
      <div className="mt-2 rounded-lg border border-line-soft bg-white/60 p-3">
        <div className="h-2 w-3/4 rounded bg-line-soft" />
        <div className="mt-2 h-2 w-1/2 rounded bg-line-soft" />
      </div>
    </div>
  );
}

/** Mock calendar invitation card. */
function InviteVisual() {
  return (
    <div
      aria-hidden="true"
      className="rounded-xl border border-line bg-canvas p-3"
    >
      <div className="rounded-lg border border-line bg-white p-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 shrink-0 overflow-hidden rounded-lg border border-line text-center">
            <div className="bg-ink py-0.5 text-[9px] font-bold uppercase tracking-wide text-canvas">
              Your
            </div>
            <div className="py-1 text-sm font-bold text-ink">Date</div>
          </div>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-bold text-ink">
              Walkthrough Call
            </p>
            <p className="truncate text-xs text-muted">
              Your selected time · 30 min
            </p>
            <p className="truncate text-xs text-muted">
              You + Aethon Intelligence
            </p>
          </div>
        </div>
      </div>
      <p className="mt-2 text-center text-xs font-semibold text-muted">
        The invitation is attached to the email
      </p>
    </div>
  );
}

/** Mock RSVP row with Yes highlighted. */
function RsvpVisual() {
  return (
    <div
      aria-hidden="true"
      className="rounded-xl border border-line bg-canvas p-3"
    >
      <div className="rounded-lg border border-line bg-white p-3 shadow-sm">
        <p className="text-xs font-semibold text-muted">Going?</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3.5 py-1.5 text-[13px] font-bold text-ink ring-2 ring-saffron/40">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            Yes
          </span>
          <span className="rounded-full border border-line px-3.5 py-1.5 text-[13px] font-semibold text-muted">
            No
          </span>
          <span className="rounded-full border border-line px-3.5 py-1.5 text-[13px] font-semibold text-muted">
            Maybe
          </span>
        </div>
      </div>
      <p className="mt-2 text-center text-xs font-semibold text-muted">
        Click Yes and you are locked in
      </p>
    </div>
  );
}
