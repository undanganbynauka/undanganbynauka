"use client";

import Hero from "@/components/nauka/Hero";
import { NaukaMockup } from "@/components/nauka/NaukaMockup";
import { NaukaEtalaseSyari, NaukaEtalaseUniversal } from "@/components/nauka/NaukaEtalase";
import { NaukaHarga } from "@/components/nauka/NaukaHarga";
import { NaukaBayanganMomen } from "@/components/nauka/NaukaBayanganMomen";
import { NaukaFooter } from "@/components/nauka/NaukaFooter";

export default function NaukaLanding() {
  return (
    <main className="min-h-screen" style={{ background: "#0B1120" }}>
      {/* 1. HERO — Emotional Entry Gate */}
      <Hero />

      {/* 2. MOCKUP — Trust Builder */}
      <NaukaMockup />

      {/* 3. ETALASE SYAR'I — Sacred */}
      <NaukaEtalaseSyari />

      {/* 4. ETALASE UNIVERSAL — Celestial */}
      <NaukaEtalaseUniversal />

      {/* 5. PRICING — Clarity */}
      <NaukaHarga />

      {/* 6. BAYANGAN MOMEN — Emotional Anchor */}
      <NaukaBayanganMomen />

      {/* 7. FOOTER — Closing Moment */}
      <NaukaFooter />
    </main>
  );
}
