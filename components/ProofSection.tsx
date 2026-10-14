import Image from "next/image";
import octoberCampaign from "@/public/campaign-results-october.png";
import mayCampaign from "@/public/campaign-results-may.webp";
import julyCampaign from "@/public/campaign-results-july.webp";
import augustCampaign from "@/public/campaign-results-august.webp";

const campaigns = [
  { image: octoberCampaign, alt: "October campaign results showing 63 booked appointments at $24.85 each." },
  { image: mayCampaign, alt: "May campaign results showing 72 booked appointments at $29.40 each." },
  { image: julyCampaign, alt: "July campaign results showing 54 booked appointments at $26.70 each." },
  { image: augustCampaign, alt: "August campaign results showing 68 booked appointments at $27.95 each." },
];

export default function ProofSection({ id }: { id?: string }) {
  return (
    <section id={id} aria-labelledby="proof-heading" className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
      <h2 id="proof-heading" className="font-display text-center text-3xl sm:text-4xl">Real results. Real campaigns.</h2>
      <div className="mt-10 grid grid-cols-2 items-start gap-4 lg:grid-cols-4 lg:gap-6">
        {campaigns.map((campaign) => (
          <Image key={campaign.alt} src={campaign.image} alt={campaign.alt} sizes="(max-width: 1023px) 50vw, 238px" className="aspect-[4/5] w-full rounded-2xl border border-line bg-[#121212] object-contain" />
        ))}
      </div>
    </section>
  );
}
