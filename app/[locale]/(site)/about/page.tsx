import { type Locale } from '@/content'
import { generatePageMetadata } from '@/lib/metadata'
import AboutHero from '@/components/sections/About/AboutHero'
import Story from '@/components/sections/About/Story'
import WhyUs from '@/components/sections/About/WhyUs'
import TeamSection from '@/components/sections/About/TeamSection'
import ContactCTA from '@/components/sections/Home/ContactCTA'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = l as Locale
  return generatePageMetadata({
    locale,
    page: 'about',
    title: 'About — One X Transmission',
    description:
      'Built on diagnostic discipline. A transmission workshop in Shah Alam that believes certainty comes before repair.',
  })
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = l as Locale

  return (
    <>
      <AboutHero locale={locale} />
      <Story locale={locale} />
      <WhyUs locale={locale} />
      <TeamSection />
      <ContactCTA locale={locale} />
    </>
  )
}
