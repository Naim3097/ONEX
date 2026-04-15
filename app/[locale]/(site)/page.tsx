import { type Locale } from '@/content'
import { generatePageMetadata } from '@/lib/metadata'
import Hero from '@/components/sections/Home/Hero'
import Philosophy from '@/components/sections/Home/Philosophy'
import ServicesOverview from '@/components/sections/Home/ServicesOverview'
import ProcessPreview from '@/components/sections/Home/ProcessPreview'
import Stats from '@/components/sections/Home/Stats'
import PromoTeaser from '@/components/sections/Home/PromoTeaser'
import Testimonials from '@/components/sections/Home/Testimonials'
import GalleryPreview from '@/components/sections/Home/GalleryPreview'
import ContactCTA from '@/components/sections/Home/ContactCTA'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = l as Locale
  const titles: Record<string, string> = {
    en: 'Gearbox Specialist Shah Alam | Free Diagnosis | One X Transmission',
    ms: 'Pakar Gearbox Shah Alam | Diagnosis Percuma | One X Transmission',
    zh: '沙阿南变速箱专家 | 免费诊断 | One X Transmission',
  }
  const descriptions: Record<string, string> = {
    en: "Malaysia's trusted CVT and automatic gearbox specialist in Shah Alam. Free professional diagnosis, full overhaul, and transmission servicing. 15 years experience, 5,000+ vehicles, 12-month warranty.",
    ms: 'Pakar pembaikan gearbox CVT dan automatik terpercaya di Shah Alam. Diagnosis profesional percuma, baik pulih penuh, dan servis transmisi. 15 tahun pengalaman, 5,000+ kenderaan, waranti 12 bulan.',
    zh: '沙阿南值得信赖的CVT和自动变速箱专业维修中心。免费专业诊断，完整大修及变速箱保养服务。15年经验，服务超过5,000台车辆，12个月保修。',
  }
  return generatePageMetadata({
    locale,
    page: 'home',
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
  })
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = l as Locale

  return (
    <>
      <Hero locale={locale} />
      <Philosophy locale={locale} />
      <ServicesOverview locale={locale} />
      <ProcessPreview locale={locale} />
      <Stats locale={locale} />
      <PromoTeaser locale={locale} />
      <Testimonials />
      <GalleryPreview locale={locale} />
      <ContactCTA locale={locale} />
    </>
  )
}
