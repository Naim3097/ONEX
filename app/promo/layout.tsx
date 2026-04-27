import '@/app/globals.css'
import type { Metadata } from 'next'
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp'

export const metadata: Metadata = {
  title: 'Servis Gearbox AT RM74 — Promo Aidiladha | One X Transmission',
  description:
    'Servis gearbox AT serendah RM74. Upah kerja, auto filter, inspection & OBD scan termasuk. Minyak Lubrimaxx RM65/liter dikira berasingan. Kami datang ke anda. Book slot sekarang!',
  robots: { index: true, follow: true },
}

export default function PromoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white font-satoshi text-neutral-900">
      {children}
      <FloatingWhatsApp />
    </div>
  )
}
