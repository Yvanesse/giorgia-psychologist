import { NextResponse } from "next/server";

import { bookingSlotRange } from "@/lib/booking-schedule";
import {
  createCalendarAppointment,
  deleteCalendarAppointment,
  getBusyPeriods,
  isGoogleCalendarConfigured,
  overlapsBusyPeriod,
} from "@/lib/google-calendar";
import { createClient } from "@/lib/supabase/server";

async function getAdminContext() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { response: NextResponse.json({ message: "Accesso non autorizzato." }, { status: 401 }) };
  }

  const { data: membership } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!membership) {
    return { response: NextResponse.json({ message: "Accesso non autorizzato." }, { status: 403 }) };
  }

  return { supabase, user };
}

export async function GET() {
  try {
    const context = await getAdminContext();
    if ("response" in context) return context.response;

    const { data, error } = await context.supabase
      .from("appointment_requests")
      .select("id, mode, appointment_date, appointment_time, first_name, last_name, email, phone, status, google_event_id, created_at")
      .order("appointment_date", { ascending: true })
      .order("appointment_time", { ascending: true });

    if (error) throw error;

    return NextResponse.json({ items: data ?? [] });
  } catch {
    return NextResponse.json({ message: "Database non ancora disponibile." }, { status: 503 });
  }
}

export async function PATCH(request: Request) {
  let input: { id?: string; status?: "confirmed" | "cancelled" | "completed" };

  try {
    input = (await request.json()) as typeof input;
  } catch {
    return NextResponse.json({ message: "Richiesta non valida." }, { status: 400 });
  }

  if (!input.id || !input.status || !["confirmed", "cancelled", "completed"].includes(input.status)) {
    return NextResponse.json({ message: "Azione non valida." }, { status: 400 });
  }

  try {
    const context = await getAdminContext();
    if ("response" in context) return context.response;

    const { data: appointment, error: appointmentError } = await context.supabase
      .from("appointment_requests")
      .select("id, mode, appointment_date, appointment_time, status, google_event_id")
      .eq("id", input.id)
      .maybeSingle();

    if (appointmentError) throw appointmentError;
    if (!appointment) {
      return NextResponse.json({ message: "Appuntamento non trovato." }, { status: 404 });
    }

    if (input.status === "confirmed") {
      if (appointment.status === "confirmed" && appointment.google_event_id) {
        return NextResponse.json({ item: appointment });
      }

      if (!isGoogleCalendarConfigured()) {
        return NextResponse.json(
          { message: "Google Calendar non è ancora configurato." },
          { status: 409 },
        );
      }

      const { start, end } = bookingSlotRange(
        appointment.appointment_date,
        String(appointment.appointment_time).slice(0, 5),
      );
      const busy = await getBusyPeriods(start.toISOString(), end.toISOString());

      if (overlapsBusyPeriod(start, end, busy)) {
        return NextResponse.json(
          { message: "Questo orario risulta ora occupato su Google Calendar." },
          { status: 409 },
        );
      }

      const googleEventId = await createCalendarAppointment({
        appointmentId: appointment.id,
        start: start.toISOString(),
        end: end.toISOString(),
        mode: appointment.mode,
      });

      const { data, error } = await context.supabase
        .from("appointment_requests")
        .update({ status: "confirmed", google_event_id: googleEventId })
        .eq("id", appointment.id)
        .select("id, mode, appointment_date, appointment_time, first_name, last_name, email, phone, status, google_event_id, created_at")
        .single();

      if (error) {
        await deleteCalendarAppointment(googleEventId).catch(() => undefined);
        throw error;
      }

      return NextResponse.json({ item: data });
    }

    if (input.status === "cancelled" && appointment.google_event_id) {
      if (!isGoogleCalendarConfigured()) {
        return NextResponse.json(
          { message: "Google Calendar non è disponibile per rimuovere l’evento." },
          { status: 409 },
        );
      }

      await deleteCalendarAppointment(appointment.google_event_id);
    }

    const { data, error } = await context.supabase
      .from("appointment_requests")
      .update({
        status: input.status,
        google_event_id: input.status === "cancelled" ? null : appointment.google_event_id,
      })
      .eq("id", appointment.id)
      .select("id, mode, appointment_date, appointment_time, first_name, last_name, email, phone, status, google_event_id, created_at")
      .single();

    if (error) throw error;

    return NextResponse.json({ item: data });
  } catch {
    return NextResponse.json(
      { message: "Non è stato possibile aggiornare l’appuntamento." },
      { status: 500 },
    );
  }
}
