import type { FormatItem } from "@/types/content";

export const formatsContent: {
  readonly title: string;
  readonly description: string;
  readonly items: readonly FormatItem[];
} = {
  title: "In presenza e online",
  description:
    "È possibile intraprendere il percorso psicologico in presenza oppure online, scegliendo la modalità più adatta alle proprie esigenze.",
  items: [
    {
      title: "Colloqui in presenza",
      description: "Gli incontri si svolgono in uno spazio professionale dedicato.",
      location: null,
    },
    {
      title: "Colloqui online",
      description: "Gli incontri online consentono di intraprendere il percorso anche a distanza.",
    },
  ],
};
