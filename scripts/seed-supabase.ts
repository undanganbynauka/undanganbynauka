import { PrismaClient } from "@prisma/client";

const DATABASE_URL = process.env.DATABASE_URL!;
const prisma = new PrismaClient({
  datasources: { db: { url: DATABASE_URL } },
  log: ["query", "error", "warn"],
});

console.log("DATABASE_URL starts with:", DATABASE_URL.substring(0, 50));

async function main() {
  console.log("🌱 Seeding Supabase...");

  // Clean existing data (idempotent)
  await prisma.guest.deleteMany();
  await prisma.wedding.deleteMany();

  // 1. BASIC wedding: Ali & Lyla
  const basic = await prisma.wedding.create({
    data: {
      brideName: "Lyla",
      groomName: "Ali",
      slug: "ali-lyla",
      package: "basic",
    },
  });
  console.log("✅ Basic:", basic.slug, "(no guests)");

  // 2. PREMIUM wedding: Yusuf & Aisyah with 2 guests
  const premium = await prisma.wedding.create({
    data: {
      brideName: "Aisyah",
      groomName: "Yusuf",
      slug: "yusuf-aisyah",
      package: "premium",
      guests: {
        create: [
          { name: "Sarah & Suami", slug: "sarah-suami" },
          { name: "Bapak Andi", slug: "bapak-andi" },
        ],
      },
    },
    include: { guests: true },
  });
  console.log("✅ Premium:", premium.slug, "with", premium.guests.length, "guests");

  console.log("\n📋 Summary:");
  console.log("  Weddings:", await prisma.wedding.count());
  console.log("  Guests:  ", await prisma.guest.count());
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
