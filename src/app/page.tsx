"use client";

import { NaukaGerbang } from "@/components/nauka/NaukaGerbang";
import { NaukaMockup } from "@/components/nauka/NaukaMockup";
import { NaukaEtalaseSyari, NaukaEtalaseUniversal } from "@/components/nauka/NaukaEtalase";
import { NaukaHarga } from "@/components/nauka/NaukaHarga";
import { NaukaFooter } from "@/components/nauka/NaukaFooter";

export default function NaukaLanding() {
  return (
    <main className="min-h-screen" style={{ background: "#0B1120" }}>
      {/* 1. HERO — Emotional Entry Gate */}
      <NaukaGerbang />

      {/* 2. MOCKUP — Trust Builder */}
      <NaukaMockup />

      {/* 3. ETALASE SYAR'I — Sacred */}
      <NaukaEtalaseSyari />

      {/* 4. PRICING — Clarity */}
      <NaukaHarga />

      {/* 5. ETALASE UNIVERSAL — Celestial */}
      <NaukaEtalaseUniversal />

      {/* 6. FOOTER — Closing Moment */}
      <NaukaFooter />
    </main>
  );
}
