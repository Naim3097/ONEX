import { getContent, type Locale } from '@/content'
import FadeIn from '@/components/motion/FadeIn'
import RevealText from '@/components/motion/RevealText'
import Text from '@/components/typography/Text'

interface OverhaulSectionProps {
  locale: Locale
}

export default function OverhaulSection({ locale }: OverhaulSectionProps) {
  const content = getContent(locale)
  const overhaul = content.capabilities.overhaul

  return (
    <section className="section-dark section-padding">
      <div className="max-w-wide mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Content (appears first on desktop — reversed layout) */}
          <div className="order-2 lg:order-1">
            <FadeIn>
              <Text variant="overline" className="text-brand-red mb-4">02</Text>
            </FadeIn>
            <RevealText text={overhaul.title} as="h2" className="text-h3 text-white mb-5" />

            <FadeIn delay={0.2}>
              <p className="text-body-lg text-neutral-400 leading-relaxed mb-8">
                {overhaul.description}
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-wrap gap-6 mb-8 text-body-sm">
                <div>
                  <Text variant="caption" className="text-neutral-500 mb-1">Starting From</Text>
                  <p className="text-white font-medium">{overhaul.price}</p>
                </div>
                <div>
                  <Text variant="caption" className="text-neutral-500 mb-1">Duration</Text>
                  <p className="text-white font-medium">{overhaul.duration}</p>
                </div>
                <div>
                  <Text variant="caption" className="text-neutral-500 mb-1">Warranty</Text>
                  <p className="text-white font-medium">{overhaul.warranty}</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="border-t border-white/10 pt-6">
                <Text variant="overline" className="text-neutral-500 mb-4">Included</Text>
                <ul className="space-y-2">
                  {overhaul.included.map((item) => (
                    <li key={item} className="text-body-sm text-neutral-400 flex items-baseline gap-3">
                      <span className="w-1 h-1 bg-brand-red rounded-full shrink-0 mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>

          {/* Video */}
          <FadeIn direction="right" className="order-1 lg:order-2">
            <div className="relative aspect-[9/16] overflow-hidden bg-neutral-900 max-w-sm mx-auto lg:mx-0">
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src="/videos/Capabilities - Gearbox Overhaul.mp4" type="video/mp4" />
              </video>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
