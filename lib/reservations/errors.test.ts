import { describe, expect, it } from "vitest";

import {
  mapReservationRpcError,
  ReservationError,
} from "@/lib/reservations/errors";
import { strings } from "@/lib/strings/ru";

describe("mapReservationRpcError", () => {
  it("maps product taken race condition", () => {
    const error = mapReservationRpcError({
      message: "PRODUCT_NOT_AVAILABLE",
    });

    expect(error).toBeInstanceOf(ReservationError);
    expect(error.code).toBe("product_taken");
    expect(error.message).toBe(strings.errors.productTaken);
  });

  it("maps missing product", () => {
    const error = mapReservationRpcError({ message: "PRODUCT_NOT_FOUND" });
    expect(error.code).toBe("product_not_found");
  });

  it("maps validation failures", () => {
    expect(mapReservationRpcError({ message: "CONTACT_REQUIRED" }).code).toBe(
      "validation",
    );
    expect(mapReservationRpcError({ message: "COMMENT_TOO_LONG" }).code).toBe(
      "validation",
    );
  });

  it("falls back to generic reservation failure", () => {
    const error = mapReservationRpcError({ message: "something else" });
    expect(error.code).toBe("generic");
    expect(error.message).toBe(strings.errors.reservationFailed);
  });
});
