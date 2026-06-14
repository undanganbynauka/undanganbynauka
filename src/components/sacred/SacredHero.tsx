"use client";

import React from "react";

interface SacredHeroProps {
  onOpen?: () => void;
  guestName?: string;
}

export function SacredHero({ onOpen, guestName }: SacredHeroProps) {
  return (
    <section className="sacred-hero">
      {/* Arch — atas, sesuai lebar layer */}
      <img src="/sacred/arch.png" alt="Arch" className="sacred-arch" />

      {/* Groom — kiri */}
      <img src="/sacred/groom.png" alt="Groom" className="sacred-groom" />

      {/* Center Content */}
      <div className="sacred-hero-content">
        <div className="sacred-hero-subtitle">
          The Wedding Invitation Of
        </div>

        <div className="sacred-hero-title">
          Ali &amp; Lyla
        </div>

        <div className="sacred-hero-date">
          Ahad &bull; 05 Juli 2026
        </div>

        <div className="sacred-hero-recipient">
          <p>Kepada Yth.</p>
          <p>Bapak/Ibu/Saudara/i</p>
          <p className="sacred-guest-name">
            {guestName || "Nama Tamu"}
          </p>
        </div>

        <div className="sacred-hero-button">
          <button onClick={onOpen} disabled={!onOpen}>
            Open Invitation
          </button>
        </div>
      </div>

      {/* Bride — kanan, sebagian keluar canvas */}
      <img src="/sacred/bride.png" alt="Bride" className="sacred-bride" />

      {/* Bottom Fade */}
      <div className="sacred-bottom-fade" />
    </section>
  );
}
