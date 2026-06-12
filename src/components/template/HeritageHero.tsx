"use client";

import React from "react";
import { useHeritageEntrance } from "./useHeritageEntrance";

interface HeritageHeroProps {
  bride: string;
  groom: string;
  parentBride: string;
  parentGroom: string;
  onOpen?: () => void;
}

export function HeritageHero({
  bride,
  groom,
  parentBride,
  parentGroom,
  onOpen,
}: HeritageHeroProps) {
  const { ref, visible } = useHeritageEntrance();

  return (
    <section
      ref={ref}
      className="heritage-section heritage-hero-section relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="heritage-hero-bg absolute inset-0 z-0" />

      {/* Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-black/30 to-black/50" />

      {/* Content */}
      <div
        className={`heritage-entrance relative z-10 mx-auto w-full max-w-md px-6 text-center ${
          visible ? "visible" : ""
        }`}
      >
        {/* Bismillah */}
        <p
          className="heritage-hero-bismillah mb-6"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>

        {/* Intro text */}
        <p className="heritage-hero-intro mb-8">
          The Wedding of
        </p>

        {/* Bride & Groom Names */}
        <div className="heritage-hero-names mb-6">
          <h1
            className="heritage-hero-name-bride"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {bride}
          </h1>
          <span className="heritage-hero-amp">&</span>
          <h1
            className="heritage-hero-name-groom"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {groom}
          </h1>
        </div>

        {/* Parents */}
        <div className="heritage-hero-parents mb-10">
          <p className="heritage-hero-parent">{parentBride}</p>
          <p className="heritage-hero-parent-amp">&</p>
          <p className="heritage-hero-parent">{parentGroom}</p>
        </div>

        {/* Open button */}
        <button
          onClick={onOpen}
          className="heritage-hero-open-btn"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Buka Undangan
        </button>
      </div>
    </section>
  );
}
