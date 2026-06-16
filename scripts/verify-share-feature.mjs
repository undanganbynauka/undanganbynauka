import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const LIVE_URL = 'https://undangan-by-nauka.vercel.app';

await page.goto(LIVE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
await page.waitForTimeout(2500);

await page.evaluate(() => {
  const sections = document.querySelectorAll('section');
  for (const s of sections) {
    const text = s.innerText || '';
    if (text.includes('Basic') && text.includes('Premium') && text.includes('Doa')) {
      s.scrollIntoView({ behavior: 'instant', block: 'start' });
      break;
    }
  }
});
await page.waitForTimeout(2500);

const result = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    hasBagikanUndangan: text.includes('Bagikan Undangan'),
    hasWhatsAppMedsos: text.includes('WhatsApp + Media Sosial'),
    hasSupport: text.includes('Support'),
    hasBGM: text.includes('BGM'),
    hasDefaultAudio: text.includes('Default audio'),
  };
});
console.log('Verification:', JSON.stringify(result, null, 2));

await page.screenshot({ path: '/home/z/my-project/download/bukti-live-harga-share.png' });
console.log('Saved: bukti-live-harga-share.png');

await browser.close();
console.log('Done');
