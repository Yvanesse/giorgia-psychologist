import type { ArticlePreview } from "@/types/content";

export const articlesContent: {
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly upcomingLabel: string;
  readonly items: readonly ArticlePreview[];
} = {
  label: "Articoli",
  title: "Pensieri e approfondimenti",
  description: "Uno spazio editoriale dedicato alla psicologia, alle relazioni e ai cambiamenti.",
  upcomingLabel: "Prossimamente",
  items: [
    {
      slug: "comprendere-ansia-oltre-sintomi",
      title: "Comprendere l’ansia oltre i suoi sintomi",
      excerpt:
        "Un primo sguardo al significato che l’ansia può assumere nella storia e nei contesti di vita della persona.",
      category: "Benessere psicologico",
      readingTime: "5 min",
      image: null,
      isPublished: false,
    },
    {
      slug: "relazioni-benessere-psicologico",
      title: "Il ruolo delle relazioni nel benessere psicologico",
      excerpt: "Le relazioni influenzano il modo in cui comprendiamo noi stessi, gli altri e ciò che viviamo.",
      category: "Relazioni",
      readingTime: "6 min",
      image: null,
      isPublished: false,
    },
    {
      slug: "affrontare-cambiamento",
      title: "Affrontare un cambiamento senza perdere i propri riferimenti",
      excerpt: "Il cambiamento può generare incertezza, ma anche aprire nuove possibilità di comprensione.",
      category: "Cambiamento",
      readingTime: "5 min",
      image: null,
      isPublished: false,
    },
  ],
};
