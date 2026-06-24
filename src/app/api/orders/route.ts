import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer, isAdminAuthorized } from "@/lib/supabase-server";

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// POST /api/orders
// Create a new order. Generates order_id with format: NAUKA-{YYYY}-{NNN}
//
// ðŸ”’ Uses service role key for BOTH insert and update.
//    Anon (frontend) CANNOT insert orders directly via Supabase JS client.
//    RLS denies all anon access to orders table â€” see migration SQL.
//
// FLOW:
//   1. Validate request body
//   2. Anti-collision slug check (untuk Free pakai auto-generate slug)
//      - Cari order existing dengan slug yang sama
//      - Kalau ketemu, append suffix -2, -3, dst.
//   3. INSERT row using service role (RLS bypassed)
//      - order_id sementara: NAUKA-PENDING-{timestamp}
//      - status awal: tergantung paket
//        * Luna free â†’ 'published' (auto-publish, skip admin review)
//        * Sacred/Celestial â†’ 'pending_payment' (user belum bayar QRIS)
//   4. Generate real order_id from BIGSERIAL id: NAUKA-{YYYY}-{NNN}
//   5. UPDATE order_id using service role
//
// Body:
//   - template: 'sacred' | 'celestial' | 'luna'
//   - package: 'basic' | 'premium' | 'free'
//   - price: number (IDR)
//   - customer_name: string
//   - customer_phone: string
//   - customer_email?: string
//   - wedding_data?: object (seluruh data undangan â€” dikirim dari step Review)
//
// Status awal:
//   - Luna free â†’ 'published' (auto-publish, link langsung aktif)
//   - Sacred/Celestial â†’ 'pending_payment' (user belum bayar QRIS)
//
// Response:
//   201 { order_id, id, status, slug?, invitation_url? }
//   400 { error }
//   503 { error: "Supabase belum dikonfigurasi" }
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

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

    // â”€â”€ Validation â”€â”€
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
      return NextResponse.json({ error: "Harga tidak valid." }, { status: 400 });
    }
    if (!customer_name?.trim() || !customer_phone?.trim()) {
      return NextResponse.json(
        { error: "Nama dan No. WhatsApp pemesan wajib diisi." },
        { status: 400 }
      );
    }

    // â”€â”€ Service role client (bypass RLS â€” server-only) â”€â”€
    const supabase = getSupabaseServer();
    if (!supabase) {
      return NextResponse.json(
        { error: "Service role belum dikonfigurasi. Tidak dapat membuat pesanan." },
        { status: 503 }
      );
    }

    // â”€â”€ Tentukan status awal â”€â”€
    // Luna free â†’ auto-publish (skip admin review, langsung aktif)
    // Sacred/Celestial â†’ pending_payment (user belum bayar QRIS)
    const isLunaFree = template === "luna" && pkg === "free";
    const initialStatus = isLunaFree ? "published" : "pending_payment";

    // â”€â”€ Anti-collision slug check (untuk Luna free) â”€â”€
    // Kalau wedding_data.slug sudah dipakai order lain yang published,
    // append suffix -2, -3, dst.
    let finalWeddingData = wedding_data || {};
    let finalSlug: string | null = null;

    if (isLunaFree && wedding_data?.slug) {
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

    // â”€â”€ Step 1: INSERT using service role (bypass RLS) â”€â”€
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

    // â”€â”€ Step 2: Generate order_id: NAUKA-{year}-{id padded 3 digits} â”€â”€
    const year = new Date(insertData.created_at || Date.now()).getFullYear();
    const paddedId = String(insertData.id).padStart(3, "0");
    const orderId = `NAUKA-${year}-${paddedId}`;

    // â”€â”€ Step 3: UPDATE order_id using service role â”€â”€
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

    // â”€â”€ Build response â”€â”€
    // Untuk Luna free: sertakan slug & invitation_url supaya frontend bisa
    // tampilkan link langsung di halaman "Selesai"
    const responseData: Record<string, unknown> = {
      order_id: orderId,
      id: insertData.id,
      status: initialStatus,
    };

    if (isLunaFree && finalSlug) {
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

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// GET /api/orders
// List all orders (ADMIN ONLY). Sorted by created_at desc.
//
// ðŸ”’ Protected by TWO layers:
//    1. x-admin-secret header (NAUKA_ADMIN_SECRET env var)
//    2. Service role client (bypass RLS â€” server-only)
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
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
export async function GET(req: NextRequest) {
  try {
    // â”€â”€ Layer 1: Admin secret check â”€â”€
    if (!isAdminAuthorized(req)) {
      return NextResponse.json(
        { error: "Unauthorized. Admin secret required." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const limit = Math.min(Number(searchParams.get("limit") || "50"), 100);
    const status = searchParams.get("status");

    // â”€â”€ Layer 2: Service role client â”€â”€
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
