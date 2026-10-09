import type { AreaItem } from "@/types/content";

export const areasContent: {
  readonly label: string;
  readonly title: string;
  readonly items: readonly AreaItem[];
} = {
  label: "Il supporto psicologico",
  title: "Percorsi",
  items: [
    {
      title: "Individuale",
      description:
        "Un percorso dedicato alla persona, per comprendere meglio ciò che si sta vivendo, affrontare momenti di difficoltà e sviluppare nuove risorse personali.",
      topics: ["Ansia e stress", "Autostima e identità", "Cambiamenti", "Difficoltà emotive"],
      href: "/percorsi/individuale",
    },
    {
      title: "Di coppia",
      description:
        "Un percorso dedicato alla relazione di coppia, per affrontare difficoltà nella comunicazione, conflitti, cambiamenti nell’intimità e nella sessualità, o momenti di passaggio legati alla genitorialità.",
      topics: ["Comunicazione", "Conflitti", "Sessualità e intimità", "Genitorialità"],
      href: "/percorsi/coppia",
    },
    {
      title: "Familiare",
      description:
        "Un percorso per comprendere e riorganizzare le dinamiche familiari, favorire il dialogo e affrontare insieme fasi di cambiamento, conflitti o difficoltà nei rapporti tra genitori e figli.",
      topics: ["Genitori e figli", "Adolescenza", "Conflitti familiari", "Separazioni e cambiamenti"],
      href: "/percorsi/familiare",
    },
  ],
};
