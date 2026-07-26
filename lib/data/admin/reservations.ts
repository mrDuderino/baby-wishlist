import { createClient } from "@/lib/supabase/server";
import type { Reservation, ReservationStatus } from "@/types/database";

export type ReservationWithProduct = Reservation & {
  product: {
    id: string;
    title: string;
    slug: string;
    status: string;
  } | null;
};

export async function getAdminReservations(
  status?: ReservationStatus,
): Promise<ReservationWithProduct[]> {
  const supabase = await createClient();
  let query = supabase
    .from("reservations")
    .select(
      `
      *,
      product:products!reservations_product_id_fkey (
        id,
        title,
        slug,
        status
      )
    `,
    )
    .order("created_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Failed to load reservations", error);
    throw new Error("Failed to load reservations.");
  }

  return (data ?? []) as ReservationWithProduct[];
}

export async function getAdminReservation(
  id: string,
): Promise<ReservationWithProduct | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reservations")
    .select(
      `
      *,
      product:products!reservations_product_id_fkey (
        id,
        title,
        slug,
        status
      )
    `,
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Failed to load reservation", error);
    throw new Error("Failed to load reservation.");
  }

  return (data ?? null) as ReservationWithProduct | null;
}
