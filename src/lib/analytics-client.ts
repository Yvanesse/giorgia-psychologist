// Raccogliamo solo preferenze tecniche e un evento privo di dati personali.
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
  if (!consent || (!consent.analytics && !consent.advertising)) return;
  window.dataLayer = window.dataLayer || [];
  // Non inviare nome, email, telefono, tipo di colloquio o altre informazioni sanitarie.
  window.dataLayer.push({ event: "booking_request_submitted" });
}
