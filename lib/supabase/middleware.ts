import { getSupabaseServerEnv, hasSupabaseEnv } from "@/lib/env";
import type { Database } from "@/types/database";
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { ADMIN_ROUTE_PREFIX } from "@/lib/supabase/constants";

export async function updateSession(request: NextRequest) {
  if (!hasSupabaseEnv()) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({
    request,
  });

  const { url, anonKey } = getSupabaseServerEnv();

  const supabase = createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        supabaseResponse = NextResponse.next({
          request,
        });

        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isAdminRoute =
    pathname === ADMIN_ROUTE_PREFIX ||
    pathname.startsWith(`${ADMIN_ROUTE_PREFIX}/`);
  const isLoginRoute = pathname === "/login";

  if (isLoginRoute && user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = ADMIN_ROUTE_PREFIX;
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  if (isAdminRoute && !user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return supabaseResponse;
}
