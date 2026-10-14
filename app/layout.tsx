import type { Metadata } from "next";
import Script from "next/script";
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
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1059058030467363');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          {/* Use the original tracking URL directly, without image optimization. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src="https://www.facebook.com/tr?id=1059058030467363&ev=PageView&noscript=1"
          />
        </noscript>
        {/* Conversion events are deferred until the questionnaire and booking flow are built. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
