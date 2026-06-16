/**
 * Nauka WhatsApp Configuration
 *
 * WhatsApp berfungsi sebagai "initial inquiry entry point + support contact"
 * BUKAN sebagai checkout utama, sales push channel, atau CTA dominan.
 *
 * CTA Hierarchy:
 * 1. Hero CTA (Syar'i / Universal)
 * 2. Etalase template
 * 3. Pricing clarity
 * 4. Checkout (QRIS)
 * 5. Google Form (final input)
 * 6. Footer WhatsApp (support layer)
 */

const WA_NUMBER = "6289655592925";

/** Prefilled message for general inquiry */
const WA_INQUIRY_TEXT = "Halo Nauka, saya ingin menanyakan tentang undangan digital.";

/** Encoded general inquiry link */
export const WA_INQUIRY_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_INQUIRY_TEXT)}`;

/** Generate WhatsApp order confirmation link with template & package details */
export function getWAOrderLink(templateName: string, packageName: string, price: number): string {
  const message = `Halo Nauka, saya ingin order undangan.%0A%0ATemplate: ${templateName}%0APaket: ${packageName}%0AHarga: Rp${price.toLocaleString("id-ID")}%0AMetode: QRIS`;
  return `https://wa.me/${WA_NUMBER}?text=${message}`;
}

/** Generate WhatsApp inquiry link with custom message */
export function getWAInquiryLink(customMessage?: string): string {
  const text = customMessage || WA_INQUIRY_TEXT;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}
