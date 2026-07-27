"use client";

import { AppError } from "@/components/shared/app-error";

export default function HomeError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <AppError error={error} reset={reset} />;
}
