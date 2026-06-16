"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Template {
  id: string;
  name: string;
  collection: string;
  href: string;
  preview: string;
  video?: string;
}

const syariTemplates: Template[] = [
  {
    id: "sacred",
    name: "Sacred",
    collection: "Syar'i",
    href: "/detail/sacred",
    preview: "/etalase/sacred-preview.png",
  },
];

const universalTemplates: Template[] = [
  {
    id: "celestial",
    name: "Celestial",
    collection: "Universal",
    href: "/detail/celestial",
    preview: "/etalase/celestial-preview.png",
    video: "/etalase/celestial-preview.mp4",
  },
  // Heritage disimpan dulu — akan digunakan untuk template ke-3
  // {
  //   id: "heritage",
  //   name: "Heritage",
  //   collection: "Universal",
  //   href: "/detail/heritage",
  //   preview: "/etalase/heritage-preview.png",
  // },
];

function EtalaseCard({ tpl, delay }: { tpl: Template; delay: number }) {
  const [inView, setInView] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (videoRef.current && tpl.video) {
      if (inView) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [inView, tpl.video]);

  return (
    <Link href={tpl.href} className="block" style={{ textDecoration: "none" }}>
      <div
        ref={cardRef}
        style={{
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.06)",
          overflow: "hidden",
          background: "rgba(255,255,255,0.015)",
          transition: "border-color 0.3s ease-out, transform 0.3s ease-out",
          cursor: "pointer",
          opacity: 0,
          transform: "translateY(20px)",
          animation: `nauka-fade-up 1.3s ease-out ${delay}s both`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {/* Preview */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "9 / 16",
            overflow: "hidden",
            background: "#0B1120",
          }}
        >
          {tpl.video ? (
            <>
              <Image
                src={tpl.preview}
                alt={`${tpl.name} preview`}
                fill
                sizes="(max-width: 768px) 48vw, 30vw"
                className="object-cover"
                style={{ opacity: inView ? 0 : 0.85, transition: "opacity 0.5s ease" }}
              />
              <video
                ref={videoRef}
                src={tpl.video}
                muted
                loop
                playsInline
                preload="auto"
                poster={tpl.preview}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: inView ? 0.85 : 0,
                  transition: "opacity 0.5s ease",
                }}
              />
            </>
          ) : (
            <Image
              src={tpl.preview}
              alt={`${tpl.name} preview`}
              fill
              sizes="(max-width: 768px) 48vw, 30vw"
              className="object-cover"
              style={{ opacity: 0.85 }}
            />
          )}

          {/* Gradient overlay at bottom */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0"
            style={{
              height: "40%",
              background: "linear-gradient(to top, rgba(11,17,32,0.7) 0%, transparent 100%)",
            }}
          />
        </div>

        {/* Info bar */}
        <div
          style={{
            padding: "12px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "var(--font-bodoni)",
                fontSize: "14px",
                fontWeight: 400,
                letterSpacing: "0.04em",
                color: "rgba(255,255,255,0.70)",
                display: "block",
              }}
            >
              {tpl.name}
            </span>
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "9px",
                fontWeight: 400,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.28)",
                display: "block",
                marginTop: "2px",
              }}
            >
              {tpl.collection} · 75rb – 99rb
            </span>
          </div>
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "10px",
              fontWeight: 400,
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            Demo →
          </span>
        </div>
      </div>
    </Link>
  );
}

function EtalaseSection({
  id,
  collectionLabel,
  collectionSubtext,
  templates,
}: {
  id: string;
  collectionLabel: string;
  collectionSubtext: string;
  templates: Template[];
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className="nauka-grain relative"
      style={{
        background: "linear-gradient(180deg, #0B1120 0%, #111827 100%)",
        padding: "72px 24px",
      }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: visible
            ? "linear-gradient(180deg, rgba(201,169,110,0.02) 0%, transparent 30%)"
            : "none",
          transition: "background 1.8s ease",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[960px]">
        {/* Section header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "36px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 1.3s ease-out, transform 1.3s ease-out",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "10px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.30)",
              display: "block",
              marginBottom: "8px",
            }}
          >
            {collectionLabel}
          </span>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "12px",
              fontWeight: 400,
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.38)",
            }}
          >
            {collectionSubtext}
          </p>
        </div>

        {/* Grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
          style={{
            gap: "16px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 1.4s ease-out 0.15s, transform 1.4s ease-out 0.15s",
          }}
        >
          {templates.map((tpl, i) => (
            <EtalaseCard key={tpl.id} tpl={tpl} delay={0.2 + i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function NaukaEtalaseSyari() {
  return (
    <EtalaseSection
      id="etalase-syari"
      collectionLabel="Syar'i Collection"
      collectionSubtext="Undangan yang menjaga kehormatan dan nilai syar'i dalam setiap detail"
      templates={syariTemplates}
    />
  );
}

export function NaukaEtalaseUniversal() {
  return (
    <EtalaseSection
      id="etalase-universal"
      collectionLabel="Universal Collection"
      collectionSubtext="Keanggunan universal untuk semua latar belakang dan kepercayaan"
      templates={universalTemplates}
    />
  );
}
