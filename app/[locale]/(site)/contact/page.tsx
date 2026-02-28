import { type Locale } from '@/content'
import { generatePageMetadata } from '@/lib/metadata'
import { generateBreadcrumbJsonLd } from '@/lib/structured-data'
import ContactHero from '@/components/sections/Contact/ContactHero'
import ContactForm from '@/components/sections/Contact/ContactForm'
import ContactInfo from '@/components/sections/Contact/ContactInfo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = l as Locale
  const titles: Record<string, string> = {
    en: 'Contact Gearbox Specialist Shah Alam | WhatsApp or Call | One X Transmission',
    ms: 'Hubungi Pakar Gearbox Shah Alam | WhatsApp atau Telefon | One X Transmission',
    zh: '联系沙阿南变速箱专家 | WhatsApp或致电 | One X Transmission',
  }
  const descriptions: Record<string, string> = {
    en: 'Reach One X Transmission for a free gearbox consultation. Workshop at Batu 7½ Shah Alam, Selangor. WhatsApp +60 11-3105 1677. Mon–Fri 9am–6pm, Sat 9am–5pm.',
    ms: 'Hubungi One X Transmission untuk perundingan gearbox percuma. Bengkel di Batu 7½ Shah Alam, Selangor. WhatsApp +60 11-3105 1677. Isnin–Jumaat 9pg–6ptg, Sabtu 9pg–5ptg.',
    zh: '联系 One X Transmission 获取免费变速箱咨询。维修店位于莎阿南Batu 7½，雪兰莪。WhatsApp +60 11-3105 1677。周一至周五上午9时至下午6时，周六上午9时至下午5时。',
  }
  return generatePageMetadata({
    locale,
    page: 'contact',
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
  })
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = l as Locale
  const breadcrumbSchema = generateBreadcrumbJsonLd(locale, 'contact', 'Contact')

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
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
