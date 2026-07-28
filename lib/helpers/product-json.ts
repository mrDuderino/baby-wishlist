import { z } from "zod";

import type { MarketplaceLink } from "@/types/database";

const marketplaceLinkSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
  price: z.number().finite().nonnegative().optional(),
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

export function parseMarketplaceInput(
  value: string,
): MarketplaceLink[] | { error: string } {
  const trimmed = value.trim();

  if (!trimmed) {
    return [];
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(trimmed);
  } catch {
    return {
      error:
        "Некорректный JSON в marketplace links. Проверьте кавычки, запятые и поле price.",
    };
  }

  if (!Array.isArray(parsed)) {
    return {
      error: "Marketplace links должны быть JSON-массивом: [{...}, {...}]",
    };
  }

  const links = parseMarketplaceLinks(parsed);

  if (parsed.length > 0 && links.length === 0) {
    return {
      error:
        "Ни одна ссылка не прошла проверку. У каждой нужны title и url, price — опционально.",
    };
  }

  if (links.length !== parsed.length) {
    return {
      error: `Распознано ${links.length} из ${parsed.length} ссылок. Проверьте title, url и price у остальных.`,
    };
  }

  return links;
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
