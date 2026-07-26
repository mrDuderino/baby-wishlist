"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { writeAdminAuditLog } from "@/lib/admin/audit";
import { requireAdminSession } from "@/lib/admin/session";
import { createClient } from "@/lib/supabase/server";

import type { AdminActionState } from "@/lib/admin/actions/categories";

type ReservationAction = "confirm" | "cancel" | "purchase" | "delete";

export async function updateReservationAction(
  id: string,
  action: ReservationAction,
): Promise<AdminActionState> {
  const session = await requireAdminSession();
  const supabase = await createClient();

  const { data: reservation } = await supabase
    .from("reservations")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!reservation) {
    return { error: "Бронь не найдена" };
  }

  const now = new Date().toISOString();

  if (action === "confirm") {
    const { error } = await supabase
      .from("reservations")
      .update({ status: "confirmed", confirmed_at: now })
      .eq("id", id);

    if (error) {
      return { error: "Не удалось подтвердить бронь" };
    }

    await writeAdminAuditLog({
      adminId: session.user.id,
      action: "reservation_confirmed",
      entity: "reservation",
      entityId: id,
      oldValue: reservation,
      newValue: { status: "confirmed" },
    });
  }

  if (action === "cancel") {
    const { error: reservationError } = await supabase
      .from("reservations")
      .update({ status: "cancelled", cancelled_at: now })
      .eq("id", id);

    if (reservationError) {
      return { error: "Не удалось отменить бронь" };
    }

    await supabase
      .from("products")
      .update({ status: "available", reservation_id: null })
      .eq("id", reservation.product_id)
      .eq("reservation_id", id);

    await writeAdminAuditLog({
      adminId: session.user.id,
      action: "reservation_cancelled",
      entity: "reservation",
      entityId: id,
      oldValue: reservation,
      newValue: { status: "cancelled" },
    });
  }

  if (action === "purchase") {
    const { error: reservationError } = await supabase
      .from("reservations")
      .update({ status: "purchased", purchased_at: now })
      .eq("id", id);

    if (reservationError) {
      return { error: "Не удалось отметить как купленное" };
    }

    await supabase
      .from("products")
      .update({ status: "purchased" })
      .eq("id", reservation.product_id);

    await writeAdminAuditLog({
      adminId: session.user.id,
      action: "reservation_purchased",
      entity: "reservation",
      entityId: id,
      oldValue: reservation,
      newValue: { status: "purchased" },
    });
  }

  if (action === "delete") {
    const { error } = await supabase.from("reservations").delete().eq("id", id);

    if (error) {
      return { error: "Не удалось удалить бронь" };
    }

    await supabase
      .from("products")
      .update({ status: "available", reservation_id: null })
      .eq("id", reservation.product_id)
      .eq("reservation_id", id);

    await writeAdminAuditLog({
      adminId: session.user.id,
      action: "reservation_deleted",
      entity: "reservation",
      entityId: id,
      oldValue: reservation,
    });

    revalidatePath("/admin/reservations");
    revalidatePath("/");
    redirect("/admin/reservations");
  }

  revalidatePath("/admin/reservations");
  revalidatePath(`/admin/reservations/${id}`);
  revalidatePath("/");
  return { success: true };
}
