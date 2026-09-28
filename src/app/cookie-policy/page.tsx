import type { Metadata } from "next";

import { Button, Container, Heading, Section, Text } from "@/components/ui";

export const metadata: Metadata = {
  title: "Cookie Policy | Giorgia Petruzzellis",
  description: "Informazioni sui cookie e sugli strumenti tecnici utilizzati dal sito.",
};

export default function CookiePolicyPage() {
  return (
    <main id="main-content">
      <Section spacing="compact">
        <Container>
          <div className="mx-auto max-w-3xl py-6 sm:py-10">
            <p className="section-label">Cookie</p>
            <Heading className="mt-3" variant="h1">
              Cookie Policy
            </Heading>
            <Text className="mt-5" variant="lead">
              Questa pagina descrive l’uso di cookie e tecnologie analoghe sul sito.
            </Text>

            <div className="mt-8 rounded-2xl border border-primary/15 bg-[#f8f6ff] px-5 py-4 text-sm leading-6 text-ink-soft">
              <strong className="text-ink">Configurazione attuale:</strong> il sito non utilizza cookie di profilazione,
              pubblicità comportamentale o strumenti analytics non necessari.
            </div>

            <div className="mt-10 space-y-9 text-base leading-7 text-ink-soft">
              <section>
                <Heading variant="h3">Cookie tecnici</Heading>
                <p className="mt-4">
                  Il sito può utilizzare cookie o strumenti tecnici strettamente necessari per il funzionamento, la sicurezza e
                  l’autenticazione dell’area riservata. Questi strumenti non sono utilizzati per creare profili commerciali degli utenti.
                </p>
              </section>

              <section className="border-t border-border pt-8">
                <Heading variant="h3">Area riservata</Heading>
                <p className="mt-4">
                  Quando l’amministratrice accede alla dashboard, il sistema di autenticazione può memorizzare identificatori di
                  sessione necessari a mantenere l’accesso in modo sicuro. Tali strumenti sono funzionali a un servizio espressamente richiesto.
                </p>
              </section>

              <section className="border-t border-border pt-8">
                <Heading variant="h3">Cookie di profilazione e analytics</Heading>
                <p className="mt-4">
                  Al momento non sono installati strumenti di profilazione, remarketing o analytics che richiedano il consenso
                  preventivo dell’utente. Per questa configurazione non viene mostrato un banner di consenso cookie.
                </p>
                <p className="mt-4">
                  Se in futuro verranno aggiunti strumenti non strettamente necessari, la configurazione sarà aggiornata e,
                  quando richiesto, verrà introdotto un sistema di gestione del consenso prima della loro attivazione.
                </p>
              </section>

              <section className="border-t border-border pt-8">
                <Heading variant="h3">Gestione dal browser</Heading>
                <p className="mt-4">
                  L’utente può gestire o cancellare i cookie attraverso le impostazioni del proprio browser. La disabilitazione
                  dei cookie tecnici può impedire il corretto funzionamento di alcune funzionalità, in particolare dell’area riservata.
                </p>
              </section>

              <section className="border-t border-border pt-8">
                <Heading variant="h3">Aggiornamenti</Heading>
                <p className="mt-4">
                  La presente Cookie Policy verrà aggiornata qualora cambino i servizi o gli strumenti tecnici utilizzati dal sito.
                </p>
              </section>
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
