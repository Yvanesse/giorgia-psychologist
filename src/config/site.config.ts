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
    email: "petruzzellisgiorgia@gmail.com",
    phone: "+393450606786",
    address: "Via Monte d'Alba 76, Trani",
  },
  social: {
    instagram: null,
    linkedin: null,
  },
  seo: {
    title: "Psicologa a Trani | Giorgia Petruzzellis",
    description: "Giorgia Petruzzellis, psicologa a Trani. Percorsi di supporto psicologico per la persona, le relazioni e i contesti di vita, in presenza e online.",
    locale: "it_IT",
  },
} as const;
