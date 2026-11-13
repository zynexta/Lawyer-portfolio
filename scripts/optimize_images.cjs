const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const publicDir = path.join(__dirname, '..', 'public');

const images = [
  'hero-bg.jpg',
  'advocate-desk-portrait.jpg',
  'hero-mobile.jpg',
  'advocate-real.jpg',
  'cta-scales.jpg',
  'advocate-portrait.jpg',
  'article-gavel.jpg',
  'article-pillars.jpg',
  'article-books.jpg'
];

async function convert() {
  console.log('Optimizing images to WebP...');
  let totalOrig = 0;
  let totalNew = 0;

  for (const img of images) {
    const srcPath = path.join(publicDir, img);
    if (!fs.existsSync(srcPath)) {
      console.warn(`File not found: ${srcPath}`);
      continue;
    }
    const origStat = fs.statSync(srcPath);
    totalOrig += origStat.size;

    const baseName = img.replace(/\.(jpg|jpeg|png)$/, '');
    const destPath = path.join(publicDir, `${baseName}.webp`);

    await sharp(srcPath)
      .webp({ quality: 82, effort: 6 })
      .toFile(destPath);

    const newStat = fs.statSync(destPath);
    totalNew += newStat.size;

    const pct = (((origStat.size - newStat.size) / origStat.size) * 100).toFixed(1);
    console.log(`✓ ${img} (${(origStat.size / 1024).toFixed(1)} KB) -> ${baseName}.webp (${(newStat.size / 1024).toFixed(1)} KB) [-${pct}%]`);
  }

  const totalPct = (((totalOrig - totalNew) / totalOrig) * 100).toFixed(1);
  console.log(`\nTotal: ${(totalOrig / 1024).toFixed(1)} KB -> ${(totalNew / 1024).toFixed(1)} KB (Saved ${((totalOrig - totalNew) / 1024).toFixed(1)} KB / ${totalPct}%)\n`);
}

convert().catch(console.error);

