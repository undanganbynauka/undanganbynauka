import { NextRequest, NextResponse } from "next/server";

// ════════════════════════════════════════════════════════════════
// GET /api/wishes?order_id=NAUKA-YYYY-NNN
//   → List wishes untuk order tertentu (urut terbaru dulu)
//   → Hanya tampilkan wishes berstatus "approved"
//
// POST /api/wishes
//   Body: { order_id?, name, message }
//   → Insert wish baru ke tabel guest_messages
//   → AUTO-APPROVE: status = "approved" (langsung tampil)
//   → FILTER KATA KASAR: kalau ada kata sensitif, status = "pending" (perlu moderasi admin)
//   → ANTI-SPAM: reject kalau ada wish dengan (name + message yang sama)
//     dalam 5 menit terakhir
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

// ════════════════════════════════════════════════════════════════
// FILTER KATA KASAR
// Kalau wish mengandung salah satu kata di bawah, status di-set "pending"
// (perlu di-approve admin dulu sebelum tampil ke publik).
// Tambah/edit kata sesuai kebutuhan - pakai lowercase.
// ════════════════════════════════════════════════════════════════
const BAD_WORDS: string[] = [
  // Hinaan umum
  "bego", "bodoh", "goblok", "goblog", "idiot", "tolol", "dungu", "blok",
  "bangsat", "bangsad", "anjing", "anj", "anjg", "anjink", "bangke",
  "kontol", "kontl", "memek", "memk", "ngentot", "ngntot", "ngntd",
  "pepek", "pepk", "titit", "ttt", "kemaluan",
  "jembut", "jmbt", "pantat", "pntk", "bokong",
  "setan", "iblis", "laknat", "kafir", "musyrik",
  // SARA / ujaran kebencian
  "cina", "kafir cina", "aseng", "indon", "malingsia",
  "anjing islam", "anjing kristen", "anjing yahudi",
  // Bentuk singkat / lolos filter
  "bgsd", "bngst", "ktl", "mmk", "ntt", "jmbt",
];

/**
 * Cek apakah text mengandung kata kasar.
 * Pakai word boundary supaya "bgn" tidak match "abangnya".
 */
function containsBadWord(text: string): boolean {
  const lower = text.toLowerCase();
  // Normalisasi: ganti karakter aneh dengan spasi
  const normalized = lower.replace(/[^a-z0-9\s]/g, " ");
  const words = normalized.split(/\s+/);
  return words.some((w) => BAD_WORDS.includes(w));
}

/**
 * Cek apakah text terlalu panjang (anti spam posting novel).
 */
function isTooLong(text: string): boolean {
  return text.length > 1000;
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
    .not("message", "is", null)
    .neq("message", "")
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(100);

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
  try {
    const body = await req.json();
    const { order_id, name, message } = body;

    // ── VALIDASI ──
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

    const FORBIDDEN_MESSAGES = ["none", "null", "undefined"];
    if (FORBIDDEN_MESSAGES.includes(cleanMessage.toLowerCase())) {
      return NextResponse.json(
        { error: "Ucapan tidak valid. Silakan tulis pesan Anda." },
        { status: 400 }
      );
    }

    if (cleanName.length > 100) {
      return NextResponse.json(
        { error: "Nama terlalu panjang (maksimal 100 karakter)." },
        { status: 400 }
      );
    }
    if (isTooLong(cleanMessage)) {
      return NextResponse.json(
        { error: "Ucapan terlalu panjang (maksimal 1000 karakter)." },
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
    // dalam 5 menit terakhir.
    const fiveMinAgo = new Date(Date.now() - DUPLICATE_WINDOW_MS).toISOString();

    let dupQuery = supabase
      .from("guest_messages")
      .select("id, created_at")
      .ilike("name", cleanName)
      .ilike("message", cleanMessage)
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
    } else if (existingDup) {
      return NextResponse.json(
        {
          error: "Ucapan yang sama sudah dikirim dalam 5 menit terakhir. Tunggu sebentar ya.",
          duplicate: true,
        },
        { status: 409 }
      );
    }

    // ── CEK KATA KASAR ──
    // Kalau ada kata kasar → status = "pending" (perlu moderasi admin).
    // Kalau bersih → status = "approved" (langsung tampil).
    const hasBadWord = containsBadWord(cleanName) || containsBadWord(cleanMessage);
    const finalStatus = hasBadWord ? "pending" : "approved";

    // ── INSERT ──
    const insertPayload: {
      name: string;
      message: string;
      order_id?: string;
      status: string;
    } = {
      name: cleanName,
      message: cleanMessage,
      status: finalStatus,
    };

    if (order_id && typeof order_id === "string") {
      insertPayload.order_id = order_id.trim();
    }

    const { data, error } = await supabase
      .from("guest_messages")
      .insert([insertPayload])
      .select("id, order_id, name, message, attendance, guest_count, created_at, status")
      .single();

    if (error) {
      console.error("[wishes POST] error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Pesan respons berbeda tergantung status
    if (hasBadWord) {
      return NextResponse.json({
        data,
        warning: "Ucapan Anda akan ditinjau admin sebelum ditampilkan.",
        status: "pending",
      }, { status: 201 });
    }

    return NextResponse.json({ data, status: "approved" }, { status: 201 });
  } catch (err) {
    console.error("[wishes POST] fatal error:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan. Coba lagi." },
      { status: 500 }
    );
  }
}
