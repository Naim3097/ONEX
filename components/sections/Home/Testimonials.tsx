import { googleReviews, GOOGLE_MAPS_REVIEW_URL, business } from '@/content'
import FadeIn from '@/components/motion/FadeIn'
import RevealText from '@/components/motion/RevealText'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: rating }).map((_, i) => (
        <svg
          key={i}
          aria-hidden="true"
          className="w-3.5 h-3.5 text-[#FBBC04]"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg aria-hidden="true" className="w-5 h-5" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

export default function Testimonials() {
  return (
    <section className="section-dark section-padding">
      <div className="max-w-wide mx-auto px-5 md:px-10">

        {/* Section header */}
        <FadeIn className="mb-16 md:mb-20">
          <p className="overline-label text-brand-red mb-4">Google Reviews</p>
          <RevealText
            as="h2"
            text="Trusted by drivers across Selangor."
            className="text-display-sm font-bold text-white max-w-xl"
          />
          {/* Aggregate rating */}
          <div className="flex items-center gap-3 mt-6">
            <GoogleIcon />
            <div className="flex items-center gap-2">
              <span className="text-body-lg text-white font-semibold">{business.googleRating}</span>
              <StarRating rating={5} />
              <span className="text-body-sm text-neutral-500">· 500+ reviews</span>
            </div>
          </div>
        </FadeIn>

        {/* Cards grid — gap-px divider trick */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {googleReviews.map((review, index) => (
            <FadeIn key={review.id} delay={index * 0.1}>
              <article className="bg-neutral-950 p-8 md:p-10 flex flex-col h-full">

                {/* Author row */}
                <div className="flex items-center gap-3 mb-5">
                  {/* Avatar initial */}
                  <div className="w-10 h-10 bg-neutral-800 border border-neutral-700 flex items-center justify-center text-body-sm font-semibold text-neutral-300 shrink-0">
                    {review.initial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-body-sm font-medium text-white truncate">{review.author}</p>
                    <p className="text-caption text-neutral-600">{review.relativeTime}</p>
                  </div>
                  <GoogleIcon />
                </div>

                {/* Stars */}
                <StarRating rating={review.rating} />

                {/* Review text */}
                <p className="text-body-sm text-neutral-400 leading-relaxed mt-4 flex-1">
                  {review.text}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>

        {/* See all reviews CTA */}
        <FadeIn className="mt-10">
          <a
            href={GOOGLE_MAPS_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-ghost inline-flex items-center gap-2"
          >
            See all reviews on Google
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        </FadeIn>

      </div>
    </section>
  )
}
