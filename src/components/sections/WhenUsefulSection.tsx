import { Container, Heading, Section } from "@/components/ui";
import { whenUsefulContent } from "@/data/whenUseful";

export function WhenUsefulSection() {
  return (
    <Section className="bg-[#fbfaf7]" id="quando-puo-aiutare" spacing="compact">
      <Container variant="wide">
        <div className="grid gap-6 border-y border-black/10 py-10 sm:gap-8 sm:py-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 lg:py-14">
          <div className="max-w-2xl">
            <p className="section-label">{whenUsefulContent.label}</p>
            <Heading className="mt-3" variant="h2">
              {whenUsefulContent.title}
            </Heading>
            <p className="mt-4 max-w-xl text-lg leading-7 text-ink-soft sm:text-xl sm:leading-8">
              {whenUsefulContent.description}
            </p>
          </div>

          <div>
            <div className="divide-y divide-black/10 border-t border-black/10">
              {whenUsefulContent.items.map((item) => (
                <p
                  className="py-5 text-[1.55rem] font-semibold leading-[1.14] tracking-[-0.035em] text-ink sm:py-6 sm:text-3xl lg:text-[2.15rem]"
                  key={item.title}
                >
                  {item.title}
                </p>
              ))}
            </div>

            <p className="mt-6 text-base font-medium leading-7 text-ink-soft sm:text-lg">
              {whenUsefulContent.closing}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
