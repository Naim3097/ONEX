import Link from 'next/link'
import { type Locale, business } from '@/content'
import FadeIn from '@/components/motion/FadeIn'

interface PostContentProps {
  contentHtml: string
  locale: Locale
}

export default function PostContent({ contentHtml, locale }: PostContentProps) {
  return (
    <section className="section-light py-16 md:py-24">
      <div className="max-w-narrow mx-auto px-5 md:px-10">
        <FadeIn>
          {/* Prose content */}
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </FadeIn>

        {/* CTA block */}
        <FadeIn className="mt-16 md:mt-20 border-t border-neutral-200 pt-12">
          <p className="overline-label text-brand-red mb-4">One X Transmission</p>
          <h2 className="text-display-sm font-bold text-neutral-950 max-w-sm mb-4">
            Have a gearbox concern?
          </h2>
          <p className="text-body text-neutral-600 mb-8">
            Our free professional diagnosis gives you a full written report — before any repair decision is made.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={business.whatsappInquiry}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-primary"
            >
              WhatsApp Us
            </a>
            <Link href={`/${locale}/contact`} className="cta-secondary">
              Contact Page
            </Link>
          </div>
        </FadeIn>

        {/* Back link */}
        <FadeIn className="mt-12">
          <Link
            href={`/${locale}/blog`}
            className="cta-ghost inline-flex items-center gap-2 text-body-sm"
          >
            <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
