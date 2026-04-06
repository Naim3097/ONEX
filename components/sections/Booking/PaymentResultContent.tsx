'use client'

import { useSearchParams } from 'next/navigation'
import { type Locale } from '@/content'
import Link from 'next/link'
import FadeIn from '@/components/motion/FadeIn'

const messages = {
  en: {
    success: {
      title: 'Thank You',
      body: 'Your booking deposit has been received. Our team will contact you shortly to confirm your inspection appointment.',
    },
    failed: {
      title: 'Payment Failed',
      body: 'Your payment was declined or could not be processed. Please try again or contact us via WhatsApp for assistance.',
    },
    cancelled: {
      title: 'Payment Cancelled',
      body: 'You cancelled the payment. Your booking slot has not been confirmed. You can try again anytime.',
    },
    whatsapp: 'Contact Us on WhatsApp',
    home: 'Back to Home',
    retry: 'Try Again',
  },
  ms: {
    success: {
      title: 'Terima Kasih',
      body: 'Deposit tempahan anda telah diterima. Pasukan kami akan menghubungi anda untuk mengesahkan temujanji pemeriksaan.',
    },
    failed: {
      title: 'Pembayaran Gagal',
      body: 'Pembayaran anda ditolak atau tidak dapat diproses. Sila cuba semula atau hubungi kami melalui WhatsApp.',
    },
    cancelled: {
      title: 'Pembayaran Dibatalkan',
      body: 'Anda membatalkan pembayaran. Slot tempahan anda belum disahkan. Anda boleh cuba semula pada bila-bila masa.',
    },
    whatsapp: 'Hubungi Kami di WhatsApp',
    home: 'Kembali ke Laman Utama',
    retry: 'Cuba Semula',
  },
  zh: {
    success: {
      title: '谢谢您',
      body: '您的预约押金已收到。我们的团队将尽快联系您确认检测预约。',
    },
    failed: {
      title: '付款失败',
      body: '您的付款被拒绝或无法处理。请重试或通过WhatsApp联系我们。',
    },
    cancelled: {
      title: '付款已取消',
      body: '您取消了付款。预约时段尚未确认。您可以随时重试。',
    },
    whatsapp: '通过WhatsApp联系我们',
    home: '返回首页',
    retry: '重试',
  },
}

export default function PaymentResultContent({ locale }: { locale: Locale }) {
  const searchParams = useSearchParams()
  const t = messages[locale] || messages.en

  // Lean.x may append status_id, invoice_status, or status as query params
  const statusParam = (
    searchParams.get('invoice_status') ||
    searchParams.get('status') ||
    searchParams.get('status_id') ||
    ''
  ).toUpperCase()

  // Determine outcome: default to success (user landed here = payment likely went through)
  let outcome: 'success' | 'failed' | 'cancelled' = 'success'
  if (statusParam === 'FAILED' || statusParam === 'FAIL' || statusParam === '0') {
    outcome = 'failed'
  } else if (statusParam === 'CANCELLED' || statusParam === 'CANCEL') {
    outcome = 'cancelled'
  }

  const msg = t[outcome]

  const iconMap = {
    success: {
      border: 'border-green-800/50',
      bg: 'bg-green-950/30',
      text: 'text-green-500',
      path: 'M5 13l4 4L19 7',
    },
    failed: {
      border: 'border-red-900/50',
      bg: 'bg-red-950/30',
      text: 'text-red-500',
      path: 'M6 18L18 6M6 6l12 12',
    },
    cancelled: {
      border: 'border-yellow-800/50',
      bg: 'bg-yellow-950/30',
      text: 'text-yellow-500',
      path: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z',
    },
  }

  const icon = iconMap[outcome]

  const whatsappMessages = {
    success: {
      en: `ONEX BOOKING - Hi, I've just paid the RM2 deposit for a door-to-door inspection booking. Please confirm my appointment. Thank you!`,
      ms: `ONEX BOOKING - Hi, saya telah membayar deposit RM2 untuk tempahan pemeriksaan pintu ke pintu. Sila sahkan temujanji saya. Terima kasih!`,
      zh: `ONEX BOOKING - 您好，我已支付RM2押金预约上门检测服务。请确认我的预约。谢谢！`,
    },
    failed: {
      en: `ONEX BOOKING - Hi, I tried to make a booking payment but it failed. Could you help me?`,
      ms: `ONEX BOOKING - Hi, saya cuba membuat pembayaran tempahan tetapi gagal. Boleh tolong saya?`,
      zh: `ONEX BOOKING - 您好，我尝试付款预约但失败了。请问可以帮忙吗？`,
    },
    cancelled: {
      en: `ONEX BOOKING - Hi, I cancelled my booking payment. I'd like to reschedule. Can you assist?`,
      ms: `ONEX BOOKING - Hi, saya membatalkan pembayaran tempahan. Saya ingin menjadualkan semula. Boleh bantu?`,
      zh: `ONEX BOOKING - 您好，我取消了预约付款。我想重新安排，请问可以帮忙吗？`,
    },
  }

  const waText = encodeURIComponent(whatsappMessages[outcome][locale] || whatsappMessages[outcome].en)
  const waLink = `https://wa.me/+601131051677?text=${waText}`

  return (
    <section className="section-dark min-h-[80vh] flex items-center justify-center">
      <FadeIn>
        <div className="max-w-md w-full text-center space-y-6 px-5">
          <div className={`w-20 h-20 border ${icon.border} ${icon.bg} ${icon.text} flex items-center justify-center mx-auto`}>
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon.path} />
            </svg>
          </div>
          <h1 className="text-h3 text-white">{msg.title}</h1>
          <p className="text-neutral-400 text-body-sm">{msg.body}</p>
          <div className="pt-4 space-y-3">
            {outcome !== 'success' && (
              <Link href={`/${locale}/booking`} className="cta-primary block w-full text-center">
                {t.retry}
              </Link>
            )}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className={outcome === 'success' ? 'cta-primary block w-full text-center' : 'cta-secondary block w-full text-center'}
            >
              {t.whatsapp}
            </a>
            <Link href={`/${locale}`} className="cta-ghost block w-full text-center">
              {t.home}
            </Link>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
