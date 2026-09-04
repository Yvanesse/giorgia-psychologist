"use client";

import { useState } from "react";

import { faqContent } from "@/data";
import { Container, Section } from "@/components/ui";
import { SectionHeading } from "./SectionHeading";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section className="bg-surface-muted" id="faq">
      <Container>
        <SectionHeading description={faqContent.description} label={faqContent.label} title={faqContent.title} />
        <div className="mt-10 border-t border-border">
          {faqContent.items.map((item, index) => {
            const open = index === openIndex;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;
            return (
              <div className="border-b border-border" key={item.question}>
                <h3>
                  <button aria-controls={panelId} aria-expanded={open} className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-semibold leading-7 text-ink transition-colors hover:text-primary focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:text-xl" id={buttonId} onClick={() => setOpenIndex(open ? null : index)} type="button">
                    {item.question}
                    <span aria-hidden="true" className="relative size-6 shrink-0"><span className="absolute left-1 top-1/2 h-px w-4 bg-current" /><span className={`absolute left-1 top-1/2 h-px w-4 bg-current transition-transform motion-reduce:transition-none ${open ? "rotate-0" : "rotate-90"}`} /></span>
                  </button>
                </h3>
                <div aria-labelledby={buttonId} className={`grid transition-[grid-template-rows] duration-200 motion-reduce:transition-none ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`} id={panelId} role="region">
                  <div className="overflow-hidden"><p className="max-w-3xl pb-6 text-lg leading-8 text-ink-soft">{item.answer}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
