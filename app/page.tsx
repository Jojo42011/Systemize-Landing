import SiteFooter from "@/components/SiteFooter";
import VslPlayer from "@/components/VslPlayer";
import { bookingHref, vsl } from "@/lib/config";

/**
 * Single-page VSL funnel, mirroring the HIS reference format:
 * headline → subheadline → video → one CTA → footer. Nothing else.
 */
export default function Home() {
  return (
    <>
      <main className="flex min-h-[calc(100vh-1px)] flex-col">
        <section
          aria-labelledby="hero-heading"
          className="mx-auto w-full max-w-4xl flex-1 px-5 pb-24 pt-16 text-center sm:px-8 sm:pt-24"
        >
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.12em] text-caption sm:text-base">
            Stop Forcing Bad Marketing.
          </p>
          <h1
            id="hero-heading"
            className="font-display mx-auto max-w-4xl text-[2rem] leading-[1.15] sm:text-[2.75rem] sm:leading-[1.14] lg:text-5xl"
          >
            We will install a{" "}
            <strong className="font-bold text-accent">social media growth system</strong>{" "}
            that will get you{" "}
            <strong className="font-bold text-accent">20–30 booked appointments in 30 days</strong>{" "}
            so you never have to worry where the next appointment will come from.
          </h1>

          <div className="mx-auto mt-10 max-w-3xl">
            <VslPlayer
              video={vsl.main}
              posterTitle="How the system works"
              posterText="A short walkthrough of what we install, how it fits your operation, and what a good fit looks like."
            />
          </div>

          <div className="mt-10">
            <a
              href={bookingHref}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent px-6 py-3.5 text-[15px] font-bold text-on-accent shadow-[0_6px_24px_-6px_rgba(19,29,166,0.35)] transition-colors duration-200 hover:bg-canvas-deep hover:text-on-dark sm:px-11 sm:py-4 sm:text-lg"
            >
              Book Your Free Walkthrough Call
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
