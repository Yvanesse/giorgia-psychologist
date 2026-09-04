import { finalCtaContent } from "@/data";
import { Button, Container, Section } from "@/components/ui";

export function FinalCtaSection() {
  return (
    <Section id="contatti">
      <Container variant="wide">
        <div className="rounded-[2rem] bg-primary px-6 py-12 text-center text-white sm:px-12 sm:py-16 lg:px-20 lg:py-20">
          <h2 className="mx-auto max-w-4xl font-serif text-3xl font-medium leading-tight tracking-[-0.03em] sm:text-5xl">{finalCtaContent.title}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/90 sm:text-xl sm:leading-9">{finalCtaContent.description}</p>
          <Button className="mt-8 border-white bg-white text-primary hover:bg-white/90 focus-visible:outline-white" href={finalCtaContent.cta.href} size="lg">{finalCtaContent.cta.label}</Button>
        </div>
      </Container>
    </Section>
  );
}
