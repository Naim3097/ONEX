import { type Locale } from '@/content'
import { generatePageMetadata } from '@/lib/metadata'
import FAQHero from '@/components/sections/FAQ/FAQHero'
import FAQList from '@/components/sections/FAQ/FAQList'
import ContactCTA from '@/components/sections/Home/ContactCTA'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = l as Locale
  return generatePageMetadata({
    locale,
    page: 'faq',
    title: 'FAQ — One X Transmission',
    description:
      'Common questions about gearbox diagnosis, overhaul pricing, warranty, parts, and our transmission repair process.',
  })
}

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = l as Locale

  return (
    <>
      <FAQHero locale={locale} />
      <FAQList locale={locale} />
      <ContactCTA locale={locale} />
    </>
  )
}
