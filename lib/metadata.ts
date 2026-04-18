import type { Metadata } from 'next'
import { Locale } from '@/content'

const baseUrl = 'https://onextransmission.com'
const ogImage = `${baseUrl}/images/og-image.jpg`

interface PageMeta {
  title: string
  description: string
  locale: Locale
  page?: string
  path?: string
  image?: string
}

export function generatePageMetadata({ title, description, locale, page, path, image }: PageMeta): Metadata {
  const pagePath = path ?? (page && page !== 'home' ? `/${page}` : '')
  const url = `${baseUrl}/${locale}${pagePath}`
  const ogImg = image ? `${baseUrl}${image}` : ogImage

  const alternates: Record<string, string> = {}
  for (const loc of ['en', 'ms', 'zh']) {
    alternates[loc === 'en' ? 'x-default' : loc] = `${baseUrl}/${loc}${pagePath}`
  }

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      locale: locale === 'ms' ? 'ms_MY' : locale === 'zh' ? 'zh_MY' : 'en_MY',
      images: [
        {
          url: ogImg,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImg],
    },
  }
}
