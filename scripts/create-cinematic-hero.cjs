const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function createCinematicHero() {
  const targetW = 2560;
  const targetH = 1440;

  const bgInput = "C:/Users/HP/.gemini/antigravity/brain/95ea7cbf-5d4d-4e9e-9880-360030502a06/.user_uploaded/media_1793944303577_ab3fc2dd.jpg";
  const portraitInput = "C:/Users/HP/.gemini/antigravity/brain/95ea7cbf-5d4d-4e9e-9880-360030502a06/.user_uploaded/media_1793945510354_0e1368fb.jpg";
  const outputPath = path.resolve(__dirname, '../public/hero-bg.jpg');

  console.log('1. Loading & upscaling emerald background to', targetW, 'x', targetH);
  const upscaledBg = await sharp(bgInput)
    .resize(targetW, targetH, { kernel: 'lanczos3', fit: 'fill' })
    .toBuffer();

  console.log('2. Preparing zoomed-out advocate portrait and library...');
  // Zoom out portrait by ~18% (scaledW: 1090, scaledH: 1195 down from 1314x1440)
  // Reposition portrait downward (posY: 200) for comfortable visual headroom below navbar
  const pW = 1314;
  const pH = targetH; // 1440
  const pX = targetW - pW; // 1246

  const scaledW = 1090;
  const scaledH = 1195;
  const posX = pW - scaledW - 15; // 209px from left of canvas
  const posY = 200; // 200px from top of canvas

  const rawScaledAdvocate = await sharp(portraitInput)
    .resize(scaledW, scaledH, { kernel: 'lanczos3', fit: 'fill' })
    .toBuffer();

  const { data: advData } = await sharp(rawScaledAdvocate)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const canvas = Buffer.alloc(pW * pH * 3);

  function getAdvPixel(x, y) {
    const cx = Math.max(0, Math.min(scaledW - 1, x));
    const cy = Math.max(0, Math.min(scaledH - 1, y));
    const idx = (cy * scaledW + cx) * 3;
    return [advData[idx], advData[idx+1], advData[idx+2]];
  }

  for (let y = 0; y < pH; y++) {
    for (let x = 0; x < pW; x++) {
      const destIdx = (y * pW + x) * 3;
      const relX = x - posX;
      const relY = y - posY;

      if (relX >= 0 && relX < scaledW && relY >= 0 && relY < scaledH) {
        const p = getAdvPixel(relX, relY);
        canvas[destIdx] = p[0];
        canvas[destIdx+1] = p[1];
        canvas[destIdx+2] = p[2];
      } else {
        if (relY < 0) {
          // Extend top bookshelves upward
          const sampleY = Math.min(65, Math.abs(relY) % 65);
          const sampleX = Math.max(0, Math.min(scaledW - 1, relX >= 0 ? relX : 0));
          const distFromTop = y;
          const darken = 0.70 + 0.30 * (distFromTop / posY);
          const p = getAdvPixel(sampleX, sampleY);
          canvas[destIdx] = Math.round(p[0] * darken);
          canvas[destIdx+1] = Math.round(p[1] * darken);
          canvas[destIdx+2] = Math.round(p[2] * darken);
        } else if (relX < 0) {
          // Extend left bookshelves
          const sampleX = Math.min(100, Math.abs(relX) % 100);
          const sampleY = Math.max(0, Math.min(scaledH - 1, relY));
          const p = getAdvPixel(sampleX, sampleY);
          canvas[destIdx] = p[0];
          canvas[destIdx+1] = p[1];
          canvas[destIdx+2] = p[2];
        } else if (relX >= scaledW) {
          // Extend right warm lamp/bookshelf
          const dist = relX - scaledW;
          const sampleX = scaledW - 1 - (dist % 30);
          const sampleY = Math.max(0, Math.min(scaledH - 1, relY));
          const p = getAdvPixel(sampleX, sampleY);
          canvas[destIdx] = p[0];
          canvas[destIdx+1] = p[1];
          canvas[destIdx+2] = p[2];
        } else if (relY >= scaledH) {
          // Extend bottom chair base/floor
          const sampleY = scaledH - 1 - (relY - scaledH) % 25;
          const sampleX = Math.max(0, Math.min(scaledW - 1, relX));
          const p = getAdvPixel(sampleX, sampleY);
          canvas[destIdx] = p[0];
          canvas[destIdx+1] = p[1];
          canvas[destIdx+2] = p[2];
        }
      }
    }
  }

  // Vertical blend at seam
  const blendRows = 15;
  for (let b = 0; b < blendRows; b++) {
    const y = posY + b;
    const alpha = (b + 1) / (blendRows + 1);
    for (let x = posX; x < posX + scaledW; x++) {
      const destIdx = (y * pW + x) * 3;
      const aboveIdx = ((posY - 1 - (blendRows - b)) * pW + x) * 3;
      if (aboveIdx >= 0) {
        canvas[destIdx] = Math.round(canvas[destIdx] * alpha + canvas[aboveIdx] * (1 - alpha));
        canvas[destIdx+1] = Math.round(canvas[destIdx+1] * alpha + canvas[aboveIdx+1] * (1 - alpha));
        canvas[destIdx+2] = Math.round(canvas[destIdx+2] * alpha + canvas[aboveIdx+2] * (1 - alpha));
      }
    }
  }

  const finalPortraitBuffer = await sharp(canvas, { raw: { width: pW, height: pH, channels: 3 } })
    .jpeg({ quality: 96, chromaSubsampling: '4:4:4' })
    .toBuffer();

  const portraitBase64 = `data:image/jpeg;base64,${finalPortraitBuffer.toString('base64')}`;

  // Arc coordinates matching reference blueprint:
  // Starts at top x=1570, curves to apex x=1340 at y=620, curves to bottom x=1530 at y=1440
  const arcD = "M 1570 0 C 1270 380, 1270 940, 1530 1440";
  const clipD = "M 1570 0 C 1270 380, 1270 940, 1530 1440 L 2560 1440 L 2560 0 Z";

  console.log('3. Generating SVG with glowing arc and clipped portrait...');
  const svgOverlay = Buffer.from(`
    <svg width="${targetW}" height="${targetH}" viewBox="0 0 ${targetW} ${targetH}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <clipPath id="arcClip">
          <path d="${clipD}" />
        </clipPath>

        <linearGradient id="goldGradCore" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FFF6D9" stop-opacity="0.95" />
          <stop offset="18%" stop-color="#FFFDF7" stop-opacity="1" />
          <stop offset="45%" stop-color="#F5D88D" stop-opacity="1" />
          <stop offset="68%" stop-color="#D6AD69" stop-opacity="0.9" />
          <stop offset="85%" stop-color="#B8893E" stop-opacity="0.5" />
          <stop offset="100%" stop-color="#785418" stop-opacity="0" />
        </linearGradient>

        <linearGradient id="goldGradGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#D6AD69" stop-opacity="0.85" />
          <stop offset="22%" stop-color="#E8C582" stop-opacity="0.95" />
          <stop offset="48%" stop-color="#D6AD69" stop-opacity="0.9" />
          <stop offset="72%" stop-color="#AA7E33" stop-opacity="0.6" />
          <stop offset="100%" stop-color="#422F0D" stop-opacity="0" />
        </linearGradient>

        <filter id="bloomWide" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="24" />
        </filter>
        <filter id="bloomMid" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <filter id="bloomTight" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
      </defs>

      <!-- 1. Advocate portrait & library extending to top, right, and bottom edges -->
      <g clip-path="url(#arcClip)">
        <image xlink:href="${portraitBase64}" x="${pX}" y="0" width="${pW}" height="${pH}" preserveAspectRatio="none" />
      </g>

      <!-- 2. Champagne-gold curved divider with soft optical glow -->
      <g fill="none">
        <path d="${arcD}" stroke="url(#goldGradGlow)" stroke-width="44" stroke-linecap="round" filter="url(#bloomWide)" opacity="0.4" />
        <path d="${arcD}" stroke="url(#goldGradGlow)" stroke-width="20" stroke-linecap="round" filter="url(#bloomMid)" opacity="0.7" />
        <path d="${arcD}" stroke="url(#goldGradCore)" stroke-width="9" stroke-linecap="round" filter="url(#bloomTight)" opacity="0.9" />
        <path d="${arcD}" stroke="url(#goldGradCore)" stroke-width="3" stroke-linecap="round" opacity="1" />
        <path d="${arcD}" stroke="#FFFFFF" stroke-width="1.2" stroke-linecap="round" opacity="0.85" />
      </g>
    </svg>
  `);

  console.log('4. Compositing and saving to', outputPath);
  await sharp(upscaledBg)
    .composite([
      { input: svgOverlay, blend: 'over' }
    ])
    .jpeg({ quality: 96, chromaSubsampling: '4:4:4' })
    .toFile(outputPath);

  const stats = fs.statSync(outputPath);
  console.log(`Success! Cinematic hero-bg.jpg created at ${targetW}x${targetH}, size: ${(stats.size / 1024).toFixed(1)} KB`);
}

createCinematicHero().catch(console.error);
