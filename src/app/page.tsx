import type { Metadata } from "next";

import { ApproachSection } from "@/components/sections/ApproachSection";
import { AreasSection } from "@/components/sections/AreasSection";
import { ArticlesSection } from "@/components/sections/ArticlesSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { FormatsSection } from "@/components/sections/FormatsSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ManifestoSection } from "@/components/sections/ManifestoSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { WhenUsefulSection } from "@/components/sections/WhenUsefulSection";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}/#giorgia-petruzzellis`,
    name: "Giorgia Petruzzellis",
    honorificPrefix: "Dott.ssa",
    jobTitle: "Psicologa clinica e forense",
    description:
      "Psicologa clinica e forense e psicoterapeuta in formazione ad orientamento sistemico-relazionale.",
    url: siteConfig.url,
    image: `${siteConfig.url}/images/giorgia-hero-final.jpg`,
    email: siteConfig.contacts.email,
    telephone: siteConfig.contacts.phone,
    worksFor: {
      "@id": `${siteConfig.url}/#studio`,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${siteConfig.url}/#studio`,
    name: "Dott.ssa Giorgia Petruzzellis - Psicologa",
    description: siteConfig.seo.description,
    url: siteConfig.url,
    image: `${siteConfig.url}/images/giorgia-hero-final.jpg`,
    logo: `${siteConfig.url}/logo/giorgia-petruzzellis-header.png`,
    email: siteConfig.contacts.email,
    telephone: siteConfig.contacts.phone,
    vatID: "IT09166050725",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Via Monte d'Alba 76",
      addressLocality: "Trani",
      addressRegion: "Puglia",
      addressCountry: "IT",
    },
    founder: {
      "@id": `${siteConfig.url}/#giorgia-petruzzellis`,
    },
  },
];

export default function Home() {
  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HeroSection />
      <ManifestoSection />
      <AreasSection />
      <WhenUsefulSection />
      <ApproachSection />
      <ReviewsSection />
      <FormatsSection />
      <FaqSection />
      <ArticlesSection />
      <FinalCtaSection />
    </main>
  );
}
