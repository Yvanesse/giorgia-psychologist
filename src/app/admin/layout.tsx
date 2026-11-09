import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Protect the page on the server, not just the dashboard's data requests.
  // Fail closed if the session, database, or role check cannot be verified.
  let isAuthorized = false;

  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (!authError && user) {
      const { data: membership, error: membershipError } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

      isAuthorized = !membershipError && Boolean(membership);
    }
  } catch {
    // Missing or unavailable authentication never grants access.
  }

  if (!isAuthorized) {
    redirect("/area-riservata?next=%2Fadmin");
  }

  return children;
}
