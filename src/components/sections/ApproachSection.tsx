import { approachContent } from "@/data";
import { Container, Heading, Section, Text } from "@/components/ui";
import { SectionHeading } from "./SectionHeading";

export function ApproachSection() {
  return (
    <Section className="bg-surface-muted" id="approccio">
      <Container variant="wide">
        <SectionHeading description={approachContent.description} label={approachContent.label} title={approachContent.title} />
        <div className="mt-10 border-t border-border lg:mt-12">
          {approachContent.items.map((item, index) => (
            <article className="grid gap-4 border-b border-border py-8 sm:grid-cols-[5rem_12rem_1fr] sm:gap-6 lg:py-10" key={item.title}>
              <span className="text-base font-semibold text-primary">{String(index + 1).padStart(2, "0")}</span>
              <Heading variant="h3">{item.title}</Heading>
              <Text className="max-w-2xl" variant="small">{item.description}</Text>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
