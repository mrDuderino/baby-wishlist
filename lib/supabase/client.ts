import { getSupabaseBrowserEnv } from "@/lib/env";
import type { Database } from "@/types/database";
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const { url, anonKey } = getSupabaseBrowserEnv();

  return createBrowserClient<Database>(url, anonKey);
}
