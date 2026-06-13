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
        width={280}
        height={400}
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "auto",
          height: 400,
          maxHeight: 400,
          objectFit: "contain",
          objectPosition: "bottom",
        }}
        priority
      />

      {/* Bride — right side, same height as groom */}
      <Image
        src="/bride.png"
        alt="Bride"
        width={280}
        height={400}
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: "auto",
          height: 400,
          maxHeight: 400,
          objectFit: "contain",
          objectPosition: "bottom",
        }}
        priority
      />
    </section>
  );
}
