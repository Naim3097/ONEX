import { type Locale, getContent } from '@/content'
import { generatePageMetadata } from '@/lib/metadata'
import { generateFAQJsonLd, generateBreadcrumbJsonLd } from '@/lib/structured-data'
import FAQHero from '@/components/sections/FAQ/FAQHero'
import FAQList from '@/components/sections/FAQ/FAQList'
import ContactCTA from '@/components/sections/Home/ContactCTA'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = l as Locale
  const titles: Record<string, string> = {
    en: 'Gearbox Repair FAQ — Pricing, Warranty & Process | One X Transmission Shah Alam',
    ms: 'Soalan Lazim Pembaikan Gearbox — Harga, Waranti & Proses | One X Transmission Shah Alam',
    zh: '变速箱维修常见问题 — 价格、保修与流程 | One X Transmission 沙阿南',
  }
  const descriptions: Record<string, string> = {
    en: 'Common questions about gearbox diagnosis costs, AT and CVT overhaul pricing, warranty terms, original parts, and our repair process. Straight answers, no jargon.',
    ms: 'Soalan biasa tentang kos diagnosis gearbox, harga baik pulih AT dan CVT, terma waranti, bahagian asli, dan proses pembaikan kami. Jawapan terus, tanpa jargon teknikal.',
    zh: '关于变速箱诊断费用、AT和CVT大修价格、保修条款、原厂零件及维修流程的常见问题。直接解答，无技术术语。',
  }
  return generatePageMetadata({
    locale,
    page: 'faq',
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
  })
}

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = l as Locale
  const faqSchema = generateFAQJsonLd(getContent(locale).faq.items)
  const breadcrumbSchema = generateBreadcrumbJsonLd(locale, 'faq', 'FAQ')

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <FAQHero locale={locale} />
      <FAQList locale={locale} />
      <ContactCTA locale={locale} />
    </>
  )
}
