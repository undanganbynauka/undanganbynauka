import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase-server";

// ════════════════════════════════════════════════════════════════
// POST /api/dashboard/recover
//
// Body: { phone: "08xxxxxxxxxx" }
//
// Cari order berdasarkan customer_phone → return dashboard_url
// Kalau ketemu → return { dashboard_url, order_id, customer_name }
// Kalau gak ketemu → 404
//
// 🔒 Pakai service role (bypass RLS) — server-only
// ════════════════════════════════════════════════════════════════

const SITE_BASE_URL = "https://undangan-by-nauka.vercel.app";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone } = body;

    if (!phone || typeof phone !== "string") {
      return NextResponse.json(
        { error: "Nomor WhatsApp wajib diisi." },
        { status: 400 }
      );
    }

    // Normalize phone: hapus spasi, dash, dll
    let cleanPhone = phone.trim().replace(/[\s\-+]/g, "");

    // Coba beberapa format:
    // 1. 08xxx (original)
    // 2. 628xxx (kalau user input 628)
    // 3. 8xxx (kalau user input tanpa 0)
    const phoneVariants = [
      cleanPhone,
      cleanPhone.replace(/^62/, "0"),
      cleanPhone.replace(/^0/, "62"),
      cleanPhone.replace(/^0/, ""),
    ];

    const supabase = getSupabaseServer();
    if (!supabase) {
      return NextResponse.json(
        { error: "Database belum dikonfigurasi." },
        { status: 503 }
      );
    }

    // Cari order dengan salah satu format phone
    let foundOrder = null;

    for (const phoneVariant of phoneVariants) {
      const { data, error } = await supabase
        .from("orders")
        .select("id, order_id, customer_name, customer_phone, dashboard_token, status, template")
        .eq("customer_phone", phoneVariant)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (data && !error) {
        foundOrder = data;
        break;
      }
    }

    if (!foundOrder) {
      return NextResponse.json(
        { error: "Pesanan tidak ditemukan dengan nomor WhatsApp tersebut. Pastikan nomor yang Anda masukkan sesuai dengan yang dipakai saat checkout." },
        { status: 404 }
      );
    }

    if (!foundOrder.dashboard_token) {
      return NextResponse.json(
        { error: "Dashboard belum tersedia untuk pesanan ini. Hubungi admin di +6289655592925." },
        { status: 404 }
      );
    }

    const dashboardUrl = `${SITE_BASE_URL}/dashboard?token=${foundOrder.dashboard_token}`;

    return NextResponse.json({
      dashboard_url: dashboardUrl,
      order_id: foundOrder.order_id,
      customer_name: foundOrder.customer_name,
      template: foundOrder.template,
      status: foundOrder.status,
    });
  } catch (err: unknown) {
    console.error("[dashboard recover] error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
