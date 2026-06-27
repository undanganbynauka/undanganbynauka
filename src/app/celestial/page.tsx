"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import "@/app/celestial.css";

import { StarField, ShootingStar } from "@/components/celestial/StarField";
import { CelestialHero } from "@/components/celestial/CelestialHero";
import { CelestialSaveTheDate } from "@/components/celestial/CelestialSaveTheDate";
import { CelestialCountdown } from "@/components/celestial/CelestialCountdown";
import { CelestialBrideGroom } from "@/components/celestial/CelestialBrideGroom";
import { CelestialEvent } from "@/components/celestial/CelestialEvent";
import { CelestialJourney } from "@/components/celestial/CelestialJourney";
import { CelestialRSVP } from "@/components/celestial/CelestialRSVP";
import { CelestialWishes } from "@/components/celestial/CelestialWishes";
import { CelestialClosing } from "@/components/celestial/CelestialClosing";
import { CelestialNav } from "@/components/celestial/CelestialNav";
import { CelestialMusic } from "@/components/celestial/CelestialMusic";
import { CelestialSectionReveal } from "@/components/celestial/CelestialSectionReveal";
import type { WeddingData } from "@/components/nauka/NaukaFormDataUndangan";

type Phase = "checking" | "gate" | "opening" | "inside";

const STORAGE_KEY = "nauka-celestial-opened";

const DEFAULT_DATA: WeddingData = {
  groomFullName: "Ali Rahman", groomNickname: "Ali", groomFatherName: "Hendri", groomMotherName: "Ningsih", groomBirthOrder: "",
  brideFullName: "Lyla Azzahra", brideNickname: "Lyla", brideFatherName: "Yusuf", brideMotherName: "Rahayu", brideBirthOrder: "",
  akadDate: "2026-12-05", akadStartTime: "08:00", akadEndTime: "10:00", akadAddress: "Gedung Auditorium Koni", akadMapsLink: "", akadCity: "Jakarta Pusat",
  hasResepsi: true, resepsiDate: "2026-12-05", resepsiStartTime: "11:00", resepsiEndTime: "14:00", resepsiAddress: "Gedung Auditorium Koni", resepsiMapsLink: "", resepsiCity: "Jakarta Pusat",
  slug: "ali-lyla", quote: "", openingMessage: "", bgmType: "hening", bgmVocalOnlyNote: "",
  journey: [], timelineEvents: [], adminNote: "", additionalRequest: "",
  groomBank: "Bank Syariah Indonesia", groomRekening: "1234567890", groomAn: "", brideBank: "Bank Muamalat Indonesia", brideRekening: "1234567890", brideAn: "",
  giftRecipientName: "Lyla Azzahra", giftAddress: "Jakarta Pusat",
};

interface CelestialContentProps {
  data?: WeddingData;
  /** Order ID (NAUKA-YYYY-NNN) — dipakai untuk filter RSVP & Wishes per undangan */
  orderId?: string;
  /** Nama tamu untuk personalized greeting (Premium only). */
  guestName?: string | null;
}

export function CelestialContent({ data, orderId, guestName }: CelestialContentProps = {}) {
  const d: WeddingData = { ...DEFAULT_DATA, ...(data || {}) };
  const [phase, setPhase] = React.useState<Phase>("checking");
  const searchParams = useSearchParams();
  const isPreview = searchParams.get("preview") === "true";

  const groomName = d.groomNickname.trim() || d.groomFullName.split(/\s+/)[0] || "Ali";
  const brideName = d.brideNickname.trim() || d.brideFullName.split(/\s+/)[0] || "Lyla";

  React.useEffect(() => {
    if (isPreview) { setPhase("gate"); }
    else if (localStorage.getItem(STORAGE_KEY) === "true") { setPhase("inside"); }
    else { setPhase("gate"); }
  }, [isPreview]);

  const handleOpen = React.useCallback(() => {
    if (!isPreview) { localStorage.setItem(STORAGE_KEY, "true"); }
    setPhase("opening");
    setTimeout(() => setPhase("inside"), 2200);
  }, [isPreview]);

  if (phase === "checking") {
    return (
      <main className="celestial-page">
        <StarField />
        <ShootingStar />
      </main>
    );
  }

  return (
    <main className="celestial-page">
      <StarField />
      <ShootingStar />

      {(phase === "gate" || phase === "opening") && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, pointerEvents: phase === "gate" ? "auto" : "none", opacity: phase === "gate" ? 1 : 0, transition: "opacity 2s ease" }}>
          <CelestialHero onOpen={phase === "gate" ? handleOpen : undefined} groomName={groomName} brideName={brideName} akadDate={d.akadDate} />
        </div>
      )}

      {phase !== "gate" && (
        <div style={{ opacity: phase === "opening" ? 0 : 1, transition: "opacity 1.8s ease 0.6s" }}>
          <CelestialSaveTheDate groomName={groomName} brideName={brideName} akadDate={d.akadDate} />
          <CelestialSectionReveal><CelestialCountdown groomName={groomName} brideName={brideName} akadDate={d.akadDate} akadStartTime={d.akadStartTime} resepsiEndTime={d.resepsiEndTime} akadAddress={`${d.akadAddress}, ${d.akadCity}`} /></CelestialSectionReveal>
          <CelestialSectionReveal><CelestialBrideGroom groomFullName={d.groomFullName} groomFatherName={d.groomFatherName} groomMotherName={d.groomMotherName} brideFullName={d.brideFullName} brideFatherName={d.brideFatherName} brideMotherName={d.brideMotherName} /></CelestialSectionReveal>
          <CelestialSectionReveal><CelestialEvent akadDate={d.akadDate} akadStartTime={d.akadStartTime} akadEndTime={d.akadEndTime} akadAddress={d.akadAddress} akadCity={d.akadCity} akadMapsLink={d.akadMapsLink} hasResepsi={d.hasResepsi} resepsiDate={d.resepsiDate} resepsiStartTime={d.resepsiStartTime} resepsiEndTime={d.resepsiEndTime} resepsiAddress={d.resepsiAddress} resepsiCity={d.resepsiCity} resepsiMapsLink={d.resepsiMapsLink} /></CelestialSectionReveal>
          <CelestialSectionReveal><CelestialJourney /></CelestialSectionReveal>
          <CelestialSectionReveal><CelestialRSVP orderId={orderId} /></CelestialSectionReveal>
          <CelestialSectionReveal><CelestialWishes orderId={orderId} /></CelestialSectionReveal>
          <CelestialSectionReveal><CelestialClosing groomName={groomName} brideName={brideName} akadDate={d.akadDate} groomFullName={d.groomFullName} groomBank={d.groomBank} groomRekening={d.groomRekening} brideFullName={d.brideFullName} brideBank={d.brideBank} brideRekening={d.brideRekening} giftRecipientName={d.giftRecipientName} giftAddress={d.giftAddress} /></CelestialSectionReveal>
          <CelestialNav />
        </div>
      )}

      <CelestialMusic />
    </main>
  );
}

export default function CelestialPage() {
  return (
    <Suspense fallback={
      <main className="celestial-page">
        <StarField />
        <ShootingStar />
      </main>
    }>
      <CelestialContent />
    </Suspense>
  );
}
