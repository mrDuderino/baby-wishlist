import { describe, expect, it } from "vitest";

import { strings } from "@/lib/strings/ru";
import { loginSchema } from "@/lib/validation/admin";
import {
  createReservationPayloadSchema,
  reservationFormSchema,
} from "@/lib/validation/reservation";

describe("reservationFormSchema", () => {
  it("requires guest name", () => {
    const result = reservationFormSchema.safeParse({
      guestName: "",
      telegram: "@ivan",
      phone: "",
      comment: "",
    });

    expect(result.success).toBe(false);
  });

  it("requires telegram or phone", () => {
    const result = reservationFormSchema.safeParse({
      guestName: "Иван",
      telegram: "",
      phone: "",
      comment: "",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some(
          (issue) => issue.message === strings.validation.contactRequired,
        ),
      ).toBe(true);
    }
  });

  it("accepts valid payload with telegram only", () => {
    const result = reservationFormSchema.safeParse({
      guestName: "Иван",
      telegram: "@ivan",
      phone: "",
      comment: "С радостью",
    });

    expect(result.success).toBe(true);
  });

  it("rejects comments longer than 500 characters", () => {
    const result = reservationFormSchema.safeParse({
      guestName: "Иван",
      telegram: "",
      phone: "+79990001122",
      comment: "x".repeat(501),
    });

    expect(result.success).toBe(false);
  });
});

describe("createReservationPayloadSchema", () => {
  it("requires a valid product uuid", () => {
    const result = createReservationPayloadSchema.safeParse({
      productId: "not-a-uuid",
      guestName: "Иван",
      telegram: "@ivan",
      phone: "",
      comment: "",
    });

    expect(result.success).toBe(false);
  });

  it("accepts a complete payload", () => {
    const result = createReservationPayloadSchema.safeParse({
      productId: "22222222-2222-4222-8222-222222222201",
      guestName: "Иван",
      telegram: "",
      phone: "+79990001122",
      comment: "",
    });

    expect(result.success).toBe(true);
  });
});

describe("loginSchema", () => {
  it("requires email and password", () => {
    expect(loginSchema.safeParse({ email: "", password: "" }).success).toBe(
      false,
    );
    expect(
      loginSchema.safeParse({
        email: "admin@example.com",
        password: "secret",
      }).success,
    ).toBe(true);
  });
});
