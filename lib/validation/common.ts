import { z } from "zod";

export const optionalUrlSchema = z
  .string()
  .trim()
  .url("Укажите корректную ссылку")
  .optional()
  .or(z.literal(""));

export const phoneSchema = z
  .string()
  .trim()
  .max(32, "Слишком длинный номер")
  .optional()
  .or(z.literal(""));

export const telegramSchema = z
  .string()
  .trim()
  .max(64, "Слишком длинный Telegram")
  .optional()
  .or(z.literal(""));

export const guestNameSchema = z
  .string()
  .trim()
  .min(1, "Укажите имя")
  .max(120, "Слишком длинное имя");

export const commentSchema = z
  .string()
  .trim()
  .max(500, "Комментарий не должен превышать 500 символов")
  .optional()
  .or(z.literal(""));
