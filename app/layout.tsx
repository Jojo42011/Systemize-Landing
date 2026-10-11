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
  title: "AI Lead Response Systems for Real Estate Operators | Aethon Intelligence",
  description:
    "Aethon Intelligence installs custom AI lead response and follow up systems around your existing ads, CRM, and sales process, so the leads you already generate become booked conversations. Built for Texas brokerages and real estate operators.",
  openGraph: {
    title: "Turn the Leads You Already Generate Into Booked Conversations",
    description:
      "Every new inquiry gets a fast response, consistent follow up, real qualification, and a clear next step. Without spending more on ads, buying more leads, or chasing more referrals.",
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
