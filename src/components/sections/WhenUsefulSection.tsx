import { Container, Heading, Section } from "@/components/ui";
import { whenUsefulContent } from "@/data/whenUseful";

const tones = [
  {
    panel: "bg-[#f5f0ff]",
    number: "text-[#6b4eff]",
    tag: "border-[#d9ccff] bg-white/70 text-[#5939df]",
  },
  {
    panel: "bg-[#fff1ed]",
    number: "text-[#d76f5b]",
    tag: "border-[#f2cfc6] bg-white/70 text-[#b95a49]",
  },
  {
    panel: "bg-[#eef7f1]",
    number: "text-[#5d8f6f]",
    tag: "border-[#cfe3d5] bg-white/70 text-[#4f7a60]",
  },
  {
    panel: "bg-[#f3f1fb]",
    number: "text-[#7b6aa8]",
    tag: "border-[#dad3ea] bg-white/70 text-[#67568e]",
  },
] as const;

export function WhenUsefulSection() {
  return (
    <Section className="overflow-hidden bg-[#fcfbff]" id="quando-puo-aiutare">
      <Container variant="wide">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="section-label">{whenUsefulContent.label}</p>
            <Heading className="mt-3" variant="h2">{whenUsefulContent.title}</Heading>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-ink-soft sm:text-xl sm:leading-9 lg:justify-self-end">
            {whenUsefulContent.description}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-12 lg:grid-cols-2">
          {whenUsefulContent.items.map((item, index) => {
            const tone = tones[index];
            return (
              <article
                className={`group relative overflow-hidden rounded-[2rem] border border-black/[0.04] p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-8 ${tone.panel}`}
                key={item.title}
              >
                <div className={`absolute right-5 top-1 text-[5.5rem] font-semibold leading-none tracking-[-0.08em] opacity-15 sm:text-[7rem] ${tone.number}`} aria-hidden="true">
                  {item.number}
                </div>
                <div className="relative max-w-xl">
                  <p className={`text-base font-semibold tracking-[0.14em] ${tone.number}`}>{item.number}</p>
                  <Heading className="mt-4 max-w-md" variant="h3">{item.title}</Heading>
                  <p className="mt-5 max-w-xl text-lg leading-8 text-ink-soft sm:text-xl sm:leading-9">
                    {item.description}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-2.5">
                    {item.keywords.map((keyword) => (
                      <span className={`rounded-full border px-4 py-2 text-base font-medium leading-6 sm:text-[1.05rem] ${tone.tag}`} key={keyword}>
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
