import type { ApproachItem } from "@/types/content";

export const approachContent: {
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly items: readonly ApproachItem[];
} = {
  label: "Come lavoro",
  title: "Un percorso costruito insieme",
  description:
    "Dall’ascolto iniziale alla definizione del percorso, ogni fase nasce dal confronto e si adatta alla persona, alle relazioni e ai contesti di vita.",
  items: [
    {
      title: "Ascolto e comprensione",
      description:
        "Il primo colloquio è uno spazio per raccontare ciò che stai attraversando, comprendere la richiesta e iniziare a leggere insieme la tua esperienza.",
    },
    {
      title: "Direzione condivisa",
      description:
        "Obiettivi, modalità e tempi vengono definiti insieme, attraverso un lavoro psicologico fondato su competenze cliniche e attenzione ai contesti di vita.",
    },
    {
      title: "Un percorso che evolve",
      description:
        "Il percorso viene osservato e ridefinito nel tempo, rispettando bisogni, risorse e cambiamenti della persona.",
    },
  ],
};
