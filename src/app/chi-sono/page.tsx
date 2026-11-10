import type { Metadata } from "next";

import { Button, Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Chi sono | Giorgia Petruzzellis, Psicologa a Trani",
  description:
    "Conosci Giorgia Petruzzellis, psicologa clinica e forense a Trani, il suo percorso di formazione e l'approccio sistemico-relazionale ai colloqui psicologici.",
  alternates: {
    canonical: "/chi-sono",
  },
  openGraph: {
    title: "Chi sono | Giorgia Petruzzellis",
    description:
      "Il mio percorso, la formazione e il modo in cui accompagno persone, coppie e famiglie attraverso i colloqui psicologici.",
    url: "/chi-sono",
    images: [
      {
        url: "/images/giorgia-hero-final.jpg",
        alt: "Dott.ssa Giorgia Petruzzellis, psicologa a Trani",
      },
    ],
  },
};

const editorialSections = [
  {
    id: "formazione",
    number: "01",
    label: "Formazione e ricerca",
    title: "Qual è il mio percorso di formazione?",
    paragraphs: [
      "Mi sono laureata in Psicologia Clinica e di Comunità presso l'Università degli Studi di Bari Aldo Moro, conseguendo la laurea magistrale con votazione di 110/110 e lode.",
      "Nel corso della mia formazione ho sviluppato un particolare interesse per il modo in cui le esperienze personali, le relazioni familiari e i contesti sociali influenzano il benessere psicologico.",
      "Questo interesse mi ha portata a intraprendere la Scuola di Specializzazione in Psicoterapia Sistemico-Relazionale Integrata presso l'Istituto Metafora di Bari, Centro Ricerca e Terapia della Famiglia, del Bambino e dell'Adolescente, dove proseguo attualmente la mia formazione.",
      "Ho inoltre conseguito con lode un Master universitario di II livello in Psicologia Giuridica e Neuropsicologia Forense, approfondendo le competenze relative alla valutazione psicologica e alla comprensione del comportamento umano nei contesti giuridici.",
      "Accanto all'attività clinica, svolgo attività di ricerca universitaria nell'ambito della psicopatologia forense, partecipando a progetti scientifici nazionali e internazionali.",
      "Considero la formazione continua una parte fondamentale della mia professione: un'opportunità per ampliare il mio sguardo, confrontarmi con prospettive differenti e offrire un sostegno psicologico sempre più attento alla complessità della persona.",
    ],
  },
  {
    id: "approccio-sistemico",
    number: "02",
    label: "Il mio sguardo",
    title: "Che cos'è l'approccio sistemico-relazionale?",
    paragraphs: [
      "L'approccio sistemico-relazionale considera la persona non come un individuo isolato, ma come parte di una rete di relazioni, esperienze e contesti che contribuiscono a dare forma alla sua identità.",
      "Ognuno di noi cresce e si sviluppa attraverso i legami che costruisce: con la famiglia d'origine, con il partner, con gli amici e con le persone che incontra nel corso della vita.",
      "Queste relazioni possono rappresentare importanti risorse, ma talvolta possono anche essere il contesto nel quale si sviluppano incomprensioni, conflitti e difficoltà emotive.",
      "Adottare uno sguardo sistemico significa quindi non chiedersi soltanto “Che cosa non funziona?”, ma anche “Quale significato assume questa difficoltà nella storia e nelle relazioni della persona?”.",
      "Nel mio lavoro cerco di comprendere, insieme a chi si rivolge a me, i modi di comunicare, i ruoli, le aspettative e gli schemi relazionali che possono influenzare il benessere individuale e le relazioni.",
      "Non si tratta di cercare colpevoli o attribuire responsabilità, ma di ampliare lo sguardo, riconoscere le risorse già presenti e individuare nuove possibilità di scelta.",
      "Anche quando il percorso è individuale, la prospettiva rimane relazionale: comprendere i legami e la propria storia può aiutare a costruire un rapporto più consapevole con sé stessi e con gli altri.",
    ],
  },
  {
    id: "percorso-psicologico",
    number: "03",
    label: "Il primo passo",
    title: "Come si svolge un percorso psicologico?",
    paragraphs: [
      "Ogni percorso nasce da un incontro, da una domanda o dal bisogno di comprendere qualcosa che, in un determinato momento della vita, è diventato difficile affrontare da soli.",
      "I primi colloqui sono dedicati alla conoscenza reciproca e all'esplorazione della difficoltà che ti ha portato a chiedere un sostegno psicologico.",
      "Cercheremo di comprendere insieme non soltanto ciò che stai vivendo, ma anche il significato che questa esperienza assume nella tua storia e nelle tue relazioni.",
      "A partire da questa prima fase, individueremo gli obiettivi del percorso, rispettando le tue esigenze, i tuoi tempi e le tue risorse.",
      "Non esiste un percorso identico per tutti: ogni persona porta con sé una storia unica e il lavoro psicologico si costruisce attraverso il dialogo, la collaborazione e la fiducia.",
      "Il mio ruolo non è offrirti risposte preconfezionate o dirti quali scelte compiere, ma accompagnarti nell'esplorazione di nuove prospettive, affinché tu possa trovare modalità più consapevoli e personali di affrontare le difficoltà.",
    ],
  },
] as const;


