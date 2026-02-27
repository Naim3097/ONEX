import { type Locale } from '@/content'
import { generatePageMetadata } from '@/lib/metadata'
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
    title: 'Capabilities — One X Transmission',
    description:
      'Professional transmission diagnosis, gearbox overhaul (AT and CVT), and transmission servicing. From initial assessment to final road test.',
  })
}

export default async function CapabilitiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = l as Locale

  return (
    <>
      <CapabilitiesHero locale={locale} />
      <DiagnosisSection locale={locale} />
      <OverhaulSection locale={locale} />
      <ServiceSection locale={locale} />
      <ContactCTA locale={locale} />
    </>
  )
}
