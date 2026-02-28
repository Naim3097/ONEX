import Image from 'next/image'
import Link from 'next/link'
import { type Locale } from '@/content'
import { type PostMeta } from '@/lib/posts'
import FadeIn from '@/components/motion/FadeIn'
import RevealText from '@/components/motion/RevealText'

interface PostHeroProps {
  post: PostMeta
  locale: Locale
}

export default function PostHero({ post, locale }: PostHeroProps) {
  return (
    <section className="section-dark pt-28 md:pt-32 pb-16 md:pb-20 min-h-[55vh] relative flex items-end overflow-hidden">
      {/* Cover image overlay */}
      {post.coverImage && (
        <>
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/40" />
        </>
      )}

      <div className="relative z-10 max-w-wide mx-auto px-5 md:px-10 w-full">
        {/* Breadcrumb */}
        <FadeIn immediate className="mb-6">
          <nav className="flex items-center gap-2 text-body-sm text-neutral-500" aria-label="Breadcrumb">
            <Link href={`/${locale}`} className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href={`/${locale}/blog`} className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-neutral-400 truncate max-w-[200px]">{post.title}</span>
          </nav>
        </FadeIn>

        {/* Category */}
        <FadeIn immediate>
          <p className="overline-label text-brand-red mb-4">{post.category}</p>
        </FadeIn>

        {/* Title */}
        <RevealText
          as="h1"
          text={post.title}
          className="text-display-sm font-bold text-white max-w-3xl"
          immediate
        />

        {/* Meta */}
        <FadeIn delay={0.2} immediate className="mt-6 flex items-center gap-6">
          <span className="text-body-sm text-neutral-400">{post.date}</span>
          <span className="w-1 h-1 rounded-full bg-neutral-600" />
          <span className="text-body-sm text-neutral-400">{post.readTime}</span>
        </FadeIn>
      </div>
    </section>
  )
}
