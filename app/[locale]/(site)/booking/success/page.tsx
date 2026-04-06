import { Suspense } from 'react'
import { type Locale } from '@/content'
import { generatePageMetadata } from '@/lib/metadata'
import PaymentResultContent from '@/components/sections/Booking/PaymentResultContent'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = l as Locale
  const titles: Record<string, string> = {
    en: 'Booking Status | One X Transmission',
    ms: 'Status Tempahan | One X Transmission',
    zh: '预约状态 | One X Transmission',
  }
  return generatePageMetadata({
    locale,
    page: 'booking',
    title: titles[locale] ?? titles.en,
    description: 'Your door-to-door inspection booking status.',
  })
}

export default async function PaymentSuccessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = (l as Locale) || 'en'

  return (
    <Suspense
      fallback={
        <section className="section-dark min-h-[80vh] flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-neutral-700 border-t-brand-red animate-spin" />
        </section>
      }
    >
      <PaymentResultContent locale={locale} />
    </Suspense>
  )
}
