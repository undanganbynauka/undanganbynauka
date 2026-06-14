"use client";

import React from "react";
import { useHeritageEntrance } from "./useHeritageEntrance";

interface AdabItem {
  icon: string;
  text: string;
}

interface HeritageAdabAcaraProps {
  jalur: "universal" | "syari";
}

const adabUniversal: AdabItem[] = [
  { icon: "🕰️", text: "Hadir sesuai waktu yang telah ditentukan." },
  { icon: "🤝", text: "Menjaga kenyamanan dan ketertiban selama acara berlangsung." },
  { icon: "📵", text: "Menggunakan ponsel seperlunya agar tetap khidmat." },
  { icon: "💌", text: "Menyampaikan doa dan harapan baik untuk kedua mempelai." },
  { icon: "🤍", text: "Terima kasih atas perhatian dan kerja sama yang diberikan." },
];

const adabSyari: AdabItem[] = [
  { icon: "🕰️", text: "Hadir sesuai waktu yang telah ditentukan." },
  { icon: "🌿", text: "Menjaga adab dan ketertiban selama acara berlangsung." },
  { icon: "📵", text: "Menggunakan ponsel seperlunya selama acara." },
  { icon: "🤲", text: "Mendoakan keberkahan bagi kedua mempelai." },
  { icon: "🤍", text: "Jazakumullahu khayran atas doa dan perhatian yang diberikan." },
];

export function HeritageAdabAcara({ jalur }: HeritageAdabAcaraProps) {
  const { ref, visible } = useHeritageEntrance();
  const items = jalur === "syari" ? adabSyari : adabUniversal;

  return (
    <section ref={ref} className="heritage-section relative overflow-hidden" style={{ minHeight: "70vh" }}>
      {/* Title */}
      <div className={`heritage-entrance relative z-10 mb-10 text-center ${visible ? "visible" : ""}`}>
        <p
          className="mb-3 font-serif text-xs tracking-[0.3em] uppercase text-heritage-dark-soft/60 md:text-sm"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Adab Acara
        </p>
        <div className="heritage-divider">
          <span className="heritage-divider-line" />
          <span className="heritage-divider-dot" />
          <span className="heritage-divider-line" />
        </div>
      </div>

      {/* Philosophy quote */}
      <p
        className={`heritage-entrance relative z-10 mb-8 text-center font-serif text-sm font-light italic leading-relaxed text-heritage-dark-soft/50 md:text-base ${visible ? "visible" : ""}`}
        style={{ fontFamily: "var(--font-cormorant)", transitionDelay: "0.15s" }}
      >
        Adab bukan untuk mengatur tamu,
        <br />
        tapi pengingat lembut agar momen tetap terjaga.
      </p>

      {/* Adab list */}
      <div className="relative z-10 w-full max-w-sm space-y-4">
        {items.map((item, i) => (
          <div
            key={i}
            className={`heritage-entrance heritage-card flex items-start gap-4 px-5 py-4 ${visible ? "visible" : ""}`}
            style={{ transitionDelay: `${0.2 + i * 0.1}s` }}
          >
            <span className="mt-0.5 text-base md:text-lg">{item.icon}</span>
            <p
              className="font-serif text-sm font-light leading-relaxed text-heritage-dark-soft/80 md:text-base"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
