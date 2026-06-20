import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import type { Order, OrderStatus } from "@/app/api/orders/route";

const VALID_STATUSES: OrderStatus[] = [
  "pending_payment",
  "awaiting_confirmation",
  "paid",
  "in_production",
  "published",
  "cancelled",
];

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: "Database belum dikonfigurasi" },
        { status: 503 }
      );
    }

    const { id } = params;

    // Cari by order_id (NAUKA-001) atau by numeric id
    const isNumeric = /^\d+$/.test(id);
    const column = isNumeric ? "id" : "order_id";
    const value = isNumeric ? parseInt(id) : id;

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq(column, value)
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Pesanan tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: data as Order });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: "Database belum dikonfigurasi" },
        { status: 503 }
      );
    }

    const { id } = params;
    const body = await req.json();
    const { status, admin_notes } = body;

    const updates: any = {};
    if (status && VALID_STATUSES.includes(status)) {
      updates.status = status;
    }
    if (admin_notes !== undefined) {
      updates.admin_notes = admin_notes;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "Tidak ada field yang diupdate" },
        { status: 400 }
      );
    }

    const isNumeric = /^\d+$/.test(id);
    const column = isNumeric ? "id" : "order_id";
    const value = isNumeric ? parseInt(id) : id;

    const { data, error } = await supabase
      .from("orders")
      .update(updates)
      .eq(column, value)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      data: data as Order,
      message: "Pesanan berhasil diupdate",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
