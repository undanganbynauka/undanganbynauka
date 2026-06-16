import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const LIVE_URL = 'https://undangan-by-nauka.vercel.app/checkout';

await page.goto(LIVE_URL, { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(3000);

const allText = await page.evaluate(() => document.body.innerText);
console.log('--- First 3000 chars ---');
console.log(allText.substring(0, 3000));

await browser.close();
