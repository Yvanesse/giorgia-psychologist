import { createClient as createSupabaseClient } from "@supabase/supabase-js";

import { getSupabasePublicConfig } from "./config";

export function createAdminClient() {
  const config = getSupabasePublicConfig();

  if (!config) {
    return null;
  }

  return createSupabaseClient(config.url, config.publishableKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
