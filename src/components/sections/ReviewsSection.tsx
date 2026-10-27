"use client";

import { useEffect, useState } from "react";

import { Container, Section } from "@/components/ui";

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

function MioDottoreMark() {
  return (
    <div className="inline-flex items-center gap-2.5" aria-label="MioDottore">
      <span className="flex size-8 items-center justify-center rounded-full bg-[#4E8DE9] text-white shadow-sm">
        <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeLinecap="round" strokeWidth="2.4" />
        </svg>
      </span>
      <span className="text-[1.05rem] font-semibold tracking-[-0.025em] text-[#07252B]">
        MioDottore
      </span>
    </div>
  );
}

export function ReviewsSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % reviews.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, []);

  const review = reviews[active];

  const goPrevious = () => {
    setActive((current) => (current - 1 + reviews.length) % reviews.length);
  };

  const goNext = () => {
    setActive((current) => (current + 1) % reviews.length);
  };

  return (
    <Section className="bg-white !py-5 sm:!py-6">
      <Container variant="wide">
        <div className="overflow-hidden rounded-[1.4rem] border border-[#dce7f5] bg-[#f8fbff] px-5 py-4 sm:px-6 sm:py-5">
          <div className="grid items-center gap-4 lg:grid-cols-[auto_1fr_auto] lg:gap-7">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <MioDottoreMark />
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold text-ink">5,0</span>
                <span aria-label="5 stelle su 5" className="tracking-[0.04em] text-amber-500">★★★★★</span>
                <span className="text-ink-muted">17 recensioni</span>
              </div>
            </div>

            <div className="min-w-0 border-y border-black/[0.06] py-4 lg:border-x lg:border-y-0 lg:px-7 lg:py-1">
              <blockquote
                className="text-[1.05rem] font-medium leading-7 tracking-[-0.015em] text-ink sm:text-lg"
                key={active}
              >
                “{review.text}”
              </blockquote>
              <div className="mt-1.5 flex items-center gap-2 text-sm text-ink-muted">
                <span className="font-semibold text-ink-soft">{review.author}</span>
                <span aria-hidden="true">·</span>
                <span>{review.date}</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 lg:justify-end">
              <div className="flex items-center gap-1.5">
                {reviews.map((item, index) => (
                  <button
                    aria-label={`Mostra recensione ${index + 1}`}
                    className={`h-2 rounded-full transition-all ${index === active ? "w-5 bg-[#4E8DE9]" : "w-2 bg-[#b9cce8]"}`}
                    key={item.author}
                    onClick={() => setActive(index)}
                    type="button"
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  aria-label="Recensione precedente"
                  className="flex size-9 items-center justify-center rounded-full border border-black/10 bg-white text-ink transition hover:border-[#4E8DE9] hover:text-[#4E8DE9]"
                  onClick={goPrevious}
                  type="button"
                >
                  ←
                </button>
                <button
                  aria-label="Recensione successiva"
                  className="flex size-9 items-center justify-center rounded-full border border-black/10 bg-white text-ink transition hover:border-[#4E8DE9] hover:text-[#4E8DE9]"
                  onClick={goNext}
                  type="button"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          <div className="mt-3 flex justify-end">
            <a
              className="text-xs font-semibold text-[#4E8DE9] underline-offset-4 hover:underline"
              href={mioDottoreUrl}
              rel="noreferrer"
              target="_blank"
            >
              Leggi tutte su MioDottore ↗
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
