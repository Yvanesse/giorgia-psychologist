import { formatsContent } from "@/data";
import { Card, Container, Grid, Heading, Section, Text } from "@/components/ui";
import { SectionHeading } from "./SectionHeading";

export function FormatsSection() {
  return (
    <Section className="bg-primary/[0.045]">
      <Container>
        <SectionHeading centered description={formatsContent.description} label={formatsContent.label} title={formatsContent.title} />
        <Grid className="mt-10" columns={2}>
          {formatsContent.items.map((item, index) => (
            <Card className="min-h-64 border-primary/10" key={item.title} variant="bordered">
              <span aria-hidden="true" className="text-base font-semibold text-primary">0{index + 1}</span>
              <Heading className="mt-7" variant="h3">{item.title}</Heading>
              <Text className="mt-4" variant="small">{item.description}</Text>
              {item.location ? <p className="mt-4 text-base leading-7 text-ink-soft">{item.location}</p> : null}
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
