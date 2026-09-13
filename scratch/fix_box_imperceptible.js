const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = 'C:\\Users\\sayan\\.gemini\\antigravity\\brain\\4c21e87f-34de-4985-b000-e6c1e36b0552\\exact_reference_macbook_hero_1785550737475.jpg';
const outputJpg = path.join(__dirname, '..', 'src', 'assets', 'images', 'laptop_mockup.jpg');
const outputPublicJpg = path.join(__dirname, '..', 'public', 'laptop_hero_3d.jpg');

async function processImage() {
  console.log('Processing image:', inputPath);
  const image = sharp(inputPath);
  const { width, height } = await image.metadata();
  const { data } = await image.raw().toBuffer({ resolveWithObject: true });

  const rgbaBuffer = Buffer.alloc(width * height * 4);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x);
      const r = data[idx * 3];
      const g = data[idx * 3 + 1];
      const b = data[idx * 3 + 2];

      // Detect background pixels of the outer card box (dark low-luminance pixels)
      if (r < 32 && g < 28 && b < 45) {
        // Distance from center for smooth glow blending
        const dx = (x - width / 2) / (width / 2);
        const dy = (y - height * 0.55) / (height / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Match exact website background color #030303 / #050816
        const glowFactor = Math.max(0, 1 - dist * 1.1);
        const bgR = Math.round(3 + glowFactor * 20);
        const bgG = Math.round(3 + glowFactor * 10);
        const bgB = Math.round(3 + glowFactor * 35);

        rgbaBuffer[idx * 4] = bgR;
        rgbaBuffer[idx * 4 + 1] = bgG;
        rgbaBuffer[idx * 4 + 2] = bgB;
        rgbaBuffer[idx * 4 + 3] = 255;
      } else {
        rgbaBuffer[idx * 4] = r;
        rgbaBuffer[idx * 4 + 1] = g;
        rgbaBuffer[idx * 4 + 2] = b;
        rgbaBuffer[idx * 4 + 3] = 255;
      }
    }
  }

  await sharp(rgbaBuffer, {
    raw: { width, height, channels: 4 }
  }).jpeg({ quality: 98 }).toFile(outputJpg);

  fs.copyFileSync(outputJpg, outputPublicJpg);
  console.log('SUCCESS: Seamless image generated without outer box!');
}

processImage().catch(console.error);
