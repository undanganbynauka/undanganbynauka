import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer, isAdminAuthorized } from "@/lib/supabase-server";

const VALID_STATUSES = ["pending", "approved", "rejected"];

export async function GET(req: NextRequest) {
  if (!isAdminAuthorized(req)) {
    return NextResponse.json(
      { error: "Unauthorized. Admin secret required." },
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

  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("order_id");
  const status = searchParams.get("status");

  let query = supabase
    .from("guest_messages")
    .select("id, order_id, name, message, attendance, guest_count, status, created_at")
    .not("message", "is", null)
    .neq("message", "")
    .order("created_at", { ascending: false })
    .limit(500);

  if (orderId) {
    query = query.eq("order_id", orderId);
  }

  if (status && VALID_STATUSES.includes(status)) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    console.error("[wishes moderate GET] error:", error);
    return NextResponse.json({ data: [], error: error.message });
  }

  const stats = {
    total: (data || []).length,
    pending: (data || []).filter((w: any) => w.status === "pending").length,
    approved: (data || []).filter((w: any) => w.status === "approved").length,
    rejected: (data || []).filter((w: any) => w.status === "rejected").length,
  };

  return NextResponse.json({ data: data || [], stats });
}

export async function PATCH(req: NextRequest) {
  if (!isAdminAuthorized(req)) {
    return NextResponse.json(
      { error: "Unauthorized. Admin secret required." },
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

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "id wajib diisi. Contoh: /api/wishes/moderate?id=123" },
      { status: 400 }
    );
  }

  const body = await req.json();
  const { status } = body;

  if (!status || !VALID_STATUSES.includes(status)) {
    return NextResponse.json(
      { error: "status harus 'pending', 'approved', atau 'rejected'." },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("guest_messages")
    .update({ status })
    .eq("id", id)
    .select("id, order_id, name, message, attendance, guest_count, status, created_at")
    .single();

  if (error || !data) {
    console.error("[wishes moderate PATCH] error:", error);
    return NextResponse.json(
      { error: "Gagal update status. id mungkin tidak valid." },
      { status: 404 }
    );
  }

  return NextResponse.json({ data });
}

export async function DELETE(req: NextRequest) {
  if (!isAdminAuthorized(req)) {
    return NextResponse.json(
      { error: "Unauthorized. Admin secret required." },
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

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "id wajib diisi. Contoh: /api/wishes/moderate?id=123" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("guest_messages")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("[wishes moderate DELETE] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}