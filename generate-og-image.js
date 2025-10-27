// Script to generate OG image for social media previews
// This requires Puppeteer to be installed: npm install puppeteer

import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateOGImage() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // Set viewport to exact OG image dimensions
    await page.setViewport({ width: 1200, height: 630 });
    
    // Load the HTML file
    const htmlPath = path.join(__dirname, 'public', 'og-image.html');
    const htmlUrl = `file://${htmlPath}`;
    
    console.log('Loading HTML template...');
    await page.goto(htmlUrl, { waitUntil: 'networkidle0' });
    
    // Take screenshot
    const outputPath = path.join(__dirname, 'public', 'og-image.png');
    console.log('Generating image...');
    await page.screenshot({
      path: outputPath,
      type: 'png'
    });
    
    console.log(`✅ OG image generated successfully at: ${outputPath}`);
    console.log('Image dimensions: 1200x630px');
    
  } catch (error) {
    console.error('❌ Error generating OG image:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

// Run the script
generateOGImage().catch((error) => {
  console.error('Failed to generate OG image:', error);
  process.exit(1);
});

