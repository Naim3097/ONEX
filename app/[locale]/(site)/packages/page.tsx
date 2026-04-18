import { type Locale, getContent, business } from '@/content'
import { generatePageMetadata } from '@/lib/metadata'
import Image from 'next/image'
import Link from 'next/link'
import FadeIn from '@/components/motion/FadeIn'
import RevealText from '@/components/motion/RevealText'
import Text from '@/components/typography/Text'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = l as Locale
  const titles: Record<string, string> = {
    en: 'Gearbox Service Package RM 439 | ATF + Filter + FREE OBD2 | One X Transmission',
    ms: 'Pakej Servis Gearbox RM 439 | ATF + Penapis + PERCUMA OBD2 | One X Transmission',
    zh: '变速箱保养套餐 RM 439 | ATF + 滤清器 + 免费OBD2 | One X Transmission',
  }
  const descriptions: Record<string, string> = {
    en: 'Limited time gearbox service package — ATF oil replace, auto filter, and FREE OBD2 device for only RM 439. 3-month warranty included. Walk in or WhatsApp to book.',
    ms: 'Pakej servis gearbox tawaran terhad — tukar minyak ATF, penapis auto, dan PERCUMA peranti OBD2 hanya RM 439. Waranti 3 bulan disertakan. Walk-in atau WhatsApp untuk tempah.',
    zh: '限时变速箱保养套餐 — ATF换油、自动滤清器及免费OBD2设备仅需RM 439。含3个月保修。到店或WhatsApp预约。',
  }
  return generatePageMetadata({
    locale,
    page: 'packages',
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
  })
}

export default async function PackagesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = l as Locale
  const { promo } = getContent(locale)
  const { landing } = promo

  return (
    <>
      {/* Hero */}
      <section className="relative section-padding overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/asset promotion/red bg.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 max-w-wide mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center">
            <div className="max-w-3xl">
              <FadeIn>
                <Text variant="overline" className="text-brand-red mb-5">
                  {promo.overline}
                </Text>
              </FadeIn>

              <RevealText
                text={landing.heroHeadline}
                as="h1"
                className="text-h1 text-white mb-6 md:mb-8"
              />

              <FadeIn delay={0.3}>
                <p className="text-body-lg text-neutral-300 leading-relaxed max-w-2xl mb-10 md:mb-12">
                  {landing.heroBody}
                </p>
              </FadeIn>

              <FadeIn delay={0.5}>
                <div className="flex flex-col sm:flex-row items-center gap-5">
                  <Link
                    href={`/${locale}/shop`}
                    className="cta-primary"
                  >
                    {promo.ctaPrimary}
                  </Link>
                  <a href={business.phoneTel} className="text-body-sm text-neutral-300 font-medium tracking-wide hover:text-white transition-colors duration-300">
                    {business.phone}
                  </a>
                </div>
              </FadeIn>
            </div>

            {/* Floating promo image */}
            <FadeIn delay={0.4}>
              <div className="relative w-full lg:w-[480px] lg:animate-float">
                <Image
                  src="/images/asset promotion/promo.png"
                  alt="Pakej Servis Gearbox"
                  width={480}
                  height={640}
                  className="w-full h-auto object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="section-light section-padding">
        <div className="max-w-wide mx-auto px-5 md:px-10">
          <div className="max-w-2xl mb-14 md:mb-20">
            <FadeIn>
              <Text variant="overline" className="text-brand-red mb-5">
                {landing.includedTitle}
              </Text>
            </FadeIn>
            <RevealText
              text={landing.includedTitle}
              as="h2"
              className="text-h2 text-neutral-950"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200">
            {landing.included.map((item, i) => (
              <FadeIn key={item.title} delay={0.1 * i} className="bg-neutral-50 p-8 md:p-10 lg:p-12">
                <div className="flex flex-col h-full">
                  <Text variant="overline" className="text-brand-red/80 mb-6">
                    {String(i + 1).padStart(2, '0')}
                  </Text>
                  <h3 className="text-h4 text-neutral-950 mb-4">{item.title}</h3>
                  <p className="text-body text-neutral-600 leading-relaxed flex-1">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Who should get this */}
      <section className="section-dark section-padding">
        <div className="max-w-wide mx-auto px-5 md:px-10">
          <div className="max-w-3xl">
            <FadeIn>
              <Text variant="overline" className="text-brand-red mb-5">
                {landing.whoTitle}
              </Text>
            </FadeIn>
            <RevealText
              text={landing.whoTitle}
              as="h2"
              className="text-h2 text-white mb-8"
            />
            <FadeIn delay={0.2}>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {landing.whoItems.map((item, i) => (
                  <li key={i} className="text-body text-neutral-300 flex items-baseline gap-3">
                    <span className="w-1.5 h-1.5 bg-brand-red rounded-full shrink-0 mt-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Compatible models */}
      <section className="section-light section-padding">
        <div className="max-w-wide mx-auto px-5 md:px-10">
          <div className="max-w-2xl mb-14 md:mb-20">
            <FadeIn>
              <Text variant="overline" className="text-brand-red mb-5">
                {landing.modelsTitle}
              </Text>
            </FadeIn>
            <RevealText
              text={landing.modelsTitle}
              as="h2"
              className="text-h2 text-neutral-950"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px">
            {landing.models.map((model, i) => (
              <FadeIn key={model} delay={0.05 * i} className="bg-neutral-50 border border-neutral-200 px-6 py-5">
                <p className="text-body-sm text-neutral-700 flex items-center gap-3">
                  <span className="w-1 h-1 bg-brand-red rounded-full shrink-0" />
                  {model}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-dark section-padding">
        <div className="max-w-narrow mx-auto px-5 md:px-10 text-center">
          <FadeIn>
            <Text variant="overline" className="text-brand-red mb-5">
              {promo.badge}
            </Text>
          </FadeIn>

          <RevealText
            text={landing.footerCta}
            as="h2"
            className="text-h1 text-white mb-6 md:mb-8"
          />

          <FadeIn delay={0.3}>
            <p className="text-body-lg text-neutral-400 max-w-lg mx-auto mb-10 leading-relaxed">
              {landing.footerBody}
            </p>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link
                href={`/${locale}/shop`}
                className="cta-primary"
              >
                {promo.ctaPrimary}
              </Link>
              <a href={business.phoneTel} className="text-body-sm text-neutral-400 font-medium tracking-wide hover:text-white transition-colors duration-300">
                {business.phone}
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.7}>
            <div className="mt-14 md:mt-18 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-center gap-6 text-body-sm text-neutral-500">
              <span>Mon–Fri: {business.hours.weekdays}</span>
              <span className="hidden md:inline text-neutral-700">|</span>
              <span>Sat: {business.hours.saturday}</span>
              <span className="hidden md:inline text-neutral-700">|</span>
              <a
                href={business.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-200"
              >
                {business.addressShort}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
