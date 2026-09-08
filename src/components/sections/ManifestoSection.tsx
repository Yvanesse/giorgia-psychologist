import { aboutContent, manifestoLabel } from "@/data";
import { Container, Section } from "@/components/ui";

export function ManifestoSection() {
  return (
    <Section id="chi-sono" spacing="compact">
      <Container variant="wide">
        <div className="border-y border-border/80 py-10 sm:py-14 lg:py-16">
          <p className="mx-auto max-w-5xl text-center text-xl font-medium leading-8 tracking-[-0.02em] text-ink sm:text-2xl sm:leading-9 lg:text-[1.75rem] lg:leading-10">
            {aboutContent.name}, {aboutContent.role}
          </p>

          <div className="mt-10 overflow-hidden rounded-[2rem] border border-primary/10 bg-primary/[0.045] px-6 py-12 text-center sm:mt-12 sm:px-12 sm:py-16 lg:px-20">
            <p className="section-label">{manifestoLabel}</p>
            <p className="mx-auto mt-5 max-w-6xl font-sans text-3xl font-semibold leading-[1.18] tracking-[-0.035em] text-ink sm:text-4xl lg:text-5xl">
              Aiuto le persone a <span className="text-[#6848ed]">comprendere se stesse</span> e le proprie <span className="text-[#d36e59]">relazioni</span> attraverso un percorso psicologico fondato su <span className="text-[#5d8f6f]">competenza scientifica</span>, ascolto e rispetto della loro unicità.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
