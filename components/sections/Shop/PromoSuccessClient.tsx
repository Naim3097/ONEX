'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { business } from '@/content'

type Status = 'loading' | 'confirmed' | 'cancelled' | 'pending'

interface BookingInfo {
  customerName?: string
  vehicleModel?: string
  preferredDate?: string
  timeSlot?: string
  paymentAmount?: number
  paymentInvoiceNo?: string
}

const ui: Record<
  Status,
  { label: string; title: string; body: string; accent: string; sub: string }
> = {
  loading: {
    label: 'Mengesahkan',
    title: 'Mengesahkan pembayaran anda',
    body: 'Sila tunggu. Kami sedang mengesahkan status pembayaran anda dengan Lean.x.',
    accent: 'bg-neutral-200 text-neutral-700',
    sub: 'Ini biasanya mengambil masa beberapa saat sahaja.',
  },
  confirmed: {
    label: 'Berjaya',
    title: 'Slot anda telah disahkan',
    body: 'Terima kasih. Deposit RM50 anda telah diterima dan slot booking promo Aidiladha telah disahkan. Team kami akan WhatsApp anda untuk pengesahan akhir dan menjelaskan keperluan minyak.',
    accent: 'bg-brand-red text-brand-white',
    sub: 'Tekan butang di bawah untuk WhatsApp kami sekarang.',
  },
  cancelled: {
    label: 'Tidak berjaya',
    title: 'Pembayaran tidak berjaya',
    body: 'Pembayaran anda telah dibatalkan atau gagal. Slot anda belum disahkan. Sila cuba semula atau hubungi kami melalui WhatsApp untuk bantuan.',
    accent: 'bg-neutral-950 text-brand-white',
    sub: 'Tekan butang di bawah untuk cuba semula.',
  },
  pending: {
    label: 'Sedang diproses',
    title: 'Pembayaran sedang diproses',
    body: 'Status pembayaran anda masih belum dikemaskini. Jika ia berjaya, team kami akan hubungi anda. Anda juga boleh sahkan secara manual melalui WhatsApp.',
    accent: 'bg-neutral-200 text-neutral-900',
    sub: 'Sila simpan halaman ini dan sahkan dengan team kami.',
  },
}

