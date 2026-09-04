import type { JourneyStep } from "@/types/content";

export const journeyContent: {
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly steps: readonly JourneyStep[];
} = {
  label: "Il percorso",
  title: "Come si svolge un percorso",
  description: "Un processo condiviso, definito con chiarezza e rispettoso dei bisogni individuali.",
  steps: [
    {
      title: "Primo colloquio",
      description:
        "Un primo spazio per raccontare ciò che stai attraversando e comprendere il motivo della richiesta.",
    },
    {
      title: "Costruzione del percorso",
      description:
        "Obiettivi, modalità e tempi vengono definiti tenendo conto della persona e del suo contesto.",
    },
    {
      title: "Evoluzione",
      description:
        "Il percorso viene osservato e ridefinito nel tempo, in relazione ai cambiamenti e alle nuove consapevolezze.",
    },
  ],
};
