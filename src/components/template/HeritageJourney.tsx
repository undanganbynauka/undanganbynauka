"use client";

import React from "react";
import Image from "next/image";
import { useHeritageEntrance } from "./useHeritageEntrance";

interface HeritageJourneyProps {
  kalimat1: string;
  kalimat2: string;
  kalimat3: string;
}

export function HeritageJourney({ kalimat1, kalimat2, kalimat3 }: HeritageJourneyProps) {
  const { ref, visible } = useHeritageEntrance();

  return (
    <section ref={ref} className="heritage-section relative overflow-hidden">
      {/* Illustration — journey scene */}
      <div className={`heritage-entrance relative z-10 mb-10 w-full max-w-md ${visible ? "visible" : ""}`}>
        <div className="heritage-card mx-auto overflow-hidden px-5 pb-5 pt-5 md:px-6 md:pb-6 md:pt-6">
          <div className="relative mx-auto aspect-[4/3] w-full">
            <Image
              src="/template/characters/journey-scene.png"
              alt="Perjalanan mempelai"
              fill
              sizes="(max-width: 768px) 100vw, 448px"
              className="object-contain rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Story text */}
      <div className="relative z-10 flex max-w-md flex-col items-center gap-6 text-center">
        <p
          className={`heritage-entrance font-serif text-base font-light leading-loose tracking-wide text-heritage-dark-soft/80 md:text-lg ${visible ? "visible" : ""}`}
          style={{ fontFamily: "var(--font-cormorant)", transitionDelay: "0.2s" }}
        >
          {kalimat1}
        </p>

        <div
          className={`heritage-entrance heritage-divider ${visible ? "visible" : ""}`}
          style={{ transitionDelay: "0.35s" }}
        >
          <span className="heritage-divider-line" />
          <span className="heritage-divider-dot" />
          <span className="heritage-divider-line" />
        </div>

        <p
          className={`heritage-entrance font-serif text-base font-light leading-loose tracking-wide text-heritage-dark-soft/80 md:text-lg ${visible ? "visible" : ""}`}
          style={{ fontFamily: "var(--font-cormorant)", transitionDelay: "0.5s" }}
        >
          {kalimat2}
        </p>

        <div
          className={`heritage-entrance heritage-divider ${visible ? "visible" : ""}`}
          style={{ transitionDelay: "0.65s" }}
        >
          <span className="heritage-divider-line" />
          <span className="heritage-divider-dot" />
          <span className="heritage-divider-line" />
        </div>

        <p
          className={`heritage-entrance font-serif text-base font-light leading-loose tracking-wide text-heritage-dark-soft/80 md:text-lg ${visible ? "visible" : ""}`}
          style={{ fontFamily: "var(--font-cormorant)", transitionDelay: "0.8s" }}
        >
          {kalimat3}
        </p>
      </div>
    </section>
  );
}
