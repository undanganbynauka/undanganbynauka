import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Field yang DIKEMBALIKAN ke publik (sama dengan GET single — no PII).
const PUBLIC_ORDER_FIELDS = [
  "id",
  "order_id",
  "status",
  "template",
  "package",
  "price",
  "created_at",
  "updated_at",
] as const;

/**
 * POST /api/orders/[id]/confirm-payment
 * User-initiated konfirmasi pembayaran.
 *
 * Dipanggil saat user klik tombol "Saya sudah bayar" di step Pembayaran.
 * Transisi status: 'pending_payment' → 'awaiting_confirmation'
 *
 * 🔒 Keamanan:
 *   - Endpoint ini PUBLIC (tidak butuh admin secret) karena user yang klik.
 *   - TAPI transisi dibatasi: hanya 'pending_payment' → 'awaiting_confirmation'.
 *     Tidak bisa dipakai untuk set status lain (paid, cancelled, dst).
 *   - Idempoten: kalau status sudah 'awaiting_confirmation', return success tanpa ubah.
 *   - Order_id tetap predictable, tapi tidak ada dampak karena:
 *     1. Transisi ini hanya "menandai intent sudah bayar" — admin tetap verifikasi manual.
 *     2. Tidak ada PII yang diekspos (field whitelist).
 *
 * Path param:
 *   - id: order_id (NAUKA-{YYYY}-{NNN}) atau numeric id
 *
 * Body: boleh kosong. Jika ada, diabaikan.
 *
 * Response:
 *   200 { data: PublicOrder, message: "Konfirmasi pembayaran diterima" }
 *   404 { error: "Pesanan tidak ditemukan" }
 *   409 { error: "Pesanan tidak dalam status pending_payment" } — sudah dikonfirmasi/dibatalkan
 *   503 { error: "Database belum dikonfigurasi" }
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: rawId } = await params;
    if (!rawId) {
      return NextResponse.json({ error: "ID tidak valid." }, { status: 400 });
    }

    if (!supabase) {
      return NextResponse.json(
        { error: "Database belum dikonfigurasi." },
        { status: 503 }
      );
    }

    const isNumericId = /^\d+$/.test(rawId);

    // ── Step 1: Fetch current order (hanya butuh id + status untuk validasi transisi) ──
    let fetchQuery = supabase
      .from("orders")
      .select("id, order_id, status");
    if (isNumericId) {
      fetchQuery = fetchQuery.eq("id", Number(rawId));
    } else {
      fetchQuery = fetchQuery.eq("order_id", rawId.toUpperCase());
    }

    const { data: existing, error: fetchError } = await fetchQuery.single();

    if (fetchError || !existing) {
      return NextResponse.json(
        { error: "Pesanan tidak ditemukan." },
        { status: 404 }
      );
    }

    // ── Step 2: Validasi transisi ──
    if (existing.status === "awaiting_confirmation") {
      // Idempotent — user klik berkali-kali, atau refresh. Tetap sukses.
      const { data: refreshed } = await supabase
        .from("orders")
        .select(PUBLIC_ORDER_FIELDS.join(","))
        .eq("id", existing.id)
        .single();
      return NextResponse.json({
        data: refreshed,
        message: "Konfirmasi pembayaran sudah diterima sebelumnya.",
      });
    }

    if (existing.status !== "pending_payment") {
      return NextResponse.json(
        {
          error: `Pesanan tidak dalam status pending_payment (saat ini: ${existing.status}). Konfirmasi tidak dapat diproses.`,
        },
        { status: 409 }
      );
    }

    // ── Step 3: Update status → 'awaiting_confirmation' ──
    const { data: updated, error: updateError } = await supabase
      .from("orders")
      .update({ status: "awaiting_confirmation" })
      .eq("id", existing.id)
      .select(PUBLIC_ORDER_FIELDS.join(","))
      .single();

    if (updateError || !updated) {
      console.error("[confirm-payment] update error:", updateError);
      return NextResponse.json(
        { error: "Gagal mengkonfirmasi pembayaran. Silakan coba lagi." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data: updated,
      message: "Konfirmasi pembayaran diterima. Admin akan verifikasi pembayaran Anda.",
    });
  } catch (err: unknown) {
    console.error("[confirm-payment] unexpected error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
