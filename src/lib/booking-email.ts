type BookingEmailPayload = {
  serviceType: "individuale" | "coppia" | "familiare";
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
  html?: string;
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
      ...(args.html ? { html: args.html } : {}),
      ...(args.replyTo ? { reply_to: args.replyTo } : {}),
    }),
  });

  if (!response.ok) {
    console.warn("Resend email send failed", { status: response.status });
  }

  return { configured: true, sent: response.ok };
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    };
    return entities[character];
  });
}

function managementUrl() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://giorgiapetruzzellis.it";
  return new URL("/area-riservata?next=%2Fadmin%3Fview%3Dappointments", base).toString();
}

function modeLabel(mode: BookingEmailPayload["mode"]) {
  return mode === "online" ? "Online" : "In presenza";
}

function serviceLabel(service: BookingEmailPayload["serviceType"] | null | undefined) {
  return service === "coppia" ? "Di coppia" : service === "familiare" ? "Familiare" : service === "individuale" ? "Individuale" : "Non specificato";
}

export async function sendAdminBookingRequestNotification(
  payload: BookingEmailPayload,
): Promise<EmailResult> {
  const to = process.env.BOOKING_NOTIFICATION_EMAIL;
  if (!to) return { configured: false, sent: false };

  const url = managementUrl();
  const details = [
    ["Paziente", `${payload.firstName} ${payload.lastName}`],
    ["Email", payload.email],
    ["Telefono", payload.phone],
    ["Percorso", serviceLabel(payload.serviceType)],
    ["Modalità", modeLabel(payload.mode)],
    ["Data", payload.date],
    ["Ora", payload.time],
  ];

  return sendResendEmail({
    to,
    replyTo: payload.email,
    html: `<!doctype html><html lang="it"><body style="margin:0;padding:24px;background:#f7f7f8;font-family:Arial,Helvetica,sans-serif;color:#18181b">
      <div style="max-width:560px;margin:auto;padding:30px;background:#fff;border:1px solid #e7e3dd;border-radius:18px">
      <p style="font-size:13px;letter-spacing:.08em;color:#5b35f5;font-weight:700">NUOVA RICHIESTA</p>
      <h1 style="font-size:25px;line-height:1.3">Nuovo appuntamento da confermare</h1>
      <p style="line-height:1.6">È arrivata una richiesta dal sito. Accedi all’area riservata per valutarla.</p>
      ${details.map(([label, value]) => `<p style="margin:8px 0;line-height:1.5"><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`).join("")}
      <p style="margin:30px 0"><a href="${escapeHtml(url)}" style="display:inline-block;padding:15px 22px;background:#5b35f5;color:#fff;text-decoration:none;border-radius:26px;font-weight:700">Apri richieste da confermare</a></p>
      <p style="font-size:13px;line-height:1.6;color:#71717a">Il pulsante apre l’accesso riservato e non conferma automaticamente l’appuntamento.<br>
      Se il pulsante non funziona, copia questo indirizzo: <a href="${escapeHtml(url)}">${escapeHtml(url)}</a></p>
      </div></body></html>`,

    subject: `Nuova richiesta di appuntamento — ${payload.firstName} ${payload.lastName}`,
    text: [
      "Nuova richiesta di appuntamento",
      "",
      `Nome: ${payload.firstName} ${payload.lastName}`,
      `Email: ${payload.email}`,
      `Telefono: ${payload.phone}`,
      `Percorso: ${serviceLabel(payload.serviceType)}`,
      `Modalità: ${modeLabel(payload.mode)}`,
      `Data: ${payload.date}`,
      `Ora: ${payload.time}`,
      "",
      "La richiesta è in attesa di conferma dalla dashboard.",
      "",
      "Apri le richieste nell’area riservata:",
      url,
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
      `Percorso: ${serviceLabel(payload.serviceType)}`,
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
  serviceType: BookingEmailPayload["serviceType"] | null;
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
      `Percorso: ${serviceLabel(args.serviceType)}`,
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
