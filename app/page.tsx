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
          <h1
            id="hero-heading"
            className="font-display mx-auto max-w-3xl text-[2rem] leading-[1.15] sm:text-[2.75rem] sm:leading-[1.14] lg:text-5xl"
          >
            We Install a Custom AI Lead Response System That Turns the Leads
            You Already Pay For Into{" "}
            <span className="text-saffron">Booked Conversations</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-2 sm:text-xl">
            Every new inquiry gets a fast response, consistent follow up, real
            qualification, and a clear next step. Without spending more on ads,
            buying more leads, or chasing more referrals.
          </p>

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
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gold px-6 py-3.5 text-[15px] font-bold text-ink shadow-[0_6px_24px_-6px_rgba(199,115,0,0.45)] transition-colors duration-200 hover:bg-[#e6a800] sm:px-11 sm:py-4 sm:text-lg"
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
