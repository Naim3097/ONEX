import { type Locale } from '@/content'
import { generatePageMetadata } from '@/lib/metadata'
import CheckoutPageClient from '@/components/sections/Shop/CheckoutPageClient'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = l as Locale
  const titles: Record<string, string> = {
    en: 'Checkout | One X Transmission',
    ms: 'Pembayaran | One X Transmission',
    zh: '结算 | One X Transmission',
  }
  return generatePageMetadata({
    locale,
    page: 'shop',
    title: titles[locale] ?? titles.en,
    description: 'Complete your order.',
  })
}

export default async function CheckoutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = (l as Locale) || 'en'

  return <CheckoutPageClient locale={locale} />
}
