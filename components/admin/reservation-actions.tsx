"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { updateReservationAction } from "@/lib/admin/actions/reservations";
import { LoadingButton } from "@/components/shared/loading-button";
import { Button } from "@/components/ui/button";
import type { ReservationStatus } from "@/types/database";

type ReservationActionsProps = {
  reservationId: string;
  status: ReservationStatus;
};

export function ReservationActions({
  reservationId,
  status,
}: ReservationActionsProps) {
  const [isPending, startTransition] = useTransition();

  const runAction = (action: "confirm" | "cancel" | "purchase" | "delete") => {
    startTransition(async () => {
      const result = await updateReservationAction(reservationId, action);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Reservation updated");
    });
  };

  return (
    <div className="flex flex-wrap gap-2">
      {status === "pending" ? (
        <LoadingButton loading={isPending} onClick={() => runAction("confirm")}>
          Confirm
        </LoadingButton>
      ) : null}

      {status === "pending" || status === "confirmed" ? (
        <>
          <Button
            variant="outline"
            disabled={isPending}
            onClick={() => runAction("cancel")}
          >
            Cancel
          </Button>
          <Button
            variant="secondary"
            disabled={isPending}
            onClick={() => runAction("purchase")}
          >
            Mark purchased
          </Button>
        </>
      ) : null}

      <Button
        variant="destructive"
        disabled={isPending}
        onClick={() => runAction("delete")}
      >
        Delete
      </Button>
    </div>
  );
}
