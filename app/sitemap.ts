import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.onextransmission.com'
  const locales = ['en', 'ms', 'zh']
  const pages = ['', '/about', '/capabilities', '/process', '/faq', '/contact', '/blog', '/locations/penang']

  const priorities: Record<string, number> = {
    '':                   1.0,
    '/capabilities':      0.9,
    '/contact':           0.9,
    '/locations/penang':  0.9,
    '/about':             0.8,
    '/faq':               0.8,
    '/blog':              0.8,
    '/process':           0.7,
  }

  const frequencies: Record<string, 'weekly' | 'monthly'> = {
    '':                   'weekly',
    '/capabilities':      'monthly',
    '/contact':           'monthly',
    '/locations/penang':  'weekly',
    '/about':             'monthly',
    '/faq':               'monthly',
    '/blog':              'weekly',
    '/process':           'monthly',
  }

  const entries: MetadataRoute.Sitemap = []

  // Static pages
  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: frequencies[page] ?? 'monthly',
        priority: priorities[page] ?? 0.7,
      })
    }
  }

  // Blog post pages — emit each post only under its own language locale
  // (avoids 3x near-duplicate URLs across en/ms/zh for single-language posts)
  const posts = getAllPosts()
  for (const post of posts) {
    entries.push({
      url: `${baseUrl}/${post.locale}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  }

  return entries
}
