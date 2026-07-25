import type { RealtimeChannel } from "@supabase/supabase-js";

import { REALTIME_CHANNELS } from "@/lib/supabase/constants";
import { createClient } from "@/lib/supabase/client";

type RealtimeTable = keyof typeof REALTIME_CHANNELS;

type RealtimeEvent = "INSERT" | "UPDATE" | "DELETE" | "*";

type SubscribeOptions = {
  event?: RealtimeEvent;
  filter?: string;
  onPayload: () => void;
};

export function subscribeToTable(
  table: RealtimeTable,
  { event = "*", filter, onPayload }: SubscribeOptions,
): RealtimeChannel {
  const supabase = createClient();

  const channel = supabase
    .channel(`${REALTIME_CHANNELS[table]}-changes`)
    .on(
      "postgres_changes",
      {
        event,
        schema: "public",
        table,
        filter,
      },
      () => {
        onPayload();
      },
    )
    .subscribe();

  return channel;
}

export function unsubscribeChannel(channel: RealtimeChannel) {
  const supabase = createClient();
  void supabase.removeChannel(channel);
}
