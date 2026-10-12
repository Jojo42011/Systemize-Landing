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
            className="font-display mx-auto max-w-4xl text-2xl leading-[1.3] sm:text-3xl sm:leading-[1.3] lg:text-4xl"
          >
            <span className="text-accent">Filler &amp; Botox Clinics:</span>{" "}
            Get 20–30 Qualified Appointments in the Next 30 Days or you don&apos;t pay.
            <span className="mt-8 block text-xl leading-relaxed sm:text-2xl sm:leading-relaxed lg:text-3xl lg:leading-[1.4]">
              We install a{" "}
              <strong className="font-bold text-accent">custom patient acquisition system</strong>{" "}
              that turns local demand into booked consultations, without relying on
              referrals, inconsistent social media posting, or agencies that don&apos;t
              understand aesthetics.
            </span>
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
      <section
        aria-labelledby="clinic-stories-heading"
        className="border-t border-line bg-canvas px-5 py-16 sm:px-8 sm:py-20"
      >
        <div className="mx-auto w-full max-w-5xl">
          <h2
            id="clinic-stories-heading"
            className="font-display text-center text-2xl sm:text-3xl"
          >
            Hear from other Clinics
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {[1, 2, 3, 4].map((number) => (
              <div
                key={number}
                role="img"
                aria-label={"Clinic video placeholder " + number}
                className="aspect-[9/16] rounded-2xl border-2 border-line bg-transparent"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
