/**
 * One-off script: convert all JPG/JPEG/PNG images in public/assets/images to WebP.
 * Originals are kept alongside the new .webp files.
 * Run: node scripts/convert-to-webp.mjs
 */
import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.join(__dirname, "..", "public", "assets", "images");

// Skip browser-specific formats that must stay PNG
const SKIP = new Set(["favicon.png", "apple-touch-icon.png"]);

const files = await readdir(imagesDir);
const convertible = files.filter((f) => {
  if (SKIP.has(f)) return false;
  return /\.(jpe?g|png)$/i.test(f);
});

console.log(`Converting ${convertible.length} images to WebP…\n`);

for (const file of convertible) {
  const input = path.join(imagesDir, file);
  const output = path.join(imagesDir, file.replace(/\.[^.]+$/, ".webp"));

  const before = (await stat(input)).size;
  await sharp(input).webp({ quality: 82 }).toFile(output);
  const after = (await stat(output)).size;
  const saving = (((before - after) / before) * 100).toFixed(1);

  console.log(`  ${file} → ${path.basename(output)}  (${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB, -${saving}%)`);
}

console.log("\nDone. Originals kept — delete them once paths are updated.");
