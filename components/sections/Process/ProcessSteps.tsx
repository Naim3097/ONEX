import { getContent, type Locale } from '@/content'
import FadeIn from '@/components/motion/FadeIn'
import Text from '@/components/typography/Text'

interface ProcessStepsProps {
  locale: Locale
}

export default function ProcessSteps({ locale }: ProcessStepsProps) {
  const content = getContent(locale)
  const steps = content.process.steps

  return (
    <section className="section-light section-padding">
      <div className="max-w-content mx-auto px-5 md:px-10">
        <div className="space-y-0">
          {steps.map((step, i) => (
            <FadeIn key={step.number} delay={0.1 * i}>
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 py-12 md:py-16 ${
                i < steps.length - 1 ? 'border-b border-neutral-200' : ''
              }`}>
                {/* Number */}
                <div className="lg:col-span-2">
                  <span className="text-display text-neutral-100 font-bold select-none">
                    {step.number}
                  </span>
                </div>

                {/* Title + Short description */}
                <div className="lg:col-span-3">
                  <h3 className="text-h3 text-neutral-950 mb-2">{step.title}</h3>
                  <Text variant="body-sm" className="text-neutral-400">
                    {step.description}
                  </Text>
                </div>

                {/* Detailed description */}
                <div className="lg:col-span-7">
                  <p className="text-body-lg text-neutral-600 leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
