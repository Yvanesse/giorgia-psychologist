"use client";

import { useEffect, useRef, useState } from "react";

import { approachContent } from "@/data";
import { Container, Heading, Section } from "@/components/ui";

const tones = [
  {
    soft: "bg-[#f3efff]",
    strong: "bg-[#6848ed]",
    text: "text-[#6848ed]",
    border: "border-[#d8cdfd]",
    rgb: [104, 72, 237],
  },
  {
    soft: "bg-[#fff0eb]",
    strong: "bg-[#d36e59]",
    text: "text-[#d36e59]",
    border: "border-[#efd0c8]",
    rgb: [211, 110, 89],
  },
  {
    soft: "bg-[#edf6f0]",
    strong: "bg-[#5d8f6f]",
    text: "text-[#5d8f6f]",
    border: "border-[#cfe1d5]",
    rgb: [93, 143, 111],
  },
] as const;

const inkRgb = [24, 24, 27] as const;

function mixRgb(from: readonly [number, number, number], to: readonly [number, number, number], amount: number) {
  const channel = (index: 0 | 1 | 2) => Math.round(from[index] + (to[index] - from[index]) * amount);
  return `rgb(${channel(0)}, ${channel(1)}, ${channel(2)})`;
}

function ApproachIcon({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path d="M4 12c2.3-4 5-6 8-6s5.7 2 8 6c-2.3 4-5 6-8 6s-5.7-2-8-6Z" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.7" />
        <path d="M12 8v4l3 2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24">
      <path d="M12 4.5c1.1 3.4 3.1 5.4 6.5 6.5-3.4 1.1-5.4 3.1-6.5 6.5-1.1-3.4-3.1-5.4-6.5-6.5 3.4-1.1 5.4-3.1 6.5-6.5Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
    </svg>
  );
}

export function ApproachSection() {
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const frameRef = useRef<number | null>(null);
  const [scrollIntensity, setScrollIntensity] = useState<number[]>(() => approachContent.items.map(() => 0));
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotion.matches) {
      setScrollIntensity(approachContent.items.map(() => 1));
      setProgress(100);
      return;
    }

    const updateScrollState = () => {
      frameRef.current = null;

      const target = window.innerHeight * 0.52;
      const influenceRange = window.innerHeight * 0.58;
      const centers = itemRefs.current.map((item) => {
        if (!item) return null;
        const rect = item.getBoundingClientRect();
        return rect.top + rect.height / 2;
      });

      const nextIntensity = centers.map((center) => {
        if (center === null) return 0;
        const distance = Math.abs(center - target);
        const raw = Math.max(0, Math.min(1, 1 - distance / influenceRange));
        return raw * raw * (3 - 2 * raw);
      });

      setScrollIntensity((current) => {
        const changed = nextIntensity.some((value, index) => Math.abs(value - (current[index] ?? 0)) > 0.004);
        return changed ? nextIntensity : current;
      });

      const validCenters = centers.filter((center): center is number => center !== null);
      if (validCenters.length > 1) {
        const first = validCenters[0];
        const last = validCenters[validCenters.length - 1];
        const nextProgress = Math.max(0, Math.min(1, (target - first) / (last - first))) * 100;
        setProgress((current) => (Math.abs(current - nextProgress) > 0.15 ? nextProgress : current));
      }
    };

    const requestUpdate = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <Section className="bg-white" id="approccio" spacing="compact">
      <Container variant="wide">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div className="max-w-2xl lg:sticky lg:top-28 lg:self-start">
            <p className="section-label">{approachContent.label}</p>
            <Heading className="mt-3" variant="h2">
              {approachContent.title}
            </Heading>
            <p className="mt-4 max-w-xl text-lg leading-7 text-ink-soft sm:text-xl sm:leading-8">
              {approachContent.description}
            </p>
          </div>

          <div className="relative">
            <div aria-hidden="true" className="absolute bottom-8 left-7 top-8 w-px overflow-hidden bg-black/10">
              <div className="w-full bg-primary will-change-[height]" style={{ height: `${progress}%` }} />
            </div>

            <div className="relative">
              {approachContent.items.map((item, index) => {
                const tone = tones[index];
                const intensity = scrollIntensity[index] ?? 0;
                const headingColor = mixRgb(inkRgb, tone.rgb, intensity);

                return (
                  <article
                    className="grid grid-cols-[3.5rem_1fr] gap-4 py-7 first:pt-0 last:pb-0 sm:grid-cols-[4rem_1fr] sm:gap-6 sm:py-9"
                    key={item.title}
                    ref={(node) => {
                      itemRefs.current[index] = node;
                    }}
                  >
                    <div className="relative z-10 flex justify-center pt-1">
                      <div
                        className={`relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border ${tone.soft} ${tone.text} ${tone.border} will-change-transform sm:h-16 sm:w-16`}
                        style={{ transform: `scale(${1 + intensity * 0.05})` }}
                      >
                        <div aria-hidden="true" className={`absolute inset-0 rounded-full ${tone.strong}`} style={{ opacity: intensity }} />
                        <div className="relative h-6 w-6">
                          <span className="absolute inset-0" style={{ opacity: 1 - intensity }}>
                            <ApproachIcon index={index} />
                          </span>
                          <span className="absolute inset-0 text-white" style={{ opacity: intensity }}>
                            <ApproachIcon index={index} />
                          </span>
                        </div>
                      </div>
                    </div>

                    <div
                      className="relative overflow-hidden rounded-[1.5rem] px-5 py-5 will-change-transform sm:px-7 sm:py-6"
                      style={{ transform: `translate3d(${intensity * 4}px, 0, 0)` }}
                    >
                      <div aria-hidden="true" className={`absolute inset-0 rounded-[1.5rem] ${tone.soft}`} style={{ opacity: intensity }} />
                      <div className="relative">
                        <Heading variant="h3">
                          <span style={{ color: headingColor }}>{item.title}</span>
                        </Heading>
                        <p className="mt-3 max-w-2xl text-lg leading-7 text-ink-soft sm:text-xl sm:leading-8">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
