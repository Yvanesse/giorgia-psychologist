// Raccogliamo solo preferenze tecniche e un evento privo di dati personali.
export const GOOGLE_ANALYTICS_ID = "G-5Y9EXJ79EX";
export const GOOGLE_ADS_ID = "AW-18578841452";

export const COOKIE_PREFERENCES_KEY = "giorgia_cookie_preferences_v1";

export type CookiePreferences = {
  analytics: boolean;
  advertising: boolean;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function readCookiePreferences(): CookiePreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(COOKIE_PREFERENCES_KEY);
    if (!raw) return null;
    const saved: unknown = JSON.parse(raw);
    if (
      typeof saved === "object" && saved !== null &&
      "analytics" in saved && typeof saved.analytics === "boolean" &&
      "advertising" in saved && typeof saved.advertising === "boolean"
    ) {
      return { analytics: saved.analytics, advertising: saved.advertising };
    }
  } catch {
    // Se l'archiviazione è bloccata, non presumiamo mai il consenso.
  }
  return null;
}

export function writeCookiePreferences(value: CookiePreferences): void {
  try {
    window.localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(value));
  } catch {
    // Le preferenze verranno richieste nuovamente alla prossima visita.
  }
}

export function trackBookingRequestSubmitted(): void {
  if (typeof window === "undefined") return;
  const consent = readCookiePreferences();
  if (!consent?.analytics) return;
  window.dataLayer = window.dataLayer || [];
  // Il Google tag legge i comandi gtag nella forma degli argomenti della funzione.
  function gtag(..._args: unknown[]) {
    window.dataLayer?.push(arguments);
  }
  // Non inviare nome, email, telefono, tipologia del colloquio o informazioni sanitarie.
  gtag("event", "booking_request_submitted", { send_to: GOOGLE_ANALYTICS_ID });
}
