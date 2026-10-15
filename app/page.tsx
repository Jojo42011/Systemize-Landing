import Image from "next/image";
import octoberCampaign from "@/public/campaign-results-october.png";
import mayCampaign from "@/public/campaign-results-may.webp";
import julyCampaign from "@/public/campaign-results-july.webp";
import augustCampaign from "@/public/campaign-results-august.webp";
import ProcessQuestionnaire from "@/components/ProcessQuestionnaire";
import SiteFooter from "@/components/SiteFooter";

const clinicFaqs = [
  {
    question: "Is this designed for Botox and filler clinics?",
    answer: "Yes. The system focuses on helping Botox and filler clinics turn local interest into booked consultations through Facebook and Instagram advertising. During the walkthrough, we will discuss your clinic, your goals, and whether the approach fits your business.",
  },
  {
    question: "What happens when I click See the process?",
    answer: "You will answer a few short questions about your clinic and your plans. Once you submit the questionnaire, a calendar opens so you can choose a time for your free walkthrough.",
  },
  {
    question: "What should I prepare for the walkthrough?",
    answer: "Come ready to discuss the treatments you want to promote, the area you serve, and how many new consultations your team can handle. If you already run ads, bring a rough idea of your current spend and results. We can use that context to discuss the next steps.",
  },
];

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
              designed to generate 20–50 booked appointments in 30 days or you don&apos;t pay.
            </span>
          </h1>

          <div className="mx-auto mt-10 max-w-xl overflow-hidden rounded-2xl border border-contour-dark bg-canvas-deep shadow-[0_24px_60px_-24px_rgba(11,17,27,0.4)]">
            <iframe
              src="https://www.loom.com/embed/648a664ba6de4203aae438180105a1b4"
              title="How the SystemizeTX clinic growth system works"
              className="aspect-video w-full border-0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
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
          <div className="mx-auto mt-10 max-w-xs">
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
      <section aria-labelledby="home-faq-heading" className="border-t border-line bg-canvas px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 id="home-faq-heading" className="font-display text-center text-3xl sm:text-4xl">Frequently asked questions</h2>
          <div className="mt-10 divide-y divide-line border-y border-line">
            {clinicFaqs.map((faq) => (
              <details key={faq.question} className="group py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 rounded-lg py-5 text-lg font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span aria-hidden="true" className="shrink-0 text-2xl font-normal text-accent transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-2xl pb-6 pr-7 text-base leading-relaxed text-ink-2">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
