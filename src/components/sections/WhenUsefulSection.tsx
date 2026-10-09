"use client";

import { useState } from "react";

import { Container, Heading, Section } from "@/components/ui";
import { whenUsefulContent } from "@/data/whenUseful";

const rowStyles = [
  { accent: "text-[#6848ed]", iconBg: "bg-[#f3efff]" },
  { accent: "text-[#d36e59]", iconBg: "bg-[#fff0ec]" },
  { accent: "text-[#5d8f6f]", iconBg: "bg-[#edf6f0]" },
  { accent: "text-[#7b6aa8]", iconBg: "bg-[#f2eff8]" },
] as const;

function ContextIcon({ index }: { index: number }) {
  const common = {
    width: 30,
    height: 30,
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (index === 0) {
    return (
      <svg {...common}>
        <path d="M6.5 8.5h11a4 4 0 0 1 4 4v3a4 4 0 0 1-4 4h-5.3L8 23v-3.5H6.5a4 4 0 0 1-4-4v-3a4 4 0 0 1 4-4Z" />
        <path d="M20.5 12.5h5a4 4 0 0 1 4 4v2.5a4 4 0 0 1-4 4H24V26l-3.8-3" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg {...common}>
        <path d="M3 17c3.2-6 5.8 6 9 0s5.8-6 9 0 5.8 6 8 0" />
        <path d="M6 9.5c2.1-2 4.1-3 6-3" />
        <path d="M20 25.5c2.2-.3 4.2-1.2 6-2.8" />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg {...common}>
        <path d="M16 26V9" />
        <path d="M16 16c-5.2 0-8.5-2.6-9.5-7.5C11.8 7.8 15 9.9 16 16Z" />
        <path d="M16 13c4.8 0 7.7-2.4 8.8-6.8-4.8-.5-7.8 1.4-8.8 6.8Z" />
        <path d="M11 27h10" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M7 9.5c4.8-4.8 13.2-4.8 18 0" />
      <path d="M6.5 22.5c5 4.7 13.5 4.7 18.5 0" />
      <path d="m11 13 3.2 3.2L11 19.5" />
      <path d="m21 13-3.2 3.2 3.2 3.3" />
      <circle cx="16" cy="16" r="11.5" />
    </svg>
  );
}

export function WhenUsefulSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section className="bg-[#fbfaf7]" id="quando-puo-aiutare" spacing="compact">
      <Container variant="wide">
        <div className="grid gap-6 border-y border-black/10 py-10 sm:gap-8 sm:py-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 lg:py-14">
          <div className="max-w-2xl">
            <p className="section-label">{whenUsefulContent.label}</p>
            <Heading className="mt-3" variant="h2">
              {whenUsefulContent.title}
            </Heading>
            <p className="mt-4 max-w-xl text-lg leading-7 text-ink-soft sm:text-xl sm:leading-8">
              {whenUsefulContent.description}
            </p>
          </div>

          <div>
            <div className="divide-y divide-black/10 border-t border-black/10">
              {whenUsefulContent.items.map((item, index) => {
                const style = rowStyles[index];
                const isOpen = openIndex === index;
                const panelId = `when-useful-panel-${index}`;
                const buttonId = `when-useful-button-${index}`;

                return (
                  <div className="py-2 sm:py-3" key={item.title}>
                    <button
                      aria-controls={panelId}
                      aria-expanded={isOpen}
                      className="group flex w-full items-center gap-4 py-4 text-left sm:gap-5 sm:py-5"
                      id={buttonId}
                      onClick={() => setOpenIndex((current) => (current === index ? null : index))}
                      type="button"
                    >
                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full sm:h-16 sm:w-16 ${style.iconBg} ${style.accent}`}
                      >
                        <ContextIcon index={index} />
                      </div>

                      <p className="max-w-3xl flex-1 text-[1.4rem] font-semibold leading-[1.18] tracking-[-0.03em] text-ink sm:text-[1.75rem] lg:text-[2rem]">
                        {item.title}
                      </p>

                      <span
                        aria-hidden="true"
                        className={`ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 text-2xl font-light text-ink transition-transform duration-300 sm:h-11 sm:w-11 ${isOpen ? "rotate-45" : ""}`}
                      >
                        +
                      </span>
                    </button>

                    <div
                      aria-labelledby={buttonId}
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                      id={panelId}
                      role="region"
                    >
                      <div className="overflow-hidden">
                        <p className="pb-5 pl-[4.5rem] pr-2 text-base leading-7 text-ink-soft sm:pb-6 sm:pl-[5.25rem] sm:pr-12 sm:text-lg sm:leading-8">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 sm:mt-12">
              <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#f7f3ff_0%,#fff_58%,#f4f8f5_100%)] px-7 py-9 sm:px-10 sm:py-11">
                <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full border-[24px] border-[#6848ed]/[0.06]" />
                <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-10 h-px w-40 bg-gradient-to-r from-[#6848ed]/50 to-transparent sm:w-56" />

                <div className="relative z-10 max-w-3xl">
                  <div aria-hidden="true" className="mb-3 text-[3rem] font-semibold leading-none tracking-[-0.06em] text-[#6848ed]/30 sm:text-[4rem]">
                    “
                  </div>
                  <p className="text-[1.45rem] font-semibold leading-[1.18] tracking-[-0.03em] text-ink sm:text-[1.8rem] lg:text-[2rem]">
                    {whenUsefulContent.closing}
                  </p>
                  <p className="mt-3 text-[1.15rem] leading-8 text-ink-soft sm:text-[1.3rem] sm:leading-9">
                    A volte le domande emergono lungo il percorso.
                  </p>
                  <p className="mt-5 inline-flex items-center gap-3 text-[1.35rem] font-semibold tracking-[-0.025em] text-[#6848ed] sm:text-[1.6rem]">
                    <span aria-hidden="true" className="h-px w-8 bg-[#6848ed]/50 sm:w-10" />
                    Cerchiamole insieme.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
