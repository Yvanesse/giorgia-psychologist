"use client";

import { useEffect, useRef, useState } from "react";

import { areasContent } from "@/data";
import { Container, Heading, Section } from "@/components/ui";
import { SectionHeading } from "./SectionHeading";

const areaStyles = [
  {
    panel: "bg-[#f7f3ff]",
    accent: "text-[#6848ed]",
    chip: "border-[#ddcffd] bg-white/80 text-[#5d3ed7]",
    gradient: "from-[#a58cff] via-[#6547ef] to-[#d1c4ff]",
    words: ["ANSIA", "AUTOSTIMA", "CAMBIAMENTO"],
  },
  {
    panel: "bg-[#fff3ef]",
    accent: "text-[#d36e59]",
    chip: "border-[#f0d1c8] bg-white/80 text-[#b95a48]",
    gradient: "from-[#f6a18d] via-[#d96a55] to-[#ffd0c4]",
    words: ["COPPIA", "DIALOGO", "RELAZIONI"],
  },
  {
    panel: "bg-[#eff7f2]",
    accent: "text-[#5d8f6f]",
    chip: "border-[#d0e4d6] bg-white/80 text-[#4f7b60]",
    gradient: "from-[#8fc3a1] via-[#4f8b66] to-[#c9e7d3]",
    words: ["CONTESTI", "VALUTAZIONE", "FORENSE"],
  },
] as const;

export function AreasSection() {
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const [isTouch, setIsTouch] = useState(false);
  const [revealed, setRevealed] = useState<boolean[]>(() => areasContent.items.map(() => false));
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(hover: none), (pointer: coarse)");
    const syncInputMode = () => setIsTouch(media.matches);

    syncInputMode();
    media.addEventListener?.("change", syncInputMode);

    return () => media.removeEventListener?.("change", syncInputMode);
  }, []);

  useEffect(() => {
    if (!isTouch) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const index = Number((entry.target as HTMLElement).dataset.areaIndex);
          setRevealed((current) => {
            if (current[index]) return current;
            const next = [...current];
            next[index] = true;
            return next;
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.55, rootMargin: "0px 0px -12% 0px" },
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [isTouch]);

  return (
    <Section id="ambiti">
      <Container variant="wide">
        <SectionHeading label={areasContent.label} title={areasContent.title} />

        <div
          className="mt-10 grid gap-4 lg:mt-12 lg:grid-cols-3"
          onClick={() => {
            if (isTouch) setActiveIndex(null);
          }}
        >
          {areasContent.items.map((item, index) => {
            const style = areaStyles[index];
            const isRevealed = revealed[index];
            const isActive = activeIndex === index;

            return (
              <article
                className={`group relative min-h-[32rem] overflow-hidden rounded-[2rem] border border-black/[0.04] p-6 transform-gpu origin-center will-change-transform transition-[transform,box-shadow,border-color] duration-[1200ms] ease-in-out lg:hover:z-20 lg:hover:scale-[1.045] lg:hover:border-black/[0.07] lg:hover:shadow-[0_30px_80px_rgba(24,24,27,.11)] motion-reduce:transform-none motion-reduce:transition-none sm:p-8 ${style.panel} ${
                  isTouch && isActive ? "z-20 scale-[1.018] shadow-[0_22px_54px_rgba(24,24,27,.08)]" : ""
                }`}
                data-area-index={index}
                key={item.title}
                onClick={(event) => {
                  if (!isTouch) return;
                  event.stopPropagation();
                  setActiveIndex((current) => (current === index ? null : index));
                }}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
              >
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-3 flex flex-col items-start">
                  {style.words.map((word, wordIndex) => (
                    <span
                      className="relative whitespace-nowrap text-[2.7rem] font-semibold leading-[0.88] tracking-[-0.06em] sm:text-[3.35rem]"
                      key={word}
                    >
                      <span
                        className={`block text-black/[0.075] transition-[opacity,transform] duration-700 lg:group-hover:-translate-y-1 lg:group-hover:opacity-0 motion-reduce:transform-none ${
                          isTouch && isRevealed ? "-translate-y-1 opacity-0" : ""
                        }`}
                        style={{ transitionDelay: `${wordIndex * 90}ms` }}
                      >
                        {word}
                      </span>
                      <span
                        className={`absolute inset-0 block translate-y-2 bg-gradient-to-r bg-clip-text text-transparent opacity-0 transition-[opacity,transform,background-position] duration-[1000ms] [background-position:100%_50%] [background-size:200%_100%] lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-hover:[background-position:0%_50%] motion-reduce:transform-none ${style.gradient} ${
                          isTouch && isRevealed
                            ? "translate-y-0 opacity-100 [background-position:0%_50%]"
                            : ""
                        }`}
                        style={{ transitionDelay: `${120 + wordIndex * 120}ms` }}
                      >
                        {word}
                      </span>
                    </span>
                  ))}
                </div>

                <div className="relative z-10 flex h-full flex-col">
                  <div className={`text-base font-semibold uppercase tracking-[0.16em] ${style.accent}`}>
                    0{index + 1}
                  </div>
                  <Heading className="mt-5 max-w-sm" variant="h3">{item.title}</Heading>
                  <p className="mt-5 max-w-md text-lg leading-8 text-ink-soft sm:text-xl sm:leading-9">{item.description}</p>

                  <div className="mt-7 flex flex-wrap gap-2.5">
                    {item.topics.map((topic) => (
                      <span className={`rounded-full border px-4 py-2 text-base font-medium leading-6 sm:text-[1.05rem] ${style.chip}`} key={topic}>
                        {topic}
                      </span>
                    ))}
                  </div>

                  {item.note ? <p className="mt-auto pt-7 text-base leading-7 text-ink-muted">{item.note}</p> : <div className="mt-auto" />}
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
