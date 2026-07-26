import {
  createReservationPayloadSchema,
  type CreateReservationPayload,
} from "@/lib/validation/reservation";
import { isReservationRateLimited } from "@/lib/rate-limit/reservation";
import { sendReservationCreatedNotification } from "@/lib/telegram/notifications";
import { getServerEnv } from "@/lib/env";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { strings } from "@/lib/strings/ru";
import {
  mapReservationRpcError,
  ReservationError,
} from "@/lib/reservations/errors";

type CreateReservationInput = CreateReservationPayload & {
  ipAddress: string;
  userAgent: string | null;
};

export type CreateReservationResult = {
  reservationId: string;
};

async function writeAuditLog(input: {
  reservationId: string;
  payload: CreateReservationPayload;
  ipAddress: string;
  userAgent: string | null;
}) {
  if (!getServerEnv().SUPABASE_SERVICE_ROLE_KEY) {
    return;
  }

  try {
    const admin = createAdminClient();
    const { error } = await admin.from("audit_logs").insert({
      action: "reservation_created",
      entity: "reservation",
      entity_id: input.reservationId,
      new_value: {
        product_id: input.payload.productId,
        guest_name: input.payload.guestName,
        telegram: input.payload.telegram || null,
        phone: input.payload.phone || null,
        comment: input.payload.comment || null,
      },
      ip_address: input.ipAddress,
      user_agent: input.userAgent,
    });

    if (error) {
      console.error("Failed to write audit log", error);
    }
  } catch (error) {
    console.error("Failed to write audit log", error);
  }
}

async function getProductTitle(productId: string): Promise<string> {
  if (!getServerEnv().SUPABASE_SERVICE_ROLE_KEY) {
    return "Подарок";
  }

  try {
    const admin = createAdminClient();
    const { data: product } = await admin
      .from("products")
      .select("title")
      .eq("id", productId)
      .maybeSingle();

    return product?.title ?? "Подарок";
  } catch {
    return "Подарок";
  }
}

export async function createReservation(
  input: CreateReservationInput,
): Promise<CreateReservationResult> {
  const parsed = createReservationPayloadSchema.safeParse({
    productId: input.productId,
    guestName: input.guestName,
    telegram: input.telegram,
    phone: input.phone,
    comment: input.comment,
  });

  if (!parsed.success) {
    throw new ReservationError("validation", strings.errors.reservationFailed);
  }

  if (await isReservationRateLimited(input.ipAddress)) {
    throw new ReservationError("rate_limit", strings.errors.rateLimit);
  }

  const supabase = await createClient();
  const payload = parsed.data;

  const { data: reservationId, error } = await supabase.rpc(
    "create_reservation",
    {
      p_product_id: payload.productId,
      p_guest_name: payload.guestName,
      p_telegram: payload.telegram || null,
      p_phone: payload.phone || null,
      p_comment: payload.comment || null,
      p_ip_address: input.ipAddress,
      p_user_agent: input.userAgent,
    },
  );

  if (error) {
    throw mapReservationRpcError(error);
  }

  if (!reservationId) {
    throw new ReservationError("generic", strings.errors.reservationFailed);
  }

  const createdAt = new Date().toISOString();
  const productTitle = await getProductTitle(payload.productId);

  void writeAuditLog({
    reservationId,
    payload,
    ipAddress: input.ipAddress,
    userAgent: input.userAgent,
  });

  void sendReservationCreatedNotification({
    reservationId,
    guestName: payload.guestName,
    productTitle,
    telegram: payload.telegram || null,
    phone: payload.phone || null,
    comment: payload.comment || null,
    createdAt,
  }).catch((notificationError) => {
    console.error("Failed to send Telegram notification", notificationError);
  });

  return { reservationId };
}
