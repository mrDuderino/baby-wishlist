import { ExternalLinkIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import type { MarketplaceLink } from "@/types/database";
import { cn } from "@/lib/utils";

type MarketplaceLinksProps = {
  links: MarketplaceLink[];
  className?: string;
};

export function MarketplaceLinks({ links, className }: MarketplaceLinksProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {links.map((link) => (
        <a
          key={`${link.title}-${link.url}`}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "gap-2",
          )}
        >
          {link.title}
          {link.badge ? (
            <span className="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-[10px]">
              {link.badge}
            </span>
          ) : null}
          <ExternalLinkIcon className="size-3.5" aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
