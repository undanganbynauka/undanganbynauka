import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getSupabaseServer, isAdminAuthorized } from "@/lib/supabase-server";

// Field yang DIKEMBALIKAN ke publik via GET single.
// Aman untuk ditampilkan di Bukti Pembayaran & tracking status.
// ⚠️ JANGAN tambahkan: customer_phone, customer_email, wedding_data
const PUBLIC_ORDER_FIELDS = [
  "id",
  "order_id",
  "status",
  "template",
  "package",
  "price",
  "created_at",
  "updated_at",
] as const;

// Admin-only fields (di-include di GET single kalau ada admin secret).
const ADMIN_ORDER_FIELDS = [
  "id",
  "order_id",
  "status",
  "template",
  "package",
  "price",
  "customer_name",
  "customer_phone",
  "customer_email",
  "wedding_data",
  "admin_notes",
  "created_at",
  "updated_at",
] as const;

export type OrderStatus =
  | "pending_payment"
  | "pending_whatsapp"
  | "awaiting_confirmation"
  | "paid"
  | "in_production"
  | "published"
  | "cancelled";

const VALID_STATUSES: OrderStatus[] = [
  "pending_payment",
  "pending_whatsapp",
  "awaiting_confirmation",
  "paid",
  "in_production",
  "published",
  "cancelled",
];

/**
 * GET /api/orders/[id]
 * Fetch single order.
 *
 * - Tanpa admin secret: return PUBLIC fields only (no PII / wedding_data)
 * - Dengan admin secret valid: return ADMIN fields (full data)
 *
 * Path param:
 *   - id: order_id (NAUKA-{YYYY}-{NNN}) atau numeric id
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: "Database belum dikonfigurasi." },
        { status: 503 }
      );
    }

    const { id: rawId } = await params;
    if (!rawId) {
      return NextResponse.json({ error: "ID tidak valid." }, { status: 400 });
    }

    const isNumeric = /^\d+$/.test(rawId);
    const column = isNumeric ? "id" : "order_id";
    const value = isNumeric ? Number(rawId) : rawId.toUpperCase();

    // Cek apakah request punya admin secret
    const hasAdminSecret = isAdminAuthorized(req);

    const fieldsToSelect = hasAdminSecret
      ? ADMIN_ORDER_FIELDS.join(",")
      : PUBLIC_ORDER_FIELDS.join(",");

    const { data, error } = await supabase
      .from("orders")
      .select(fieldsToSelect)
      .eq(column, value)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Pesanan tidak ditemukan." },
        { status: 404 }
      );
    }

    return NextResponse.json({ data });
  } catch (err: unknown) {
    console.error("[orders/[id] GET] unexpected error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * PATCH /api/orders/[id]
 * Update order status / admin_notes. ADMIN ONLY.
 *
 * 🔒 Proteksi:
 *   - Wajib header x-admin-secret yang valid
 *   - Pakai service role client (bypass RLS — sama dengan POST /api/orders)
 *
 * Body (all optional):
 *   - status: OrderStatus
 *   - admin_notes: string
 *
 * Path param:
 *   - id: order_id (NAUKA-{YYYY}-{NNN}) atau numeric id
 *
 * Response:
 *   200 { data: AdminOrder }  — return full admin fields
 *   400 { error: "Status tidak valid / Tidak ada field yang di-update" }
 *   401 { error: "Unauthorized. Admin secret required." }
 *   404 { error: "Pesanan tidak ditemukan atau gagal di-update." }
 *   503 { error: "Database belum dikonfigurasi" }
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // ── Layer 1: Admin secret check ──
    if (!isAdminAuthorized(req)) {
      return NextResponse.json(
        { error: "Unauthorized. Admin secret required." },
        { status: 401 }
      );
    }

    // ── Layer 2: Service role client (bypass RLS) ──
    const supabaseAdmin = getSupabaseServer();
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Database belum dikonfigurasi." },
        { status: 503 }
      );
    }

    const { id: rawId } = await params;
    if (!rawId) {
      return NextResponse.json({ error: "ID tidak valid." }, { status: 400 });
    }

    const body = await req.json().catch(() => ({}));
    const updatePayload: Record<string, unknown> = {};

    if (body.status) {
      if (!VALID_STATUSES.includes(body.status)) {
        return NextResponse.json(
          {
            error: `Status tidak valid. Pilihan: ${VALID_STATUSES.join(", ")}`,
          },
          { status: 400 }
        );
      }
      updatePayload.status = body.status;
    }

    if (typeof body.admin_notes === "string") {
      updatePayload.admin_notes = body.admin_notes;
    }

    if (Object.keys(updatePayload).length === 0) {
      return NextResponse.json(
        { error: "Tidak ada field yang di-update." },
        { status: 400 }
      );
    }

    const isNumericId = /^\d+$/.test(rawId);
    let query = supabaseAdmin.from("orders").update(updatePayload);
    if (isNumericId) {
      query = query.eq("id", Number(rawId));
    } else {
      query = query.eq("order_id", rawId.toUpperCase());
    }

    // Return ADMIN fields (endpoint ini admin-only, jadi aman untuk expose PII)
    const { data, error } = await query.select(ADMIN_ORDER_FIELDS.join(",")).single();

    if (error || !data) {
      console.error("[orders/[id] PATCH] update error:", error);
      return NextResponse.json(
        { error: "Pesanan tidak ditemukan atau gagal di-update." },
        { status: 404 }
      );
    }

    return NextResponse.json({ data });
  } catch (err: unknown) {
    console.error("[orders/[id] PATCH] unexpected error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
