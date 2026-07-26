import { createClient } from "@/lib/supabase/server";
import type { Setting } from "@/types/database";

export async function getAdminSettings(): Promise<Setting[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("settings").select("*");

  if (error) {
    throw new Error("Failed to load settings.");
  }

  return data ?? [];
}

export async function getAdminSetting(key: string): Promise<Setting | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .eq("key", key)
    .maybeSingle();

  if (error) {
    throw new Error("Failed to load setting.");
  }

  return data;
}
