import { createSign } from "node:crypto";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const CALENDAR_API = "https://www.googleapis.com/calendar/v3";
const CALENDAR_SCOPES = [
  "https://www.googleapis.com/auth/calendar.events",
  "https://www.googleapis.com/auth/calendar.freebusy",
].join(" ");

type CalendarConfig = {
  serviceAccountEmail: string;
  privateKey: string;
  calendarId: string;
  busyCalendarIds: string[];
};

type BusyPeriod = {
  start: string;
  end: string;
};

function base64Url(input: string | Buffer) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

export function getGoogleCalendarConfig(): CalendarConfig | null {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n").trim();
  const calendarId = process.env.GOOGLE_CALENDAR_ID?.trim();

  if (!serviceAccountEmail || !privateKey || !calendarId) {
    return null;
  }

  const configuredBusyIds = (process.env.GOOGLE_BUSY_CALENDAR_IDS ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  const busyCalendarIds = Array.from(new Set([calendarId, ...configuredBusyIds]));

  return {
    serviceAccountEmail,
    privateKey,
    calendarId,
    busyCalendarIds,
  };
}

export function isGoogleCalendarConfigured() {
  return getGoogleCalendarConfig() !== null;
}

async function getAccessToken(config: CalendarConfig) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = base64Url(
    JSON.stringify({
      iss: config.serviceAccountEmail,
      scope: CALENDAR_SCOPES,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    }),
  );

  const unsignedToken = `${header}.${payload}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsignedToken);
  signer.end();

  const signature = signer.sign(config.privateKey);
  const assertion = `${unsignedToken}.${base64Url(signature)}`;

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Google Calendar authentication failed.");
  }

  const data = (await response.json()) as { access_token?: string };
  if (!data.access_token) {
    throw new Error("Google Calendar access token missing.");
  }

  return data.access_token;
}

async function calendarFetch(path: string, init: RequestInit = {}) {
  const config = getGoogleCalendarConfig();
  if (!config) {
    throw new Error("Google Calendar is not configured.");
  }

  const accessToken = await getAccessToken(config);
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${accessToken}`);
  headers.set("Content-Type", "application/json");

  const response = await fetch(`${CALENDAR_API}${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Google Calendar request failed (${response.status}): ${detail.slice(0, 400)}`);
  }

  return response;
}

export async function getBusyPeriods(timeMin: string, timeMax: string) {
  const config = getGoogleCalendarConfig();
  if (!config) return [] as BusyPeriod[];

  const response = await calendarFetch("/freeBusy", {
    method: "POST",
    body: JSON.stringify({
      timeMin,
      timeMax,
      timeZone: "Europe/Rome",
      items: config.busyCalendarIds.map((id) => ({ id })),
    }),
  });

  const data = (await response.json()) as {
    calendars?: Record<string, { busy?: BusyPeriod[] }>;
  };

  return Object.values(data.calendars ?? {}).flatMap((calendar) => calendar.busy ?? []);
}

export function overlapsBusyPeriod(start: Date, end: Date, busyPeriods: BusyPeriod[]) {
  return busyPeriods.some((period) => {
    const busyStart = new Date(period.start);
    const busyEnd = new Date(period.end);
    return start < busyEnd && end > busyStart;
  });
}

export async function createCalendarAppointment(input: {
  appointmentId: string;
  start: string;
  end: string;
  mode: "in-presenza" | "online";
}) {
  const config = getGoogleCalendarConfig();
  if (!config) {
    throw new Error("Google Calendar is not configured.");
  }

  const response = await calendarFetch(
    `/calendars/${encodeURIComponent(config.calendarId)}/events`,
    {
      method: "POST",
      body: JSON.stringify({
        summary: "Appuntamento riservato",
        description: [
          `Richiesta sito: ${input.appointmentId}`,
          `Modalità: ${input.mode === "online" ? "Online" : "In presenza"}`,
        ].join("\n"),
        location: input.mode === "in-presenza" ? "Via Monte d'Alba 76, Trani" : undefined,
        start: { dateTime: input.start, timeZone: "Europe/Rome" },
        end: { dateTime: input.end, timeZone: "Europe/Rome" },
        visibility: "private",
      }),
    },
  );

  const data = (await response.json()) as { id?: string };
  if (!data.id) {
    throw new Error("Google Calendar event id missing.");
  }

  return data.id;
}

export async function deleteCalendarAppointment(eventId: string) {
  const config = getGoogleCalendarConfig();
  if (!config) return;

  await calendarFetch(
    `/calendars/${encodeURIComponent(config.calendarId)}/events/${encodeURIComponent(eventId)}`,
    { method: "DELETE" },
  );
}
