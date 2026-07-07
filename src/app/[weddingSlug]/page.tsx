import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getSupabaseServer } from "@/lib/supabase-server";
import { Luna } from "@/components/nauka/Luna";
import { Marwah } from "@/components/nauka/Marwah";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import type { WeddingData } from "@/components/nauka/NaukaFormDataUndangan";

const ACTIVE_DAYS: Record<string, number> = { free: 14, basic: 30, premium: 90 };
const PENDING_STATUSES = ["pending_payment", "pending_whatsapp", "awaiting_confirmation", "paid", "in_production"];
const SITE_BASE_URL = "https://undangan-by-nauka.vercel.app";
const OG_IMAGES: Record<string, string> = {
  luna: "/og-luna.jpg",
  marwah: "/og-marwah.jpg",
  sacred: "/og-sacred.jpg",
  celestial: "/celestial/cover.jpg",
};

interface OrderRow {
  id: number; order_id: string; status: string; template: string; package: string;
  wedding_data: WeddingData | null; created_at: string; updated_at: string;
}

export const dynamic = "force-dynamic";

export default async function BasicInvitePage({
  params, searchParams,
}: {
  params: Promise<{ weddingSlug: string }>;
  searchParams: Promise<{ to?: string }>;
}) {
  try {
    const { weddingSlug } = await params;
    const { to } = await searchParams;
    const guestName = to ? decodeURIComponent(to) : null;

    console.log("[weddingSlug] route hit:", weddingSlug, "guest:", guestName);

    let wedding: unknown = null;
    try {
      wedding = await db.wedding.findUnique({ where: { slug: weddingSlug } });
    } catch (e) {
      console.error("[weddingSlug] Prisma findUnique error:", e);
      wedding = null;
    }

    if (wedding) {
      console.log("[weddingSlug] found in Prisma, returning basic view");
      const w = wedding as { groomName?: string; brideName?: string; package?: string };
      return (
        <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#0B1120", color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-inter), system-ui, sans-serif", padding: "32px", textAlign: "center" }}>
          {guestName && (
            <p style={{ fontSize: "13px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.45)", marginBottom: "32px" }}>
              Kepada Yth.<br /><span style={{ color: "rgba(201,169,110,0.85)", fontSize: "16px" }}>{guestName}</span>
            </p>
          )}
          <p style={{ fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "24px" }}>Undangan Pernikahan</p>
          <h1 style={{ fontFamily: "var(--font-bodoni), Georgia, serif", fontSize: "48px", fontWeight: 400, lineHeight: 1.2, margin: 0 }}>
            {w.groomName || "Mempelai Pria"}<br />
            <span style={{ fontSize: "14px", letterSpacing: "0.3em", color: "rgba(201,169,110,0.6)", display: "inline-block", margin: "16px 0" }}>&amp;</span><br />
            {w.brideName || "Mempelai Wanita"}
          </h1>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", marginTop: "40px" }}>Paket {w.package || "free"}</p>
        </main>
      );
    }

    let supabase: ReturnType<typeof getSupabaseServer> = null;
    try {
      supabase = getSupabaseServer();
    } catch (e) {
      console.error("[weddingSlug] getSupabaseServer threw:", e);
    }
    if (!supabase) {
      console.error("[weddingSlug] supabase not initialized, calling notFound");
      notFound();
    }

    const slugLower = weddingSlug.toLowerCase();
    console.log("[weddingSlug] querying Supabase for slug:", slugLower);

    let order: OrderRow | null = null;
    let queryError: unknown = null;
    try {
      const { data, error } = await supabase!
        .from("orders").select("id, order_id, status, template, package, wedding_data, created_at, updated_at")
        .eq("status", "published").filter("wedding_data->>slug", "eq", slugLower)
        .order("created_at", { ascending: false }).limit(1).maybeSingle();
      if (error) { queryError = error; console.error("[weddingSlug] supabase query error:", error); }
      else { order = (data as OrderRow) || null; }
    } catch (e) {
      console.error("[weddingSlug] supabase query threw:", e);
      queryError = e;
    }

    if (queryError || !order) {
      console.log("[weddingSlug] no published order, checking pending...");
      let pendingOrder: { status: string; id: number; template: string; package: string; wedding_data: WeddingData | null; created_at: string } | null = null;
      try {
        const { data: pending } = await supabase!
          .from("orders").select("id, status, template, package, wedding_data, created_at")
          .filter("wedding_data->>slug", "eq", slugLower)
          .order("created_at", { ascending: false }).limit(1).maybeSingle();
        pendingOrder = (pending as typeof pendingOrder) || null;
      } catch (e) {
        console.error("[weddingSlug] pending query threw:", e);
      }

      if (pendingOrder) {
        if (PENDING_STATUSES.includes(pendingOrder.status)) { return <PendingView />; }
        if (pendingOrder.status === "cancelled") { return <CancelledView />; }
      }
      notFound();
    }

    const orderData = order as OrderRow;
    console.log("[weddingSlug] found order:", orderData.order_id, "template:", orderData.template, "package:", orderData.package);

    const weddingData = orderData.wedding_data;
    if (!weddingData) {
      console.error("[weddingSlug] wedding_data is null for order:", orderData.order_id);
      return <ErrorView msg="Data undangan tidak ditemukan." />;
    }

    const activeDays = ACTIVE_DAYS[orderData.package] ?? 14;
    const akadDate = weddingData.akadDate;
    if (akadDate) {
      try {
        const akadDateTime = new Date(`${akadDate}T23:59:59+07:00`).getTime();
        if (!isNaN(akadDateTime)) {
          const expiryTime = akadDateTime + activeDays * 24 * 60 * 60 * 1000;
          if (Date.now() > expiryTime) {
            console.log("[weddingSlug] order expired, returning ExpiredView");
            return <ExpiredView pkg={orderData.package} activeDays={activeDays} />;
          }
        }
      } catch (e) {
        console.error("[weddingSlug] date parsing error:", e);
      }
    }

    const groomDisplay = weddingData.groomNickname?.trim() || weddingData.groomFullName || "Mempelai Pria";
    const brideDisplay = weddingData.brideNickname?.trim() || weddingData.brideFullName || "Mempelai Wanita";
    const pageTitle = `${groomDisplay} & ${brideDisplay} - Undangan Pernikahan`;
    const metaDesc = `Undangan pernikahan ${weddingData.groomFullName || groomDisplay} & ${weddingData.brideFullName || brideDisplay}`;
    let ogImage: string;
    try {
      ogImage = orderData.template === "celestial"
        ? `/api/og?groom=${encodeURIComponent(groomDisplay)}&bride=${encodeURIComponent(brideDisplay)}`
        : OG_IMAGES[orderData.template] || "/nauka-logo.png";
    } catch {
      ogImage = "/nauka-logo.png";
    }
    const canonicalUrl = `${SITE_BASE_URL}/${weddingSlug}`;

    const ogTags = (
      <>
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`${SITE_BASE_URL}${ogImage}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDesc} />
        <meta name="twitter:image" content={`${SITE_BASE_URL}${ogImage}`} />
      </>
    );

    if (orderData.template === "sacred") {
      console.log("[weddingSlug] rendering Sacred template");
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
      console.log("[weddingSlug] rendering Celestial template");
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
      console.log("[weddingSlug] rendering Marwah template");
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

    console.log("[weddingSlug] rendering Luna template (default)");
    return (
      <>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDesc} />
        {ogTags}
        <AnalyticsTracker orderId={orderData.order_id} />
        <Luna data={weddingData} guestName={guestName} />
      </>
    );
  } catch (err) {
    console.error("[weddingSlug] FATAL error in route:", err);
    return <ErrorView msg="Terjadi kesalahan saat memuat undangan." />;
  }
}

function PendingView() {
  return (
    <main style={{ minHeight: "100vh", background: "#0B1120", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}>
      <div style={{ textAlign: "center", maxWidth: 400 }}>
        <p style={{ fontFamily: "var(--font-bodoni, Georgia, serif)", fontSize: 24, color: "rgba(201,169,110,0.85)", margin: "0 0 16px" }}>Sedang Disiapkan</p>
        <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0 }}>Undangan ini sedang dalam proses penyiapan. Silakan kembali lagi nanti.</p>
      </div>
    </main>
  );
}

function CancelledView() {
  return (
    <main style={{ minHeight: "100vh", background: "#0B1120", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}>
      <div style={{ textAlign: "center", maxWidth: 400 }}>
        <p style={{ fontFamily: "var(--font-bodoni, Georgia, serif)", fontSize: 24, color: "rgba(255,150,150,0.85)", margin: "0 0 16px" }}>Undangan Tidak Tersedia</p>
        <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0 }}>Undangan ini sudah tidak aktif.</p>
      </div>
    </main>
  );
}

function ExpiredView({ pkg, activeDays }: { pkg: string; activeDays: number }) {
  return (
    <main style={{ minHeight: "100vh", background: "#0B1120", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}>
      <div style={{ textAlign: "center", maxWidth: 400 }}>
        <p style={{ fontFamily: "var(--font-bodoni, Georgia, serif)", fontSize: 24, color: "rgba(201,169,110,0.85)", margin: "0 0 16px" }}>Undangan Telah Berakhir</p>
        <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0 }}>Masa aktif undangan ini ({activeDays} hari setelah acara) telah habis.<br />Paket {pkg} - terima kasih sudah menggunakan Nauka.</p>
      </div>
    </main>
  );
}

function ErrorView({ msg }: { msg: string }) {
  return (
    <main style={{ minHeight: "100vh", background: "#0B1120", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}>
      <div style={{ textAlign: "center", maxWidth: 400 }}>
        <p style={{ fontFamily: "var(--font-bodoni, Georgia, serif)", fontSize: 24, color: "rgba(201,169,110,0.85)", margin: "0 0 16px" }}>Maaf</p>
        <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0 }}>{msg}</p>
      </div>
    </main>
  );
}
