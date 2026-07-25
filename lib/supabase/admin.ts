import { getServerEnv, getSupabaseServerEnv } from "@/lib/env";
import type { Database } from "@/types/database";
import { createClient } from "@supabase/supabase-js";

export function createAdminClient() {
  const { url, anonKey } = getSupabaseServerEnv();
  const { SUPABASE_SERVICE_ROLE_KEY: serviceRoleKey } = getServerEnv();

  if (!serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is required for admin operations.",
    );
  }

  return createClient<Database>(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      headers: {
        apikey: anonKey,
      },
    },
  });
}
