import type { FinalCtaContent } from "@/types/content";

export const sharedContent = {
  photoPlaceholder: "Fotografia di Giorgia da inserire",
  skipToContent: "Vai al contenuto",
  openMenu: "Apri il menu di navigazione",
  closeMenu: "Chiudi il menu di navigazione",
} as const;

export const aboutManifesto =
  "Ogni persona ha una storia diversa. Per questo ogni percorso psicologico è unico.";

export const manifestoLabel = "Il mio impegno";

export const finalCtaContent: FinalCtaContent = {
  title: "Comprendere ciò che stai vivendo è il primo passo per affrontarlo.",
  description:
    "Puoi prenotare un primo colloquio per raccontare ciò che stai attraversando e valutare insieme il percorso più adatto.",
  cta: { label: "Prenota un primo colloquio", href: "/prenota" },
};
