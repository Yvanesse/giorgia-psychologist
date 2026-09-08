import { aboutContent, manifestoLabel } from "@/data";
import { Container, Section } from "@/components/ui";

export function ManifestoSection() {
  return (
    <Section id="chi-sono" spacing="compact">
      <Container variant="wide">
        <div className="relative overflow-hidden rounded-[2.25rem] border border-primary/10 bg-[#f7f3ff] px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          <div aria-hidden="true" className="pointer-events-none absolute -left-16 -top-20 h-48 w-48 rounded-full bg-[#f2b19f]/45 blur-2xl sm:h-64 sm:w-64" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -right-14 h-56 w-56 rounded-full bg-[#b8dbc4]/55 blur-2xl sm:h-72 sm:w-72" />
          <div aria-hidden="true" className="pointer-events-none absolute right-8 top-8 h-20 w-20 rounded-full border-[16px] border-[#6848ed]/10 sm:right-12 sm:top-10 sm:h-28 sm:w-28 sm:border-[20px]" />

          <div className="relative z-10">
            <div className="mx-auto max-w-5xl text-center">
              <p className="section-label">{aboutContent.name}</p>
              <p className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-3xl lg:text-[2.25rem]">
                {aboutContent.role}
              </p>
            </div>

            <div className="mt-10 rounded-[1.75rem] border border-white/70 bg-white/65 px-6 py-10 text-center shadow-[0_20px_60px_rgba(91,53,245,.06)] backdrop-blur-sm sm:mt-12 sm:px-10 sm:py-12 lg:px-16 lg:py-14">
              <p className="section-label">{manifestoLabel}</p>
              <p className="mx-auto mt-5 max-w-6xl font-sans text-3xl font-semibold leading-[1.18] tracking-[-0.035em] text-ink sm:text-4xl lg:text-5xl">
                Aiuto le persone a <span className="text-[#6848ed]">comprendere se stesse</span> e le proprie <span className="text-[#d36e59]">relazioni</span> attraverso un percorso psicologico fondato su <span className="text-[#5d8f6f]">competenza scientifica</span>, ascolto e rispetto della loro unicità.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
