import type { ReactNode } from "react";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
  icon?: ReactNode;
  className?: string;
};

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  actionHref,
  icon,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "rounded-card border-border/80 bg-card/60 shadow-soft flex flex-col items-center justify-center border border-dashed px-6 py-16 text-center",
        className,
      )}
    >
      {icon ? (
        <div className="text-primary bg-primary/10 mb-4 flex size-12 items-center justify-center rounded-full">
          {icon}
        </div>
      ) : null}
      <h3 className="font-heading text-foreground text-2xl font-medium">
        {title}
      </h3>
      {description ? (
        <p className="text-muted-foreground mt-3 max-w-md text-sm leading-relaxed">
          {description}
        </p>
      ) : null}
      {actionLabel && actionHref ? (
        <Link href={actionHref} className={cn(buttonVariants(), "mt-6")}>
          {actionLabel}
        </Link>
      ) : null}
      {actionLabel && onAction && !actionHref ? (
        <Button className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
