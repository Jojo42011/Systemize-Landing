import type { ReactNode } from "react";
import SiteFooter from "./SiteFooter";

export default function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return <>
    <main className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <a href="/" className="text-sm font-semibold text-accent underline underline-offset-4">← Back to the website</a>
      <h1 className="font-display mt-8 text-3xl sm:text-4xl">{title}</h1>
      <p className="mt-3 text-sm text-muted">Last updated: October 13, 2026</p>
      <div className="mt-8 space-y-8 text-[15px] leading-7 text-ink-2 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 [&_p+p]:mt-3">{children}</div>
    </main>
    <SiteFooter />
  </>;
}
