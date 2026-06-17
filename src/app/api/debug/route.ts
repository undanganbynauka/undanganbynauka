import { NextRequest, NextResponse } from "next/server";
import { config } from "dotenv";
config({ override: true });

export async function GET(_req: NextRequest) {
  const diagnostics: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    runtime: {
      node: process.version,
      platform: process.platform,
      vercel: process.env.VERCEL === "1",
      region: process.env.VERCEL_REGION || "local",
    },
    env: {
      DATABASE_URL_set: !!process.env.DATABASE_URL,
      DATABASE_URL_prefix: process.env.DATABASE_URL?.substring(0, 30) + "...",
      DIRECT_URL_set: !!process.env.DIRECT_URL,
      NODE_ENV: process.env.NODE_ENV,
    },
  };

  // Try dynamic import of Prisma to catch load errors
  try {
    const { PrismaClient } = await import("@prisma/client");
    diagnostics.prisma = { loaded: true, clientConstructor: typeof PrismaClient };

    const prisma = new PrismaClient();
    diagnostics.prisma.connected = "trying...";

    const result = await prisma.$queryRaw`SELECT 1 AS ok, NOW() AS t`;
    diagnostics.prisma.query = "SUCCESS";
    diagnostics.prisma.result = result;

    await prisma.$disconnect();
  } catch (e: unknown) {
    diagnostics.prisma = {
      error: e instanceof Error ? e.message : String(e),
      stack: e instanceof Error ? e.stack?.split("\n").slice(0, 5) : undefined,
      name: e instanceof Error ? e.name : typeof e,
    };
  }

  return NextResponse.json(diagnostics, { status: 200 });
}
