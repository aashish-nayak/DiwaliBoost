import sharp from "sharp";
import { mkdir } from "node:fs/promises";

await mkdir("public/images", { recursive: true });
await sharp("assets/source/mithai-source.png")
  .resize(1200, 800, { fit: "cover" })
  .webp({ quality: 82 })
  .toFile("public/images/mithai-hero.webp");
await sharp("assets/source/mithai-source.png")
  .resize(640)
  .webp({ quality: 80 })
  .toFile("public/images/mithai-hero-640.webp");
await sharp("assets/source/mithai-source.png")
  .resize(960)
  .webp({ quality: 80 })
  .toFile("public/images/mithai-hero-960.webp");
const source = "assets/source/products-source.png";
const { width, height } = await sharp(source).metadata();
const cellWidth = Math.floor(width / 3);
const cellHeight = Math.floor(height / 2);
const names = [
  "kaju-katli",
  "motichoor-ladoo",
  "pista-barfi",
  "gulab-jamun",
  "kesar-peda",
  "celebration-box",
];
for (const [index, name] of names.entries()) {
  await sharp(source)
    .extract({
      left: (index % 3) * cellWidth,
      top: Math.floor(index / 3) * cellHeight,
      width: cellWidth,
      height: cellHeight,
    })
    .resize(512, 512, { fit: "cover" })
    .webp({ quality: 82 })
    .toFile(`public/images/${name}.webp`);
}
const socialTitle = Buffer.from(
  '<svg width="1200" height="630"><rect x="0" y="0" width="600" height="630" fill="#fcf8ef"/><text x="65" y="150" font-family="Georgia" font-size="53" fill="#742e36">DiwaliBoost</text><text x="65" y="280" font-family="Georgia" font-size="48" fill="#342b28">Your Diwali offers.</text><text x="65" y="345" font-family="Georgia" font-size="48" fill="#742e36">A beautiful home.</text><text x="65" y="440" font-family="Arial" font-size="24" fill="#6e635b">Festive sale pages from INR 499</text></svg>',
);
await sharp("assets/source/mithai-source.png")
  .resize(1200, 630, { fit: "cover", position: "right" })
  .composite([{ input: socialTitle }])
  .jpeg({ quality: 85 })
  .toFile("public/images/social-preview.jpg");
console.log("Optimised hero, six product images and social preview.");
