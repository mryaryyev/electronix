import sharp from "sharp";
import { v4 } from "uuid";
import path from "path";
import fs from "fs";

interface ImageOptions {
  width?: number;
  height?: number;
  fit?: keyof sharp.FitEnum;
  normalize?: boolean;
}

const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };

/**
 * Product photo cleanup: gray background -> white, trim empty edges,
 * then center the product on a white square so every product looks the same size.
 */
async function normalizeProductImage(
  buffer: Buffer,
  size: number,
): Promise<Buffer> {
  let image = await sharp(buffer)
    .flatten({ background: WHITE })
    .removeAlpha()
    .png()
    .toBuffer();

  // Background color = mean of the four corner pixels
  const { data, info } = await sharp(image)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const pixel = (x: number, y: number) => {
    const i = (y * info.width + x) * info.channels;
    return (data[i] + data[i + 1] + data[i + 2]) / 3;
  };
  const w = info.width - 1;
  const h = info.height - 1;
  const background =
    (pixel(0, 0) + pixel(w, 0) + pixel(0, h) + pixel(w, h)) / 4;
  if (background > 0 && background < 254) {
    image = await sharp(image)
      .linear(255 / background, 0)
      .png()
      .toBuffer();
  }

  const trimmed = await sharp(image)
    .trim({ background: "#ffffff", threshold: 40 })
    .png()
    .toBuffer();
  const meta = await sharp(trimmed).metadata();
  const tw = meta.width ?? size;
  const th = meta.height ?? size;

  // Same visual area for every product; longest side keeps 10% padding
  const inner = Math.round(size * 0.8);
  const area = Math.pow(size * 0.5875, 2);
  const k = Math.min(Math.sqrt(area / (tw * th)), inner / tw, inner / th);
  const fitted = await sharp(trimmed)
    .resize(Math.round(tw * k), Math.round(th * k))
    .png()
    .toBuffer();
  const fm = await sharp(fitted).metadata();

  return sharp({
    create: { width: size, height: size, channels: 3, background: WHITE },
  })
    .composite([
      {
        input: fitted,
        left: Math.round((size - (fm.width ?? 0)) / 2),
        top: Math.round((size - (fm.height ?? 0)) / 2),
      },
    ])
    .png()
    .toBuffer();
}

export async function processAndSaveImage(
  buffer: Buffer,
  originalName: string,
  address: string,
  options: ImageOptions = {},
): Promise<string> {
  const {
    width = 800,
    height = 800,
    fit = "contain",
    normalize = false,
  } = options;
  const extension = path.parse(originalName).ext || ".jpg";
  const filename = v4() + extension;
  const dir = `./uploads/${address}`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const outputPath = `${dir}/${filename}`;

  if (normalize) {
    const normalized = await normalizeProductImage(
      buffer,
      Math.min(width, height),
    );
    await sharp(normalized).toFile(outputPath);
  } else {
    await sharp(buffer)
      .resize(width, height, {
        fit,
        background: WHITE,
      })
      .toFile(outputPath);
  }

  return `uploads/${address}/${filename}`;
}
