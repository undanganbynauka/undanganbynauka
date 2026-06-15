"use client";

import { NaukaGerbang } from "@/components/nauka/NaukaGerbang";
import { NaukaKenapa } from "@/components/nauka/NaukaKenapa";
import { NaukaTemplate } from "@/components/nauka/NaukaTemplate";
import { NaukaHarga } from "@/components/nauka/NaukaHarga";
import { NaukaCTA } from "@/components/nauka/NaukaCTA";

export default function NaukaLanding() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <NaukaGerbang />
      <NaukaKenapa />
      <NaukaTemplate />
      <NaukaHarga />
      <NaukaCTA />
    </main>
  );
}
