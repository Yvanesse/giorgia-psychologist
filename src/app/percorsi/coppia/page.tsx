import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Supporto psicologico di coppia | Giorgia Petruzzellis",
  description:
    "Quando può essere utile un percorso psicologico di coppia, come partecipare ai colloqui e cosa aspettarsi. È possibile iniziare anche da soli.",
  alternates: { canonical: "/percorsi/coppia" },
  openGraph: {
    title: "Supporto psicologico di coppia | Giorgia Petruzzellis",
    description:
      "Uno spazio per comprendere le dinamiche della relazione e ritrovare modalità di dialogo.",
    url: "/percorsi/coppia",
    images: ["/images/coppia-filo-rosso.webp"],
  },
};

const helpfulMoments = [
  {
    number: "01",
    title: "Difficoltà di comunicazione",
    description: "Fatica a capirsi, ascoltarsi o esprimere i propri bisogni.",
    color: "border-[#f5ddd6] bg-[#fff0eb]",
    numberColor: "bg-white/75 text-[#bc604b]",
  },
  {
    number: "02",
    title: "Conflitti ricorrenti",
    description: "Discussioni che si ripetono e sembrano bloccare il dialogo.",
    color: "border-[#e3dafb] bg-[#f4efff]",
    numberColor: "bg-white/75 text-primary-strong",
  },
  {
    number: "03",
    title: "Distanza emotiva",
    description: "La sensazione di essere più lontani, con meno intimità e condivisione.",
    color: "border-[#dce9df] bg-[#eff7f1]",
    numberColor: "bg-white/75 text-[#4f8060]",
  },
  {
    number: "04",
    title: "Cambiamenti importanti",
    description: "Convivenza, genitorialità o altre transizioni che modificano gli equilibri.",
    color: "border-[#f5e6d1] bg-[#fff5e8]",
    numberColor: "bg-white/75 text-[#ae7134]",
  },
] as const;

const steps = [
  {
    title: "Si parte dall’ascolto",
    description:
      "Ognuno può raccontare ciò che vive, senza dover dare una versione perfetta della relazione.",
  },
  {
    title: "Non si cerca chi ha ragione",
    description:
      "Il colloquio non è una gara: si osservano modalità di comunicazione, bisogni e punti di vista.",
  },
  {
    title: "Si concordano gli obiettivi",
    description:
      "Si definiscono insieme i temi su cui lavorare e i passi possibili, rispettando i tempi di ciascuno.",
  },
] as const;

const bookingUrl = "/prenota?service=coppia";

