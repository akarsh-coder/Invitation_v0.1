import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public');

const bannerSvg = readFileSync(join(root, 'scripts', 'og-banner.svg'));
const thumbSvg = readFileSync(join(root, 'scripts', 'og-thumb.svg'));
const heroPath = join(root, 'public', 'images', 'web', 'hero.webp');

const baseBanner = await sharp(bannerSvg).resize(1200, 630).png().toBuffer();

let bannerComposite = baseBanner;
try {
  const photo = await sharp(heroPath)
    .resize(520, 650, { fit: 'cover', position: 'top' })
    .modulate({ brightness: 1.02, saturation: 0.92 })
    .toBuffer();

  const photoMask = await sharp({
    create: {
      width: 520,
      height: 630,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="520" height="630">
          <defs>
            <linearGradient id="fade" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="white" stop-opacity="0"/>
              <stop offset="32%" stop-color="white" stop-opacity="0.15"/>
              <stop offset="100%" stop-color="white" stop-opacity="1"/>
            </linearGradient>
          </defs>
          <rect width="520" height="630" fill="url(#fade)"/>
        </svg>`),
        blend: 'dest-in',
      },
    ])
    .png()
    .toBuffer();

  const maskedPhoto = await sharp(photo)
    .composite([{ input: photoMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  bannerComposite = await sharp(baseBanner)
    .composite([
      { input: maskedPhoto, left: 680, top: 0, blend: 'over' },
      {
        input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
          <defs>
            <linearGradient id="veil" x1="55%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#F6F1E8" stop-opacity="0"/>
              <stop offset="45%" stop-color="#F6F1E8" stop-opacity="0.08"/>
              <stop offset="100%" stop-color="#4A1515" stop-opacity="0.06"/>
            </linearGradient>
          </defs>
          <rect width="1200" height="630" fill="url(#veil)"/>
        </svg>`),
        blend: 'over',
      },
    ])
    .png()
    .toBuffer();
} catch {
  bannerComposite = baseBanner;
}

await sharp(bannerComposite).jpeg({ quality: 92, mozjpeg: true }).toFile(join(outDir, 'og-banner.jpg'));
writeFileSync(join(outDir, 'og-banner.png'), await sharp(bannerComposite).png({ compressionLevel: 9 }).toBuffer());

const baseThumb = await sharp(thumbSvg).resize(1200, 1200).png().toBuffer();
let thumbComposite = baseThumb;
try {
  const thumbPhoto = await sharp(heroPath)
    .resize(1200, 1200, { fit: 'cover', position: 'top' })
    .blur(1.2)
    .modulate({ brightness: 0.85, saturation: 0.75 })
    .toBuffer();

  thumbComposite = await sharp(thumbPhoto)
    .composite([
      { input: baseThumb, blend: 'over' },
    ])
    .png()
    .toBuffer();
} catch {
  thumbComposite = baseThumb;
}

await sharp(thumbComposite).jpeg({ quality: 92, mozjpeg: true }).toFile(join(outDir, 'og-thumb.jpg'));

console.log('Wrote public/og-banner.jpg, public/og-thumb.jpg, public/og-banner.png');
