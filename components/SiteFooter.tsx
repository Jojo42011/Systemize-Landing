import { routes, site } from "@/lib/config";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-canvas-tint">
      <div className="mx-auto max-w-5xl px-5 py-8 text-xs leading-relaxed text-caption sm:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
          <nav aria-label="Legal" className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            <a href={routes.privacy} className="underline underline-offset-4 hover:text-accent">Privacy Policy</a>
            <a href={routes.terms} className="underline underline-offset-4 hover:text-accent">Terms of Use</a>
            <a href={`${routes.privacy}#cookies`} className="underline underline-offset-4 hover:text-accent">Cookies &amp; privacy choices</a>
            <a href={`mailto:${site.privacyEmail}`} className="underline underline-offset-4 hover:text-accent">Contact</a>
          </nav>
        </div>
        <div className="mt-5 space-y-2 border-t border-line pt-4 text-center sm:text-left">
          <p>Campaign outcomes depend on advertising spend, market conditions, your offer, and follow-up. Examples and testimonials describe individual experiences. Before purchasing, request the written eligibility, measurement, timing, and payment terms for any appointment or “you don’t pay” offer.</p>
          <p>This website is not affiliated with or endorsed by Meta Platforms, Inc., Facebook, or Instagram. Their names and trademarks belong to their respective owners.</p>
          <p>For business inquiries only. Please do not submit patient records, medical information, or payment details. See our Privacy Policy for information about Meta Pixel, booking providers, and your privacy choices.</p>
        </div>
      </div>
    </footer>
  );
}
