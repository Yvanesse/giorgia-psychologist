import type { FaqItem } from "@/types/content";

export const faqContent: {
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly items: readonly FaqItem[];
} = {
  label: "FAQ",
  title: "Domande frequenti",
  description: "Alcune informazioni utili prima di iniziare.",
  items: [
    {
      question: "Come si svolge il primo colloquio?",
      answer:
        "Il primo colloquio è uno spazio di ascolto in cui raccontare la propria richiesta e iniziare a comprendere insieme bisogni, contesto e possibili obiettivi del percorso.",
    },
    {
      question: "Come posso capire se iniziare un percorso?",
      answer:
        "Può essere utile iniziare quando senti il bisogno di comprendere meglio ciò che stai vivendo, affrontare una difficoltà o dedicare uno spazio alla tua esperienza personale e relazionale.",
    },
    {
      question: "È possibile svolgere gli incontri online?",
      answer:
        "Sì, gli incontri possono svolgersi anche online quando questa modalità è adeguata alle esigenze della persona e agli obiettivi del percorso.",
    },
    {
      question: "Con quale frequenza si svolgono gli incontri?",
      answer:
        "La frequenza viene concordata insieme in base alle esigenze della persona, agli obiettivi e all’organizzazione del percorso.",
    },
    {
      question: "Posso modificare o annullare un appuntamento?",
      answer:
        "Eventuali modifiche o annullamenti vengono gestiti concordando insieme modalità e tempi, nel rispetto dell’organizzazione del percorso.",
    },
    {
      question: "Come posso prenotare?",
      answer:
        "Puoi richiedere un primo colloquio attraverso il modulo di contatto o il sistema di prenotazione, indicando le informazioni necessarie per essere ricontattata o ricontattato.",
    },
  ],
};
