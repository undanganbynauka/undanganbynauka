import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * SERVER-ONLY Supabase client using service_role key.
 *
 * ⚠️  This file must NEVER be imported by client-side code.
 *     Do NOT use `NEXT_PUBLIC_` prefix on the service role key env var.
 *
 * Usage (API routes only):
 *   import { getSupabaseServer } from "@/lib/supabase-server";
 *   const supabase = getSupabaseServer();
 *   if (!supabase) { return 503 }
 *
 * The service role key bypasses RLS. Only use it for trusted server operations
 * where the request has already been validated.
 */
let cachedServerClient: SupabaseClient | null = null;
let cachedKey: string | null = null;

export function getSupabaseServer(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  if (cachedServerClient && cachedKey === serviceRoleKey && serviceRoleKey) {
    return cachedServerClient;
  }

  if (!url || !serviceRoleKey || !url.startsWith("http")) {
    return null;
  }

  cachedServerClient = createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
  cachedKey = serviceRoleKey;
  return cachedServerClient;
}

/**
 * Admin secret check for protected endpoints.
 * Reads NAUKA_ADMIN_SECRET env var and compares against x-admin-secret header.
 *
 * Fail-closed: if NAUKA_ADMIN_SECRET env var is not set, returns false
 * for ALL requests (including those with a header).
 */
export function isAdminAuthorized(req: Request): boolean {
  const secret = process.env.NAUKA_ADMIN_SECRET || "";
  if (!secret) return false;

  const header = req.headers.get("x-admin-secret") || "";
  if (!header) return false;

  if (header.length !== secret.length) return false;
  let diff = 0;
  for (let i = 0; i < header.length; i++) {
    diff |= header.charCodeAt(i) ^ secret.charCodeAt(i);
  }
  return diff === 0;
}
