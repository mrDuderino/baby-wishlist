import Link from "next/link";

import { cn } from "@/lib/utils";

type SkipLinkProps = {
  href?: string;
  className?: string;
  children?: string;
};

export function SkipLink({
  href = "#main-content",
  className,
  children = "Перейти к содержимому",
}: SkipLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "bg-primary text-primary-foreground focus-visible:ring-ring focus:rounded-button focus:shadow-soft sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus-visible:ring-3",
        className,
      )}
    >
      {children}
    </Link>
  );
}
