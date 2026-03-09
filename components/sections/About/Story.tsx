import { getContent, type Locale } from '@/content'
import FadeIn from '@/components/motion/FadeIn'
import RevealText from '@/components/motion/RevealText'

const PREMISE_IMAGES = [
  { src: '/images/Premise/ONEX-3.jpg.jpeg', alt: 'One X Transmission signage and service bay' },
  { src: '/images/Premise/ONEX-1.jpg.jpeg', alt: 'One X Transmission workshop frontage, Shah Alam' },
  { src: '/images/Premise/ONEX-2.jpg.jpeg', alt: 'One X Transmission workshop interior' },
]

interface StoryProps {
  locale: Locale
}

export default function Story({ locale }: StoryProps) {
  const content = getContent(locale)
  const story = content.about.story

  return (
    <section className="section-light section-padding">
      <div className="max-w-wide mx-auto px-5 md:px-10">
        {/* Headline + Body — narrow column */}
        <div className="max-w-narrow mx-auto mb-16 md:mb-20">
          <RevealText
            text={story.headline}
            as="h2"
            className="text-h2 text-neutral-950 mb-10 md:mb-14 text-center"
          />

          <div className="space-y-6">
            {story.paragraphs.map((paragraph, i) => (
              <FadeIn key={i} delay={0.1 * i}>
                <p className="text-body-lg text-neutral-600 leading-relaxed">
                  {paragraph}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Premise Photos — 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {PREMISE_IMAGES.map((img, i) => (
            <FadeIn key={img.src} delay={0.1 * i} direction="up">
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-667 ease-[cubic-bezier(0,0.4,0,1)] group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
