import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase-server";
import { Luna } from "@/components/nauka/Luna";
import { Marwah } from "@/components/nauka/Marwah";
import type { WeddingData } from "@/components/nauka/NaukaFormDataUndangan";

const ACTIVE_DAYS: Record<string, number> = { free: 14, basic: 30, premium: 90 };
const PENDING_STATUSES = ["pending_payment", "pending_whatsapp", "awaiting_confirmation", "paid", "in_production"];

interface OrderRow {
  id: number;
  order_id: string;
  status: string;
  template: string;
  package: string;
  wedding_data: WeddingData | null;
  created_at: string;
  updated_at: string;
}

export default async function BasicInvitePage({
  params,
  searchParams,
}: {
  params: Promise<{ weddingSlug: string }>;
  searchParams: Promise<{ to?: string }>;
}) {
  const { weddingSlug } = await params;
  const { to } = await searchParams;
  const guestName = to ? decodeURIComponent(to) : null;

  const wedding = await db.wedding.findUnique({ where: { slug: weddingSlug } });

  if (wedding) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#0B1120", color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-inter), system-ui, sans-serif", padding: "32px", textAlign: "center" }}>
        {guestName && (
          <p style={{ fontSize: "13px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.45)", marginBottom: "32px" }}>
            Kepada Yth.<br />
            <span style={{ color: "rgba(201,169,110,0.85)", fontSize: "16px" }}>{guestName}</span>
          </p>
        )}
        <p style={{ fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "24px" }}>Undangan Pernikahan</p>
        <h1 style={{ fontFamily: "var(--font-bodoni), Georgia, serif", fontSize: "48px", fontWeight: 400, lineHeight: 1.2, margin: 0 }}>
          {wedding.groomName}<br />
          <span style={{ fontSize: "14px", letterSpacing: "0.3em", color: "rgba(201,169,110,0.6)", display: "inline-block", margin: "16px 0" }}>&amp;</span><br />
          {wedding.brideName}
        </h1>
        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", marginTop: "40px" }}>Paket {wedding.package}</p>
      </main>
    );
  }

  const supabase = getSupabaseServer();
  if (!supabase) { notFound(); }

  const slugLower = weddingSlug.toLowerCase();

  const { data: order, error } = await supabase
    .from("orders")
    .select("id, order_id, status, template, package, wedding_data, created_at, updated_at")
    .eq("status", "published")
    .filter("wedding_data->>slug", "eq", slugLower)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) { console.error("[weddingSlug] supabase query error:", error); notFound(); }

  if (!order) {
    const { data: pendingOrder } = await supabase
      .from("orders")
      .select("id, status, template, package, wedding_data, created_at")
      .filter("wedding_data->>slug", "eq", slugLower)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (pendingOrder) {
      const pending = pendingOrder as OrderRow;
      if (PENDING_STATUSES.includes(pending.status)) {
        return <PendingView />;
      }
      if (pending.status === "cancelled") {
        return <CancelledView />;
      }
    }
    notFound();
  }

  const orderData = order as OrderRow;
  const weddingData = orderData.weddingData;
  if (!weddingData) { notFound(); }

  const activeDays = ACTIVE_DAYS[orderData.package] ?? 14;
  const akadDate = weddingData.akadDate;
  if (akadDate) {
    const akadDateTime = new Date(`${akadDate}T23:59:59+07:00`).getTime();
    const expiryTime = akadDateTime + activeDays * 24 * 60 * 60 * 1000;
    if (Date.now() > expiryTime) {
      return <ExpiredView pkg={orderData.package} activeDays={activeDays} />;
    }
  }

  const groomDisplay = weddingData.groomNickname?.trim() || weddingData.groomFullName || "Mempelai Pria";
  const brideDisplay = weddingData.brideNickname?.trim() || weddingData.brideFullName || "Mempelai Wanita";
  const pageTitle = `${groomDisplay} & ${brideDisplay} — Undangan Pernikahan`;

  // ── Render Marwah jika template-nya marwah ──
  if (orderData.template === "marwah") {
    return (
      <>
        <title>{pageTitle}</title>
        <meta name="description" content={`Undangan pernikahan ${weddingData.groomFullName} & ${weddingData.brideFullName}`} />
        <Marwah data={weddingData} />
      </>
    );
  }

  // ── Render Luna dengan data ──
  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={`Undangan pernikahan ${weddingData.groomFullName} & ${weddingData.brideFullName}`} />
      <Luna data={weddingData} />
    </>
  );
}

function PendingView() {
  return (
    <main style={{ minHeight: "100vh", background: "#0B1120", color
