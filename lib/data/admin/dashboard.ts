import { createClient } from "@/lib/supabase/server";
import type { Reservation, ReservationStatus } from "@/types/database";

export type DashboardStats = {
  totalProducts: number;
  availableProducts: number;
  reservedProducts: number;
  purchasedProducts: number;
  pendingReservations: number;
  totalCategories: number;
};

export type ReservationWithProduct = Reservation & {
  product: {
    id: string;
    title: string;
    slug: string;
  } | null;
};

export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = await createClient();

  const [productsResult, categoriesResult, reservationsResult] =
    await Promise.all([
      supabase.from("products").select("status"),
      supabase.from("categories").select("id", { count: "exact", head: true }),
      supabase
        .from("reservations")
        .select("status")
        .eq("status", "pending" satisfies ReservationStatus),
    ]);

  const products = productsResult.data ?? [];

  return {
    totalProducts: products.length,
    availableProducts: products.filter((item) => item.status === "available")
      .length,
    reservedProducts: products.filter((item) => item.status === "reserved")
      .length,
    purchasedProducts: products.filter((item) => item.status === "purchased")
      .length,
    pendingReservations: reservationsResult.data?.length ?? 0,
    totalCategories: categoriesResult.count ?? 0,
  };
}

export async function getLatestReservations(
  limit = 8,
): Promise<ReservationWithProduct[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reservations")
    .select(
      `
      *,
      product:products!reservations_product_id_fkey (
        id,
        title,
        slug
      )
    `,
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Failed to load latest reservations", error);
    return [];
  }

  return (data ?? []) as ReservationWithProduct[];
}
