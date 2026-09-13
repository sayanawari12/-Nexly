const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = 'C:\\Users\\sayan\\.gemini\\antigravity\\brain\\4c21e87f-34de-4985-b000-e6c1e36b0552\\hero_laptop_isolated_png_1785549914512.jpg';
const outputPng = path.join(__dirname, '..', 'src', 'assets', 'images', 'laptop_mockup.png');
const outputJpg = path.join(__dirname, '..', 'src', 'assets', 'images', 'laptop_mockup.jpg');
const outputPublicPng = path.join(__dirname, '..', 'public', 'laptop_hero_3d.png');

async function processBg() {
  console.log('Reading from:', inputPath);
  const image = sharp(inputPath);
  const { width, height } = await image.metadata();
  const { data } = await image.raw().toBuffer({ resolveWithObject: true });

  const rgbaBuffer = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const r = data[i * 3];
    const g = data[i * 3 + 1];
    const b = data[i * 3 + 2];

    // Background threshold detection (dark background around laptop)
    if (r < 32 && g < 32 && b < 40) {
      // Make background pixel 100% transparent (alpha = 0)
      rgbaBuffer[i * 4] = 0;
      rgbaBuffer[i * 4 + 1] = 0;
      rgbaBuffer[i * 4 + 2] = 0;
      rgbaBuffer[i * 4 + 3] = 0;
    } else {
      rgbaBuffer[i * 4] = r;
      rgbaBuffer[i * 4 + 1] = g;
      rgbaBuffer[i * 4 + 2] = b;
      rgbaBuffer[i * 4 + 3] = 255;
    }
  }

  // Save PNG with transparent alpha background
  await sharp(rgbaBuffer, {
    raw: { width, height, channels: 4 }
  }).png().toFile(outputPng);

  fs.copyFileSync(outputPng, outputPublicPng);

  // Also convert PNG cutout to JPG with transparent background replaced by 0x050816 for fallback
  await sharp(outputPng)
    .flatten({ background: { r: 5, g: 8, b: 22 } })
    .jpeg({ quality: 95 })
    .toFile(outputJpg);

  console.log('SUCCESS: Transparent PNG & JPG assets created!');
}

processBg().catch(err => console.error('BG Error:', err));
