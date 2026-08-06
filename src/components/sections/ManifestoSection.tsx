import { manifestoContent, manifestoLabel } from "@/data";
import { Container, Section } from "@/components/ui";

export function ManifestoSection() {
  return (
    <Section spacing="compact">
      <Container variant="wide">
        <div className="rounded-[2rem] border border-primary/10 bg-primary/[0.055] px-6 py-12 sm:px-12 sm:py-16 lg:px-20">
          <p className="section-label">{manifestoLabel}</p>
          <p className="mt-5 max-w-5xl font-serif text-3xl font-medium leading-[1.18] tracking-[-0.025em] text-ink sm:text-4xl lg:text-5xl">
            {manifestoContent.text}
          </p>
        </div>
      </Container>
    </Section>
  );
}
