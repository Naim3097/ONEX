import Link from 'next/link'
import { getContent, business, type Locale } from '@/content'
import FadeIn from '@/components/motion/FadeIn'
import RevealText from '@/components/motion/RevealText'
import Text from '@/components/typography/Text'

interface DoorToDoorSectionProps {
  locale: Locale
}

export default function DoorToDoorSection({ locale }: DoorToDoorSectionProps) {
  const content = getContent(locale)
  const d2d = content.capabilities.doorToDoor

  return (
    <section className="section-dark section-padding">
      <div className="max-w-wide mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — Info */}
          <div>
            <FadeIn>
              <Text variant="overline" className="text-brand-red mb-4">04</Text>
            </FadeIn>
            <RevealText text={d2d.title} as="h2" className="text-h3 text-white mb-5" />

            <FadeIn delay={0.2}>
              <p className="text-body-lg text-neutral-400 leading-relaxed mb-8">
                {d2d.description}
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-wrap gap-6 mb-10 text-body-sm">
                <div>
                  <Text variant="caption" className="text-neutral-500 mb-1">Coverage</Text>
                  <p className="text-white font-medium">{d2d.coverage}</p>
                </div>
                <div>
                  <Text variant="caption" className="text-neutral-500 mb-1">Availability</Text>
                  <p className="text-white font-medium">{d2d.available}</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <Link
                href={business.whatsappDoorToDoor}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-primary inline-flex"
              >
                {d2d.cta}
              </Link>
            </FadeIn>
          </div>

          {/* Right — Steps */}
          <div className="space-y-px">
            {d2d.steps.map((step, i) => (
              <FadeIn key={step.number} delay={0.1 + i * 0.1} className="border border-white/10 p-6 md:p-8">
                <div className="flex items-start gap-5">
                  <Text variant="overline" className="text-brand-red shrink-0 pt-0.5">
                    {step.number}
                  </Text>
                  <div>
                    <h3 className="text-h4 text-white mb-2">{step.title}</h3>
                    <p className="text-body-sm text-neutral-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
