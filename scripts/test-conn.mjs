import { PrismaClient } from "@prisma/client";

const PASSWORD = "KK8#m9k2bAzV4M";
const ENCODED = encodeURIComponent(PASSWORD);

// Test different URLs
const urls = [
  `postgresql://postgres.cjjcdayhrfsyxugzitiu:${ENCODED}@aws-1-ap-northeast-2.pooler.supabase.com:5432/postgres`,
  `postgresql://postgres.cjjcdayhrfsyxugzitiu:${PASSWORD}@aws-1-ap-northeast-2.pooler.supabase.com:5432/postgres`,
  `postgresql://postgres:${ENCODED}@aws-1-ap-northeast-2.pooler.supabase.com:5432/postgres`,
];

for (const url of urls) {
  console.log("\nTrying:", url.split(":").slice(0, 3).join(":") + ":***@" + url.split("@")[1]);
  try {
    const prisma = new PrismaClient({ datasources: { db: { url } } });
    const result = await prisma.$queryRaw`SELECT 1 AS ok`;
    console.log("✅ SUCCESS");
    await prisma.$disconnect();
    break;
  } catch (e) {
    console.log("❌", JSON.stringify(e.message).slice(0, 300));
  }
}
