import { strings } from "@/lib/strings/ru";

export type ReservationErrorCode =
  | "product_taken"
  | "product_not_found"
  | "validation"
  | "rate_limit"
  | "generic";

export class ReservationError extends Error {
  readonly code: ReservationErrorCode;

  constructor(code: ReservationErrorCode, message: string) {
    super(message);
    this.name = "ReservationError";
    this.code = code;
  }
}

export function mapReservationRpcError(error: {
  message?: string;
}): ReservationError {
  const message = error.message ?? "";

  if (message.includes("PRODUCT_NOT_AVAILABLE")) {
    return new ReservationError("product_taken", strings.errors.productTaken);
  }

  if (message.includes("PRODUCT_NOT_FOUND")) {
    return new ReservationError("product_not_found", strings.errors.generic);
  }

  if (
    message.includes("GUEST_NAME_REQUIRED") ||
    message.includes("CONTACT_REQUIRED") ||
    message.includes("COMMENT_TOO_LONG")
  ) {
    return new ReservationError("validation", strings.errors.reservationFailed);
  }

  return new ReservationError("generic", strings.errors.reservationFailed);
}
