import { NextResponse } from "next/server";

import {
  sendAdminBookingRequestNotification,
  sendPatientRequestReceived,
} from "@/lib/booking-email";
import {
  bookingSlotRange,
  isAllowedBookingDate,
  isAllowedBookingTime,
} from "@/lib/booking-schedule";
import {
  getBusyPeriods,
  isGoogleCalendarConfigured,
  overlapsBusyPeriod,
} from "@/lib/google-calendar";
import { createAdminClient } from "@/lib/supabase/admin";

type BookingPayload = {
  serviceType?: "individuale" | "coppia" | "familiare";
  mode?: "in-presenza" | "online";
  date?: string;
  time?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string) {
  return /^[+\d][\d\s().-]{6,}$/.test(value);
}

function safe(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

async function saveBooking(payload: Required<BookingPayload>) {
  const supabase = createAdminClient();
  if (!supabase) throw new Error("Booking database unavailable");

  const { error } = await supabase.from("appointment_requests").insert({
    mode: payload.mode,
    service_type: payload.serviceType,
    appointment_date: payload.date,
    appointment_time: payload.time,
    first_name: payload.firstName,
    last_name: payload.lastName,
    email: payload.email,
    phone: payload.phone,
    status: "new",
  });

  if (error) {
    if (error.code === "23505") {
      return { configured: true, saved: false, slotTaken: true };
    }
    throw error;
  }

  return { configured: true, saved: true, slotTaken: false };
}

async function ensureCalendarAvailability(payload: Required<BookingPayload>) {
  if (!isGoogleCalendarConfigured()) return true;

  const { start, end } = bookingSlotRange(payload.date, payload.time);
  const busy = await getBusyPeriods(start.toISOString(), end.toISOString());
  return !overlapsBusyPeriod(start, end, busy);
}

async function sendSmsNotification(payload: Required<BookingPayload>) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  const to = process.env.BOOKING_NOTIFICATION_PHONE;

  if (!accountSid || !authToken || !from || !to) return { configured: false, sent: false };

  const serviceLabel = payload.serviceType === "coppia" ? "di coppia" : payload.serviceType === "familiare" ? "familiare" : "individuale";
  const body = `Nuova richiesta (${serviceLabel}): ${payload.firstName} ${payload.lastName}, ${payload.date} ${payload.time}, ${
    payload.mode === "online" ? "online" : "in presenza"
  }.`;

  const params = new URLSearchParams({ From: from, To: to, Body: body });
  const auth = Buffer.from(`${accountSid}:${authToken}`).toString("base64");

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    },
  );

  return { configured: true, sent: response.ok };
}

export async function POST(request: Request) {
  let input: BookingPayload;

  try {
    input = (await request.json()) as BookingPayload;
  } catch {
    return NextResponse.json({ message: "Richiesta non valida." }, { status: 400 });
  }

  if (
    input.serviceType !== "individuale" &&
    input.serviceType !== "coppia" &&
    input.serviceType !== "familiare"
  ) {
    return NextResponse.json({ message: "Seleziona la tipologia del colloquio." }, { status: 400 });
  }

  const payload: Required<BookingPayload> = {
    serviceType: input.serviceType,
    mode: input.mode === "online" ? "online" : "in-presenza",
    date: safe(input.date),
    time: safe(input.time),
    firstName: safe(input.firstName),
    lastName: safe(input.lastName),
    email: safe(input.email),
    phone: safe(input.phone),
  };

  if (
    !payload.serviceType ||
    !payload.date ||
    !/^\d{4}-\d{2}-\d{2}$/.test(payload.date) ||
    !isAllowedBookingDate(payload.date) ||
    !payload.time ||
    !/^\d{2}:\d{2}$/.test(payload.time) ||
    !isAllowedBookingTime(payload.time) ||
    !payload.firstName ||
    !payload.lastName ||
    !isValidEmail(payload.email) ||
    !isValidPhone(payload.phone)
  ) {
    return NextResponse.json(
      { message: "Controlla i dati inseriti e riprova." },
      { status: 400 },
    );
  }

  try {
    const calendarAvailable = await ensureCalendarAvailability(payload);
    if (!calendarAvailable) {
      return NextResponse.json(
        { message: "Questo orario non è più disponibile. Scegli un altro slot." },
        { status: 409 },
      );
    }

    const bookingResult = await saveBooking(payload);

    if ("slotTaken" in bookingResult && bookingResult.slotTaken) {
      return NextResponse.json(
        { message: "Questo orario è appena stato richiesto. Scegli un altro slot." },
        { status: 409 },
      );
    }
    const [adminEmailResult, patientEmailResult, smsResult] = await Promise.all([
      sendAdminBookingRequestNotification(payload),
      sendPatientRequestReceived(payload).catch(() => ({ configured: true, sent: false })),
      sendSmsNotification(payload),
    ]);

    const anyNotificationConfigured = adminEmailResult.configured || smsResult.configured;
    const notificationSent = adminEmailResult.sent || smsResult.sent;

    if (anyNotificationConfigured && !notificationSent) {
      return NextResponse.json(
        {
          message: bookingResult.saved
            ? "La richiesta è stata salvata, ma la notifica non è partita. Verrà comunque visualizzata in dashboard."
            : "La richiesta è valida, ma le notifiche non sono state inviate. Controlla la configurazione Vercel.",
        },
        { status: bookingResult.saved ? 202 : 502 },
      );
    }

    if (bookingResult.saved) {
      return NextResponse.json({
        message: notificationSent
          ? "Richiesta inviata correttamente."
          : "Richiesta registrata correttamente.",
        patientNotificationSent: patientEmailResult.sent,
      });
    }

    return NextResponse.json({ message: "Servizio prenotazioni non disponibile." }, { status: 503 });
  } catch {
    return NextResponse.json(
      { message: "Non è stato possibile elaborare la richiesta. Riprova tra poco." },
      { status: 500 },
    );
  }
}
