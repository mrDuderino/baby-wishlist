import { describe, expect, it } from "vitest";

import {
  computeWishlistStats,
  groupProductsByCategory,
} from "@/lib/data/wishlist-types";
import type { Category, Product } from "@/types/database";

function makeCategory(overrides: Partial<Category> = {}): Category {
  return {
    id: "11111111-1111-4111-8111-111111111101",
    name: "Прогулки",
    emoji: "🚗",
    description: "",
    sort_order: 1,
    visible: true,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
    ...overrides,
  };
}

function makeProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: "22222222-2222-4222-8222-222222222201",
    category_id: "11111111-1111-4111-8111-111111111101",
    title: "Коляска",
    slug: "kolyaska",
    short_description: "",
    description: "",
    reason_selected: "",
    price: 10000,
    currency: "RUB",
    status: "available",
    priority: 0,
    featured: false,
    visible: true,
    cover_image: null,
    gallery: [],
    marketplace_links: [],
    reservation_id: null,
    sort_order: 1,
    seo_title: null,
    seo_description: null,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
    ...overrides,
  };
}

describe("groupProductsByCategory", () => {
  it("groups products and skips empty categories", () => {
    const categories = [
      makeCategory(),
      makeCategory({
        id: "11111111-1111-4111-8111-111111111102",
        name: "Сон",
        sort_order: 2,
      }),
    ];
    const products = [
      makeProduct({ sort_order: 2, title: "B" }),
      makeProduct({
        id: "22222222-2222-4222-8222-222222222202",
        sort_order: 1,
        title: "A",
      }),
    ];

    const grouped = groupProductsByCategory(categories, products);

    expect(grouped).toHaveLength(1);
    expect(grouped[0]?.name).toBe("Прогулки");
    expect(grouped[0]?.products.map((item) => item.title)).toEqual(["A", "B"]);
  });
});

describe("computeWishlistStats", () => {
  it("counts statuses", () => {
    const stats = computeWishlistStats([
      makeProduct({ status: "available" }),
      makeProduct({
        id: "22222222-2222-4222-8222-222222222203",
        status: "reserved",
      }),
      makeProduct({
        id: "22222222-2222-4222-8222-222222222204",
        status: "purchased",
      }),
      makeProduct({
        id: "22222222-2222-4222-8222-222222222205",
        status: "available",
      }),
    ]);

    expect(stats).toEqual({
      total: 4,
      available: 2,
      reserved: 1,
      purchased: 1,
    });
  });
});
