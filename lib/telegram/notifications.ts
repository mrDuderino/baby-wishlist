import { formatDateTime, formatTelegram } from "@/lib/helpers/format";
import { getServerEnv } from "@/lib/env";
import { siteConfig } from "@/lib/site-config";

type ReservationCreatedPayload = {
  reservationId: string;
  guestName: string;
  productTitle: string;
  telegram?: string | null;
  phone?: string | null;
  comment?: string | null;
  createdAt: string;
};

function getTelegramConfig() {
  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = getServerEnv();

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return null;
  }

  return {
    token: TELEGRAM_BOT_TOKEN,
    chatId: TELEGRAM_CHAT_ID,
  };
}

function buildReservationCreatedMessage(
  payload: ReservationCreatedPayload,
): string {
  const lines = [
    "🎁 Новая бронь",
    "",
    `👤 ${payload.guestName}`,
    `📦 ${payload.productTitle}`,
  ];

  if (payload.telegram) {
    lines.push(`📱 ${formatTelegram(payload.telegram)}`);
  }

  if (payload.phone) {
    lines.push(`☎ ${payload.phone}`);
  }

  if (payload.comment) {
    lines.push(`💬 ${payload.comment}`);
  }

  lines.push(
    "",
    "Дата:",
    formatDateTime(payload.createdAt),
    "",
    `Open Admin → ${siteConfig.url}/admin`,
  );

  return lines.join("\n");
}

export async function sendReservationCreatedNotification(
  payload: ReservationCreatedPayload,
): Promise<void> {
  const config = getTelegramConfig();

  if (!config) {
    return;
  }

  const response = await fetch(
    `https://api.telegram.org/bot${config.token}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: config.chatId,
        text: buildReservationCreatedMessage(payload),
        disable_web_page_preview: true,
      }),
    },
  );

  if (!response.ok) {
    console.error("Telegram notification failed", await response.text());
  }
}
