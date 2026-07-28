"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductStatusBadge } from "@/components/shared/product-status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MarketplaceLinks } from "@/components/entities/marketplace-links";
import { getProductGalleryImages } from "@/lib/helpers/product-json";
import { ProductGallery } from "@/components/entities/product-gallery";
import { formatPrice } from "@/lib/helpers/format";
import { parseMarketplaceLinks } from "@/lib/helpers/product-json";
import { isProductReservable } from "@/lib/helpers/product";
import type { Category, Product } from "@/types/database";

type ProductModalProps = {
  product: Product | null;
  category?: Category;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReserve?: (product: Product) => void;
};

export function ProductModal({
  product,
  category,
  open,
  onOpenChange,
  onReserve,
}: ProductModalProps) {
  if (!product) {
    return null;
  }

  const marketplaceLinks = parseMarketplaceLinks(product.marketplace_links);
  const canReserve = isProductReservable(product.status);
  const images = getProductGalleryImages(product);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <div className="flex flex-wrap items-center gap-2">
            {category ? (
              <Badge variant="secondary">
                {category.emoji} {category.name}
              </Badge>
            ) : null}
            <ProductStatusBadge status={product.status} display="card" />
          </div>
          <DialogTitle>{product.title}</DialogTitle>
          {product.short_description ? (
            <DialogDescription>{product.short_description}</DialogDescription>
          ) : null}
        </DialogHeader>

        <ProductGallery images={images} alt={product.title} />

        <div className="space-y-4">
          {product.description ? (
            <p className="text-muted-foreground text-sm leading-relaxed">
              {product.description}
            </p>
          ) : null}

          {product.reason_selected ? (
            <div className="rounded-input bg-muted/50 p-4">
              <p className="text-foreground mb-2 text-sm font-medium">
                Почему мы выбрали этот подарок
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {product.reason_selected}
              </p>
            </div>
          ) : null}

          {product.price !== null && marketplaceLinks.length === 0 ? (
            <p className="font-heading text-foreground text-3xl font-medium">
              {formatPrice(product.price, product.currency)}
            </p>
          ) : null}

          <MarketplaceLinks
            links={marketplaceLinks}
            currency={product.currency}
          />
        </div>

        <DialogFooter>
          {canReserve ? (
            <Button
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => onReserve?.(product)}
            >
              Подарить
            </Button>
          ) : (
            <Button
              size="lg"
              variant="secondary"
              disabled
              className="w-full sm:w-auto"
            >
              {product.status === "purchased"
                ? "Спасибо ❤️"
                : "Уже забронировано"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
