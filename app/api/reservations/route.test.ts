import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/headers", () => ({
  headers: vi.fn(async () => ({
    get: (name: string) => (name === "user-agent" ? "vitest-agent" : null),
  })),
}));

vi.mock("@/lib/reservations/create-reservation", () => ({
  createReservation: vi.fn(),
}));

import { POST } from "@/app/api/reservations/route";
import { createReservation } from "@/lib/reservations/create-reservation";
import { ReservationError } from "@/lib/reservations/errors";

const mockedCreateReservation = vi.mocked(createReservation);

describe("POST /api/reservations", () => {
  beforeEach(() => {
    mockedCreateReservation.mockReset();
  });

  it("returns reservation id on success", async () => {
    mockedCreateReservation.mockResolvedValue({
      reservationId: "33333333-3333-4333-8333-333333333301",
    });

    const response = await POST(
      new Request("http://localhost/api/reservations", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-forwarded-for": "203.0.113.10",
        },
        body: JSON.stringify({
          productId: "22222222-2222-4222-8222-222222222201",
          guestName: "Иван",
          telegram: "@ivan",
          phone: "",
          comment: "",
        }),
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      success: true,
      reservationId: "33333333-3333-4333-8333-333333333301",
    });
    expect(mockedCreateReservation).toHaveBeenCalledWith(
      expect.objectContaining({
        guestName: "Иван",
        ipAddress: "203.0.113.10",
        userAgent: "vitest-agent",
      }),
    );
  });

  it("returns 400 for product taken errors", async () => {
    mockedCreateReservation.mockRejectedValue(
      new ReservationError("product_taken", "taken"),
    );

    const response = await POST(
      new Request("http://localhost/api/reservations", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          productId: "22222222-2222-4222-8222-222222222201",
          guestName: "Иван",
          telegram: "@ivan",
        }),
      }),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      success: false,
      code: "product_taken",
    });
  });

  it("returns 429 for rate limit errors", async () => {
    mockedCreateReservation.mockRejectedValue(
      new ReservationError("rate_limit", "too many"),
    );

    const response = await POST(
      new Request("http://localhost/api/reservations", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          productId: "22222222-2222-4222-8222-222222222201",
          guestName: "Иван",
          phone: "+79990001122",
        }),
      }),
    );

    expect(response.status).toBe(429);
    await expect(response.json()).resolves.toMatchObject({
      success: false,
      code: "rate_limit",
    });
  });

  it("returns 500 for unexpected errors", async () => {
    mockedCreateReservation.mockRejectedValue(new Error("boom"));

    const response = await POST(
      new Request("http://localhost/api/reservations", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          productId: "22222222-2222-4222-8222-222222222201",
          guestName: "Иван",
          telegram: "@ivan",
        }),
      }),
    );

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toMatchObject({
      success: false,
      code: "generic",
    });
  });
});
