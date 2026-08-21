import { areasContent } from "@/data";
import { Container, Heading, Section } from "@/components/ui";
import { SectionHeading } from "./SectionHeading";

const areaStyles = [
  {
    panel: "bg-[#f7f3ff]",
    accent: "text-[#6848ed]",
    chip: "border-[#ddcffd] bg-white/80 text-[#5d3ed7]",
    gradient: "from-[#a58cff] via-[#6547ef] to-[#d1c4ff]",
    words: ["ANSIA", "AUTOSTIMA", "CAMBIAMENTO"],
  },
  {
    panel: "bg-[#fff3ef]",
    accent: "text-[#d36e59]",
    chip: "border-[#f0d1c8] bg-white/80 text-[#b95a48]",
    gradient: "from-[#f6a18d] via-[#d96a55] to-[#ffd0c4]",
    words: ["COPPIA", "DIALOGO", "RELAZIONI"],
  },
  {
    panel: "bg-[#eff7f2]",
    accent: "text-[#5d8f6f]",
    chip: "border-[#d0e4d6] bg-white/80 text-[#4f7b60]",
    gradient: "from-[#8fc3a1] via-[#4f8b66] to-[#c9e7d3]",
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
                className={`group relative min-h-[32rem] overflow-hidden rounded-[2rem] border border-black/[0.04] p-6 transform-gpu will-change-transform transition-[transform,box-shadow,border-color] duration-[950ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:scale-[1.012] hover:border-black/[0.07] hover:shadow-[0_26px_70px_rgba(24,24,27,.09)] motion-reduce:transform-none motion-reduce:transition-none sm:p-8 ${style.panel}`}
                key={item.title}
              >
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-3 flex flex-col items-start">
                  {style.words.map((word, wordIndex) => (
                    <span
                      className="relative whitespace-nowrap text-[2.7rem] font-semibold leading-[0.88] tracking-[-0.06em] sm:text-[3.35rem]"
                      key={word}
                    >
                      <span
                        className="block text-black/[0.075] transition-[opacity,transform] duration-500 group-hover:-translate-y-1 group-hover:opacity-0 motion-reduce:transform-none"
                        style={{ transitionDelay: `${wordIndex * 45}ms` }}
                      >
                        {word}
                      </span>
                      <span
                        className={`absolute inset-0 block bg-gradient-to-r bg-clip-text text-transparent opacity-0 translate-y-2 transition-[opacity,transform,background-position] duration-700 [background-position:100%_50%] [background-size:200%_100%] group-hover:translate-y-0 group-hover:opacity-100 group-hover:[background-position:0%_50%] motion-reduce:transform-none ${style.gradient}`}
                        style={{ transitionDelay: `${70 + wordIndex * 55}ms` }}
                      >
                        {word}
                      </span>
                    </span>
                  ))}
                </div>

                <div className="relative z-10 flex h-full flex-col transform-gpu transition-transform duration-[1050ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none">
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
