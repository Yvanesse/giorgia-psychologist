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
    { label: "Servizi", href: "/#servizi" },
    { label: "Contatti", href: "/#contatti" },
  ],
  contacts: {
    email: "email@example.com",
    phone: "+39 000 000 0000",
    address: "Indirizzo da definire",
  },
  social: {
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/",
  },
  seo: {
    title: "Giorgia Petruzzellis | Psicologa",
    description: "Sito professionale della psicologa Giorgia Petruzzellis.",
    locale: "it_IT",
  },
} as const;
