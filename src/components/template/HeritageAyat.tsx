"use client";

import React from "react";
import { useHeritageEntrance } from "./useHeritageEntrance";

interface HeritageAyatProps {
  arabic?: string;
  translation?: string;
  source?: string;
}

export function HeritageAyat({
  arabic = "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
  translation = "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan dari jenismu sendiri, supaya kamu merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.",
  source = "QS. Ar-Rum: 21",
}: HeritageAyatProps) {
  const { ref, visible } = useHeritageEntrance();

  return (
    <section
      ref={ref}
      className="heritage-section heritage-ayat-section relative"
    >
      <div
        className={`heritage-entrance heritage-ayat-frame relative z-10 mx-auto max-w-[32rem] ${
          visible ? "visible" : ""
        }`}
      >
        <div className="heritage-card px-8 py-8 md:px-10 md:py-10">
          {/* Arabic text */}
          <p className="heritage-ayat-arabic mb-6">{arabic}</p>

          {/* Divider */}
          <div className="heritage-divider mb-6">
            <span className="heritage-divider-dot" />
            <span className="heritage-divider-line" />
            <span className="heritage-divider-dot" />
          </div>

          {/* Translation */}
          <p className="heritage-ayat-translation mb-4">{translation}</p>

          {/* Source */}
          <p
            className="heritage-ayat-source"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            — {source}
          </p>
        </div>
      </div>
    </section>
  );
}
