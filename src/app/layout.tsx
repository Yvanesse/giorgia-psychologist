import type { Metadata } from "next";

import { siteConfig } from "@/config/site.config";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppContact } from "@/components/layout/WhatsAppContact";
import { sharedContent } from "@/data";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  icons: {
    icon: [
      {
        url: "/logo/giorgia-petruzzellis-header.png",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/logo/giorgia-petruzzellis-header.png",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    locale: siteConfig.seo.locale,
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/giorgia-hero-final.jpg",
        alt: "Dott.ssa Giorgia Petruzzellis, psicologa a Trani",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: ["/images/giorgia-hero-final.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body>
        <a className="skip-link" href="#main-content">{sharedContent.skipToContent}</a>
        <Header />
        {children}
        <Footer />
        <WhatsAppContact />
      </body>
    </html>
  );
}
