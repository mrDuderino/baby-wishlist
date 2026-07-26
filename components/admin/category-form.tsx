"use client";

import { useActionState } from "react";

import { saveCategoryAction } from "@/lib/admin/actions/categories";
import type { AdminActionState } from "@/lib/admin/actions/categories";
import { FormField } from "@/components/shared/form-field";
import { LoadingButton } from "@/components/shared/loading-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { Category } from "@/types/database";

const initialState: AdminActionState = {};

type CategoryFormProps = {
  category?: Category | null;
  onCancel?: () => void;
};

export function CategoryForm({ category, onCancel }: CategoryFormProps) {
  const [state, formAction, isPending] = useActionState(
    saveCategoryAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-5">
      {category ? <input type="hidden" name="id" value={category.id} /> : null}

      <div className="grid gap-5 md:grid-cols-2">
        <FormField id="name" label="Name" required>
          <Input
            id="name"
            name="name"
            defaultValue={category?.name ?? ""}
            disabled={isPending}
            required
          />
        </FormField>

        <FormField id="emoji" label="Emoji">
          <Input
            id="emoji"
            name="emoji"
            defaultValue={category?.emoji ?? ""}
            disabled={isPending}
          />
        </FormField>
      </div>

      <FormField id="description" label="Description">
        <Textarea
          id="description"
          name="description"
          defaultValue={category?.description ?? ""}
          disabled={isPending}
        />
      </FormField>

      <FormField id="sort_order" label="Sort order">
        <Input
          id="sort_order"
          name="sort_order"
          type="number"
          defaultValue={category?.sort_order ?? 0}
          disabled={isPending}
        />
      </FormField>

      <div className="flex items-center gap-3">
        <input
          id="visible"
          name="visible"
          type="checkbox"
          defaultChecked={category?.visible ?? true}
          disabled={isPending}
          className="size-4 rounded border"
        />
        <Label htmlFor="visible">Visible on site</Label>
      </div>

      {state.error ? (
        <p className="text-destructive text-sm" role="alert">
          {state.error}
        </p>
      ) : null}

      {state.success ? (
        <p className="text-sm text-green-700">Saved successfully.</p>
      ) : null}

      <div className="flex gap-2">
        <LoadingButton type="submit" loading={isPending}>
          Save category
        </LoadingButton>
        {onCancel ? (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        ) : null}
      </div>
    </form>
  );
}
