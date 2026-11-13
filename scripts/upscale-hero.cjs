const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function processHero() {
  const bgInput = "C:/Users/HP/.gemini/antigravity/brain/95ea7cbf-5d4d-4e9e-9880-360030502a06/.user_uploaded/media_1793944303577_ab3fc2dd.jpg";
  const outputPath = path.resolve(__dirname, '../public/hero-bg.jpg');

  const targetWidth = 3840;
  const targetHeight = 1920;

  console.log('Upscaling clean emerald-and-gold background from:', bgInput);

  // Pure upscale with Lanczos3 and subtle sharpening
  await sharp(bgInput)
    .resize(targetWidth, targetHeight, {
      kernel: 'lanczos3',
      fit: 'fill',
    })
    .sharpen({
      sigma: 1.2,
      m1: 0.8,
      m2: 1.5,
    })
    .jpeg({ quality: 96, chromaSubsampling: '4:4:4' })
    .toFile(outputPath);

  const stats = fs.statSync(outputPath);
  console.log(`Success! Clean hero-bg.jpg created at ${targetWidth}x${targetHeight}, size: ${(stats.size / 1024).toFixed(1)} KB`);
}

processHero().catch(console.error);
