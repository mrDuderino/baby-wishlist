import { z } from "zod";

const optionalEnvString = z.preprocess((value) => {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}, z.string().optional());

const optionalEnvUrl = z.preprocess((value) => {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}, z.url().optional());

const serverEnvSchema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: optionalEnvString,
  SUPABASE_JWT_SECRET: optionalEnvString,
  TELEGRAM_BOT_TOKEN: optionalEnvString,
  TELEGRAM_CHAT_ID: optionalEnvString,
  CRON_SECRET: optionalEnvString,
});

const clientEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.url().default("http://localhost:3000"),
  NEXT_PUBLIC_SUPABASE_URL: optionalEnvUrl,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: optionalEnvString,
  NEXT_PUBLIC_TELEGRAM_URL: optionalEnvUrl,
  NEXT_PUBLIC_WHATSAPP_URL: optionalEnvUrl,
});

const supabaseEnvSchema = z.object({
  url: z.url(),
  anonKey: z.string().min(1),
});

function parseEnv<T extends z.ZodTypeAny>(
  schema: T,
  source: Record<string, string | undefined>,
): z.infer<T> {
  const result = schema.safeParse(source);

  if (!result.success) {
    const formatted = result.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("\n");

    throw new Error(`Invalid environment variables:\n${formatted}`);
  }

  return result.data;
}

export const clientEnv = parseEnv(clientEnvSchema, {
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_TELEGRAM_URL: process.env.NEXT_PUBLIC_TELEGRAM_URL,
  NEXT_PUBLIC_WHATSAPP_URL: process.env.NEXT_PUBLIC_WHATSAPP_URL,
});

export function getServerEnv() {
  return parseEnv(serverEnvSchema, {
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    SUPABASE_JWT_SECRET: process.env.SUPABASE_JWT_SECRET,
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
    CRON_SECRET: process.env.CRON_SECRET,
  });
}

function getSupabaseEnv() {
  if (!hasSupabaseEnv()) {
    throw new Error(
      "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local (run `pnpm supabase:status` after `pnpm supabase:start`).",
    );
  }

  return parseEnv(supabaseEnvSchema, {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });
}

export function getSupabaseBrowserEnv() {
  return getSupabaseEnv();
}

export function getSupabaseServerEnv() {
  return getSupabaseEnv();
}

export function hasSupabaseEnv() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
