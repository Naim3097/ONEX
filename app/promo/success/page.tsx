import type { Metadata } from 'next'
import PromoSuccessClient from '@/components/sections/Shop/PromoSuccessClient'

export const metadata: Metadata = {
  title: 'Status Pembayaran Promo Aidiladha | One X Transmission',
  description: 'Status pembayaran deposit booking promo Aidiladha servis gearbox AT.',
  robots: { index: false, follow: false },
}

export default function PromoSuccessPage() {
  return <PromoSuccessClient />
}
