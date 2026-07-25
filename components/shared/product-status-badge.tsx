import { Badge, type badgeVariants } from "@/components/ui/badge";
import {
  getProductStatusBadgeVariant,
  getProductStatusCardLabel,
  getProductStatusLabel,
} from "@/lib/helpers/product";
import type { ProductStatus } from "@/types";
import type { VariantProps } from "class-variance-authority";

type ProductStatusBadgeProps = {
  status: ProductStatus;
  display?: "default" | "card";
  className?: string;
};

export function ProductStatusBadge({
  status,
  display = "default",
  className,
}: ProductStatusBadgeProps) {
  const variant = getProductStatusBadgeVariant(status) as VariantProps<
    typeof badgeVariants
  >["variant"];
  const label =
    display === "card"
      ? getProductStatusCardLabel(status)
      : getProductStatusLabel(status);

  return (
    <Badge variant={variant} className={className}>
      {label}
    </Badge>
  );
}
