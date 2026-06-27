import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getSupabaseServer } from "@/lib/supabase-server";
import { Luna } from "@/components/nauka/Luna";
import { Marwah } from "@/components/nauka/Marwah";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import type { WeddingData } from "@/components/nauka/NaukaFormDataUndangan";

const ACTIVE_DAYS: Record<string, number> = { free: 14, basic: 30, premium: 90 };

interface OrderRow {
  id: number; order_id: string; status: string; template: string; package: string;
  wedding_data: WeddingData | null; created_at: string; updated_at: string;
}

// ════════════════════════════════════════════════════════════════
// Personalized Guest Route (Premium only)
// URL: /{weddingSlug}/{guestSlug}  contoh: /riyan-naysila/budi
// ════════════════════════════════════════════════════════════════

export default async function PersonalizedGuestPage({
  params,
}: {
  params: Promise<{ weddingSlug: string; guestSlug: string }>;
}) {
  const { weddingSlug, guestSlug } = await params;
  const slugLower = weddingSlug.toLowerCase();

  const supabase = getSupabaseServer();
  if (!supabase) { notFound(); }

  // Step 1: Cari order published dengan slug yang cocok
  const { data: order, error } = await supabase
    .from("orders")
    .select("id, order_id, status, template, package, wedding_data, created_at, updated_at")
    .eq("status", "published")
    .filter("wedding_data->>slug", "eq", slugLower)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !order) { notFound(); }

  const orderData = order as OrderRow;
  const weddingData = orderData.wedding_data;
  if (!weddingData) { notFound(); }

  // Step 2: Cek masa aktif
  const activeDays = ACTIVE_DAYS[orderData.package] ?? 14;
  const akadDate = weddingData.akadDate;
  if (akadDate) {
    const akadDateTime = new Date(`${akadDate}T23:59:59+07:00`).getTime();
    const expiryTime = akadDateTime + activeDays * 24 * 60 * 60 * 1000;
    if (Date.now() > expiryTime) { notFound(); }
  }

  // Step 3: Cari guest berdasarkan order_id + guest_slug
  const { data: guest } = await supabase
    .from("guests")
    .select("guest_name, guest_suffix, guest_slug")
    .eq("order_id", orderData.order_id)
    .eq("guest_slug", guestSlug.toLowerCase())
    .limit(1)
    .maybeSingle();

  // Step 4: Dapat guestName (kalau guest ketemu) atau null
  let guestName: string | null = null;
  if (guest) {
    guestName = guest.guest_suffix
      ? `${guest.guest_name} ${guest.guest_suffix}`
      : guest.guest_name;
  }

  // Step 5: Render template
  const groomDisplay = weddingData.groomNickname?.trim() || weddingData.groomFullName || "Mempelai Pria";
  const brideDisplay = weddingData.brideNickname?.trim() || weddingData.brideFullName || "Mempelai Wanita";
  const pageTitle = `${groomDisplay} & ${brideDisplay} — Undangan Pernikahan`;
  const metaDesc = `Undangan pernikahan ${weddingData.groomFullName} & ${weddingData.brideFullName}`;

  // ── Render Sacred ──
  if (orderData.template === "sacred") {
    const { SacredContent } = await import("@/app/sacred/page");
    return (
      <>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDesc} />
        <AnalyticsTracker orderId={orderData.order_id} />
        <Suspense fallback={<main style={{ minHeight: "100vh", background: "#FAF7F2" }} />}>
          <SacredContent data={weddingData} orderId={orderData.order_id} guestName={guestName} />
        </Suspense>
      </>
    );
  }

  // ── Render Celestial ──
  if (orderData.template === "celestial") {
    const { CelestialContent } = await import("@/app/celestial/page");
    return (
      <>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDesc} />
        <AnalyticsTracker orderId={orderData.order_id} />
        <Suspense fallback={<main className="celestial-page"><div style={{ minHeight: "100vh" }} /></main>}>
          <CelestialContent data={weddingData} orderId={orderData.order_id} guestName={guestName} />
        </Suspense>
      </>
    );
  }

  // ── Render Marwah ──
  if (orderData.template === "marwah") {
    return (
      <>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDesc} />
        <AnalyticsTracker orderId={orderData.order_id} />
        <Marwah data={weddingData} guestName={guestName} />
      </>
    );
  }

  // ── Render Luna (default) ──
  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={metaDesc} />
      <AnalyticsTracker orderId={orderData.order_id} />
      <Luna data={weddingData} guestName={guestName} />
    </>
  );
}
