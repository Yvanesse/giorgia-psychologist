import { siteConfig } from "@/config/site.config";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {siteConfig.name}
        </h1>
        <p className="mt-4 text-lg text-zinc-600">Sito in costruzione</p>
        <button
          className="mt-8 rounded-full bg-primary px-7 py-3 font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          type="button"
        >
          Prenota
        </button>
      </div>
    </main>
  );
}
