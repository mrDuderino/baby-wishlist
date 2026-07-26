"use client";

import { useActionState } from "react";

import { saveSiteSettingsAction } from "@/lib/admin/actions/settings";
import type { AdminActionState } from "@/lib/admin/actions/categories";
import { FormField } from "@/components/shared/form-field";
import { LoadingButton } from "@/components/shared/loading-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { SiteSettingsFormValues } from "@/lib/validation/admin";

const initialState: AdminActionState = {};

type SiteSettingsFormProps = {
  values: SiteSettingsFormValues;
};

export function SiteSettingsForm({ values }: SiteSettingsFormProps) {
  const [state, formAction, isPending] = useActionState(
    saveSiteSettingsAction,
    initialState,
  );

  return (
    <form action={formAction} className="max-w-3xl space-y-5">
      <FormField id="heroTitle" label="Hero title" required>
        <Input
          id="heroTitle"
          name="heroTitle"
          defaultValue={values.heroTitle}
          disabled={isPending}
          required
        />
      </FormField>

      <FormField id="heroSubtitle" label="Hero subtitle" required>
        <Textarea
          id="heroSubtitle"
          name="heroSubtitle"
          defaultValue={values.heroSubtitle}
          disabled={isPending}
          required
        />
      </FormField>

      <FormField id="aboutText" label="About text" required>
        <Textarea
          id="aboutText"
          name="aboutText"
          defaultValue={values.aboutText}
          disabled={isPending}
          className="min-h-32"
          required
        />
      </FormField>

      <FormField id="footerText" label="Footer text" required>
        <Textarea
          id="footerText"
          name="footerText"
          defaultValue={values.footerText}
          disabled={isPending}
          required
        />
      </FormField>

      <FormField id="countdownDate" label="Countdown date" required>
        <Input
          id="countdownDate"
          name="countdownDate"
          defaultValue={values.countdownDate}
          disabled={isPending}
          required
        />
      </FormField>

      <div className="grid gap-5 md:grid-cols-2">
        <FormField id="telegramUrl" label="Telegram URL">
          <Input
            id="telegramUrl"
            name="telegramUrl"
            defaultValue={values.telegramUrl ?? ""}
            disabled={isPending}
          />
        </FormField>

        <FormField id="whatsappUrl" label="WhatsApp URL">
          <Input
            id="whatsappUrl"
            name="whatsappUrl"
            defaultValue={values.whatsappUrl ?? ""}
            disabled={isPending}
          />
        </FormField>
      </div>

      {state.error ? (
        <p className="text-destructive text-sm" role="alert">
          {state.error}
        </p>
      ) : null}

      {state.success ? (
        <p className="text-sm text-green-700">Settings saved.</p>
      ) : null}

      <LoadingButton type="submit" loading={isPending}>
        Save settings
      </LoadingButton>
    </form>
  );
}
