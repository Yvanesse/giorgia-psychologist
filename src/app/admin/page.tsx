"use client";

import { useMemo, useState } from "react";

import { articlesContent } from "@/data/articles";

type AdminView = "overview" | "appointments" | "articles" | "settings";

type ArticleDraft = {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  status: "Bozza" | "Pubblicato";
};

const navItems: Array<{ id: AdminView; label: string; icon: string }> = [
  { id: "overview", label: "Panoramica", icon: "⌂" },
  { id: "appointments", label: "Appuntamenti", icon: "◷" },
  { id: "articles", label: "Articoli", icon: "✎" },
  { id: "settings", label: "Impostazioni", icon: "⚙" },
];

function StatusBadge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "purple" | "green" | "orange" }) {
  const tones = {
    neutral: "border-zinc-200 bg-zinc-50 text-zinc-600",
    purple: "border-primary/20 bg-primary/5 text-primary-strong",
    green: "border-emerald-200 bg-emerald-50 text-emerald-700",
    orange: "border-orange-200 bg-orange-50 text-orange-700",
  };

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}

function StatCard({
  label,
  value,
  note,
  accent,
}: {
  label: string;
  value: string;
  note: string;
  accent: string;
}) {
  return (
    <article className="rounded-[1.75rem] border border-zinc-200 bg-white p-5 sm:p-6">
      <div className={`mb-5 h-1.5 w-10 rounded-full ${accent}`} />
      <p className="text-sm font-semibold text-zinc-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-zinc-950">{value}</p>
      <p className="mt-2 text-sm leading-6 text-zinc-500">{note}</p>
    </article>
  );
}

