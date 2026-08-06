import { areasContent } from "@/data";
import { Card, Container, Grid, Heading, Section, Text } from "@/components/ui";
import { SectionHeading } from "./SectionHeading";

function AreaIcon({ index }: { index: number }) {
  const paths = [
    <><circle cx="12" cy="8" r="3" /><path d="M5.5 20c.7-4 3-6 6.5-6s5.8 2 6.5 6" /></>,
    <><circle cx="8" cy="9" r="3" /><circle cx="16" cy="9" r="3" /><path d="M3 20c.5-4 2.2-6 5-6 1.7 0 3 .7 4 2 1-1.3 2.3-2 4-2 2.8 0 4.5 2 5 6" /></>,
    <><path d="M12 3v18M5 7h14M7 7l-4 7h8L7 7Zm10 0-4 7h8l-4-7ZM7 21h10" /></>,
  ];
  return <svg aria-hidden="true" className="size-8 fill-none stroke-primary stroke-[1.5]" viewBox="0 0 24 24">{paths[index]}</svg>;
}

export function AreasSection() {
  return (
    <Section id="ambiti">
      <Container variant="wide">
        <SectionHeading label={areasContent.label} title={areasContent.title} />
        <Grid className="mt-10 lg:mt-12" columns={3}>
          {areasContent.items.map((item, index) => (
            <Card className="flex h-full flex-col hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(24,24,27,.05)] motion-reduce:transform-none" key={item.title} variant="interactive">
              <AreaIcon index={index} />
              <Heading className="mt-6" variant="h3">{item.title}</Heading>
              <Text className="mt-4" variant="small">{item.description}</Text>
              <ul className="mt-6 space-y-2 border-t border-border pt-5 text-base leading-7 text-ink-soft">
                {item.topics.map((topic) => <li className="flex gap-3" key={topic}><span aria-hidden="true" className="text-primary">•</span>{topic}</li>)}
              </ul>
              {item.note ? <p className="mt-5 text-base leading-7 text-ink-muted">{item.note}</p> : null}
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
