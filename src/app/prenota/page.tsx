import Link from "next/link";

import { BookingCalendar } from "@/components/booking/BookingCalendar";
import { bookingContent } from "@/data/booking";

export default function BookingPage() {
  return (
    <main className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="w-full max-w-none px-4 sm:px-6 lg:px-[4vw]">
        <div className="w-full min-w-0 max-w-full">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-strong">
              {bookingContent.eyebrow}
            </p>
            <h1 className="mt-4 text-[2.65rem] font-semibold leading-[1.04] tracking-[-0.052em] text-ink min-[390px]:text-5xl sm:text-[3.5rem] lg:text-[4.4rem]">
              {bookingContent.title}
            </h1>
            <p className="mt-6 text-[1.2rem] leading-8 text-ink-soft sm:text-[1.35rem]">
              Scegli modalità, giorno e orario e lascia i tuoi recapiti per inviare una richiesta di appuntamento.
            </p>
          </div>

          <BookingCalendar />

          <div className="mt-10">
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-border px-6 font-sans font-semibold tracking-tight text-ink transition-colors hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
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
