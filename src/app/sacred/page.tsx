"use client";

import React, { Suspense, useState, useCallback, useEffect, Component, ErrorInfo } from "react";
import dynamicImport from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { SoundToggle } from "@/components/mood/SoundToggle";
import { SacredHero } from "@/components/sacred/SacredHero";
import { CountdownSection } from "@/components/template/CountdownSection";
import { BismillahSection } from "@/components/template/BismillahSection";
import { BrideGroomSection } from "@/components/template/BrideGroomSection";
import { EventSection } from "@/components/template/EventSection";
import { OurJourneySection } from "@/components/template/OurJourneySection";
import { RsvpSection } from "@/components/template/RsvpSection";
import { WishesSection } from "@/components/template/WishesSection";
import { AmplopDigitalSection } from "@/components/template/AmplopDigitalSection";
import { ClosingSection } from "@/components/template/ClosingSection";
import { FloatingNav } from "@/components/template/FloatingNav";
import { SaveTheDateCard } from "@/components/template/SaveTheDateCard";
import { IntroSection } from "@/components/template/IntroSection";
import type { WeddingData } from "@/components/nauka/NaukaFormDataUndangan";

type Phase = "checking" | "gate" | "opening" | "inside";

const STORAGE_KEY = "nauka-sacred-opened";

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
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { name: string; children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[SacredContent] Section "${this.props.name}" crash:`, error.message, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

function normalizeData(input?: WeddingData | null): WeddingData {
  if (!input || typeof input !== "object") return DEFAULT_DATA;

  const s = (v: unknown, fallback = ""): string => {
    if (typeof v === "string") return v.trim();
    if (v === null || v === undefined) return fallback;
    return String(v).trim();
  };

  const safeArr = <T,>(v: unknown): T[] => {
    if (Array.isArray(v)) return v as T[];
    return [];
  };

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
}

interface SacredContentProps {
  data?: WeddingData;
  orderId?: string;
  guestName?: string | null;
}

export function SacredContent({ data, orderId, guestName }: SacredContentProps = {}) {
  const d: WeddingData = normalizeData(data);
  const [phase, setPhase] = useState<Phase>("gate");
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const isPreview = searchParams.get("preview") === "true";

  const groomName = d.groomNickname.trim() || d.groomFullName.split(/\s+/)[0] || "Mempelai Pria";
  const brideName = d.brideNickname.trim() || d.brideFullName.split(/\s+/)[0] || "Mempelai Wanita";

  // SKIP SSR - render hanya di client.
  // Ini menghindari semua server-side exception dari komponen template.
  useEffect(() => {
    setMounted(true);
    try {
      if (isPreview) { setPhase("gate"); }
      else if (localStorage.getItem(STORAGE_KEY) === "true") { setPhase("inside"); }
      else { setPhase("gate"); }
    } catch {
      setPhase("gate");
    }
  }, [isPreview]);

  const handleOpen = useCallback(() => {
    try {
      if (!isPreview) { localStorage.setItem(STORAGE_KEY, "true"); }
    } catch { /* ignore */ }
    setPhase("opening");
    setTimeout(() => setPhase("inside"), 2200);
  }, [isPreview]);

  // SSR / pre-mount: render skeleton kosong. Tidak ada komponen template yang dipanggil.
  if (!mounted) {
    return <main className="sacred-page" style={{ minHeight: "100vh", background: "#0B1120" }} />;
  }

  if (phase === "checking") { return <main className="sacred-page" />; }

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

export default function SacredPage() {
  return (
    <Suspense fallback={<main className="sacred-page" />}>
      <SacredContent />
    </Suspense>
  );
}
