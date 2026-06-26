import { NextRequest, NextResponse } from "next/server";

// ════════════════════════════════════════════════════════════════
// GET /api/wishes?order_id=NAUKA-YYYY-NNN
//   → List wishes untuk order tertentu (urut terbaru dulu)
//   → Kalau tidak ada order_id, return semua (backward compat)
//
// POST /api/wishes
//   Body: { order_id?, name, message }
//   → Insert wish baru ke tabel guest_messages
//   → ANTI-SPAM: reject kalau ada wish dengan (name + message yang sama)
//     dalam 5 menit terakhir (untuk order_id yang sama atau null)
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

// Window anti-spam: 5 menit (dalam millisecond)
const DUPLICATE_WINDOW_MS = 5 * 60 * 1000;

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

    // Validasi ketat
  const cleanName = (name && typeof name === "string") ? name.trim() : "";
  const cleanMessage = (message && typeof message === "string") ? message.trim() : "";

  if (!cleanName) {
    return NextResponse.json(
      { error: "Nama wajib diisi." },
      { status: 400 }
    );
  }
  if (!cleanMessage) {
    return NextResponse.json(
      { error: "Ucapan wajib diisi." },
      { status: 400 }
    );
  }
  // Reject placeholder values dari field kosong yang dikirim sebagai string
  const FORBIDDEN_MESSAGES = ["none", "null", "undefined", ""];
  if (FORBIDDEN_MESSAGES.includes(cleanMessage.toLowerCase())) {
    return NextResponse.json(
      { error: "Ucapan tidak valid. Silakan tulis pesan Anda." },
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

  // ── ANTI-SPAM CHECK ──
  // Cek apakah ada wish dengan (name + message yang sama persis)
  // dalam 5 menit terakhir, untuk order_id yang sama (atau keduanya null)
  const fiveMinAgo = new Date(Date.now() - DUPLICATE_WINDOW_MS).toISOString();

  let dupQuery = supabase
    .from("guest_messages")
    .select("id, created_at")
    .ilike("name", name.trim())
    .ilike("message", message.trim())
    .gte("created_at", fiveMinAgo)
    .limit(1);

  if (order_id && typeof order_id === "string") {
    dupQuery = dupQuery.eq("order_id", order_id.trim());
  } else {
    dupQuery = dupQuery.is("order_id", "null");
  }

  const { data: existingDup, error: dupError } = await dupQuery.maybeSingle();

  if (dupError) {
    console.warn("[wishes POST] dup check error (skip check):", dupError);
    // Lanjut insert aja — fail-open kalau cek dup gagal
  } else if (existingDup) {
    return NextResponse.json(
      {
        error: "Ucapan yang sama sudah dikirim dalam 5 menit terakhir. Tunggu sebentar ya.",
        duplicate: true,
      },
      { status: 409 }
    );
  }

  // ── INSERT ──
  const insertPayload: {
    name: string;
    message: string;
    order_id?: string;
  } = {
    name: name.trim(),
    message: message.trim(),
  };

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
