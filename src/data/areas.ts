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
        "Uno spazio dedicato alla comprensione di sé, dei vissuti emotivi e delle difficoltà che possono emergere nei diversi momenti della vita.",
      topics: ["Ansia e stress", "Autostima", "Cambiamenti", "Consapevolezza di sé"],
      href: "/percorsi/individuale",
    },
    {
      title: "Di coppia",
      description:
        "Un percorso per comprendere le dinamiche della relazione, migliorare la comunicazione e affrontare insieme momenti di difficoltà o cambiamento.",
      topics: ["Comunicazione", "Conflitti", "Cambiamenti", "Intimità e vicinanza"],
      href: "/percorsi/coppia",
    },
    {
      title: "Familiare",
      description:
        "Uno spazio per leggere le dinamiche familiari, favorire nuove modalità di relazione e affrontare insieme passaggi delicati o situazioni di difficoltà.",
      topics: ["Dinamiche familiari", "Comunicazione", "Cambiamenti", "Relazioni tra generazioni"],
      href: "/percorsi/familiare",
    },
  ],
};
