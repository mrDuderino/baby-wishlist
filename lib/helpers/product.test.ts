import { describe, expect, it } from "vitest";

import {
  isProductReservable,
  isProductVisible,
  getProductStatusLabel,
} from "@/lib/helpers/product";
import {
  getProductImageUrl,
  getProductImages,
  parseGallery,
  parseMarketplaceLinks,
} from "@/lib/helpers/product-json";

describe("isProductReservable", () => {
  it("allows only available products", () => {
    expect(isProductReservable("available")).toBe(true);
    expect(isProductReservable("reserved")).toBe(false);
    expect(isProductReservable("purchased")).toBe(false);
    expect(isProductReservable("hidden")).toBe(false);
  });
});

describe("isProductVisible", () => {
  it("hides hidden or invisible products", () => {
    expect(isProductVisible("available", true)).toBe(true);
    expect(isProductVisible("hidden", true)).toBe(false);
    expect(isProductVisible("available", false)).toBe(false);
  });
});

describe("getProductStatusLabel", () => {
  it("returns russian labels", () => {
    expect(getProductStatusLabel("available")).toBeTruthy();
    expect(getProductStatusLabel("purchased")).toBeTruthy();
  });
});

describe("parseMarketplaceLinks", () => {
  it("parses valid links and skips invalid ones", () => {
    const links = parseMarketplaceLinks([
      { title: "Ozon", url: "https://ozon.ru/item", price: 2345 },
      { title: "Bad", url: "not-a-url" },
      { title: "", url: "https://wb.ru" },
    ]);

    expect(links).toEqual([
      { title: "Ozon", url: "https://ozon.ru/item", price: 2345 },
    ]);
  });

  it("accepts links without price", () => {
    const links = parseMarketplaceLinks([
      { title: "Ozon", url: "https://ozon.ru/item" },
    ]);

    expect(links).toEqual([{ title: "Ozon", url: "https://ozon.ru/item" }]);
  });

  it("returns empty array for non-arrays", () => {
    expect(parseMarketplaceLinks(null)).toEqual([]);
    expect(parseMarketplaceLinks({})).toEqual([]);
  });
});

describe("parseGallery / getProductImages", () => {
  it("keeps cover image first and deduplicates", () => {
    const images = getProductImages({
      cover_image: "https://cdn.example/cover.jpg",
      gallery: [
        "https://cdn.example/cover.jpg",
        "https://cdn.example/2.jpg",
        42,
      ],
    });

    expect(images).toEqual([
      "https://cdn.example/cover.jpg",
      "https://cdn.example/2.jpg",
    ]);
  });

  it("falls back to gallery when cover is missing", () => {
    expect(parseGallery(["a", "b"])).toEqual(["a", "b"]);
    expect(
      getProductImageUrl({
        cover_image: null,
        gallery: ["https://cdn.example/a.jpg"],
        category_id: "11111111-1111-4111-8111-111111111101",
      }),
    ).toBe("https://cdn.example/a.jpg");
  });

  it("returns null when no images exist", () => {
    expect(
      getProductImageUrl({
        cover_image: null,
        gallery: [],
        category_id: "11111111-1111-4111-8111-111111111101",
      }),
    ).toBeNull();
  });
});
