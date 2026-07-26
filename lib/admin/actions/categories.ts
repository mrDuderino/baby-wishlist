"use server";

import { revalidatePath } from "next/cache";

import { writeAdminAuditLog } from "@/lib/admin/audit";
import { requireAdminSession } from "@/lib/admin/session";
import { createClient } from "@/lib/supabase/server";
import { categoryFormSchema } from "@/lib/validation/admin";

export type AdminActionState = {
  error?: string;
  success?: boolean;
};

export async function saveCategoryAction(
  _prevState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const session = await requireAdminSession();

  const parsed = categoryFormSchema.safeParse({
    id: formData.get("id") || undefined,
    name: formData.get("name"),
    emoji: formData.get("emoji"),
    description: formData.get("description"),
    sort_order: formData.get("sort_order"),
    visible: formData.get("visible") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Некорректные данные" };
  }

  const supabase = await createClient();
  const payload = parsed.data;
  const values = {
    name: payload.name,
    emoji: payload.emoji,
    description: payload.description,
    sort_order: payload.sort_order,
    visible: payload.visible,
  };

  if (payload.id) {
    const { data: existing } = await supabase
      .from("categories")
      .select("*")
      .eq("id", payload.id)
      .maybeSingle();

    const { error } = await supabase
      .from("categories")
      .update(values)
      .eq("id", payload.id);

    if (error) {
      return { error: "Не удалось обновить категорию" };
    }

    await writeAdminAuditLog({
      adminId: session.user.id,
      action: "category_updated",
      entity: "category",
      entityId: payload.id,
      oldValue: existing,
      newValue: values,
    });
  } else {
    const { data, error } = await supabase
      .from("categories")
      .insert(values)
      .select("id")
      .single();

    if (error || !data) {
      return { error: "Не удалось создать категорию" };
    }

    await writeAdminAuditLog({
      adminId: session.user.id,
      action: "category_created",
      entity: "category",
      entityId: data.id,
      newValue: values,
    });
  }

  revalidatePath("/admin/categories");
  revalidatePath("/");
  return { success: true };
}

export async function deleteCategoryAction(
  id: string,
): Promise<AdminActionState> {
  const session = await requireAdminSession();
  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("categories").delete().eq("id", id);

  if (error) {
    return {
      error: "Не удалось удалить категорию. Возможно, в ней есть товары.",
    };
  }

  await writeAdminAuditLog({
    adminId: session.user.id,
    action: "category_deleted",
    entity: "category",
    entityId: id,
    oldValue: existing,
  });

  revalidatePath("/admin/categories");
  revalidatePath("/");
  return { success: true };
}

export async function deleteCategoryFormAction(id: string) {
  await deleteCategoryAction(id);
}
