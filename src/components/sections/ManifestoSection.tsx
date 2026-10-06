import { aboutContent, manifestoLabel } from "@/data";
import { Container, Section } from "@/components/ui";

export function ManifestoSection() {
  return (
    <Section id="chi-sono" spacing="compact">
      <Container variant="wide">
        <div className="relative overflow-hidden rounded-[2rem] border border-primary/10 bg-[#f7f3ff] px-6 py-9 sm:px-10 sm:py-11 lg:grid lg:grid-cols-[minmax(0,.72fr)_minmax(0,1.28fr)] lg:items-center lg:gap-16 lg:px-14 lg:py-12">
          <div aria-hidden="true" className="pointer-events-none absolute -right-7 top-7 h-20 w-20 rounded-full bg-[#d36e59]/10 sm:h-24 sm:w-24" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-8 -left-8 h-24 w-24 rounded-full border-[13px] border-[#5d8f6f]/12 sm:h-28 sm:w-28 sm:border-[15px]" />
          <div aria-hidden="true" className="pointer-events-none absolute right-7 bottom-8 h-px w-20 rotate-[-14deg] bg-[#6848ed]/25 sm:w-28 lg:right-12" />

          <div className="relative z-10 max-w-xl">
            <p className="section-label">{aboutContent.name}</p>
            <p className="mt-3 text-[1.65rem] font-semibold leading-[1.12] tracking-[-0.035em] text-ink sm:text-3xl lg:text-[2.15rem]">
              {aboutContent.role}
            </p>
          </div>

          <div className="relative z-10 mt-7 border-t border-primary/12 pt-7 lg:mt-0 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
            <p className="section-label">{manifestoLabel}</p>
            <p className="mt-4 max-w-4xl font-sans text-[2.05rem] font-semibold leading-[1.1] tracking-[-0.04em] text-ink sm:text-[2.55rem] lg:text-[3.25rem]">
              Aiuto le persone a <span className="text-[#6848ed]">comprendere se stesse</span> e le proprie <span className="text-[#d36e59]">relazioni</span> attraverso un percorso psicologico fondato su <span className="text-[#5d8f6f]">competenza scientifica</span>, ascolto e rispetto della loro unicità.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
