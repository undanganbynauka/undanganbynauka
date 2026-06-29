import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B1120",
          color: "white",
          fontSize: 60,
        }}
      >
        TEST OK
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
