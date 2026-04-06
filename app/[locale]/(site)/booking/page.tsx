import { type Locale } from '@/content'
import { generatePageMetadata } from '@/lib/metadata'
import { generateBreadcrumbJsonLd } from '@/lib/structured-data'
import BookingForm from '@/components/sections/Booking/BookingForm'
import FadeIn from '@/components/motion/FadeIn'
import RevealText from '@/components/motion/RevealText'
import Text from '@/components/typography/Text'
import { getContent } from '@/content'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = l as Locale
  const titles: Record<string, string> = {
    en: 'Book Door-to-Door Inspection | One X Transmission',
    ms: 'Tempah Pemeriksaan Pintu ke Pintu | One X Transmission',
    zh: '预约上门检测服务 | One X Transmission',
  }
  const descriptions: Record<string, string> = {
    en: 'Book a door-to-door transmission inspection. Our technician visits your location for a full professional diagnostic assessment. RM 10 deposit to confirm.',
    ms: 'Tempah pemeriksaan transmisi pintu ke pintu. Juruteknik kami melawat lokasi anda untuk penilaian diagnostik profesional. Deposit RM 10 untuk mengesahkan.',
    zh: '预约上门变速箱检测服务。我们的技术员将前往您的所在地进行全面专业诊断评估。RM 10押金确认。',
  }
  return generatePageMetadata({
    locale,
    page: 'booking',
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
  })
}

export default async function BookingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = l as Locale
  const content = getContent(locale)
  const hero = content.booking.hero
  const breadcrumbSchema = generateBreadcrumbJsonLd(locale, 'booking', 'Booking')

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="section-dark pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-wide mx-auto px-5 md:px-10">
          <div className="max-w-2xl">
            <FadeIn>
              <Text variant="overline" className="text-brand-red mb-5">
                {hero.overline}
              </Text>
            </FadeIn>
            <RevealText
              text={hero.headline}
              as="h1"
              className="text-h2 text-white mb-5"
            />
            <FadeIn delay={0.2}>
              <p className="text-body-lg text-neutral-400 leading-relaxed">
                {hero.body}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="section-dark section-padding">
        <div className="max-w-wide mx-auto px-5 md:px-10">
          <BookingForm locale={locale} />
        </div>
      </section>
    </>
  )
}
