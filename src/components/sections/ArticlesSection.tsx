import { articlesContent } from "@/data";
import { Button, Container, Heading, Section } from "@/components/ui";

export function ArticlesSection() {
  return (
    <Section id="articoli" spacing="compact">
      <Container variant="wide">
        <div className="rounded-[2rem] border border-primary/10 bg-[#f7f3ff] px-6 py-9 sm:px-10 sm:py-11 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:px-14 lg:py-12">
          <div className="max-w-3xl">
            <p className="section-label">I miei articoli</p>
            <Heading className="mt-3" variant="h2">
              Uno spazio per approfondire.
            </Heading>
            <p className="mt-4 max-w-2xl text-lg leading-7 text-ink-soft sm:text-xl sm:leading-8">
              {articlesContent.description}
            </p>
          </div>

          <div className="mt-7 shrink-0 lg:mt-0">
            <Button href="/articoli" size="lg">
              Vai agli articoli <span aria-hidden="true">→</span>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
