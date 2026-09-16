const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// CRC32 Table Generator
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function createChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);

  const checksumBuf = Buffer.alloc(4);
  const typeAndData = Buffer.concat([typeBuf, data]);
  checksumBuf.writeUInt32BE(crc32(typeAndData), 0);

  return Buffer.concat([lenBuf, typeAndData, checksumBuf]);
}

function encodePNG(width, height, getPixelRGBA) {
  // Signature
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // 8-bit depth
  ihdr[9] = 6; // Color type 6 (RGBA)
  ihdr[10] = 0; // Compression
  ihdr[11] = 0; // Filter
  ihdr[12] = 0; // Interlace
  const ihdrChunk = createChunk('IHDR', ihdr);

  // IDAT
  const rawData = Buffer.alloc(height * (1 + width * 4));
  let offset = 0;
  for (let y = 0; y < height; y++) {
    rawData[offset++] = 0; // Filter byte: None
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = getPixelRGBA(x, y, width, height);
      rawData[offset++] = r;
      rawData[offset++] = g;
      rawData[offset++] = b;
      rawData[offset++] = a;
    }
  }

  const compressedData = zlib.deflateSync(rawData);
  const idatChunk = createChunk('IDAT', compressedData);

  // IEND
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([sig, ihdrChunk, idatChunk, iendChunk]);
}

// Function to draw Apple + Linear style </ > brand icon
// Background: #050505
// Icon: </> in #A855F7 (R:168, G:85, B:247)
function renderBrandIconPixel(x, y, w, h) {
  const nx = (x + 0.5) / w;
  const ny = (y + 0.5) / h;

  // Background color #050505
  let bgR = 5, bgG = 5, bgB = 5, bgA = 255;
  let fgR = 168, fgG = 85, fgB = 247, fgA = 255;

  // Optional rounded corner container if desired or full bleed dark card
  // Let's draw crisp centered "</>" symbol using stroke distance math
  // Left angle bracket '<': segments from (0.35, 0.35) -> (0.22, 0.5) -> (0.35, 0.65)
  // Slash '/': segment from (0.57, 0.32) -> (0.43, 0.68)
  // Right angle bracket '>': segments from (0.65, 0.35) -> (0.78, 0.5) -> (0.65, 0.65)

  const strokeWidth = 0.058;

  function distToSegment(px, py, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const lenSq = dx * dx + dy * dy;
    let t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / lenSq));
    const projX = x1 + t * dx;
    const projY = y1 + t * dy;
    const dX = px - projX;
    const dY = py - projY;
    return Math.sqrt(dX * dX + dY * dY);
  }

  // Calculate distance to glyph paths
  let minDist = 999;

  // Left '<'
  minDist = Math.min(minDist, distToSegment(nx, ny, 0.34, 0.36, 0.22, 0.50));
  minDist = Math.min(minDist, distToSegment(nx, ny, 0.22, 0.50, 0.34, 0.64));

  // Slash '/'
  minDist = Math.min(minDist, distToSegment(nx, ny, 0.55, 0.32, 0.45, 0.68));

  // Right '>'
  minDist = Math.min(minDist, distToSegment(nx, ny, 0.66, 0.36, 0.78, 0.50));
  minDist = Math.min(minDist, distToSegment(nx, ny, 0.78, 0.50, 0.66, 0.64));

  // Anti-aliased alpha blending
  const halfStroke = strokeWidth / 2;
  const aaWidth = 1.5 / Math.min(w, h);
  let alpha = 0;

  if (minDist <= halfStroke - aaWidth) {
    alpha = 1.0;
  } else if (minDist < halfStroke + aaWidth) {
    alpha = 0.5 + (halfStroke - minDist) / (2 * aaWidth);
  }

  alpha = Math.max(0, Math.min(1, alpha));

  // Blend fg onto bg
  const r = Math.round(bgR * (1 - alpha) + fgR * alpha);
  const g = Math.round(bgG * (1 - alpha) + fgG * alpha);
  const b = Math.round(bgB * (1 - alpha) + fgB * alpha);

  return [r, g, b, 255];
}

// Generate all sizes
const sizes = [16, 32, 48, 64, 180, 192, 512];
const publicDir = path.join(__dirname, '..', 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

sizes.forEach(size => {
  const pngBuf = encodePNG(size, size, renderBrandIconPixel);
  let fileName = `favicon-${size}x${size}.png`;
  if (size === 180) fileName = 'apple-touch-icon.png';
  if (size === 192) fileName = 'logo192.png';
  if (size === 512) fileName = 'logo512.png';
  if (size === 32) {
    fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), pngBuf);
  }
  if (size === 16) {
    fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), pngBuf);
  }
  
  fs.writeFileSync(path.join(publicDir, fileName), pngBuf);
  console.log(`Generated ${fileName} (${size}x${size})`);
});

// Also create ICO file wrapping 32x32 PNG for maximum compatibility
const png32 = encodePNG(32, 32, renderBrandIconPixel);
const icoHeader = Buffer.alloc(6);
icoHeader.writeUInt16LE(0, 0); // Reserved
icoHeader.writeUInt16LE(1, 2); // Type 1 = ICO
icoHeader.writeUInt16LE(1, 4); // Number of images = 1

const icoDir = Buffer.alloc(16);
icoDir.writeUInt8(32, 0); // Width
icoDir.writeUInt8(32, 1); // Height
icoDir.writeUInt8(0, 2);  // Palette
icoDir.writeUInt8(0, 3);  // Reserved
icoDir.writeUInt16LE(1, 4); // Color planes
icoDir.writeUInt16LE(32, 6); // Bits per pixel
icoDir.writeUInt32LE(png32.length, 8); // Size of image data
icoDir.writeUInt32LE(22, 12); // Offset to image data (6 + 16 = 22)

const icoFile = Buffer.concat([icoHeader, icoDir, png32]);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoFile);
console.log('Generated favicon.ico (32x32 wrapped)');

// Also generate SVG favicon
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <rect width="512" height="512" rx="96" fill="#050505" />
  <path d="M174.08 184.32 L112.64 256 L174.08 327.68 M281.6 163.84 L230.4 348.16 M337.92 184.32 L399.36 256 L337.92 327.68" 
        fill="none" 
        stroke="#A855F7" 
        stroke-width="30" 
        stroke-linecap="round" 
        stroke-linejoin="round" />
</svg>`;

fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent);
console.log('Generated favicon.svg');
