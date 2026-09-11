import Link from "next/link";

import { formatsContent } from "@/data";
import { Container, Heading, Section, Text } from "@/components/ui";
import { SectionHeading } from "./SectionHeading";

const studioMapsHref =
  "https://www.google.com/maps/search/?api=1&query=Via+Monte+d%27Alba+76%2C+Trani";

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

function MapPinIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path d="M12 21s6-5.15 6-11a6 6 0 1 0-12 0c0 5.85 6 11 6 11Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
      <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.7" />
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
            const href = isPresence ? "/prenota?mode=in-presenza" : "/prenota?mode=online";
            const ctaLabel = isPresence ? "Richiedi appuntamento" : "Prenota colloquio online";

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

                {isPresence && item.location ? (
                  <a
                    className="relative z-10 mt-5 flex max-w-md items-center justify-between gap-4 rounded-2xl border border-[#efd0c8] bg-white/70 px-4 py-3.5 transition-colors hover:bg-white"
                    href={studioMapsHref}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fff7f4] text-[#d36e59]">
                        <MapPinIcon />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#b95542]">Dove si trova lo studio</span>
                        <span className="mt-0.5 block text-sm font-semibold text-ink sm:text-base">{item.location}</span>
                      </span>
                    </span>
                    <span aria-hidden="true" className="shrink-0 text-[#b95542]">→</span>
                  </a>
                ) : null}

                <Link
                  className={`relative z-10 mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-base font-semibold transition-[transform,background-color] duration-300 active:scale-[0.985] ${
                    isPresence ? "bg-[#d36e59]" : "bg-[#6848ed]"
                  }`}
                  href={href}
                  style={{ color: "#ffffff" }}
                >
                  {ctaLabel}
                  <span aria-hidden="true">→</span>
                </Link>

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
