"use client";

import React from "react";

/* ===== Wayang Kayon (Gunungan/Tree of Life) — Line Art Silhouette =====
   Digunakan sebagai background ornament di section-section kunci.
   Style: line art minimal, warna cream (#D1C5B8) + muted gold (#C4A97A) on dark bg
   Background opacity: 15-25%  |  Frame/accent opacity: 30-40%
*/

export function WayangKayon({ className = "", position = "right" }: { className?: string; position?: "left" | "right" }) {
  return (
    <div
      className={`heritage-wayang-kayon ${className}`}
      style={{
        [position === "right" ? "right" : "left"]: "-5%",
        top: "10%",
        transform: position === "left" ? "scaleX(-1)" : undefined,
      }}
    >
      <svg viewBox="0 0 200 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
        {/* Kayon / Gunungan — simplified wayang mountain silhouette */}
        {/* Main mountain outline */}
        <path
          d="M100 10 L130 50 L140 45 L150 70 L160 65 L155 90 L165 95 L150 110 L155 130 L145 125 L140 150 L125 140 L120 165 L110 155 L100 175 L90 155 L80 165 L75 140 L60 150 L55 125 L45 130 L50 110 L35 95 L45 90 L40 65 L50 70 L60 45 L70 50 Z"
          stroke="#D1C5B8"
          strokeWidth="1.2"
          fill="none"
          opacity="0.5"
        />
        {/* Inner tree of life */}
        <path
          d="M100 40 L100 160"
          stroke="#D1C5B8"
          strokeWidth="0.8"
          opacity="0.3"
        />
        {/* Branches */}
        <path d="M100 70 L80 55 L75 58" stroke="#D1C5B8" strokeWidth="0.6" opacity="0.25" />
        <path d="M100 70 L120 55 L125 58" stroke="#D1C5B8" strokeWidth="0.6" opacity="0.25" />
        <path d="M100 100 L78 85" stroke="#D1C5B8" strokeWidth="0.5" opacity="0.2" />
        <path d="M100 100 L122 85" stroke="#D1C5B8" strokeWidth="0.5" opacity="0.2" />
        <path d="M100 130 L82 115" stroke="#D1C5B8" strokeWidth="0.5" opacity="0.2" />
        <path d="M100 130 L118 115" stroke="#D1C5B8" strokeWidth="0.5" opacity="0.2" />
        {/* Crown / top detail */}
        <circle cx="100" cy="25" r="6" stroke="#C4A97A" strokeWidth="0.7" fill="#C4A97A" fillOpacity="0.08" opacity="0.5" />
        <circle cx="100" cy="25" r="2.5" fill="#C4A97A" opacity="0.3" />
        {/* Side flourishes */}
        <path d="M60 95 Q50 85 55 75" stroke="#D1C5B8" strokeWidth="0.5" opacity="0.2" />
        <path d="M140 95 Q150 85 145 75" stroke="#D1C5B8" strokeWidth="0.5" opacity="0.2" />
        {/* Base detail */}
        <path d="M80 170 Q100 185 120 170" stroke="#D1C5B8" strokeWidth="0.6" fill="none" opacity="0.25" />
        <path d="M85 180 Q100 192 115 180" stroke="#D1C5B8" strokeWidth="0.5" fill="none" opacity="0.2" />
        {/* Small decorative dots */}
        <circle cx="75" cy="50" r="1.5" fill="#C4A97A" opacity="0.2" />
        <circle cx="125" cy="50" r="1.5" fill="#C4A97A" opacity="0.2" />
        <circle cx="50" cy="85" r="1" fill="#D1C5B8" opacity="0.15" />
        <circle cx="150" cy="85" r="1" fill="#D1C5B8" opacity="0.15" />
      </svg>
    </div>
  );
}

/* ===== Wayang Side Flourish — decorative side ornament ===== */
export function WayangSideFlourish({ className = "", side = "left" }: { className?: string; side?: "left" | "right" }) {
  return (
    <div
      className={`heritage-wayang-side ${className}`}
      style={{
        [side === "right" ? "right" : "left"]: "2%",
        top: "25%",
      }}
    >
      <svg viewBox="0 0 40 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
        {/* Vertical wayang-inspired side line */}
        <path d="M20 0 L20 160" stroke="#D1C5B8" strokeWidth="0.4" opacity="0.3" />
        {/* Top curl */}
        <path d="M20 10 Q30 15 25 25 Q20 35 20 40" stroke="#D1C5B8" strokeWidth="0.6" opacity="0.25" />
        <path d="M20 10 Q10 15 15 25 Q20 35 20 40" stroke="#D1C5B8" strokeWidth="0.4" opacity="0.15" />
        {/* Middle diamond */}
        <path d="M20 70 L25 80 L20 90 L15 80 Z" stroke="#C4A97A" strokeWidth="0.5" fill="#C4A97A" fillOpacity="0.06" opacity="0.4" />
        {/* Small circles */}
        <circle cx="20" cy="55" r="1.5" fill="#D1C5B8" opacity="0.2" />
        <circle cx="20" cy="105" r="1.5" fill="#D1C5B8" opacity="0.2" />
        {/* Bottom curl */}
        <path d="M20 120 Q30 125 25 135 Q20 145 20 150" stroke="#D1C5B8" strokeWidth="0.6" opacity="0.25" />
        <path d="M20 120 Q10 125 15 135 Q20 145 20 150" stroke="#D1C5B8" strokeWidth="0.4" opacity="0.15" />
      </svg>
    </div>
  );
}

