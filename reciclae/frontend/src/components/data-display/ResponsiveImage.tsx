export default function ResponsiveImage(
  { src, alt }:
    Readonly<{ src: string, alt: string }>
) {
  return (
    <img
      className="responsive-img"
      src={src}
      alt={alt}
    />
  )
}
