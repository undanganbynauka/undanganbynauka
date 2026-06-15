"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const WA_NUMBER = "6289655592925";
const WA_TEXT = encodeURIComponent("Halo Nauka, saya tertarik dengan undangan digital 🤍");
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`;

export function NaukaCTA() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative bg-[#070707] px-6 py-24 md:py-32"
    >
      {/* Subtle gold glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: visible
            ? "radial-gradient(ellipse 40% 30% at 50% 50%, rgba(201,169,110,0.04) 0%, transparent 70%)"
            : "none",
          transition: "background 1.5s ease",
        }}
      />

      <div
        className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <h2
          className="nauka-shimmer mb-4 text-2xl tracking-[0.15em] md:text-3xl lg:text-4xl"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Siap Menghadirkan Momen?
        </h2>
        <p className="mb-10 text-sm leading-relaxed text-[#8a8578] md:text-base">
          Hubungi kami dan wujudkan undangan impianmu.
        </p>

        {/* WhatsApp CTA — glow pulse */}
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="nauka-cta-glow group inline-flex items-center gap-3 rounded-full border border-[#c9a96e]/25 bg-[#c9a96e]/5 px-8 py-4 transition-all duration-500 hover:border-[#c9a96e]/40 hover:bg-[#c9a96e]/10 hover:shadow-[0_0_50px_rgba(201,169,110,0.1)]"
        >
          {/* WhatsApp icon — wiggle on hover */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="#c9a96e"
            className="transition-transform duration-500 group-hover:animate-[nauka-icon-wiggle_0.5s_ease-in-out]"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span
            className="text-base tracking-[0.15em] text-[#c9a96e] transition-all duration-500 group-hover:tracking-[0.2em]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Konsultasi via WhatsApp
          </span>
        </a>
      </div>

      {/* Footer */}
      <footer
        className="relative z-10 mx-auto mt-24 max-w-2xl border-t border-[#1a1a1a] pt-8"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.8s ease 0.4s",
        }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="nauka-glow-pulse relative h-8 w-20">
            <Image
              src="/nauka-logo-new.png"
              alt="Nauka"
              fill
              sizes="80px"
              className="object-contain"
              style={{ filter: "brightness(0) invert(1)", opacity: 0.4 }}
            />
          </div>
          <p className="nauka-breathe text-[10px] tracking-[0.2em] uppercase text-[#8a8578]/40">
            Undangan by Nauka
          </p>
        </div>
      </footer>
    </section>
  );
}
