import { aboutContent } from "@/data";
import { Container, Heading, Section } from "@/components/ui";

export function AboutSection() {
  return (
    <Section id="chi-sono" spacing="compact">
      <Container variant="wide">
        <div className="border-y border-border/80 py-12 sm:py-16 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,.78fr)_minmax(0,1.22fr)] lg:gap-20">
            <div className="max-w-xl">
              <p className="section-label">{aboutContent.label}</p>
              <Heading className="mt-3" variant="h2">
                {aboutContent.name}
              </Heading>
              <p className="mt-5 max-w-xl text-lg font-medium leading-8 text-primary sm:text-xl sm:leading-9">
                {aboutContent.role}
              </p>
            </div>

            <div className="max-w-4xl lg:pt-8">
              <div className="rounded-[1.75rem] border border-primary/10 bg-primary/[0.035] p-6 sm:p-8">
                {aboutContent.paragraphs.map((paragraph, index) => (
                  <p
                    className={`text-lg leading-8 text-ink sm:text-xl sm:leading-9 ${index > 0 ? "mt-6 text-ink-soft" : ""}`}
                    key={paragraph}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
