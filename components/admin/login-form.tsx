"use client";

import { useActionState } from "react";

import { loginAction, type AuthActionState } from "@/lib/admin/actions/auth";
import { FormField } from "@/components/shared/form-field";
import { LoadingButton } from "@/components/shared/loading-button";
import { Input } from "@/components/ui/input";

const initialState: AuthActionState = {};

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-5">
      <FormField id="email" label="Email" required>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          disabled={isPending}
          required
        />
      </FormField>

      <FormField id="password" label="Password" required>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          disabled={isPending}
          required
        />
      </FormField>

      {state.error ? (
        <p className="text-destructive text-sm" role="alert">
          {state.error}
        </p>
      ) : null}

      <LoadingButton type="submit" className="w-full" loading={isPending}>
        Войти
      </LoadingButton>
    </form>
  );
}
