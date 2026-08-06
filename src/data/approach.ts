import type { ApproachItem } from "@/types/content";

export const approachContent: {
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly items: readonly ApproachItem[];
} = {
  label: "Il mio approccio",
  title: "Il mio modo di lavorare",
  description: "Un percorso costruito con cura, a partire dalla persona e dalla sua esperienza.",
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
