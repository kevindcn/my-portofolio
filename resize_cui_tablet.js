const fs = require('fs');
const zlib = require('zlib');

function unfilterPNG(raw, width, height) {
  const bpp = 4;
  const stride = width * bpp;
  const data = Buffer.alloc(width * height * bpp);
  let rawOffset = 0;

  function paeth(a, b, c) {
    const p = a + b - c;
    const pa = Math.abs(p - a);
    const pb = Math.abs(p - b);
    const pc = Math.abs(p - c);
    if (pa <= pb && pa <= pc) return a;
    if (pb <= pc) return b;
    return c;
  }

  for (let y = 0; y < height; y++) {
    const filter = raw[rawOffset++];
    for (let x = 0; x < stride; x++) {
      const byte = raw[rawOffset++];
      const left = x >= bpp ? data[y * stride + x - bpp] : 0;
      const up = y > 0 ? data[(y - 1) * stride + x] : 0;
      const upLeft = y > 0 && x >= bpp ? data[(y - 1) * stride + x - bpp] : 0;
      let val = 0;
      if (filter === 0) val = byte;
      else if (filter === 1) val = (byte + left) & 0xff;
      else if (filter === 2) val = (byte + up) & 0xff;
      else if (filter === 3) val = (byte + Math.floor((left + up) / 2)) & 0xff;
      else if (filter === 4) val = (byte + paeth(left, up, upLeft)) & 0xff;
      data[y * stride + x] = val;
    }
  }
  return data;
}

function encodePNG(pixels, width, height) {
  const bpp = 4;
  const stride = width * bpp;
  const raw = Buffer.alloc((stride + 1) * height);
  let rawOffset = 0;

  for (let y = 0; y < height; y++) {
    raw[rawOffset++] = 0; // Filter 0 (None)
    pixels.copy(raw, rawOffset, y * stride, (y + 1) * stride);
    rawOffset += stride;
  }

  const idatData = zlib.deflateSync(raw, { level: 9 });
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;

  function makeChunk(type, data) {
    const chunk = Buffer.alloc(4 + 4 + data.length + 4);
    chunk.writeUInt32BE(data.length, 0);
    chunk.write(type, 4, 4, 'ascii');
    data.copy(chunk, 8);
    const crcBuf = Buffer.concat([Buffer.from(type, 'ascii'), data]);
    const crc = zlib.crc32(crcBuf) >>> 0;
    chunk.writeUInt32BE(crc, 8 + data.length);
    return chunk;
  }

  return Buffer.concat([
    signature,
    makeChunk('IHDR', ihdrData),
    makeChunk('IDAT', idatData),
    makeChunk('IEND', Buffer.alloc(0))
  ]);
}

const inputBuf = fs.readFileSync('public/projects/cui-fig-backup.png');
let offset = 8;
const idatChunks = [];
while (offset < inputBuf.length) {
  const len = inputBuf.readUInt32BE(offset);
  const type = inputBuf.slice(offset + 4, offset + 8).toString('ascii');
  if (type === 'IDAT') idatChunks.push(inputBuf.slice(offset + 8, offset + 8 + len));
  offset += 12 + len;
}

const raw = zlib.inflateSync(Buffer.concat(idatChunks));
const srcWidth = 1142;
const srcHeight = 773;
const srcPixels = unfilterPNG(raw, srcWidth, srcHeight);

const tabMinX = 246;
const tabMaxX = 896;
const tabMinY = 47;
const tabMaxY = 723;
const tabW = tabMaxX - tabMinX;
const tabH = tabMaxY - tabMinY;

// Background color
const bgR = 196, bgG = 255, bgB = 237, bgA = 255;

const dstWidth = 1142;
const dstHeight = 773;
const dstPixels = Buffer.alloc(dstWidth * dstHeight * 4);

for (let i = 0; i < dstWidth * dstHeight; i++) {
  dstPixels[i * 4] = bgR;
  dstPixels[i * 4 + 1] = bgG;
  dstPixels[i * 4 + 2] = bgB;
  dstPixels[i * 4 + 3] = bgA;
}

// User requested: "di perbesar seperti semula namun di kurangkan hanya beberapa saja jadi tidak terlalu besar seperti ukuran semula"
// Original height: 676px (scale 1.0)
// Now: 605px (scale = ~0.895, only ~10% reduction from original)
// This leaves 84px top/bottom padding instead of original 47px, preventing the frame overlap while keeping the tablet large & prominent!
const targetTabH = 605;
const scale = targetTabH / tabH;
const targetTabW = Math.round(tabW * scale);

const dstStartX = Math.round((dstWidth - targetTabW) / 2);
const dstStartY = Math.round((dstHeight - targetTabH) / 2);

console.log({
  scale,
  targetTabW,
  targetTabH,
  dstStartX,
  dstStartY,
  topPadding: dstStartY,
  bottomPadding: dstHeight - (dstStartY + targetTabH)
});

for (let dy = 0; dy < targetTabH; dy++) {
  const sy = tabMinY + dy / scale;
  const y0 = Math.floor(sy);
  const y1 = Math.min(srcHeight - 1, y0 + 1);
  const fy = sy - y0;

  for (let dx = 0; dx < targetTabW; dx++) {
    const sx = tabMinX + dx / scale;
    const x0 = Math.floor(sx);
    const x1 = Math.min(srcWidth - 1, x0 + 1);
    const fx = sx - x0;

    const idx00 = (y0 * srcWidth + x0) * 4;
    const idx10 = (y0 * srcWidth + x1) * 4;
    const idx01 = (y1 * srcWidth + x0) * 4;
    const idx11 = (y1 * srcWidth + x1) * 4;

    const dstIdx = ((dstStartY + dy) * dstWidth + (dstStartX + dx)) * 4;

    for (let c = 0; c < 4; c++) {
      const top = srcPixels[idx00 + c] * (1 - fx) + srcPixels[idx10 + c] * fx;
      const bot = srcPixels[idx01 + c] * (1 - fx) + srcPixels[idx11 + c] * fx;
      dstPixels[dstIdx + c] = Math.round(top * (1 - fy) + bot * fy);
    }
  }
}

const outPng = encodePNG(dstPixels, dstWidth, dstHeight);
fs.writeFileSync('public/projects/cui-fig.png', outPng);
console.log('Successfully wrote resized image to public/projects/cui-fig.png, size:', outPng.length);
