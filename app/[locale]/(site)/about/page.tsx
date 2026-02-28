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
  return generatePageMetadata({
    locale,
    page: 'about',
    title: 'Most Trusted Gearbox Workshop Shah Alam | One X Transmission',
    description:
      'One X Transmission — a diagnostic-first gearbox workshop in Shah Alam, Selangor. 15 years of transmission expertise, rated 4.8/5 by thousands of Malaysian car owners. Original parts, 12-month warranty.',
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
