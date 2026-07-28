"use client";

import { useActionState } from "react";

import { saveProductAction } from "@/lib/admin/actions/products";
import type { AdminActionState } from "@/lib/admin/actions/categories";
import {
  parseGallery,
  parseMarketplaceLinks,
} from "@/lib/helpers/product-json";
import { FormField } from "@/components/shared/form-field";
import { LoadingButton } from "@/components/shared/loading-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { Category, Product } from "@/types/database";

const initialState: AdminActionState = {};

type ProductFormProps = {
  product?: Product | null;
  categories: Category[];
};

export function ProductForm({ product, categories }: ProductFormProps) {
  const [state, formAction, isPending] = useActionState(
    saveProductAction,
    initialState,
  );

  const galleryValue = product ? parseGallery(product.gallery).join("\n") : "";
  const marketplaceValue = product
    ? JSON.stringify(parseMarketplaceLinks(product.marketplace_links), null, 2)
    : "";

  return (
    <form action={formAction} className="space-y-6">
      {product ? <input type="hidden" name="id" value={product.id} /> : null}

      <div className="grid gap-5 md:grid-cols-2">
        <FormField id="title" label="Title" required>
          <Input
            id="title"
            name="title"
            defaultValue={product?.title ?? ""}
            disabled={isPending}
            required
          />
        </FormField>

        <FormField id="slug" label="Slug" required>
          <Input
            id="slug"
            name="slug"
            defaultValue={product?.slug ?? ""}
            disabled={isPending}
            required
          />
        </FormField>
      </div>

      <FormField id="category_id" label="Category" required>
        <select
          id="category_id"
          name="category_id"
          defaultValue={product?.category_id ?? categories[0]?.id}
          disabled={isPending}
          className={cn(
            "rounded-input border-input bg-card h-11 w-full border px-4 py-2 text-sm",
          )}
          required
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.emoji} {category.name}
            </option>
          ))}
        </select>
      </FormField>

      <FormField id="short_description" label="Short description">
        <Textarea
          id="short_description"
          name="short_description"
          defaultValue={product?.short_description ?? ""}
          disabled={isPending}
        />
      </FormField>

      <FormField id="description" label="Description">
        <Textarea
          id="description"
          name="description"
          defaultValue={product?.description ?? ""}
          disabled={isPending}
          className="min-h-32"
        />
      </FormField>

      <FormField id="reason_selected" label="Why we selected this gift">
        <Textarea
          id="reason_selected"
          name="reason_selected"
          defaultValue={product?.reason_selected ?? ""}
          disabled={isPending}
        />
      </FormField>

      <div className="grid gap-5 md:grid-cols-3">
        <FormField id="price" label="Price">
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            defaultValue={product?.price ?? ""}
            disabled={isPending}
          />
        </FormField>

        <FormField id="currency" label="Currency">
          <Input
            id="currency"
            name="currency"
            defaultValue={product?.currency ?? "RUB"}
            disabled={isPending}
          />
        </FormField>

        <FormField id="sort_order" label="Sort order">
          <Input
            id="sort_order"
            name="sort_order"
            type="number"
            defaultValue={product?.sort_order ?? 0}
            disabled={isPending}
          />
        </FormField>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <FormField id="status" label="Status">
          <select
            id="status"
            name="status"
            defaultValue={product?.status ?? "available"}
            disabled={isPending}
            className={cn(
              "rounded-input border-input bg-card h-11 w-full border px-4 py-2 text-sm",
            )}
          >
            <option value="available">Available</option>
            <option value="reserved">Reserved</option>
            <option value="purchased">Purchased</option>
            <option value="hidden">Hidden</option>
          </select>
        </FormField>

        <FormField id="priority" label="Priority">
          <Input
            id="priority"
            name="priority"
            type="number"
            defaultValue={product?.priority ?? 0}
            disabled={isPending}
          />
        </FormField>
      </div>

      <FormField id="cover_image" label="Cover image URL">
        <Input
          id="cover_image"
          name="cover_image"
          defaultValue={product?.cover_image ?? ""}
          disabled={isPending}
        />
      </FormField>

      <FormField id="gallery" label="Gallery URLs" hint="One URL per line">
        <Textarea
          id="gallery"
          name="gallery"
          defaultValue={galleryValue}
          disabled={isPending}
          className="min-h-28 font-mono text-xs"
        />
      </FormField>

      <FormField
        id="marketplace_links"
        label="Marketplace links"
        hint='JSON array, e.g. [{"title":"Ozon","url":"https://...","price":2345}]'
      >
        <Textarea
          id="marketplace_links"
          name="marketplace_links"
          defaultValue={marketplaceValue}
          disabled={isPending}
          className="min-h-28 font-mono text-xs"
        />
      </FormField>

      <div className="grid gap-5 md:grid-cols-2">
        <FormField id="seo_title" label="SEO title">
          <Input
            id="seo_title"
            name="seo_title"
            defaultValue={product?.seo_title ?? ""}
            disabled={isPending}
          />
        </FormField>

        <FormField id="seo_description" label="SEO description">
          <Input
            id="seo_description"
            name="seo_description"
            defaultValue={product?.seo_description ?? ""}
            disabled={isPending}
          />
        </FormField>
      </div>

      <div className="flex flex-wrap gap-6">
        <div className="flex items-center gap-3">
          <input
            id="visible"
            name="visible"
            type="checkbox"
            defaultChecked={product?.visible ?? true}
            disabled={isPending}
            className="size-4 rounded border"
          />
          <Label htmlFor="visible">Visible</Label>
        </div>

        <div className="flex items-center gap-3">
          <input
            id="featured"
            name="featured"
            type="checkbox"
            defaultChecked={product?.featured ?? false}
            disabled={isPending}
            className="size-4 rounded border"
          />
          <Label htmlFor="featured">Featured</Label>
        </div>
      </div>

      {state.error ? (
        <p className="text-destructive text-sm" role="alert">
          {state.error}
        </p>
      ) : null}

      <LoadingButton type="submit" loading={isPending}>
        Save product
      </LoadingButton>
    </form>
  );
}
