export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase-server";

// ════════════════════════════════════════════════════════════════
// GET /api/dashboard?token=xxx
//
// User dashboard endpoint — login via secret token (magic link).
//
// Cara kerja:
//   1. User buka /dashboard?token=xxx
//   2. Frontend fetch /api/dashboard?token=xxx
//   3. Backend cari order dengan dashboard_token = xxx
//   4. Kalau ketemu → return data order (termasuk wedding_data)
//   5. Kalau gak ketemu → 401 Unauthorized
//
// Response:
//   200 { data: Order }  — return full order data
//   401 { error: "Token tidak valid" }
//   503 { error: "Database belum dikonfigurasi" }
// ════════════════════════════════════════════════════════════════

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token || token.length < 16) {
      return NextResponse.json(
        { error: "Token tidak valid." },
        { status: 401 }
      );
    }

    const supabase = getSupabaseServer();
    if (!supabase) {
      return NextResponse.json(
        { error: "Database belum dikonfigurasi." },
        { status: 503 }
      );
    }

    // Cari order berdasarkan dashboard_token
    const { data, error } = await supabase
      .from("orders")
      .select(`
        id,
        order_id,
        status,
        template,
        package,
        price,
        customer_name,
        customer_phone,
        customer_email,
        wedding_data,
        dashboard_token,
        created_at,
        updated_at
      `)
      .eq("dashboard_token", token)
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("[dashboard GET] query error:", error);
      return NextResponse.json(
        { error: "Terjadi kesalahan saat memuat data." },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Token tidak valid atau pesanan tidak ditemukan." },
        { status: 401 }
      );
    }

    return NextResponse.json({ data });
  } catch (err: unknown) {
    console.error("[dashboard GET] unexpected error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ════════════════════════════════════════════════════════════════
// PATCH /api/dashboard?token=xxx
//
// Update wedding_data (user edit data undangan mereka).
//
// Body:
//   { wedding_data: { ...updated data } }
//
// Response:
//   200 { data: Order }
//   401 { error: "Token tidak valid" }
// ════════════════════════════════════════════════════════════════

export async function PATCH(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token || token.length < 16) {
      return NextResponse.json(
        { error: "Token tidak valid." },
        { status: 401 }
      );
    }

    const supabase = getSupabaseServer();
    if (!supabase) {
      return NextResponse.json(
        { error: "Database belum dikonfigurasi." },
        { status: 503 }
      );
    }

    const body = await req.json();
    const { wedding_data } = body;

    if (!wedding_data) {
      return NextResponse.json(
        { error: "Data wedding wajib diisi." },
        { status: 400 }
      );
    }

    // Update wedding_data berdasarkan token
    const { data, error } = await supabase
      .from("orders")
      .update({ wedding_data, updated_at: new Date().toISOString() })
      .eq("dashboard_token", token)
      .select(`
        id,
        order_id,
        status,
        template,
        package,
        price,
        customer_name,
        customer_phone,
        customer_email,
        wedding_data,
        dashboard_token,
        created_at,
        updated_at
      `)
      .single();

    if (error || !data) {
      console.error("[dashboard PATCH] update error:", error);
      return NextResponse.json(
        { error: "Gagal update data. Token mungkin tidak valid." },
        { status: 401 }
      );
    }

    return NextResponse.json({ data });
  } catch (err: unknown) {
    console.error("[dashboard PATCH] unexpected error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