function ReadMore({ label, paragraphs }: { label: string; paragraphs: readonly string[] }) {
  return (
    <details className="group mt-6 rounded-2xl border border-border bg-white open:shadow-[0_12px_32px_rgba(24,24,27,.04)]">
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-primary marker:content-none [&::-webkit-details-marker]:hidden sm:px-6">
        {label}
        <svg aria-hidden="true" className="size-5 shrink-0 transition-transform duration-200 group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>
      <div className="space-y-5 border-t border-border px-5 py-6 text-base leading-8 text-ink-soft sm:px-6 sm:text-lg">
        {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </details>
  );
}

export default function AboutPage() {
  const training = editorialSections[0];
  const approach = editorialSections[1];
  const journey = editorialSections[2];

  return (
    <main id="main-content">
      <section className="scroll-mt-24 bg-white pb-20 pt-12 sm:pb-28 sm:pt-20" id="chi-sono" aria-labelledby="intro-title">
        <Container variant="wide">
          <div className="mx-auto max-w-[53rem]">
            <div>
              <p className="section-label">Chi sono</p>
              <h1 id="intro-title" className="mt-3 text-[clamp(2.15rem,5.5vw,3.5rem)] font-semibold leading-[1.1] tracking-[-.04em] text-ink">
                Sono Giorgia Petruzzellis.
              </h1>
              <p className="mt-6 text-lg leading-8 text-ink-soft sm:text-xl sm:leading-9">
                Sono psicologa clinica e forense, iscritta all'Albo delle Psicologhe e degli Psicologi della Puglia (n. 8714) e psicoterapeuta in formazione a orientamento sistemico-relazionale.
              </p>
              <div className="mt-6 border-l-[3px] border-[#d36e59] pl-5 text-base leading-8 text-ink-soft sm:pl-6 sm:text-lg">
                Nel mio lavoro parto da un'idea a cui tengo particolarmente: per comprendere una persona è importante conoscere anche le relazioni, le esperienze e i contesti che hanno contribuito a costruire la sua storia.
              </div>
              <ReadMore
                label="Leggi di più su di me"
                paragraphs={[
                  "Credo che ogni difficoltà abbia un significato che merita di essere ascoltato e compreso, senza fermarsi soltanto a ciò che appare in superficie.",
                  "Per questo, attraverso i colloqui psicologici, accompagno le persone, le coppie e le famiglie nell'esplorazione dei propri vissuti emotivi e delle dinamiche relazionali, con l'obiettivo di favorire nuove prospettive, maggiore consapevolezza e possibilità di cambiamento.",
                  "Il mio intento è costruire uno spazio di ascolto autentico, rispettoso e privo di giudizio, nel quale ciascuno possa sentirsi accolto nella propria unicità, riconoscere le proprie risorse e dare un nuovo significato alle esperienze che sta vivendo.",
                ]}
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="scroll-mt-24 bg-surface-muted py-16 sm:py-24" id="formazione" aria-labelledby="training-title">
        <Container variant="wide">
          <div className="grid gap-9 lg:grid-cols-[minmax(0,.78fr)_minmax(0,1.22fr)] lg:gap-16">
            <div className="max-w-lg">
              <p className="section-label">Formazione e ricerca</p>
              <h2 id="training-title" className="mt-4 text-4xl font-semibold leading-[1.1] tracking-[-.045em] text-ink sm:text-[3.25rem]">
                Un percorso che continua a crescere.
              </h2>
              <p className="mt-5 text-lg leading-8 text-ink-soft">
                Studio, aggiornamento e ricerca accompagnano il mio lavoro clinico.
              </p>
            </div>
            <div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { number: "01", title: "Laurea magistrale", info: "Psicologia Clinica e di Comunità · 110/110 e lode", color: "bg-primary" },
                  { number: "02", title: "Specializzazione in corso", info: "Psicoterapia Sistemico-Relazionale Integrata · Istituto Metafora, Bari", color: "bg-[#5d8f6f]" },
                  { number: "03", title: "Master di II livello", info: "Psicologia Giuridica e Neuropsicologia Forense · con lode", color: "bg-[#d36e59]" },
                  { number: "04", title: "Ricerca universitaria", info: "Progetti nazionali e internazionali in psicopatologia forense", color: "bg-primary" },
                ].map((item) => (
                  <article className="rounded-[1.5rem] border border-border bg-white p-5 sm:p-6" key={item.number}>
                    <div className={"mb-5 h-1.5 w-9 rounded-full " + item.color} aria-hidden="true" />
                    <h3 className="text-lg font-semibold leading-snug text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{item.info}</p>
                  </article>
                ))}
              </div>
              <ReadMore label="Approfondisci la mia formazione" paragraphs={training.paragraphs} />
            </div>
          </div>
        </Container>
      </section>

      <section className="scroll-mt-24 bg-white py-16 sm:py-24" id="approccio-sistemico" aria-labelledby="approach-title">
        <Container variant="wide">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,.86fr)_minmax(0,1.14fr)] lg:gap-16">
            <div className="order-2 lg:order-1">
              <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface-muted p-8 sm:p-12">
                <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full border-[24px] border-[#5d8f6f]/10" />
                <svg aria-hidden="true" className="mx-auto mb-7 h-auto w-full max-w-[23rem]" viewBox="0 0 390 180" fill="none">
                  <path d="M10 114C61 25 88 149 149 85C217 9 238 159 311 87C343 56 361 61 380 30" stroke="#5b35f5" strokeWidth="6" strokeLinecap="round" />
                  <circle cx="149" cy="85" r="15" fill="#fff" stroke="#d36e59" strokeWidth="6" />
                  <circle cx="311" cy="87" r="15" fill="#fff" stroke="#5d8f6f" strokeWidth="6" />
                  <circle cx="10" cy="114" r="8" fill="#5b35f5" />
                  <circle cx="380" cy="30" r="8" fill="#5b35f5" />
                </svg>
                <blockquote className="max-w-lg text-xl font-semibold leading-relaxed tracking-[-.02em] text-ink sm:text-2xl">
                  “Non si tratta di cercare colpevoli, ma di ampliare lo sguardo e riconoscere le risorse già presenti.”
                </blockquote>
                <p className="mt-4 text-sm font-semibold text-[#5d8f6f]">Il mio approccio</p>
              </div>
            </div>
            <div className="order-1 max-w-[43rem] lg:order-2">
              <p className="section-label">Il mio approccio</p>
              <h2 id="approach-title" className="mt-4 text-4xl font-semibold leading-[1.1] tracking-[-.045em] text-ink sm:text-[3.25rem]">
                Comprendere la persona, anche attraverso le sue relazioni.
              </h2>
              <p className="mt-6 text-lg leading-8 text-ink-soft sm:text-xl sm:leading-9">
                {approach.paragraphs[0]}
              </p>
              <ReadMore label="Scopri l’approccio sistemico-relazionale" paragraphs={approach.paragraphs.slice(1)} />
            </div>
          </div>
        </Container>
      </section>

      <section className="scroll-mt-24 bg-surface-muted py-16 sm:py-24" id="percorso-psicologico" aria-labelledby="journey-title">
        <Container variant="wide">
          <div className="max-w-3xl">
            <p className="section-label">Come lavoro</p>
            <h2 id="journey-title" className="mt-4 text-4xl font-semibold leading-[1.1] tracking-[-.045em] text-ink sm:text-[3.25rem]">
              Il percorso si costruisce insieme, un passo alla volta.
            </h2>
            <p className="mt-5 text-lg leading-8 text-ink-soft">
              Non esiste un percorso identico per tutti: ogni persona porta con sé una storia unica.
            </p>
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {[
              { n: "01", title: "Ci conosciamo", body: "I primi colloqui sono dedicati a conoscerci e a esplorare ciò che ti ha portato a chiedere sostegno.", color: "text-primary" },
              { n: "02", title: "Diamo senso alle esperienze", body: "Esploriamo insieme il significato delle difficoltà nella tua storia e nelle tue relazioni.", color: "text-[#d36e59]" },
              { n: "03", title: "Definiamo gli obiettivi", body: "Individuiamo una direzione condivisa, rispettando le tue esigenze, i tuoi tempi e le tue risorse.", color: "text-[#5d8f6f]" },
            ].map((item) => (
              <article className="rounded-[1.65rem] border border-border bg-white px-6 py-7 sm:p-8" key={item.n}>
                <p aria-hidden="true" className={"text-5xl font-semibold tracking-[-.07em] " + item.color}>{item.n}</p>
                <h3 className="mt-6 text-xl font-semibold tracking-[-.02em] text-ink sm:text-2xl">{item.title}</h3>
                <p className="mt-3 text-base leading-7 text-ink-soft">{item.body}</p>
              </article>
            ))}
          </div>
          <div className="mx-auto max-w-[51rem]">
            <ReadMore label="Come si svolgono i colloqui: leggi di più" paragraphs={journey.paragraphs} />
          </div>
        </Container>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <Container variant="wide">
          <div className="relative overflow-hidden rounded-[2rem] bg-primary px-6 py-10 text-white sm:px-10 sm:py-14 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:px-14">
            <div aria-hidden="true" className="pointer-events-none absolute -right-14 -top-24 size-64 rounded-full border-[36px] border-white/10" />
            <div className="relative max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[.17em] text-white/80">Iniziamo da qui</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-.04em] sm:text-4xl">
                Un primo incontro per capire da dove iniziare.
              </h2>
              <p className="mt-4 text-base leading-7 text-white/90 sm:text-lg">
                Puoi richiedere un colloquio psicologico a Trani oppure online, scegliendo la modalità più adatta a te.
              </p>
            </div>
            <a href="/prenota" className="relative mt-7 inline-flex min-h-14 w-full shrink-0 items-center justify-center gap-2 rounded-full border-[1.5px] border-white bg-white px-7 text-center text-base font-semibold text-primary-strong transition-colors hover:bg-surface-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto lg:mt-0">
              Prenota un primo colloquio <span aria-hidden="true">→</span>
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
}
