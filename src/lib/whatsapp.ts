/**
 * Nauka WhatsApp & Google Form Configuration
 *
 * WhatsApp berfungsi sebagai "konfirmasi pembayaran & konsultasi"
 * BUKAN sebagai checkout utama atau sales push channel.
 *
 * Checkout flow:
 * Pilih paket → QRIS → Konfirmasi → Auto WA notif ke owner + Google Form
 *
 * CTA Hierarchy:
 * 1. Hero CTA (Syar'i / Universal)
 * 2. Etalase template
 * 3. Pricing clarity
 * 4. Checkout (QRIS)
 * 5. Konfirmasi → Auto WA notif + Google Form
 * 6. Footer WhatsApp (support layer)
 */

const WA_NUMBER = "6289655592925";

/** ⚠️ GANTI dengan Google Form URL asli Nauka */
export const GOOGLE_FORM_URL = null;

/** Prefilled message for general inquiry */
const WA_INQUIRY_TEXT = "Halo Nauka, saya ingin menanyakan tentang undangan digital.";

/** Encoded general inquiry link */
export const WA_INQUIRY_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_INQUIRY_TEXT)}`;

/**
 * Generate WhatsApp order notification link.
 * Digunakan saat user konfirmasi pembayaran → auto-buka WA
 * agar owner langsung dapat notif dengan detail order.
 */
export function getWAOrderNotifLink(templateName: string, packageName: string, price: number): string {
  const message = `Halo Nauka, saya ingin konfirmasi pembayaran.%0A%0ATemplate: ${templateName}%0APaket: ${packageName}%0AHarga: Rp${price.toLocaleString("id-ID")}%0AMetode: QRIS`;
  return `https://wa.me/${WA_NUMBER}?text=${message}`;
}

/** Generate WhatsApp inquiry link with custom message */
export function getWAInquiryLink(customMessage?: string): string {
  const text = customMessage || WA_INQUIRY_TEXT;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}
