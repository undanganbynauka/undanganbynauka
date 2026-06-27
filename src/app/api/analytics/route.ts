import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase-server";

// ════════════════════════════════════════════════════════════════
// API ANALYTICS — Track & retrieve invitation analytics
//
// POST /api/analytics
//   Body: { order_id, event_type, visitor_id? }
//   → Track event baru (page_view / rsvp_submit / wish_submit)
//   → visitor_id auto-generate kalau tidak dikasih
//
// GET /api/analytics?token=xxx
//   → Stats untuk user dashboard (login via token, 1 order)
//   → Return: total_views, unique_visitors, rsvp_count, wish_count,
//             rsvp_conversion, wish_conversion
//
// GET /api/analytics?admin=true&order_id=xxx
//   → Stats untuk admin (butuh x-admin-secret)
//   → Bisa filter per order atau global
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

const VALID_EVENTS = ["page_view", "rsvp_submit", "wish_submit"];

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { order_id, event_type, visitor_id } = body;

  if (!order_id || typeof order_id !== "string") {
    return NextResponse.json({ error: "order_id wajib diisi." }, { status: 400 });
  }
  if (!event_type || !VALID_EVENTS.includes(event_type)) {
    return NextResponse.json(
      { error: "event_type harus 'page_view', 'rsvp_submit', atau 'wish_submit'." },
      { status: 400 }
    );
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase belum dikonfigurasi." }, { status: 503 });
  }

  // Generate visitor_id kalau tidak dikasih (pakai timestamp + random)
  const finalVisitorId = (visitor_id && typeof visitor_id === "string" && visitor_id.trim())
    ? visitor_id.trim()
    : `anon-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  const { error } = await supabase
    .from("invitation_analytics")
    .insert([{
      order_id: order_id.trim(),
      event_type,
      visitor_id: finalVisitorId,
    }]);

  if (error) {
    console.error("[analytics POST] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}

export async function GET(req: NextRequest) {
  const supabase = getSupabaseServer();
  if (!supabase) {
    return NextResponse.json({ error: "Database belum dikonfigurasi." }, { status: 503 });
  }

  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const isAdmin = searchParams.get("admin") === "true";

  // ── Mode Admin: stats global atau per order ──
  if (isAdmin) {
    const adminSecret = req.headers.get("x-admin-secret");
    const expectedSecret = process.env.NAUKA_ADMIN_SECRET;
    if (!adminSecret || adminSecret !== expectedSecret) {
      return NextResponse.json(
        { error: "Unauthorized. Admin secret required." },
        { status: 401 }
      );
    }

    const orderIdFilter = searchParams.get("order_id");
    let query = supabase.from("invitation_analytics").select("event_type, visitor_id");
    if (orderIdFilter) query = query.eq("order_id", orderIdFilter);

    const { data, error } = await query.limit(10000);

    if (error) {
      console.error("[analytics GET admin] error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const pageViews = (data || []).filter((d: any) => d.event_type === "page_view");
    const uniqueVisitors = new Set(pageViews.map((d: any) => d.visitor_id)).size;
    const rsvpCount = (data || []).filter((d: any) => d.event_type === "rsvp_submit").length;
    const wishCount = (data || []).filter((d: any) => d.event_type === "wish_submit").length;

    return NextResponse.json({
      data: {
        total_views: pageViews.length,
        unique_visitors: uniqueVisitors,
        rsvp_count: rsvpCount,
        wish_count: wishCount,
        rsvp_conversion: uniqueVisitors > 0 ? ((rsvpCount / uniqueVisitors) * 100).toFixed(1) : "0.0",
        wish_conversion: uniqueVisitors > 0 ? ((wishCount / uniqueVisitors) * 100).toFixed(1) : "0.0",
      },
    });
  }

  // ── Mode User: stats per order (login via token) ──
  if (!token || token.length < 16) {
    return NextResponse.json({ error: "Token tidak valid." }, { status: 401 });
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

  // Ambil semua analytics untuk order ini
  const { data, error } = await supabase
    .from("invitation_analytics")
    .select("event_type, visitor_id")
    .eq("order_id", orderId)
    .limit(10000);

  if (error) {
    console.error("[analytics GET user] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const pageViews = (data || []).filter((d: any) => d.event_type === "page_view");
  const uniqueVisitors = new Set(pageViews.map((d: any) => d.visitor_id)).size;
  const rsvpCount = (data || []).filter((d: any) => d.event_type === "rsvp_submit").length;
  const wishCount = (data || []).filter((d: any) => d.event_type === "wish_submit").length;

  return NextResponse.json({
    data: {
      order_id: orderId,
      total_views: pageViews.length,
      unique_visitors: uniqueVisitors,
      rsvp_count: rsvpCount,
      wish_count: wishCount,
      rsvp_conversion: uniqueVisitors > 0 ? ((rsvpCount / uniqueVisitors) * 100).toFixed(1) : "0.0",
      wish_conversion: uniqueVisitors > 0 ? ((wishCount / uniqueVisitors) * 100).toFixed(1) : "0.0",
    },
  });
}
