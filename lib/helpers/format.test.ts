import { describe, expect, it } from "vitest";

import {
  formatCountdownDays,
  formatPhone,
  formatPrice,
  formatTelegram,
  slugify,
} from "@/lib/helpers/format";

describe("formatPrice", () => {
  it("formats rubles without fractional digits", () => {
    expect(formatPrice(12990, "RUB")).toMatch(/12[\u00a0\s]?990/);
  });

  it("returns empty string for nullish values", () => {
    expect(formatPrice(null)).toBe("");
    expect(formatPrice(undefined)).toBe("");
  });
});

describe("formatTelegram", () => {
  it("adds @ when missing", () => {
    expect(formatTelegram("ivan")).toBe("@ivan");
  });

  it("keeps existing @", () => {
    expect(formatTelegram("@ivan")).toBe("@ivan");
  });

  it("normalizes multiple leading @", () => {
    expect(formatTelegram("@@ivan")).toBe("@ivan");
  });
});

describe("formatPhone", () => {
  it("trims whitespace", () => {
    expect(formatPhone("  +7 900  ")).toBe("+7 900");
  });
});

describe("slugify", () => {
  it("creates url-safe slug", () => {
    expect(slugify("  Hello World!  ")).toBe("hello-world");
  });

  it("supports cyrillic characters", () => {
    expect(slugify("Детская коляска")).toBe("детская-коляска");
  });
});

describe("formatCountdownDays", () => {
  it("returns zero for past dates", () => {
    expect(formatCountdownDays("2000-01-01T00:00:00Z")).toBe(0);
  });

  it("returns positive days for future dates", () => {
    const future = new Date();
    future.setDate(future.getDate() + 5);
    expect(formatCountdownDays(future)).toBeGreaterThanOrEqual(5);
  });
});
