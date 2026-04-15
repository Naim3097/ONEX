import { type Locale } from '@/content'
import { generatePageMetadata } from '@/lib/metadata'
import CartPageClient from '@/components/sections/Shop/CartPageClient'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = l as Locale
  const titles: Record<string, string> = {
    en: 'Cart | One X Transmission',
    ms: 'Troli | One X Transmission',
    zh: '购物车 | One X Transmission',
  }
  return generatePageMetadata({
    locale,
    page: 'shop',
    title: titles[locale] ?? titles.en,
    description: 'Your shopping cart.',
  })
}

export default async function CartPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = (l as Locale) || 'en'

  return <CartPageClient locale={locale} />
}
