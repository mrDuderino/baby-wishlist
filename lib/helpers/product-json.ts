import { z } from "zod";

import type { MarketplaceLink } from "@/types/database";

const marketplaceLinkSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
  icon: z.string().optional(),
  badge: z.string().optional(),
});

export function parseMarketplaceLinks(value: unknown): MarketplaceLink[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    const parsed = marketplaceLinkSchema.safeParse(item);
    return parsed.success ? [parsed.data] : [];
  });
}

export function parseGallery(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

export function getProductImages(product: {
  cover_image: string | null;
  gallery: unknown;
}): string[] {
  const gallery = parseGallery(product.gallery);
  const images = product.cover_image
    ? [
        product.cover_image,
        ...gallery.filter((item) => item !== product.cover_image),
      ]
    : gallery;

  return images;
}

export function getProductImageUrl(product: {
  cover_image: string | null;
  gallery: unknown;
  category_id: string;
}): string | null {
  const images = getProductImages(product);
  return images[0] ?? null;
}

export function getProductGalleryImages(product: {
  cover_image: string | null;
  gallery: unknown;
  category_id: string;
}): string[] {
  return getProductImages(product);
}
