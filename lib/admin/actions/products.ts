"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { writeAdminAuditLog } from "@/lib/admin/audit";
import { requireAdminSession } from "@/lib/admin/session";
import { slugify } from "@/lib/helpers/format";
import { parseMarketplaceInput } from "@/lib/helpers/product-json";
import { createClient } from "@/lib/supabase/server";
import { productFormSchema } from "@/lib/validation/admin";

import type { AdminActionState } from "@/lib/admin/actions/categories";

function parseGalleryInput(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export async function saveProductAction(
  _prevState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const session = await requireAdminSession();

  const parsed = productFormSchema.safeParse({
    id: formData.get("id") || undefined,
    category_id: formData.get("category_id"),
    title: formData.get("title"),
    slug: formData.get("slug"),
    short_description: formData.get("short_description"),
    description: formData.get("description"),
    reason_selected: formData.get("reason_selected"),
    price: formData.get("price"),
    currency: formData.get("currency"),
    status: formData.get("status"),
    priority: formData.get("priority"),
    featured: formData.get("featured") === "on",
    visible: formData.get("visible") === "on",
    cover_image: formData.get("cover_image"),
    gallery: formData.get("gallery"),
    marketplace_links: formData.get("marketplace_links"),
    sort_order: formData.get("sort_order"),
    seo_title: formData.get("seo_title"),
    seo_description: formData.get("seo_description"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Некорректные данные" };
  }

  const payload = parsed.data;
  const marketplaceLinks = parseMarketplaceInput(payload.marketplace_links);

  if ("error" in marketplaceLinks) {
    return { error: marketplaceLinks.error };
  }

  const values = {
    category_id: payload.category_id,
    title: payload.title,
    slug: payload.slug || slugify(payload.title),
    short_description: payload.short_description,
    description: payload.description,
    reason_selected: payload.reason_selected,
    price: payload.price,
    currency: payload.currency,
    status: payload.status,
    priority: payload.priority,
    featured: payload.featured,
    visible: payload.visible,
    cover_image: payload.cover_image || null,
    gallery: parseGalleryInput(payload.gallery),
    marketplace_links: marketplaceLinks,
    sort_order: payload.sort_order,
    seo_title: payload.seo_title || null,
    seo_description: payload.seo_description || null,
  };

  const supabase = await createClient();

  if (payload.id) {
    const { data: existing } = await supabase
      .from("products")
      .select("*")
      .eq("id", payload.id)
      .maybeSingle();

    const { error } = await supabase
      .from("products")
      .update(values)
      .eq("id", payload.id);

    if (error) {
      return { error: "Не удалось обновить товар" };
    }

    await writeAdminAuditLog({
      adminId: session.user.id,
      action: "product_updated",
      entity: "product",
      entityId: payload.id,
      oldValue: existing,
      newValue: values,
    });

    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${payload.id}`);
    revalidatePath("/");
    redirect(`/admin/products/${payload.id}`);
  }

  const { data, error } = await supabase
    .from("products")
    .insert(values)
    .select("id")
    .single();

  if (error || !data) {
    return { error: "Не удалось создать товар" };
  }

  await writeAdminAuditLog({
    adminId: session.user.id,
    action: "product_created",
    entity: "product",
    entityId: data.id,
    newValue: values,
  });

  revalidatePath("/admin/products");
  revalidatePath("/");
  redirect(`/admin/products/${data.id}`);
}

export async function deleteProductAction(
  id: string,
): Promise<AdminActionState> {
  const session = await requireAdminSession();
  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    return { error: "Не удалось удалить товар" };
  }

  await writeAdminAuditLog({
    adminId: session.user.id,
    action: "product_deleted",
    entity: "product",
    entityId: id,
    oldValue: existing,
  });

  revalidatePath("/admin/products");
  revalidatePath("/");
  redirect("/admin/products");
}

export async function duplicateProductAction(
  id: string,
): Promise<AdminActionState> {
  const session = await requireAdminSession();
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!product) {
    return { error: "Товар не найден" };
  }

  const { data, error } = await supabase
    .from("products")
    .insert({
      category_id: product.category_id,
      title: `${product.title} (копия)`,
      slug: `${product.slug}-copy-${Date.now()}`,
      short_description: product.short_description,
      description: product.description,
      reason_selected: product.reason_selected,
      price: product.price,
      currency: product.currency,
      status: "available",
      priority: product.priority,
      featured: product.featured,
      visible: product.visible,
      cover_image: product.cover_image,
      gallery: product.gallery,
      marketplace_links: product.marketplace_links,
      sort_order: product.sort_order + 1,
      seo_title: product.seo_title,
      seo_description: product.seo_description,
    })
    .select("id")
    .single();

  if (error || !data) {
    return { error: "Не удалось дублировать товар" };
  }

  await writeAdminAuditLog({
    adminId: session.user.id,
    action: "product_duplicated",
    entity: "product",
    entityId: data.id,
    newValue: { source_id: id },
  });

  revalidatePath("/admin/products");
  redirect(`/admin/products/${data.id}`);
}

export async function deleteProductFormAction(id: string) {
  await deleteProductAction(id);
}

export async function duplicateProductFormAction(id: string) {
  await duplicateProductAction(id);
}
