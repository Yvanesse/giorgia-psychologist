"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default function PrivateAreaPage() {
  const router = useRouter();
  const configured = isSupabaseConfigured();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!configured) return;

    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError("Email o password non corretti.");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Non è stato possibile accedere. Riprova tra poco.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main id="main-content" className="min-h-[72vh] bg-[#f7f7f8] px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-[0_18px_60px_rgba(24,24,27,0.06)] lg:grid-cols-[.9fr_1.1fr]">
        <section className="bg-zinc-950 p-7 text-white sm:p-10 lg:p-12">
          <div className="flex size-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-sm font-semibold">
            GP
          </div>
          <p className="mt-10 text-sm font-semibold uppercase tracking-[0.16em] text-zinc-400">Area riservata</p>
          <h1 className="mt-3 text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl">
            Gestisci il sito in un unico posto.
          </h1>
          <p className="mt-5 max-w-md text-base leading-7 text-zinc-300">
            Appuntamenti, articoli e impostazioni professionali saranno accessibili soltanto dopo l&apos;autenticazione.
          </p>
        </section>

        <section className="p-7 sm:p-10 lg:p-12">
          <p className="text-sm font-semibold text-primary">Giorgia Petruzzellis</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-zinc-950">Accedi alla dashboard</h2>

          {!configured ? (
            <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
              <strong>Configurazione in corso.</strong> La schermata di accesso è pronta; il login diventerà attivo appena colleghiamo il database Supabase al progetto.
            </div>
          ) : (
            <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
              <label className="grid gap-2 text-sm font-semibold text-zinc-700">
                Email
                <input
                  autoComplete="email"
                  className="min-h-12 rounded-2xl border border-zinc-300 bg-white px-4 font-normal outline-none transition-colors focus:border-primary"
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  type="email"
                  value={email}
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-zinc-700">
                Password
                <input
                  autoComplete="current-password"
                  className="min-h-12 rounded-2xl border border-zinc-300 bg-white px-4 font-normal outline-none transition-colors focus:border-primary"
                  minLength={8}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  type="password"
                  value={password}
                />
              </label>

              {error ? (
                <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                  {error}
                </p>
              ) : null}

              <button
                className="mt-1 inline-flex min-h-12 items-center justify-center rounded-full border-[1.5px] border-black bg-primary px-6 font-semibold text-white transition-colors hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-50"
                disabled={loading}
                type="submit"
              >
                {loading ? "Accesso in corso…" : "Accedi"}
              </button>
            </form>
          )}

          <Link className="mt-8 inline-block text-sm font-semibold text-zinc-500 hover:text-primary" href="/">
            ← Torna alla homepage
          </Link>
        </section>
      </div>
    </main>
  );
}
