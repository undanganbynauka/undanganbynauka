import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer, isAdminAuthorized } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { template, package: pkg, price, customer_name, customer_phone, customer_email, wedding_data } = body;

    if (!template || !["sacred", "celestial"].includes(template)) {
      return NextResponse.json(
        { error: "Template harus 'sacred' atau 'celestial'." },
        { status: 400 }
      );
    }
    if (!pkg || !["free", "basic", "premium"].includes(pkg)) {
      return NextResponse.json(
        { error: "Paket harus 'free', 'basic', atau 'premium'." },
        { status: 400 }
      );
    }
    if (typeof price !== "number" || price < 0) {
      return NextResponse.json(
        { error: "Harga tidak valid." },
        { status: 400 }
      );
    }
    if (pkg === "free" && price !== 0) {
      return NextResponse.json(
        { error: "Paket Free harus berharga 0." },
        { status: 400 }
      );
    }
    if (pkg !== "free" && price === 0) {
      return NextResponse.json(
        { error: "Paket berbayar tidak boleh berharga 0." },
        { status: 400 }
      );
    }
    if (!customer_name?.trim() || !customer_phone?.trim()) {
      return NextResponse.json(
        { error: "Nama dan No. WhatsApp pemesan wajib diisi." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServer();
    if (!supabase) {
      return NextResponse.json(
        { error: "Service role belum dikonfigurasi. Tidak dapat membuat pesanan." },
        { status: 503 }
      );
    }

    const initialStatus = pkg === "free" ? "awaiting_confirmation" : "pending_payment";
    const insertPayload = {
      order_id: `NAUKA-PENDING-${Date.now()}`,
      status: initialStatus,
      template,
      package: pkg,
      price: Math.round(price),
      customer_name: customer_name.trim(),
      customer_phone: customer_phone.trim(),
      customer_email: customer_email?.trim() || null,
      wedding_data: wedding_data || null,
    };

    const { data: insertData, error: insertError } = await supabase
      .from("orders")
      .insert([insertPayload])
      .select("id, created_at")
      .single();

    if (insertError || !insertData) {
      console.error("[orders POST] insert error:", insertError);
      return NextResponse.json(
        { error: insertError?.message || "Gagal membuat pesanan." },
        { status: 500 }
      );
    }

    const year = new Date(insertData.created_at || Date.now()).getFullYear();
    const paddedId = String(insertData.id).padStart(3, "0");
    const orderId = `NAUKA-${year}-${paddedId}`;

    const { error: updateError } = await supabase
      .from("orders")
      .update({ order_id: orderId })
      .eq("id", insertData.id);

    if (updateError) {
      console.error("[orders POST] update order_id error:", updateError);
      return NextResponse.json(
        {
          order_id: null,
          id: insertData.id,
          status: initialStatus,
          warning: "Pesanan dibuat tapi order_id gagal di-generate. Hubungi admin.",
        },
        { status: 201 }
      );
    }

    return NextResponse.json(
      {
        order_id: orderId,
        id: insertData.id,
        status: initialStatus,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("[orders POST] unexpected error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
export async function GET(req: NextRequest) {
  try {
    if (!isAdminAuthorized(req)) {
      return NextResponse.json(
        { error: "Unauthorized. Admin secret required." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const limit = Math.min(Number(searchParams.get("limit") || "50"), 100);
    const status = searchParams.get("status");

    const supabase = getSupabaseServer();
    if (!supabase) {
      return NextResponse.json(
        { error: "Service role belum dikonfigurasi." },
        { status: 503 }
      );
    }

    let query = supabase
      .from("orders")
      .select("id, order_id, status, template, package, price, customer_name, customer_phone, customer_email, wedding_data, created_at, updated_at")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (status && ["pending_payment", "awaiting_confirmation", "paid", "in_production", "published", "cancelled"].includes(status)) {
      query = query.eq("status", status);
    }

    const { data, error } = await query;

    if (error) {
      console.error("[orders GET] error:", error);
      return NextResponse.json({ data: [], error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data: data || [], count: (data || []).length });
  } catch (err: unknown) {
    console.error("[orders GET] unexpected error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ data: [], error: message }, { status: 500 });
  }
}
