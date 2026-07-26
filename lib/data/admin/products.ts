import { createClient } from "@/lib/supabase/server";
import type { Category, Product } from "@/types/database";

export type ProductWithCategory = Product & {
  category: Pick<Category, "id" | "name" | "emoji"> | null;
};

export async function getAdminProducts(): Promise<ProductWithCategory[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      category:categories (
        id,
        name,
        emoji
      )
    `,
    )
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error("Failed to load products.");
  }

  return (data ?? []) as ProductWithCategory[];
}

export async function getAdminProduct(id: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error("Failed to load product.");
  }

  return data;
}
