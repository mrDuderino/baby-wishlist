import {
  productStatusBadgeVariant,
  productStatusCardLabels,
  productStatusLabels,
} from "@/lib/constants/product-status";
import type { ProductStatus } from "@/types";

export function getProductStatusLabel(status: ProductStatus): string {
  return productStatusLabels[status];
}

export function getProductStatusCardLabel(status: ProductStatus): string {
  return productStatusCardLabels[status];
}

export function getProductStatusBadgeVariant(status: ProductStatus) {
  return productStatusBadgeVariant[status];
}

export function isProductReservable(status: ProductStatus): boolean {
  return status === "available";
}

export function isProductVisible(status: ProductStatus, visible: boolean) {
  return visible && status !== "hidden";
}
