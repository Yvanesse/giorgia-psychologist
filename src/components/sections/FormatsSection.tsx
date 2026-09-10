import { formatsContent } from "@/data";
import { Container, Heading, Section, Text } from "@/components/ui";
import { SectionHeading } from "./SectionHeading";

function FormatIcon({ type }: { type: "presence" | "online" }) {
  if (type === "presence") {
    return (
      <svg aria-hidden="true" className="h-7 w-7" fill="none" viewBox="0 0 24 24">
        <path d="M5 20V8.5L12 4l7 4.5V20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.65" />
        <path d="M9 20v-5.5h6V20M8.5 10.5h.01M15.5 10.5h.01" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.65" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-7 w-7" fill="none" viewBox="0 0 24 24">
      <rect height="11" rx="1.8" stroke="currentColor" strokeWidth="1.65" width="16" x="4" y="5" />
      <path d="M2.5 19h19M9.5 16v3M14.5 16v3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.65" />
      <path d="m10.5 9 3 1.75-3 1.75V9Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.45" />
    </svg>
  );
}

export function FormatsSection() {
  return (
    <Section className="overflow-hidden bg-[#f8f6ff]" spacing="compact">
      <Container variant="wide">
        <SectionHeading description={formatsContent.description} label={formatsContent.label} title={formatsContent.title} />

        <div className="mt-9 grid gap-4 sm:mt-11 lg:grid-cols-[1.08fr_.92fr] lg:gap-5">
          {formatsContent.items.map((item, index) => {
            const isPresence = index === 0;

            return (
              <article
                className={`relative overflow-hidden rounded-[1.75rem] border p-6 sm:p-8 lg:min-h-[18rem] lg:p-9 ${
                  isPresence
                    ? "border-[#efd0c8] bg-[#fff0eb]"
                    : "border-[#d8cdfd] bg-[#f3efff] lg:translate-y-8"
                }`}
                key={item.title}
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-full bg-white/75 ${
                    isPresence ? "text-[#d36e59]" : "text-[#6848ed]"
                  }`}
                >
                  <FormatIcon type={isPresence ? "presence" : "online"} />
                </div>

                <Heading className={`mt-7 ${isPresence ? "text-[#b95542]" : "text-[#5b35d6]"}`} variant="h3">
                  {item.title}
                </Heading>
                <Text className="mt-3 max-w-xl text-lg leading-7" variant="small">
                  {item.description}
                </Text>
                {item.location ? <p className="mt-4 text-base leading-7 text-ink-soft">{item.location}</p> : null}

                <div
                  aria-hidden="true"
                  className={`absolute -bottom-12 -right-10 h-32 w-32 rounded-full border-[18px] opacity-40 ${
                    isPresence ? "border-[#f0b6a8]" : "border-[#c9bbfa]"
                  }`}
                />
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
