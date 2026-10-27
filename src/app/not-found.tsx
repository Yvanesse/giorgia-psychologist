import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="bg-white py-20 sm:py-28">
      <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-strong">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-ink sm:text-6xl">
          Questa pagina non è disponibile.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-ink-soft sm:text-xl">
          Il contenuto che stai cercando potrebbe essere stato spostato oppure non esistere più.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            className="inline-flex min-h-12 items-center justify-center rounded-full border-[1.5px] border-black bg-primary px-6 font-semibold text-white hover:bg-primary-strong"
            href="/"
            style={{ color: "#ffffff" }}
          >
            Torna alla homepage
          </Link>
          <Link
            className="inline-flex min-h-12 items-center justify-center rounded-full border-[1.5px] border-black px-6 font-semibold text-ink hover:bg-surface-muted"
            href="/prenota"
          >
            Prenota un colloquio
          </Link>
        </div>
      </div>
    </main>
  );
}
