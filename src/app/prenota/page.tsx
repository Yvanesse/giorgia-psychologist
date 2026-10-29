import type { Metadata } from "next";
import Link from "next/link";

import { BookingCalendar } from "@/components/booking/BookingCalendar";
import { bookingContent } from "@/data/booking";

export const metadata: Metadata = {
  title: "Prenota un colloquio | Giorgia Petruzzellis",
  description: "Richiedi un primo colloquio con la Dott.ssa Giorgia Petruzzellis, psicologa a Trani. Appuntamenti in presenza e online.",
  alternates: {
    canonical: "/prenota",
  },
  openGraph: {
    title: "Prenota un colloquio | Giorgia Petruzzellis",
    description: "Richiedi un primo colloquio psicologico in presenza a Trani oppure online.",
    url: "/prenota",
  },
};

export default function BookingPage() {
  return (
    <main className="relative w-full max-w-full overflow-x-hidden bg-white py-8 sm:py-14 lg:py-16">
      <div className="mx-auto w-full min-w-0 max-w-full overflow-x-hidden px-4 sm:px-6 lg:px-[4vw]">
        <div className="w-full min-w-0 max-w-full">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-strong">
              {bookingContent.eyebrow}
            </p>
            <h1 className="mt-3 text-[2.2rem] font-semibold leading-[1.08] tracking-[-0.045em] text-ink sm:text-[3.5rem] lg:text-[4.1rem]">
              {bookingContent.title}
            </h1>
            <p className="mt-3 max-w-xl text-base leading-7 text-ink-soft sm:mt-5 sm:text-lg">
              Ti guideremo nella scelta di modalità, data e orario, un passaggio alla volta.
            </p>
          </div>

          <BookingCalendar />

          <div className="mt-10">
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-full border-[1.5px] border-black px-6 font-sans font-semibold tracking-tight text-ink transition-[transform,background-color,color] hover:bg-surface-muted hover:text-primary active:scale-[0.985] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              href="/"
            >
              {bookingContent.backLabel}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
