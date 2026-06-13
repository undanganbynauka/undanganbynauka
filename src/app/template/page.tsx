"use client";

import React, { useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { HeritageHero } from "@/components/template/HeritageHero";
import { HeritageAyat } from "@/components/template/HeritageAyat";
import { HeritageCountdown } from "@/components/template/HeritageCountdown";
import { HeritageEventDetails } from "@/components/template/HeritageEventDetails";
import { HeritageFooter } from "@/components/template/HeritageFooter";
import { DaftarIsi } from "@/components/nauka/DaftarIsi";

type Phase = "gate" | "opening" | "inside";

/* ── Template Page Content (uses useSearchParams, needs Suspense) ── */
function TemplatePageContent() {
  const [phase, setPhase] = useState<Phase>("gate");
  const searchParams = useSearchParams();
  const jalur = searchParams.get("jalur") || "universal";

  const handleOpen = useCallback(() => {
    setPhase("opening");
    setTimeout(() => setPhase("inside"), 1600);
  }, []);

  const isGateVisible = phase === "gate" || phase === "opening";

  return (
    <main className="heritage-page">
      {/* Content — visible after gate opens */}
      <div
        style={{
          opacity: phase === "inside" ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
      >
        {/* Daftar Isi — first section after hero opens */}
        <DaftarIsi visible={phase === "inside"} />

        {/* Ayat */}
        <HeritageAyat />

        {/* Countdown */}
        <HeritageCountdown targetDate="2026-08-20T08:00:00" />

        {/* Event Details (id="wedding-details" for DaftarIsi navigation) */}
        <HeritageEventDetails />

        {/* Our Story placeholder (id="our-story" for DaftarIsi navigation) */}
        <section id="our-story" className="heritage-section" style={{ textAlign: "center" }}>
          <h2
            className="heritage-section-title mb-2"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Our Story
          </h2>
          <p className="heritage-section-subtitle">
            Cerita perjalanan kami akan ditampilkan di sini
          </p>
        </section>

        {/* Footer */}
        <HeritageFooter />
      </div>

      {/* HERO GATE — Heritage hero covers everything until opened */}
      {isGateVisible && (
        <div
          className={`fixed inset-0 z-50 ${
            phase === "opening" ? "animate-gate-open" : ""
          }`}
        >
          <HeritageHero
            bride="Nadia"
            groom="Rizky"
            parentBride="Putri dari Bapak Ahmad & Ibu Fatimah"
            parentGroom="Putra dari Bapak Mahmud & Ibu Aisyah"
            onOpen={handleOpen}
          />
        </div>
      )}
    </main>
  );
}

/* ── Template Page (Suspense wrapper for useSearchParams) ── */
export default function TemplatePage() {
  return (
    <Suspense>
      <TemplatePageContent />
    </Suspense>
  );
}
