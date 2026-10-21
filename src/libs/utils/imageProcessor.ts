import sharp from "sharp";
import { v4 } from "uuid";
import path from "path";
import fs from "fs";

interface ImageOptions {
  width?: number;
  height?: number;
  fit?: keyof sharp.FitEnum;
}

export async function processAndSaveImage(
  buffer: Buffer,
  originalName: string,
  address: string,
  options: ImageOptions = {},
): Promise<string> {
  const { width = 800, height = 800, fit = "contain" } = options;
  const extension = path.parse(originalName).ext || ".jpg";
  const filename = v4() + extension;
  const dir = `./uploads/${address}`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const outputPath = `${dir}/${filename}`;

  await sharp(buffer)
    .resize(width, height, {
      fit,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .toFile(outputPath);

  return `uploads/${address}/${filename}`;
}
