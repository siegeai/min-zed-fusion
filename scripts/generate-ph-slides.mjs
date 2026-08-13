/**
 * Renders the Product Hunt gallery slides from scripts/ph-slides.html.
 *
 * 1270x760 is Product Hunt's gallery size. Rendered at 2x so the images stay
 * sharp on retina, which is where most of the launch traffic reads them.
 *
 * The slides are HTML rather than a design file on purpose: they pull the real
 * avatars and integration logos out of /public and reuse the site's own tokens,
 * so the gallery cannot drift from the landing page the way a static export
 * would. Re-run after any positioning change.
 *
 *   node scripts/generate-ph-slides.mjs
 */
import puppeteer from "puppeteer";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "..", "press", "product-hunt");
mkdirSync(outDir, { recursive: true });

const SLIDES = [
  ["s1", "01-what-it-is"],
  ["s2", "02-the-capsule"],
  ["s3", "03-it-acts"],
  ["s4", "04-setup-and-price"],
];

const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1270, height: 760, deviceScaleFactor: 2 });
  await page.goto(`file://${join(here, "ph-slides.html")}`, { waitUntil: "networkidle0" });
  // Google Fonts load over the network; screenshotting before they settle
  // silently falls back to a system face and the slides stop matching the site.
  await page.evaluateHandle("document.fonts.ready");

  for (const [id, name] of SLIDES) {
    const el = await page.$(`#${id}`);
    if (!el) throw new Error(`slide #${id} not found in ph-slides.html`);
    const path = join(outDir, `${name}.png`);
    await el.screenshot({ path, type: "png" });
    console.log(`  ${name}.png  1270x760 @2x`);
  }
  console.log(`\n  4 slides written to press/product-hunt/`);
} finally {
  await browser.close();
}
