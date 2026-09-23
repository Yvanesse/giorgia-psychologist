type BookingEmailPayload = {
  mode: "in-presenza" | "online";
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type EmailResult = {
  configured: boolean;
  sent: boolean;
};

async function sendResendEmail(args: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.BOOKING_FROM_EMAIL;

  if (!apiKey || !from) return { configured: false, sent: false };

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [args.to],
      subject: args.subject,
      text: args.text,
      ...(args.replyTo ? { reply_to: args.replyTo } : {}),
    }),
  });

  return { configured: true, sent: response.ok };
}

function modeLabel(mode: BookingEmailPayload["mode"]) {
  return mode === "online" ? "Online" : "In presenza";
}

export async function sendAdminBookingRequestNotification(
  payload: BookingEmailPayload,
): Promise<EmailResult> {
  const to = process.env.BOOKING_NOTIFICATION_EMAIL;
  if (!to) return { configured: false, sent: false };

  return sendResendEmail({
    to,
    replyTo: payload.email,
    subject: `Nuova richiesta di appuntamento — ${payload.firstName} ${payload.lastName}`,
    text: [
      "Nuova richiesta di appuntamento",
      "",
      `Nome: ${payload.firstName} ${payload.lastName}`,
      `Email: ${payload.email}`,
      `Telefono: ${payload.phone}`,
      `Modalità: ${modeLabel(payload.mode)}`,
      `Data: ${payload.date}`,
      `Ora: ${payload.time}`,
      "",
      "La richiesta è in attesa di conferma dalla dashboard.",
    ].join("\n"),
  });
}

export async function sendPatientRequestReceived(
  payload: BookingEmailPayload,
): Promise<EmailResult> {
  return sendResendEmail({
    to: payload.email,
    subject: "Richiesta di appuntamento ricevuta",
    text: [
      `Ciao ${payload.firstName},`,
      "",
      "abbiamo ricevuto la tua richiesta di appuntamento.",
      "",
      `Data richiesta: ${payload.date}`,
      `Ora: ${payload.time}`,
      `Modalità: ${modeLabel(payload.mode)}`,
      "",
      "La richiesta non è ancora confermata. Riceverai una nuova comunicazione dopo la verifica della disponibilità.",
      "",
      "Dott.ssa Giorgia Petruzzellis",
    ].join("\n"),
  });
}

export async function sendPatientAppointmentStatusNotification(args: {
  status: "confirmed" | "cancelled";
  mode: BookingEmailPayload["mode"];
  date: string;
  time: string;
  firstName: string;
  email: string;
}): Promise<EmailResult> {
  const confirmed = args.status === "confirmed";

  return sendResendEmail({
    to: args.email,
    subject: confirmed ? "Appuntamento confermato" : "Aggiornamento sulla richiesta di appuntamento",
    text: [
      `Ciao ${args.firstName},`,
      "",
      confirmed
        ? "la tua richiesta di appuntamento è stata confermata."
        : "la tua richiesta di appuntamento non è stata confermata.",
      "",
      `Data: ${args.date}`,
      `Ora: ${args.time}`,
      `Modalità: ${modeLabel(args.mode)}`,
      "",
      confirmed
        ? args.mode === "in-presenza"
          ? "L'appuntamento si terrà presso lo studio in Via Monte d'Alba 76, Trani."
          : "Per l'appuntamento online riceverai le indicazioni necessarie direttamente dalla professionista."
        : "Lo slot è stato nuovamente reso disponibile. Puoi inviare una nuova richiesta dal sito.",
      "",
      "Dott.ssa Giorgia Petruzzellis",
    ].join("\n"),
  });
}
