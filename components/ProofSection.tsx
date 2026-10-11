import Image from "next/image";
import { site } from "@/lib/config";

const leadSmartStats = [
  { value: "$576,270", label: "Paid out monthly through the platform we built" },
  { value: "76,935", label: "Calls screened for fraud, from zero screening" },
  { value: "$31,040", label: "Recovered in one verified reconciliation run" },
  { value: "55 to 85 hrs", label: "Of manual work removed every month" },
];

const aquaticStats = [
  { value: "4 roles", label: "Covered by one platform" },
  { value: "30 pages", label: "Published and indexed for local SEO" },
  { value: "15 cities", label: "Covered across the Phoenix Valley" },
  { value: "24/7", label: "Phone coverage, nights and weekends included" },
];

/**
 * Documented Aethon proof, shared by /confirm and /faq. Uses only evidence
 * published on aethonintelligence.com, shown with the real client logos and
 * labeled with its real industry context. Never presented as real estate
 * lead response results.
 */
export default function ProofSection({ id }: { id?: string }) {
  return (
    <section
      id={id}
      aria-labelledby="proof-heading"
      className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8 sm:py-24"
    >
      <p className="text-center text-sm font-bold uppercase tracking-[0.16em] text-saffron">
        Documented work
      </p>
      <h2
        id="proof-heading"
        className="font-display mx-auto mt-4 max-w-3xl text-center text-3xl leading-tight sm:text-4xl"
      >
        We build production systems that run real, high volume operations
      </h2>

      {/* Lead Smart */}
      <article className="mt-12 overflow-hidden rounded-2xl border border-line bg-white shadow-[0_10px_40px_-20px_rgba(23,20,15,0.15)]">
        <div className="flex flex-col gap-5 border-b border-line-soft px-7 py-7 sm:flex-row sm:items-center sm:gap-8 sm:px-10">
          <Image
            src="/leadsmart.png"
            alt="Lead Smart logo"
            width={147}
            height={90}
            className="h-16 w-auto shrink-0 sm:h-20"
          />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">
              Case study: Lead Smart · Pay per call performance marketing
            </p>
            <h3 className="font-display mt-2 text-2xl leading-snug sm:text-3xl">
              Five production systems for an operation handling 3,000 inbound
              calls a day
            </h3>
          </div>
        </div>
        <div className="grid gap-px bg-line-soft sm:grid-cols-2 lg:grid-cols-4">
          {leadSmartStats.map((stat) => (
            <div key={stat.label} className="bg-white px-7 py-8">
              <p className="font-display text-3xl text-saffron sm:text-[2rem]">
                {stat.value}
              </p>
              <p className="mt-2.5 text-base leading-snug text-ink-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        <div className="border-t border-line-soft px-7 py-7 sm:px-10">
          <p className="text-base leading-relaxed text-ink-2">
            Payments across 1,124 affiliates in 11 currencies, fraud detection,
            buyer reconciliation, dispute automation, and an internal AI
            assistant. Designed, built, and deployed in roughly six weeks.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Shown to demonstrate how Aethon builds and operates complex
            business systems tied to measurable outcomes. This engagement was
            for a performance marketing company. It is not a real estate lead
            response result.
          </p>
        </div>
      </article>

      {/* Aquatic Pools */}
      <article className="mt-8 overflow-hidden rounded-2xl border border-line bg-white shadow-[0_10px_40px_-20px_rgba(23,20,15,0.15)]">
        <div className="flex flex-col gap-5 border-b border-line-soft px-7 py-7 sm:flex-row sm:items-center sm:gap-8 sm:px-10">
          <Image
            src="/aquatic-pools.png"
            alt="Aquatic Pools logo"
            width={194}
            height={51}
            className="h-10 w-auto shrink-0 sm:h-12"
          />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">
              Case study: Aquatic Pools · Custom pool builder in Arizona
            </p>
            <h3 className="font-display mt-2 text-2xl leading-snug sm:text-3xl">
              Four roles an owner would hire for, run by one platform
            </h3>
          </div>
        </div>
        <div className="grid gap-px bg-line-soft sm:grid-cols-2 lg:grid-cols-4">
          {aquaticStats.map((stat) => (
            <div key={stat.label} className="bg-white px-7 py-8">
              <p className="font-display text-3xl text-saffron sm:text-[2rem]">
                {stat.value}
              </p>
              <p className="mt-2.5 text-base leading-snug text-ink-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        <div className="border-t border-line-soft px-7 py-7 sm:px-10">
          <p className="text-base leading-relaxed text-ink-2">
            Autonomous local SEO, content and social operations, inbound and
            outbound phone coverage that qualifies and routes every call, and
            chief of staff support for the owner. After hours inquiries stopped
            going to voicemail.
          </p>
        </div>
      </article>

      <p className="mt-10 text-center text-base text-muted">
        Full write ups, with the numbers in context:{" "}
        <a
          href={site.caseStudies}
          className="font-semibold text-saffron underline-offset-4 hover:underline"
        >
          aethonintelligence.com/case-studies
        </a>
      </p>
    </section>
  );
}
