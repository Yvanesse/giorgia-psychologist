import type { AboutContent } from "@/types/content";

export const aboutContent: AboutContent = {
  label: "Chi sono",
  name: "Dott.ssa Giorgia Petruzzellis",
  role: "Psicologa clinica e Psicoterapeuta in formazione ad orientamento sistemico-relazionale.",
  paragraphs: [
    "Mi occupo di benessere psicologico e sostegno alla persona, integrando le competenze cliniche con una formazione specialistica in Psicologia giuridica e Neuropsicologia forense.",
    "Il mio obiettivo è offrire uno spazio di ascolto e sostegno, aiutando ogni persona a comprendere le proprie difficoltà alla luce delle dinamiche familiari, sociali e ambientali.",
  ],
  cta: { label: "Scopri di più su di me", href: "/chi-sono" },
  image: {
    src: "/images/giorgia-about.jpg",
    alt: "Giorgia Petruzzellis nel suo contesto professionale",
    width: 1200,
    height: 1500,
  },
  isProvisional: false,
};
