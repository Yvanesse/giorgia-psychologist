"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

import { Button, Card } from "@/components/ui";

type BookingMode = "in-presenza" | "online";

type BookingForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type BookingFormErrors = Partial<Record<keyof BookingForm | "consent", string>>;

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

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidPhone(value: string) {
  return /^[+\d][\d\s().-]{6,}$/.test(value.trim());
}

function buildMonths(firstMonth: Date, lastMonth: Date) {
  const months: Date[] = [];
  let cursor = firstDayOfMonth(firstMonth);

  while (cursor.getTime() <= lastMonth.getTime()) {
    months.push(cursor);
    cursor = addMonths(cursor, 1);
  }

  return months;
}

export function BookingCalendar() {
  const availableDays = useMemo(() => buildTestDays(), []);
  const [availability, setAvailability] = useState<Record<string, string[]>>({});
  const [availabilityState, setAvailabilityState] = useState<"loading" | "ready" | "error">("loading");
  const [calendarConnected, setCalendarConnected] = useState(false);
  const availableDates = useMemo(
    () => new Set(Object.entries(availability).filter(([, slots]) => slots.length > 0).map(([date]) => date)),
    [availability],
  );
  const firstAvailableMonth = useMemo(() => firstDayOfMonth(availableDays[0]), [availableDays]);
  const lastAvailableMonth = useMemo(
    () => firstDayOfMonth(availableDays[availableDays.length - 1]),
    [availableDays],
  );
  const months = useMemo(
    () => buildMonths(firstAvailableMonth, lastAvailableMonth),
    [firstAvailableMonth, lastAvailableMonth],
  );

  const submittingRef = useRef(false);
  const [monthIndex, setMonthIndex] = useState(0);
  const [mode, setMode] = useState<BookingMode>("in-presenza");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState<BookingForm>({ firstName: "", lastName: "", email: "", phone: "" });
  const [formErrors, setFormErrors] = useState<BookingFormErrors>({});
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadAvailability() {
      try {
        const response = await fetch("/api/booking/availability", { cache: "no-store" });
        if (!response.ok) throw new Error("Disponibilità non disponibili");

        const data = (await response.json()) as {
          calendarConfigured?: boolean;
          dates?: Array<{ date: string; availableSlots: string[] }>;
        };

        if (cancelled) return;
        if (!Array.isArray(data.dates)) throw new Error("Risposta disponibilità non valida");

        setAvailability(
          Object.fromEntries(data.dates.map((item) => [item.date, item.availableSlots])),
        );
        setCalendarConnected(Boolean(data.calendarConfigured));
        setAvailabilityState("ready");
      } catch {
        if (!cancelled) {
          setAvailability({});
          setAvailabilityState("error");
        }
      }
    }

    void loadAvailability();

    return () => {
      cancelled = true;
    };
  }, []);


  const canGoBack = monthIndex > 0;
  const canGoForward = monthIndex < months.length - 1;
  const selectedDateKey = selectedDate ? toIsoDate(selectedDate) : null;
  const availableTimes = selectedDateKey ? availability[selectedDateKey] ?? [] : [];

  function goToMonth(nextIndex: number) {
    setMonthIndex(Math.max(0, Math.min(nextIndex, months.length - 1)));
  }

  const canSubmit = availabilityState === "ready" && Boolean(selectedDate && selectedTime && availableTimes.includes(selectedTime));

  function validateForm() {
    const errors: BookingFormErrors = {};

    if (!form.firstName.trim()) errors.firstName = "Inserisci il nome.";
    if (!form.lastName.trim()) errors.lastName = "Inserisci il cognome.";

    if (!form.email.trim()) {
      errors.email = "Inserisci l’email.";
    } else if (!isValidEmail(form.email)) {
      errors.email = "Inserisci un indirizzo email valido.";
    }

    if (!form.phone.trim()) {
      errors.phone = "Inserisci il numero di telefono.";
    } else if (!isValidPhone(form.phone)) {
      errors.phone = "Inserisci un numero di telefono valido.";
    }

    if (!consent) errors.consent = "Conferma di aver letto l’Informativa Privacy.";

    return errors;
  }

  function clearFieldError(field: keyof BookingFormErrors) {
    setFormErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    if (status === "error") {
      setStatus("idle");
      setMessage("");
    }
  }

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit || !selectedDate || !selectedTime || submittingRef.current || status === "success") return;

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setStatus("error");
      setMessage("Controlla i campi evidenziati e riprova.");
      return;
    }

    setFormErrors({});
    submittingRef.current = true;
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
      if (error instanceof Error && /slot|orario/i.test(error.message)) {
        setSelectedTime(null);
        setAvailabilityState("loading");
        try {
          const refresh = await fetch("/api/booking/availability", { cache: "no-store" });
          if (!refresh.ok) throw new Error();
          const data = (await refresh.json()) as { dates?: Array<{ date: string; availableSlots: string[] }> };
          if (!Array.isArray(data.dates)) throw new Error();
          setAvailability(Object.fromEntries(data.dates.map((item) => [item.date, item.availableSlots])));
          setAvailabilityState("ready");
        } catch {
          setAvailability({});
          setAvailabilityState("error");
        }
      }
      setMessage(error instanceof Error ? error.message : "Si è verificato un errore.");
    } finally {
      submittingRef.current = false;
    }
  }

  return (
    <div className="mt-12 grid w-full min-w-0 max-w-full gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)]">
      <div className="min-w-0 space-y-8">
        <section className="min-w-0" aria-labelledby="booking-mode-title">
          <h2 id="booking-mode-title" className="text-2xl font-semibold tracking-tight text-ink">
            Modalità del colloquio
          </h2>
          <div className="mt-5 grid min-w-0 gap-4 sm:grid-cols-2">
            {[
              ["in-presenza", "In presenza", "Colloquio presso lo studio professionale."],
              ["online", "Online", "Colloquio da remoto, in videochiamata."],
            ].map(([id, title, description]) => {
              const active = mode === id;
              return (
                <button
                  className={`min-w-0 rounded-3xl border p-5 text-left transition-colors sm:p-6 ${
                    active ? "border-primary bg-[#f8f6ff]" : "border-border bg-white hover:border-primary/40"
                  }`}
                  key={id}
                  onClick={() => setMode(id as BookingMode)}
                  type="button"
                >
                  <span className="flex min-w-0 items-start gap-4">
                    <span
                      aria-hidden="true"
                      className={`mt-1 size-4 shrink-0 rounded-full border-2 ${
                        active ? "border-primary bg-primary shadow-[inset_0_0_0_3px_white]" : "border-border bg-white"
                      }`}
                    />
                    <span className="min-w-0">
                      <span className="block text-xl font-semibold tracking-tight text-ink">{title}</span>
                      <span className="mt-2 block text-base leading-7 text-ink-soft">{description}</span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="min-w-0" aria-labelledby="booking-date-title">
          <div className="flex min-w-0 flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-strong">
                {calendarConnected ? "Disponibilità" : "Calendario"}
              </p>
              <h2 id="booking-date-title" className="mt-2 text-2xl font-semibold tracking-tight text-ink">
                Scegli un giorno
              </h2>
            </div>
            <p className="text-sm text-ink-muted">
              {availabilityState === "loading" ? "Caricamento disponibilità…" : availabilityState === "error" ? "Disponibilità non disponibili" : calendarConnected ? "Sincronizzato con Google Calendar" : "Disponibilità attuali"}
            </p>
          </div>

          {availabilityState === "error" ? (
            <p className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-ink-soft" role="alert">
              Il calendario non è temporaneamente disponibile. Nessuna richiesta verrà inviata finché non sarà possibile verificare gli orari. Ricarica la pagina o contatta Giorgia tramite i recapiti del sito.
            </p>
          ) : null}
          <div className="mt-5 w-full min-w-0 max-w-full overflow-hidden rounded-3xl border border-border bg-white p-3 sm:p-5">
            <div className="flex min-w-0 items-center justify-between gap-3 px-1">
              <button
                aria-label="Mese precedente"
                className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border text-xl text-ink transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
                disabled={!canGoBack}
                onClick={() => goToMonth(monthIndex - 1)}
                type="button"
              >
                ‹
              </button>
              <h3 className="min-w-0 truncate text-center text-lg font-semibold capitalize tracking-tight text-ink sm:text-xl">
                {monthFormatter.format(months[monthIndex])}
              </h3>
              <button
                aria-label="Mese successivo"
                className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border text-xl text-ink transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
                disabled={!canGoForward}
                onClick={() => goToMonth(monthIndex + 1)}
                type="button"
              >
                ›
              </button>
            </div>

            <div className="mt-4 w-full min-w-0" aria-live="polite">
              <div className="grid w-full min-w-0 grid-cols-7 text-center">
                {WEEKDAYS.map((day) => (
                  <div className="min-w-0 pb-2 text-[10px] font-semibold uppercase tracking-wide text-ink-muted sm:text-xs" key={day}>
                    {day}
                  </div>
                ))}
                {buildMonthCells(months[monthIndex]).map((date, index) => {
                  if (!date) {
                    return <div aria-hidden="true" className="min-w-0 aspect-square" key={`blank-${index}`} />;
                  }

                  const iso = toIsoDate(date);
                  const available = availableDates.has(iso);
                  const active = selectedDate ? toIsoDate(selectedDate) === iso : false;

                  return (
                    <div className="flex min-w-0 aspect-square items-center justify-center p-0.5 sm:p-1" key={iso}>
                      <button
                        aria-label={fullDateFormatter.format(date)}
                        aria-pressed={active}
                        className={`flex aspect-square w-full max-w-11 items-center justify-center rounded-full text-xs font-semibold transition sm:text-base ${
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
            </div>
            <p className="mt-4 px-1 text-xs text-ink-muted">
              Seleziona uno dei giorni disponibili. Usa le frecce per cambiare mese.
            </p>
          </div>
        </section>

        {selectedDate ? (
          <section className="min-w-0" aria-labelledby="booking-time-title">
            <h2 id="booking-time-title" className="text-2xl font-semibold tracking-tight text-ink">
              Scegli un orario
            </h2>
            <p className="mt-2 capitalize text-base text-ink-soft">{fullDateFormatter.format(selectedDate)}</p>
            <div className="mt-5 grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-4">
              {availableTimes.map((time) => {
                const active = selectedTime === time;
                return (
                  <button
                    className={`min-h-12 min-w-0 rounded-full border px-4 font-semibold transition-colors ${
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

      <Card as="section" variant="bordered" className="h-fit w-full min-w-0 max-w-full overflow-hidden lg:sticky lg:top-28">
        {status === "success" ? (
          <div className="min-w-0 max-w-full overflow-hidden py-4 text-center sm:py-8" role="status" aria-live="polite">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100 text-3xl font-semibold text-emerald-700">
              ✓
            </div>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">Richiesta ricevuta</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink">Richiesta inviata con successo</h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-7 text-ink-soft">
              La richiesta è stata registrata correttamente. Non è necessario inviarla di nuovo.
            </p>

            {selectedDate && selectedTime ? (
              <div className="mx-auto mt-6 w-full min-w-0 max-w-md overflow-hidden rounded-3xl border border-emerald-200 bg-emerald-50 p-5 text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">Riepilogo richiesta</p>
                <p className="mt-2 font-semibold capitalize text-ink">{fullDateFormatter.format(selectedDate)}</p>
                <p className="mt-1 text-sm leading-6 text-ink-soft">
                  {selectedTime} · {mode === "online" ? "Online" : "In presenza"}
                </p>
                <div className="mt-4 border-t border-emerald-200 pt-4 text-sm leading-6 text-ink-soft">
                  <strong className="text-ink">Stato:</strong> in attesa di conferma.
                </div>
              </div>
            ) : null}

            <p className="mx-auto mt-6 max-w-md break-words px-1 text-sm leading-6 text-ink-muted">
              Giorgia potrà gestire la richiesta dalla sua area riservata.
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-strong">Dati per la richiesta</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink">Completa la prenotazione</h2>
            <p className="mt-3 text-base leading-7 text-ink-soft">
              La richiesta verrà registrata e resterà in attesa di conferma. Dopo l’invio, lo slot non verrà più mostrato tra quelli disponibili.
            </p>

            <form className="mt-6 min-w-0 space-y-4" noValidate onSubmit={submitBooking}>
          <div className="grid min-w-0 gap-4 sm:grid-cols-2">
            <label className="min-w-0 text-sm font-semibold text-ink">
              Nome
              <input
                aria-describedby={formErrors.firstName ? "first-name-error" : undefined}
                aria-invalid={Boolean(formErrors.firstName)}
                className={`mt-2 min-h-12 w-full min-w-0 max-w-full rounded-2xl border bg-white px-4 text-base font-normal outline-none transition ${
                  formErrors.firstName ? "border-red-500 bg-red-50/40 focus:border-red-600" : "border-border focus:border-primary"
                }`}
                onChange={(event) => {
                  setForm((current) => ({ ...current, firstName: event.target.value }));
                  clearFieldError("firstName");
                }}
                type="text"
                value={form.firstName}
              />
              {formErrors.firstName ? (
                <span className="mt-2 block text-sm font-medium text-red-700" id="first-name-error">
                  {formErrors.firstName}
                </span>
              ) : null}
            </label>
            <label className="min-w-0 text-sm font-semibold text-ink">
              Cognome
              <input
                aria-describedby={formErrors.lastName ? "last-name-error" : undefined}
                aria-invalid={Boolean(formErrors.lastName)}
                className={`mt-2 min-h-12 w-full min-w-0 max-w-full rounded-2xl border bg-white px-4 text-base font-normal outline-none transition ${
                  formErrors.lastName ? "border-red-500 bg-red-50/40 focus:border-red-600" : "border-border focus:border-primary"
                }`}
                onChange={(event) => {
                  setForm((current) => ({ ...current, lastName: event.target.value }));
                  clearFieldError("lastName");
                }}
                type="text"
                value={form.lastName}
              />
              {formErrors.lastName ? (
                <span className="mt-2 block text-sm font-medium text-red-700" id="last-name-error">
                  {formErrors.lastName}
                </span>
              ) : null}
            </label>
          </div>

          <label className="block min-w-0 text-sm font-semibold text-ink">
            Email
            <input
              aria-describedby={formErrors.email ? "email-error" : undefined}
              aria-invalid={Boolean(formErrors.email)}
              className={`mt-2 min-h-12 w-full min-w-0 max-w-full rounded-2xl border bg-white px-4 text-base font-normal outline-none transition ${
                formErrors.email ? "border-red-500 bg-red-50/40 focus:border-red-600" : "border-border focus:border-primary"
              }`}
              onChange={(event) => {
                setForm((current) => ({ ...current, email: event.target.value }));
                clearFieldError("email");
              }}
              type="email"
              value={form.email}
            />
            {formErrors.email ? (
              <span className="mt-2 block text-sm font-medium text-red-700" id="email-error">
                {formErrors.email}
              </span>
            ) : null}
          </label>

          <label className="block min-w-0 text-sm font-semibold text-ink">
            Telefono
            <input
              aria-describedby={formErrors.phone ? "phone-error" : undefined}
              aria-invalid={Boolean(formErrors.phone)}
              className={`mt-2 min-h-12 w-full min-w-0 max-w-full rounded-2xl border bg-white px-4 text-base font-normal outline-none transition ${
                formErrors.phone ? "border-red-500 bg-red-50/40 focus:border-red-600" : "border-border focus:border-primary"
              }`}
              inputMode="tel"
              onChange={(event) => {
                setForm((current) => ({ ...current, phone: event.target.value }));
                clearFieldError("phone");
              }}
              type="tel"
              value={form.phone}
            />
            {formErrors.phone ? (
              <span className="mt-2 block text-sm font-medium text-red-700" id="phone-error">
                {formErrors.phone}
              </span>
            ) : null}
          </label>

          <div>
            <label
              className={`flex min-w-0 items-start gap-3 rounded-2xl border p-4 text-sm leading-6 text-ink-soft ${
                formErrors.consent ? "border-red-300 bg-red-50/60" : "border-transparent bg-surface-muted"
              }`}
            >
              <input
                aria-describedby={formErrors.consent ? "consent-error" : undefined}
                aria-invalid={Boolean(formErrors.consent)}
                checked={consent}
                className="mt-1 size-4 shrink-0 accent-primary"
                onChange={(event) => {
                  setConsent(event.target.checked);
                  clearFieldError("consent");
                }}
                type="checkbox"
              />
              <span className="min-w-0">
                Ho letto l’<a className="font-semibold text-primary underline underline-offset-4" href="/privacy-policy" target="_blank" rel="noreferrer">Informativa Privacy</a> e chiedo di inviare questa richiesta di appuntamento.
              </span>
            </label>
            {formErrors.consent ? (
              <span className="mt-2 block text-sm font-medium text-red-700" id="consent-error">
                {formErrors.consent}
              </span>
            ) : null}
          </div>

          {selectedDate && selectedTime ? (
            <div className="min-w-0 rounded-2xl border border-primary/15 bg-[#f8f6ff] p-4 text-sm leading-6 text-ink-soft">
              <strong className="text-ink">Riepilogo:</strong> {mode === "online" ? "Online" : "In presenza"}, {fullDateFormatter.format(selectedDate)} alle {selectedTime}.
            </div>
          ) : null}

          <Button
            className="w-full max-w-full"
            disabled={!canSubmit || status === "submitting"}
            size="lg"
            type="submit"
          >
            {status === "submitting" ? "Invio in corso…" : "Invia richiesta"}
          </Button>

          {message ? (
            <p
              className="min-w-0 rounded-2xl bg-red-50 p-4 text-sm leading-6 text-red-800"
              role="status"
            >
              {message}
            </p>
          ) : null}
            </form>
          </>
        )}
      </Card>
    </div>
  );
}
