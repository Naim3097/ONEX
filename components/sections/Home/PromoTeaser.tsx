'use client'

import Image from 'next/image'
import Link from 'next/link'
import { type Locale, business } from '@/content'
import FadeIn from '@/components/motion/FadeIn'
import RevealText from '@/components/motion/RevealText'
import Text from '@/components/typography/Text'

interface PromoTeaserProps {
  locale: Locale
}

export default function PromoTeaser({ locale }: PromoTeaserProps) {
  const content = {
    en: {
      overline: 'Aidiladha Promo',
      headline: 'AT gearbox service from RM74 with transparent oil pricing.',
      subheadline:
        'Labour, auto filter, inspection and OBD scan are included. Lubrimaxx oil is charged separately at RM65 per litre based on actual usage.',
      primary: 'View Promo Page',
      secondary: 'Book on WhatsApp',
      features: ['RM74 service fee', 'RM65/litre Lubrimaxx oil', 'Home or office service'],
    },
    ms: {
      overline: 'Promo Aidiladha',
      headline: 'Servis gearbox AT RM74 dengan harga minyak yang telus.',
      subheadline:
        'Upah kerja, auto filter, inspection dan OBD scan semua termasuk. Minyak Lubrimaxx dicaj RM65 seliter ikut penggunaan sebenar.',
      primary: 'Lihat Landing Page',
      secondary: 'Book di WhatsApp',
      features: ['Servis RM74', 'Minyak Lubrimaxx RM65/liter', 'Servis rumah atau pejabat'],
    },
    zh: {
      overline: 'Aidiladha 优惠',
      headline: 'AT 变速箱保养 RM74，油价透明。',
      subheadline:
        '人工、自动滤芯、检查和 OBD 扫描已包含。Lubrimaxx 油按 RM65 每升根据实际使用量计算。',
      primary: '查看活动页',
      secondary: 'WhatsApp 预约',
      features: ['RM74 服务费', 'Lubrimaxx 油 RM65/升', '住家或办公室服务'],
    },
  }[locale]

  return (
    <section className="bg-white section-padding">
      <div className="max-w-wide mx-auto px-5 md:px-10">
        {/* Header */}
        <div className="max-w-2xl mb-14 md:mb-20">
          <FadeIn>
            <Text variant="overline" className="text-brand-red mb-5">
              {content.overline}
            </Text>
          </FadeIn>
          <RevealText
            text={content.headline}
            as="h2"
            className="text-h2 text-neutral-950 mb-5"
          />
          <FadeIn delay={0.2}>
            <p className="text-body-lg text-neutral-500 leading-relaxed max-w-lg">
              {content.subheadline}
            </p>
          </FadeIn>
        </div>

        {/* Package card */}
        <FadeIn delay={0.3}>
          <div className="border border-neutral-200 bg-neutral-50">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-stretch">
              {/* Promo image — top on mobile, right on desktop */}
              <div className="order-first lg:order-last border-b lg:border-b-0 lg:border-l border-neutral-200 flex items-center justify-center min-h-[200px] lg:min-w-[280px] overflow-hidden">
                <Image
                  src="/images/asset promotion/PROMO 1 B.jpg"
                  alt="Pakej Servis Gearbox"
                  width={400}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Included items — below image on mobile, left on desktop */}
              <div className="order-last lg:order-first p-8 md:p-10 lg:p-12">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  {content.features.map((item, i) => (
                    <div key={item}>
                      <Text variant="overline" className="text-brand-red/80 mb-3">
                        {String(i + 1).padStart(2, '0')}
                      </Text>
                      <h3 className="text-h4 text-neutral-950 mb-2">{item}</h3>
                      <p className="text-body-sm text-neutral-500 leading-relaxed">Built for a faster, clearer booking decision.</p>
                    </div>
                  ))}
                </div>

                <div className="mt-10 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <Link
                    href={`/promo`}
                    className="cta-primary"
                  >
                    {content.primary}
                  </Link>
                  <Link href={business.whatsappInquiry} target="_blank" rel="noopener noreferrer" className="cta-ghost">
                    {content.secondary}
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
