"use client";

import React, { useState } from "react";
import { useHeritageEntrance } from "./useHeritageEntrance";

interface Ucapan {
  nama: string;
  isi: string;
  waktu: string;
}

interface HeritageRSVPProps {
  ucapanList: Ucapan[];
}

export function HeritageRSVP({ ucapanList }: HeritageRSVPProps) {
  const { ref, visible } = useHeritageEntrance();
  const [nama, setNama] = useState("");
  const [isi, setIsi] = useState("");
  const [messages, setMessages] = useState<Ucapan[]>(ucapanList);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim() || !isi.trim()) return;
    const newMsg: Ucapan = {
      nama: nama.trim(),
      isi: isi.trim(),
      waktu: "Baru saja",
    };
    setMessages([newMsg, ...messages]);
    setNama("");
    setIsi("");
  };

  return (
    <section ref={ref} className="heritage-section relative overflow-hidden" style={{ minHeight: "80vh" }}>
      {/* Title */}
      <div className={`heritage-entrance relative z-10 mb-8 text-center ${visible ? "visible" : ""}`}>
        <p
          className="mb-3 font-serif text-xs tracking-[0.3em] uppercase text-heritage-dark-soft/60 md:text-sm"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Ruang Ucapan
        </p>
        <p
          className="font-serif text-sm font-light italic text-heritage-dark-soft/50 md:text-base"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Sebuah ruang kecil untuk menitipkan doa terbaik
        </p>
        <div className="heritage-divider mt-3">
          <span className="heritage-divider-line" />
          <span className="heritage-divider-dot" />
          <span className="heritage-divider-line" />
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className={`heritage-entrance heritage-card relative z-10 mb-8 w-full max-w-sm px-6 py-6 md:px-8 md:py-8 ${visible ? "visible" : ""}`}
        style={{ transitionDelay: "0.2s" }}
      >
        <div className="mb-4">
          <label className="mb-1.5 block font-serif text-xs tracking-wider text-heritage-dark-soft/60 md:text-sm" style={{ fontFamily: "var(--font-cormorant)" }}>
            Nama
          </label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Nama Anda"
            className="w-full rounded-xl border border-heritage-beige/50 bg-heritage-white/70 px-4 py-2.5 font-serif text-sm text-heritage-dark placeholder-heritage-dark-soft/35 outline-none transition-all focus:border-heritage-gold/45 focus:bg-heritage-white/90 md:text-base"
            style={{ fontFamily: "var(--font-cormorant)" }}
          />
        </div>
        <div className="mb-5">
          <label className="mb-1.5 block font-serif text-xs tracking-wider text-heritage-dark-soft/60 md:text-sm" style={{ fontFamily: "var(--font-cormorant)" }}>
            Ucapan & Doa
          </label>
          <textarea
            value={isi}
            onChange={(e) => setIsi(e.target.value)}
            placeholder="Tuliskan doa dan harapan Anda..."
            rows={4}
            className="w-full resize-none rounded-xl border border-heritage-beige/50 bg-heritage-white/70 px-4 py-2.5 font-serif text-sm leading-relaxed text-heritage-dark placeholder-heritage-dark-soft/35 outline-none transition-all focus:border-heritage-gold/45 focus:bg-heritage-white/90 md:text-base"
            style={{ fontFamily: "var(--font-cormorant)" }}
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-xl border border-heritage-dark-soft/25 bg-heritage-white/80 px-6 py-2.5 font-serif text-sm tracking-widest text-heritage-dark-soft transition-all hover:border-heritage-gold/45 hover:bg-heritage-beige/50 hover:tracking-[0.2em] md:text-base"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Kirim Doa
        </button>
      </form>

      {/* Messages list */}
      <div className="relative z-10 w-full max-w-sm space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`heritage-entrance heritage-card px-5 py-4 ${visible ? "visible" : ""}`}
            style={{ transitionDelay: `${0.3 + i * 0.1}s` }}
          >
            <div className="mb-1.5 flex items-center justify-between">
              <span
                className="font-serif text-sm font-medium tracking-wide text-heritage-dark md:text-base"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {msg.nama}
              </span>
              <span className="text-[10px] text-heritage-dark-soft/40 md:text-xs">{msg.waktu}</span>
            </div>
            <p
              className="font-serif text-sm font-light leading-relaxed text-heritage-dark-soft/70 md:text-base"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {msg.isi}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
