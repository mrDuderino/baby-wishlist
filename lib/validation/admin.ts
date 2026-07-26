import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Укажите корректный email"),
  password: z.string().min(1, "Введите пароль"),
});

export const categoryFormSchema = z.object({
  id: z.uuid().optional(),
  name: z.string().trim().min(1, "Укажите название"),
  emoji: z.string().trim().max(8).default(""),
  description: z.string().trim().default(""),
  sort_order: z.coerce.number().int().min(0).default(0),
  visible: z.coerce.boolean().default(true),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;

export const productFormSchema = z.object({
  id: z.uuid().optional(),
  category_id: z.uuid("Выберите категорию"),
  title: z.string().trim().min(1, "Укажите название"),
  slug: z.string().trim().min(1, "Укажите slug"),
  short_description: z.string().trim().default(""),
  description: z.string().trim().default(""),
  reason_selected: z.string().trim().default(""),
  price: z
    .string()
    .trim()
    .optional()
    .transform((value) => (value ? Number(value) : null))
    .pipe(z.number().nonnegative().nullable()),
  currency: z.string().trim().default("RUB"),
  status: z.enum(["available", "reserved", "purchased", "hidden"]),
  priority: z.coerce.number().int().default(0),
  featured: z.coerce.boolean().default(false),
  visible: z.coerce.boolean().default(true),
  cover_image: z.string().trim().optional().or(z.literal("")),
  gallery: z.string().trim().default(""),
  marketplace_links: z.string().trim().default(""),
  sort_order: z.coerce.number().int().min(0).default(0),
  seo_title: z.string().trim().optional().or(z.literal("")),
  seo_description: z.string().trim().optional().or(z.literal("")),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

export const siteSettingsSchema = z.object({
  heroTitle: z.string().trim().min(1),
  heroSubtitle: z.string().trim().min(1),
  aboutText: z.string().trim().min(1),
  footerText: z.string().trim().min(1),
  countdownDate: z.string().trim().min(1),
  telegramUrl: z.string().trim().optional().or(z.literal("")),
  whatsappUrl: z.string().trim().optional().or(z.literal("")),
});

export type SiteSettingsFormValues = z.infer<typeof siteSettingsSchema>;

export const profileFormSchema = z.object({
  name: z.string().trim().min(1, "Укажите имя"),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
