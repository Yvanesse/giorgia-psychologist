import type { ApproachItem } from "@/types/content";

export const approachContent: {
  readonly title: string;
  readonly items: readonly ApproachItem[];
} = {
  title: "Il mio modo di lavorare",
  items: [
    {
      title: "Ascolto",
      description: "Ogni percorso inizia dalla comprensione della storia della persona.",
    },
    {
      title: "Metodo",
      description:
        "Il lavoro psicologico si fonda su competenze cliniche, formazione continua e attenzione ai contesti di vita.",
    },
    {
      title: "Unicità",
      description:
        "Ogni persona ha una storia diversa. Per questo ogni percorso viene costruito rispettandone tempi, bisogni e risorse.",
    },
  ],
};
