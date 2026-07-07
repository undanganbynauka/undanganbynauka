"use client";

import React, { Suspense, useState, useCallback, useEffect, Component, ErrorInfo, lazy } from "react";
import { useSearchParams } from "next/navigation";
import type { WeddingData } from "@/components/nauka/NaukaFormDataUndangan";

// Lazy load semua komponen - kalau ada yang crash saat import, tetap ketangkap.
const SoundToggle = lazy(() => import("@/components/mood/SoundToggle").then(m => ({ default: m.SoundToggle })));
const SacredHero = lazy(() => import("@/components/sacred/SacredHero").then(m => ({ default: m.SacredHero })));
const CountdownSection = lazy(() => import("@/components/template/CountdownSection").then(m => ({ default: m.CountdownSection })));
const BismillahSection = lazy(() => import("@/components/template/BismillahSection").then(m => ({ default: m.BismillahSection })));
const BrideGroomSection = lazy(() => import("@/components/template/BrideGroomSection").then(m => ({ default: m.BrideGroomSection })));
const EventSection = lazy(() => import("@/components/template/EventSection").then(m => ({ default: m.EventSection })));
const OurJourneySection = lazy(() => import("@/components/template/OurJourneySection").then(m => ({ default: m.OurJourneySection })));
const RsvpSection = lazy(() => import("@/components/template/RsvpSection").then(m => ({ default: m.RsvpSection })));
const WishesSection = lazy(() => import("@/components/template/WishesSection").then(m => ({ default: m.WishesSection })));
const AmplopDigitalSection = lazy(() => import("@/components/template/AmplopDigitalSection").then(m => ({ default: m.AmplopDigitalSection })));
const ClosingSection = lazy(() => import("@/components/template/ClosingSection").then(m => ({ default: m.ClosingSection })));
const FloatingNav = lazy(() => import("@/components/template/FloatingNav").then(m => ({ default: m.FloatingNav })));
const SaveTheDateCard = lazy(() => import("@/components/template/SaveTheDateCard").then(m => ({ default: m.SaveTheDateCard })));
const IntroSection = lazy(() => import("@/components/template/IntroSection").then(m => ({ default: m.IntroSection })));

const DEFAULT_DATA: WeddingData = {
  groomFullName: "Ali Rahman", groomNickname: "Ali", groomFatherName: "Hendri", groomMotherName: "Ningsih", groomBirthOrder: "",
  brideFullName: "Lyla Azzahra", brideNickname: "Lyla", brideFatherName: "Yusuf", brideMotherName: "Rahayu", brideBirthOrder: "",
  akadDate: "2026-12-05", akadStartTime: "08:00", akadEndTime: "10:00", akadAddress: "Gedung Auditorium Koni", akadMapsLink: "", akadCity: "Jakarta Pusat",
  hasResepsi: true, resepsiDate: "2026-12-05", resepsiStartTime: "11:00", resepsiEndTime: "14:00", resepsiAddress: "Gedung Auditorium Koni", resepsiMapsLink: "", resepsiCity: "Jakarta Pusat",
  slug: "ali-lyla", quote: "", openingMessage: "", bgmType: "hening", bgmVocalOnlyNote: "",
  journey: [], timelineEvents: [], adminNote: "", additionalRequest: "",
  groomBank: "", groomRekening: "", groomAn: "", brideBank: "", brideRekening: "", brideAn: "",
  giftRecipientName: "", giftAddress: "",
};

