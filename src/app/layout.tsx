import type { Metadata } from "next";

import { siteConfig } from "@/config/site.config";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { sharedContent } from "@/data";
import "@/styles/globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    locale: siteConfig.seo.locale,
    type: "website",
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
      </body>
    </html>
  );
}
