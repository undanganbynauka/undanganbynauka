import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase-server";

function normalizePhone(raw: string): string[] {
  let p = (raw || "").replace(/[^\d]/g, "");
  if (p.startsWith("0")) p = "62" + p.slice(1);
  if (!p.startsWith("62")) p = "62" + p;
  return [
    p,
    "+" + p,
    "0" + p.slice(2),
    p.slice(2),
  ];
}

const PKG_PRIORITY: Record<string, number> = { premium: 0, basic: 1, free: 2 };

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const phoneRaw: string = (body && typeof body === "object" && "phone" in body)
      ? String((body as { phone: unknown }).phone || "")
      : "";

    if (!phoneRaw || phoneRaw.replace(/[^\d]/g, "").length < 8) {
      return NextResponse.json({ ok: false, error: "Nomor WhatsApp tidak valid." }, { status: 400 });
    }

    const variants = normalizePhone(phoneRaw);
    const supabase = getSupabaseServer();
    if (!supabase) {
      return NextResponse.json({ ok: false, error: "Database belum siap." }, { status: 500 });
    }

    const seen = new Set<string>();
    let orders: Array<{
      order_id: string;
      status: string;
      template: string;
      package: string;
      wedding_data: { slug?: string; groomNickname?: string; brideNickname?: string; groomFullName?: string; brideFullName?: string } | null;
      created_at: string;
      dashboard_token: string | null;
    }> = [];

    for (const v of variants) {
      const { data, error } = await supabase
        .from("orders")
        .select("order_id, status, template, package, wedding_data, created_at, dashboard_token")
        .or(`customer_phone.eq.${encodeURIComponent(v)}`)
        .order("created_at", { ascending: false });

      if (error) continue;
      if (data && data.length > 0) {
        for (const o of data) {
          if (o && !seen.has(o.order_id)) {
            seen.add(o.order_id);
            orders.push(o as typeof orders[number]);
          }
        }
      }
    }

    if (orders.length === 0) {
      return NextResponse.json({
        ok: false,
        error: "Belum ada order dengan nomor WhatsApp ini.",
      }, { status: 404 });
    }

    const withToken = orders.filter((o) => o.dashboard_token);
    if (withToken.length === 0) {
      return NextResponse.json({
        ok: false,
        error: "Order ditemukan, tapi belum punya akses dashboard. Hubungi admin.",
      }, { status: 404 });
    }

    withToken.sort((a, b) => {
      const pa = PKG_PRIORITY[a.package] ?? 99;
      const pb = PKG_PRIORITY[b.package] ?? 99;
      if (pa !== pb) return pa - pb;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    if (withToken.length === 1) {
      const o = withToken[0];
      const slug = o.wedding_data?.slug || "";
      return NextResponse.json({
        ok: true,
        single: true,
        order: {
          order_id: o.order_id,
          status: o.status,
          template: o.template,
          package: o.package,
          slug,
          groom: o.wedding_data?.groomNickname || o.wedding_data?.groomFullName || "",
          bride: o.wedding_data?.brideNickname || o.wedding_data?.brideFullName || "",
          dashboard_url: `/dashboard?token=${o.dashboard_token}`,
        },
      });
    }

    return NextResponse.json({
      ok: true,
      single: false,
      orders: withToken.map((o) => ({
        order_id: o.order_id,
        status: o.status,
        template: o.template,
        package: o.package,
        slug: o.wedding_data?.slug || "",
        groom: o.wedding_data?.groomNickname || o.wedding_data?.groomFullName || "",
        bride: o.wedding_data?.brideNickname || o.wedding_data?.brideFullName || "",
        created_at: o.created_at,
        dashboard_url: `/dashboard?token=${o.dashboard_token}`,
      })),
    });
  } catch (err) {
    console.error("[recover] error:", err);
    return NextResponse.json({ ok: false, error: "Terjadi kesalahan. Coba lagi." }, { status: 500 });
  }
}
