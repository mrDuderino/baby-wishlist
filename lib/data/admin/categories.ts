import { createClient } from "@/lib/supabase/server";
import type { Category } from "@/types/database";

export async function getAdminCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error("Failed to load categories.");
  }

  return data ?? [];
}

export async function getAdminCategory(id: string): Promise<Category | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error("Failed to load category.");
  }

  return data;
}
