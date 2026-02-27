'use client'

import { getContent, galleryImages, type Locale } from '@/content'
import FadeIn from '@/components/motion/FadeIn'
import RevealText from '@/components/motion/RevealText'
import Text from '@/components/typography/Text'
import Image from 'next/image'

interface GalleryPreviewProps {
  locale: Locale
}

export default function GalleryPreview({ locale }: GalleryPreviewProps) {
  const content = getContent(locale)
  const gallery = content.home.gallery

  return (
    <section className="section-light section-padding">
      <div className="max-w-wide mx-auto px-5 md:px-10">
        <div className="text-center mb-12 md:mb-16">
          <FadeIn>
            <Text variant="overline" className="text-brand-red mb-5">
              {gallery.overline}
            </Text>
          </FadeIn>
          <RevealText
            text={gallery.headline}
            as="h2"
            className="text-h2 text-neutral-950"
          />
        </div>

        {/* Masonry columns — each image at its true portrait proportion */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
          {galleryImages.map((image, i) => (
            <FadeIn key={image.src} delay={0.06 * i} className="break-inside-avoid mb-4">
              <div className="relative overflow-hidden bg-neutral-100 group">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="w-full h-auto transition-transform duration-667 ease-ease-out-custom group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  loading={i < 2 ? 'eager' : 'lazy'}
                />
                {/* Caption overlay */}
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-334">
                  <p className="text-caption text-white/90 leading-snug">{image.alt}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
