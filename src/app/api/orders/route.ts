import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { getSupabaseServer, isAdminAuthorized } from "@/lib/supabase-server";

// ════════════════════════════════════════════════════════════════
// POST /api/orders
// Create a new order. Generates order_id with format: NAUKA-{YYYY}-{NNN}
//
// 🔒 Uses service role key for BOTH insert and update.
//    Anon (frontend) CANNOT insert orders directly via Supabase JS client.
//    RLS denies all anon access to orders table — see migration SQL.
//
// FLOW:
//   1. Validate request body
//   2. Anti-collision slug check (untuk Free pakai auto-generate slug)
//      - Cari order existing dengan slug yang sama
//      - Kalau ketemu, append suffix -2, -3, dst.
//   3. INSERT row using service role (RLS bypassed)
//      - order_id sementara: NAUKA-PENDING-{timestamp}
//      - status awal: tergantung paket
//        * Luna/Marwah free → 'published' (auto-publish, skip admin review)
//        * Sacred/Celestial → 'pending_payment' (user belum bayar QRIS)
//   4. Generate real order_id from BIGSERIAL id: NAUKA-{YYYY}-{NNN}
//   5. UPDATE order_id using service role
//
// Body:
//   - template: 'sacred' | 'celestial' | 'luna' | 'marwah'
//   - package: 'basic' | 'premium' | 'free'
//   - price: number (IDR)
//   - customer_name: string
//   - customer_phone: string
//   - customer_email?: string
//   - wedding_data?: object (seluruh data undangan — dikirim dari step Review)
//
// Status awal:
//   - Luna/Marwah free → 'published' (auto-publish, link langsung aktif)
//   - Sacred/Celestial → 'pending_payment' (user belum bayar QRIS)
//
// Response:
//   201 { order_id, id, status, dashboard_token, dashboard_url, slug?, invitation_url? }
//   400 { error }
//   503 { error: "Supabase belum dikonfigurasi" }
// ════════════════════════════════════════════════════════════════

const SITE_BASE_URL = "https://undangan-by-nauka.vercel.app";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      template,
      package: pkg,
      price,
      customer_name,
      customer_phone,
      customer_email,
      wedding_data,
    } = body;

    // ── Validation ──
    if (!template || !["sacred", "celestial", "luna", "marwah"].includes(template)) {
      return NextResponse.json(
        { error: "Template harus 'sacred', 'celestial', 'luna', atau 'marwah'." },
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
      return NextResponse.json({ error: "Harga tidak valid." }, { status: 400 });
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

    // ── Tentukan status awal ──
    // Luna/Marwah free → auto-publish (skip admin review, langsung aktif)
    // Sacred/Celestial → pending_payment (user belum bayar QRIS)
    const isFreeTemplate = (template === "luna" || template === "marwah") && pkg === "free";
    const initialStatus = isFreeTemplate ? "published" : "pending_payment";

    // ── Anti-collision slug check (untuk Luna/Marwah free) ──
    // Kalau wedding_data.slug sudah dipakai order lain yang published,
    // append suffix -2, -3, dst.
    let finalWeddingData = wedding_data || {};
    let finalSlug: string | null = null;

    if (isFreeTemplate && wedding_data?.slug) {
      const baseSlug: string = wedding_data.slug;
      let candidateSlug = baseSlug;
      let suffix = 2;

      // Cek maksimal 10 kali (kalau lebih, fail)
      while (suffix < 12) {
        const { data: existing, error: checkError } = await supabase
          .from("orders")
          .select("id")
          .eq("status", "published")
          .filter("wedding_data->>slug", "eq", candidateSlug)
          .limit(1)
          .maybeSingle();

        if (checkError) {
          console.error("[orders POST] slug check error:", checkError);
          break; // skip collision check, lanjut dengan slug asli
        }

        if (!existing) {
          // Slug available!
          break;
        }

        // Slug sudah dipakai, coba dengan suffix
        candidateSlug = `${baseSlug}-${suffix}`;
        suffix++;
      }

      finalSlug = candidateSlug;
      finalWeddingData = { ...wedding_data, slug: candidateSlug };
    } else if (wedding_data?.slug) {
      finalSlug = wedding_data.slug;
    }

    // ── Generate dashboard_token (magic link login untuk user dashboard) ──
    // 32 karakter hex (randomBytes 16) — unik per order, dipakai untuk akses /dashboard?token=xxx
    const dashboardToken = randomBytes(16).toString("hex");

    // ── Step 1: INSERT using service role (bypass RLS) ──
    const insertPayload = {
      order_id: `NAUKA-PENDING-${Date.now()}`, // placeholder, akan di-update
      status: initialStatus,
      template,
      package: pkg,
      price: Math.round(price),
      customer_name: customer_name.trim(),
      customer_phone: customer_phone.trim(),
      customer_email: customer_email?.trim() || null,
      wedding_data: finalWeddingData,
      dashboard_token: dashboardToken,
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
          status: initialStatus,
          warning: "Pesanan dibuat tapi order_id gagal di-generate. Hubungi admin.",
        },
        { status: 201 }
      );
    }

    // ── Build response ──
    // Sertakan dashboard_token supaya frontend bisa bangun link dashboard.
    // Untuk Luna/Marwah free: sertakan juga slug & invitation_url supaya frontend bisa
    // tampilkan link langsung di halaman "Selesai"
    const responseData: Record<string, unknown> = {
      order_id: orderId,
      id: insertData.id,
      status: initialStatus,
      dashboard_token: dashboardToken,
      dashboard_url: `${SITE_BASE_URL}/dashboard?token=${dashboardToken}`,
    };

    if (isFreeTemplate && finalSlug) {
      responseData.slug = finalSlug;
      responseData.invitation_url = `${SITE_BASE_URL}/${finalSlug}`;
    }

    return NextResponse.json(responseData, { status: 201 });
  } catch (err: unknown) {
    console.error("[orders POST] unexpected error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ════════════════════════════════════════════════════════════════
// GET /api/orders
// List all orders (ADMIN ONLY). Sorted by created_at desc.
//
// 🔒 Protected by TWO layers:
//    1. x-admin-secret header (NAUKA_ADMIN_SECRET env var)
//    2. Service role client (bypass RLS — server-only)
//
// Public frontend does NOT call this endpoint.
//
// Query params:
//   - limit: number (default 50, max 100)
//   - status?: 'pending_payment' | 'pending_whatsapp' | 'awaiting_confirmation' | 'paid' | 'in_production' | 'published' | 'cancelled'
//
// Response:
//   200 { data: Order[], count: number }
//   401 { error: "Unauthorized" }
//   503 { error: "Service role belum dikonfigurasi" }
// ════════════════════════════════════════════════════════════════
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
      .select(
        "id, order_id, status, template, package, price, customer_name, customer_phone, customer_email, created_at, updated_at"
      )
      .order("created_at", { ascending: false })
      .limit(limit);

    if (
      status &&
      [
        "pending_payment",
        "pending_whatsapp",
        "awaiting_confirmation",
        "paid",
        "in_production",
        "published",
        "cancelled",
      ].includes(status)
    ) {
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
