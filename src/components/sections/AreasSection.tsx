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
  const frameRef = useRef<number | null>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [scrollIntensity, setScrollIntensity] = useState<number[]>(() => areasContent.items.map(() => 0));
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(hover: none), (pointer: coarse)");
    const syncInputMode = () => setIsTouch(media.matches);

    syncInputMode();
    media.addEventListener?.("change", syncInputMode);

    return () => media.removeEventListener?.("change", syncInputMode);
  }, []);

  useEffect(() => {
    if (!isTouch) {
      setScrollIntensity(areasContent.items.map(() => 0));
      return;
    }

    const updateIntensity = () => {
      frameRef.current = null;
      const viewportCenter = window.innerHeight / 2;
      const influenceRange = window.innerHeight * 0.72;

      const next = cardRefs.current.map((card) => {
        if (!card) return 0;

        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - viewportCenter);
        const raw = Math.max(0, Math.min(1, 1 - distance / influenceRange));

        return raw * raw * (3 - 2 * raw);
      });

      setScrollIntensity(next);
    };

    const requestUpdate = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(updateIntensity);
    };

    updateIntensity();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
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
            const intensity = scrollIntensity[index] ?? 0;
            const isActive = activeIndex === index;
            const cardOpacity = 0.58 + intensity * 0.42;
            const grayOpacity = 0.075 * (1 - intensity);
            const gradientOpacity = 0.18 + intensity * 0.82;

            return (
              <article
                className={`group relative min-h-[32rem] overflow-hidden rounded-[2rem] border border-black/[0.04] p-6 transform-gpu origin-center will-change-[transform,opacity] transition-[transform,box-shadow,border-color,opacity] duration-[1200ms] ease-in-out lg:hover:z-20 lg:hover:scale-[1.045] lg:hover:border-black/[0.07] lg:hover:shadow-[0_30px_80px_rgba(24,24,27,.11)] motion-reduce:transform-none motion-reduce:transition-none sm:p-8 ${style.panel} ${
                  isTouch && isActive ? "z-20 scale-[1.018] shadow-[0_22px_54px_rgba(24,24,27,.08)]" : ""
                }`}
                key={item.title}
                onClick={(event) => {
                  if (!isTouch) return;
                  event.stopPropagation();
                  setActiveIndex((current) => (current === index ? null : index));
                }}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                style={isTouch ? { opacity: cardOpacity, transitionDuration: "180ms,1200ms,1200ms,180ms" } : undefined}
              >
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-3 flex flex-col items-start">
                  {style.words.map((word, wordIndex) => (
                    <span
                      className="relative whitespace-nowrap text-[2.7rem] font-semibold leading-[0.88] tracking-[-0.06em] sm:text-[3.35rem]"
                      key={word}
                    >
                      <span
                        className="block text-black transition-opacity duration-150 lg:text-black/[0.075] lg:opacity-100 lg:transition-[opacity,transform] lg:duration-700 lg:group-hover:-translate-y-1 lg:group-hover:opacity-0 motion-reduce:transform-none"
                        style={isTouch ? { opacity: grayOpacity } : { transitionDelay: `${wordIndex * 90}ms` }}
                      >
                        {word}
                      </span>
                      <span
                        className={`absolute inset-0 block bg-gradient-to-r bg-clip-text text-transparent transition-opacity duration-150 [background-position:0%_50%] [background-size:200%_100%] lg:translate-y-2 lg:opacity-0 lg:transition-[opacity,transform,background-position] lg:duration-[1000ms] lg:[background-position:100%_50%] lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-hover:[background-position:0%_50%] motion-reduce:transform-none ${style.gradient}`}
                        style={
                          isTouch
                            ? { opacity: gradientOpacity }
                            : { transitionDelay: `${120 + wordIndex * 120}ms` }
                        }
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
