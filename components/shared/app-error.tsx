"use client";

import { useEffect } from "react";

import { ErrorState } from "@/components/shared/error-state";
import { strings } from "@/lib/strings/ru";

type AppErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export function AppError({ error, reset }: AppErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-xl items-center px-6 py-16">
      <ErrorState
        title="Что-то пошло не так"
        description={strings.errors.generic}
        onRetry={reset}
        className="w-full"
      />
    </main>
  );
}
