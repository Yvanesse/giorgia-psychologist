"use client";

import { useEffect, useRef, useState } from "react";

import { approachContent } from "@/data";
import { Container, Heading, Section } from "@/components/ui";

const tones = [
  {
    soft: "bg-[#f3efff]",
    text: "text-[#6848ed]",
    border: "border-[#d8cdfd]",
  },
  {
    soft: "bg-[#fff0eb]",
    text: "text-[#d36e59]",
    border: "border-[#efd0c8]",
  },
  {
    soft: "bg-[#edf6f0]",
    text: "text-[#5d8f6f]",
    border: "border-[#cfe1d5]",
  },
] as const;

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
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotion.matches) {
      setProgress(100);
      return;
    }

    const updateProgress = () => {
      frameRef.current = null;
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportTarget = window.innerHeight * 0.56;
      const start = viewportTarget - rect.top;
      const range = Math.max(rect.height - window.innerHeight * 0.2, 1);
      const next = Math.max(0, Math.min(1, start / range)) * 100;

      setProgress((current) => (Math.abs(current - next) > 0.1 ? next : current));
    };

    const requestUpdate = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
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

          <div className="relative" ref={sectionRef}>
            <div aria-hidden="true" className="absolute bottom-7 left-7 top-7 w-px bg-black/10 sm:left-8">
              <div className="w-full bg-primary" style={{ height: `${progress}%` }} />
              <span
                className="absolute left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-primary shadow-[0_0_0_1px_rgba(91,53,245,.18)]"
                style={{ top: `${progress}%` }}
              />
            </div>

            <div className="relative">
              {approachContent.items.map((item, index) => {
                const tone = tones[index];

                return (
                  <article
                    className="grid grid-cols-[3.5rem_1fr] gap-4 border-b border-black/[0.07] py-8 first:pt-0 last:border-b-0 last:pb-0 sm:grid-cols-[4rem_1fr] sm:gap-6 sm:py-10"
                    key={item.title}
                  >
                    <div className="relative z-10 flex justify-center pt-1">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-full border ${tone.soft} ${tone.text} ${tone.border} sm:h-16 sm:w-16`}>
                        <ApproachIcon index={index} />
                      </div>
                    </div>

                    <div className="pt-1 sm:pt-2">
                      <Heading className={tone.text} variant="h3">
                        {item.title}
                      </Heading>
                      <p className="mt-3 max-w-2xl text-lg leading-7 text-ink-soft sm:text-xl sm:leading-8">
                        {item.description}
                      </p>
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
