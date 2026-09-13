const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = 'C:\\Users\\sayan\\.gemini\\antigravity\\brain\\4c21e87f-34de-4985-b000-e6c1e36b0552\\perfect_seamless_hero_laptop_1785550624963.jpg';

const targetAssetsJpg = path.join(__dirname, '..', 'src', 'assets', 'images', 'laptop_mockup.jpg');
const targetAssetsPng = path.join(__dirname, '..', 'src', 'assets', 'images', 'laptop_mockup.png');
const targetPublicJpg = path.join(__dirname, '..', 'public', 'laptop_hero_3d.jpg');
const targetPublicPng = path.join(__dirname, '..', 'public', 'laptop_hero_3d.png');

async function fixSeamless() {
  console.log('Processing seamless asset from:', inputPath);
  
  // Save high-quality JPG with seamless #050816 fill (no checkerboard, no box)
  await sharp(inputPath)
    .jpeg({ quality: 98 })
    .toFile(targetAssetsJpg);

  fs.copyFileSync(targetAssetsJpg, targetPublicJpg);

  // Also save PNG version
  await sharp(inputPath)
    .png()
    .toFile(targetAssetsPng);

  fs.copyFileSync(targetAssetsPng, targetPublicPng);

  console.log('SUCCESS: All hero laptop assets updated cleanly!');
}

fixSeamless().catch(err => console.error(err));
