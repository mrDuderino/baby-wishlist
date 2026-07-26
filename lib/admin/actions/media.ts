"use server";

import { revalidatePath } from "next/cache";

import { writeAdminAuditLog } from "@/lib/admin/audit";
import { requireAdminSession } from "@/lib/admin/session";
import { createClient } from "@/lib/supabase/server";

import type { AdminActionState } from "@/lib/admin/actions/categories";

const STORAGE_BUCKET = "wishlist";

export async function uploadMediaAction(
  _prevState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState & { url?: string }> {
  const session = await requireAdminSession();
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return { error: "Выберите файл" };
  }

  const supabase = await createClient();
  const safeName = file.name.replace(/[^\w.-]+/g, "-");
  const path = `uploads/${Date.now()}-${safeName}`;

  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (error) {
    return { error: "Не удалось загрузить файл" };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);

  await writeAdminAuditLog({
    adminId: session.user.id,
    action: "media_uploaded",
    entity: "media",
    newValue: { path, url: publicUrl },
  });

  revalidatePath("/admin/media");
  return { success: true, url: publicUrl };
}

export async function deleteMediaAction(
  path: string,
): Promise<AdminActionState> {
  const session = await requireAdminSession();
  const supabase = await createClient();

  const { error } = await supabase.storage.from(STORAGE_BUCKET).remove([path]);

  if (error) {
    return { error: "Не удалось удалить файл" };
  }

  await writeAdminAuditLog({
    adminId: session.user.id,
    action: "media_deleted",
    entity: "media",
    oldValue: { path },
  });

  revalidatePath("/admin/media");
  return { success: true };
}

export async function deleteMediaFormAction(path: string) {
  await deleteMediaAction(path);
}

export async function listMediaFiles() {
  await requireAdminSession();
  const supabase = await createClient();

  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .list("uploads", {
      limit: 100,
      sortBy: { column: "created_at", order: "desc" },
    });

  if (error) {
    throw new Error("Failed to load media files.");
  }

  return (data ?? []).map((file) => {
    const path = `uploads/${file.name}`;
    const {
      data: { publicUrl },
    } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);

    return {
      name: file.name,
      path,
      url: publicUrl,
      createdAt: file.created_at,
    };
  });
}
