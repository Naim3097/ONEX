import { notFound } from 'next/navigation'
import { type Locale } from '@/content'
import { getPost, getAllPosts } from '@/lib/posts'
import PostHero from '@/components/sections/Blog/PostHero'
import PostContent from '@/components/sections/Blog/PostContent'

interface Params {
  locale: string
  slug: string
}

// Each post is single-language: only build it under its own locale.
export const dynamicParams = false

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ locale: post.locale, slug: post.slug }))
}

const SITE = 'https://www.onextransmission.com'

function ogLocale(locale: string) {
  return locale === 'ms' ? 'ms_MY' : locale === 'zh' ? 'zh_MY' : 'en_MY'
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params
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
      locale: ogLocale(post.locale),
    },
    alternates: {
      // Canonical points to the post's own language URL, consolidating any
      // other-locale variants instead of creating duplicate content.
      canonical: `${SITE}/${post.locale}/blog/${slug}`,
    },
  }
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { locale: l, slug } = await params
  const locale = l as Locale
  const post = await getPost(slug)

  if (!post) notFound()

  const postUrl = `${SITE}/${post.locale}/blog/${slug}`
  const imageUrl = post.coverImage
    ? post.coverImage.startsWith('http')
      ? post.coverImage
      : `${SITE}${post.coverImage}`
    : `${SITE}/images/og-image.jpg`

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    image: imageUrl,
    inLanguage: post.locale === 'ms' ? 'ms-MY' : post.locale === 'zh' ? 'zh-MY' : 'en-MY',
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
    author: {
      '@type': 'Organization',
      name: 'One X Transmission',
      url: SITE,
    },
    publisher: {
      '@type': 'Organization',
      name: 'One X Transmission',
      logo: { '@type': 'ImageObject', url: `${SITE}/images/logo-black.png` },
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/${post.locale}` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/${post.locale}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PostHero post={post} locale={locale} />
      <PostContent contentHtml={post.contentHtml} locale={locale} />
    </>
  )
}
