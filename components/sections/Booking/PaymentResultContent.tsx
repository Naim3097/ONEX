'use client'

import { useEffect, useState } from 'react'
import { type Locale } from '@/content'
import Link from 'next/link'
import FadeIn from '@/components/motion/FadeIn'

type Status = 'loading' | 'confirmed' | 'cancelled' | 'pending'

const messages = {
  en: {
    loading: { title: 'Verifying Payment...', body: 'Please wait while we check your payment status.' },
    confirmed: { title: 'Payment Confirmed', body: 'Your deposit has been received. Our team will contact you shortly to confirm your inspection appointment.' },
    cancelled: { title: 'Payment Cancelled', body: 'Your payment was cancelled or failed. Your booking slot has not been confirmed. You can try again anytime.' },
    pending: { title: 'Booking Submitted', body: 'We\'re still verifying your payment. If it was successful, our team will contact you shortly. You can also confirm via WhatsApp.' },
    whatsapp: 'Confirm via WhatsApp',
    retry: 'Book Again',
    home: 'Back to Home',
    waSuccess: `ONEX BOOKING - Hi, I've just paid the RM2 deposit for a door-to-door inspection. Please confirm my appointment. Thank you!`,
    waFail: `ONEX BOOKING - Hi, I tried to make a booking payment but it didn't go through. Could you help me?`,
    waPending: `ONEX BOOKING - Hi, I just completed the booking process for a door-to-door inspection. Please verify my payment and confirm my appointment. Thank you!`,
  },
  ms: {
    loading: { title: 'Mengesahkan Pembayaran...', body: 'Sila tunggu sementara kami menyemak status pembayaran anda.' },
    confirmed: { title: 'Pembayaran Disahkan', body: 'Deposit anda telah diterima. Pasukan kami akan menghubungi anda untuk mengesahkan temujanji pemeriksaan.' },
    cancelled: { title: 'Pembayaran Dibatalkan', body: 'Pembayaran anda dibatalkan atau gagal. Slot tempahan belum disahkan. Anda boleh cuba semula pada bila-bila masa.' },
    pending: { title: 'Tempahan Dihantar', body: 'Kami masih mengesahkan pembayaran anda. Jika berjaya, pasukan kami akan menghubungi anda. Anda juga boleh sahkan melalui WhatsApp.' },
    whatsapp: 'Sahkan melalui WhatsApp',
    retry: 'Tempah Semula',
    home: 'Kembali ke Laman Utama',
    waSuccess: `ONEX BOOKING - Hi, saya telah membayar deposit RM2 untuk tempahan pemeriksaan pintu ke pintu. Sila sahkan temujanji saya. Terima kasih!`,
    waFail: `ONEX BOOKING - Hi, saya cuba membuat pembayaran tempahan tetapi gagal. Boleh tolong saya?`,
    waPending: `ONEX BOOKING - Hi, saya baru selesai proses tempahan pemeriksaan pintu ke pintu. Sila sahkan pembayaran dan temujanji saya. Terima kasih!`,
  },
  zh: {
    loading: { title: '正在验证付款...', body: '请稍候，我们正在确认您的付款状态。' },
    confirmed: { title: '付款已确认', body: '您的押金已收到。我们的团队将尽快联系您确认检测预约。' },
    cancelled: { title: '付款已取消', body: '您的付款已取消或失败。预约时段尚未确认。您可以随时重试。' },
    pending: { title: '预约已提交', body: '我们仍在验证您的付款。如果成功，我们的团队将尽快联系您。您也可以通过WhatsApp确认。' },
    whatsapp: '通过WhatsApp确认',
    retry: '重新预约',
    home: '返回首页',
    waSuccess: `ONEX BOOKING - 您好，我已支付RM2押金预约上门检测服务。请确认我的预约。谢谢！`,
    waFail: `ONEX BOOKING - 您好，我尝试付款预约但失败了。请问可以帮忙吗？`,
    waPending: `ONEX BOOKING - 您好，我刚完成上门检测预约流程。请验证我的付款并确认预约。谢谢！`,
  },
}

const statusStyles = {
  loading: { border: 'border-neutral-700', bg: 'bg-neutral-900/50', text: 'text-neutral-400' },
  confirmed: { border: 'border-green-800/50', bg: 'bg-green-950/30', text: 'text-green-500' },
  cancelled: { border: 'border-red-900/50', bg: 'bg-red-950/30', text: 'text-red-500' },
  pending: { border: 'border-yellow-800/50', bg: 'bg-yellow-950/30', text: 'text-yellow-500' },
}

const statusIcons = {
  loading: 'M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z',
  confirmed: 'M5 13l4 4L19 7',
  cancelled: 'M6 18L18 6M6 6l12 12',
  pending: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
}

export default function PaymentResultContent({ locale }: { locale: Locale }) {
  const [status, setStatus] = useState<Status>('loading')
  const t = messages[locale] || messages.en

  useEffect(() => {
    const bookingId = typeof window !== 'undefined' ? sessionStorage.getItem('onex_booking_id') : null

    if (!bookingId) {
      setStatus('pending')
      return
    }

    fetch(`/api/check-payment-status?bookingId=${bookingId}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'confirmed' || data.status === 'completed') {
          setStatus('confirmed')
        } else if (data.status === 'cancelled') {
          setStatus('cancelled')
        } else {
          setStatus('pending')
        }
        // Clear bookingId after checking
        sessionStorage.removeItem('onex_booking_id')
      })
      .catch(() => {
        setStatus('pending')
      })
  }, [])

  const msg = t[status]
  const style = statusStyles[status]
  const icon = statusIcons[status]
  const waText = status === 'confirmed' ? t.waSuccess : status === 'cancelled' ? t.waFail : t.waPending
  const waLink = `https://wa.me/+601131051677?text=${encodeURIComponent(waText)}`

  return (
    <section className="section-dark min-h-[80vh] flex items-center justify-center">
      <FadeIn>
        <div className="max-w-md w-full text-center space-y-6 px-5">
          <div className={`w-20 h-20 border ${style.border} ${style.bg} ${style.text} flex items-center justify-center mx-auto`}>
            {status === 'loading' ? (
              <div className="w-10 h-10 border-2 border-neutral-700 border-t-white animate-spin rounded-full" />
            ) : (
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon} />
              </svg>
            )}
          </div>
          <h1 className="text-h3 text-white">{msg.title}</h1>
          <p className="text-neutral-400 text-body-sm">{msg.body}</p>
          {status !== 'loading' && (
            <div className="pt-4 space-y-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-primary block w-full text-center"
              >
                {t.whatsapp}
              </a>
              {status !== 'confirmed' && (
                <Link href={`/${locale}/booking`} className="cta-secondary block w-full text-center">
                  {t.retry}
                </Link>
              )}
              <Link href={`/${locale}`} className="cta-ghost block w-full text-center">
                {t.home}
              </Link>
            </div>
          )}
        </div>
      </FadeIn>
    </section>
  )
}
