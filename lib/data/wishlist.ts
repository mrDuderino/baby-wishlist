import { hasSupabaseEnv } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import type { Category, Product, Setting } from "@/types/database";

export async function getPublicCategories(): Promise<Category[]> {
  if (!hasSupabaseEnv()) {
    return [];
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("visible", true)
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("Failed to load categories", error);
      return [];
    }

    return data ?? [];
  } catch (error) {
    console.error("Failed to load categories", error);
    return [];
  }
}

export async function getPublicProducts(): Promise<Product[]> {
  if (!hasSupabaseEnv()) {
    return [];
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("visible", true)
      .neq("status", "hidden")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("Failed to load products", error);
      return [];
    }

    return data ?? [];
  } catch (error) {
    console.error("Failed to load products", error);
    return [];
  }
}

export async function getPublicSettings(): Promise<Setting[]> {
  if (!hasSupabaseEnv()) {
    return [];
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("settings")
      .select("*")
      .eq("is_public", true);

    if (error) {
      console.error("Failed to load settings", error);
      return [];
    }

    return data ?? [];
  } catch (error) {
    console.error("Failed to load settings", error);
    return [];
  }
}

export async function getWishlistStats() {
  if (!hasSupabaseEnv()) {
    return {
      total: 21,
      reserved: 0,
      purchased: 0,
      available: 21,
    };
  }

  const products = await getPublicProducts();

  const reserved = products.filter(
    (product) => product.status === "reserved",
  ).length;
  const purchased = products.filter(
    (product) => product.status === "purchased",
  ).length;
  const available = products.filter(
    (product) => product.status === "available",
  ).length;

  return {
    total: products.length,
    reserved,
    purchased,
    available,
  };
}