function EmptyAppointments() {
  return (
    <div className="rounded-[2rem] border border-dashed border-zinc-300 bg-zinc-50/70 px-6 py-12 text-center sm:px-10 sm:py-16">
      <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-xl">
        ◷
      </div>
      <h3 className="mt-5 text-xl font-semibold tracking-[-0.025em] text-zinc-950">Nessun appuntamento sincronizzato</h3>
      <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-zinc-600 sm:text-base">
        Quando collegheremo Google Calendar, qui compariranno le richieste ricevute dal sito e gli appuntamenti confermati.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <StatusBadge tone="orange">Google Calendar da collegare</StatusBadge>
        <StatusBadge>Database da attivare</StatusBadge>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [view, setView] = useState<AdminView>("overview");
  const [editorOpen, setEditorOpen] = useState(false);
  const [drafts, setDrafts] = useState<ArticleDraft[]>(
    articlesContent.items.map((article) => ({
      id: article.slug,
      title: article.title,
      category: article.category,
      excerpt: article.excerpt,
      status: article.isPublished ? "Pubblicato" : "Bozza",
    })),
  );
  const [form, setForm] = useState({
    title: "",
    category: "",
    excerpt: "",
  });

  const publishedCount = useMemo(() => drafts.filter((article) => article.status === "Pubblicato").length, [drafts]);
  const draftCount = drafts.length - publishedCount;

  const saveLocalDraft = () => {
    const title = form.title.trim();
    if (!title) return;

    setDrafts((current) => [
      {
        id: `local-${Date.now()}`,
        title,
        category: form.category.trim() || "Senza categoria",
        excerpt: form.excerpt.trim() || "Nessuna introduzione inserita.",
        status: "Bozza",
      },
      ...current,
    ]);
    setForm({ title: "", category: "", excerpt: "" });
    setEditorOpen(false);
  };

  const pageTitle =
    view === "overview"
      ? "Panoramica"
      : view === "appointments"
        ? "Appuntamenti"
        : view === "articles"
          ? "Articoli"
          : "Impostazioni";

  return (
    <main id="main-content" className="min-h-screen bg-[#f7f7f8] py-6 sm:py-8 lg:py-10">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 sm:px-5">
          <span>
            <strong>Dashboard in anteprima.</strong> Le modifiche agli articoli restano solo sul dispositivo e gli appuntamenti non sono ancora sincronizzati.
          </span>
          <StatusBadge tone="orange">Fase 1</StatusBadge>
        </div>

        <div className="grid gap-4 lg:grid-cols-[15rem_minmax(0,1fr)]">
          <aside className="rounded-[2rem] border border-zinc-200 bg-zinc-950 p-4 text-white lg:min-h-[720px]">
            <div className="flex items-center gap-3 px-2 py-3">
              <div className="flex size-10 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-sm font-semibold">
                GP
              </div>
              <div>
                <p className="text-sm font-semibold">Giorgia Petruzzellis</p>
                <p className="mt-0.5 text-xs text-zinc-400">Area riservata</p>
              </div>
            </div>

            <nav aria-label="Navigazione dashboard" className="mt-5 grid grid-cols-2 gap-2 lg:grid-cols-1">
              {navItems.map((item) => {
                const active = view === item.id;
                return (
                  <button
                    className={`flex min-h-11 items-center gap-3 rounded-2xl px-3 text-left text-sm font-medium transition-colors ${active ? "bg-white text-zinc-950" : "text-zinc-300 hover:bg-white/10 hover:text-white"}`}
                    key={item.id}
                    onClick={() => setView(item.id)}
                    type="button"
                  >
                    <span aria-hidden="true" className="w-5 text-center text-base">
                      {item.icon}
                    </span>
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="mt-6 hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 lg:block">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Prossimo passo</p>
              <p className="mt-2 text-sm leading-6 text-zinc-300">
                Attivare accesso privato, database e sincronizzazione con Google Calendar.
              </p>
            </div>
          </aside>

          <section className="min-w-0 rounded-[2rem] border border-zinc-200 bg-white p-5 sm:p-7 lg:p-9">
            <header className="flex flex-col gap-4 border-b border-zinc-100 pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-primary">Dashboard</p>
                <h1 className="mt-1 text-3xl font-semibold tracking-[-0.04em] text-zinc-950 sm:text-4xl">{pageTitle}</h1>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-500" aria-hidden="true" />
                <span className="text-sm font-medium text-zinc-500">Anteprima attiva</span>
              </div>
            </header>

            {view === "overview" ? (
              <div className="pt-7">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <StatCard label="Appuntamenti" value="0" note="In attesa del collegamento Calendar" accent="bg-[#5b35f5]" />
                  <StatCard label="Richieste nuove" value="0" note="Il database verrà collegato nella fase 2" accent="bg-[#d36e59]" />
                  <StatCard label="Articoli pubblicati" value={String(publishedCount)} note="Visibili nella sezione Articoli" accent="bg-[#5d8f6f]" />
                  <StatCard label="Bozze" value={String(draftCount)} note="Contenuti editoriali da completare" accent="bg-zinc-900" />
                </div>

                <div className="mt-7 grid gap-5 xl:grid-cols-[1.15fr_.85fr]">
                  <article className="rounded-[2rem] border border-zinc-200 p-6 sm:p-7">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-zinc-500">Agenda</p>
                        <h2 className="mt-1 text-2xl font-semibold tracking-[-0.035em] text-zinc-950">Prossimi appuntamenti</h2>
                      </div>
                      <button
                        className="rounded-full border-[1.5px] border-black px-4 py-2 text-sm font-semibold hover:bg-zinc-50"
                        onClick={() => setView("appointments")}
                        type="button"
                      >
                        Gestisci
                      </button>
                    </div>
                    <div className="mt-6">
                      <EmptyAppointments />
                    </div>
                  </article>

                  <article className="rounded-[2rem] border border-zinc-200 bg-[#f8f6ff] p-6 sm:p-7">
                    <p className="text-sm font-semibold text-primary-strong">Configurazione</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-zinc-950">Cosa manca per renderla operativa</h2>
                    <div className="mt-6 space-y-4">
                      {[
                        ["Accesso privato", "Login riservato a Giorgia", "Da fare"],
                        ["Google Calendar", "Disponibilità e sincronizzazione", "Da fare"],
                        ["Database", "Appuntamenti e articoli persistenti", "Da fare"],
                      ].map(([title, description, status]) => (
                        <div className="flex gap-3 rounded-2xl bg-white p-4" key={title}>
                          <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-sm text-primary">✓</div>
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-zinc-950">{title}</p>
                            <p className="mt-1 text-sm leading-5 text-zinc-500">{description}</p>
                          </div>
                          <StatusBadge>{status}</StatusBadge>
                        </div>
                      ))}
                    </div>
                  </article>
                </div>
              </div>
            ) : null}

            {view === "appointments" ? (
              <div className="pt-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-[-0.035em] text-zinc-950">Gestione appuntamenti</h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600 sm:text-base">
                      Qui gestiremo richieste, conferme, modalità del colloquio e sincronizzazione con il calendario professionale.
                    </p>
                  </div>
                  <StatusBadge tone="orange">Calendar non collegato</StatusBadge>
                </div>
                <div className="mt-7">
                  <EmptyAppointments />
                </div>
              </div>
            ) : null}

            {view === "articles" ? (
              <div className="pt-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-[-0.035em] text-zinc-950">Gestione articoli</h2>
                    <p className="mt-2 text-sm leading-6 text-zinc-600 sm:text-base">
                      Una base semplice per creare, modificare e in seguito pubblicare contenuti senza entrare nel codice.
                    </p>
                  </div>
                  <button
                    className="inline-flex min-h-11 items-center justify-center rounded-full border-[1.5px] border-black bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-strong"
                    onClick={() => setEditorOpen(true)}
                    type="button"
                  >
                    + Nuovo articolo
                  </button>
                </div>

                {editorOpen ? (
                  <div className="mt-7 rounded-[2rem] border border-primary/20 bg-[#f8f6ff] p-5 sm:p-7">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-primary">Editor</p>
                        <h3 className="mt-1 text-xl font-semibold text-zinc-950">Nuova bozza</h3>
                      </div>
                      <button
                        aria-label="Chiudi editor"
                        className="flex size-10 items-center justify-center rounded-full border border-zinc-300 bg-white text-lg"
                        onClick={() => setEditorOpen(false)}
                        type="button"
                      >
                        ×
                      </button>
                    </div>

                    <div className="mt-6 grid gap-4">
                      <label className="grid gap-2 text-sm font-semibold text-zinc-700">
                        Titolo
                        <input
                          className="min-h-12 rounded-2xl border border-zinc-300 bg-white px-4 font-normal outline-none focus:border-primary"
                          onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                          placeholder="Titolo dell’articolo"
                          value={form.title}
                        />
                      </label>
                      <label className="grid gap-2 text-sm font-semibold text-zinc-700">
                        Categoria
                        <input
                          className="min-h-12 rounded-2xl border border-zinc-300 bg-white px-4 font-normal outline-none focus:border-primary"
                          onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
                          placeholder="Es. Relazioni"
                          value={form.category}
                        />
                      </label>
                      <label className="grid gap-2 text-sm font-semibold text-zinc-700">
                        Introduzione
                        <textarea
                          className="min-h-28 resize-y rounded-2xl border border-zinc-300 bg-white px-4 py-3 font-normal leading-6 outline-none focus:border-primary"
                          onChange={(event) => setForm((current) => ({ ...current, excerpt: event.target.value }))}
                          placeholder="Una breve introduzione al contenuto"
                          value={form.excerpt}
                        />
                      </label>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <button
                        className="rounded-full border-[1.5px] border-black bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
                        disabled={!form.title.trim()}
                        onClick={saveLocalDraft}
                        type="button"
                      >
                        Salva bozza
                      </button>
                      <p className="text-xs leading-5 text-zinc-500">Per ora il salvataggio è solo locale e serve a provare il flusso.</p>
                    </div>
                  </div>
                ) : null}

                <div className="mt-7 overflow-hidden rounded-[2rem] border border-zinc-200">
                  <div className="hidden grid-cols-[minmax(0,1fr)_10rem_7rem] gap-4 border-b border-zinc-200 bg-zinc-50 px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500 sm:grid">
                    <span>Articolo</span>
                    <span>Categoria</span>
                    <span>Stato</span>
                  </div>
                  <div className="divide-y divide-zinc-100">
                    {drafts.map((article) => (
                      <article className="grid gap-3 px-5 py-5 sm:grid-cols-[minmax(0,1fr)_10rem_7rem] sm:items-center sm:gap-4" key={article.id}>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-zinc-950">{article.title}</h3>
                          <p className="mt-1 line-clamp-1 text-sm text-zinc-500">{article.excerpt}</p>
                        </div>
                        <p className="text-sm font-medium text-zinc-600">{article.category}</p>
                        <div>
                          <StatusBadge tone={article.status === "Pubblicato" ? "green" : "purple"}>{article.status}</StatusBadge>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            {view === "settings" ? (
              <div className="pt-7">
                <h2 className="text-2xl font-semibold tracking-[-0.035em] text-zinc-950">Impostazioni</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600 sm:text-base">
                  Questa sezione ospiterà gli account collegati e le preferenze operative della dashboard.
                </p>

                <div className="mt-7 grid gap-4 md:grid-cols-2">
                  <article className="rounded-[2rem] border border-zinc-200 p-6">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-lg font-semibold text-zinc-950">Google Calendar</h3>
                      <StatusBadge tone="orange">Non collegato</StatusBadge>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-zinc-600">
                      Servirà per leggere le disponibilità e creare gli appuntamenti confermati.
                    </p>
                  </article>

                  <article className="rounded-[2rem] border border-zinc-200 p-6">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-lg font-semibold text-zinc-950">Accesso dashboard</h3>
                      <StatusBadge>Da configurare</StatusBadge>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-zinc-600">
                      Prima della pubblicazione attiveremo un login privato e proteggeremo completamente /admin.
                    </p>
                  </article>
                </div>
              </div>
            ) : null}
          </section>
        </div>
      </div>
    </main>
  );
}
