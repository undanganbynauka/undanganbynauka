"use client";

import React, { useState } from "react";
import { WA_INQUIRY_LINK } from "@/lib/whatsapp";

/**
 * NaukaWhatsAppFloat — Floating WhatsApp button
 *
 * Design principles:
 * - DISABLED by default (set `enabled` to true to activate)
 * - Bottom right, small, low opacity
 * - Monochrome style (bukan WhatsApp green default)
 * - No pulse / no animation
 * - Quiet support system feel: "available if needed"
 */

const ENABLED = false; // ← Set to true to activate floating WA button

export function NaukaWhatsAppFloat() {
  const [hovered, setHovered] = useState(false);

  if (!ENABLED) return null;

  return (
    <a
      href={WA_INQUIRY_LINK}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 50,
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.10)",
        background: hovered ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: hovered ? 0.7 : 0.4,
        transition: "opacity 0.3s ease, background 0.3s ease, border-color 0.3s ease",
        textDecoration: "none",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        setHovered(true);
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.20)";
      }}
      onMouseLeave={(e) => {
        setHovered(false);
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
      }}
      aria-label="Hubungi via WhatsApp"
    >
      {/* Monochrome chat icon — not WhatsApp green */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    </a>
  );
}
