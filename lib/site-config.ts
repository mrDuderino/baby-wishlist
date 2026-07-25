export const siteConfig = {
  name: "Baby Wishlist",
  description:
    "Тёплый персональный вишлист для друзей и близких перед рождением нашей дочки.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;
