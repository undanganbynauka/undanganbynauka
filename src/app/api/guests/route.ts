import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer, isAdminAuthorized } from "@/lib/supabase-server";

// ════════════════════════════════════════════════════════════════
// API GUESTS — Daftar tamu per order
//
// GET /api/guests?order_id=NAUKA-YYYY-NNN
//   → List semua tamu untuk order tertentu
//
// POST /api/guests
//   Body: { order_id, guest_name, guest_phone?, guest_suffix?, guest_slug? }
//   → Tambah tamu baru
//   → Auto-generate guest_slug kalau tidak dikasih
//
// DELETE /api/guests?id=123
//   → Hapus tamu berdasarkan id
// ════════════════════════════════════════════════════════════════

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  if (!supabaseUrl || !supabaseAnonKey || !supabaseUrl.startsWith("http")) {
    return null;
  }
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { createClient } = require("@supabase/supabase-js");
  return createClient(supabaseUrl, supabaseAnonKey);
}

// Helper: generate slug dari nama tamu
// "Budi Santoso" → "budi-santoso"
// "Budi Santoso" (kalau budi-santoso sudah dipakai) → "budi-santoso-2"
function generateGuestSlug(name: string): string {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return base || "guest";
}

export async function GET(req: NextRequest) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ data: [], configured: false });
  }

  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("order_id");

  if (!orderId) {
    return NextResponse.json({
      data: [],
      error: "order_id wajib diisi. Contoh: /api/guests?order_id=NAUKA-2026-001",
    });
  }

  const { data, error } = await supabase
    .from("guests")
    .select("id, order_id, guest_name, guest_phone, guest_suffix, guest_slug, created_at")
    .eq("order_id", orderId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[guests GET] error:", error);
    return NextResponse.json({ data: [], error: error.message });
  }

  return NextResponse.json({ data: data || [], configured: true });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { order_id, guest_name, guest_phone, guest_suffix, guest_slug } = body;

  // Validasi
  if (!order_id || typeof order_id !== "string") {
    return NextResponse.json(
      { error: "order_id wajib diisi." },
      { status: 400 }
    );
  }
  if (!guest_name?.trim()) {
    return NextResponse.json(
      { error: "Nama tamu wajib diisi." },
      { status: 400 }
    );
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase belum dikonfigurasi." },
      { status: 503 }
    );
  }

  // Generate slug kalau tidak dikasih
  let finalSlug = (guest_slug && typeof guest_slug === "string" && guest_slug.trim())
    ? guest_slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-")
    : generateGuestSlug(guest_name.trim());

  // Anti-collision: cek kalau slug sudah dipakai di order ini
  let suffix = 2;
  let candidateSlug = finalSlug;
  while (suffix < 12) {
    const { data: existing } = await supabase
      .from("guests")
      .select("id")
      .eq("order_id", order_id.trim())
      .eq("guest_slug", candidateSlug)
      .limit(1)
      .maybeSingle();

    if (!existing) break;

    candidateSlug = `${finalSlug}-${suffix}`;
    suffix++;
  }
  finalSlug = candidateSlug;

  const insertPayload: {
    order_id: string;
    guest_name: string;
    guest_phone?: string;
    guest_suffix?: string;
    guest_slug: string;
  } = {
    order_id: order_id.trim(),
    guest_name: guest_name.trim(),
    guest_slug: finalSlug,
  };

  if (guest_phone && typeof guest_phone === "string" && guest_phone.trim()) {
    insertPayload.guest_phone = guest_phone.trim();
  }
  if (guest_suffix && typeof guest_suffix === "string" && guest_suffix.trim()) {
    insertPayload.guest_suffix = guest_suffix.trim();
  }

  const { data, error } = await supabase
    .from("guests")
    .insert([insertPayload])
    .select("id, order_id, guest_name, guest_phone, guest_suffix, guest_slug, created_at")
    .single();

  if (error) {
    console.error("[guests POST] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "id wajib diisi. Contoh: /api/guests?id=123" },
      { status: 400 }
    );
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase belum dikonfigurasi." },
      { status: 503 }
    );
  }

  const { error } = await supabase
    .from("guests")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("[guests DELETE] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
