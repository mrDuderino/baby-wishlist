import { describe, expect, it } from "vitest";

import { getClientIp } from "@/lib/helpers/request";

describe("getClientIp", () => {
  it("prefers first x-forwarded-for address", () => {
    const request = new Request("http://localhost/api/reservations", {
      headers: {
        "x-forwarded-for": "203.0.113.10, 10.0.0.1",
      },
    });

    expect(getClientIp(request)).toBe("203.0.113.10");
  });

  it("falls back to x-real-ip", () => {
    const request = new Request("http://localhost/api/reservations", {
      headers: {
        "x-real-ip": "198.51.100.7",
      },
    });

    expect(getClientIp(request)).toBe("198.51.100.7");
  });

  it("returns unknown when headers are missing", () => {
    const request = new Request("http://localhost/api/reservations");
    expect(getClientIp(request)).toBe("unknown");
  });
});
