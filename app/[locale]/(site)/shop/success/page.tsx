import { Suspense } from 'react'
import { type Locale } from '@/content'
import { generatePageMetadata } from '@/lib/metadata'
import OrderSuccessClient from '@/components/sections/Shop/OrderSuccessClient'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = l as Locale
  const titles: Record<string, string> = {
    en: 'Order Status | One X Transmission',
    ms: 'Status Pesanan | One X Transmission',
    zh: '订单状态 | One X Transmission',
  }
  return generatePageMetadata({
    locale,
    page: 'shop',
    title: titles[locale] ?? titles.en,
    description: 'Your order status.',
  })
}

export default async function OrderSuccessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = (l as Locale) || 'en'

  return (
    <Suspense
      fallback={
        <section className="section-dark min-h-[80vh] flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-neutral-700 border-t-brand-red animate-spin rounded-full" />
        </section>
      }
    >
      <OrderSuccessClient locale={locale} />
    </Suspense>
  )
}
