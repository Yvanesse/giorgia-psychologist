import type { CallToAction, NavigationItem } from "@/types/content";

export const navigationItems: readonly NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Chi sono", href: "/#chi-sono" },
  { label: "Approccio", href: "/#approccio" },
  { label: "Ambiti", href: "/#ambiti" },
  { label: "Articoli", href: "/articoli" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contatti", href: "/#contatti" },
];

export const navigationCta: CallToAction = {
  label: "Prenota",
  href: "/prenota",
};
