'use client'

import { type Locale } from '@/content'
import Link from 'next/link'
import FadeIn from '@/components/motion/FadeIn'

const messages = {
  en: {
    title: 'Booking Submitted',
    body: 'We\'re verifying your payment. If your payment was successful, our team will contact you shortly to confirm your inspection appointment. If you cancelled or encountered an issue, you can try again or reach out to us.',
    whatsapp: 'Confirm via WhatsApp',
    retry: 'Book Again',
    home: 'Back to Home',
    waText: `ONEX BOOKING - Hi, I just completed the booking process for a door-to-door inspection. Please verify my payment and confirm my appointment. Thank you!`,
  },
  ms: {
    title: 'Tempahan Dihantar',
    body: 'Kami sedang mengesahkan pembayaran anda. Jika pembayaran berjaya, pasukan kami akan menghubungi anda untuk mengesahkan temujanji. Jika anda membatalkan atau mengalami masalah, sila cuba semula atau hubungi kami.',
    whatsapp: 'Sahkan melalui WhatsApp',
    retry: 'Tempah Semula',
    home: 'Kembali ke Laman Utama',
    waText: `ONEX BOOKING - Hi, saya baru selesai proses tempahan pemeriksaan pintu ke pintu. Sila sahkan pembayaran dan temujanji saya. Terima kasih!`,
  },
  zh: {
    title: '预约已提交',
    body: '我们正在验证您的付款。如果付款成功，我们的团队将尽快联系您确认检测预约。如果您取消了或遇到问题，可以重试或联系我们。',
    whatsapp: '通过WhatsApp确认',
    retry: '重新预约',
    home: '返回首页',
    waText: `ONEX BOOKING - 您好，我刚完成上门检测预约流程。请验证我的付款并确认预约。谢谢！`,
  },
}

export default function PaymentResultContent({ locale }: { locale: Locale }) {
  const t = messages[locale] || messages.en
  const waLink = `https://wa.me/+601131051677?text=${encodeURIComponent(t.waText)}`

  return (
    <section className="section-dark min-h-[80vh] flex items-center justify-center">
      <FadeIn>
        <div className="max-w-md w-full text-center space-y-6 px-5">
          <div className="w-20 h-20 border border-neutral-700 bg-neutral-900/50 text-white flex items-center justify-center mx-auto">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-h3 text-white">{t.title}</h1>
          <p className="text-neutral-400 text-body-sm">{t.body}</p>
          <div className="pt-4 space-y-3">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-primary block w-full text-center"
            >
              {t.whatsapp}
            </a>
            <Link href={`/${locale}/booking`} className="cta-secondary block w-full text-center">
              {t.retry}
            </Link>
            <Link href={`/${locale}`} className="cta-ghost block w-full text-center">
              {t.home}
            </Link>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
