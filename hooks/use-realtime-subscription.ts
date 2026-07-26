"use client";

import { useEffect } from "react";

import { subscribeToTable, unsubscribeChannel } from "@/lib/supabase/realtime";

type RealtimeTable = "products" | "reservations" | "settings";

type UseRealtimeSubscriptionOptions = {
  enabled?: boolean;
  table: RealtimeTable;
  onChange: () => void;
};

export function useRealtimeSubscription({
  enabled = true,
  table,
  onChange,
}: UseRealtimeSubscriptionOptions) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const channel = subscribeToTable(table, {
      onPayload: onChange,
    });

    return () => {
      unsubscribeChannel(channel);
    };
  }, [enabled, onChange, table]);
}
