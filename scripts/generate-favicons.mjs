// Generate all favicon assets from public/favicon.svg.
// Run: `node scripts/generate-favicons.mjs`
// Outputs into public/ (PNG sizes) and app/favicon.ico (multi-res ICO).
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const svgPath = path.join(root, "public", "favicon.svg");
const publicDir = path.join(root, "public");
const appDir = path.join(root, "app");

const svgBuffer = fs.readFileSync(svgPath);

const pngTargets = [
  { size: 16,  out: path.join(publicDir, "favicon-16x16.png") },
  { size: 32,  out: path.join(publicDir, "favicon-32x32.png") },
  { size: 48,  out: path.join(publicDir, "favicon-48x48.png") },
  { size: 180, out: path.join(publicDir, "apple-touch-icon.png") },
  { size: 192, out: path.join(publicDir, "android-chrome-192x192.png") },
  { size: 512, out: path.join(publicDir, "android-chrome-512x512.png") },
  // Next.js conventions (these win over metadata.icons if present):
  { size: 512, out: path.join(appDir, "icon.png") },
  { size: 180, out: path.join(appDir, "apple-icon.png") },
];

async function rasterize(size) {
  return await sharp(svgBuffer, { density: 384 })
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

// Build a multi-resolution .ico from 16/32/48 PNGs (manual ICO assembly).
function buildIco(pngBuffers) {
  const count = pngBuffers.length;
  const headerSize = 6 + count * 16;
  let totalSize = headerSize;
  pngBuffers.forEach((b) => { totalSize += b.png.length; });

  const buf = Buffer.alloc(totalSize);
  // ICONDIR header
  buf.writeUInt16LE(0, 0);          // reserved
  buf.writeUInt16LE(1, 2);          // type: 1 = icon
  buf.writeUInt16LE(count, 4);      // image count

  let dataOffset = headerSize;
  pngBuffers.forEach((entry, i) => {
    const off = 6 + i * 16;
    const dim = entry.size === 256 ? 0 : entry.size;
    buf.writeUInt8(dim, off + 0);                        // width
    buf.writeUInt8(dim, off + 1);                        // height
    buf.writeUInt8(0,   off + 2);                        // colour palette
    buf.writeUInt8(0,   off + 3);                        // reserved
    buf.writeUInt16LE(1, off + 4);                       // colour planes
    buf.writeUInt16LE(32, off + 6);                      // bits per pixel
    buf.writeUInt32LE(entry.png.length, off + 8);        // image data size
    buf.writeUInt32LE(dataOffset, off + 12);             // data offset
    entry.png.copy(buf, dataOffset);
    dataOffset += entry.png.length;
  });
  return buf;
}

async function main() {
  fs.mkdirSync(publicDir, { recursive: true });
  fs.mkdirSync(appDir, { recursive: true });

  // Generate PNG targets
  for (const { size, out } of pngTargets) {
    const png = await rasterize(size);
    fs.writeFileSync(out, png);
    console.log(`  wrote ${path.relative(root, out)} (${size}x${size}, ${png.length} bytes)`);
  }

  // Build favicon.ico from 16, 32, 48
  const icoSizes = [16, 32, 48];
  const icoEntries = [];
  for (const size of icoSizes) {
    icoEntries.push({ size, png: await rasterize(size) });
  }
  const ico = buildIco(icoEntries);
  const icoOut = path.join(appDir, "favicon.ico");
  fs.writeFileSync(icoOut, ico);
  console.log(`  wrote ${path.relative(root, icoOut)} (multi-res 16/32/48, ${ico.length} bytes)`);

  // Also place a copy of favicon.ico in public/ (some crawlers fetch /favicon.ico from root).
  fs.writeFileSync(path.join(publicDir, "favicon.ico"), ico);
  console.log("  wrote public/favicon.ico (mirror)");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
