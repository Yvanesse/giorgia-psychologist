"use client";

import { useEffect, useRef, useState } from "react";
import {
  GOOGLE_ANALYTICS_ID,
  GOOGLE_ADS_ID,
  readCookiePreferences,
  writeCookiePreferences,
  type CookiePreferences,
} from "@/lib/analytics-client";

const OPEN_PREFERENCES_EVENT = "giorgia:open-cookie-preferences";
const DENIED: CookiePreferences = { analytics: false, advertising: false };

type Panel = "loading" | "banner" | "settings" | "hidden";
type ConsentValue = "granted" | "denied";

function consentState(preferences: CookiePreferences): {
  analytics_storage: ConsentValue;
  ad_storage: ConsentValue;
  ad_user_data: ConsentValue;
  ad_personalization: ConsentValue;
} {
  return {
    analytics_storage: preferences.analytics ? "granted" : "denied",
    ad_storage: preferences.advertising ? "granted" : "denied",
    ad_user_data: preferences.advertising ? "granted" : "denied",
    // Nessun remarketing o pubblicità personalizzata per un servizio sanitario.
    ad_personalization: "denied",
  };
}

// Il tag Google è caricato solo dopo il consenso: niente invii prima della scelta.
function gtag(..._args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(arguments);
}

function sendConsentCommand(method: "default" | "update", preferences: CookiePreferences) {
  gtag("consent", method, consentState(preferences));
}

function loadGoogleMeasurement(preferences: CookiePreferences) {
  if (!preferences.analytics && !preferences.advertising) return;
  if (document.getElementById("giorgia-google-measurement")) return;

  gtag("js", new Date());
  gtag("set", "allow_google_signals", false);
  gtag("set", "allow_ad_personalization_signals", false);

  if (preferences.analytics) {
    gtag("config", GOOGLE_ANALYTICS_ID, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
  }

  if (preferences.advertising) {
    // Tag di base Ads. La conversione verrà configurata senza dati dei pazienti.
    gtag("config", GOOGLE_ADS_ID, {
      send_page_view: false,
      allow_ad_personalization_signals: false,
    });
  }

  const script = document.createElement("script");
  script.id = "giorgia-google-measurement";
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=" +
    (preferences.analytics ? GOOGLE_ANALYTICS_ID : GOOGLE_ADS_ID);
  document.head.appendChild(script);
}

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      className="text-base text-ink-soft hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      onClick={() => window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT))}
    >
      Preferenze cookie
    </button>
  );
}

