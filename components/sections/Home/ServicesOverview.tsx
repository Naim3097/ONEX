import Link from 'next/link'
import { getContent, type Locale } from '@/content'
import FadeIn from '@/components/motion/FadeIn'
import RevealText from '@/components/motion/RevealText'
import Text from '@/components/typography/Text'

interface ServicesOverviewProps {
  locale: Locale
}

export default function ServicesOverview({ locale }: ServicesOverviewProps) {
  const content = getContent(locale)
  const services = content.home.services

  return (
    <section className="section-dark section-padding">
      <div className="max-w-wide mx-auto px-5 md:px-10">
        <div className="max-w-2xl mb-14 md:mb-20">
          <FadeIn>
            <Text variant="overline" className="text-brand-red mb-5">
              {services.overline}
            </Text>
          </FadeIn>
          <RevealText
            text={services.headline}
            as="h2"
            className="text-h2 text-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-px bg-white/10">
          {services.items.map((item, i) => (
            <FadeIn key={item.title} delay={0.1 * i} className="bg-neutral-950 p-8 md:p-10 lg:p-12">
              <div className="flex flex-col h-full">
                <Text variant="overline" className="text-brand-red/80 mb-6">
                  {String(i + 1).padStart(2, '0')}
                </Text>
                <h3 className="text-h4 text-white mb-4">{item.title}</h3>
                <p className="text-body text-neutral-400 leading-relaxed mb-6 flex-1">
                  {item.description}
                </p>
                <div className="pt-6 border-t border-white/10">
                  <Text variant="caption" className="text-neutral-500">
                    {item.detail}
                  </Text>
                  {i === 3 && (
                    <Link
                      href={`/${locale}/booking`}
                      className="inline-block mt-4 text-body-sm font-medium text-brand-red hover:text-brand-red-light transition-colors duration-200"
                    >
                      Book Now →
                    </Link>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4} className="mt-12 md:mt-16 text-center">
          <Link href={`/${locale}/capabilities`} className="cta-ghost">
            View All Capabilities
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
