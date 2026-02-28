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
  const titles: Record<string, string> = {
    en: 'CVT & Automatic Gearbox Repair Shah Alam | One X Transmission',
    ms: 'Pembaikan Gearbox CVT & Automatik Shah Alam | One X Transmission',
    zh: '沙阿南CVT和自动变速箱维修 | One X Transmission',
  }
  const descriptions: Record<string, string> = {
    en: 'Professional gearbox diagnosis (free), AT and CVT overhaul from RM 2,500, and transmission servicing from RM 150. Covering all major Malaysian car brands — Perodua, Proton, Honda, Toyota, Nissan and more.',
    ms: 'Diagnosis gearbox profesional (percuma), baik pulih AT dan CVT dari RM 2,500, dan servis transmisi dari RM 150. Meliputi semua jenama kereta Malaysia utama — Perodua, Proton, Honda, Toyota, Nissan dan lain-lain.',
    zh: '专业变速箱诊断（免费），AT和CVT大修起价RM 2,500，变速箱保养起价RM 150。覆盖马来西亚所有主要汽车品牌——Perodua、Proton、Honda、Toyota、Nissan等。',
  }
  return generatePageMetadata({
    locale,
    page: 'capabilities',
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
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
