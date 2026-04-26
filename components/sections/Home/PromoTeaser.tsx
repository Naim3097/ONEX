'use client'

import Image from 'next/image'
import Link from 'next/link'
import { type Locale, getContent, business } from '@/content'
import FadeIn from '@/components/motion/FadeIn'
import RevealText from '@/components/motion/RevealText'
import Text from '@/components/typography/Text'

interface PromoTeaserProps {
  locale: Locale
}

export default function PromoTeaser({ locale }: PromoTeaserProps) {
  const { promo } = getContent(locale)

  return (
    <section className="bg-white section-padding">
      <div className="max-w-wide mx-auto px-5 md:px-10">
        {/* Header */}
        <div className="max-w-2xl mb-14 md:mb-20">
          <FadeIn>
            <Text variant="overline" className="text-brand-red mb-5">
              {promo.overline}
            </Text>
          </FadeIn>
          <RevealText
            text={promo.headline}
            as="h2"
            className="text-h2 text-neutral-950 mb-5"
          />
          <FadeIn delay={0.2}>
            <p className="text-body-lg text-neutral-500 leading-relaxed max-w-lg">
              {promo.subheadline}
            </p>
          </FadeIn>
        </div>

        {/* Package card */}
        <FadeIn delay={0.3}>
          <div className="border border-neutral-200 bg-neutral-50">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-stretch">
              {/* Promo image ΓÇö top on mobile, right on desktop */}
              <div className="order-first lg:order-last border-b lg:border-b-0 lg:border-l border-neutral-200 flex items-center justify-center min-h-[200px] lg:min-w-[280px] overflow-hidden">
                <Image
                  src="/images/asset promotion/PROMO 1 B.jpg"
                  alt="Pakej Servis Gearbox"
                  width={400}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Included items ΓÇö below image on mobile, left on desktop */}
              <div className="order-last lg:order-first p-8 md:p-10 lg:p-12">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  {promo.landing.included.map((item, i) => (
                    <div key={item.title}>
                      <Text variant="overline" className="text-brand-red/80 mb-3">
                        {String(i + 1).padStart(2, '0')}
                      </Text>
                      <h3 className="text-h4 text-neutral-950 mb-2">{item.title}</h3>
                      <p className="text-body-sm text-neutral-500 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-10 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <Link
                    href={`/${locale}/packages`}
                    className="cta-primary"
                  >
                    {promo.ctaPrimary}
                  </Link>
                  <Link href={business.whatsappInquiry} target="_blank" rel="noopener noreferrer" className="cta-ghost">
                    {promo.ctaSecondary}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
