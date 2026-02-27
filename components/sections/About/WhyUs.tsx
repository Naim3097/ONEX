import { getContent, type Locale } from '@/content'
import FadeIn from '@/components/motion/FadeIn'
import RevealText from '@/components/motion/RevealText'
import Text from '@/components/typography/Text'

interface WhyUsProps {
  locale: Locale
}

export default function WhyUs({ locale }: WhyUsProps) {
  const content = getContent(locale)
  const whyUs = content.about.whyUs

  return (
    <section className="section-dark section-padding">
      <div className="max-w-wide mx-auto px-5 md:px-10">
        <div className="text-center mb-14 md:mb-20">
          <RevealText
            text={whyUs.headline}
            as="h2"
            className="text-h2 text-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 max-w-4xl mx-auto">
          {whyUs.reasons.map((reason, i) => (
            <FadeIn key={reason.title} delay={0.1 * i} className="bg-neutral-950 p-8 md:p-10">
              <Text variant="overline" className="text-brand-red/80 mb-4">
                {String(i + 1).padStart(2, '0')}
              </Text>
              <h3 className="text-h4 text-white mb-3">{reason.title}</h3>
              <p className="text-body-sm text-neutral-400 leading-relaxed">
                {reason.description}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
