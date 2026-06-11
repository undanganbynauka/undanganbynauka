"use client";

import React, { useEffect, useRef, useState } from "react";

interface KenapaNaukaProps {
  visible?: boolean;
}

export function KenapaNauka({ visible: forceVisible }: KenapaNaukaProps) {
  const [scrolledVisible, setScrolledVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setScrolledVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const visible = forceVisible ?? scrolledVisible;

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
        className={`mb-10 font-serif text-2xl tracking-[0.2em] text-nauka-warm-400 transition-all duration-1000 md:mb-12 md:text-3xl lg:text-4xl ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        Kenapa Nauka
      </span>

      {/* Quotes with ornaments */}
      <div className="relative z-10 flex max-w-lg flex-col items-center gap-0 text-center">
        {/* Paragraph 1 */}
        <div
          className={`flex flex-col items-center gap-5 transition-all duration-1000 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: "0.2s" }}
        >
          <p
            className="font-serif text-base font-light leading-loose tracking-wide text-nauka-warm-500 md:text-lg lg:text-xl"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Nauka lahir dari ruang kecil yang ingin
            menjaga setiap momen tetap sederhana,
            tenang, dan bermakna.
          </p>
          {/* Ornament line */}
          <div className="flex items-center gap-2 py-4">
            <span className="h-px w-6 bg-nauka-gold/15 md:w-8" />
            <span className="h-0.5 w-0.5 rounded-full bg-nauka-gold/25" />
            <span className="h-px w-6 bg-nauka-gold/15 md:w-8" />
          </div>
        </div>

        {/* Paragraph 2 */}
        <div
          className={`flex flex-col items-center gap-5 transition-all duration-1000 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: "0.5s" }}
        >
          <p
            className="font-serif text-base font-light leading-loose tracking-wide text-nauka-warm-500 md:text-lg lg:text-xl"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Bukan untuk membuat undangan yang ramai,
            tapi untuk menghadirkan ruang yang cukup
            bagi sebuah pertemuan.
          </p>
          {/* Ornament line */}
          <div className="flex items-center gap-2 py-4">
            <span className="h-px w-6 bg-nauka-gold/15 md:w-8" />
            <span className="h-0.5 w-0.5 rounded-full bg-nauka-gold/25" />
            <span className="h-px w-6 bg-nauka-gold/15 md:w-8" />
          </div>
        </div>

        {/* Paragraph 3 */}
        <div
          className={`flex flex-col items-center gap-5 transition-all duration-1000 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: "0.8s" }}
        >
          <p
            className="font-serif text-base font-light leading-loose tracking-wide text-nauka-warm-500 md:text-lg lg:text-xl"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Karena setiap momen tidak selalu perlu
            banyak kata—cukup dijaga dengan perlahan.
          </p>
        </div>
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
