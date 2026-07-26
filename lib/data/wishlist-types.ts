import type { Category, Product } from "@/types/database";

export type CategoryWithProducts = Category & {
  products: Product[];
};

export function groupProductsByCategory(
  categories: Category[],
  products: Product[],
): CategoryWithProducts[] {
  return categories
    .map((category) => ({
      ...category,
      products: products
        .filter((product) => product.category_id === category.id)
        .sort((a, b) => a.sort_order - b.sort_order),
    }))
    .filter((category) => category.products.length > 0);
}

export function computeWishlistStats(products: Product[]) {
  const reserved = products.filter(
    (product) => product.status === "reserved",
  ).length;
  const purchased = products.filter(
    (product) => product.status === "purchased",
  ).length;
  const available = products.filter(
    (product) => product.status === "available",
  ).length;

  return {
    total: products.length,
    reserved,
    purchased,
    available,
  };
}
