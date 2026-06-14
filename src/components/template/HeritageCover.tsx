"use client";

import React from "react";
import { MailOpen } from "lucide-react";

interface HeritageCoverProps {
  namaPria: string;
  namaWanita: string;
  namaTamu?: string;
  onOpen: () => void;
}

export function HeritageCover({
  namaPria,
  namaWanita,
  namaTamu = "Nama tamu",
  onOpen,
}: HeritageCoverProps) {
  return (
    <section className="heritage-cover-root">
      {/* 1. ORNAMENT — wayang (canonical position 1, no delay) */}
      <div className="heritage-wayang-wrap">
        <img
          src="/template/wayang-kayon.png"
          alt="Wayang Kayon"
          className="heritage-wayang-img"
          draggable={false}
        />
      </div>

      <div className="heritage-cover-text">
        {/* 2. TITLE — "The Wedding Of" (canonical position 2, 200ms delay) */}
        <div className="animate-heritage-reveal-delay-1 text-center">
          <p
            className="font-serif text-[11px] tracking-[0.25em] uppercase text-heritage-gold/60 md:text-[13px]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            The wedding of
          </p>
        </div>

        {/* 3. NAMES — bride & groom (canonical position 3, 450ms delay) */}
        <div className="animate-heritage-reveal-delay-2 text-center mt-2">
          <h1
            className="font-serif text-2xl font-light leading-tight tracking-wide text-heritage-gold/90 md:text-3xl lg:text-4xl"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {namaPria} <span className="text-heritage-gold-soft">&amp;</span>{" "}
            {namaWanita}
          </h1>
        </div>

        {/* 4. GUEST NAME (canonical position 4, 700ms delay) */}
        <div className="animate-heritage-reveal-delay-3 mt-5 text-center">
          <p
            className="font-serif text-[10px] tracking-wide text-heritage-gold/50 md:text-xs"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Kepada Bapak/Ibu/Saudara/i
          </p>
          <p
            className="font-serif text-sm tracking-wide text-heritage-gold mt-1 md:text-base"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {namaTamu}
          </p>
        </div>

        {/* 5. PRIMARY CTA (canonical position 5, 950ms delay) */}
        <div className="animate-heritage-reveal-delay-4 mt-7 text-center">
          <button
            type="button"
            onClick={onOpen}
            className="group inline-flex items-center gap-2.5 rounded-full border border-heritage-gold/50 px-7 py-3 font-serif text-[13px] tracking-wider text-heritage-gold/90 transition-all duration-500 hover:border-heritage-gold/70 hover:bg-heritage-gold/10 active:scale-95 md:text-sm"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            <MailOpen
              className="h-4 w-4 transition-transform duration-500 group-hover:scale-110"
              strokeWidth={1.8}
            />
            Buka Undangan
          </button>
        </div>
      </div>
    </section>
  );
}
