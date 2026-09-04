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

        <div className="relative mt-10 sm:mt-12">
          <div
            className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-2 lg:overflow-visible lg:px-0 lg:pb-0"
            aria-label="Situazioni in cui può essere utile iniziare un percorso"
          >
            {whenUsefulContent.items.map((item, index) => {
              const tone = tones[index];
              return (
                <article
                  className={`group relative min-h-[28rem] w-[86vw] shrink-0 snap-center overflow-hidden rounded-[2rem] border border-black/[0.04] p-6 transition-[transform,box-shadow] duration-500 ease-out active:scale-[0.985] sm:w-[72vw] sm:p-8 lg:min-h-0 lg:w-auto lg:shrink lg:snap-none lg:hover:-translate-y-1 lg:hover:shadow-[0_24px_60px_rgba(24,24,27,.08)] ${tone.panel}`}
                  key={item.title}
                >
                  <div
                    className={`pointer-events-none absolute -right-2 top-0 text-[7rem] font-semibold leading-none tracking-[-0.08em] opacity-[0.12] transition-transform duration-700 group-active:scale-105 sm:right-5 sm:text-[8rem] lg:text-[7rem] ${tone.number}`}
                    aria-hidden="true"
                  >
                    {item.number}
                  </div>
                  <div className="relative flex h-full max-w-xl flex-col">
                    <p className={`text-base font-semibold tracking-[0.14em] ${tone.number}`}>{item.number}</p>
                    <Heading className="mt-4 max-w-md" variant="h3">{item.title}</Heading>
                    <p className="mt-5 max-w-xl text-lg leading-8 text-ink-soft sm:text-xl sm:leading-9">
                      {item.description}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-2.5 pt-7 lg:mt-7 lg:pt-0">
                      {item.keywords.map((keyword) => (
                        <span
                          className={`rounded-full border px-4 py-2 text-base font-medium leading-6 transition-transform duration-300 group-active:scale-[0.98] sm:text-[1.05rem] ${tone.tag}`}
                          key={keyword}
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-2 flex items-center justify-between px-1 text-sm font-medium text-ink-muted lg:hidden">
            <span>Scorri per esplorare</span>
            <span aria-hidden="true">01 — 04</span>
          </div>
        </div>
      </Container>
    </Section>
  );
}
