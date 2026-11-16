import type { Metadata } from "next";

import { Button, Container, Heading, Section, Text } from "@/components/ui";

export const metadata: Metadata = {
  title: "Cookie Policy | Giorgia Petruzzellis",
  description: "Cookie necessari, Google Analytics, misurazione Google Ads e gestione del consenso.",
  alternates: {
    canonical: "/cookie-policy",
  },
};

export default function CookiePolicyPage() {
  return (
    <main id="main-content">
      <Section spacing="compact">
        <Container>
          <div className="mx-auto max-w-3xl py-6 sm:py-10">
            <p className="section-label">Cookie</p>
            <Heading className="mt-3" variant="h1">Cookie Policy</Heading>
            <Text className="mt-5" variant="lead">
              Questa pagina spiega come il sito utilizza i cookie e gli strumenti
              di misurazione facoltativi, e come puoi scegliere quali autorizzare.
            </Text>

            <div className="mt-8 rounded-2xl border border-primary/15 bg-[#f8f6ff] px-5 py-4 text-sm leading-6 text-ink-soft">
              <strong className="text-ink">La tua scelta conta:</strong> Google Analytics
              e gli strumenti di misurazione delle campagne Google Ads non vengono
              caricati finché non presti il relativo consenso. Puoi rifiutarli tutti,
              accettarli oppure scegliere solo una delle due finalità.
            </div>

            <div className="mt-10 space-y-9 text-base leading-7 text-ink-soft">
              <section>
                <Heading variant="h3">Cookie tecnici e necessari</Heading>
                <p className="mt-4">
                  Il sito può utilizzare cookie e altri strumenti tecnici necessari
                  alla sicurezza, al corretto funzionamento della prenotazione e
                  all'autenticazione dell'area riservata. Non vengono usati per
                  creare profili pubblicitari.
                </p>
                <p className="mt-4">
                  La scelta sui cookie facoltativi viene memorizzata nel dispositivo
                  attraverso localStorage, per evitare di riproporre la richiesta
                  a ogni visita. Puoi cancellarla dalle impostazioni del browser.
                </p>
              </section>

              <section className="border-t border-border pt-8">
                <Heading variant="h3">Statistiche – Google Analytics 4</Heading>
                <p className="mt-4">
                  Con il consenso alle statistiche, il sito può utilizzare Google
                  Analytics 4, configurato attraverso Google Tag Manager, per
                  rilevare visite, pagine consultate e interazioni generali. Il
                  servizio può utilizzare cookie e identificatori tecnici per
                  distinguere le visite. Il consenso è facoltativo e disattivato
                  per impostazione predefinita.
                </p>
              </section>

              <section className="border-t border-border pt-8">
                <Heading variant="h3">Misurazione delle campagne – Google Ads</Heading>
                <p className="mt-4">
                  Con un distinto consenso alla misurazione pubblicitaria,
                  possono essere attivati tag Google Ads per valutare in forma
                  aggregata l'efficacia degli annunci. Non utilizziamo i dati
                  del sito per remarketing o pubblicità personalizzata.
                </p>
                <p className="mt-4">
                  Quando viene inviata con successo una richiesta di appuntamento,
                  il sito può generare un evento tecnico generico. Non vengono
                  inclusi nome, cognome, email, numero telefonico, motivi clinici,
                  tipologia del colloquio o altre informazioni inserite nel modulo.
                </p>
              </section>

              <section className="border-t border-border pt-8">
                <Heading variant="h3">Google Tag Manager e fornitori terzi</Heading>
                <p className="mt-4">
                  Google Tag Manager è lo strumento utilizzato per caricare i tag
                  facoltativi in base alle preferenze. I servizi Google possono
                  trattare dati tecnici di navigazione e avvalersi di infrastrutture
                  anche fuori dallo Spazio Economico Europeo, secondo le rispettive
                  informative e garanzie applicabili.
                </p>
                <p className="mt-4">
                  L'effettiva raccolta di statistiche o conversioni dipende anche
                  dalla configurazione dei tag nel contenitore Google Tag Manager.
                </p>
              </section>

              <section className="border-t border-border pt-8">
                <Heading variant="h3">Modificare o revocare il consenso</Heading>
                <p className="mt-4">
                  Puoi modificare o revocare in qualsiasi momento la tua scelta
                  usando il pulsante <strong className="text-ink">Preferenze cookie</strong>
                  {" "}nel piè di pagina. Se revochi un consenso precedentemente
                  accordato, il sito viene ricaricato per interrompere il
                  caricamento dei relativi tag nelle visite successive.
                </p>
                <p className="mt-4">
                  Puoi inoltre cancellare cookie e dati locali direttamente dal
                  browser. La disabilitazione dei cookie tecnici può limitare il
                  funzionamento dell'area riservata.
                </p>
              </section>

              <section className="border-t border-border pt-8">
                <Heading variant="h3">Titolare e ulteriori informazioni</Heading>
                <p className="mt-4">
                  La titolare del trattamento è la Dott.ssa Giorgia Petruzzellis,
                  psicologa, con studio a Trani. Per ulteriori informazioni sul
                  trattamento dei dati e sui tuoi diritti, consulta la{" "}
                  <a className="font-semibold text-primary underline underline-offset-4" href="/privacy-policy">
                    Privacy Policy
                  </a>.
                </p>
              </section>
            </div>

            <div className="mt-12">
              <Button href="/" variant="outline">← Torna alla homepage</Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
