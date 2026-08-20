"use client";

import { FormEvent, useMemo, useState } from "react";

import { Button, Card } from "@/components/ui";

type BookingMode = "in-presenza" | "online";

type BookingForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

const TEST_SLOTS = ["09:00", "11:00", "15:00", "17:00"] as const;
const WEEKDAYS = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"] as const;

const monthFormatter = new Intl.DateTimeFormat("it-IT", {
  month: "long",
  year: "numeric",
});

const fullDateFormatter = new Intl.DateTimeFormat("it-IT", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

function toIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function firstDayOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1, 12);
}

function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1, 12);
}

function buildTestDays() {
  const days: Date[] = [];
  const cursor = new Date();
  cursor.setHours(12, 0, 0, 0);
  cursor.setDate(cursor.getDate() + 1);

  while (days.length < 60) {
    const weekday = cursor.getDay();
    if (weekday !== 0 && weekday !== 6) {
      days.push(new Date(cursor));
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  return days;
}

function buildMonthCells(month: Date) {
  const first = firstDayOfMonth(month);
  const mondayOffset = (first.getDay() + 6) % 7;
  const cells: Array<Date | null> = Array.from({ length: mondayOffset }, () => null);
  const daysInMonth = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(first.getFullYear(), first.getMonth(), day, 12));
  }

  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export function BookingCalendar() {
  const availableDays = useMemo(() => buildTestDays(), []);
  const availableDates = useMemo(() => new Set(availableDays.map(toIsoDate)), [availableDays]);
  const firstAvailableMonth = useMemo(() => firstDayOfMonth(availableDays[0]), [availableDays]);
  const lastAvailableMonth = useMemo(
    () => firstDayOfMonth(availableDays[availableDays.length - 1]),
    [availableDays],
  );

  const [mode, setMode] = useState<BookingMode>("in-presenza");
  const [visibleMonth, setVisibleMonth] = useState(firstAvailableMonth);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState<BookingForm>({ firstName: "", lastName: "", email: "", phone: "" });
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const monthCells = useMemo(() => buildMonthCells(visibleMonth), [visibleMonth]);
  const canGoBack = visibleMonth.getTime() > firstAvailableMonth.getTime();
  const canGoForward = visibleMonth.getTime() < lastAvailableMonth.getTime();

  const canSubmit = Boolean(
    selectedDate &&
      selectedTime &&
      form.firstName.trim() &&
      form.lastName.trim() &&
      form.email.trim() &&
      form.phone.trim() &&
      consent,
  );

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit || !selectedDate || !selectedTime) return;

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          date: toIsoDate(selectedDate),
          time: selectedTime,
          ...form,
        }),
      });

      const data = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(data.message || "Non è stato possibile inviare la richiesta.");

      setStatus("success");
      setMessage(data.message || "Richiesta inviata correttamente.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Si è verificato un errore.");
    }
  }

  return (
    <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
      <div className="space-y-8">
        <section aria-labelledby="booking-mode-title">
          <h2 id="booking-mode-title" className="text-2xl font-semibold tracking-tight text-ink">
            Modalità del colloquio
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              ["in-presenza", "In presenza", "Colloquio presso lo studio professionale."],
              ["online", "Online", "Colloquio da remoto, in videochiamata."],
            ].map(([id, title, description]) => {
              const active = mode === id;
              return (
                <button
                  className={`rounded-3xl border p-6 text-left transition-colors ${
                    active ? "border-primary bg-[#f8f6ff]" : "border-border bg-white hover:border-primary/40"
                  }`}
                  key={id}
                  onClick={() => setMode(id as BookingMode)}
                  type="button"
                >
                  <span className="flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className={`mt-1 size-4 shrink-0 rounded-full border-2 ${
                        active ? "border-primary bg-primary shadow-[inset_0_0_0_3px_white]" : "border-border bg-white"
                      }`}
                    />
                    <span>
                      <span className="block text-xl font-semibold tracking-tight text-ink">{title}</span>
                      <span className="mt-2 block text-base leading-7 text-ink-soft">{description}</span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="booking-date-title">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-strong">Calendario di test</p>
              <h2 id="booking-date-title" className="mt-2 text-2xl font-semibold tracking-tight text-ink">
                Scegli un giorno
              </h2>
            </div>
            <p className="text-sm text-ink-muted">Disponibilità provvisorie</p>
          </div>

          <div className="mt-5 rounded-3xl border border-border bg-white p-4 sm:p-5">
            <div className="flex items-center justify-between gap-4">
              <button
                aria-label="Mese precedente"
                className="flex size-10 items-center justify-center rounded-full border border-border text-xl text-ink transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
                disabled={!canGoBack}
                onClick={() => setVisibleMonth((current) => addMonths(current, -1))}
                type="button"
              >
                ‹
              </button>
              <h3 className="text-lg font-semibold capitalize tracking-tight text-ink sm:text-xl">
                {monthFormatter.format(visibleMonth)}
              </h3>
              <button
                aria-label="Mese successivo"
                className="flex size-10 items-center justify-center rounded-full border border-border text-xl text-ink transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
                disabled={!canGoForward}
                onClick={() => setVisibleMonth((current) => addMonths(current, 1))}
                type="button"
              >
                ›
              </button>
            </div>

            <div className="mt-5 grid grid-cols-7 text-center">
              {WEEKDAYS.map((day) => (
                <div className="pb-2 text-[11px] font-semibold uppercase tracking-wide text-ink-muted sm:text-xs" key={day}>
                  {day}
                </div>
              ))}

              {monthCells.map((date, index) => {
                if (!date) {
                  return <div aria-hidden="true" className="aspect-square" key={`blank-${index}`} />;
                }

                const iso = toIsoDate(date);
                const available = availableDates.has(iso);
                const active = selectedDate ? toIsoDate(selectedDate) === iso : false;

                return (
                  <div className="flex aspect-square items-center justify-center p-0.5 sm:p-1" key={iso}>
                    <button
                      aria-label={fullDateFormatter.format(date)}
                      className={`flex size-full max-h-12 max-w-12 items-center justify-center rounded-full text-sm font-semibold transition sm:text-base ${
                        active
                          ? "bg-primary text-white shadow-sm"
                          : available
                            ? "text-ink hover:bg-[#f2efff] hover:text-primary"
                            : "cursor-not-allowed text-ink-muted/35"
                      }`}
                      disabled={!available}
                      onClick={() => {
                        setSelectedDate(date);
                        setSelectedTime(null);
                        setStatus("idle");
                        setMessage("");
                      }}
                      type="button"
                    >
                      {date.getDate()}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-ink-muted">
              <span aria-hidden="true" className="size-2 rounded-full bg-primary" />
              Seleziona uno dei giorni disponibili
            </div>
          </div>
        </section>

        {selectedDate ? (
          <section aria-labelledby="booking-time-title">
            <h2 id="booking-time-title" className="text-2xl font-semibold tracking-tight text-ink">
              Scegli un orario
            </h2>
            <p className="mt-2 capitalize text-base text-ink-soft">{fullDateFormatter.format(selectedDate)}</p>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {TEST_SLOTS.map((time) => {
                const active = selectedTime === time;
                return (
                  <button
                    className={`min-h-12 rounded-full border px-5 font-semibold transition-colors ${
                      active ? "border-primary bg-primary text-white" : "border-border bg-white text-ink hover:border-primary hover:text-primary"
                    }`}
                    key={time}
                    onClick={() => {
                      setSelectedTime(time);
                      setStatus("idle");
                      setMessage("");
                    }}
                    type="button"
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </section>
        ) : null}
      </div>

      <Card as="section" variant="bordered" className="h-fit lg:sticky lg:top-28">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-strong">Dati per la richiesta</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink">Completa la prenotazione</h2>
        <p className="mt-3 text-base leading-7 text-ink-soft">
          In questa fase il calendario è in modalità test. La richiesta viene inviata, ma lo slot non viene ancora bloccato in un calendario reale.
        </p>

        <form className="mt-6 space-y-4" onSubmit={submitBooking}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-ink">
              Nome
              <input
                className="mt-2 min-h-12 w-full rounded-2xl border border-border bg-white px-4 text-base font-normal outline-none transition focus:border-primary"
                onChange={(event) => setForm((current) => ({ ...current, firstName: event.target.value }))}
                required
                type="text"
                value={form.firstName}
              />
            </label>
            <label className="text-sm font-semibold text-ink">
              Cognome
              <input
                className="mt-2 min-h-12 w-full rounded-2xl border border-border bg-white px-4 text-base font-normal outline-none transition focus:border-primary"
                onChange={(event) => setForm((current) => ({ ...current, lastName: event.target.value }))}
                required
                type="text"
                value={form.lastName}
              />
            </label>
          </div>

          <label className="block text-sm font-semibold text-ink">
            Email
            <input
              className="mt-2 min-h-12 w-full rounded-2xl border border-border bg-white px-4 text-base font-normal outline-none transition focus:border-primary"
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              required
              type="email"
              value={form.email}
            />
          </label>

          <label className="block text-sm font-semibold text-ink">
            Telefono
            <input
              className="mt-2 min-h-12 w-full rounded-2xl border border-border bg-white px-4 text-base font-normal outline-none transition focus:border-primary"
              inputMode="tel"
              onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
              required
              type="tel"
              value={form.phone}
            />
          </label>

          <label className="flex items-start gap-3 rounded-2xl bg-surface-muted p-4 text-sm leading-6 text-ink-soft">
            <input
              checked={consent}
              className="mt-1 size-4 accent-primary"
              onChange={(event) => setConsent(event.target.checked)}
              required
              type="checkbox"
            />
            <span>Acconsento all’utilizzo dei dati inseriti esclusivamente per gestire questa richiesta di appuntamento.</span>
          </label>

          {selectedDate && selectedTime ? (
            <div className="rounded-2xl border border-primary/15 bg-[#f8f6ff] p-4 text-sm leading-6 text-ink-soft">
              <strong className="text-ink">Riepilogo:</strong> {mode === "online" ? "Online" : "In presenza"}, {fullDateFormatter.format(selectedDate)} alle {selectedTime}.
            </div>
          ) : null}

          <Button className="w-full" disabled={!canSubmit || status === "submitting"} size="lg" type="submit">
            {status === "submitting" ? "Invio in corso…" : "Invia richiesta"}
          </Button>

          {message ? (
            <p
              className={`rounded-2xl p-4 text-sm leading-6 ${
                status === "success" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"
              }`}
              role="status"
            >
              {message}
            </p>
          ) : null}
        </form>
      </Card>
    </div>
  );
}
