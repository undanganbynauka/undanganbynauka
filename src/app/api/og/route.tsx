import { ImageResponse } from "next/og";

export const runtime = "edge";
export const dynamic = "force-static";

export async function GET() {
  const groomName = "Angga";
  const brideName = "Rini";

  const coupleName = `${groomName} & ${brideName}`;
  const initials = `${groomName[0]} & ${brideName[0]}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0F172A",
        }}
      >
        <div
          style={{
            width: 1040,
            height: 500,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            border: "2px solid #C8A95A",
            borderRadius: 28,
            position: "relative",
            color: "#FFFFFF",
          }}
        >
          {/* Corner Decoration */}
          <div
            style={{
              position: "absolute",
              top: 24,
              left: 24,
              width: 18,
              height: 18,
              borderTop: "2px solid #C8A95A",
              borderLeft: "2px solid #C8A95A",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: 24,
              right: 24,
              width: 18,
              height: 18,
              borderTop: "2px solid #C8A95A",
              borderRight: "2px solid #C8A95A",
            }}
          />

          <div
            style={{
              position: "absolute",
              bottom: 24,
              left: 24,
              width: 18,
              height: 18,
              borderBottom: "2px solid #C8A95A",
              borderLeft: "2px solid #C8A95A",
            }}
          />

          <div
            style={{
              position: "absolute",
              bottom: 24,
              right: 24,
              width: 18,
              height: 18,
              borderBottom: "2px solid #C8A95A",
              borderRight: "2px solid #C8A95A",
            }}
          />

          {/* Moon Halo */}
          <div
            style={{
              position: "absolute",
              top: 125,
              width: 150,
              height: 150,
              border: "2px solid rgba(200,169,90,0.35)",
              borderRadius: "50%",
            }}
          />

          <div
            style={{
              fontSize: 24,
              color: "#C8A95A",
              letterSpacing: 8,
              marginBottom: 30,
            }}
          >
            THE WEDDING OF
          </div>

          <div
            style={{
              fontSize: 110,
              color: "#F4D98B",
              lineHeight: 1,
              marginBottom: 22,
            }}
          >
            {initials}
          </div>

          <div
            style={{
              width: 120,
              height: 1,
              backgroundColor: "#C8A95A",
              marginBottom: 22,
            }}
          />

          <div
            style={{
              fontSize: 42,
              marginBottom: 18,
            }}
          >
            {coupleName}
          </div>

          <div
            style={{
              fontSize: 22,
              color: "#C8A95A",
            }}
          >
            12 Desember 2026
          </div>

          <div
            style={{
              position: "absolute",
              bottom: 36,
              fontSize: 16,
              color: "#C8A95A",
              letterSpacing: 10,
            }}
          >
            N A U K A
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
