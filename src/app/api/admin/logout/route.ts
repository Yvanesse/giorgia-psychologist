import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch {
    // If Supabase is not configured, there is no session to clear.
  }

  return NextResponse.redirect(new URL("/area-riservata", request.url), 303);
}
