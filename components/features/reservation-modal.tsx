"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { FormField } from "@/components/shared/form-field";
import { LoadingButton } from "@/components/shared/loading-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { strings } from "@/lib/strings/ru";
import {
  reservationFormSchema,
  type ReservationFormValues,
} from "@/lib/validation/reservation";
import type { Product } from "@/types/database";

type ReservationModalProps = {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

type ReservationApiResponse = {
  success: boolean;
  code?: string;
  message?: string;
  reservationId?: string;
};

export function ReservationModal({
  product,
  open,
  onOpenChange,
  onSuccess,
}: ReservationModalProps) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationFormSchema),
    defaultValues: {
      guestName: "",
      telegram: "",
      phone: "",
      comment: "",
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  useEffect(() => {
    if (!open) {
      return;
    }

    setStep("form");
    setSubmitError(null);
    reset({
      guestName: "",
      telegram: "",
      phone: "",
      comment: "",
    });
  }, [open, product?.id, reset]);

  const closeModal = () => {
    onOpenChange(false);
  };

  const onSubmit = handleSubmit(async (values) => {
    if (!product) {
      return;
    }

    setSubmitError(null);

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          guestName: values.guestName,
          telegram: values.telegram,
          phone: values.phone,
          comment: values.comment,
        }),
      });

      const payload = (await response.json()) as ReservationApiResponse;

      if (!response.ok || !payload.success) {
        setSubmitError(payload.message ?? strings.errors.reservationFailed);
        return;
      }

      setStep("success");
      onSuccess?.();
    } catch {
      setSubmitError(strings.errors.network);
    }
  });

  if (!product) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        {step === "success" ? (
          <>
            <DialogHeader>
              <DialogTitle>{strings.reservation.successTitle}</DialogTitle>
              <DialogDescription className="text-base leading-relaxed">
                {strings.reservation.successBody}
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="sm:justify-start">
              <Button
                size="lg"
                className="w-full sm:w-auto"
                onClick={closeModal}
              >
                {strings.reservation.backToList}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <form onSubmit={onSubmit} className="space-y-6">
            <DialogHeader>
              <DialogTitle>{strings.reservation.title}</DialogTitle>
              <DialogDescription>
                {strings.reservation.subtitle}
              </DialogDescription>
              <p className="text-muted-foreground pt-1 text-sm">
                {product.title}
              </p>
            </DialogHeader>

            <div className="space-y-4">
              <FormField
                id="guestName"
                label={strings.reservation.fields.name}
                required
                error={errors.guestName?.message}
              >
                <Input
                  id="guestName"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.guestName)}
                  disabled={isSubmitting}
                  {...register("guestName")}
                />
              </FormField>

              <FormField
                id="telegram"
                label={strings.reservation.fields.telegram}
                hint={strings.reservation.hints.contact}
                error={errors.telegram?.message}
              >
                <Input
                  id="telegram"
                  autoComplete="off"
                  placeholder="@username"
                  aria-invalid={Boolean(errors.telegram)}
                  disabled={isSubmitting}
                  {...register("telegram")}
                />
              </FormField>

              <FormField
                id="phone"
                label={strings.reservation.fields.phone}
                error={errors.phone?.message}
              >
                <Input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+7..."
                  aria-invalid={Boolean(errors.phone)}
                  disabled={isSubmitting}
                  {...register("phone")}
                />
              </FormField>

              <FormField
                id="comment"
                label={strings.reservation.fields.comment}
                hint={strings.reservation.hints.comment}
                error={errors.comment?.message}
              >
                <Textarea
                  id="comment"
                  rows={4}
                  aria-invalid={Boolean(errors.comment)}
                  disabled={isSubmitting}
                  {...register("comment")}
                />
              </FormField>

              {submitError ? (
                <p
                  className="text-destructive text-sm leading-relaxed"
                  role="alert"
                >
                  {submitError}
                </p>
              ) : null}
            </div>

            <DialogFooter className="gap-2 sm:justify-end">
              <Button
                type="button"
                variant="ghost"
                disabled={isSubmitting}
                onClick={closeModal}
              >
                {strings.common.cancel}
              </Button>
              <LoadingButton
                type="submit"
                size="lg"
                loading={isSubmitting}
                loadingText={strings.common.loading}
              >
                {strings.reservation.submit}
              </LoadingButton>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
