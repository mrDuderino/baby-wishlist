import Link from "next/link";
import { redirect } from "next/navigation";

import { LoginForm } from "@/components/admin/login-form";
import { getSessionUser } from "@/lib/admin/session";
import { hasSupabaseEnv } from "@/lib/env";

export default async function LoginPage() {
  if (hasSupabaseEnv()) {
    const user = await getSessionUser();

    if (user) {
      redirect("/admin");
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 px-6 py-12">
      <div className="space-y-2 text-center">
        <h1 className="font-heading text-3xl font-medium">
          Вход для администратора
        </h1>
        <p className="text-muted-foreground text-sm">
          Доступ только для заранее созданных аккаунтов Supabase Auth.
        </p>
      </div>

      {hasSupabaseEnv() ? (
        <LoginForm />
      ) : (
        <div className="rounded-card border-border/80 bg-muted/40 space-y-4 border p-5 text-left text-sm leading-relaxed">
          <p className="font-medium">Supabase ещё не настроен</p>
          <p className="text-muted-foreground">
            Чтобы войти в админку, сначала запустите локальный Supabase и
            добавьте ключи в <code className="text-xs">.env.local</code>.
          </p>
          <ol className="text-muted-foreground list-decimal space-y-2 pl-5">
            <li>
              <code className="text-xs">pnpm supabase:start</code>
            </li>
            <li>
              <code className="text-xs">pnpm supabase:reset</code>
            </li>
            <li>
              <code className="text-xs">pnpm supabase:status</code> — скопируйте
              URL и anon key
            </li>
            <li>
              Вставьте в <code className="text-xs">.env.local</code> и
              перезапустите <code className="text-xs">pnpm dev</code>
            </li>
          </ol>
          <pre className="rounded-input bg-background overflow-x-auto p-3 text-xs">
            {`NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...`}
          </pre>
        </div>
      )}

      <p className="text-muted-foreground text-center text-xs">
        <Link href="/" className="underline underline-offset-4">
          Вернуться на сайт
        </Link>
      </p>
    </main>
  );
}
