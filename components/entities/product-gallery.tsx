"use client";

import Image from "next/image";
import { useState } from "react";

import { WarmImagePlaceholder } from "@/components/shared/warm-image-placeholder";
import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  images: string[];
  alt: string;
  className?: string;
};

export function ProductGallery({
  images,
  alt,
  className,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];

  if (!activeImage) {
    return (
      <div className={cn("space-y-4", className)}>
        <div className="rounded-card relative aspect-[4/3] overflow-hidden">
          <WarmImagePlaceholder
            variant="product"
            label={alt}
            className="absolute inset-0"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="rounded-card bg-muted relative aspect-[4/3] overflow-hidden">
        <Image
          src={activeImage}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 640px"
          priority
        />
      </div>

      {images.length > 1 ? (
        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              className={cn(
                "rounded-input relative h-20 w-20 shrink-0 snap-start overflow-hidden border-2 transition-colors",
                index === activeIndex
                  ? "border-primary"
                  : "border-transparent opacity-70 hover:opacity-100",
              )}
              onClick={() => setActiveIndex(index)}
              aria-label={`Показать изображение ${index + 1}`}
              aria-current={index === activeIndex}
            >
              <Image
                src={image}
                alt=""
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
