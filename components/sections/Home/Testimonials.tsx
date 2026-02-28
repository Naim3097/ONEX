import { testimonials } from '@/content'
import FadeIn from '@/components/motion/FadeIn'
import RevealText from '@/components/motion/RevealText'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: rating }).map((_, i) => (
        <svg
          key={i}
          aria-hidden="true"
          className="w-4 h-4 text-brand-red"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="section-dark section-padding">
      <div className="max-w-wide mx-auto px-5 md:px-10">

        {/* Section header */}
        <FadeIn className="mb-16 md:mb-20">
          <p className="overline-label text-brand-red mb-4">Client Stories</p>
          <RevealText
            as="h2"
            text="Trusted by drivers across Selangor."
            className="text-display-sm font-bold text-white max-w-xl"
          />
        </FadeIn>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
          {testimonials.map((t, index) => (
            <FadeIn key={t.id} delay={index * 0.1}>
              <article className="bg-neutral-950 p-8 md:p-10 flex flex-col h-full">

                {/* Large quote mark */}
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 text-brand-red mb-6 shrink-0"
                  viewBox="0 0 40 40"
                  fill="currentColor"
                >
                  <path d="M8 4C4.686 4 2 6.686 2 10v8c0 3.314 2.686 6 6 6h2l-2 8h6l4-8V10C18 6.686 15.314 4 12 4H8zm22 0c-3.314 0-6 2.686-6 6v8c0 3.314 2.686 6 6 6h2l-2 8h6l4-8V10c0-3.314-2.686-6-6-6h-4z" />
                </svg>

                {/* Quote text */}
                <blockquote className="text-body-lg text-neutral-200 leading-relaxed flex-1 mb-8">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Star rating */}
                <StarRating rating={t.rating} />

                {/* Divider */}
                <div className="divider my-6" />

                {/* Author */}
                <div>
                  <p className="text-body-sm font-semibold text-white">{t.author}</p>
                  <p className="text-body-sm text-neutral-500 mt-0.5">{t.vehicle}</p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        {/* Google rating badge */}
        <FadeIn className="mt-12 flex items-center gap-4">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} aria-hidden="true" className="w-4 h-4 text-brand-red" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-body-sm text-neutral-400">
            <span className="text-white font-semibold">4.8 / 5</span> on Google Reviews
          </p>
        </FadeIn>

      </div>
    </section>
  )
}
