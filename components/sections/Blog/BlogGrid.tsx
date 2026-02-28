import Link from 'next/link'
import Image from 'next/image'
import { type Locale } from '@/content'
import { type PostMeta } from '@/lib/posts'
import FadeIn from '@/components/motion/FadeIn'

interface BlogGridProps {
  posts: PostMeta[]
  locale: Locale
}

export default function BlogGrid({ posts, locale }: BlogGridProps) {
  if (posts.length === 0) {
    return (
      <section className="section-light section-padding">
        <div className="max-w-wide mx-auto px-5 md:px-10">
          <p className="text-body text-neutral-500">No posts available yet. Check back soon.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="section-light section-padding">
      <div className="max-w-wide mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <FadeIn key={post.slug} delay={index * 0.08}>
              <Link
                href={`/${locale}/blog/${post.slug}`}
                className="group flex flex-col bg-white border border-neutral-150 overflow-hidden hover:shadow-lg transition-shadow duration-334"
              >
                {/* Cover image */}
                {post.coverImage ? (
                  <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-667 ease-ease-out-custom"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="aspect-[16/9] bg-neutral-100 flex items-center justify-center">
                    <span className="text-neutral-300 text-body-sm">One X Transmission</span>
                  </div>
                )}

                {/* Content */}
                <div className="flex flex-col flex-1 p-6 md:p-8">
                  {/* Category */}
                  <p className="overline-label text-brand-red mb-3">{post.category}</p>

                  {/* Title */}
                  <h2 className="text-body-lg font-bold text-neutral-950 leading-snug mb-3 group-hover:text-brand-red transition-colors duration-200">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-body-sm text-neutral-600 leading-relaxed flex-1 mb-6">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-150">
                    <span className="text-body-sm text-neutral-500">{post.date}</span>
                    <span className="text-body-sm text-neutral-400">{post.readTime}</span>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
