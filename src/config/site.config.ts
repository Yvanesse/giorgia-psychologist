import { navigationCta, navigationItems } from "@/data/navigation";

export const siteConfig = {
  name: "Giorgia Petruzzellis",
  profession: "Psicologa",
  logo: {
    src: "/logo/giorgia-petruzzellis-header.png",
    alt: "Giorgia Petruzzellis — Psicologa",
  },
  navigation: navigationItems,
  cta: navigationCta,
  contacts: {
    email: null,
    phone: null,
    address: null,
  },
  social: {
    instagram: null,
    linkedin: null,
  },
  seo: {
    title: "Giorgia Petruzzellis | Psicologa",
    description: "Sito professionale della psicologa Giorgia Petruzzellis.",
    locale: "it_IT",
  },
} as const;
