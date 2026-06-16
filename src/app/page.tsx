"use client";

import { NaukaGerbang } from "@/components/nauka/NaukaGerbang";
import { NaukaPrinsip } from "@/components/nauka/NaukaPrinsip";

export default function NaukaLanding() {
  return (
    <main className="min-h-screen" style={{ background: "#0B1120" }}>
      <NaukaGerbang />
      <NaukaPrinsip />
    </main>
  );
}
