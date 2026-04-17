import Link from 'next/link'
import { getContent, type Locale } from '@/content'
import FadeIn from '@/components/motion/FadeIn'
import RevealText from '@/components/motion/RevealText'
import Text from '@/components/typography/Text'

interface ProcessPreviewProps {
  locale: Locale
}

export default function ProcessPreview({ locale }: ProcessPreviewProps) {
  const content = getContent(locale)
  const process = content.home.process

  return (
    <section className="section-light section-padding">
      <div className="max-w-wide mx-auto px-5 md:px-10">
        <div className="max-w-2xl mb-14 md:mb-20">
          <FadeIn>
            <Text variant="overline" className="text-brand-red mb-5">
              {process.overline}
            </Text>
          </FadeIn>
          <RevealText
            text={process.headline}
            as="h2"
            className="text-h2 text-neutral-950"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {process.steps.map((step, i) => (
            <FadeIn key={step.number} delay={0.1 * i}>
              <div className="relative">
                {/* Step number */}
                <span className="block text-display text-brand-red font-bold mb-4 select-none">
                  {step.number}
                </span>
                <h3 className="text-h4 text-neutral-950 mb-3">{step.title}</h3>
                <p className="text-body-sm text-neutral-500 leading-relaxed">
                  {step.description}
                </p>
                {/* Connector line (desktop) */}
                {i < process.steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-6 h-px bg-neutral-200" />
                )}
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5} className="mt-12 md:mt-16 text-center">
          <Link href={`/${locale}/process`} className="inline-block px-8 py-3 bg-brand-red text-white font-medium tracking-wide uppercase text-sm transition-colors duration-300 hover:bg-neutral-950 hover:text-brand-red">
            See Full Process
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
