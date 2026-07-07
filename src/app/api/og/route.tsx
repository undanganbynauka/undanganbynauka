import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const groom = searchParams.get("groom") || "Mempelai Pria";
    const bride = searchParams.get("bride") || "Mempelai Wanita";

    // Bentuk inisial (huruf pertama dari nama pertama, uppercase)
    const groomInitial = (groom.trim().charAt(0) || "M").toUpperCase();
    const brideInitial = (bride.trim().charAt(0) || "B").toUpperCase();
    const initialPair = `${groomInitial} & ${brideInitial}`;

    // Bentuk string final SEBELUM JSX (anti Satori crash)
    const coupleLine = `${groom} & ${bride}`;
    const subLine = "Undangan Pernikahan";

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #0B1120 0%, #1a1f3a 60%, #2a1f3a 100%)",
            color: "#fff",
            fontFamily: "Georgia, serif",
            position: "relative",
          }}
        >
          {/* Subtle gold ring backdrop */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 520,
              height: 520,
              borderRadius: "50%",
              border: "2px solid rgba(201,169,110,0.15)",
              display: "flex",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 620,
              height: 620,
              borderRadius: "50%",
              border: "1px solid rgba(201,169,110,0.08)",
              display: "flex",
            }}
          />

          {/* Top label */}
          <div
            style={{
              fontSize: 28,
              letterSpacing: "0.4em",
              color: "rgba(201,169,110,0.85)",
              textTransform: "uppercase",
              marginBottom: 24,
              display: "flex",
            }}
          >
            {subLine}
          </div>

          {/* Initials - large focal point */}
          <div
            style={{
              fontSize: 280,
              fontWeight: 400,
              color: "rgba(201,169,110,0.95)",
              lineHeight: 1,
              marginBottom: 32,
              display: "flex",
              fontFamily: "Georgia, serif",
            }}
          >
            {initialPair}
          </div>

          {/* Couple names */}
          <div
            style={{
              fontSize: 56,
              fontWeight: 400,
              color: "#fff",
              marginBottom: 16,
              display: "flex",
              fontFamily: "Georgia, serif",
            }}
          >
            {coupleLine}
          </div>

          {/* Gold divider */}
          <div
            style={{
              width: 80,
              height: 2,
              background: "rgba(201,169,110,0.6)",
              marginBottom: 20,
              display: "flex",
            }}
          />

          {/* Footer note */}
          <div
            style={{
              fontSize: 24,
              color: "rgba(255,255,255,0.6)",
              letterSpacing: "0.15em",
              display: "flex",
            }}
          >
            Save the Date
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (err) {
    console.error("[api/og] error:", err);
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
