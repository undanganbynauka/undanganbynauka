"use client";

import React, { useEffect, useRef, useState } from "react";

export function KenapaNauka() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="kenapa-nauka"
      ref={sectionRef}
      className="nauka-canvas relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 md:py-32"
    >
      {/* Floating blur shapes */}
      <div className="nauka-blob-2 animate-nauka-float-slow -top-10 left-1/4" />
      <div className="nauka-blob-3 animate-nauka-float bottom-1/4 -right-10" />

      {/* Section label */}
      <span
        className={`mb-20 font-serif text-2xl tracking-[0.2em] text-nauka-warm-400 transition-all duration-1000 md:text-3xl ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        Kenapa Nauka
      </span>

      {/* Quotes */}
      <div className="relative z-10 flex max-w-xl flex-col items-center gap-14 text-center">
        <p
          className={`font-serif text-base font-light leading-loose tracking-wide text-nauka-warm-500 transition-all duration-1000 md:text-lg lg:text-xl ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ fontFamily: "var(--font-cormorant)", transitionDelay: "0.3s" }}
        >
          Nauka lahir dari ruang kecil yang ingin
          menjaga setiap momen tetap sederhana,
          tenang, dan bermakna.
        </p>

        <p
          className={`font-serif text-base font-light leading-loose tracking-wide text-nauka-warm-500 transition-all duration-1000 md:text-lg lg:text-xl ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ fontFamily: "var(--font-cormorant)", transitionDelay: "0.6s" }}
        >
          Bukan untuk membuat undangan yang ramai,
          tapi untuk menghadirkan ruang yang cukup
          bagi sebuah pertemuan.
        </p>

        <p
          className={`font-serif text-base font-light leading-loose tracking-wide text-nauka-warm-500 transition-all duration-1000 md:text-lg lg:text-xl ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ fontFamily: "var(--font-cormorant)", transitionDelay: "0.9s" }}
        >
          Karena setiap momen tidak selalu perlu
          banyak kata—cukup dijaga dengan perlahan.
        </p>
      </div>

      {/* Bottom decorative line */}
      <div
        className={`mt-20 flex items-center gap-3 transition-all duration-1000 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
        style={{ transitionDelay: "1.2s" }}
      >
        <span className="h-px w-12 bg-nauka-gold/20 md:w-16" />
        <span className="h-1 w-1 rounded-full bg-nauka-gold/30" />
        <span className="h-px w-12 bg-nauka-gold/20 md:w-16" />
      </div>
    </section>
  );
}
