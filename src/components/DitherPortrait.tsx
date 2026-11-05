import { useEffect, useRef } from "react";
import portrait from "../assets/photos/bryan-portrait-cutout.png";
import original from "../assets/photos/bryan-portrait-source.png";
import { orderedDither, palettes, subjectBounds } from "./portrait/bayer";
import "./DitherPortrait.css";

export default function DitherPortrait() {
  const stage = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const originalImage = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const container = stage.current;
    const surface = canvas.current;
    const photo = image.current;
    const sourcePhoto = originalImage.current;
    if (!container || !surface || !photo || !sourcePhoto) return;
    const context = surface.getContext("2d");
    if (!context) {
      container.dataset.fallback = "true";
      container.dataset.ready = "true";
      return;
    }
    let disposed = false;
    let frame = 0;
    let crop: ReturnType<typeof subjectBounds> | undefined;
    let source: ImageData | undefined;
    let lastWidth = 0;
    let lastTheme = "";

    function render() {
      frame = 0;
      if (
        disposed ||
        !crop ||
        !photo ||
        !sourcePhoto ||
        !container ||
        !surface ||
        !context
      )
        return;
      const width = Math.min(
        1000,
        Math.max(
          320,
          Math.round(
            Math.min(
              container.clientWidth,
              (container.clientHeight * crop.width) / crop.height,
            ) * Math.min(2, Math.max(1.5, window.devicePixelRatio || 1)),
          ),
        ),
      );
      const theme =
        document.documentElement.dataset.theme === "dark" ? "dark" : "light";
      if (width === lastWidth && theme === lastTheme) return;
      if (!source || width !== lastWidth) {
        surface.width = width;
        surface.height = Math.round((width * crop.height) / crop.width);
        context.clearRect(0, 0, surface.width, surface.height);
        // Use the generated image only for its alpha mask; retain the original face pixels.
        const scaleX = sourcePhoto.naturalWidth / photo.naturalWidth;
        const scaleY = sourcePhoto.naturalHeight / photo.naturalHeight;
        context.drawImage(
          sourcePhoto,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          surface.width,
          surface.height,
        );
        context.globalCompositeOperation = "destination-in";
        context.drawImage(
          photo,
          crop.x,
          crop.y,
          crop.width,
          crop.height,
          0,
          0,
          surface.width,
          surface.height,
        );
        context.globalCompositeOperation = "source-over";
        source = context.getImageData(0, 0, surface.width, surface.height);
      }
      const result = context.createImageData(source.width, source.height);
      result.data.set(
        orderedDither(
          source.data,
          source.width,
          source.height,
          palettes[theme],
        ),
      );
      context.putImageData(result, 0, 0);
      lastWidth = width;
      lastTheme = theme;
      container.dataset.ready = "true";
      container.dataset.palette = theme;
    }
    function schedule() {
      if (!frame && !disposed) frame = requestAnimationFrame(render);
    }
    function prepare() {
      if (
        disposed ||
        !photo ||
        !sourcePhoto ||
        !photo.naturalWidth ||
        !sourcePhoto.naturalWidth
      )
        return;
      const scratch = document.createElement("canvas");
      scratch.width = photo.naturalWidth;
      scratch.height = photo.naturalHeight;
      const sample = scratch.getContext("2d", { willReadFrequently: true });
      if (!sample) return;
      sample.drawImage(photo, 0, 0);
      const pixels = sample.getImageData(0, 0, scratch.width, scratch.height);
      crop = subjectBounds(pixels.data, scratch.width, scratch.height);
      schedule();
    }
    photo.addEventListener("load", prepare);
    sourcePhoto.addEventListener("load", prepare);
    if (photo.complete && sourcePhoto.complete) prepare();
    const resize = new ResizeObserver(schedule);
    resize.observe(container);
    const theme = new MutationObserver(schedule);
    theme.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      photo.removeEventListener("load", prepare);
      sourcePhoto.removeEventListener("load", prepare);
      resize.disconnect();
      theme.disconnect();
    };
  }, []);

  return (
    <figure
      ref={stage}
      className="portrait-stage"
      role="img"
      aria-label="Portrait of Bryan Torres in Bayer ordered dithering"
    >
      <canvas ref={canvas} className="portrait-canvas" aria-hidden="true" />
      <img
        ref={originalImage}
        src={original}
        alt=""
        hidden
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
      />
      <img
        ref={image}
        src={portrait}
        alt=""
        className="portrait-fallback"
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
      />
    </figure>
  );
}
