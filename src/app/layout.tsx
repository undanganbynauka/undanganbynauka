import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Playfair_Display, Lora, Amiri, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "./sacred.css";
import "./nauka.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nauka — Undangan Digital yang Elegan",
  description:
    "Undangan pernikahan digital syar'i & universal. Tanpa foto tetap elegan, animasi sinematik, nasyid pilihan. Satu link, semua tamu.",
  keywords: [
    "undangan digital",
    "undangan pernikahan",
    "undangan online",
    "wedding invitation",
    "nauka",
    "undangan syar'i",
    "undangan elegan",
  ],
  authors: [{ name: "Nauka" }],
  openGraph: {
    title: "Nauka — Undangan Digital yang Elegan",
    description:
      "Undangan pernikahan digital syar'i & universal. Tanpa foto tetap elegan, animasi sinematik, nasyid pilihan.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jakarta.variable} ${cormorant.variable} ${playfair.variable} ${lora.variable} ${amiri.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
