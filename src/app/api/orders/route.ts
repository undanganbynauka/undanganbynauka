import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/**
 * POST /api/orders
 * Create a new order. Generates order_id with format: NAUKA-{YYYY}-{NNN}
 *
 * 🔒 Uses service role key for BOTH insert and update.
 *    Anon (frontend) CANNOT insert orders directly via Supabase JS client.
 *    RLS denies all anon access to orders table — see migration SQL.
 *
 * Flow:
 *   1. Validate request body
 *   2. INSERT row using service role (RLS bypassed)
 *      - order_id sementara: NAUKA-PENDING-{timestamp} (akan di-update di step 3)
 *   3. UPDATE row dengan order_id final: NAUKA-{YYYY}-{NNN}
 *      di mana NNN = numeric id dari row yang baru di-insert
 *   4. Return order (dengan order_id final)
 *
 * Status awal: 'pending_payment' (menunggu user konfirmasi pembayaran via
 * endpoint /api/orders/[id]/confirm-payment).
 *
 * Response:
 *   201 { data: Order }
 *   400 { error: "..." }
 *   500 { error: "..." }
 *   503 { error: "Service role belum dikonfigurasi" }
 */
export async function POST(req: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: "Database belum dikonfigurasi." },
        { status: 503 }
      );
    }

    const body = await req.json();
    const { template, package: pkg, customer_name, customer_phone, customer_email, wedding_data } = body;

    // ── Validate ──
    if (!template || !pkg || !customer_name || !customer_phone) {
      return NextResponse.json(
        { error: "Field wajib: template, package, customer_name, customer_phone" },
        { status: 400 }
      );
    }
    if (pkg !== "basic" && pkg !== "premium") {
      return NextResponse.json(
        { error: "Package harus 'basic' atau 'premium'" },
        { status: 400 }
      );
    }

    const price = pkg === "basic" ? 75000 : 99000;

    // ── Step 1: Insert dengan order_id sementara ──
    const tempOrderId = `NAUKA-PENDING-${Date.now()}`;
    const { data: inserted, error: insertError } = await supabase
      .from("orders")
      .insert({
        order_id: tempOrderId,
        template,
        package: pkg,
        price,
        customer_name,
        customer_phone,
        customer_email: customer_email || null,
        wedding_data: wedding_data || null,
        status: "pending_payment",
      })
      .select("id, order_id, status, template, package, price, customer_name, customer_phone, customer_email, wedding_data, created_at, updated_at")
      .single();

    if (insertError || !inserted) {
      console.error("[api/orders POST] insert error:", insertError);
      return NextResponse.json(
        { error: "Gagal membuat pesanan. Silakan coba lagi." },
        { status: 500 }
      );
    }

    // ── Step 2: Update order_id final: NAUKA-{YYYY}-{NNN} ──
    const year = new Date().getFullYear();
    const paddedId = String(inserted.id).padStart(3, "0");
    const finalOrderId = `NAUKA-${year}-${paddedId}`;

    const { data: updated, error: updateError } = await supabase
      .from("orders")
      .update({ order_id: finalOrderId })
      .eq("id", inserted.id)
      .select("id, order_id, status, template, package, price, customer_name, customer_phone, customer_email, wedding_data, created_at, updated_at")
      .single();

    if (updateError || !updated) {
      console.error("[api/orders POST] update order_id error:", updateError);
      // Row tetap ada dengan order_id sementara — return that, jangan fail
      return NextResponse.json({ data: inserted }, { status: 201 });
    }

    return NextResponse.json({ data: updated }, { status: 201 });
  } catch (err: unknown) {
    console.error("[api/orders POST] unexpected error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * GET /api/orders
 * List all orders. Public endpoint (no auth — admin secret NOT required).
 *
 * ⚠️  INSECURE FOR PRODUCTION — anyone who knows the URL can read all orders.
 *     Use for development/demo only. For production, add admin auth check
 *     (e.g., x-admin-secret header) before deploying publicly.
 *
 * Query params:
 *   - limit: number (default 50, max 100)
 *   - status: filter by status (pending_payment, awaiting_confirmation, paid,
 *             in_production, published, cancelled)
 *
 * Response:
 *   200 { data: Order[], count: number }
 *   503 { error: "Database belum dikonfigurasi" }
 */
export async function GET(req: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: "Database belum dikonfigurasi." },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(req.url);
    const limit = Math.min(Number(searchParams.get("limit") || "50"), 100);
    const status = searchParams.get("status");

    let query = supabase
      .from("orders")
      .select("id, order_id, status, template, package, price, customer_name, customer_phone, customer_email, wedding_data, created_at, updated_at");

    if (status) {
      query = query.eq("status", status);
    }

    const { data, error } = await query
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("[api/orders GET] query error:", error);
      return NextResponse.json(
        { error: "Gagal mengambil data pesanan." },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data || [], count: (data || []).length });
  } catch (err: unknown) {
    console.error("[api/orders GET] unexpected error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
