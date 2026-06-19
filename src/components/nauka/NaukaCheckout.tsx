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
  const [selectedPackage, setSelectedPackage] = useState<"basic" | "premium">("basic");

  const price = selectedPackage === "basic"
    ? PRICING.basic
    : PRICING.premium;

  return (
    <div style={{ textAlign: "center", padding: "40px 24px" }}>
      <button
        onClick={() => setOpen(true)}
        style={{
          padding: "12px 24px",
          borderRadius: "8px",
          border: "1px solid #fff",
          background: "transparent",
          color: "#fff"
        }}
      >
        Checkout {templateName}
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#0B1120",
              padding: 20,
              borderRadius: 12,
              color: "#fff"
            }}
          >
            <h3>{templateName}</h3>

            <p>Harga: {price}</p>

            <button
              style={{
                marginTop: 10,
                padding: "10px 16px",
                background: "#fff",
                color: "#000"
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
