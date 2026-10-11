import type { Metadata } from "next";
import FaqSection, { faqs } from "@/components/FaqSection";
import ProofSection from "@/components/ProofSection";
import SiteFooter from "@/components/SiteFooter";
import VslPlayer from "@/components/VslPlayer";
import { vsl } from "@/lib/config";

export const metadata: Metadata = {
  title: "How the System Works | Aethon Intelligence",
  description:
    "How Aethon's custom AI lead response system works, the proof behind it, and answers to the questions operators ask most.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

const secondCallPrep = [
  "Watch the video above in full. It answers most of the questions that would otherwise take up call time",
  "Review the case studies above, and note anything you want to challenge or dig into",
  "Skim the FAQ answers and bring the questions that are still open for your operation",
  "Loop in anyone else involved in the decision, so they can watch this page before the call too",
];

export default function FaqPage() {
  return (
    <>
      <main>
        {/* Headline restating the outcome */}
        <section
          aria-labelledby="faq-hero-heading"
          className="mx-auto w-full max-w-4xl px-5 pt-16 text-center sm:px-8 sm:pt-24"
        >
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-saffron">
            Before your next call
          </p>
          <h1
            id="faq-hero-heading"
            className="font-display mx-auto mt-4 max-w-3xl text-[2rem] leading-[1.15] sm:text-[2.75rem] sm:leading-[1.14]"
          >
            More of the Leads You Already Generate, Turned Into{" "}
            <span className="text-saffron">Booked Conversations</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-2 sm:text-xl">
            Watch this before your next call. It covers what Aethon actually
            builds, how the system fits around your existing workflow, where
            humans stay involved, and how results are measured.
          </p>

          {/* Pre-conversion video */}
          <div className="mx-auto mb-16 mt-10 max-w-3xl sm:mb-24">
            <VslPlayer
              video={vsl.faq}
              posterTitle="What we build and how it fits your operation"
              posterText="Not a chatbot, and not a marketing agency. How a custom lead response system works around your CRM, your team, and your rules."
            />
          </div>
        </section>

        {/* Proof and case studies directly underneath */}
        <div className="border-y border-line-soft bg-canvas-tint">
          <ProofSection />
        </div>

        {/* FAQ / objection handling */}
        <FaqSection />

        {/* Second call preparation */}
        <section
          aria-labelledby="prep-heading"
          className="border-t border-line-soft bg-canvas-tint"
        >
          <div className="mx-auto w-full max-w-3xl px-5 py-16 text-center sm:px-8 sm:py-20">
            <h2
              id="prep-heading"
              className="font-display text-2xl sm:text-3xl"
            >
              Before your next call
            </h2>
            <ol className="mx-auto mt-8 max-w-2xl space-y-3.5 text-left">
              {secondCallPrep.map((item, i) => (
                <li
                  key={item}
                  className="flex items-start gap-4 rounded-xl border border-line bg-white px-5 py-4 text-base leading-relaxed text-ink-2"
                >
                  <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-bold text-ink">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
            <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted">
              Your next call is already on the calendar, so there is nothing to
              book here. Come with your open questions and we will work through
              them together.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
