import Image from 'next/image'

interface ResponsiveImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  sizes?: string
  fill?: boolean
}

export default function ResponsiveImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '100vw',
  fill = false,
}: ResponsiveImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      className={className}
      sizes={sizes}
      priority={priority}
      placeholder="blur"
      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMUExQTFBIi8+PC9zdmc+"
    />
  )
}
