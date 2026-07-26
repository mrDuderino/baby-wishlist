"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { writeAdminAuditLog } from "@/lib/admin/audit";
import { requireAdminSession } from "@/lib/admin/session";
import { hasSupabaseEnv } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import { loginSchema } from "@/lib/validation/admin";

export type AuthActionState = {
  error?: string;
};

export async function loginAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  if (!hasSupabaseEnv()) {
    return {
      error:
        "Supabase не настроен. Добавьте ключи в .env.local и перезапустите dev-сервер.",
    };
  }

  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Некорректные данные" };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error || !data.user) {
    console.error("Login failed", error?.message ?? "no user");
    return {
      error:
        error?.message === "Email logins are disabled"
          ? "Вход по email отключён в Supabase. Проверьте supabase/config.toml."
          : "Неверный email или пароль",
    };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", data.user.id)
    .maybeSingle();

  if (!profile) {
    await supabase.auth.signOut();
    return { error: "У этого аккаунта нет доступа к админке" };
  }

  redirect("/admin");
}

export async function logoutAction() {
  if (hasSupabaseEnv()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }

  redirect("/login");
}

export async function updateProfileAction(
  _prevState: { error?: string; success?: boolean },
  formData: FormData,
) {
  const session = await requireAdminSession();
  const name = String(formData.get("name") ?? "").trim();

  if (!name) {
    return { error: "Укажите имя" };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({ name })
    .eq("id", session.user.id);

  if (error) {
    return { error: "Не удалось обновить профиль" };
  }

  await writeAdminAuditLog({
    adminId: session.user.id,
    action: "profile_updated",
    entity: "profile",
    entityId: session.user.id,
    newValue: { name },
  });

  revalidatePath("/admin/profile");
  return { success: true };
}
