"use client";

import { NaukaGerbang } from "@/components/nauka/NaukaGerbang";
import { NaukaPrinsip } from "@/components/nauka/NaukaPrinsip";
import { NaukaEtalase } from "@/components/nauka/NaukaEtalase";
import { NaukaHarga } from "@/components/nauka/NaukaHarga";

export default function NaukaLanding() {
  return (
    <main className="min-h-screen" style={{ background: "#0B1120" }}>
      {/* 1. HERO — Emotional Entry Gate */}
      <NaukaGerbang />

      {/* 2. PRINSIP — Understanding & Trust */}
      <NaukaPrinsip />

      {/* 3. ETALASE — Visual Proof (first batch: Sacred + Celestial) */}
      <NaukaEtalase start={0} end={2} />

      {/* 4. PRICING — Clarity */}
      <NaukaHarga />

      {/* 5. ETALASE CONTINUATION — Exploration (Heritage) */}
      <NaukaEtalase start={2} end={3} />
    </main>
  );
}
