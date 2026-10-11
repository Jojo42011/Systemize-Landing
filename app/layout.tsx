import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { site } from "@/lib/config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Stop Forcing Bad Marketing. We will install a social media growth system that will get you 20–30 booked appointments in 30 days so you never have to worry where the next appointment will come from.",
  description:
    "We will install a social media growth system that will get you 20–30 booked appointments in 30 days so you never have to worry where the next appointment will come from.",
  openGraph: {
    title: "Stop Forcing Bad Marketing. We will install a social media growth system that will get you 20–30 booked appointments in 30 days so you never have to worry where the next appointment will come from.",
    description:
      "We will install a social media growth system that will get you 20–30 booked appointments in 30 days so you never have to worry where the next appointment will come from.",
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.legalName,
  url: site.mainSite,
  founder: { "@type": "Person", name: site.founder },
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Antonio",
    addressRegion: "TX",
    addressCountry: "US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
