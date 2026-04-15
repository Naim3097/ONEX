import { type Locale, getContent } from '@/content'
import { generatePageMetadata } from '@/lib/metadata'
import { generateBreadcrumbJsonLd } from '@/lib/structured-data'
import FadeIn from '@/components/motion/FadeIn'
import RevealText from '@/components/motion/RevealText'
import Text from '@/components/typography/Text'
import ShopGrid from '@/components/sections/Shop/ShopGrid'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = l as Locale
  const titles: Record<string, string> = {
    en: 'Shop — Products & Services | One X Transmission',
    ms: 'Kedai — Produk & Perkhidmatan | One X Transmission',
    zh: '商店 — 产品与服务 | One X Transmission',
  }
  const descriptions: Record<string, string> = {
    en: 'Shop gearbox service packages and diagnostic tools. ATF Gearbox Service Package from RM 460, OBD2 Diagnostic Device RM 50. Order online.',
    ms: 'Beli pakej servis gearbox dan alat diagnostik. Pakej Servis Gearbox ATF dari RM 460, Peranti Diagnostik OBD2 RM 50. Pesan dalam talian.',
    zh: '变速箱保养套餐和诊断工具在线商店。ATF变速箱保养套餐 RM 460起，OBD2诊断设备 RM 50。在线下单。',
  }
  return generatePageMetadata({
    locale,
    page: 'shop',
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
  })
}

export default async function ShopPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = (l as Locale) || 'en'
  const content = getContent(locale)
  const shop = content.shop
  const breadcrumbSchema = generateBreadcrumbJsonLd(locale, 'shop', 'Shop')

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="section-dark pt-32 pb-10 md:pt-40 md:pb-14">
        <div className="max-w-wide mx-auto px-5 md:px-10">
          <div className="max-w-2xl">
            <FadeIn>
              <Text variant="overline" className="text-brand-red mb-5">
                {shop.hero.overline}
              </Text>
            </FadeIn>
            <RevealText
              text={shop.hero.headline}
              as="h1"
              className="text-h2 text-white mb-4"
            />
            <FadeIn delay={0.2}>
              <p className="text-body-lg text-neutral-400 leading-relaxed">
                {shop.hero.body}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Marketplace Grid */}
      <section className="section-dark section-padding">
        <div className="max-w-wide mx-auto px-5 md:px-10">
          <ShopGrid locale={locale} />
        </div>
      </section>
    </>
  )
}
