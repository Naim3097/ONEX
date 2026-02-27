import type { Metadata } from 'next'
import { Locale } from '@/content'

const baseUrl = 'https://onextransmission.com'

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
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}
