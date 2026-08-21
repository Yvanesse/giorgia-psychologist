import { aboutContent } from "@/data";
import { Button, Container, Heading, Section } from "@/components/ui";

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
              <p className="mt-6 max-w-lg text-lg font-semibold leading-8 text-primary sm:text-xl">
                {aboutContent.role}
              </p>
            </div>

            <div className="max-w-3xl lg:pt-8">
              {aboutContent.paragraphs.map((paragraph, index) => (
                <p
                  className={
                    index === 0
                      ? "text-xl leading-9 tracking-[-0.015em] text-ink sm:text-2xl sm:leading-10"
                      : "mt-6 text-lg leading-8 text-ink-soft sm:text-xl sm:leading-9"
                  }
                  key={paragraph}
                >
                  {paragraph}
                </p>
              ))}

              <Button className="mt-8" href={aboutContent.cta.href} variant="outline">
                {aboutContent.cta.label}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
