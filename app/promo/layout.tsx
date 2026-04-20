import '@/app/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Promo Servis Gearbox + OBD Percuma | One X Transmission',
  description:
    'Tawaran terhad! Dapatkan diagnosis OBD PERCUMA untuk 100 pelanggan pertama. Servis gearbox CVT & automatik oleh pakar #1 Shah Alam. Book sekarang!',
  robots: { index: true, follow: true },
}

export default function PromoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-black font-satoshi text-neutral-200">
      {children}
    </div>
  )
}
