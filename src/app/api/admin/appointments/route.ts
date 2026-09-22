import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ message: "Accesso non autorizzato." }, { status: 401 });
    }

    const { data: membership } = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!membership) {
      return NextResponse.json({ message: "Accesso non autorizzato." }, { status: 403 });
    }

    const { data, error } = await supabase
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
