"use client";

import { useActionState } from "react";

import { updateProfileAction } from "@/lib/admin/actions/auth";
import { FormField } from "@/components/shared/form-field";
import { LoadingButton } from "@/components/shared/loading-button";
import { Input } from "@/components/ui/input";

type ProfileFormProps = {
  name: string;
  email: string;
};

const initialState: { error?: string; success?: boolean } = {};

export function ProfileForm({ name, email }: ProfileFormProps) {
  const [state, formAction, isPending] = useActionState(
    updateProfileAction,
    initialState,
  );

  return (
    <form action={formAction} className="max-w-md space-y-5">
      <FormField id="email" label="Email">
        <Input id="email" value={email} disabled readOnly />
      </FormField>

      <FormField id="name" label="Name" required>
        <Input
          id="name"
          name="name"
          defaultValue={name}
          disabled={isPending}
          required
        />
      </FormField>

      {state.error ? (
        <p className="text-destructive text-sm" role="alert">
          {state.error}
        </p>
      ) : null}

      {state.success ? (
        <p className="text-sm text-green-700">Profile updated.</p>
      ) : null}

      <LoadingButton type="submit" loading={isPending}>
        Save profile
      </LoadingButton>
    </form>
  );
}
