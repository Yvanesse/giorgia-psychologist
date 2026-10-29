"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type BookingMode = "in-presenza" | "online";
type ServiceType = "individuale" | "coppia" | "familiare";
type BookingForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};
type BookingFormErrors = Partial<Record<keyof BookingForm | "consent", string>>;
type AvailabilityState = "loading" | "ready" | "error";
type SubmissionState = "idle" | "submitting" | "success" | "error";

const WEEKDAYS = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"] as const;
const STEP_TITLES = ["Percorso", "Modalità", "Data", "Orario", "I tuoi dati", "Riepilogo"] as const;
const SESSION_DURATION_MINUTES = 50;

const monthFormatter = new Intl.DateTimeFormat("it-IT", { month: "long", year: "numeric" });
const dateFormatter = new Intl.DateTimeFormat("it-IT", {
  weekday: "long", day: "numeric", month: "long", year: "numeric",
});

function toIsoDate(date: Date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function firstDayOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1, 12);
}

function buildMonthCells(month: Date) {
  const first = firstDayOfMonth(month);
  const offset = (first.getDay() + 6) % 7;
  const days = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  const cells: Array<Date | null> = Array(offset).fill(null);
  for (let day = 1; day <= days; day += 1) {
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

function serviceLabel(service: ServiceType | null) {
  return service === "coppia" ? "Di coppia" : service === "familiare" ? "Familiare" : service === "individuale" ? "Individuale" : "Da scegliere";
}

function modeLabel(mode: BookingMode | null) {
  return mode === "online" ? "Online" : "In presenza";
}

const fieldClass = "mt-2 min-h-12 w-full min-w-0 rounded-2xl border border-border bg-white px-4 text-base font-normal text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/10";

export function BookingCalendar() {
  const wizardRef = useRef<HTMLDivElement>(null);
  const stepTitleRef = useRef<HTMLHeadingElement>(null);
  const previousStep = useRef(0);
  const submittingRef = useRef(false);

  const [step, setStep] = useState(0);
  const [serviceType, setServiceType] = useState<ServiceType | null>(null);
  const [mode, setMode] = useState<BookingMode | null>(null);
  const [availability, setAvailability] = useState<Record<string, string[]>>({});
  const [availabilityState, setAvailabilityState] = useState<AvailabilityState>("loading");
  const [calendarConnected, setCalendarConnected] = useState(false);
  const [monthIndex, setMonthIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState<BookingForm>({
    firstName: "", lastName: "", email: "", phone: "",
  });
  const [formErrors, setFormErrors] = useState<BookingFormErrors>({});
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<SubmissionState>("idle");
  const [message, setMessage] = useState("");

  // Links from the homepage can pre-select the mode without relying on DOM clicks.
  useEffect(() => {
    const requestedMode = new URLSearchParams(window.location.search).get("mode");
    if (requestedMode === "online" || requestedMode === "in-presenza") {
      setMode(requestedMode);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadAvailability() {
      try {
        const response = await fetch("/api/booking/availability", { cache: "no-store" });
        if (!response.ok) throw new Error("Availability unavailable");
        const result = (await response.json()) as {
          calendarConfigured?: boolean;
          dates?: Array<{ date: string; availableSlots: string[] }>;
        };
        if (!Array.isArray(result.dates)) throw new Error("Invalid availability");
        if (cancelled) return;
        setAvailability(Object.fromEntries(result.dates.map((day) => [day.date, day.availableSlots])));
        setCalendarConnected(Boolean(result.calendarConfigured));
        setAvailabilityState("ready");
      } catch {
        if (!cancelled) {
          setAvailability({});
          setAvailabilityState("error");
        }
      }
    }

    void loadAvailability();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (step === previousStep.current) return;
    previousStep.current = step;
    const frame = window.requestAnimationFrame(() => {
      wizardRef.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
      stepTitleRef.current?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [step]);

  const availableDates = useMemo(() =>
    new Set(
      Object.entries(availability)
        .filter(([, times]) => times.length > 0)
        .map(([day]) => day),
    ), [availability]);

  const months = useMemo(() => {
    const now = new Date();
    const first = firstDayOfMonth(now);
    // The server supplies up to 90 days; include four possible calendar months.
    return Array.from({ length: 4 }, (_, offset) =>
      new Date(first.getFullYear(), first.getMonth() + offset, 1, 12),
    );
  }, []);

  const selectedDateKey = selectedDate ? toIsoDate(selectedDate) : null;
  const availableTimes = selectedDateKey ? availability[selectedDateKey] ?? [] : [];
  const canSubmit = Boolean(
    serviceType && mode && selectedDate && selectedTime &&
    availabilityState === "ready" && availableTimes.includes(selectedTime),
  );

  function chooseService(value: ServiceType) {
    setServiceType(value);
    setSelectedDate(null);
    setSelectedTime(null);
    setStatus("idle");
    setMessage("");
  }

  function chooseMode(value: BookingMode) {
    setMode(value);
    setSelectedDate(null);
    setSelectedTime(null);
    setStatus("idle");
    setMessage("");
  }

  function chooseDate(value: Date) {
    setSelectedDate(value);
    setSelectedTime(null);
    setStatus("idle");
    setMessage("");
  }

  function chooseTime(value: string) {
    setSelectedTime(value);
    setStatus("idle");
    setMessage("");
  }

  const canContinue = step === 0
    ? Boolean(serviceType)
    : step === 1
      ? Boolean(mode)
      : step === 2
        ? Boolean(selectedDateKey && availableDates.has(selectedDateKey) && availabilityState === "ready")
        : step === 3
          ? Boolean(selectedTime && availableTimes.includes(selectedTime) && availabilityState === "ready")
          : true;

  function goForward() {
    if (!canContinue || step >= 4) return;
    setMessage("");
    setStep((current) => current + 1);
  }

  function validateForm() {
    const errors: BookingFormErrors = {};
    if (!form.firstName.trim()) errors.firstName = "Inserisci il nome.";
    if (!form.lastName.trim()) errors.lastName = "Inserisci il cognome.";
    if (!form.email.trim()) errors.email = "Inserisci l’email.";
    else if (!isValidEmail(form.email)) errors.email = "Inserisci un indirizzo email valido.";
    if (!form.phone.trim()) errors.phone = "Inserisci il numero di telefono.";
    else if (!isValidPhone(form.phone)) errors.phone = "Inserisci un numero di telefono valido.";
    if (!consent) errors.consent = "Conferma di aver letto l’Informativa Privacy.";
    return errors;
  }

  function clearFieldError(field: keyof BookingFormErrors) {
    setFormErrors((current) => {
      if (!current[field]) return current;
      const updated = { ...current };
      delete updated[field];
      return updated;
    });
    if (status === "error") { setStatus("idle"); setMessage(""); }
  }

  function continueToReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      setMessage("Controlla i campi evidenziati.");
      return;
    }
    setFormErrors({});
    setMessage("");
    setStatus("idle");
    setStep(5);
  }

  async function refreshAvailability() {
    setAvailabilityState("loading");
    try {
      const response = await fetch("/api/booking/availability", { cache: "no-store" });
      if (!response.ok) throw new Error();
      const result = (await response.json()) as {
        dates?: Array<{ date: string; availableSlots: string[] }>;
        calendarConfigured?: boolean;
      };
      if (!Array.isArray(result.dates)) throw new Error();
      setAvailability(Object.fromEntries(result.dates.map((day) => [day.date, day.availableSlots])));
      setCalendarConnected(Boolean(result.calendarConfigured));
      setAvailabilityState("ready");
    } catch {
      setAvailability({});
      setAvailabilityState("error");
    }
  }

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step !== 5 || !canSubmit || !selectedDate || !selectedTime || !mode ||
        submittingRef.current || status === "success") return;

    if (Object.keys(validateForm()).length > 0) {
      setFormErrors(validateForm());
      setStep(4);
      return;
    }

    submittingRef.current = true;
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceType,
          mode,
          date: toIsoDate(selectedDate),
          time: selectedTime,
          ...form,
        }),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) {
        if (response.status === 409) {
          setSelectedTime(null);
          setStep(3);
          await refreshAvailability();
        }
        throw new Error(result.message || "Non è stato possibile inviare la richiesta.");
      }
      setStatus("success");
      setMessage(result.message || "Richiesta ricevuta correttamente.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Si è verificato un errore.");
    } finally {
      submittingRef.current = false;
    }
  }

  const field = (
    key: keyof BookingForm,
    label: string,
    type: string,
    autoComplete: string,
  ) => (
    <label className="block min-w-0 text-sm font-semibold text-ink" key={key}>
      {label}
      <input
        aria-invalid={Boolean(formErrors[key])}
        autoComplete={autoComplete}
        className={[fieldClass, formErrors[key] ? "border-red-500 bg-red-50/30" : ""].join(" ")}
        inputMode={key === "phone" ? "tel" : undefined}
        onChange={(event) => {
          setForm((current) => ({ ...current, [key]: event.target.value }));
          clearFieldError(key);
        }}
        required
        type={type}
        value={form[key]}
      />
      {formErrors[key] ? <span className="mt-1 block text-xs text-red-700">{formErrors[key]}</span> : null}
    </label>
  );

  if (status === "success") {
    return (
      <section className="mx-auto mt-7 w-full max-w-3xl rounded-[2rem] border border-emerald-200 bg-white px-5 py-10 text-center sm:p-10" role="status" aria-live="polite">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100 text-3xl font-semibold text-emerald-700">✓</div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-emerald-700">Richiesta ricevuta</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink">Richiesta inviata con successo</h2>
        <p className="mt-4 text-base leading-7 text-ink-soft">
          La richiesta è in attesa della conferma di Giorgia. Riceverai una comunicazione via email.
        </p>
        <div className="mx-auto mt-6 max-w-md rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-left">
          <p className="text-sm font-semibold text-emerald-800">Riepilogo</p>
          <p className="mt-2 font-semibold capitalize text-ink">{selectedDate ? dateFormatter.format(selectedDate) : ""}</p>
          <p className="mt-1 text-sm text-ink-soft">{selectedTime} · {modeLabel(mode)} · {serviceLabel(serviceType)} · {SESSION_DURATION_MINUTES} minuti</p>
          <p className="mt-3 border-t border-emerald-200 pt-3 text-sm text-ink-soft">Stato: in attesa di conferma</p>
        </div>
      </section>
    );
  }

  return (
    <div ref={wizardRef} className="mx-auto mt-7 w-full min-w-0 max-w-3xl scroll-mt-24 pb-28 sm:mt-10 sm:pb-0">
      <div
        aria-label="Avanzamento della prenotazione"
        aria-valuemin={0}
        aria-valuemax={STEP_TITLES.length}
        aria-valuenow={step + 1}
        aria-valuetext={STEP_TITLES[step]}
        className="mb-7 h-2 w-full overflow-hidden rounded-full bg-[#eae5f0]"
        role="progressbar"
      >
        <div
          aria-hidden="true"
          className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out motion-reduce:transition-none"
          style={{ width: `${((step + 1) / STEP_TITLES.length) * 100}%` }}
        />
      </div>

      <div className="min-w-0 rounded-[1.8rem] border border-border bg-white p-5 shadow-[0_18px_55px_rgba(24,24,27,0.045)] sm:p-8">
        <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl" ref={stepTitleRef} tabIndex={-1}>
          {step === 0 ? "Quale percorso desideri iniziare?" :
            step === 1 ? "Come preferisci incontrarci?" :
            step === 2 ? "Quale giorno preferisci?" :
            step === 3 ? "Scegli l’orario" :
            step === 4 ? "Come possiamo contattarti?" :
            "Controlla la tua richiesta"}
        </h2>

        {step === 0 ? (
          <div className="mt-6 grid gap-3">
            {([
              ["individuale", "Individuale", "Un colloquio dedicato a te."],
              ["coppia", "Di coppia", "Uno spazio dedicato alla relazione."],
              ["familiare", "Familiare", "Un colloquio dedicato alle relazioni familiari."],
            ] as const).map(([value, label, description]) => (
              <button
                aria-label={label}
                aria-pressed={serviceType === value}
                className={[
                  "min-h-24 rounded-2xl border px-5 py-4 text-left transition-colors hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                  serviceType === value ? "border-primary bg-[#f8f6ff] ring-2 ring-primary/15" : "border-border bg-white hover:bg-[#f8f6ff]",
                ].join(" ")}
                key={value}
                onClick={() => chooseService(value)}
                type="button"
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="text-lg font-semibold text-ink">{label}</span>
                  <span aria-hidden="true" className={["flex size-6 items-center justify-center rounded-full border-2",
                    serviceType === value ? "border-primary bg-primary" : "border-primary/60"].join(" ")}>
                    {serviceType === value ? <span className="size-2.5 rounded-full bg-white" /> : null}
                  </span>
                </span>
                <span className="mt-1 block text-sm leading-6 text-ink-soft">{description}</span>
              </button>
            ))}
            <p className="text-sm leading-6 text-ink-muted">
              Non sai quale percorso scegliere? Puoi contattare Giorgia prima di prenotare.
            </p>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {([
              ["in-presenza", "In presenza", "Presso lo studio professionale a Trani."],
              ["online", "Online", "Colloquio da remoto in videochiamata."],
            ] as const).map(([value, label, description]) => (
              <button
                aria-label={label}
                aria-pressed={mode === value}
                className={[
                  "group min-h-36 rounded-3xl border p-5 text-left transition-colors hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                  mode === value ? "border-primary bg-[#f8f6ff] ring-2 ring-primary/15" : "border-border bg-white hover:bg-[#f8f6ff]",
                ].join(" ")}
                key={value}
                onClick={() => chooseMode(value)}
                type="button"
              >
                <span className="flex items-center gap-3">
                  <span aria-hidden="true" className="flex size-10 items-center justify-center rounded-full bg-[#f2efff] text-xl text-primary">
                    {value === "online" ? "◉" : "⌂"}
                  </span>
                  <span className="text-xl font-semibold text-ink">{label}</span>
                  <span
                    aria-hidden="true"
                    className={["ml-auto flex size-6 items-center justify-center rounded-full border-2",
                      mode === value ? "border-primary bg-primary" : "border-primary/60"].join(" ")}
                  >
                    {mode === value ? <span className="size-2.5 rounded-full bg-white" /> : null}
                  </span>
                </span>
                <span className="mt-4 block text-sm leading-6 text-ink-soft">{description}</span>
              </button>
            ))}
            <p className="rounded-2xl bg-surface-muted px-4 py-3 text-sm text-ink-soft">
              <span className="font-semibold text-ink">Durata del colloquio:</span> {SESSION_DURATION_MINUTES} minuti
            </p>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="mt-5 min-w-0">
            <p className="mb-4 text-sm leading-6 text-ink-soft">
              Seleziona un giorno disponibile. Gli orari compariranno nel passaggio successivo.
            </p>
            {availabilityState === "error" ? (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-ink-soft" role="alert">
                Il calendario non è temporaneamente disponibile. Riprova oppure contatta Giorgia attraverso i recapiti del sito.
                <button className="mt-3 block font-semibold text-primary underline underline-offset-4" onClick={() => void refreshAvailability()} type="button">Ricarica disponibilità</button>
              </div>
            ) : (
              <div className="min-w-0 rounded-2xl border border-border p-3 sm:p-5">
                <div className="flex items-center justify-between gap-2">
                  <button aria-label="Mese precedente" className="flex size-10 items-center justify-center rounded-full border border-border text-xl disabled:opacity-30" disabled={monthIndex === 0} onClick={() => setMonthIndex((value) => value - 1)} type="button">‹</button>
                  <h3 className="min-w-0 text-center text-lg font-semibold capitalize text-ink">{monthFormatter.format(months[monthIndex])}</h3>
                  <button aria-label="Mese successivo" className="flex size-10 items-center justify-center rounded-full border border-border text-xl disabled:opacity-30" disabled={monthIndex === months.length - 1} onClick={() => setMonthIndex((value) => value + 1)} type="button">›</button>
                </div>
                <div className="mt-5 grid min-w-0 grid-cols-7 text-center" aria-label="Calendario delle disponibilità">
                  {WEEKDAYS.map((day) => <span className="min-w-0 pb-2 text-[11px] font-semibold uppercase text-ink-muted" key={day}>{day}</span>)}
                  {buildMonthCells(months[monthIndex]).map((date, index) => {
                    if (!date) return <span aria-hidden="true" className="aspect-square" key={"empty-" + index} />;
                    const available = availabilityState === "ready" && availableDates.has(toIsoDate(date));
                    return (
                      <div className="flex aspect-square min-w-0 items-center justify-center p-0.5" key={toIsoDate(date)}>
                        <button
                          aria-label={dateFormatter.format(date)}
                          aria-pressed={selectedDateKey === toIsoDate(date)}
                          className={["flex aspect-square w-full max-w-11 items-center justify-center rounded-full text-sm font-semibold transition",
                            !available ? "cursor-not-allowed text-ink-muted/30" :
                            selectedDateKey === toIsoDate(date) ? "bg-primary text-white" :
                            "text-ink hover:bg-[#f2efff] focus-visible:outline-primary"].join(" ")}
                          disabled={!available}
                          onClick={() => chooseDate(date)}
                          type="button"
                        >{date.getDate()}</button>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-4 px-1 text-xs text-ink-muted">
                  {availabilityState === "loading" ? "Caricamento disponibilità…" :
                    calendarConnected ? "Disponibilità aggiornate dal calendario." : "Seleziona uno dei giorni disponibili."}
                </p>
              </div>
            )}
          </div>
        ) : null}

        {step === 3 ? (
          <div className="mt-6">
            <p className="mb-5 capitalize text-base text-ink-soft">{selectedDate ? dateFormatter.format(selectedDate) : ""}</p>
            {message && status === "error" ? (
              <p className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-ink-soft" role="alert">{message}</p>
            ) : null}
            {availabilityState === "error" ? (
              <p className="rounded-2xl bg-amber-50 p-4 text-sm text-ink-soft">Non possiamo verificare gli orari. Torna alla data e aggiorna il calendario.</p>
            ) : availableTimes.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {availableTimes.map((time) => (
                  <button
                    aria-pressed={selectedTime === time}
                    className={["min-h-14 rounded-2xl border px-3 text-lg font-semibold transition-colors hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary",
                      selectedTime === time ? "border-primary bg-primary text-white" : "border-border bg-white text-ink hover:bg-[#f8f6ff]"].join(" ")}
                    key={time}
                    onClick={() => chooseTime(time)}
                    type="button"
                  >{time}</button>
                ))}
              </div>
            ) : (
              <p className="rounded-2xl bg-surface-muted p-4 text-sm text-ink-soft">
                Non ci sono più orari disponibili per questo giorno. Torna indietro e scegli un'altra data.
              </p>
            )}
          </div>
        ) : null}

        {step === 4 ? (
          <form className="mt-6 space-y-4" id="booking-contact-form" noValidate onSubmit={continueToReview}>
            <div className="grid gap-4 sm:grid-cols-2">
              {field("firstName", "Nome", "text", "given-name")}
              {field("lastName", "Cognome", "text", "family-name")}
            </div>
            {field("email", "Email", "email", "email")}
            {field("phone", "Telefono", "tel", "tel")}
            <label className={["flex min-w-0 items-start gap-3 rounded-2xl border p-4 text-sm leading-6 text-ink-soft",
              formErrors.consent ? "border-red-300 bg-red-50/40" : "border-border bg-surface-muted"].join(" ")}>
              <input
                aria-invalid={Boolean(formErrors.consent)}
                checked={consent}
                className="mt-1 size-4 shrink-0 accent-primary"
                onChange={(event) => { setConsent(event.target.checked); clearFieldError("consent"); }}
                required
                type="checkbox"
              />
              <span>Ho letto l’<a className="font-semibold text-primary underline underline-offset-4" href="/privacy-policy" rel="noreferrer" target="_blank">Informativa Privacy</a> e chiedo di inviare questa richiesta di appuntamento.</span>
            </label>
            {formErrors.consent ? <p className="text-sm text-red-700">{formErrors.consent}</p> : null}
            {message && status !== "submitting" ? <p className="text-sm text-red-700" role="alert">{message}</p> : null}

          </form>
        ) : null}

        {step === 5 ? (
          <form className="mt-6" id="booking-confirm-form" onSubmit={(event) => void submitBooking(event)}>
            <div className="divide-y divide-border rounded-2xl border border-border bg-surface-muted px-5">
              <div className="flex items-center justify-between gap-4 py-4">
                <div><p className="text-xs text-ink-muted">Percorso</p><p className="mt-1 font-semibold text-ink">{serviceLabel(serviceType)}</p></div>
                <button className="text-sm font-semibold text-primary" onClick={() => setStep(0)} type="button">Modifica</button>
              </div>
              <div className="flex items-center justify-between gap-4 py-4">
                <div><p className="text-xs text-ink-muted">Modalità e durata</p><p className="mt-1 font-semibold text-ink">{modeLabel(mode)} · {SESSION_DURATION_MINUTES} minuti</p></div>
                <button className="text-sm font-semibold text-primary" onClick={() => setStep(1)} type="button">Modifica</button>
              </div>
              <div className="flex items-center justify-between gap-4 py-4">
                <div><p className="text-xs text-ink-muted">Data e ora</p><p className="mt-1 font-semibold capitalize text-ink">{selectedDate ? dateFormatter.format(selectedDate) : ""} · {selectedTime}</p></div>
                <button className="text-sm font-semibold text-primary" onClick={() => setStep(2)} type="button">Modifica</button>
              </div>
              <div className="flex items-center justify-between gap-4 py-4">
                <div className="min-w-0"><p className="text-xs text-ink-muted">Contatti</p><p className="mt-1 font-semibold text-ink">{form.firstName} {form.lastName}</p><p className="break-all text-sm text-ink-soft">{form.email}</p><p className="text-sm text-ink-soft">{form.phone}</p></div>
                <button className="text-sm font-semibold text-primary" onClick={() => setStep(4)} type="button">Modifica</button>
              </div>
            </div>
            <p className="mt-5 text-sm leading-6 text-ink-soft">
              L'appuntamento non è ancora confermato. Dopo l'invio Giorgia verificherà la richiesta e riceverai una comunicazione via email.
            </p>
            {message ? <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert">{message}</p> : null}

          </form>
        ) : null}

      </div>
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-border bg-white/95 px-5 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(24,24,27,0.07)] backdrop-blur-lg sm:static sm:mt-5 sm:rounded-2xl sm:border sm:px-5 sm:py-4 sm:shadow-none">
        <button
          className="min-h-12 rounded-full px-2 text-base font-semibold text-primary hover:text-primary-strong disabled:cursor-not-allowed disabled:opacity-30"
          disabled={step === 1 || status === "submitting"}
          onClick={() => setStep((current) => Math.max(0, current - 1))}
          type="button"
        >
          ← Indietro
        </button>
        <button
          className="min-h-12 rounded-2xl bg-primary px-7 text-base font-semibold text-white transition-colors hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-40"
          disabled={step < 4 ? !canContinue : step === 5 ? !canSubmit || status === "submitting" : false}
          form={step === 4 ? "booking-contact-form" : step === 5 ? "booking-confirm-form" : undefined}
          onClick={step < 4 ? goForward : undefined}
          type={step < 4 ? "button" : "submit"}
        >
          {step === 5 ? (status === "submitting" ? "Invio in corso…" : "Invia richiesta") : "Avanti"}
        </button>
      </div>
      {step >= 2 && step < 5 ? (
        <p className="mt-4 text-center text-sm text-ink-muted">
          {serviceType ? serviceLabel(serviceType) : ""}
          {mode && step >= 2 ? " · " + modeLabel(mode) : ""}
          {selectedDate && step >= 3 ? " · " + dateFormatter.format(selectedDate) : ""}
          {selectedTime && step >= 4 ? " · " + selectedTime : ""}
        </p>
      ) : null}
    </div>
  );
}
