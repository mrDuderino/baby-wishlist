import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/env", () => ({
  getServerEnv: vi.fn(),
}));

vi.mock("@/lib/supabase/admin", () => ({
  createAdminClient: vi.fn(),
}));

import { GET } from "@/app/api/cron/expire-reservations/route";
import { getServerEnv } from "@/lib/env";
import { createAdminClient } from "@/lib/supabase/admin";

const mockedGetServerEnv = vi.mocked(getServerEnv);
const mockedCreateAdminClient = vi.mocked(createAdminClient);

describe("GET /api/cron/expire-reservations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("NODE_ENV", "test");
  });

  it("rejects unauthorized requests when CRON_SECRET is set", async () => {
    mockedGetServerEnv.mockReturnValue({
      CRON_SECRET: "secret",
      SUPABASE_SERVICE_ROLE_KEY: undefined,
      SUPABASE_JWT_SECRET: undefined,
      TELEGRAM_BOT_TOKEN: undefined,
      TELEGRAM_CHAT_ID: undefined,
    });

    const response = await GET(
      new Request("http://localhost/api/cron/expire-reservations"),
    );

    expect(response.status).toBe(401);
  });

  it("requires CRON_SECRET in production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    mockedGetServerEnv.mockReturnValue({
      CRON_SECRET: undefined,
      SUPABASE_SERVICE_ROLE_KEY: undefined,
      SUPABASE_JWT_SECRET: undefined,
      TELEGRAM_BOT_TOKEN: undefined,
      TELEGRAM_CHAT_ID: undefined,
    });

    const response = await GET(
      new Request("http://localhost/api/cron/expire-reservations"),
    );

    expect(response.status).toBe(500);
  });

  it("expires reservations when authorized", async () => {
    mockedGetServerEnv.mockReturnValue({
      CRON_SECRET: "secret",
      SUPABASE_SERVICE_ROLE_KEY: "service",
      SUPABASE_JWT_SECRET: undefined,
      TELEGRAM_BOT_TOKEN: undefined,
      TELEGRAM_CHAT_ID: undefined,
    });

    mockedCreateAdminClient.mockReturnValue({
      rpc: vi.fn().mockResolvedValue({ data: 2, error: null }),
    } as never);

    const response = await GET(
      new Request("http://localhost/api/cron/expire-reservations", {
        headers: { authorization: "Bearer secret" },
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      success: true,
      expiredCount: 2,
    });
  });
});