class SectionBoundary extends Component<
  { name: string; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { name: string; children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[SacredContent] Section "${this.props.name}" crash:`, error.message, info.componentStack);
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

function normalizeData(input?: WeddingData | null): WeddingData {
  if (!input || typeof input !== "object") return DEFAULT_DATA;
  try {
    const s = (v: unknown, fallback = ""): string => {
      if (typeof v === "string") return v.trim();
      if (v === null || v === undefined) return fallback;
      try { return String(v).trim(); } catch { return fallback; }
    };
    const safeArr = <T,>(v: unknown): T[] => Array.isArray(v) ? (v as T[]) : [];

    return {
      ...DEFAULT_DATA,
      ...input,
      groomFullName: s(input.groomFullName, "Mempelai Pria"),
      groomNickname: s(input.groomNickname),
      groomFatherName: s(input.groomFatherName, "Bapak"),
      groomMotherName: s(input.groomMotherName, "Ibu"),
      groomBirthOrder: s(input.groomBirthOrder),
      brideFullName: s(input.brideFullName, "Mempelai Wanita"),
      brideNickname: s(input.brideNickname),
      brideFatherName: s(input.brideFatherName, "Bapak"),
      brideMotherName: s(input.brideMotherName, "Ibu"),
      brideBirthOrder: s(input.brideBirthOrder),
      akadDate: s(input.akadDate, DEFAULT_DATA.akadDate),
      akadStartTime: s(input.akadStartTime, "08:00"),
      akadEndTime: s(input.akadEndTime, "10:00"),
      akadAddress: s(input.akadAddress),
      akadCity: s(input.akadCity),
      akadMapsLink: s(input.akadMapsLink),
      hasResepsi: typeof input.hasResepsi === "boolean" ? input.hasResepsi : true,
      resepsiDate: s(input.resepsiDate, input.akadDate || DEFAULT_DATA.resepsiDate),
      resepsiStartTime: s(input.resepsiStartTime, "11:00"),
      resepsiEndTime: s(input.resepsiEndTime, "14:00"),
      resepsiAddress: s(input.resepsiAddress),
      resepsiCity: s(input.resepsiCity),
      resepsiMapsLink: s(input.resepsiMapsLink),
      groomBank: s(input.groomBank),
      groomRekening: s(input.groomRekening),
      groomAn: s(input.groomAn, s(input.groomFullName)),
      brideBank: s(input.brideBank),
      brideRekening: s(input.brideRekening),
      brideAn: s(input.brideAn, s(input.brideFullName)),
      giftRecipientName: s(input.giftRecipientName),
      giftAddress: s(input.giftAddress),
      journey: safeArr(input.journey),
      timelineEvents: safeArr(input.timelineEvents),
      quote: s(input.quote),
      openingMessage: s(input.openingMessage),
      bgmType: s(input.bgmType, "hening"),
      bgmVocalOnlyNote: s(input.bgmVocalOnlyNote),
    };
  } catch (e) {
    console.error("[SacredContent] normalizeData crash:", e);
    return DEFAULT_DATA;
  }
}

interface SacredContentProps {
  data?: WeddingData;
  orderId?: string;
  guestName?: string | null;
}

function SacredContentInner({ data, orderId, guestName }: SacredContentProps) {
  const d: WeddingData = normalizeData(data);
  const [phase, setPhase] = useState<"gate" | "opening" | "inside">("gate");
  const [mounted, setMounted] = useState(false);

  const groomName = (d.groomNickname || "").trim() || (d.groomFullName || "").split(/\s+/)[0] || "Mempelai Pria";
  const brideName = (d.brideNickname || "").trim() || (d.brideFullName || "").split(/\s+/)[0] || "Mempelai Wanita";

  useEffect(() => {
    setMounted(true);
    setPhase("gate");
  }, []);

  const handleOpen = useCallback(() => {
    setPhase("opening");
    setTimeout(() => setPhase("inside"), 2200);
  }, []);

  if (!mounted) {
    return <main className="sacred-page" style={{ minHeight: "100vh", background: "#0B1120" }} />;
  }

  return (
    <main className="sacred-page">
      {(phase === "gate" || phase === "opening") && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, pointerEvents: phase === "gate" ? "auto" : "none", opacity: phase === "gate" ? 1 : 0, transition: "opacity 2s cubic-bezier(0.4, 0, 0.2, 1)" }}>
          <SectionBoundary name="SacredHero">
            <SacredHero onOpen={phase === "gate" ? handleOpen : undefined} groomName={groomName} brideName={brideName} akadDate={d.akadDate} guestName={guestName} />
          </SectionBoundary>
        </div>
      )}

      {phase !== "gate" && (
        <div style={{ opacity: phase === "opening" ? 0 : 1, transition: "opacity 1.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s" }}>
          <SectionBoundary name="CountdownSection">
            <CountdownSection groomName={groomName} brideName={brideName} akadDate={d.akadDate} akadStartTime={d.akadStartTime} />
          </SectionBoundary>

          <SectionBoundary name="SaveTheDateCard">
            <SaveTheDateCard groomName={groomName} brideName={brideName} akadDate={d.akadDate} akadStartTime={d.akadStartTime} resepsiEndTime={d.resepsiEndTime} akadAddress={`${d.akadAddress}, ${d.akadCity}`.trim()} />
          </SectionBoundary>

          <SectionBoundary name="BismillahSection">
            <BismillahSection />
          </SectionBoundary>

          <SectionBoundary name="IntroSection">
            <IntroSection />
          </SectionBoundary>

          <SectionBoundary name="BrideGroomSection">
            <BrideGroomSection
              groomFullName={d.groomFullName}
              groomFatherName={d.groomFatherName}
              groomMotherName={d.groomMotherName}
              brideFullName={d.brideFullName}
              brideFatherName={d.brideFatherName}
              brideMotherName={d.brideMotherName}
            />
          </SectionBoundary>

          <SectionBoundary name="EventSection">
            <EventSection
              akadDate={d.akadDate}
              akadStartTime={d.akadStartTime}
              akadEndTime={d.akadEndTime}
              akadAddress={d.akadAddress}
              akadCity={d.akadCity}
              akadMapsLink={d.akadMapsLink}
              hasResepsi={d.hasResepsi}
              resepsiDate={d.resepsiDate}
              resepsiStartTime={d.resepsiStartTime}
              resepsiEndTime={d.resepsiEndTime}
              resepsiAddress={d.resepsiAddress}
              resepsiCity={d.resepsiCity}
              resepsiMapsLink={d.resepsiMapsLink}
            />
          </SectionBoundary>

          <SectionBoundary name="OurJourneySection">
            <OurJourneySection journey={d.journey?.length > 0 ? d.journey : undefined} />
          </SectionBoundary>

          <SectionBoundary name="RsvpSection">
            <RsvpSection orderId={orderId} />
          </SectionBoundary>

          <SectionBoundary name="WishesSection">
            <WishesSection orderId={orderId} />
          </SectionBoundary>

          <SectionBoundary name="AmplopDigitalSection">
            <AmplopDigitalSection
              groomFullName={d.groomFullName}
              groomBank={d.groomBank}
              groomRekening={d.groomRekening}
              groomAn={d.groomAn}
              brideFullName={d.brideFullName}
              brideBank={d.brideBank}
              brideRekening={d.brideRekening}
              brideAn={d.brideAn}
              giftRecipientName={d.giftRecipientName}
              giftAddress={d.giftAddress}
            />
          </SectionBoundary>

          <SectionBoundary name="ClosingSection">
            <ClosingSection groomName={groomName} brideName={brideName} akadDate={d.akadDate} />
          </SectionBoundary>

          <SectionBoundary name="FloatingNav">
            <FloatingNav />
          </SectionBoundary>

          <SectionBoundary name="SoundToggle">
            <SoundToggle />
          </SectionBoundary>
        </div>
      )}
    </main>
  );
}

// Wrapper terluar - pakai useSearchParams di sini, wrap dengan Suspense di parent.
function SacredContentWithSearchParams(props: SacredContentProps) {
  const searchParams = useSearchParams();
  // Pakai searchParams supaya ga unused warning - bisa dipakai untuk preview mode nanti
  void searchParams;
  return <SacredContentInner {...props} />;
}

export function SacredContent(props: SacredContentProps = {}) {
  return (
    <ErrorBoundaryTotal>
      <Suspense fallback={<main className="sacred-page" style={{ minHeight: "100vh", background: "#0B1120" }} />}>
        <SacredContentWithSearchParams {...props} />
      </Suspense>
    </ErrorBoundaryTotal>
  );
}

// ErrorBoundary terluar - catch error yang ga ketangkap SectionBoundary.
class ErrorBoundaryTotal extends Component<{ children: React.ReactNode }, { hasError: boolean; errorMsg: string }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, errorMsg: "" };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMsg: error.message || "Unknown error" };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[SacredContent] TOTAL CRASH:", error.message, info.componentStack);
  }
  render() {
    if (this.state.hasError) {
      return (
        <main style={{ minHeight: "100vh", background: "#0B1120", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
          <div>
            <p style={{ fontFamily: "Georgia, serif", fontSize: 24, color: "rgba(201,169,110,0.85)", marginBottom: 12 }}>Undangan Sedang Bermasalah</p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
              Coba refresh halaman. Kalau masih error, hubungi pengantin.
            </p>
            <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 16, fontFamily: "monospace" }}>
              {this.state.errorMsg.slice(0, 200)}
            </p>
          </div>
        </main>
      );
    }
    return this.props.children;
  }
}

export default function SacredPage() {
  return (
    <Suspense fallback={<main className="sacred-page" />}>
      <SacredContent />
    </Suspense>
  );
}
