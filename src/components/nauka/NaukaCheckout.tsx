"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PRICING, formatIDR } from "@/lib/pricing";

interface Props {
  templateName: string;
  templateId: string;
}

export const NaukaCheckout: React.FC<Props> = ({
  templateName,
  templateId,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<"basic" | "premium">(
    "basic"
  );

  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open]);

  const price =
    selectedPackage === "basic"
      ? PRICING.basic
      : PRICING.premium;

  return (
    <>
      {/* BUTTON TRIGGER */}
      <div style={{ textAlign: "center", padding: "40px 24px" }}>
        <button
          onClick={() => setOpen(true)}
          style={{
            padding: "12px 24px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "transparent",
            color: "white",
            cursor: "pointer",
          }}
        >
          Lanjut ke Checkout {templateName}
        </button>
      </div>

      {/* MODAL */}
      {open && (
        <div
          ref={modalRef}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "90%",
              maxWidth: 420,
              background: "#0B1120",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
              padding: 20,
              color: "white",
            }}
          >
            <h2 style={{ marginBottom: 10 }}>
              Checkout {templateName}
            </h2>

            {/* PACKAGE SELECT */}
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              <button
                onClick={() => setSelectedPackage("basic")}
                style={{
                  flex: 1,
                  padding: 10,
                  background:
                    selectedPackage === "basic"
                      ? "white"
                      : "transparent",
                  color:
                    selectedPackage === "basic"
                      ? "black"
                      : "white",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                Basic
              </button>

              <button
                onClick={() => setSelectedPackage("premium")}
                style={{
                  flex: 1,
                  padding: 10,
                  background:
                    selectedPackage === "premium"
                      ? "white"
                      : "transparent",
                  color:
                    selectedPackage === "premium"
                      ? "black"
                      : "white",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                Premium
              </button>
            </div>

            {/* PRICE */}
            <p style={{ marginBottom: 20 }}>
              Harga: <b>{formatIDR(price)}</b>
            </p>

            {/* ACTION */}
            <button
              style={{
                width: "100%",
                padding: 12,
                background: "white",
                color: "black",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
              }}
