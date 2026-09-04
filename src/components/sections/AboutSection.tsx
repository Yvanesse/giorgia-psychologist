import { aboutContent } from "@/data";
import { Container, Heading, Section } from "@/components/ui";

export function AboutSection() {
  return (
    <Section id="chi-sono" spacing="compact">
      <Container variant="wide">
        <div className="border-y border-border/80 py-12 sm:py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-20">
            <div className="max-w-xl">
              <p className="section-label">{aboutContent.label}</p>
              <Heading className="mt-3" variant="h2">
                {aboutContent.name}
              </Heading>
              <p className="mt-6 max-w-xl text-xl font-semibold leading-9 text-primary sm:text-2xl sm:leading-10">
                {aboutContent.role}
              </p>
            </div>

            <div className="max-w-4xl lg:pt-8">
              {aboutContent.paragraphs.map((paragraph, index) => (
                <p
                  className={
                    index === 0
                      ? "text-2xl leading-10 tracking-[-0.02em] text-ink sm:text-[1.7rem] sm:leading-[1.48]"
                      : "mt-7 text-xl leading-9 text-ink-soft sm:text-[1.35rem] sm:leading-10"
                  }
                  key={paragraph}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
