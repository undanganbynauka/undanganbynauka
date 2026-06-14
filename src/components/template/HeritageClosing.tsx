"use client";

import React from "react";
import { useHeritageEntrance } from "./useHeritageEntrance";

interface HeritageClosingProps {
  namaWanita: string;
  namaPria: string;
}

export function HeritageClosing({ namaWanita, namaPria }: HeritageClosingProps) {
  const { ref, visible } = useHeritageEntrance();

  return (
    <section ref={ref} className="heritage-section relative overflow-hidden" style={{ minHeight: "60vh" }}>
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Thank you text */}
        <p
          className={`heritage-entrance font-serif text-base font-light leading-loose tracking-wide text-heritage-dark-soft/60 md:text-lg ${visible ? "visible" : ""}`}
          style={{ fontFamily: "var(--font-cormorant)", transitionDelay: "0.15s" }}
        >
          Merupakan suatu kehormatan dan kebahagiaan
          <br />
          apabila Bapak/Ibu/Saudara/i berkenan hadir
          <br />
          memberikan doa restu kepada kami.
        </p>

        <div className={`heritage-entrance heritage-divider my-6 ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.3s" }}>
          <span className="heritage-divider-line" />
          <span className="heritage-divider-dot" />
          <span className="heritage-divider-line" />
        </div>

        {/* Names */}
        <div className={`heritage-entrance ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.45s" }}>
          <h2
            className="font-serif text-2xl font-light tracking-wide text-heritage-dark md:text-3xl"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {namaWanita}
          </h2>
          <p className="my-2 font-serif text-lg text-heritage-gold-soft md:text-xl" style={{ fontFamily: "var(--font-cormorant)" }}>&amp;</p>
          <h2
            className="font-serif text-2xl font-light tracking-wide text-heritage-dark md:text-3xl"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {namaPria}
          </h2>
        </div>

        {/* Watermark */}
        <p
          className={`heritage-entrance mt-12 font-serif text-[10px] tracking-[0.2em] text-heritage-dark-soft/30 md:text-xs ${visible ? "visible" : ""}`}
          style={{ fontFamily: "var(--font-cormorant)", transitionDelay: "0.75s" }}
        >
          undangan by NAUKA
        </p>
      </div>
    </section>
  );
}
