export type Palette = {
  ink: readonly [number, number, number];
  paper: readonly [number, number, number];
};

function bayerMatrix(size: number): number[][] {
  if (size === 1) return [[0]];
  const half = size / 2;
  const smaller = bayerMatrix(half);
  const offsets = [
    [0, 2],
    [3, 1],
  ];
  return Array.from({ length: size }, (_, y) =>
    Array.from(
      { length: size },
      (_, x) =>
        4 * smaller[y % half][x % half] +
        offsets[Math.floor(y / half)][Math.floor(x / half)],
    ),
  );
}

export const BAYER_8 = bayerMatrix(8);

export const palettes: Record<"light" | "dark", Palette> = {
  light: { ink: [39, 43, 46], paper: [250, 249, 247] },
  dark: { ink: [35, 38, 44], paper: [238, 236, 230] },
};

/** Eight-tone Bayer dithering keeps facial detail and the subject's original alpha. */
export function orderedDither(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  palette: Palette,
) {
  const output = new Uint8ClampedArray(pixels.length);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const i = (y * width + x) * 4;
      const alpha = pixels[i + 3];
      if (alpha === 0) continue;
      const luminance =
        (0.2126 * pixels[i] + 0.7152 * pixels[i + 1] + 0.0722 * pixels[i + 2]) /
        255;
      // Normalize the dim photograph before adding fine, low-contrast texture.
      const tone = Math.pow(
        Math.max(0, Math.min(1, (luminance - 0.025) / 0.86)),
        0.82,
      );
      const threshold = (BAYER_8[y % 8][x % 8] + 0.5) / 64;
      const scaled = tone * 7;
      const lower = Math.floor(scaled);
      const shade =
        Math.min(7, lower + (scaled - lower >= threshold ? 1 : 0)) / 7;
      for (let channel = 0; channel < 3; channel += 1) {
        output[i + channel] = Math.round(
          palette.ink[channel] +
            shade * (palette.paper[channel] - palette.ink[channel]),
        );
      }
      output[i + 3] = alpha;
    }
  }
  return output;
}

export function subjectBounds(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
) {
  let left = width;
  let top = height;
  let right = 0;
  let bottom = 0;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (pixels[(y * width + x) * 4 + 3] < 40) continue;
      left = Math.min(left, x);
      top = Math.min(top, y);
      right = Math.max(right, x + 1);
      bottom = Math.max(bottom, y + 1);
    }
  }
  return right > left && bottom > top
    ? { x: left, y: top, width: right - left, height: bottom - top }
    : { x: 0, y: 0, width, height };
}
