import { type Locale, getContent } from '@/content'
import { generatePageMetadata } from '@/lib/metadata'
import { generateFAQJsonLd, generateBreadcrumbJsonLd } from '@/lib/structured-data'
import FAQHero from '@/components/sections/FAQ/FAQHero'
import FAQList from '@/components/sections/FAQ/FAQList'
import ContactCTA from '@/components/sections/Home/ContactCTA'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = l as Locale
  return generatePageMetadata({
    locale,
    page: 'faq',
    title: 'Gearbox Repair FAQ — Pricing, Warranty & Process | One X Transmission Shah Alam',
    description:
      'Common questions about gearbox diagnosis costs, AT and CVT overhaul pricing, warranty terms, original parts, and our repair process. Straight answers, no jargon.',
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
