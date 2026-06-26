import { NextRequest, NextResponse } from "next/server";

// ════════════════════════════════════════════════════════════════
// API RSVP — Konfirmasi kehadiran tamu
//
// GET /api/rsvp?order_id=NAUKA-YYYY-NNN
//   → List RSVP untuk order tertentu (urut terbaru dulu)
//
// POST /api/rsvp
//   Body: { order_id?, name, attendance, guest_count?, message? }
//   → Insert RSVP baru ke tabel guest_messages
//   → attendance: "hadir" | "tidak_hadir" | "ragu"
//   → Tersimpan di tabel yang sama dengan wishes (kolom attendance diisi)
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

const VALID_ATTENDANCE = ["hadir", "tidak_hadir", "ragu"];

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
      error: "order_id wajib diisi. Contoh: /api/rsvp?order_id=NAUKA-2026-001",
    });
  }

  const { data, error } = await supabase
    .from("guest_messages")
    .select("id, order_id, name, attendance, guest_count, message, created_at")
    .eq("order_id", orderId)
    .not("attendance", "is", null) // hanya yang ada RSVP-nya
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    console.error("[rsvp GET] error:", error);
    return NextResponse.json({ data: [], error: error.message });
  }

  return NextResponse.json({ data: data || [], configured: true });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { order_id, name, attendance, guest_count, message } = body;

  // Validasi
  if (!name?.trim()) {
    return NextResponse.json(
      { error: "Nama wajib diisi." },
      { status: 400 }
    );
  }
  if (!attendance || !VALID_ATTENDANCE.includes(attendance)) {
    return NextResponse.json(
      { error: "Attendance harus 'hadir', 'tidak_hadir', atau 'ragu'." },
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
    attendance: string;
    guest_count?: number;
    message?: string;
    order_id?: string;
  } = {
    name: name.trim(),
    attendance,
  };

  // guest_count: default 1, validasi 1-10
  const gc = Number(guest_count) || 1;
  if (gc >= 1 && gc <= 10) {
    insertPayload.guest_count = gc;
  }

  // message opsional
  if (message && typeof message === "string" && message.trim()) {
    insertPayload.message = message.trim();
  }

  // order_id opsional
  if (order_id && typeof order_id === "string") {
    insertPayload.order_id = order_id.trim();
  }

  const { data, error } = await supabase
    .from("guest_messages")
    .insert([insertPayload])
    .select("id, order_id, name, attendance, guest_count, message, created_at")
    .single();

  if (error) {
    console.error("[rsvp POST] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 201 });
}
