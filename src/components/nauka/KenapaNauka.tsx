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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="nauka-canvas relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 md:py-32"
    >
      {/* Floating blur shapes */}
      <div className="nauka-blob-2 animate-nauka-float-slow -top-10 left-1/4" />
      <div className="nauka-blob-3 animate-nauka-float bottom-1/4 -right-10" />

      {/* Section label */}
      <span
        className={`mb-16 font-serif text-sm tracking-[0.3em] uppercase text-nauka-warm-400 transition-all duration-1000 md:text-base ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        Kenapa Nauka
      </span>

      {/* Quotes */}
      <div className="relative z-10 flex max-w-2xl flex-col items-center gap-16 text-center">
        <p
          className={`font-serif text-xl font-light leading-loose tracking-wide text-nauka-warm-600 transition-all duration-1000 md:text-2xl lg:text-3xl ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{ fontFamily: "var(--font-cormorant)", transitionDelay: "0.2s" }}
        >
          Nauka lahir dari ruang kecil yang ingin
          <br />
          menjaga setiap momen tetap sederhana,
          <br />
          tenang, dan bermakna.
        </p>

        <p
          className={`font-serif text-xl font-light leading-loose tracking-wide text-nauka-warm-600 transition-all duration-1000 md:text-2xl lg:text-3xl ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{ fontFamily: "var(--font-cormorant)", transitionDelay: "0.5s" }}
        >
          Bukan untuk membuat undangan yang ramai,
          <br />
          tapi untuk menghadirkan ruang yang cukup
          <br />
          bagi sebuah pertemuan.
        </p>

        <p
          className={`font-serif text-xl font-light leading-loose tracking-wide text-nauka-warm-600 transition-all duration-1000 md:text-2xl lg:text-3xl ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{ fontFamily: "var(--font-cormorant)", transitionDelay: "0.8s" }}
        >
          Karena setiap momen tidak selalu perlu
          <br />
          banyak kata—cukup dijaga dengan perlahan.
        </p>
      </div>

      {/* Bottom decorative line */}
      <div
        className={`mt-20 flex items-center gap-3 transition-all duration-1000 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
        style={{ transitionDelay: "1.1s" }}
      >
        <span className="h-px w-12 bg-nauka-gold/20 md:w-16" />
        <span className="h-1 w-1 rounded-full bg-nauka-gold/30" />
        <span className="h-px w-12 bg-nauka-gold/20 md:w-16" />
      </div>
    </section>
  );
}
