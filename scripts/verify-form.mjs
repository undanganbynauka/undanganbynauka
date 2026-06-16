import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const LIVE_URL = 'https://undangan-by-nauka.vercel.app/checkout';

await page.goto(LIVE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
await page.waitForTimeout(2000);

// Take top of page
await page.screenshot({ path: '/home/z/my-project/download/bukti-form-pemesanan-top.png' });
console.log('Saved: bukti-form-pemesanan-top.png');

// Scroll down to verify all sections
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 3));
await page.waitForTimeout(1000);
await page.screenshot({ path: '/home/z/my-project/download/bukti-form-pemesanan-mid.png' });
console.log('Saved: bukti-form-pemesanan-mid.png');

// Scroll to Our Journey section
await page.evaluate(() => {
  const sections = Array.from(document.querySelectorAll('section'));
  const journeySection = sections.find(s => (s.innerText || '').includes('Our Journey'));
  if (journeySection) journeySection.scrollIntoView({ behavior: 'instant', block: 'start' });
});
await page.waitForTimeout(1500);
await page.screenshot({ path: '/home/z/my-project/download/bukti-form-our-journey.png' });
console.log('Saved: bukti-form-our-journey.png');

// Verify form sections exist
const sections = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    hasA_DataPemesan: text.includes('A. Data Pemesan'),
    hasB_DataMempelai: text.includes('B. Data Mempelai'),
    hasC_DataAcara: text.includes('C. Data Acara'),
    hasD_OurJourney: text.includes('D. Our Journey'),
    hasE_DetailUndangan: text.includes('E. Detail Undangan'),
    hasF_BGM: text.includes('F. Musik Latar'),
    hasG_CustomURL: text.includes('G. Custom URL'),
    hasH_Rekening: text.includes('H. Data Rekening'),
    hasI_Tamu: text.includes('I. Daftar Nama Tamu'),
    hasJ_Catatan: text.includes('J. Catatan'),
    hasUniversal: text.includes('Pertemuan'),
    hasSyari: text.includes("Ta'aruf"),
    hasSubmit: text.includes('Kirim Pemesanan'),
  };
});
console.log('Sections verified:', JSON.stringify(sections, null, 2));

await browser.close();
console.log('Done');
