import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getSupabaseServer } from "@/lib/supabase-server";
import { Luna } from "@/components/nauka/Luna";
import { Marwah } from "@/components/nauka/Marwah";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import type { WeddingData } from "@/components/nauka/NaukaFormDataUndangan";

const ACTIVE_DAYS: Record<string, number> = { free: 14, basic: 30, premium: 90 };
const SITE_BASE_URL = "https://undangan-by-nauka.vercel.app";
const OG_IMAGES: Record<string, string> = {
  luna: "/nauka/couple-illustration-sage.png",
    marwah: "/og-marwah.jpg",
  sacred: "/sacred/arch.png",
  celestial: "/celestial/cover.jpg",
};

interface OrderRow {
  id: number; order_id: string; status: string; template: string; package: string;
  wedding_data: WeddingData | null; created_at: string; updated_at: string;
}

export default async function PersonalizedGuestPage({
  params,
}: {
  params: Promise<{ weddingSlug: string; guestSlug: string }>;
}) {
  const { weddingSlug, guestSlug } = await params;
  const slugLower = weddingSlug.toLowerCase();

  const supabase = getSupabaseServer();
  if (!supabase) { notFound(); }

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

  const activeDays = ACTIVE_DAYS[orderData.package] ?? 14;
  const akadDate = weddingData.akadDate;
  if (akadDate) {
    const akadDateTime = new Date(`${akadDate}T23:59:59+07:00`).getTime();
    const expiryTime = akadDateTime + activeDays * 24 * 60 * 60 * 1000;
    if (Date.now() > expiryTime) { notFound(); }
  }

  const { data: guest } = await supabase
    .from("guests")
    .select("guest_name, guest_suffix, guest_slug")
    .eq("order_id", orderData.order_id)
    .eq("guest_slug", guestSlug.toLowerCase())
    .limit(1)
    .maybeSingle();

  let guestName: string | null = null;
  if (guest) {
    guestName = guest.guest_suffix
      ? `${guest.guest_name} ${guest.guest_suffix}`
      : guest.guest_name;
  }

  const groomDisplay = weddingData.groomNickname?.trim() || weddingData.groomFullName || "Mempelai Pria";
  const brideDisplay = weddingData.brideNickname?.trim() || weddingData.brideFullName || "Mempelai Wanita";
  const pageTitle = `${groomDisplay} & ${brideDisplay} — Undangan Pernikahan`;
  const metaDesc = `Undangan pernikahan ${weddingData.groomFullName} & ${weddingData.brideFullName}`;
    const ogImage = orderData.template === "celestial"
    ? `/api/og?groom=${encodeURIComponent(groomDisplay)}&bride=${encodeURIComponent(brideDisplay)}`
    : OG_IMAGES[orderData.template] || "/nauka-logo.png";
  const canonicalUrl = `${SITE_BASE_URL}/${slugLower}/${guestSlug}`;

  const ogTags = (
    <>
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
  
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={`${SITE_BASE_URL}${ogImage}`} />
    </>
  );

  if (orderData.template === "sacred") {
    const { SacredContent } = await import("@/app/sacred/page");
    return (
      <>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDesc} />
        {ogTags}
        <AnalyticsTracker orderId={orderData.order_id} />
        <Suspense fallback={<main style={{ minHeight: "100vh", background: "#FAF7F2" }} />}>
          <SacredContent data={weddingData} orderId={orderData.order_id} guestName={guestName} />
        </Suspense>
      </>
    );
  }

  if (orderData.template === "celestial") {
    const { CelestialContent } = await import("@/app/celestial/page");
    return (
      <>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDesc} />
        {ogTags}
        <AnalyticsTracker orderId={orderData.order_id} />
        <Suspense fallback={<main className="celestial-page"><div style={{ minHeight: "100vh" }} /></main>}>
          <CelestialContent data={weddingData} orderId={orderData.order_id} guestName={guestName} />
        </Suspense>
      </>
    );
  }

  if (orderData.template === "marwah") {
    return (
      <>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDesc} />
        {ogTags}
        <AnalyticsTracker orderId={orderData.order_id} />
        <Marwah data={weddingData} guestName={guestName} />
      </>
    );
  }

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={metaDesc} />
      {ogTags}
      <AnalyticsTracker orderId={orderData.order_id} />
      <Luna data={weddingData} guestName={guestName} />
    </>
  );
}
