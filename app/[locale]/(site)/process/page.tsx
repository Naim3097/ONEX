import { type Locale } from '@/content'
import { generatePageMetadata } from '@/lib/metadata'
import ProcessHero from '@/components/sections/Process/ProcessHero'
import ProcessSteps from '@/components/sections/Process/ProcessSteps'
import ContactCTA from '@/components/sections/Home/ContactCTA'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = l as Locale
  return generatePageMetadata({
    locale,
    page: 'process',
    title: 'Our Process — One X Transmission',
    description:
      'A systematic four-stage process: Inspection, Disassembly, Restoration, and Calibration. Every repair follows the same discipline.',
  })
}

export default async function ProcessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = l as Locale

  return (
    <>
      <ProcessHero locale={locale} />
      <ProcessSteps locale={locale} />
      <ContactCTA locale={locale} />
    </>
  )
}
