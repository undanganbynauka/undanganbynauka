"use client";

import React from "react";
import { useHeritageEntrance } from "./useHeritageEntrance";

export function HeritageIntroMempelai() {
  const { ref, visible } = useHeritageEntrance(0.25);

  return (
    <section ref={ref} className="heritage-section heritage-intro-section">
      <div className="heritage-intro-inner relative z-10 mx-auto max-w-xl">

        {/* ====== BISMILLAH ====== */}
        <div
          className={`heritage-fade-line text-center ${visible ? "visible" : ""}`}
          style={{ transitionDelay: "0.3s" }}
        >
          <p
            className="font-serif text-base tracking-wide text-heritage-gold md:text-lg"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Bismillahirrahmanirrahim
          </p>
        </div>

        {/* ====== OPENING SENTENCE ====== */}
        <div
          className={`heritage-fade-line text-center mt-6 ${visible ? "visible" : ""}`}
          style={{ transitionDelay: "0.6s" }}
        >
          <p
            className="font-serif text-sm font-light leading-[2.2] tracking-wide text-heritage-dark md:text-base md:leading-[2.4]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Dengan penuh rasa syukur kepada Allah Ta&apos;ala,
          </p>
          <p
            className="font-serif text-sm font-light leading-[2.2] tracking-wide text-heritage-dark md:text-base md:leading-[2.4]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            kami memohon doa restu atas pernikahan kami:
          </p>
        </div>

        {/* ====== BORDER BOX — same style as akad/resepsi cards ====== */}
        <div
          className={`heritage-fade-line heritage-intro-border-box mt-10 ${visible ? "visible" : ""}`}
          style={{ transitionDelay: "1s" }}
        >

          {/* ====== MEMPELAI — Pria ====== */}
          <div className="heritage-mempelai-block">
            {/* Karakter ilustrasi pria */}
            <div className="heritage-character-wrap">
              <img
                src="/template/character-male.png"
                alt=""
                className="heritage-character-img"
                draggable={false}
              />
            </div>

            {/* Nama mempelai pria */}
            <h2
              className="heritage-mempelai-name"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Bagus Suhada
            </h2>
            <p
              className="heritage-mempelai-parent"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Putra ke-3 dari Bapak Ahmad &amp; Ibu Sulistianingsih
            </p>
          </div>

          {/* ====== AMPERSAND DIVIDER ====== */}
          <div className="heritage-ampersand">
            <span className="heritage-divider-line" />
            <span className="heritage-ampersand-sign">&amp;</span>
            <span className="heritage-divider-line" />
          </div>

          {/* ====== MEMPELAI — Wanita ====== */}
          <div className="heritage-mempelai-block">
            {/* Karakter ilustrasi wanita */}
            <div className="heritage-character-wrap">
              <img
                src="/template/character-female.png"
                alt=""
                className="heritage-character-img"
                draggable={false}
              />
            </div>

            {/* Nama mempelai wanita */}
            <h2
              className="heritage-mempelai-name"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Anisa Fitria
            </h2>
            <p
              className="heritage-mempelai-parent"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Putri pertama dari Bapak Hendri &amp; Ibu Yunita
            </p>
          </div>

        </div>
        {/* ====== END BORDER BOX ====== */}

      </div>
    </section>
  );
}
