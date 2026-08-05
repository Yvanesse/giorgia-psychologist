export const siteConfig = {
  name: "Giorgia Petruzzellis",
  profession: "Psicologa",
  logo: {
    src: "/logo/logo-placeholder.svg",
    alt: "Logo di Giorgia Petruzzellis",
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "Chi sono", href: "/#chi-sono" },
    { label: "Approccio", href: "/#approccio" },
    { label: "Ambiti", href: "/#ambiti" },
    { label: "Articoli", href: "/articoli" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contatti", href: "/#contatti" },
  ],
  cta: {
    label: "Prenota",
    href: "/prenota",
  },
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
