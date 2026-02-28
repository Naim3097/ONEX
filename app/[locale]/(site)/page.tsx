import { type Locale } from '@/content'
import { generatePageMetadata } from '@/lib/metadata'
import Hero from '@/components/sections/Home/Hero'
import Philosophy from '@/components/sections/Home/Philosophy'
import ServicesOverview from '@/components/sections/Home/ServicesOverview'
import ProcessPreview from '@/components/sections/Home/ProcessPreview'
import Stats from '@/components/sections/Home/Stats'
import Testimonials from '@/components/sections/Home/Testimonials'
import GalleryPreview from '@/components/sections/Home/GalleryPreview'
import ContactCTA from '@/components/sections/Home/ContactCTA'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = l as Locale
  return generatePageMetadata({
    locale,
    page: 'home',
    title: 'Gearbox Specialist Shah Alam | Free Diagnosis | One X Transmission',
    description:
      'Malaysia’s trusted CVT and automatic gearbox specialist in Shah Alam. Free professional diagnosis, full overhaul, and transmission servicing. 15 years experience, 5,000+ vehicles, 12-month warranty.',
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
      <Testimonials />
      <GalleryPreview locale={locale} />
      <ContactCTA locale={locale} />
    </>
  )
}
