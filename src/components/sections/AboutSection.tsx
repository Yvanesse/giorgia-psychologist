"use client";

import { useEffect, useRef, useState } from "react";

import { aboutContent } from "@/data";
import { Container, Heading, Section } from "@/components/ui";

const professionalPath = [
  {
    number: "01",
    title: "Psicologia clinica",
    text: "Il mio percorso professionale parte dalla psicologia clinica, con attenzione al benessere psicologico e al sostegno della persona.",
    accent: "#6848ed",
    soft: "#f7f3ff",
  },
  {
    number: "02",
    title: "Psicoterapia sistemico-relazionale",
    text: "Sto proseguendo la formazione in psicoterapia ad orientamento sistemico-relazionale, approfondendo il ruolo delle relazioni, della famiglia e dei contesti di vita.",
    accent: "#d36e59",
    soft: "#fff3ef",
  },
  {
    number: "03",
    title: "Psicologia giuridica e forense",
    text: "Ho approfondito la Psicologia giuridica e la Neuropsicologia forense, integrando la formazione clinica con competenze specialistiche nei contesti giuridici.",
    accent: "#5d8f6f",
    soft: "#eff7f2",
  },
] as const;

export function AboutSection() {
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const frameRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const updateActiveItem = () => {
      frameRef.current = null;
      const target = window.innerHeight * 0.52;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        const rect = item.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - target);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    const requestUpdate = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(updateActiveItem);
    };

    updateActiveItem();
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
                  const isActive = activeIndex === index;

                  return (
                    <div
                      className="group relative grid cursor-default grid-cols-[2.35rem_minmax(0,1fr)] gap-5 rounded-[1.75rem] px-0 py-5 transition-[background-color,transform] duration-500 sm:grid-cols-[2.6rem_minmax(0,1fr)] sm:gap-7 sm:px-2 sm:py-7 lg:hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
                      key={item.title}
                      onClick={() => setActiveIndex(index)}
                      ref={(node) => {
                        itemRefs.current[index] = node;
                      }}
                      style={{ backgroundColor: isActive ? item.soft : "transparent" }}
                    >
                      <div className="relative z-10 flex justify-center pt-1">
                        <span
                          className="flex h-9 w-9 items-center justify-center rounded-full border bg-white text-xs font-semibold tracking-[0.08em] transition-[border-color,color,box-shadow,transform] duration-500 sm:h-10 sm:w-10"
                          style={{
                            borderColor: isActive ? item.accent : "rgba(24,24,27,.12)",
                            color: isActive ? item.accent : "rgba(24,24,27,.45)",
                            boxShadow: isActive ? `0 0 0 6px ${item.soft}` : "none",
                            transform: isActive ? "scale(1.06)" : "scale(1)",
                          }}
                        >
                          {item.number}
                        </span>
                      </div>

                      <div className="min-w-0 pr-3 sm:pr-6">
                        <h3
                          className="text-2xl font-semibold leading-tight tracking-[-0.035em] transition-colors duration-500 sm:text-[1.8rem]"
                          style={{ color: isActive ? item.accent : "#18181b" }}
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
