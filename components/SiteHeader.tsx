import Image from "next/image";
import { routes, site } from "@/lib/config";
import CtaButton from "./CtaButton";

/**
 * Minimal funnel header: logo + one CTA. Shared by the landing page and the
 * future /confirm and /faq pages.
 */
export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line-soft bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href={routes.home}
          className="flex items-center gap-2.5"
          aria-label={`${site.name} home`}
        >
          <Image
            src="/aethon-logo.svg"
            alt=""
            width={34}
            height={34}
            priority
          />
          <span className="font-display text-lg leading-none tracking-tight sm:text-xl">
            Aethon Intelligence
          </span>
        </a>
        <CtaButton size="md">
          <span className="hidden sm:inline">Book a Free Walkthrough</span>
          <span className="sm:hidden">Book a Call</span>
        </CtaButton>
      </div>
    </header>
  );
}
