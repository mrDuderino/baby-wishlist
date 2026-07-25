import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { strings } from "@/lib/strings/ru";
import { cn } from "@/lib/utils";

type LoadingButtonProps = ComponentProps<typeof Button> & {
  loading?: boolean;
  loadingText?: string;
};

export function LoadingButton({
  loading = false,
  loadingText = strings.common.loading,
  disabled,
  children,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      disabled={disabled || loading}
      aria-busy={loading}
      className={cn(className)}
      {...props}
    >
      {loading ? (
        <>
          <Spinner className="size-4" />
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </Button>
  );
}
