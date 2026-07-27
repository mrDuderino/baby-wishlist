"use client";

import { AppError } from "@/components/shared/app-error";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <AppError error={error} reset={reset} />;
}
