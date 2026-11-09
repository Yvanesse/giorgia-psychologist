import type { Metadata } from "next";
import Link from "next/link";

import { LocalPhoto } from "@/components/sections/LocalPhoto";
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

export default function AboutPage() {
  return (
    <main id="main-content">
      <section className="overflow-hidden bg-white pb-14 pt-8 sm:pb-20 sm:pt-12 lg:pb-24 lg:pt-16" id="chi-sono">
        <Container variant="wide">
          <nav aria-label="Percorso di navigazione" className="mb-10 flex items-center gap-2 text-sm text-ink-muted sm:mb-14">
            <Link className="transition-colors hover:text-primary" href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="font-semibold text-ink">Chi sono</span>
          </nav>

          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)] lg:gap-16 xl:gap-24">
            <div className="max-w-[48rem]">
              <p className="section-label">La mia storia</p>
              <h1 className="mt-4 text-[clamp(3.4rem,8vw,6.5rem)] font-semibold leading-[.95] tracking-[-.065em] text-ink">
                Chi sono<span className="text-[#6848ed]">?</span>
              </h1>
              <p className="mt-8 text-xl leading-[1.65] text-ink sm:text-[1.4rem]">
                Sono <strong className="font-semibold">Giorgia Petruzzellis</strong>, psicologa clinica e forense, iscritta all'Albo delle Psicologhe e degli Psicologi della Puglia (n. 8714) e psicoterapeuta in formazione a orientamento sistemico-relazionale.
              </p>
              <div className="mt-7 border-l-[3px] border-[#6848ed] bg-[#f8f6ff] px-5 py-5 text-lg leading-[1.65] text-ink-soft sm:px-7">
                Nel mio lavoro parto da un'idea a cui tengo particolarmente: per comprendere una persona è importante conoscere anche le relazioni, le esperienze e i contesti che hanno contribuito a costruire la sua storia.
              </div>
              <div className="mt-7 flex flex-wrap gap-2">
                <a className="rounded-full border border-border px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-primary hover:text-primary" href="#formazione">
                  La formazione
                </a>
                <a className="rounded-full border border-border px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-primary hover:text-primary" href="#approccio-sistemico">
                  L'approccio
                </a>
                <a className="rounded-full border border-border px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-primary hover:text-primary" href="#percorso-psicologico">
                  Il percorso
                </a>
              </div>
            </div>

            <figure className="mx-auto w-full max-w-[31rem] lg:mx-0 lg:justify-self-end">
              <LocalPhoto
                asset={{
                  src: "/images/giorgia-hero-final.jpg",
                  alt: "Ritratto della Dott.ssa Giorgia Petruzzellis",
                  width: 1086,
                  height: 1448,
                }}
                className="aspect-[3/4] w-full rounded-[2rem] border border-border/70 shadow-[0_20px_60px_rgba(24,24,27,0.07)]"
                placeholder="Giorgia Petruzzellis"
                sizes="(min-width: 1024px) 38vw, 100vw"
              />
              <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-2 px-1 text-sm text-ink-muted">
                <span className="font-semibold text-ink">Giorgia Petruzzellis</span>
                <span>Psicologa clinica e forense · Trani</span>
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      <section className="bg-[#f7f3ff] py-14 sm:py-20">
        <Container variant="wide">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,.65fr)_minmax(0,1.35fr)] lg:gap-16">
            <div className="max-w-md">
              <p className="section-label">Le persone e le loro storie</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-.04em] text-ink sm:text-4xl">
                Uno spazio di ascolto, senza giudizio.
              </h2>
            </div>
            <div className="max-w-3xl space-y-5 text-[1.05rem] leading-8 text-ink-soft sm:text-lg sm:leading-9">
              <p>Credo che ogni difficoltà abbia un significato che merita di essere ascoltato e compreso, senza fermarsi soltanto a ciò che appare in superficie.</p>
              <p>Per questo, attraverso i colloqui psicologici, accompagno le persone, le coppie e le famiglie nell'esplorazione dei propri vissuti emotivi e delle dinamiche relazionali, con l'obiettivo di favorire nuove prospettive, maggiore consapevolezza e possibilità di cambiamento.</p>
              <p>Il mio intento è costruire uno spazio di ascolto autentico, rispettoso e privo di giudizio, nel quale ciascuno possa sentirsi accolto nella propria unicità, riconoscere le proprie risorse e dare un nuovo significato alle esperienze che sta vivendo.</p>
            </div>
          </div>
        </Container>
      </section>

      {editorialSections.map((section, index) => (
        <section
          className={index % 2 === 0 ? "scroll-mt-24 bg-white py-16 sm:py-24" : "scroll-mt-24 bg-[#fcfbff] py-16 sm:py-24"}
          id={section.id}
          key={section.id}
        >
          <Container variant="wide">
            <div className="grid items-start gap-9 lg:grid-cols-[minmax(0,.65fr)_minmax(0,1.35fr)] lg:gap-16">
              <div className="max-w-lg lg:sticky lg:top-32">
                <div className="mb-5 flex items-center gap-3">
                  <span aria-hidden="true" className="flex size-10 items-center justify-center rounded-full border border-primary/20 bg-[#f2edff] text-sm font-semibold text-primary">
                    {section.number}
                  </span>
                  <p className="section-label">{section.label}</p>
                </div>
                <h2 className="text-3xl font-semibold leading-[1.16] tracking-[-.04em] text-ink sm:text-[2.75rem]">
                  {section.title}
                </h2>
              </div>

              <div className="max-w-3xl space-y-5 border-t border-border pt-7 text-[1.05rem] leading-8 text-ink-soft sm:text-lg sm:leading-9 lg:pt-9">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ))}

      <section className="pb-16 pt-5 sm:pb-24 sm:pt-8">
        <Container variant="wide">
          <div className="rounded-[2rem] border border-primary/10 bg-[#f7f3ff] px-6 py-10 sm:px-10 sm:py-14 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:px-14">
            <div className="max-w-2xl">
              <p className="section-label">Il primo passo</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-.04em] text-ink sm:text-[2.6rem]">
                Un percorso inizia da un incontro.
              </h2>
              <p className="mt-4 text-lg leading-8 text-ink-soft">
                Se desideri iniziare un percorso psicologico, puoi richiedere un primo colloquio in presenza a Trani oppure online.
              </p>
            </div>
            <div className="mt-7 shrink-0 lg:mt-0">
              <Button className="w-full sm:w-auto" href="/prenota" size="lg">
                Prenota un primo colloquio <span aria-hidden="true">→</span>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
