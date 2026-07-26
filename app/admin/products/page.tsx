import Link from "next/link";
import { PackagePlusIcon } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { ProductStatusBadge } from "@/components/shared/product-status-badge";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAdminProducts } from "@/lib/data/admin/products";
import { formatPrice } from "@/lib/helpers/format";
import { cn } from "@/lib/utils";

export default async function AdminProductsPage() {
  const products = await getAdminProducts();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Products"
        description="Manage wishlist products, visibility, and marketplace links."
        actions={
          <Link href="/admin/products/new" className={cn(buttonVariants())}>
            Add Product
          </Link>
        }
      />

      {products.length === 0 ? (
        <EmptyState
          title="No products yet"
          description="Add the first gift to your wishlist."
          actionLabel="Add Product"
          actionHref="/admin/products/new"
          icon={<PackagePlusIcon className="size-5" aria-hidden="true" />}
        />
      ) : (
        <div className="rounded-card border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Visible</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.title}</TableCell>
                  <TableCell>
                    {product.category
                      ? `${product.category.emoji} ${product.category.name}`
                      : "—"}
                  </TableCell>
                  <TableCell>
                    <ProductStatusBadge status={product.status} />
                  </TableCell>
                  <TableCell>
                    {product.price !== null
                      ? formatPrice(product.price, product.currency)
                      : "—"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={product.visible ? "default" : "secondary"}>
                      {product.visible ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "sm" }),
                      )}
                    >
                      Edit
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
