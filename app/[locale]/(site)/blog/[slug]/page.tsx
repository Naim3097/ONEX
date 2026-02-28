import { notFound } from 'next/navigation'
import { type Locale } from '@/content'
import { getPost, getAllPostSlugs } from '@/lib/posts'
import PostHero from '@/components/sections/Blog/PostHero'
import PostContent from '@/components/sections/Blog/PostContent'

interface Params {
  locale: string
  slug: string
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  const locales = ['en', 'ms', 'zh']
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  )
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { locale: l, slug } = await params
  const post = await getPost(slug)

  if (!post) return {}

  return {
    title: `${post.title} | One X Transmission`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | One X Transmission`,
      description: post.excerpt,
      images: post.coverImage ? [{ url: post.coverImage }] : [],
      type: 'article',
      publishedTime: post.date,
    },
    alternates: {
      canonical: `https://onextransmission.com/${l}/blog/${slug}`,
    },
  }
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { locale: l, slug } = await params
  const locale = l as Locale
  const post = await getPost(slug)

  if (!post) notFound()

  return (
    <>
      <PostHero post={post} locale={locale} />
      <PostContent contentHtml={post.contentHtml} locale={locale} />
    </>
  )
}
