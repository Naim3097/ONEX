import { type Locale } from '@/content'
import { generatePageMetadata } from '@/lib/metadata'
import { generateHowToJsonLd, generateBreadcrumbJsonLd } from '@/lib/structured-data'
import ProcessHero from '@/components/sections/Process/ProcessHero'
import ProcessSteps from '@/components/sections/Process/ProcessSteps'
import ContactCTA from '@/components/sections/Home/ContactCTA'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = l as Locale
  return generatePageMetadata({
    locale,
    page: 'process',
    title: 'Our Gearbox Repair Process | 4-Stage Method | One X Transmission Shah Alam',
    description:
      'See exactly how we fix transmissions — from scanner diagnosis to road test. A transparent, systematic 4-stage process trusted by Shah Alam and Klang Valley drivers.',
  })
}

export default async function ProcessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = l as Locale
  const howToSchema = generateHowToJsonLd()
  const breadcrumbSchema = generateBreadcrumbJsonLd(locale, 'process', 'Our Process')

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ProcessHero locale={locale} />
      <ProcessSteps locale={locale} />
      <ContactCTA locale={locale} />
    </>
  )
}
