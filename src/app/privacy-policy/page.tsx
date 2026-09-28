import type { Metadata } from "next";

import { Button, Container, Heading, Section, Text } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy Policy | Giorgia Petruzzellis",
  description: "Informativa sul trattamento dei dati personali ai sensi del Regolamento (UE) 2016/679.",
};

function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border pt-8 first:border-t-0 first:pt-0">
      <Heading variant="h3">{title}</Heading>
      <div className="mt-4 space-y-4 text-base leading-7 text-ink-soft">{children}</div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main id="main-content">
      <Section spacing="compact">
        <Container>
          <div className="mx-auto max-w-3xl py-6 sm:py-10">
            <p className="section-label">Privacy</p>
            <Heading className="mt-3" variant="h1">
              Informativa sul trattamento dei dati personali
            </Heading>
            <Text className="mt-5" variant="lead">
              Informativa resa ai sensi degli articoli 12 e 13 del Regolamento (UE) 2016/679 (“GDPR”).
            </Text>

            <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-900">
              <strong>Bozza pre-pubblicazione.</strong> Prima della messa online definitiva completeremo questa pagina con i recapiti professionali e gli eventuali dati obbligatori della titolare.
            </div>

            <div className="mt-10 space-y-9">
              <PolicySection title="1. Titolare del trattamento">
                <p>
                  La titolare del trattamento è la <strong className="text-ink">Dott.ssa Giorgia Petruzzellis, Psicologa</strong>.
                  I recapiti professionali per le richieste relative alla privacy saranno indicati nella versione definitiva del sito.
                </p>
              </PolicySection>

              <PolicySection title="2. Quali dati vengono raccolti">
                <p>
                  Attraverso il sistema di prenotazione possono essere raccolti nome, cognome, indirizzo email, numero di telefono,
                  modalità del colloquio, data e orario richiesti.
                </p>
                <p>
                  Il modulo online <strong className="text-ink">non richiede di indicare il motivo clinico della richiesta</strong> né di inserire informazioni sanitarie nel campo di prenotazione.
                </p>
                <p>
                  Il sito può inoltre trattare dati tecnici necessari al funzionamento e alla sicurezza, come informazioni relative
                  alla sessione, richieste al server e dati tecnici di connessione.
                </p>
              </PolicySection>

              <PolicySection title="3. Finalità e basi giuridiche">
                <p>
                  I dati inviati tramite il sistema di prenotazione sono utilizzati esclusivamente per ricevere, gestire,
                  confermare o annullare la richiesta di appuntamento e per le comunicazioni strettamente collegate.
                </p>
                <p>
                  Per i dati comuni, il trattamento è effettuato per dare seguito a una richiesta dell’interessato e per
                  l’esecuzione di misure precontrattuali o contrattuali. Qualora, nel rapporto professionale, vengano trattati dati
                  relativi alla salute, trovano applicazione anche le condizioni previste dall’art. 9 GDPR per l’assistenza o il
                  trattamento sanitario svolto da un professionista soggetto al segreto professionale.
                </p>
                <p>
                  I dati non sono utilizzati per attività di marketing, profilazione pubblicitaria o newsletter senza una distinta
                  base giuridica e una specifica informativa.
                </p>
              </PolicySection>

              <PolicySection title="4. Modalità del trattamento e sicurezza">
                <p>
                  I dati sono trattati con strumenti informatici e misure organizzative e tecniche proporzionate al rischio.
                  L’accesso alla dashboard di gestione è riservato a un account amministrativo autenticato.
                </p>
                <p>
                  Gli eventi creati nel calendario professionale sono configurati in modo da non riportare nel titolo il nome del
                  paziente; il sistema utilizza una dicitura neutra per ridurre l’esposizione di informazioni personali.
                </p>
              </PolicySection>

              <PolicySection title="5. Fornitori e destinatari">
                <p>
                  Per erogare le funzionalità del sito possono essere utilizzati fornitori tecnici che trattano dati per conto della
                  titolare o nell’ambito dei rispettivi servizi, tra cui:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li><strong className="text-ink">Vercel</strong>, per hosting e distribuzione dell’applicazione web;</li>
                  <li><strong className="text-ink">Supabase</strong>, per database, autenticazione e archiviazione tecnica;</li>
                  <li><strong className="text-ink">Resend</strong>, per l’invio delle email relative alle richieste di appuntamento;</li>
                  <li><strong className="text-ink">Google Calendar</strong>, per la gestione delle disponibilità e degli appuntamenti confermati.</li>
                </ul>
                <p>
                  I fornitori possono operare anche tramite infrastrutture localizzate fuori dallo Spazio Economico Europeo.
                  In tali casi il trattamento deve avvenire nel rispetto dei meccanismi di trasferimento previsti dal GDPR e delle
                  garanzie applicabili.
                </p>
              </PolicySection>

              <PolicySection title="6. Periodo di conservazione">
                <p>
                  I dati relativi alle richieste di appuntamento sono conservati per il tempo necessario a gestire la richiesta e,
                  quando pertinente, il successivo rapporto professionale, oltre agli eventuali periodi richiesti da obblighi di
                  legge, fiscali, amministrativi o professionali.
                </p>
                <p>
                  Prima della pubblicazione definitiva verranno formalizzati anche i tempi operativi di cancellazione o
                  anonimizzazione delle richieste non più necessarie nel sistema di prenotazione.
                </p>
              </PolicySection>

              <PolicySection title="7. Conferimento dei dati">
                <p>
                  Il conferimento dei dati contrassegnati come necessari nel modulo di prenotazione è indispensabile per poter
                  inviare e gestire la richiesta. In mancanza di tali dati il sistema non può inoltrare la prenotazione.
                </p>
              </PolicySection>

              <PolicySection title="8. Diritti dell’interessato">
                <p>
                  Nei casi previsti dal GDPR, l’interessato può chiedere accesso ai propri dati, rettifica, cancellazione,
                  limitazione del trattamento, portabilità e opposizione, nonché revocare un eventuale consenso quando il
                  trattamento si basi sul consenso.
                </p>
                <p>
                  È inoltre possibile proporre reclamo al Garante per la protezione dei dati personali secondo le modalità
                  disponibili sul sito dell’Autorità.
                </p>
              </PolicySection>

              <PolicySection title="9. Cookie e strumenti di tracciamento">
                <p>
                  Le informazioni sui cookie e sugli strumenti tecnici utilizzati dal sito sono disponibili nella{" "}
                  <a className="font-semibold text-primary underline underline-offset-4" href="/cookie-policy">
                    Cookie Policy
                  </a>.
                </p>
              </PolicySection>

              <PolicySection title="10. Aggiornamenti">
                <p>
                  Questa informativa potrà essere aggiornata in caso di modifiche alle funzionalità del sito, ai fornitori o alle
                  modalità di trattamento. La versione pubblicata sul sito riporterà le informazioni aggiornate.
                </p>
              </PolicySection>
            </div>

            <div className="mt-12">
              <Button href="/" variant="outline">
                ← Torna alla homepage
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
