import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ProductForm } from "@/components/admin/product-form";
import { Card, CardContent } from "@/components/ui/card";
import { getAdminCategories } from "@/lib/data/admin/categories";

export default async function NewProductPage() {
  const categories = await getAdminCategories();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Add Product"
        description="Create a new wishlist item."
      />

      <Card>
        <CardContent className="pt-6">
          <ProductForm categories={categories} />
        </CardContent>
      </Card>
    </div>
  );
}