function formatDate(value?: string) {
  if (!value) return '-'
  try {
    const d = new Date(`${value}T00:00:00`)
    if (Number.isNaN(d.getTime())) return value
    return d.toLocaleDateString('en-MY', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return value
  }
}

function PromoSuccessInner() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<Status>('loading')
  const [info, setInfo] = useState<BookingInfo>({})
  const whatsappNumber = business.whatsapp.replace(/[^0-9]/g, '')

  useEffect(() => {
    const orderIdFromUrl = searchParams.get('orderId')
    let orderId: string | null = orderIdFromUrl
    if (!orderId) {
      try { orderId = sessionStorage.getItem('onex_order_id') } catch { orderId = null }
    }

    if (!orderId) {
      setStatus('pending')
      return
    }

    fetch(`/api/check-payment-status?orderId=${encodeURIComponent(orderId)}`)
      .then((res) => res.json())
      .then((data) => {
        const next: Status =
          data.status === 'confirmed' || data.status === 'completed'
            ? 'confirmed'
            : data.status === 'cancelled'
              ? 'cancelled'
              : 'pending'
        setStatus(next)
        setInfo({
          customerName: data.customerName,
          vehicleModel: data.vehicleModel,
          preferredDate: data.preferredDate,
          timeSlot: data.timeSlot,
          paymentAmount: data.paymentAmount || data.amount,
          paymentInvoiceNo: data.paymentInvoiceNo,
        })

        if (next === 'confirmed' && typeof window !== 'undefined') {
          const w = window as unknown as { dataLayer?: Record<string, unknown>[] }
          w.dataLayer = w.dataLayer || []
          w.dataLayer.push({
            event: 'purchase',
            value: data.paymentAmount || 50,
            currency: 'MYR',
            content_type: 'service',
            content_name: 'Aidiladha AT Service Deposit',
            transaction_id: data.paymentInvoiceNo || orderId,
          })
        }

        try { sessionStorage.removeItem('onex_order_id') } catch { /* ignore */ }
      })
      .catch(() => setStatus('pending'))
  }, [searchParams])

  const view = ui[status]

  const waText = (() => {
    const lines = [
      'ONEX AIDILADHA AT SERVICE',
      status === 'confirmed'
        ? 'Hi, saya baru sahaja bayar deposit RM50 untuk promo Aidiladha. Sila confirm slot saya.'
        : status === 'cancelled'
          ? 'Hi, saya cuba bayar deposit untuk promo Aidiladha tetapi pembayaran tidak berjaya. Boleh team bantu?'
          : 'Hi, saya baru sahaja submit booking untuk promo Aidiladha. Sila sahkan status pembayaran saya.',
      '',
      `Nama: ${info.customerName || '-'}`,
      `Model Kereta: ${info.vehicleModel || '-'}`,
      `Tarikh: ${info.preferredDate || '-'}`,
      `Slot Masa: ${info.timeSlot || '-'}`,
    ]
    if (info.paymentInvoiceNo) lines.push(`Invoice: ${info.paymentInvoiceNo}`)
    return lines.join('\n')
  })()

  const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waText)}`

  return (
    <section className="min-h-[80vh] bg-white text-neutral-900">
      <div className="container-wide px-6 md:px-12 lg:px-20 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start max-w-5xl mx-auto">
          <div>
            <span
              className={`inline-block px-4 py-1.5 text-overline uppercase tracking-widest font-medium ${view.accent}`}
            >
              {view.label}
            </span>
            <span className="mt-6 block w-12 h-px bg-brand-red" aria-hidden="true" />
            <h1 className="mt-6 text-h2 font-bold text-neutral-950 text-balance">{view.title}</h1>
            <p className="mt-6 text-body-lg text-neutral-600 leading-relaxed">{view.body}</p>
            <p className="mt-4 text-body-sm text-neutral-500">{view.sub}</p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-primary"
              >
                {status === 'cancelled' ? 'WhatsApp untuk bantuan' : 'WhatsApp Sekarang'}
              </a>
              {status === 'cancelled' && (
                <Link href="/promo" className="cta-secondary">
                  Cuba Semula
                </Link>
              )}
              {status !== 'cancelled' && (
                <Link href="/promo" className="cta-secondary">
                  Kembali ke Promo
                </Link>
              )}
            </div>
          </div>

          <div className="border border-neutral-200 p-8 lg:p-10 bg-neutral-50">
            <p className="text-overline uppercase tracking-widest text-neutral-500 font-medium">
              Ringkasan Booking
            </p>
            <span className="mt-3 block w-12 h-px bg-brand-red" aria-hidden="true" />

            <dl className="mt-8 grid gap-px bg-neutral-200 border border-neutral-200">
              {[
                { k: 'Nama', v: info.customerName || '-' },
                { k: 'Kereta', v: info.vehicleModel || '-' },
                { k: 'Tarikh', v: formatDate(info.preferredDate) },
                { k: 'Slot Masa', v: info.timeSlot || '-' },
                {
                  k: 'Deposit Dibayar',
                  v: info.paymentAmount ? `RM ${info.paymentAmount.toFixed(2)}` : 'RM 50.00',
                },
                { k: 'Invoice', v: info.paymentInvoiceNo || '-' },
              ].map((row) => (
                <div key={row.k} className="bg-brand-white px-5 py-4 grid grid-cols-[140px_1fr] gap-4 items-baseline">
                  <dt className="text-overline uppercase tracking-widest text-neutral-500 font-medium">
                    {row.k}
                  </dt>
                  <dd className="text-body-sm text-neutral-900 break-words">{row.v}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 text-caption text-neutral-500 leading-relaxed">
              Deposit RM50 ditolak dari jumlah keseluruhan kos. Baki kos servis (RM24) dan minyak Lubrimaxx (RM65/liter mengikut penggunaan) dibayar selepas servis siap.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function PromoSuccessClient() {
  return (
    <Suspense
      fallback={
        <section className="min-h-[60vh] flex items-center justify-center bg-white">
          <p className="text-body text-neutral-500">Mengesahkan pembayaran...</p>
        </section>
      }
    >
      <PromoSuccessInner />
    </Suspense>
  )
}
