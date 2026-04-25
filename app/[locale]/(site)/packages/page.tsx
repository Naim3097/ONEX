import { type Locale, getContent, business } from '@/content'
import { generatePageMetadata } from '@/lib/metadata'
import Image from 'next/image'
import FadeIn from '@/components/motion/FadeIn'
import AddToCartButton from '@/components/ui/AddToCartButton'
import RevealText from '@/components/motion/RevealText'
import Text from '@/components/typography/Text'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = l as Locale
  const titles: Record<string, string> = {
    en: 'Gearbox Service Package RM439 | ATF + Filter + FREE OBD2 + BYKI App | One X Transmission',
    ms: 'Pakej Servis Gearbox RM439 | ATF + Penapis + PERCUMA OBD2 + Aplikasi BYKI | One X Transmission',
    zh: 'σÅÿΘÇƒτ«▒Σ┐¥σà╗σÑùΘñÉ RM439 | ATF + µ╗ñµ╕àσÖ¿ + σàìΦ┤╣OBD2 + BYKIσ║öτö¿ | One X Transmission',
  }
  const descriptions: Record<string, string> = {
    en: 'Complete gearbox service package for RM439. ATF oil replacement, new gearbox filter, and FREE OBD2 device compatible with BYKI app. Monitor your car from your phone. Shah Alam, Selangor.',
    ms: 'Pakej servis gearbox lengkap RM439. Tukar minyak ATF, penapis gearbox baru, dan PERCUMA peranti OBD2 serasi aplikasi BYKI. Pantau kereta dari phone anda. Shah Alam, Selangor.',
    zh: 'σ«îµò┤σÅÿΘÇƒτ«▒Σ┐¥σà╗σÑùΘñÉRM439πÇéµ¢┤µìóATFσÅÿΘÇƒτ«▒µ▓╣πÇüσà¿µû░µ╗ñµ╕àσÖ¿σÅèσàìΦ┤╣OBD2Φ«╛σñçσà╝σ«╣BYKIσ║öτö¿πÇéτö¿µëïµ£║τ¢æµ╡ïτê▒Φ╜ªπÇéShah Alam, SelangorπÇé',
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
                  <AddToCartButton
                    locale={locale}
                    slug="atf-gearbox-service-package"
                    className="cta-primary"
                  >
                    {promo.ctaPrimary}
                  </AddToCartButton>
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

      {/* Problem */}
      <section className="section-dark section-padding">
        <div className="max-w-wide mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <FadeIn>
                <Text variant="overline" className="text-brand-red mb-5">
                  {locale === 'zh' ? 'Θù«Θóÿ' : locale === 'ms' ? 'Masalah' : 'Problem'}
                </Text>
              </FadeIn>
              <RevealText
                text={landing.problemTitle}
                as="h2"
                className="text-h2 text-white"
              />
            </div>

            <div className="border-l border-brand-red/30 pl-8 md:pl-12">
              {landing.problemBody.split('\n\n').map((paragraph, i) => (
                <FadeIn key={i} delay={0.15 * (i + 1)}>
                  <p className={`text-body-lg leading-relaxed ${
                    i === landing.problemBody.split('\n\n').length - 1
                      ? 'text-neutral-200 font-medium'
                      : 'text-neutral-400'
                  } ${i > 0 ? 'mt-6' : ''}`}>
                    {paragraph}
                  </p>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="section-light section-padding">
        <div className="max-w-wide mx-auto px-5 md:px-10">
          <div className="max-w-2xl mb-14 md:mb-20">
            <FadeIn>
              <Text variant="overline" className="text-brand-red mb-5">
                {locale === 'zh' ? 'σÑùΘñÉσåàσ«╣' : locale === 'ms' ? 'Pakej' : 'Package'}
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

      {/* BYKI Video Preview */}
      <section className="section-dark section-padding">
        <div className="max-w-wide mx-auto px-5 md:px-10">
          <div className="max-w-3xl mx-auto text-center mb-14 md:mb-20">
            <FadeIn>
              <Text variant="overline" className="text-brand-red mb-5">
                BYKI
              </Text>
            </FadeIn>
            <RevealText
              text={landing.bykyTitle}
              as="h2"
              className="text-h2 text-white mb-6"
            />
            <FadeIn delay={0.2}>
              <p className="text-body-lg text-neutral-400 leading-relaxed">
                {landing.bykyBody}
              </p>
            </FadeIn>
          </div>

          {/* BYKI Feature Cards with Phone Video */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {landing.bykyFeatures.map((feature, i) => {
              const videos = ['/videos/byki/sensor-data.mp4', '/videos/byki/health-scan.mp4', '/videos/byki/fault-codes.mp4']
              return (
                <FadeIn key={feature.title} delay={0.15 * i}>
                  <div className="flex flex-col h-full">
                    {/* Phone Video */}
                    <div className="relative mx-auto mb-8 w-[180px] sm:w-[200px] bg-neutral-900 border border-neutral-800 overflow-hidden" style={{ aspectRatio: '1180 / 2300' }}>
                      <video
                        src={videos[i]}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-auto object-cover object-top"
                      />
                    </div>

                    <Text variant="overline" className="text-brand-red/80 mb-3">
                      {String(i + 1).padStart(2, '0')}
                    </Text>
                    <h3 className="text-h4 text-white mb-3">{feature.title}</h3>
                    <p className="text-body text-neutral-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* Emotional Bridge */}
      <section className="section-light section-padding">
        <div className="max-w-wide mx-auto px-5 md:px-10">
          <div className="border-t border-b border-neutral-200 py-16 md:py-24 lg:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <FadeIn>
                <div className="w-12 h-px bg-brand-red mx-auto mb-10" />
              </FadeIn>

              <RevealText
                text={landing.emotionalTitle}
                as="h2"
                className="text-h1 text-neutral-950 mb-6 md:mb-8"
              />

              <FadeIn delay={0.2}>
                <p className="text-h4 text-neutral-500 leading-relaxed font-normal mb-10 md:mb-14">
                  {landing.emotionalBody}
                </p>
              </FadeIn>

              <FadeIn delay={0.4}>
                <p className="text-body text-neutral-600 leading-relaxed max-w-xl mx-auto mb-10">
                  {landing.emotionalCta}
                </p>
              </FadeIn>

              <FadeIn delay={0.5}>
                <AddToCartButton
                  locale={locale}
                  slug="atf-gearbox-service-package"
                  className="cta-primary"
                >
                  {promo.ctaPrimary}
                </AddToCartButton>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Who Should Get This */}
      <section className="section-dark section-padding">
        <div className="max-w-wide mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20">
            <div>
              <FadeIn>
                <Text variant="overline" className="text-brand-red mb-5">
                  {locale === 'zh' ? 'ΘÇéτö¿Σ║║τ╛ñ' : locale === 'ms' ? 'Untuk Siapa' : 'For You'}
                </Text>
              </FadeIn>
              <RevealText
                text={landing.whoTitle}
                as="h2"
                className="text-h2 text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5">
              {landing.whoItems.map((item, i) => (
                <FadeIn key={i} delay={0.1 * i} className="bg-brand-black p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <Text variant="overline" className="text-brand-red/60 shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </Text>
                    <p className="text-body text-neutral-300 leading-relaxed">
                      {item}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compatible Models */}
      <section className="section-light section-padding">
        <div className="max-w-wide mx-auto px-5 md:px-10">
          <div className="max-w-2xl mb-14 md:mb-20">
            <FadeIn>
              <Text variant="overline" className="text-brand-red mb-5">
                {locale === 'zh' ? 'Φ╜ªσ₧ï' : locale === 'ms' ? 'Keserasian' : 'Compatibility'}
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
              <AddToCartButton
                locale={locale}
                slug="atf-gearbox-service-package"
                className="cta-primary"
              >
                {promo.ctaPrimary}
              </AddToCartButton>
              <a href={business.phoneTel} className="text-body-sm text-neutral-400 font-medium tracking-wide hover:text-white transition-colors duration-300">
                {business.phone}
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.7}>
            <div className="mt-14 md:mt-18 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-center gap-6 text-body-sm text-neutral-500">
              <span>MonΓÇôFri: {business.hours.weekdays}</span>
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
