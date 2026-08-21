import { areasContent } from "@/data";
import { Container, Heading, Section } from "@/components/ui";
import { SectionHeading } from "./SectionHeading";

const areaStyles = [
  {
    panel: "bg-[#f7f3ff]",
    accent: "text-[#6848ed]",
    chip: "border-[#ddcffd] bg-white/80 text-[#5d3ed7]",
    words: ["ANSIA", "AUTOSTIMA", "CAMBIAMENTO"],
  },
  {
    panel: "bg-[#fff3ef]",
    accent: "text-[#d36e59]",
    chip: "border-[#f0d1c8] bg-white/80 text-[#b95a48]",
    words: ["COPPIA", "DIALOGO", "RELAZIONI"],
  },
  {
    panel: "bg-[#eff7f2]",
    accent: "text-[#5d8f6f]",
    chip: "border-[#d0e4d6] bg-white/80 text-[#4f7b60]",
    words: ["CONTESTI", "VALUTAZIONE", "FORENSE"],
  },
] as const;

export function AreasSection() {
  return (
    <Section id="ambiti">
      <Container variant="wide">
        <SectionHeading label={areasContent.label} title={areasContent.title} />

        <div className="mt-10 grid gap-4 lg:mt-12 lg:grid-cols-3">
          {areasContent.items.map((item, index) => {
            const style = areaStyles[index];
            return (
              <article
                className={`group relative min-h-[32rem] overflow-hidden rounded-[2rem] border border-black/[0.04] p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-8 ${style.panel}`}
                key={item.title}
              >
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-3 flex flex-col items-start opacity-[0.08]">
                  {style.words.map((word) => (
                    <span className="whitespace-nowrap text-[2.7rem] font-semibold leading-[0.88] tracking-[-0.06em] sm:text-[3.35rem]" key={word}>
                      {word}
                    </span>
                  ))}
                </div>

                <div className="relative z-10 flex h-full flex-col">
                  <div className={`text-base font-semibold uppercase tracking-[0.16em] ${style.accent}`}>
                    0{index + 1}
                  </div>
                  <Heading className="mt-5 max-w-sm" variant="h3">{item.title}</Heading>
                  <p className="mt-5 max-w-md text-lg leading-8 text-ink-soft sm:text-xl sm:leading-9">{item.description}</p>

                  <div className="mt-7 flex flex-wrap gap-2.5">
                    {item.topics.map((topic) => (
                      <span className={`rounded-full border px-4 py-2 text-base font-medium leading-6 sm:text-[1.05rem] ${style.chip}`} key={topic}>
                        {topic}
                      </span>
                    ))}
                  </div>

                  {item.note ? <p className="mt-auto pt-7 text-base leading-7 text-ink-muted">{item.note}</p> : <div className="mt-auto" />}
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
