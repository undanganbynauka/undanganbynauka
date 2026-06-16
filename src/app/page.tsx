"use client";

import { NaukaGerbang } from "@/components/nauka/NaukaGerbang";
import { NaukaMockup } from "@/components/nauka/NaukaMockup";
import { NaukaEtalase } from "@/components/nauka/NaukaEtalase";
import { NaukaHarga } from "@/components/nauka/NaukaHarga";
import { NaukaFooter } from "@/components/nauka/NaukaFooter";

export default function NaukaLanding() {
  return (
    <main className="min-h-screen" style={{ background: "#0B1120" }}>
      {/* 1. HERO — Emotional Entry Gate (opening) */}
      <NaukaGerbang />

      {/* 2. MOCKUP — Trust Builder (phone frame glimpse) */}
      <NaukaMockup />

      {/* 3. ETALASE — Visual Proof */}
      <NaukaEtalase />

      {/* 4. PRICING — Clarity */}
      <NaukaHarga />

      {/* 6. FOOTER — Closing Moment (reflection & calmness) */}
      <NaukaFooter />
    </main>
  );
}
