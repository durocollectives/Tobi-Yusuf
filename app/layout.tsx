import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Playfair_Display } from "next/font/google";
import { getSiteUrl, getSocialSameAs } from "@/lib/data/site";
import { SITE_IMAGES } from "@/lib/data/site-images";
import { LoveResetSlideIn } from "@/components/landing/LoveResetSlideIn";
import { ScrollToTop } from "@/components/landing/ScrollToTop";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const SITE_DESCRIPTION =
  "Tobi Yusuf — marriage mentor, speaker, and relational intelligence advisor based in London. A faith-led alternative to marriage counselling for couples seeking honest conversation about marriage, identity, and the life they are building together.";

const SITE_TITLE_DEFAULT = "Tobi Yusuf | Marriage Mentor, Speaker & Relational Intelligence Advisor";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "48x48" },
      { url: SITE_IMAGES.favicon, type: "image/png" },
    ],
    apple: SITE_IMAGES.appleTouchIcon,
    shortcut: "/icon.png",
  },
  title: {
    default: SITE_TITLE_DEFAULT,
    template: "%s | Tobi Yusuf",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Tobi Yusuf",
    "marriage mentor London",
    "marriage counselling alternative",
    "premarital counselling",
    "faith-led marriage mentor",
    "relational intelligence",
    "cultural intelligence",
    "couples speaker",
    "marriage reflection guide",
    "Christian marriage mentor",
    "marriage support London",
    "relationship advisor UK",
  ],
  authors: [{ name: "Tobi Yusuf", url: getSiteUrl() }],
  creator: "Tobi Yusuf",
  publisher: "Tobi Yusuf",
  alternates: {
    canonical: getSiteUrl(),
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Tobi Yusuf",
    title: SITE_TITLE_DEFAULT,
    description: SITE_DESCRIPTION,
    url: getSiteUrl(),
    images: [
      {
        url: SITE_IMAGES.img1,
        width: 1200,
        height: 630,
        alt: "Tobi Yusuf — Marriage Mentor and Speaker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE_DEFAULT,
    description: SITE_DESCRIPTION,
    images: [SITE_IMAGES.img1],
    creator: "@tobiyusuf",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = getSiteUrl();
  const sameAs = getSocialSameAs();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "Tobi Yusuf",
        url: siteUrl,
        description: SITE_DESCRIPTION,
        potentialAction: {
          "@type": "SearchAction",
          target: { "@type": "EntryPoint", urlTemplate: `${siteUrl}/?s={search_term_string}` },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Tobi Yusuf",
        url: siteUrl,
        image: `${siteUrl}${SITE_IMAGES.img1}`,
        description: SITE_DESCRIPTION,
        jobTitle: "Marriage Mentor, Speaker & Relational Intelligence Advisor",
        worksFor: { "@type": "Organization", name: "Tobi Yusuf" },
        address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
        knowsAbout: ["Marriage mentoring", "Relational intelligence", "Cultural intelligence", "Premarital counselling", "Faith-led relationships"],
        ...(sameAs.length > 0 ? { sameAs } : {}),
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Tobi Yusuf",
        url: siteUrl,
        logo: { "@type": "ImageObject", url: `${siteUrl}${SITE_IMAGES.siteLogo}` },
        founder: { "@id": `${siteUrl}/#person` },
        address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
      },
    ],
  };

  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} ${playfair.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ScrollToTop />
        {children}
        <LoveResetSlideIn />
      </body>
    </html>
  );
}
