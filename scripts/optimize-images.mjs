// Generates responsive WebP/JPEG variants of the site photography.
// Source files live in assets/source; output goes to public/images.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const OUT = 'public/images';
const jobs = [
  { src: 'assets/source/hero-temple-mobile.jpg', name: 'hero-mobile', widths: [480, 800] },
  { src: 'assets/source/hero-temple-desktop.png', name: 'hero-desktop', widths: [1200, 1672] },
  {
    // 2:3 editorial crop: gopuram above, couple down to their feet.
    src: 'assets/source/story-couple.png',
    name: 'story-couple',
    widths: [600, 902],
    extract: { left: 0, top: 360, width: 902, height: 1353 },
    saturation: 0.78,
  },
];

await mkdir(OUT, { recursive: true });

for (const { src, name, widths, extract, saturation = 0.84 } of jobs) {
  for (const w of widths) {
    // Soft, slightly muted grade; warm washes are layered in CSS.
    let base = sharp(src);
    if (extract) base = base.extract(extract);
    base = base
      .resize({ width: w, withoutEnlargement: true })
      .modulate({ saturation, brightness: 1.01 })
      .gamma(2.2, 2.35);
    await base.clone().webp({ quality: 80, effort: 6 }).toFile(`${OUT}/${name}-${w}.webp`);
    await base.clone().jpeg({ quality: 80, progressive: true, mozjpeg: true }).toFile(`${OUT}/${name}-${w}.jpg`);
    console.log(`✓ ${name}-${w}`);
  }
}
