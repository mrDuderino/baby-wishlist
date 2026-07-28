import { ExternalLinkIcon } from "lucide-react";

import type { MarketplaceLink } from "@/types/database";
import { formatPrice } from "@/lib/helpers/format";
import { cn } from "@/lib/utils";

type MarketplaceLinksProps = {
  links: MarketplaceLink[];
  currency?: string;
  className?: string;
};

export function MarketplaceLinks({
  links,
  currency = "RUB",
  className,
}: MarketplaceLinksProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <ul className={cn("space-y-2", className)}>
      {links.map((link) => (
        <li key={`${link.title}-${link.url}`}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="border-border/80 bg-card hover:bg-muted/40 flex items-center justify-between gap-4 rounded-lg border px-4 py-3 transition-colors"
          >
            <span className="flex min-w-0 items-center gap-2">
              <span className="text-foreground truncate font-medium">
                {link.title}
              </span>
              {link.badge ? (
                <span className="bg-muted text-muted-foreground shrink-0 rounded-full px-2 py-0.5 text-[10px]">
                  {link.badge}
                </span>
              ) : null}
            </span>
            <span className="text-foreground flex shrink-0 items-center gap-2">
              {link.price !== undefined ? (
                <span className="font-medium tabular-nums">
                  {formatPrice(link.price, currency)}
                </span>
              ) : null}
              <ExternalLinkIcon
                className="size-3.5 opacity-60"
                aria-hidden="true"
              />
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
