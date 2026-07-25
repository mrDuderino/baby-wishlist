export const productStatusLabels = {
  available: "Доступен",
  reserved: "Забронирован",
  purchased: "Подарен",
  hidden: "Скрыт",
} as const;

export const productStatusCardLabels = {
  available: "Доступен",
  reserved: "Уже забронировано",
  purchased: "Спасибо ❤️",
  hidden: "Скрыт",
} as const;

export const reservationStatusLabels = {
  pending: "Ожидает",
  confirmed: "Подтверждён",
  cancelled: "Отменён",
  purchased: "Подарен",
} as const;

export const productStatusBadgeVariant = {
  available: "available",
  reserved: "reserved",
  purchased: "purchased",
  hidden: "hidden",
} as const;
