import { Container, Heading, Section } from "@/components/ui";

const reviews = [
  {
    author: "D.S.",
    date: "17 agosto 2026",
    text: "Mi ha ascoltato con attenzione.",
  },
  {
    author: "D.A.",
    date: "14 settembre 2026",
    text: "Empatia e gentilezza.",
  },
  {
    author: "AR",
    date: "26 marzo 2026",
    text: "Mi sono sentita a mio agio.",
  },
] as const;

const mioDottoreUrl = "https://www.miodottore.it/profilo/giorgia-petruzzellis";

export function ReviewsSection() {
  return (
    <Section className="bg-white" spacing="compact">
      <Container variant="wide">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div className="max-w-2xl">
            <p className="section-label">Recensioni</p>
            <Heading className="mt-3" variant="h2">
              Le esperienze dei pazienti
            </Heading>
            <p className="mt-4 max-w-xl text-lg leading-7 text-ink-soft sm:text-xl sm:leading-8">
              Alcuni riscontri pubblicati e verificati su MioDottore.
            </p>

            <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-border bg-surface-muted px-4 py-2.5">
              <span className="font-semibold text-ink">5,0 / 5</span>
              <span aria-hidden="true" className="text-amber-500">★★★★★</span>
              <span className="text-sm text-ink-muted">17 recensioni</span>
            </div>

            <a
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full border-[1.5px] border-black px-5 font-semibold text-ink transition-colors hover:bg-surface-muted hover:text-primary"
              href={mioDottoreUrl}
              rel="noreferrer"
              target="_blank"
            >
              Leggi tutte le recensioni su MioDottore
              <span aria-hidden="true" className="ml-2">↗</span>
            </a>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {reviews.map((review, index) => {
              const tones = [
                "border-[#d8cdfd] bg-[#f6f3ff]",
                "border-[#efd0c8] bg-[#fff3ef]",
                "border-[#cfe1d5] bg-[#f1f7f3]",
              ] as const;

              return (
                <article
                  className={`flex min-h-[13rem] flex-col justify-between rounded-[1.6rem] border p-6 ${tones[index]}`}
                  key={review.author}
                >
                  <div>
                    <div aria-label="5 stelle su 5" className="text-sm tracking-[0.08em] text-amber-500">
                      ★★★★★
                    </div>
                    <blockquote className="mt-5 text-xl font-medium leading-8 tracking-[-0.02em] text-ink">
                      “{review.text}”
                    </blockquote>
                  </div>
                  <div className="mt-8 border-t border-black/10 pt-4">
                    <p className="font-semibold text-ink">{review.author}</p>
                    <p className="mt-1 text-sm text-ink-muted">{review.date}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                      Recensione verificata su MioDottore
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
