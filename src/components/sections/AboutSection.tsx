import { aboutContent, aboutManifesto, sharedContent } from "@/data";
import { Button, Container, Heading, Section, Text } from "@/components/ui";
import { LocalPhoto } from "./LocalPhoto";

export function AboutSection() {
  return (
    <Section id="chi-sono" spacing="compact">
      <Container variant="wide">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="section-label">{aboutContent.label}</p>
            <Heading className="mt-3" variant="h2">{aboutContent.name}</Heading>
            <Text className="mt-6 font-medium text-ink">{aboutContent.role}</Text>
            {aboutContent.paragraphs.map((paragraph) => <Text className="mt-4" key={paragraph}>{paragraph}</Text>)}
            <Button className="mt-8" href={aboutContent.cta.href} variant="outline">{aboutContent.cta.label}</Button>
          </div>
          <div className="relative pb-0 lg:pb-16">
            <LocalPhoto asset={aboutContent.image} className="aspect-[4/4.8] rounded-[2rem]" placeholder={sharedContent.photoPlaceholder} sizes="(min-width: 1024px) 45vw, 100vw" />
            <div className="mt-4 rounded-2xl border border-primary/10 bg-white p-6 text-lg font-medium leading-8 text-ink shadow-[0_14px_40px_rgba(24,24,27,.07)] lg:absolute lg:-bottom-1 lg:left-8 lg:right-[-1rem] lg:mt-0 lg:p-7">
              {aboutManifesto}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
