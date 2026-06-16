"use client";

import { NaukaGerbang } from "@/components/nauka/NaukaGerbang";
import { NaukaMockup } from "@/components/nauka/NaukaMockup";
import { NaukaEtalase } from "@/components/nauka/NaukaEtalase";
import { NaukaHarga } from "@/components/nauka/NaukaHarga";

export default function NaukaLanding() {
  return (
    <main className="min-h-screen" style={{ background: "#0B1120" }}>
      {/* 1. HERO — Emotional Entry Gate */}
      <NaukaGerbang />

      {/* 2. MOCKUP — Trust Builder (phone frame glimpse) */}
      <NaukaMockup />

      {/* 3. ETALASE — Visual Proof (first batch) */}
      <NaukaEtalase start={0} end={2} />

      {/* 4. PRICING — Clarity */}
      <NaukaHarga />

      {/* 5. ETALASE CONTINUATION — Exploration */}
      <NaukaEtalase start={2} end={3} />
    </main>
  );
}
