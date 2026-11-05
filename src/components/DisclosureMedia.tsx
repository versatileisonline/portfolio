export default function DisclosureMedia({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure className="disclosure-media">
      <img src={src} alt={alt} width={width} height={height} loading="lazy" />
    </figure>
  );
}
