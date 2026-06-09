import { type Locale } from '@/content'
import { getPostsByLocale } from '@/lib/posts'
import BlogHero from '@/components/sections/Blog/BlogHero'
import BlogGrid from '@/components/sections/Blog/BlogGrid'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  return {
    title: 'Gearbox Guides & Technical Insights | One X Transmission Shah Alam',
    description:
      'Expert articles on CVT and automatic gearbox repair, maintenance costs, and warning signs — written by One X Transmission specialists in Shah Alam.',
    alternates: {
      canonical: `https://www.onextransmission.com/${l}/blog`,
      languages: {
        'x-default': 'https://www.onextransmission.com/en/blog',
        ms: 'https://www.onextransmission.com/ms/blog',
        zh: 'https://www.onextransmission.com/zh/blog',
      },
    },
  }
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = l as Locale
  const posts = getPostsByLocale(l)

  return (
    <>
      <BlogHero />
      <BlogGrid posts={posts} locale={locale} />
    </>
  )
}
