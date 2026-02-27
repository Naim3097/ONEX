import { type Locale } from '@/content'
import { generatePageMetadata } from '@/lib/metadata'
import ContactHero from '@/components/sections/Contact/ContactHero'
import ContactForm from '@/components/sections/Contact/ContactForm'
import ContactInfo from '@/components/sections/Contact/ContactInfo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = l as Locale
  return generatePageMetadata({
    locale,
    page: 'contact',
    title: 'Contact — One X Transmission',
    description:
      'Get in touch for a free diagnostic assessment. WhatsApp, call, or visit our Shah Alam workshop. We respond promptly.',
  })
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = l as Locale

  return (
    <>
      <ContactHero locale={locale} />
      <section className="section-light section-padding">
        <div className="max-w-wide mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <ContactForm locale={locale} />
            <ContactInfo locale={locale} />
          </div>
        </div>
      </section>
    </>
  )
}
