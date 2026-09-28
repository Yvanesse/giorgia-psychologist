import { NextResponse } from "next/server";

import { isGoogleCalendarConfigured } from "@/lib/google-calendar";
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

    return NextResponse.json({
      configured: isGoogleCalendarConfigured(),
      calendarIdConfigured: Boolean(process.env.GOOGLE_CALENDAR_ID?.trim()),
    });
  } catch {
    return NextResponse.json({ message: "Stato Calendar non disponibile." }, { status: 503 });
  }
}
