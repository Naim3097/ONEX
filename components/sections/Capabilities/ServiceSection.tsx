import { getContent, type Locale } from '@/content'
import FadeIn from '@/components/motion/FadeIn'
import RevealText from '@/components/motion/RevealText'
import Text from '@/components/typography/Text'

interface ServiceSectionProps {
  locale: Locale
}

export default function ServiceSection({ locale }: ServiceSectionProps) {
  const content = getContent(locale)
  const service = content.capabilities.service
  const other = content.capabilities.other

  return (
    <section className="section-light section-padding">
      <div className="max-w-wide mx-auto px-5 md:px-10">
        {/* Servicing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-24 md:mb-32">
          <FadeIn direction="left">
            <div className="relative aspect-[9/16] overflow-hidden bg-neutral-900 max-w-sm mx-auto lg:mx-0">
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src="/videos/Capabilities - Transmission Fluid Service.mp4" type="video/mp4" />
              </video>
            </div>
          </FadeIn>

          <div>
            <FadeIn>
              <Text variant="overline" className="text-brand-red mb-4">03</Text>
            </FadeIn>
            <RevealText text={service.title} as="h2" className="text-h3 text-neutral-950 mb-5" />

            <FadeIn delay={0.2}>
              <p className="text-body-lg text-neutral-600 leading-relaxed mb-8">
                {service.description}
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-wrap gap-6 mb-8 text-body-sm">
                <div>
                  <Text variant="caption" className="text-neutral-400 mb-1">Starting From</Text>
                  <p className="text-neutral-950 font-medium">{service.price}</p>
                </div>
                <div>
                  <Text variant="caption" className="text-neutral-400 mb-1">Duration</Text>
                  <p className="text-neutral-950 font-medium">{service.duration}</p>
                </div>
                <div>
                  <Text variant="caption" className="text-neutral-400 mb-1">Warranty</Text>
                  <p className="text-neutral-950 font-medium">{service.warranty}</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="border-t border-neutral-200 pt-6">
                <Text variant="overline" className="text-neutral-400 mb-4">Included</Text>
                <ul className="space-y-2">
                  {service.included.map((item) => (
                    <li key={item} className="text-body-sm text-neutral-600 flex items-baseline gap-3">
                      <span className="w-1 h-1 bg-brand-red rounded-full shrink-0 mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Additional Services */}
        <div className="max-w-2xl mx-auto text-center">
          <RevealText text={other.title} as="h2" className="text-h3 text-neutral-950 mb-5" />
          <FadeIn delay={0.2}>
            <p className="text-body-lg text-neutral-600 leading-relaxed mb-10">
              {other.description}
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-wrap justify-center gap-3">
              {other.items.map((item) => (
                <span
                  key={item}
                  className="px-5 py-2.5 border border-neutral-200 text-body-sm text-neutral-700 hover:border-brand-red hover:text-brand-red transition-colors duration-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
