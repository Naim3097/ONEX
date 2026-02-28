import { type Locale } from '@/content'
import { generatePageMetadata } from '@/lib/metadata'
import { generateBreadcrumbJsonLd } from '@/lib/structured-data'
import CapabilitiesHero from '@/components/sections/Capabilities/CapabilitiesHero'
import DiagnosisSection from '@/components/sections/Capabilities/DiagnosisSection'
import OverhaulSection from '@/components/sections/Capabilities/OverhaulSection'
import ServiceSection from '@/components/sections/Capabilities/ServiceSection'
import ContactCTA from '@/components/sections/Home/ContactCTA'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = l as Locale
  return generatePageMetadata({
    locale,
    page: 'capabilities',
    title: 'CVT & Automatic Gearbox Repair Shah Alam | One X Transmission',
    description:
      'Professional gearbox diagnosis (free), AT and CVT overhaul from RM 2,500, and transmission servicing from RM 150. Covering all major Malaysian car brands — Perodua, Proton, Honda, Toyota, Nissan and more.',
  })
}

export default async function CapabilitiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = l as Locale
  const breadcrumbSchema = generateBreadcrumbJsonLd(locale, 'capabilities', 'Capabilities')

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CapabilitiesHero locale={locale} />
      <DiagnosisSection locale={locale} />
      <OverhaulSection locale={locale} />
      <ServiceSection locale={locale} />
      <ContactCTA locale={locale} />
    </>
  )
}
