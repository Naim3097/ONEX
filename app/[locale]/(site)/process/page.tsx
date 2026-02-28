import { type Locale } from '@/content'
import { generatePageMetadata } from '@/lib/metadata'
import { generateHowToJsonLd, generateBreadcrumbJsonLd } from '@/lib/structured-data'
import ProcessHero from '@/components/sections/Process/ProcessHero'
import ProcessSteps from '@/components/sections/Process/ProcessSteps'
import ContactCTA from '@/components/sections/Home/ContactCTA'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = l as Locale
  const titles: Record<string, string> = {
    en: 'Our Gearbox Repair Process | 4-Stage Method | One X Transmission Shah Alam',
    ms: 'Proses Pembaikan Gearbox Kami | Kaedah 4 Peringkat | One X Transmission Shah Alam',
    zh: '我们的变速箱维修流程 | 四步骤方法 | One X Transmission 沙阿南',
  }
  const descriptions: Record<string, string> = {
    en: 'See exactly how we fix transmissions — from scanner diagnosis to road test. A transparent, systematic 4-stage process trusted by Shah Alam and Klang Valley drivers.',
    ms: 'Lihat dengan tepat cara kami membaiki transmisi — dari diagnosis pengimbas hingga ujian jalan. Proses 4 peringkat yang telus dan sistematik dipercayai oleh pemandu Shah Alam dan Lembah Klang.',
    zh: '了解我们如何维修变速箱——从扫描仪诊断到路试。透明、系统的四步骤流程，深受沙阿南及巴生谷车主信赖。',
  }
  return generatePageMetadata({
    locale,
    page: 'process',
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
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
