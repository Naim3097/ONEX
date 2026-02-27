import { getContent, type Locale } from '@/content'
import FadeIn from '@/components/motion/FadeIn'
import RevealText from '@/components/motion/RevealText'
import Text from '@/components/typography/Text'

interface DiagnosisSectionProps {
  locale: Locale
}

export default function DiagnosisSection({ locale }: DiagnosisSectionProps) {
  const content = getContent(locale)
  const diagnosis = content.capabilities.diagnosis

  return (
    <section className="section-light section-padding">
      <div className="max-w-wide mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Video */}
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
                <source src="/videos/Capabilities - Diagnostic.mp4" type="video/mp4" />
              </video>
            </div>
          </FadeIn>

          {/* Content */}
          <div>
            <FadeIn>
              <Text variant="overline" className="text-brand-red mb-4">01</Text>
            </FadeIn>
            <RevealText text={diagnosis.title} as="h2" className="text-h3 text-neutral-950 mb-5" />

            <FadeIn delay={0.2}>
              <p className="text-body-lg text-neutral-600 leading-relaxed mb-8">
                {diagnosis.description}
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-wrap gap-6 mb-8 text-body-sm">
                <div>
                  <Text variant="caption" className="text-neutral-400 mb-1">Cost</Text>
                  <p className="text-neutral-950 font-medium">{diagnosis.price}</p>
                </div>
                <div>
                  <Text variant="caption" className="text-neutral-400 mb-1">Duration</Text>
                  <p className="text-neutral-950 font-medium">{diagnosis.duration}</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="border-t border-neutral-200 pt-6">
                <Text variant="overline" className="text-neutral-400 mb-4">Included</Text>
                <ul className="space-y-2">
                  {diagnosis.included.map((item) => (
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
      </div>
    </section>
  )
}
