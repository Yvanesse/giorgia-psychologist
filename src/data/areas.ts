import type { AreaItem } from "@/types/content";

export const areasContent: {
  readonly title: string;
  readonly items: readonly AreaItem[];
} = {
  title: "Ambiti di intervento",
  items: [
    {
      title: "Persona",
      description:
        "Uno spazio dedicato alla comprensione dei vissuti emotivi e delle difficoltà individuali.",
      topics: ["Ansia e stress", "Autostima e insicurezza", "Confusione emotiva", "Cambiamenti e blocchi decisionali"],
      href: "/ambiti/persona",
    },
    {
      title: "Relazioni",
      description:
        "Un percorso per osservare e comprendere le dinamiche che attraversano i legami significativi.",
      topics: ["Difficoltà relazionali", "Dinamiche familiari", "Comunicazione e conflitti", "Percorsi dedicati alla coppia"],
      href: "/ambiti/relazioni",
      note: "Area di interesse e sviluppo professionale.",
    },
    {
      title: "Psicologia giuridica e forense",
      description:
        "Un ambito di formazione dedicato all’incontro tra psicologia, contesti giuridici e valutazione specialistica.",
      topics: ["Psicologia giuridica", "Neuropsicologia forense", "Comprensione dei contesti legali", "Formazione specialistica"],
      href: "/ambiti/psicologia-giuridica-forense",
      note: "Area di formazione e orientamento professionale.",
    },
  ],
};
