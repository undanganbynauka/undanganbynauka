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
      <Hero />

      <NaukaMockup />

      <NaukaEtalaseSyari />

      <NaukaHarga />

      <NaukaBayanganMomen />

      <NaukaEtalaseUniversal />

      <NaukaFooter />

      
    </main>
  );
}
