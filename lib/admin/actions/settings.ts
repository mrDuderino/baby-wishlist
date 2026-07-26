"use server";

import { revalidatePath } from "next/cache";

import { writeAdminAuditLog } from "@/lib/admin/audit";
import { requireAdminSession } from "@/lib/admin/session";
import { createClient } from "@/lib/supabase/server";
import { siteSettingsSchema } from "@/lib/validation/admin";

import type { AdminActionState } from "@/lib/admin/actions/categories";

export async function saveSiteSettingsAction(
  _prevState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const session = await requireAdminSession();

  const parsed = siteSettingsSchema.safeParse({
    heroTitle: formData.get("heroTitle"),
    heroSubtitle: formData.get("heroSubtitle"),
    aboutText: formData.get("aboutText"),
    footerText: formData.get("footerText"),
    countdownDate: formData.get("countdownDate"),
    telegramUrl: formData.get("telegramUrl"),
    whatsappUrl: formData.get("whatsappUrl"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Некорректные данные" };
  }

  const supabase = await createClient();
  const payload = parsed.data;

  const updates = [
    {
      key: "hero",
      value: {
        title: payload.heroTitle,
        subtitle: payload.heroSubtitle,
      },
    },
    {
      key: "about",
      value: { text: payload.aboutText },
    },
    {
      key: "footer",
      value: { text: payload.footerText },
    },
    {
      key: "countdown",
      value: { date: payload.countdownDate },
    },
    {
      key: "social",
      value: {
        telegram: payload.telegramUrl ?? "",
        whatsapp: payload.whatsappUrl ?? "",
      },
    },
  ];

  for (const item of updates) {
    const { error } = await supabase.from("settings").upsert({
      key: item.key,
      value: item.value,
      is_public: true,
    });

    if (error) {
      return { error: "Не удалось сохранить настройки" };
    }
  }

  await writeAdminAuditLog({
    adminId: session.user.id,
    action: "settings_updated",
    entity: "settings",
    newValue: payload,
  });

  revalidatePath("/admin/settings");
  revalidatePath("/");
  return { success: true };
}