export function ConsentManager() {
  const [panel, setPanel] = useState<Panel>("loading");
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);
  const activePreferences = useRef<CookiePreferences | null>(null);
  const googleTagLoaded = useRef(false);

  useEffect(() => {
    // Consent Mode v2: neghiamo tutto prima di caricare qualsiasi tag Google.
    sendConsentCommand("default", DENIED);

    const saved = readCookiePreferences();
    activePreferences.current = saved;
    if (saved) {
      setAnalytics(saved.analytics);
      setAdvertising(saved.advertising);
      sendConsentCommand("update", saved);
      if (saved.analytics || saved.advertising) {
        loadGoogleMeasurement(saved);
        googleTagLoaded.current = true;
      }
      setPanel("hidden");
    } else {
      setPanel("banner");
    }

    const reopen = () => setPanel("settings");
    window.addEventListener(OPEN_PREFERENCES_EVENT, reopen);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, reopen);
  }, []);

  function choose(preferences: CookiePreferences) {
    const previous = activePreferences.current;
    writeCookiePreferences(preferences);
    activePreferences.current = preferences;
    setAnalytics(preferences.analytics);
    setAdvertising(preferences.advertising);

    sendConsentCommand("update", preferences);

    // Ricaricare rimuove i tag già caricati se il visitatore revoca il consenso.
    if (
      googleTagLoaded.current &&
      previous &&
      (previous.analytics !== preferences.analytics || previous.advertising !== preferences.advertising)
    ) {
      window.location.reload();
      return;
    }

    if (preferences.analytics || preferences.advertising) {
      loadGoogleMeasurement(preferences);
      googleTagLoaded.current = true;
    }
    setPanel("hidden");
  }

  if (panel === "loading" || panel === "hidden") return null;

  return (
    <div
      aria-label="Preferenze sulla privacy"
      className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-3xl rounded-[1.4rem] border border-border bg-white p-5 shadow-[0_15px_70px_rgba(24,24,27,0.22)] sm:bottom-5 sm:p-7"
      role="region"
    >
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-lg font-semibold text-ink sm:text-xl">
          {panel === "settings" ? "Gestisci le preferenze" : "Rispettiamo la tua privacy"}
        </h2>
        {activePreferences.current ? (
          <button
            aria-label="Chiudi le preferenze cookie"
            className="rounded-full px-2 py-1 text-xl text-ink-muted hover:text-ink"
            onClick={() => setPanel("hidden")}
            type="button"
          >
            ×
          </button>
        ) : null}
      </div>
      <p className="mt-2 text-sm leading-6 text-ink-soft">
        I cookie necessari mantengono il sito funzionante. Con il tuo consenso possiamo
        utilizzare Google Analytics per statistiche di visita e Google Ads per misurare
        l'efficacia delle campagne. Non utilizziamo questi strumenti per il remarketing.
        Puoi rifiutare o modificare le preferenze in qualsiasi momento.
      </p>
      {panel === "settings" ? (
        <div className="mt-4 space-y-3 rounded-2xl border border-border bg-surface-muted p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-ink">Cookie necessari</p>
              <p className="text-xs text-ink-muted">Funzionamento e sicurezza del sito</p>
            </div>
            <span className="text-xs font-semibold text-ink-muted">Sempre attivi</span>
          </div>
          <label className="flex cursor-pointer items-center justify-between gap-3 border-t border-border pt-3">
            <span>
              <span className="block text-sm font-semibold text-ink">Statistiche – Google Analytics</span>
              <span className="block text-xs text-ink-muted">Visite e utilizzo delle pagine</span>
            </span>
            <input
              checked={analytics}
              className="size-5 accent-primary"
              onChange={(event) => setAnalytics(event.target.checked)}
              type="checkbox"
            />
          </label>
          <label className="flex cursor-pointer items-center justify-between gap-3 border-t border-border pt-3">
            <span>
              <span className="block text-sm font-semibold text-ink">Misurazione – Google Ads</span>
              <span className="block text-xs text-ink-muted">Efficacia degli annunci, senza remarketing</span>
            </span>
            <input
              checked={advertising}
              className="size-5 accent-primary"
              onChange={(event) => setAdvertising(event.target.checked)}
              type="checkbox"
            />
          </label>
        </div>
      ) : null}
      <p className="mt-3 text-xs text-ink-muted">
        Leggi la <a className="underline hover:text-primary" href="/cookie-policy">Cookie Policy</a> e la{" "}
        <a className="underline hover:text-primary" href="/privacy-policy">Privacy Policy</a>.
      </p>
      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button
          className="min-h-11 rounded-full border border-border px-5 text-sm font-semibold text-ink hover:bg-surface-muted"
          onClick={() => choose(DENIED)}
          type="button"
        >
          Rifiuta facoltativi
        </button>
        {panel === "banner" ? (
          <button
            className="min-h-11 rounded-full border border-border px-5 text-sm font-semibold text-ink hover:bg-surface-muted"
            onClick={() => setPanel("settings")}
            type="button"
          >
            Personalizza
          </button>
        ) : (
          <button
            className="min-h-11 rounded-full border border-border px-5 text-sm font-semibold text-ink hover:bg-surface-muted"
            onClick={() => choose({ analytics, advertising })}
            type="button"
          >
            Salva preferenze
          </button>
        )}
        <button
          className="min-h-11 rounded-full bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-strong"
          onClick={() => choose({ analytics: true, advertising: true })}
          type="button"
        >
          Accetta tutti
        </button>
      </div>
    </div>
  );
}
