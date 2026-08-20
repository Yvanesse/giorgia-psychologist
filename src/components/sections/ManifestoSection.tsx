import { manifestoLabel } from "@/data";
import { Container, Section } from "@/components/ui";

export function ManifestoSection() {
  return (
    <Section spacing="compact">
      <Container variant="wide">
        <div className="overflow-hidden rounded-[2rem] border border-primary/10 bg-primary/[0.045] px-6 py-12 sm:px-12 sm:py-16 lg:px-20">
          <p className="section-label">{manifestoLabel}</p>
          <p className="mt-5 max-w-6xl font-sans text-3xl font-semibold leading-[1.18] tracking-[-0.035em] text-ink sm:text-4xl lg:text-5xl">
            Aiuto le persone a <span className="text-[#6848ed]">comprendere se stesse</span> e le proprie <span className="text-[#d36e59]">relazioni</span> attraverso un percorso psicologico fondato su <span className="text-[#5d8f6f]">competenza scientifica</span>, ascolto e rispetto della loro unicità.
          </p>
        </div>
      </Container>
    </Section>
  );
}
