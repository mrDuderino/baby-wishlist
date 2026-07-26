"use client";

import { useMemo, useState } from "react";

import { ProductCard } from "@/components/entities/product-card";
import { ProductModal } from "@/components/entities/product-modal";
import { ReservationModal } from "@/components/features/reservation-modal";
import { EmptyState } from "@/components/shared/empty-state";
import { Section } from "@/components/shared/section";
import { WishlistGridSkeleton } from "@/components/shared/skeletons";
import { useWishlist } from "@/components/providers/wishlist-provider";
import { strings } from "@/lib/strings/ru";
import type { Product } from "@/types/database";

export function WishlistSection() {
  const { categories, isRefreshing, refresh } = useWishlist();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [reservationProduct, setReservationProduct] = useState<Product | null>(
    null,
  );
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

  const categoryMap = useMemo(() => {
    return new Map(categories.map((category) => [category.id, category]));
  }, [categories]);

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const openReservation = (product: Product) => {
    setReservationProduct(product);
    setIsReservationModalOpen(true);
  };

  const handleReservationSuccess = () => {
    void refresh();
  };

  if (isRefreshing && categories.length === 0) {
    return (
      <Section id="wishlist" eyebrow="Вишлист" title="Список подарков">
        <WishlistGridSkeleton count={6} />
      </Section>
    );
  }

  if (categories.length === 0) {
    return (
      <Section id="wishlist" eyebrow="Вишлист" title="Список подарков">
        <EmptyState
          title="Пока здесь пусто"
          description={strings.empty.wishlist}
          icon={<span className="text-xl">🎁</span>}
        />
      </Section>
    );
  }

  return (
    <>
      <Section
        id="wishlist"
        eyebrow="Вишлист"
        title="Список подарков"
        description="Выберите подарок, который хотите сделать нашей малышке. Бронирование занимает меньше минуты."
      >
        <div className="space-y-16">
          {categories.map((category) => (
            <section key={category.id} className="space-y-8">
              <div className="max-w-2xl space-y-3">
                <h3 className="font-heading text-foreground text-3xl font-medium">
                  {category.emoji} {category.name}
                </h3>
                {category.description ? (
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {category.description}
                  </p>
                ) : null}
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {category.products.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    category={category}
                    index={index}
                    onOpen={openProduct}
                    onReserve={openReservation}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </Section>

      <ProductModal
        product={selectedProduct}
        category={
          selectedProduct
            ? categoryMap.get(selectedProduct.category_id)
            : undefined
        }
        open={isProductModalOpen}
        onOpenChange={setIsProductModalOpen}
        onReserve={(product) => {
          setIsProductModalOpen(false);
          openReservation(product);
        }}
      />

      <ReservationModal
        product={reservationProduct}
        open={isReservationModalOpen}
        onOpenChange={setIsReservationModalOpen}
        onSuccess={handleReservationSuccess}
      />
    </>
  );
}
