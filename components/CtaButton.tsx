import { bookingHref } from "@/lib/config";

type CtaButtonProps = {
  children: React.ReactNode;
  href?: string;
  size?: "md" | "lg";
  variant?: "accent" | "ink";
  className?: string;
};

/**
 * Primary conversion button. Defaults to scrolling to the booking section so
 * every CTA on the page drives one action.
 */
export default function CtaButton({
  children,
  href = bookingHref,
  size = "lg",
  variant = "accent",
  className = "",
}: CtaButtonProps) {
  const sizeClasses =
    size === "lg"
      ? "px-8 py-4 text-base sm:px-10 sm:text-lg"
      : "px-5 py-2.5 text-sm";
  const variantClasses =
    variant === "accent"
      ? "bg-accent text-on-accent hover:bg-canvas-deep hover:text-on-dark shadow-[0_6px_24px_-6px_rgba(19,29,166,0.35)]"
      : "bg-canvas-deep text-on-dark hover:bg-accent hover:text-on-accent";

  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-colors duration-200 ${sizeClasses} ${variantClasses} ${className}`}
    >
      {children}
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
  );
}
