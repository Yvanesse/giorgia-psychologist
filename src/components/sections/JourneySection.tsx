import { journeyContent } from "@/data";
import { Container, Heading, Section, Text } from "@/components/ui";
import { SectionHeading } from "./SectionHeading";

export function JourneySection() {
  return (
    <Section>
      <Container variant="wide">
        <SectionHeading centered description={journeyContent.description} label={journeyContent.label} title={journeyContent.title} />
        <ol className="relative mt-12 grid gap-6 lg:grid-cols-3 lg:gap-0">
          {journeyContent.steps.map((step, index) => (
            <li className="relative rounded-3xl border border-border bg-white p-7 lg:rounded-none lg:border-y lg:border-l-0 lg:border-r lg:px-10 lg:first:border-l" key={step.title}>
              <span className="flex size-10 items-center justify-center rounded-full bg-primary text-base font-semibold text-white">{index + 1}</span>
              <Heading className="mt-6" variant="h3">{step.title}</Heading>
              <Text className="mt-4" variant="small">{step.description}</Text>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
