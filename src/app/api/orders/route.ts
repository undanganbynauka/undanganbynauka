import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer, isAdminAuthorized } from "@/lib/supabase-server";

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
 *      - order_id sementara: NAUKA-PENDING-{timestamp}
 *   3. Generate real order_id from BIGSERIAL id: NAUKA-{YYYY}-{NNN}
 *   4. UPDATE order_id using service role
 *
 * Body:
 *   - template: 'sacred' | 'celestial'
 *   - package: 'basic' | 'premium'
 *   - price: number (IDR)
 *   - customer_name: string
 *   - customer_phone: string
 *   - customer_email?: string
 *   - wedding_data?: object (seluruh data undangan — dikirim dari step Review)
 *
 * Status awal: 'pending_payment'
 *   - Berubah menjadi 'awaiting_confirmation' saat user klik "Saya sudah bayar"
 *     di step Pembayaran (lihat POST /api/orders/[id]/confirm-payment)
 *   - Admin yang mengkonfirmasi pembayaran aktual → status 'paid' / 'in_production'
 *
 * Response:
 *   201 { order_id, id, status: 'pending_payment' }
 *   400 { error }
 *   503 { error: "Supabase belum dikonfigurasi" }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { template, package: pkg, price, customer_name, customer_phone, customer_email, wedding_data } = body;

    // ── Validation ──
    if (!template || !["sacred", "celestial", "luna"].includes(template)) {
      return NextResponse.json(
        { error: "Template harus 'sacred', 'celestial', atau 'luna'." },
        { status: 400 }
      );
    }
    if (!pkg || !["basic", "premium", "free"].includes(pkg)) {
      return NextResponse.json(
        { error: "Paket harus 'basic', 'premium', atau 'free'." },
        { status: 400 }
      );
    }
    if (typeof price !== "number" || price < 0) {
      return NextResponse.json(
        { error: "Harga tidak valid." },
        { status: 400 }
      );
    }
    if (!customer_name?.trim() || !customer_phone?.trim()) {
      return NextResponse.json(
        { error: "Nama dan No. WhatsApp pemesan wajib diisi." },
        { status: 400 }
      );
    }

    // ── Service role client (bypass RLS — server-only) ──
    const supabase = getSupabaseServer();
    if (!supabase) {
      return NextResponse.json(
        { error: "Service role belum dikonfigurasi. Tidak dapat membuat pesanan." },
        { status: 503 }
      );
    }

    // ── Step 1: INSERT using service role (bypass RLS) ──
    // Status awal:
    //   - Luna (free) → 'pending_whatsapp' (gak ada pembayaran, langsung tunggu admin kontak via WA)
    //   - Sacred/Celestial → 'pending_payment' (user belum bayar QRIS)
    const isLunaFree = template === "luna" && pkg === "free";
    const initialStatus = isLunaFree ? "pending_whatsapp" : "pending_payment";

    const insertPayload = {
      order_id: `NAUKA-PENDING-${Date.now()}`, // placeholder, will be updated
      status: initialStatus,
      template,
      package: pkg,
      price: Math.round(price),
      customer_name: customer_name.trim(),
      customer_phone: customer_phone.trim(),
      customer_email: customer_email?.trim() || null,
      wedding_data: wedding_data || null,
    };

    const { data: insertData, error: insertError } = await supabase
      .from("orders")
      .insert([insertPayload])
      .select("id, created_at")
      .single();

    if (insertError || !insertData) {
      console.error("[orders POST] insert error:", insertError);
      return NextResponse.json(
        { error: insertError?.message || "Gagal membuat pesanan." },
        { status: 500 }
      );
    }

    // ── Step 2: Generate order_id: NAUKA-{year}-{id padded 3 digits} ──
    const year = new Date(insertData.created_at || Date.now()).getFullYear();
    const paddedId = String(insertData.id).padStart(3, "0");
    const orderId = `NAUKA-${year}-${paddedId}`;

    // ── Step 3: UPDATE order_id using service role ──
    const { error: updateError } = await supabase
      .from("orders")
      .update({ order_id: orderId })
      .eq("id", insertData.id);

    if (updateError) {
      console.error("[orders POST] update order_id error:", updateError);
      return NextResponse.json(
        {
          order_id: null,
          id: insertData.id,
          status: "pending_payment",
          warning: "Pesanan dibuat tapi order_id gagal di-generate. Hubungi admin.",
        },
        { status: 201 }
      );
    }

    return NextResponse.json(
      {
        order_id: orderId,
        id: insertData.id,
        status: initialStatus,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("[orders POST] unexpected error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * GET /api/orders
 * List all orders (ADMIN ONLY). Sorted by created_at desc.
 *
 * 🔒 Protected by TWO layers:
 *    1. x-admin-secret header (NAUKA_ADMIN_SECRET env var)
 *    2. Service role client (bypass RLS — server-only)
 *
 * Public frontend does NOT call this endpoint.
 *
 * Query params:
 *   - limit: number (default 50, max 100)
 *   - status?: 'pending_payment' | 'awaiting_confirmation' | 'paid' | 'in_production' | 'published' | 'cancelled'
 *
 * Response:
 *   200 { data: Order[], count: number }
 *   401 { error: "Unauthorized" }
 *   503 { error: "Service role belum dikonfigurasi" }
 */
export async function GET(req: NextRequest) {
  try {
    // ── Layer 1: Admin secret check ──
    if (!isAdminAuthorized(req)) {
      return NextResponse.json(
        { error: "Unauthorized. Admin secret required." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const limit = Math.min(Number(searchParams.get("limit") || "50"), 100);
    const status = searchParams.get("status");

    // ── Layer 2: Service role client ──
    const supabase = getSupabaseServer();
    if (!supabase) {
      return NextResponse.json(
        { error: "Service role belum dikonfigurasi." },
        { status: 503 }
      );
    }

    let query = supabase
      .from("orders")
      .select("id, order_id, status, template, package, price, customer_name, customer_phone, customer_email, created_at, updated_at")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (status && ["pending_payment", "pending_whatsapp", "awaiting_confirmation", "paid", "in_production", "published", "cancelled"].includes(status)) {
      query = query.eq("status", status);
    }

    const { data, error } = await query;

    if (error) {
      console.error("[orders GET] error:", error);
      return NextResponse.json({ data: [], error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data: data || [], count: (data || []).length });
  } catch (err: unknown) {
    console.error("[orders GET] unexpected error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ data: [], error: message }, { status: 500 });
  }
}
