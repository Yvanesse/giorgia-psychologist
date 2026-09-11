export const bookingContent = {
  eyebrow: "Prenotazione",
  title: "Prenota un primo colloquio",
  description:
    "Scegli la modalità che preferisci. La disponibilità degli appuntamenti verrà mostrata qui quando il calendario sarà collegato.",
  modeLabel: "Modalità del colloquio",
  modes: [
    {
      id: "in-presenza",
      title: "In presenza",
      description: "Colloquio presso lo studio professionale.",
    },
    {
      id: "online",
      title: "Online",
      description: "Colloquio da remoto, in videochiamata.",
    },
  ],
  availabilityTitle: "Disponibilità",
  availabilityDescription:
    "Il calendario con giorni e orari disponibili sarà integrato in questo spazio.",
  previewNotice:
    "Questa è ancora una versione di anteprima: al momento non viene confermato alcun appuntamento.",
  backLabel: "Torna alla homepage",
} as const;
