"use client";

import { useEffect, useRef, useState } from "react";
import { booking, isBookingConfigured } from "@/lib/config";

type CalApi = {
  (...args: unknown[]): void;
  q?: unknown[];
  loaded?: boolean;
  ns?: Record<string, unknown>;
};

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

/**
 * Inline Cal.com booking embed.
 *
 * Configured via NEXT_PUBLIC_CAL_LINK (e.g. "jahan/walkthrough"). When set, the
 * official Cal.com embed script renders the calendar inline. On a successful
 * booking, the visitor is redirected to NEXT_PUBLIC_CAL_REDIRECT_URL when that
 * is set (planned: /confirm).
 *
 * When unconfigured, a deliberate fallback renders so the booking action never
 * silently fails: a styled card linking to the main Aethon contact page, plus
 * a development-only notice for whoever is wiring the page up.
 */
export default function CalBooking() {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!isBookingConfigured || initialized.current || !containerRef.current) {
      return;
    }
    initialized.current = true;

    // Official Cal.com embed loader (queue-based, safe to call before load).
    (function (win: Window, scriptSrc: string) {
      const d = win.document;
      win.Cal =
        win.Cal ||
        function (...args: unknown[]) {
          const cal = win.Cal as CalApi;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            const s = d.createElement("script");
            s.src = scriptSrc;
            s.onerror = () => setFailed(true);
            d.head.appendChild(s);
            cal.loaded = true;
          }
          if (args[0] === "init") {
            const api: CalApi = function (...apiArgs: unknown[]) {
              api.q = api.q || [];
              api.q.push(apiArgs);
            };
            const namespace = args[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns![namespace] = cal.ns![namespace] || api;
              (cal.ns![namespace] as CalApi).q!.push(args);
              cal.q!.push(["initNamespace", namespace]);
            } else {
              cal.q!.push(args);
            }
            return;
          }
          cal.q!.push(args);
        };
    })(window, "https://app.cal.com/embed/embed.js");

    const Cal = window.Cal!;
    Cal("init", "walkthrough", { origin: "https://cal.com" });
    const ns = (Cal.ns?.walkthrough ?? Cal) as CalApi;
    ns("inline", {
      elementOrSelector: containerRef.current,
      calLink: booking.calLink,
      config: { layout: "month_view" },
    });
    ns("ui", {
      styles: { branding: { brandColor: "#c77300" } },
      hideEventTypeDetails: false,
    });
    if (booking.redirectUrl) {
      ns("on", {
        action: "bookingSuccessful",
        callback: () => {
          window.location.assign(booking.redirectUrl);
        },
      });
    }
  }, []);

  if (!isBookingConfigured || failed) {
    return <BookingFallback failed={failed} />;
  }

  return (
    <div
      ref={containerRef}
      className="min-h-[560px] w-full overflow-hidden rounded-2xl border border-line bg-white"
      aria-label="Booking calendar"
    />
  );
}

function BookingFallback({ failed }: { failed: boolean }) {
  return (
    <div className="flex min-h-[280px] w-full flex-col items-center justify-center gap-5 rounded-2xl border border-line bg-white px-6 py-12 text-center">
      <p className="font-display text-2xl">Prefer to reach out directly?</p>
      <p className="max-w-md text-sm leading-relaxed text-muted">
        {failed
          ? "The calendar could not load just now. You can reach us directly and we will set the walkthrough up by hand."
          : "Tell us about your operation and we will set up your walkthrough directly."}
      </p>
      <a
        href={booking.fallbackHref}
        className="inline-flex items-center justify-center rounded-full bg-ink px-7 py-3 text-sm font-semibold text-canvas transition-colors hover:bg-[#2b261d]"
      >
        Contact Aethon Intelligence
      </a>
      {process.env.NODE_ENV === "development" && !failed && (
        <p className="mt-2 rounded-lg bg-canvas-tint px-4 py-2 text-xs text-faint">
          Dev note: set NEXT_PUBLIC_CAL_LINK in .env.local to render the
          inline Cal.com calendar here. See .env.example.
        </p>
      )}
    </div>
  );
}
