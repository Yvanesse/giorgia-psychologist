import type { HeroContent } from "@/types/content";

export const heroContent: HeroContent = {
  eyebrow: null,
  title: "Comprendere è il primo passo verso il cambiamento.",
  highlight: null,
  subtitle:
    "Percorsi di supporto psicologico costruiti intorno alla persona, alle relazioni e ai contesti di vita.",
  primaryCta: { label: "Prenota un primo colloquio", href: "/prenota" },
  secondaryCta: { label: "Scopri il mio approccio", href: "/#approccio" },
  image: {
    src: "/images/giorgia-hero.webp",
    alt: "Ritratto della Dott.ssa Giorgia Petruzzellis",
    width: 720,
    height: 746,
  },
  isProvisional: false,
};
