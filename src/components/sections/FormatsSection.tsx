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

                {item.location ? (
                  <a
                    className="relative z-10 mt-5 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2.5 text-sm font-semibold text-[#9d493a] transition-colors hover:bg-white"
                    href={studioMapsHref}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <MapPinIcon />
                    <span>{item.location}</span>
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

        <a
          className="mt-8 flex flex-col gap-4 rounded-[1.5rem] border border-[#d8cdfd] bg-white/75 px-5 py-5 transition-colors hover:bg-white sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:mt-12"
          href={studioMapsHref}
          rel="noreferrer"
          target="_blank"
        >
          <span className="flex items-center gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f3efff] text-[#6848ed]">
              <MapPinIcon />
            </span>
            <span>
              <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-[#6848ed]">Dove si trova lo studio</span>
              <span className="mt-1 block text-lg font-semibold tracking-tight text-ink">Via Monte d&apos;Alba 76, Trani</span>
            </span>
          </span>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#6848ed] sm:text-base">
            Apri la mappa <span aria-hidden="true">→</span>
          </span>
        </a>
      </Container>
    </Section>
  );
}
