"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { ProductStatusBadge } from "@/components/shared/product-status-badge";
import { WarmImagePlaceholder } from "@/components/shared/warm-image-placeholder";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { formatPrice } from "@/lib/helpers/format";
import { isProductReservable } from "@/lib/helpers/product";
import { getProductImageUrl } from "@/lib/helpers/product-json";
import type { Category, Product } from "@/types/database";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  category?: Category;
  index?: number;
  onOpen: (product: Product) => void;
  onReserve?: (product: Product) => void;
};

export function ProductCard({
  product,
  category,
  index = 0,
  onOpen,
  onReserve,
}: ProductCardProps) {
  const imageUrl = getProductImageUrl(product);
  const canReserve = isProductReservable(product.status);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      layout={!prefersReducedMotion}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group rounded-card border-border/80 bg-card shadow-soft hover:shadow-soft-hover border transition-shadow duration-300 hover:-translate-y-1"
    >
      <button
        type="button"
        className="block w-full text-left"
        onClick={() => onOpen(product)}
        aria-label={`Открыть ${product.title}`}
      >
        <div className="rounded-t-card bg-muted relative aspect-[4/3] overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.title}
              fill
              className="image-fade-in object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onLoad={(event) => {
                event.currentTarget.dataset.loaded = "true";
              }}
            />
          ) : (
            <WarmImagePlaceholder
              variant="product"
              label={product.title}
              className="absolute inset-0"
            />
          )}
        </div>

        <div className="space-y-4 p-6">
          <div className="flex flex-wrap items-center gap-2">
            {category ? (
              <Badge variant="secondary">
                {category.emoji} {category.name}
              </Badge>
            ) : null}
            <ProductStatusBadge status={product.status} display="card" />
          </div>

          <div className="space-y-2">
            <h3 className="font-heading text-foreground text-2xl leading-snug font-medium">
              {product.title}
            </h3>
            {product.short_description ? (
              <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                {product.short_description}
              </p>
            ) : null}
          </div>

          {product.price !== null ? (
            <p className="text-foreground text-lg font-medium">
              {formatPrice(product.price, product.currency)}
            </p>
          ) : null}
        </div>
      </button>

      <div className="px-6 pb-6">
        {canReserve ? (
          <Button
            className="w-full"
            onClick={(event) => {
              event.stopPropagation();
              onReserve?.(product);
            }}
          >
            Подарить
          </Button>
        ) : (
          <span
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "pointer-events-none w-full opacity-80",
            )}
          >
            {product.status === "purchased"
              ? "Спасибо ❤️"
              : "Уже забронировано"}
          </span>
        )}
      </div>
    </motion.article>
  );
}
