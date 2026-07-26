import type { Metadata } from "next";

import { LandingJsonLd } from "@/components/shared/json-ld";
import { LandingPage } from "@/components/widgets/landing-page";
import {
  getPublicCategories,
  getPublicProducts,
  getPublicSettings,
} from "@/lib/data/wishlist";
import { landingImages, parseLandingContent } from "@/lib/content/landing";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
    ...(landingImages.hero
      ? {
          images: [
            {
              url: landingImages.hero,
              width: 1200,
              height: 630,
              alt: "Baby Wishlist — вишлист для нашей малышки",
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: landingImages.hero ? "summary_large_image" : "summary",
    title: siteConfig.name,
    description: siteConfig.description,
    ...(landingImages.hero ? { images: [landingImages.hero] } : {}),
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default async function HomePage() {
  const [settings, categories, products] = await Promise.all([
    getPublicSettings(),
    getPublicCategories(),
    getPublicProducts(),
  ]);

  const content = parseLandingContent(settings);

  return (
    <>
      <LandingJsonLd url={siteConfig.url} />
      <LandingPage
        content={content}
        categories={categories}
        products={products}
      />
    </>
  );
}
