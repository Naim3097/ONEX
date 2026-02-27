import { type Locale } from '@/content'
import { generatePageMetadata } from '@/lib/metadata'
import Hero from '@/components/sections/Home/Hero'
import Philosophy from '@/components/sections/Home/Philosophy'
import ServicesOverview from '@/components/sections/Home/ServicesOverview'
import ProcessPreview from '@/components/sections/Home/ProcessPreview'
import Stats from '@/components/sections/Home/Stats'
import GalleryPreview from '@/components/sections/Home/GalleryPreview'
import ContactCTA from '@/components/sections/Home/ContactCTA'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = l as Locale
  return generatePageMetadata({
    locale,
    page: 'home',
    title: 'One X Transmission — Gearbox Specialist Shah Alam',
    description:
      'Specialist CVT and automatic transmission repair with a diagnostic-first approach. Free professional diagnosis, gearbox overhaul, and transmission servicing in Shah Alam.',
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
      <GalleryPreview locale={locale} />
      <ContactCTA locale={locale} />
    </>
  )
}
