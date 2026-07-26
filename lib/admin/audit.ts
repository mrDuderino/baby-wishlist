import type { Json } from "@/types/database";

import { createClient } from "@/lib/supabase/server";

type WriteAuditLogInput = {
  adminId: string;
  action: string;
  entity: string;
  entityId?: string | null;
  oldValue?: Json | null;
  newValue?: Json | null;
};

export async function writeAdminAuditLog(input: WriteAuditLogInput) {
  const supabase = await createClient();

  const { error } = await supabase.from("audit_logs").insert({
    admin_id: input.adminId,
    action: input.action,
    entity: input.entity,
    entity_id: input.entityId ?? null,
    old_value: input.oldValue ?? null,
    new_value: input.newValue ?? null,
  });

  if (error) {
    console.error("Failed to write admin audit log", error);
  }
}
