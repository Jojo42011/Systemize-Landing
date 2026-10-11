import Image from "next/image";
import { routes, site } from "@/lib/config";

/**
 * Shared footer: legal identity, policy links, disclaimer, dynamic year.
 * Legal links currently point at the pages on the main Aethon site; swap the
 * hrefs in lib/config.ts once local /privacy and /terms routes exist.
 */
export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line-soft bg-canvas-tint">
      <div className="mx-auto w-full max-w-4xl px-5 py-14 text-center sm:px-8">
        <div className="flex flex-col items-center gap-3">
          <Image src="/aethon-logo.svg" alt="" width={40} height={40} />
          <p className="font-display text-lg">Aethon Intelligence</p>
          <p className="text-sm text-muted">
            {site.legalName} · {site.location}
          </p>
        </div>

        <nav
          aria-label="Legal"
          className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm"
        >
          <a
            href={routes.privacy}
            className="text-ink-2 underline-offset-4 hover:underline"
          >
            Privacy Policy
          </a>
          <a
            href={routes.terms}
            className="text-ink-2 underline-offset-4 hover:underline"
          >
            Terms &amp; Conditions
          </a>
          <a
            href={routes.contact}
            className="text-ink-2 underline-offset-4 hover:underline"
          >
            Contact
          </a>
        </nav>

        <p className="mx-auto mt-8 max-w-2xl text-xs leading-relaxed text-faint">
          Disclaimer: any client results referenced on this page, in the video,
          or on pages linked from it come from specific engagements and are
          described in their actual context. They are not
          typical, are not guarantees, and are not projections of what any
          other business will achieve. Outcomes depend on your lead volume,
          lead sources, sales process, and participation during implementation.
          Any performance commitment is defined individually, in writing, after
          we have reviewed your operation.
        </p>

        <p className="mt-6 text-xs text-faint">
          © {year} {site.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