function BookingLink({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-[1.5px] border-black bg-primary px-6 font-semibold text-white transition-colors hover:bg-primary-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${compact ? "text-base" : "min-h-14 text-[1.05rem] sm:px-7 sm:text-lg"}`}
      href={bookingUrl}
      style={{ color: "#ffffff" }}
    >
      Prenota un primo colloquio <span aria-hidden="true">→</span>
    </Link>
  );
}

export default function CoupleSupportPage() {
  return (
    <main className="w-full overflow-x-hidden bg-white" id="main-content">
      <section className="hero-surface border-b border-border/60 py-7 sm:py-12 lg:py-14">
        <Container variant="wide">
          <div className="grid items-center gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
            <div className="max-w-2xl">
              <p className="section-label">Percorso di coppia</p>
              <h1 className="mt-4 text-[2.65rem] font-semibold leading-[1.04] tracking-[-0.052em] text-ink min-[390px]:text-5xl sm:text-[3.5rem] lg:text-[4.4rem]">
                Uno spazio per comprendersi, ascoltarsi e ritrovarsi.
              </h1>
              <p className="mt-5 max-w-xl text-[1.15rem] leading-8 text-ink-soft sm:text-[1.35rem]">
                Un percorso psicologico per comprendere le difficoltà nella relazione, migliorare il dialogo e affrontare i cambiamenti con maggiore consapevolezza.
              </p>
              <div className="mt-6 sm:mt-8">
                <BookingLink />
              </div>
            </div>

            <figure className="relative overflow-hidden rounded-[2rem] bg-[#4f2f29]">
              <Image
                alt="Due persone tengono tra le mani un filo rosso, simbolo del dialogo nella relazione."
                className="h-auto w-full"
                height={467}
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                src="/images/coppia-filo-rosso.webp"
                width={700}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-5 pb-5 pt-20 sm:px-8 sm:pb-7">
                <p className="max-w-md text-xl font-semibold leading-snug text-white sm:text-2xl" style={{ color: "#ffffff" }}>
                  Comunicare meglio è già un primo passo.
                </p>
              </div>
            </figure>
          </div>
        </Container>
      </section>

      <section className="bg-[#fbfaf8] py-10 sm:py-12" id="quando-puo-essere-utile">
        <Container variant="wide">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end sm:gap-7">
            <h2 className="max-w-xl text-3xl font-medium leading-tight tracking-[-0.03em] text-ink sm:text-5xl">
              Quando può essere utile
            </h2>
            <p className="max-w-xl text-base leading-7 text-ink-soft sm:text-lg">
              Un percorso può essere utile in diverse fasi della relazione, non solo nei momenti di crisi.
            </p>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4 lg:grid-cols-4">
            {helpfulMoments.map((item) => (
              <article className={`min-w-0 rounded-[1.35rem] border p-4 sm:rounded-[1.65rem] sm:p-6 ${item.color}`} key={item.title}>
                <span aria-hidden="true" className={`inline-flex size-10 items-center justify-center rounded-full text-xs font-semibold sm:size-12 sm:text-sm ${item.numberColor}`}>
                  {item.number}
                </span>
                <h3 className="mt-4 text-lg font-semibold leading-tight tracking-[-0.025em] text-ink sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft sm:text-base sm:leading-7">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-12" id="come-si-svolge">
        <Container variant="wide">
          <div className="grid items-center gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
            <div>
              <h2 className="text-3xl font-medium leading-tight tracking-[-0.03em] text-ink sm:text-5xl">
                Come si svolge
              </h2>
              <ol className="mt-6 divide-y divide-border">
                {steps.map((step, index) => (
                  <li className="flex items-start gap-4 py-4 first:pt-0" key={step.title}>
                    <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f0eaff] text-sm font-semibold text-primary-strong">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold leading-snug text-ink sm:text-xl">{step.title}</h3>
                      <p className="mt-1 text-base leading-7 text-ink-soft">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <Image
              alt="Due partner si confrontano con attenzione durante una conversazione."
              className="h-auto w-full rounded-[1.7rem]"
              height={510}
              sizes="(min-width: 1024px) 50vw, 100vw"
              src="/images/coppia-dialogo.webp"
              width={680}
            />
          </div>
        </Container>
      </section>

      <section className="pb-8 sm:pb-10" id="iniziare-da-soli">
        <Container variant="wide">
          <div className="grid items-center gap-5 rounded-[1.75rem] border border-[#dce9df] bg-[#eff5ec] p-4 sm:grid-cols-[minmax(220px,0.65fr)_1fr] sm:gap-8 sm:p-5 lg:grid-cols-[minmax(260px,0.48fr)_1fr]">
            <Image
              alt="Una persona partecipa a un colloquio di ascolto individuale."
              className="h-auto w-full rounded-[1.2rem]"
              height={400}
              sizes="(min-width: 1024px) 34vw, (min-width: 640px) 40vw, 100vw"
              src="/images/coppia-colloquio-individuale.webp"
              width={600}
            />
            <div className="py-1 sm:pr-5">
              <h2 className="text-3xl font-medium leading-tight tracking-[-0.03em] text-ink sm:text-4xl">
                Si può iniziare anche da soli?
              </h2>
              <p className="mt-3 text-base leading-7 text-ink-soft sm:text-lg sm:leading-8">
                Non per forza. È possibile cominciare la terapia anche senza l'altra metà della coppia, e farla intervenire in un secondo momento.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-12 pt-5 sm:pb-16 sm:pt-7" id="cosa-aspettarsi">
        <Container variant="wide">
          <div className="grid items-start gap-5 border-t border-border pt-7 lg:grid-cols-[0.65fr_1.3fr_auto] lg:items-center lg:gap-10">
            <h2 className="text-3xl font-medium leading-tight tracking-[-0.03em] text-ink sm:text-5xl">
              Cosa aspettarsi
            </h2>
            <p className="max-w-3xl text-base leading-7 text-ink-soft sm:text-lg sm:leading-8">
              Un ambiente di ascolto rispettoso, senza giudizi né risultati prestabiliti. Il primo incontro aiuta a chiarire la richiesta; obiettivi, frequenza e modalità vengono valutati insieme. I colloqui durano 55 minuti e sono disponibili in presenza o online.
            </p>
            <div className="lg:justify-self-end">
              <BookingLink compact />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
