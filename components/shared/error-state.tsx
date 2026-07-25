import { AlertCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { strings } from "@/lib/strings/ru";
import { cn } from "@/lib/utils";

type ErrorStateProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
};

export function ErrorState({
  title = "Не удалось загрузить данные",
  description = strings.errors.generic,
  onRetry,
  retryLabel = strings.common.retry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "rounded-card border-destructive/20 bg-destructive/5 flex flex-col items-center justify-center border px-6 py-12 text-center",
        className,
      )}
      role="alert"
    >
      <div className="bg-destructive/10 text-destructive mb-4 flex size-12 items-center justify-center rounded-full">
        <AlertCircleIcon className="size-5" aria-hidden="true" />
      </div>
      <h3 className="font-heading text-foreground text-xl font-medium">
        {title}
      </h3>
      <p className="text-muted-foreground mt-2 max-w-md text-sm leading-relaxed">
        {description}
      </p>
      {onRetry ? (
        <Button className="mt-6" variant="outline" onClick={onRetry}>
          {retryLabel}
        </Button>
      ) : null}
    </div>
  );
}
