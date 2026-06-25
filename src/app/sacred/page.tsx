"use client";

import React, { Suspense, useState, useCallback, useEffect } from "react";
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

interface SacredContentProps {
  data?: WeddingData;
}

export function SacredContent({ data }: SacredContentProps = {}) {
  const d: WeddingData = { ...DEFAULT_DATA, ...(data || {}) };
  const [phase, setPhase] = useState<Phase>("gate");
  const searchParams = useSearchParams();
  const isPreview = searchParams.get("preview") === "true";

  const groomName = d.groomNickname.trim() || d.groomFullName.split(/\s+/)[0] || "Ali";
  const brideName = d.brideNickname.trim() || d.brideFullName.split(/\s+/)[0] || "Lyla";

  useEffect(() => {
    if (isPreview) { setPhase("gate"); }
    else if (localStorage.getItem(STORAGE_KEY) === "true") { setPhase("inside"); }
    else { setPhase("gate"); }
  }, [isPreview]);

  const handleOpen = useCallback(() => {
    if (!isPreview) { localStorage.setItem(STORAGE_KEY, "true"); }
    setPhase("opening");
    setTimeout(() => setPhase("inside"), 2200);
  }, [isPreview]);

  if (phase === "checking") { return <main className="sacred-page" />; }

  return (
    <main className="sacred-page">
      {(phase === "gate" || phase === "opening") && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, pointerEvents: phase === "gate" ? "auto" : "none", opacity: phase === "gate" ? 1 : 0, transition: "opacity 2s cubic-bezier(0.4, 0, 0.2, 1)" }}>
          <SacredHero onOpen={phase === "gate" ? handleOpen : undefined} groomName={groomName} brideName={brideName} akadDate={d.akadDate} />
        </div>
      )}

      {phase !== "gate" && (
        <div style={{ opacity: phase === "opening" ? 0 : 1, transition: "opacity 1.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s" }}>
          <CountdownSection groomName={groomName} brideName={brideName} akadDate={d.akadDate} akadStartTime={d.akadStartTime} />
          <SaveTheDateCard groomName={groomName} brideName={brideName} akadDate={d.akadDate} akadStartTime={d.akadStartTime} resepsiEndTime={d.resepsiEndTime} akadAddress={`${d.akadAddress}, ${d.akadCity}`} />
          <BismillahSection />
          <IntroSection />
          <BrideGroomSection groomFullName={d.groomFullName} groomFatherName={d.groomFatherName} groomMotherName={d.groomMotherName} brideFullName={d.brideFullName} brideFatherName={d.brideFatherName} brideMotherName={d.brideMotherName} />
          <EventSection akadDate={d.akadDate} akadStartTime={d.akadStartTime} akadEndTime={d.akadEndTime} akadAddress={d.akadAddress} akadCity={d.akadCity} akadMapsLink={d.akadMapsLink} hasResepsi={d.hasResepsi} resepsiDate={d.resepsiDate} resepsiStartTime={d.resepsiStartTime} resepsiEndTime={d.resepsiEndTime} resepsiAddress={d.resepsiAddress} resepsiCity={d.resepsiCity} resepsiMapsLink={d.resepsiMapsLink} />
          <OurJourneySection journey={d.journey?.length > 0 ? d.journey : undefined} />
          <RsvpSection />
          <WishesSection orderId={undefined} />
          <AmplopDigitalSection groomFullName={d.groomFullName} groomBank={d.groomBank} groomRekening={d.groomRekening} groomAn={d.groomAn} brideFullName={d.brideFullName} brideBank={d.brideBank} brideRekening={d.brideRekening} brideAn={d.brideAn} giftRecipientName={d.giftRecipientName} giftAddress={d.giftAddress} />
          <ClosingSection groomName={groomName} brideName={brideName} akadDate={d.akadDate} />
          <FloatingNav />
          <SoundToggle />
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
