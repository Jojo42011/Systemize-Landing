import Image from "next/image";
import octoberCampaign from "@/public/campaign-results-october.png";
import mayCampaign from "@/public/campaign-results-may.webp";
import julyCampaign from "@/public/campaign-results-july.webp";
import augustCampaign from "@/public/campaign-results-august.webp";
import VslPlayer from "@/components/VslPlayer";
import { vsl } from "@/lib/config";
import ProcessQuestionnaire from "@/components/ProcessQuestionnaire";

/**
 * Single-page VSL funnel, mirroring the HIS reference format:
 * headline → subheadline → video → one CTA → footer. Nothing else.
 */
export default function Home() {
  return (
    <>
      <main className="flex flex-col">
        <section
          aria-labelledby="hero-heading"
          className="mx-auto w-full max-w-4xl flex-1 px-5 pb-12 pt-16 text-center sm:px-8 sm:pt-24"
        >
          <h1
            id="hero-heading"
            className="font-display mx-auto max-w-4xl text-2xl leading-[1.3] sm:text-3xl sm:leading-[1.3] lg:text-4xl"
          >
            <span className="text-accent">Botox &amp; Filler Clinics:</span>{" "}
            Stop Wasting Money on Ads That Don&apos;t Fill Your Calendar.
            <span className="mt-8 block text-xl leading-relaxed sm:text-2xl sm:leading-relaxed lg:text-3xl lg:leading-[1.4]">
              We install a{" "}
              <strong className="font-bold text-accent">custom Facebook &amp; Instagram advertising system</strong>{" "}
              designed to generate 20–30 booked appointments in 30 days or you don&apos;t pay.
            </span>
          </h1>

          <div className="mx-auto mt-10 max-w-xl">
            <VslPlayer
              video={vsl.main}
              posterTitle="How the system works"
              posterText="A short walkthrough of what we install, how it fits your operation, and what a good fit looks like."
            />
          </div>

          <div className="mt-10">
            <ProcessQuestionnaire />
          </div>
        </section>
      </main>
      <section
        aria-labelledby="clinic-stories-heading"
        className="border-t border-line bg-canvas px-5 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-12"
      >
        <div className="mx-auto w-full max-w-5xl">
          <h2
            id="clinic-stories-heading"
            className="font-display text-center text-3xl sm:text-4xl"
          >
            Real results. Real campaigns.
          </h2>
          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 items-start gap-4 lg:grid-cols-4 lg:gap-6">
            <Image
              src={octoberCampaign}
              alt="October campaign results showing 63 booked appointments at $24.85 each."
              sizes="(max-width: 1023px) 50vw, 238px"
              className="aspect-[4/5] w-full rounded-2xl border border-line bg-[#121212] object-contain"
            />
            <Image
              src={mayCampaign}
              alt="May campaign results showing 72 booked appointments at $29.40 each."
              sizes="(max-width: 1023px) 50vw, 238px"
              className="aspect-[4/5] w-full rounded-2xl border border-line bg-[#121212] object-contain"
            />
            <Image
              src={julyCampaign}
              alt="July campaign image showing 54 booked appointments at $26.70 each."
              sizes="(max-width: 1023px) 50vw, 238px"
              className="aspect-[4/5] w-full rounded-2xl border border-line bg-[#121212] object-contain"
            />
            <Image
              src={augustCampaign}
              alt="August campaign image showing 68 booked appointments at $27.95 each."
              sizes="(max-width: 1023px) 50vw, 238px"
              className="aspect-[4/5] w-full rounded-2xl border border-line bg-[#121212] object-contain"
            />
          </div>
        </div>
      </section>
      <section
        aria-labelledby="client-stories-heading"
        className="border-t border-line bg-canvas px-5 py-16 sm:px-8 sm:py-20"
      >
        <div className="mx-auto w-full max-w-5xl">
          <h2
            id="client-stories-heading"
            className="font-display text-center text-3xl sm:text-4xl"
          >
            Hear from our clients
          </h2>
          <div className="mx-auto mt-10 max-w-sm">
            <div className="aspect-[9/16] overflow-hidden rounded-2xl border border-line bg-canvas-deep">
              <video
                controls
                playsInline
                preload="metadata"
                aria-label="Client testimonial video"
                className="h-full w-full object-contain"
              >
                <source src="/client-testimonial-01.mp4#t=0.001" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
