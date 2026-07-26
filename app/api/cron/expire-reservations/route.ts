import { NextResponse } from "next/server";

import { getServerEnv } from "@/lib/env";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: Request) {
  const { CRON_SECRET } = getServerEnv();
  const authHeader = request.headers.get("authorization");
  const isProduction = process.env.NODE_ENV === "production";

  if (isProduction && !CRON_SECRET) {
    console.error("CRON_SECRET is required in production");
    return NextResponse.json({ error: "Misconfigured" }, { status: 500 });
  }

  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const admin = createAdminClient();
    const { data: expiredCount, error } = await admin.rpc(
      "expire_pending_reservations",
    );

    if (error) {
      console.error("Failed to expire reservations", error);
      return NextResponse.json(
        { success: false, message: "Expiration job failed" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      expiredCount: expiredCount ?? 0,
    });
  } catch (error) {
    console.error("Unexpected expiration error", error);
    return NextResponse.json(
      { success: false, message: "Expiration job failed" },
      { status: 500 },
    );
  }
}
