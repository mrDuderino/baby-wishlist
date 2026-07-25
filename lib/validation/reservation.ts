import { z } from "zod";

import { strings } from "@/lib/strings/ru";
import {
  commentSchema,
  guestNameSchema,
  phoneSchema,
  telegramSchema,
} from "@/lib/validation/common";

export const reservationFormSchema = z
  .object({
    guestName: guestNameSchema,
    telegram: telegramSchema,
    phone: phoneSchema,
    comment: commentSchema,
  })
  .superRefine((data, ctx) => {
    const hasTelegram = Boolean(data.telegram?.trim());
    const hasPhone = Boolean(data.phone?.trim());

    if (!hasTelegram && !hasPhone) {
      ctx.addIssue({
        code: "custom",
        message: strings.validation.contactRequired,
        path: ["telegram"],
      });
      ctx.addIssue({
        code: "custom",
        message: strings.validation.contactRequired,
        path: ["phone"],
      });
    }
  });

export type ReservationFormValues = z.infer<typeof reservationFormSchema>;

export const createReservationPayloadSchema = z.object({
  productId: z.uuid("Некорректный идентификатор товара"),
  guestName: guestNameSchema,
  telegram: telegramSchema,
  phone: phoneSchema,
  comment: commentSchema,
});

export type CreateReservationPayload = z.infer<
  typeof createReservationPayloadSchema
>;
