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
}

export function generatePageMetadata({ title, description, locale, page, path }: PageMeta): Metadata {
  const pagePath = path ?? (page && page !== 'home' ? `/${page}` : '')
  const url = `${baseUrl}/${locale}${pagePath}`

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
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'One X Transmission — Gearbox Specialist Shah Alam',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}