/* ===== Ukiran Corner — decorative corner for cards ===== */
export function UkiranCorner({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const transforms: Record<string, string> = {
    "top-left": "",
    "top-right": "scaleX(-1)",
    "bottom-left": "scaleY(-1)",
    "bottom-right": "scale(-1)",
  };
  const positions: Record<string, React.CSSProperties> = {
    "top-left": { top: "8px", left: "8px" },
    "top-right": { top: "8px", right: "8px" },
    "bottom-left": { bottom: "8px", left: "8px" },
    "bottom-right": { bottom: "8px", right: "8px" },
  };

  return (
    <div className="heritage-ukiran-corner" style={positions[position]}>
      <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full" style={{ transform: transforms[position] }}>
        {/* Javanese ukiran corner motif */}
        <path d="M0 0 L15 0 Q12 8 0 10 Z" stroke="#D1C5B8" strokeWidth="0.6" fill="#C4A97A" fillOpacity="0.06" opacity="0.5" />
        <path d="M0 0 L0 15 Q8 12 10 0 Z" stroke="#D1C5B8" strokeWidth="0.6" fill="#C4A97A" fillOpacity="0.06" opacity="0.5" />
        <path d="M3 3 L12 3 Q10 8 3 9 Z" stroke="#D1C5B8" strokeWidth="0.3" fill="none" opacity="0.3" />
        <circle cx="6" cy="6" r="1" fill="#C4A97A" opacity="0.3" />
      </svg>
    </div>
  );
}

/* ===== Wayang Section Separator — enhanced version for between sections ===== */
export function WayangSectionSeparator() {
  return (
    <div className="heritage-section-separator py-4">
      <svg width="240" height="32" viewBox="0 0 240 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-38">
        {/* Left taper */}
        <path d="M0 16 L20 16" stroke="#D1C5B8" strokeWidth="0.3" opacity="0.3" />
        {/* Left wave — wayang-inspired curves */}
        <path
          d="M20 16 Q28 8 36 16 Q44 24 52 16 Q60 8 68 16 Q76 24 84 16"
          stroke="#D1C5B8"
          strokeWidth="0.8"
          fill="none"
          opacity="0.5"
        />
        {/* Left diamond */}
        <path d="M84 16 L92 10 L100 16 L92 22 Z" stroke="#C4A97A" strokeWidth="0.6" fill="#C4A97A" fillOpacity="0.08" opacity="0.6" />
        {/* Center kayon motif */}
        <path d="M108 8 L120 4 L120 28 L108 24 Z" stroke="#D1C5B8" strokeWidth="0.7" fill="#C4A97A" fillOpacity="0.06" opacity="0.5" />
        <path d="M132 8 L120 4 L120 28 L132 24 Z" stroke="#D1C5B8" strokeWidth="0.7" fill="#C4A97A" fillOpacity="0.06" opacity="0.5" />
        <circle cx="120" cy="16" r="3" fill="#C4A97A" opacity="0.4" />
        {/* Right diamond */}
        <path d="M140 16 L148 10 L156 16 L148 22 Z" stroke="#C4A97A" strokeWidth="0.6" fill="#C4A97A" fillOpacity="0.08" opacity="0.6" />
        {/* Right wave */}
        <path
          d="M156 16 Q164 8 172 16 Q180 24 188 16 Q196 8 204 16 Q212 24 220 16"
          stroke="#D1C5B8"
          strokeWidth="0.8"
          fill="none"
          opacity="0.5"
        />
        {/* Right taper */}
        <path d="M220 16 L240 16" stroke="#D1C5B8" strokeWidth="0.3" opacity="0.3" />
        {/* Accent dots */}
        <circle cx="52" cy="16" r="1.2" fill="#D1C5B8" opacity="0.25" />
        <circle cx="188" cy="16" r="1.2" fill="#D1C5B8" opacity="0.25" />
        <circle cx="36" cy="16" r="0.8" fill="#D1C5B8" opacity="0.15" />
        <circle cx="204" cy="16" r="0.8" fill="#D1C5B8" opacity="0.15" />
      </svg>
    </div>
  );
}
