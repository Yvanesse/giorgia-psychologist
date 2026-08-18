import Link from "next/link";

import { Card, Container } from "@/components/ui";
import { bookingContent } from "@/data/booking";

export default function BookingPage() {
  return (
    <main className="bg-white py-16 sm:py-20 lg:py-24">
      <Container variant="wide">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-strong">
              {bookingContent.eyebrow}
            </p>
            <h1 className="mt-4 text-[2.65rem] font-semibold leading-[1.04] tracking-[-0.052em] text-ink min-[390px]:text-5xl sm:text-[3.5rem] lg:text-[4.4rem]">
              {bookingContent.title}
            </h1>
            <p className="mt-6 text-[1.2rem] leading-8 text-ink-soft sm:text-[1.35rem]">
              {bookingContent.description}
            </p>
          </div>

          <section className="mt-12" aria-labelledby="booking-mode-title">
            <h2 id="booking-mode-title" className="text-2xl font-semibold tracking-tight text-ink">
              {bookingContent.modeLabel}
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {bookingContent.modes.map((mode) => (
                <Card key={mode.id} variant="bordered" className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 size-4 shrink-0 rounded-full border-2 border-primary bg-white shadow-[inset_0_0_0_3px_white]" />
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight text-ink">{mode.title}</h3>
                      <p className="mt-2 text-base leading-7 text-ink-soft">{mode.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section className="mt-10" aria-labelledby="availability-title">
            <Card variant="bordered" className="bg-[#f8f6ff]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-2xl">
                  <h2 id="availability-title" className="text-2xl font-semibold tracking-tight text-ink">
                    {bookingContent.availabilityTitle}
                  </h2>
                  <p className="mt-2 text-base leading-7 text-ink-soft">
                    {bookingContent.availabilityDescription}
                  </p>
                </div>
                <span className="inline-flex w-fit rounded-full border border-primary/20 bg-white px-3 py-1 text-sm font-semibold text-primary-strong">
                  Prossimamente
                </span>
              </div>
              <div className="mt-6 rounded-2xl border border-dashed border-primary/30 bg-white p-6 text-center sm:p-10">
                <p className="text-base leading-7 text-ink-soft">{bookingContent.previewNotice}</p>
              </div>
            </Card>
          </section>

          <div className="mt-10">
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-border px-6 font-sans font-semibold tracking-tight text-ink transition-colors hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              href="/"
            >
              {bookingContent.backLabel}
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
