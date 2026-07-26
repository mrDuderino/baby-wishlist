import { notFound } from "next/navigation";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ProductForm } from "@/components/admin/product-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAdminCategories } from "@/lib/data/admin/categories";
import { getAdminProduct } from "@/lib/data/admin/products";
import {
  deleteProductFormAction,
  duplicateProductFormAction,
} from "@/lib/admin/actions/products";

type EditProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    getAdminProduct(id),
    getAdminCategories(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Edit Product"
        description={product.title}
        actions={
          <>
            <form action={duplicateProductFormAction.bind(null, product.id)}>
              <Button type="submit" variant="outline">
                Duplicate
              </Button>
            </form>
            <form action={deleteProductFormAction.bind(null, product.id)}>
              <Button type="submit" variant="destructive">
                Delete
              </Button>
            </form>
          </>
        }
      />

      <Card>
        <CardContent className="pt-6">
          <ProductForm product={product} categories={categories} />
        </CardContent>
      </Card>
    </div>
  );
}
