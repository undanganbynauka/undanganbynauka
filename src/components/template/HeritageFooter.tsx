"use client";

import React from "react";
import { useHeritageEntrance } from "./useHeritageEntrance";

interface HeritageFooterProps {
  bride?: string;
  groom?: string;
}

export function HeritageFooter({
  bride = "Nadia",
  groom = "Rizky",
}: HeritageFooterProps) {
  const { ref, visible } = useHeritageEntrance();

  return (
    <section
      ref={ref}
      className="heritage-section heritage-footer-section relative"
    >
      <div
        className={`heritage-entrance relative z-10 mx-auto w-full max-w-md text-center ${
          visible ? "visible" : ""
        }`}
      >
        {/* Thank you message */}
        <p
          className="heritage-footer-thanks mb-2"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Terima Kasih
        </p>
        <p className="heritage-footer-message mb-6">
          Atas doa dan restu yang diberikan
        </p>

        {/* Names */}
        <div className="heritage-footer-names">
          <span
            className="heritage-footer-name"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {bride}
          </span>
          <span className="heritage-footer-amp">&</span>
          <span
            className="heritage-footer-name"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {groom}
          </span>
        </div>

        {/* Credit */}
        <p className="heritage-footer-credit mt-10">
          Made with Nauka
        </p>
      </div>
    </section>
  );
}
