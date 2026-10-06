import type { FooterContent } from "@/types/content";
import { navigationItems } from "./navigation";

export const footerContent: FooterContent = {
  name: "Giorgia Petruzzellis",
  profession: "Psicologa",
  navigation: navigationItems,
  legalLinks: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Cookie Policy", href: "/cookie-policy" },
  ],
  baseYear: 2026,
  professionalDetails: {
    numeroAlbo: "Iscrizione all’Albo n. 8714",
    ordine: "Ordine delle Psicologhe e degli Psicologi della Regione Puglia",
    partitaIva: "P. IVA 09166050725",
  },
};
