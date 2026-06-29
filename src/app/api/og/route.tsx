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
            width: "1000px",
            height: "500px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "2px solid #C8A95A",
            borderRadius: "24px",
            color: "#FFFFFF",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "30px",
              fontSize: "18px",
              color: "#C8A95A",
            }}
          >
            ✦
          </div>

          <div
            style={{
              fontSize: "24px",
              color: "#C8A95A",
              letterSpacing: "6px",
              marginBottom: "24px",
            }}
          >
            THE WEDDING OF
          </div>

          <div
            style={{
              fontSize: "110px",
              color: "#F8E7A1",
              marginBottom: "16px",
            }}
          >
            {initials}
          </div>

          <div
            style={{
              fontSize: "42px",
              color: "#FFFFFF",
              marginBottom: "18px",
            }}
          >
            {coupleName}
          </div>

          <div
            style={{
              fontSize: "22px",
              color: "#C8A95A",
            }}
          >
            12 Desember 2026
          </div>

          <div
            style={{
              position: "absolute",
              bottom: "28px",
              fontSize: "18px",
              color: "#C8A95A",
            }}
          >
            ✦ By Nauka ✦
          </div>
        </div>
      </div>,
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
