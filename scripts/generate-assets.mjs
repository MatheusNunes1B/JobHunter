import sharp from 'sharp';
import { mkdir, readFile } from 'node:fs/promises';
await mkdir('assets', { recursive: true });
const logo = await readFile('public/logo.svg');
for (const [name, size, logoSize] of [['icon', 1024, 1024], ['splash', 2732, 1000]]) {
  await sharp({ create: { width: size, height: size, channels: 3, background: '#2563EB' } })
    .composite([{ input: await sharp(logo).resize(logoSize, logoSize).png().toBuffer(), gravity: 'centre' }])
    .flatten({ background: '#2563EB' }).removeAlpha().png().toFile(`assets/${name}.png`);
  console.log(`${name}.png: ${size} x ${size}, opaco`);
}