"use client";

import { useEffect, useRef, useState } from "react";

import { aboutContent } from "@/data";
import { Container, Heading, Section } from "@/components/ui";

const professionalPath = [
  {
    number: "01",
    title: "Psicologia clinica",
    text: "Il mio percorso professionale parte dalla psicologia clinica, con attenzione al benessere psicologico e al sostegno della persona.",
    accent: [104, 72, 237] as const,
  },
  {
    number: "02",
    title: "Psicoterapia sistemico-relazionale",
    text: "Sto proseguendo la formazione in psicoterapia ad orientamento sistemico-relazionale, approfondendo il ruolo delle relazioni, della famiglia e dei contesti di vita.",
    accent: [211, 110, 89] as const,
  },
  {
    number: "03",
    title: "Psicologia giuridica e forense",
    text: "Ho approfondito la Psicologia giuridica e la Neuropsicologia forense, integrando la formazione clinica con competenze specialistiche nei contesti giuridici.",
    accent: [93, 143, 111] as const,
  },
] as const;

const baseInk = [24, 24, 27] as const;
const mutedInk = [113, 113, 122] as const;
const borderNeutral = [212, 212, 216] as const;

type Rgb = readonly [number, number, number];

function mixRgb(from: Rgb, to: Rgb, amount: number) {
  const t = Math.max(0, Math.min(1, amount));
  const channels = from.map((value, index) => Math.round(value + (to[index] - value) * t));
  return `rgb(${channels.join(", ")})`;
}

export function AboutSection() {
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const frameRef = useRef<number | null>(null);
  const [scrollIntensity, setScrollIntensity] = useState<number[]>(() => professionalPath.map(() => 0));

  useEffect(() => {
    const updateIntensity = () => {
      frameRef.current = null;
      const target = window.innerHeight * 0.52;
      const influenceRange = window.innerHeight * 0.72;

      const next = itemRefs.current.map((item) => {
        if (!item) return 0;

        const rect = item.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - target);
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
  }, []);

  return (
    <Section id="chi-sono" spacing="compact">
      <Container variant="wide">
        <div className="border-y border-border/80 py-12 sm:py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,.72fr)_minmax(0,1.28fr)] lg:gap-24">
            <div className="max-w-xl lg:sticky lg:top-28 lg:self-start">
              <p className="section-label">{aboutContent.label}</p>
              <Heading className="mt-3" variant="h2">
                {aboutContent.name}
              </Heading>
              <p className="mt-5 max-w-xl text-lg font-medium leading-8 text-ink-soft sm:text-xl sm:leading-9">
                {aboutContent.role}
              </p>
            </div>

            <div className="relative max-w-4xl">
              <div aria-hidden="true" className="absolute bottom-5 left-[1.15rem] top-5 w-px bg-border sm:left-[1.3rem]" />

              <div className="space-y-5 sm:space-y-7">
                {professionalPath.map((item, index) => {
                  const intensity = scrollIntensity[index] ?? 0;
                  const titleColor = mixRgb(baseInk, item.accent, intensity * 0.94);
                  const numberColor = mixRgb(mutedInk, item.accent, intensity);
                  const borderColor = mixRgb(borderNeutral, item.accent, intensity * 0.9);

                  return (
                    <div
                      className="group relative grid cursor-default grid-cols-[2.35rem_minmax(0,1fr)] gap-5 rounded-[1.75rem] px-0 py-5 transition-transform duration-700 sm:grid-cols-[2.6rem_minmax(0,1fr)] sm:gap-7 sm:px-2 sm:py-7 lg:hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
                      key={item.title}
                      ref={(node) => {
                        itemRefs.current[index] = node;
                      }}
                      style={{
                        backgroundColor: `rgba(${item.accent.join(", ")}, ${0.012 + intensity * 0.105})`,
                      }}
                    >
                      <div className="relative z-10 flex justify-center pt-1">
                        <span
                          className="flex h-9 w-9 items-center justify-center rounded-full border bg-white text-xs font-semibold tracking-[0.08em] sm:h-10 sm:w-10"
                          style={{
                            borderColor,
                            color: numberColor,
                            boxShadow: `0 0 0 ${Math.round(intensity * 6)}px rgba(${item.accent.join(", ")}, ${intensity * 0.11})`,
                            transform: `scale(${1 + intensity * 0.055})`,
                          }}
                        >
                          {item.number}
                        </span>
                      </div>

                      <div className="min-w-0 pr-3 sm:pr-6">
                        <h3
                          className="text-2xl font-semibold leading-tight tracking-[-0.035em] sm:text-[1.8rem]"
                          style={{ color: titleColor }}
                        >
                          {item.title}
                        </h3>
                        <p className="mt-3 max-w-2xl text-[1.05rem] leading-8 text-ink-soft sm:mt-4 sm:text-lg sm:leading-8">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
