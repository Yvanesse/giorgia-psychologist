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
  },
  {
    soft: "bg-[#fff0eb]",
    strong: "bg-[#d36e59]",
    text: "text-[#d36e59]",
    border: "border-[#efd0c8]",
  },
  {
    soft: "bg-[#edf6f0]",
    strong: "bg-[#5d8f6f]",
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
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
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

  const progress = approachContent.items.length > 1 ? (activeIndex / (approachContent.items.length - 1)) * 100 : 100;

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
            <div aria-hidden="true" className="absolute bottom-8 left-7 top-8 w-px bg-black/10">
              <div
                className="w-full bg-primary transition-[height] duration-500 ease-out"
                style={{ height: `${progress}%` }}
              />
            </div>

            <div className="relative">
              {approachContent.items.map((item, index) => {
                const tone = tones[index];
                const isActive = activeIndex === index;

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
                        className={`flex h-14 w-14 items-center justify-center rounded-full border transition-[background-color,color,border-color,transform] duration-500 sm:h-16 sm:w-16 ${tone.border} ${
                          isActive ? `${tone.strong} scale-105 border-transparent text-white` : `${tone.soft} ${tone.text}`
                        }`}
                      >
                        <ApproachIcon index={index} />
                      </div>
                    </div>

                    <div
                      className={`rounded-[1.5rem] px-5 py-5 transition-[background-color,transform] duration-500 sm:px-7 sm:py-6 ${
                        isActive ? `${tone.soft} translate-x-1` : "bg-transparent"
                      }`}
                    >
                      <Heading className={isActive ? tone.text : "text-ink"} variant="h3">
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
