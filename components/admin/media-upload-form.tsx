"use client";

import { useActionState } from "react";

import { uploadMediaAction } from "@/lib/admin/actions/media";
import type { AdminActionState } from "@/lib/admin/actions/categories";
import { LoadingButton } from "@/components/shared/loading-button";
import { Input } from "@/components/ui/input";

const initialState: AdminActionState & { url?: string } = {};

export function MediaUploadForm() {
  const [state, formAction, isPending] = useActionState(
    uploadMediaAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <Input name="file" type="file" accept="image/*" disabled={isPending} />
      {state.error ? (
        <p className="text-destructive text-sm" role="alert">
          {state.error}
        </p>
      ) : null}
      {state.url ? (
        <p className="text-sm break-all text-green-700">
          Uploaded: {state.url}
        </p>
      ) : null}
      <LoadingButton type="submit" loading={isPending}>
        Upload image
      </LoadingButton>
    </form>
  );
}
