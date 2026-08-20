import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

type BookingPayload = {
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

async function sendEmailNotification(payload: Required<BookingPayload>) {
  const user = process.env.GMAIL_USER;
  const appPassword = process.env.GMAIL_APP_PASSWORD;
  const to = process.env.BOOKING_NOTIFICATION_EMAIL;

  if (!user || !appPassword || !to) return false;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass: appPassword,
    },
  });

  const subject = `Nuova richiesta di appuntamento — ${payload.firstName} ${payload.lastName}`;
  const text = [
    "Nuova richiesta di appuntamento",
    "",
    `Nome: ${payload.firstName} ${payload.lastName}`,
    `Email: ${payload.email}`,
    `Telefono: ${payload.phone}`,
    `Modalità: ${payload.mode === "online" ? "Online" : "In presenza"}`,
    `Data: ${payload.date}`,
    `Ora: ${payload.time}`,
  ].join("\n");

  await transporter.sendMail({
    from: `Sito Giorgia Petruzzellis <${user}>`,
    to,
    replyTo: payload.email,
    subject,
    text,
  });

  return true;
}

async function sendSmsNotification(payload: Required<BookingPayload>) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  const to = process.env.BOOKING_NOTIFICATION_PHONE;

  if (!accountSid || !authToken || !from || !to) return false;

  const body = `Nuova richiesta: ${payload.firstName} ${payload.lastName}, ${payload.date} ${payload.time}, ${
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

  return response.ok;
}

export async function POST(request: Request) {
  let input: BookingPayload;

  try {
    input = (await request.json()) as BookingPayload;
  } catch {
    return NextResponse.json({ message: "Richiesta non valida." }, { status: 400 });
  }

  const payload: Required<BookingPayload> = {
    mode: input.mode === "online" ? "online" : "in-presenza",
    date: safe(input.date),
    time: safe(input.time),
    firstName: safe(input.firstName),
    lastName: safe(input.lastName),
    email: safe(input.email),
    phone: safe(input.phone),
  };

  if (
    !payload.date ||
    !/^\d{4}-\d{2}-\d{2}$/.test(payload.date) ||
    !payload.time ||
    !/^\d{2}:\d{2}$/.test(payload.time) ||
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
    const [emailSent, smsSent] = await Promise.all([
      sendEmailNotification(payload),
      sendSmsNotification(payload),
    ]);

    const notificationsConfigured = Boolean(
      process.env.BOOKING_NOTIFICATION_EMAIL || process.env.BOOKING_NOTIFICATION_PHONE,
    );

    if (notificationsConfigured && !emailSent && !smsSent) {
      return NextResponse.json(
        { message: "La richiesta è valida, ma le notifiche di test non sono state inviate. Controlla la configurazione Vercel." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      message: notificationsConfigured
        ? "Richiesta inviata. La notifica di test è stata inoltrata."
        : "Richiesta registrata in modalità test. Le notifiche non sono ancora configurate.",
    });
  } catch {
    return NextResponse.json(
      { message: "Non è stato possibile elaborare la richiesta. Riprova tra poco." },
      { status: 500 },
    );
  }
}
