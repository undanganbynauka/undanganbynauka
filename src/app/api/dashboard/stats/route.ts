import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase-server";

// ════════════════════════════════════════════════════════════════
// API DASHBOARD STATS — Statistik RSVP & Wishes per order
//
// GET /api/dashboard/stats?token=xxx
//   → Statistik untuk user dashboard (login via token, 1 order)
//   → Return: total_rsvp, hadir, tidak_hadir, ragu, total_tamu,
//             total_wishes, wishes_pending, wishes_approved
//
// GET /api/dashboard/stats?admin=true
//   → Statistik global untuk admin (semua order)
//   → Butuh x-admin-secret header
//   → Return: total_orders, total_rsvp, total_wishes, dll
// ════════════════════════════════════════════════════════════════

export async function GET(req: NextRequest) {
  const supabase = getSupabaseServer();
  if (!supabase) {
    return NextResponse.json(
      { error: "Database belum dikonfigurasi." },
      { status: 503 }
    );
  }

  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const isAdmin = searchParams.get("admin") === "true";

  // ── Mode Admin: statistik global ──
  if (isAdmin) {
    // Cek admin secret
    const adminSecret = req.headers.get("x-admin-secret");
    const expectedSecret = process.env.NAUKA_ADMIN_SECRET;
    if (!adminSecret || adminSecret !== expectedSecret) {
      return NextResponse.json(
        { error: "Unauthorized. Admin secret required." },
        { status: 401 }
      );
    }

    // Statistik global: total orders, total RSVP, total wishes
    const [
      { count: totalOrders },
      { count: totalRsvp },
      { count: totalWishes },
      { count: totalGuests },
      { data: rsvpByAttendance },
    ] = await Promise.all([
      supabase.from("orders").select("id", { count: "exact", head: true }),
      supabase.from("guest_messages").select("id", { count: "exact", head: true }).not("attendance", "is", null),
      supabase.from("guest_messages").select("id", { count: "exact", head: true }).not("message", "is", null).neq("message", ""),
      supabase.from("guests").select("id", { count: "exact", head: true }),
      supabase.from("guest_messages").select("attendance").not("attendance", "is", null),
    ]);

    const attendanceStats = {
      hadir: (rsvpByAttendance || []).filter((r: any) => r.attendance === "hadir").length,
      tidak_hadir: (rsvpByAttendance || []).filter((r: any) => r.attendance === "tidak_hadir").length,
      ragu: (rsvpByAttendance || []).filter((r: any) => r.attendance === "ragu").length,
    };

    return NextResponse.json({
      data: {
        total_orders: totalOrders || 0,
        total_rsvp: totalRsvp || 0,
        total_wishes: totalWishes || 0,
        total_guests: totalGuests || 0,
        rsvp_breakdown: attendanceStats,
      },
    });
  }

  // ── Mode User: statistik per order ──
  if (!token || token.length < 16) {
    return NextResponse.json(
      { error: "Token tidak valid." },
      { status: 401 }
    );
  }

  // Cari order berdasarkan token
  const { data: order, error: orderErr } = await supabase
    .from("orders")
    .select("id, order_id")
    .eq("dashboard_token", token)
    .limit(1)
    .maybeSingle();

  if (orderErr || !order) {
    return NextResponse.json(
      { error: "Token tidak valid atau pesanan tidak ditemukan." },
      { status: 401 }
    );
  }

  const orderId = order.order_id;

  // Hitung statistik untuk order ini
  const [
    { count: totalRsvp },
    { count: totalWishes },
    { count: wishesPending },
    { count: wishesApproved },
    { count: totalGuests },
    { data: rsvpByAttendance },
  ] = await Promise.all([
    supabase.from("guest_messages").select("id", { count: "exact", head: true }).eq("order_id", orderId).not("attendance", "is", null),
    supabase.from("guest_messages").select("id", { count: "exact", head: true }).eq("order_id", orderId).not("message", "is", null).neq("message", ""),
    supabase.from("guest_messages").select("id", { count: "exact", head: true }).eq("order_id", orderId).eq("status", "pending"),
    supabase.from("guest_messages").select("id", { count: "exact", head: true }).eq("order_id", orderId).eq("status", "approved"),
    supabase.from("guests").select("id", { count: "exact", head: true }).eq("order_id", orderId),
    supabase.from("guest_messages").select("attendance, guest_count").eq("order_id", orderId).not("attendance", "is", null),
  ]);

  // Hitung total tamu yang hadir (sum guest_count where attendance = hadir)
  const totalTamuHadir = (rsvpByAttendance || [])
    .filter((r: any) => r.attendance === "hadir")
    .reduce((sum: number, r: any) => sum + (r.guest_count || 1), 0);

  const attendanceStats = {
    hadir: (rsvpByAttendance || []).filter((r: any) => r.attendance === "hadir").length,
    tidak_hadir: (rsvpByAttendance || []).filter((r: any) => r.attendance === "tidak_hadir").length,
    ragu: (rsvpByAttendance || []).filter((r: any) => r.attendance === "ragu").length,
  };

  return NextResponse.json({
    data: {
      order_id: orderId,
      total_rsvp: totalRsvp || 0,
      rsvp_breakdown: attendanceStats,
      total_tamu_hadir: totalTamuHadir,
      total_wishes: totalWishes || 0,
      wishes_pending: wishesPending || 0,
      wishes_approved: wishesApproved || 0,
      total_guests: totalGuests || 0,
    },
  });
}
