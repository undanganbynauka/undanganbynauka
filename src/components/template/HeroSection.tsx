"use client";

import React from "react";
import Image from "next/image";

export function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: "#F8F4EE",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Groom — left side */}
      <Image
        src="/groom.png"
        alt="Groom"
        width={420}
        height={600}
        style={{
          position: "absolute",
          left: -80,
          bottom: 0,
          width: 420,
          height: "auto",
          maxWidth: 420,
          objectFit: "contain",
          objectPosition: "bottom",
        }}
        priority
      />

      {/* Bride — right side */}
      <Image
        src="/bride.png"
        alt="Bride"
        width={420}
        height={600}
        style={{
          position: "absolute",
          right: -80,
          bottom: 0,
          width: 420,
          height: "auto",
          maxWidth: 420,
          objectFit: "contain",
          objectPosition: "bottom",
        }}
        priority
      />
    </section>
  );
}
