import { NextResponse } from "next/server";

import { getClientIp, getUserAgent } from "@/lib/helpers/request";
import { createReservation } from "@/lib/reservations/create-reservation";
import { ReservationError } from "@/lib/reservations/errors";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const ipAddress = getClientIp(request);
    const userAgent = await getUserAgent();

    const result = await createReservation({
      productId: String(body.productId ?? ""),
      guestName: String(body.guestName ?? ""),
      telegram: body.telegram ? String(body.telegram) : "",
      phone: body.phone ? String(body.phone) : "",
      comment: body.comment ? String(body.comment) : "",
      ipAddress,
      userAgent,
    });

    return NextResponse.json({
      success: true,
      reservationId: result.reservationId,
    });
  } catch (error) {
    if (error instanceof ReservationError) {
      const status = error.code === "rate_limit" ? 429 : 400;

      return NextResponse.json(
        {
          success: false,
          code: error.code,
          message: error.message,
        },
        { status },
      );
    }

    console.error("Unexpected reservation error", error);

    return NextResponse.json(
      {
        success: false,
        code: "generic",
        message: "Не удалось выполнить бронирование. Попробуйте ещё раз.",
      },
      { status: 500 },
    );
  }
}
