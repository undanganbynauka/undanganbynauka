import { NextRequest, NextResponse } from "next/server";

// ════════════════════════════════════════════════════════════════
// GET /api/wishes?order_id=NAUKA-YYYY-NNN
//   → List wishes untuk order tertentu (urut terbaru dulu)
//   → Kalau tidak ada order_id, return semua (backward compat)
//
// POST /api/wishes
//   Body: { order_id?, name, message }
//   → Insert wish baru ke tabel guest_messages
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

export async function GET(req: NextRequest) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ data: [], configured: false });
  }

  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("order_id");

  let query = supabase
    .from("guest_messages")
    .select("id, order_id, name, message, attendance, guest_count, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  // Filter per order_id kalau dikasih
  if (orderId) {
    query = query.eq("order_id", orderId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("[wishes GET] error:", error);
    return NextResponse.json({ data: [], error: error.message });
  }

  return NextResponse.json({ data: data || [], configured: true });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { order_id, name, message } = body;

  // Validasi
  if (!name?.trim()) {
    return NextResponse.json(
      { error: "Nama wajib diisi." },
      { status: 400 }
    );
  }
  if (!message?.trim()) {
    return NextResponse.json(
      { error: "Ucapan wajib diisi." },
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

  const insertPayload: {
    name: string;
    message: string;
    order_id?: string;
  } = {
    name: name.trim(),
    message: message.trim(),
  };

  // order_id opsional (untuk backward compat data lama)
  if (order_id && typeof order_id === "string") {
    insertPayload.order_id = order_id.trim();
  }

  const { data, error } = await supabase
    .from("guest_messages")
    .insert([insertPayload])
    .select("id, order_id, name, message, attendance, guest_count, created_at")
    .single();

  if (error) {
    console.error("[wishes POST] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 201 });
}
