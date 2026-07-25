const DEFAULT_LOCALE = "ru-RU";

export function formatPrice(
  amount: number | null | undefined,
  currency = "RUB",
): string {
  if (amount === null || amount === undefined) {
    return "";
  }

  return new Intl.NumberFormat(DEFAULT_LOCALE, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(
  value: string | Date,
  options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  },
): string {
  const date = typeof value === "string" ? new Date(value) : value;

  return new Intl.DateTimeFormat(DEFAULT_LOCALE, options).format(date);
}

export function formatDateTime(value: string | Date): string {
  return formatDate(value, {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatCountdownDays(targetDate: string | Date): number {
  const target =
    typeof targetDate === "string" ? new Date(targetDate) : targetDate;
  const now = new Date();
  const diffMs = target.getTime() - now.getTime();

  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
}

export function formatPhone(value: string): string {
  return value.trim();
}

export function formatTelegram(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return `@${trimmed.replace(/^@+/, "")}`;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
