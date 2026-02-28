import { type Locale } from '@/content'
import { generatePageMetadata } from '@/lib/metadata'
import { generateBreadcrumbJsonLd } from '@/lib/structured-data'
import AboutHero from '@/components/sections/About/AboutHero'
import Story from '@/components/sections/About/Story'
import WhyUs from '@/components/sections/About/WhyUs'
import TeamSection from '@/components/sections/About/TeamSection'
import ContactCTA from '@/components/sections/Home/ContactCTA'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = l as Locale
  const titles: Record<string, string> = {
    en: 'Most Trusted Gearbox Workshop Shah Alam | One X Transmission',
    ms: 'Bengkel Gearbox Paling Dipercayai Shah Alam | One X Transmission',
    zh: '沙阿南最值得信赖的变速箱维修店 | One X Transmission',
  }
  const descriptions: Record<string, string> = {
    en: 'One X Transmission — a diagnostic-first gearbox workshop in Shah Alam, Selangor. 15 years of transmission expertise, rated 4.8/5 by thousands of Malaysian car owners. Original parts, 12-month warranty.',
    ms: 'One X Transmission — bengkel gearbox yang mengutamakan diagnosis di Shah Alam, Selangor. 15 tahun kepakaran transmisi, dinilai 4.8/5 oleh ribuan pemilik kereta Malaysia. Bahagian asli, waranti 12 bulan.',
    zh: 'One X Transmission — 莎阿南诊断优先的变速箱维修店。15年变速箱专业经验，获数千名马来西亚车主评分4.8/5。原厂零件，12个月保修。',
  }
  return generatePageMetadata({
    locale,
    page: 'about',
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
  })
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = l as Locale
  const breadcrumbSchema = generateBreadcrumbJsonLd(locale, 'about', 'About')

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <AboutHero locale={locale} />
      <Story locale={locale} />
      <WhyUs locale={locale} />
      <TeamSection />
      <ContactCTA locale={locale} />
    </>
  )
}
