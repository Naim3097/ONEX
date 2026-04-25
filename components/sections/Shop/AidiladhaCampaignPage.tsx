'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { business, type Locale } from '@/content'

interface AidiladhaCampaignPageProps {
  locale: Locale
}

const TIME_SLOTS = [
  '9:00 AM to 11:00 AM',
  '11:00 AM to 1:00 PM',
  '2:00 PM to 4:00 PM',
  '4:00 PM to 6:00 PM',
]

const TIMER_MINUTES = 15
const TIMER_STORAGE_KEY = 'onex_aidiladha_countdown'
const DEPOSIT_AMOUNT = 50
const FULL_SERVICE_PRICE = 74
const SERVICE_LABEL = 'Aidiladha AT Service Promo'

const costEstimates = [
  { litres: '4L', total: 334 },
  { litres: '5L', total: 399 },
  { litres: '7L', total: 529 },
]

const copy = {
  urgencyBar: 'Kempen Aidiladha. Slot terhad minggu ini sahaja.',
  badge: 'Promo Aidiladha Terhad',
  headline: 'Servis Gearbox AT Serendah',
  headlineAccent: 'Home to Home Service',
  subheadline:
    'Kempen Aidiladha untuk kereta jenis gearbox automatik sahaja. RM74 termasuk upah kerja, auto filter, free diagnostik scan dan free home to home service.',
  subheadlineNote:
    'Harga minyak gearbox dikira berasingan mengikut penggunaan kereta anda.',
  ctaPrimary: 'Book Slot Sekarang',
  ctaSecondary: 'WhatsApp Kami',
  ctaSubmit: 'Bayar Deposit RM50 & Confirm Slot',
  ctaSubmitLoading: 'Memproses pembayaran...',
  stickyCta: 'Book Slot',
  valueBullets: [
    'Kami datang ke rumah, pejabat atau cafe anda',
    'Upah kerja dan auto filter termasuk',
    'Free diagnose scan setiap booking',
  ],
  heroStats: [
    { label: 'Rating Google', value: `${business.googleRating} / 5` },
    { label: 'Kenderaan diservis', value: `${business.customersServed.toLocaleString()}+` },
    { label: 'Tahun pengalaman', value: `${business.yearsExperience}+` },
  ],
  solutionLabel: 'Penyelesaian',
  solutionTitle: 'Servis terus di lokasi anda. Tanpa perlu ke bengkel.',
  solutionSubtitle:
    'Jimat masa dan tenaga. Kami buat servis on site, terangkan keperluan minyak sebelum mula kerja, dan pastikan proses dari booking sampai technician tiba berjalan lancar.',
  solutionSteps: [
    {
      num: '01',
      title: 'Free diagnostik dan OBD scan',
      desc: 'Technician kami diagnostik keadaan gearbox dan scan fault code dahulu sebelum memulakan pekerjaan.',
    },
    {
      num: '02',
      title: 'Sahkan dan terangkan',
      desc: 'Jumlah minyak dan kos disahkan dengan anda sebelum teruskan. Bayar selepas servis siap.',
    },
    {
      num: '03',
      title: 'Servis dan tukar filter',
      desc: 'Kami servis gearbox AT dan tukar auto filter dengan minyak Lubrimaxx premium. Anggaran 20 hingga 30 minit sahaja.',
    },
  ],
  valueLabel: 'Apa yang anda dapat',
  valueTitle: 'Semua ini termasuk dalam RM74',
  valueSubtitle: 'Tiada charge tambahan. Kesemua kos utama sudah termasuk.',
  valueItems: [
    { num: '01', title: 'Upah kerja', desc: 'Kos tenaga kerja technician berpengalaman.' },
    { num: '02', title: 'Auto filter baharu', desc: 'High quality auto filter untuk gearbox anda.' },
    { num: '03', title: 'Free full diagnose OBD2 scan', desc: 'Pemeriksaan menyeluruh kondisi gearbox.' },
    { num: '04', title: 'Free home to home service', desc: 'Kami pergi ke tempat anda secara percuma. Tiada charge untuk petrol atau tol.' },
  ],
  pricingLabel: 'Struktur harga',
  pricingTitle: 'Harga servis tetap. Tiada caj tersembunyi.',
  pricingSubtitle:
    'RM74 ialah harga servis sahaja. Minyak gearbox dicaj berasingan pada RM65 seliter, kerana setiap kereta AT menggunakan jumlah minyak yang berbeza. Team kami akan WhatsApp untuk menjelaskan keperluan minyak untuk kereta anda.',
  serviceLabel: 'Harga servis',
  oilLabel: 'Minyak Lubrimaxx',
  estimateTitle: 'Anggaran jumlah keseluruhan kos',
  estimateNote: 'Termasuk RM74 upah servis dan minyak gearbox RM65 seliter.',
  oilLabel2: 'Lubrimaxx Premium',
  oilTitle: 'Kenapa kami guna Lubrimaxx dan bukan minyak biasa.',
  oilSubtitle:
    'Minyak murah boleh menyebabkan hentakan gear, panas berlebihan dan kerosakan jangka panjang pada gearbox anda.',
  oilItems: [
    { num: '01', title: 'Gear lebih lancar', desc: 'Low viscosity formula untuk respons gear yang lebih responsif.' },
    { num: '02', title: 'Rintangan haba tinggi', desc: 'Kurang overheat dalam trafik sesak harian Malaysia.' },
    { num: '03', title: 'Perlindungan anti wear', desc: 'Melindungi komponen dalaman gearbox untuk jangka hayat lebih panjang.' },
    { num: '04', title: 'Stabil stop go', desc: 'Prestasi konsisten dalam trafik perlahan KL dan Selangor.' },
  ],
  urgencyLabel: 'Masa terhad',
  urgencyTitle: 'Promo Aidiladha. Slot adalah terhad.',
  urgencySubtitle:
    'Tawaran khas sempena Hari Raya Aidiladha sahaja. Slot makin penuh. Lock sekarang sebelum harga kembali normal.',
  urgencyTimer: 'Slot promo akan tamat dalam',
  urgencySlots: 'Slot baki hari ini',
  urgencySlotCount: '7',
  urgencyFeatures: [
    'Harga promo RM74 terhad',
    'Slot booking terhad setiap hari',
    'Servis on site, kami datang ke anda',
    'Deposit RM50 untuk lock slot, baki selepas servis',
  ],
  socialLabel: 'Ulasan pelanggan',
  socialTitle: 'Apa kata pelanggan kami',
  socialRating: '4.9 / 5',
  socialCount: `${business.customersServed.toLocaleString()}+ pelanggan`,
  testimonials: [
    {
      quote:
        'Mula ingat harga RM74 tu gimmick je, tapi memang betul. Technician datang rumah, explain siap siap apa yang buat. Lepas servis, gear memang rasa lebih smooth.',
      author: 'Hakim R.',
      location: 'Shah Alam',
    },
    {
      quote:
        'Service datang terus ke rumah memang memudahkan. Tak perlu tunggu bengkel. Harga RM74 tu pun jelas dari awal. Tak ada tambah tambah bila dah siap.',
      author: 'Nadia A.',
      location: 'Subang Jaya',
    },
    {
      quote:
        'Booking mudah, team datang on time. Paling best sebab tak perlu keluar rumah langsung. Harga RM74 tu memang legit, siap explain detail sebelum buat servis.',
      author: 'Firdaus M.',
      location: 'Klang',
    },
  ],
  trustChecks: [
    '15+ tahun pengalaman',
    'Tiada caj tersembunyi',
    'Bayar selepas servis',
    'Pengesahan melalui WhatsApp',
  ],
  bookingLabel: 'Booking',
  bookingTitle: 'Book slot anda sekarang',
  bookingSubtitle:
    'Isi maklumat di bawah, pilih tarikh dan slot masa.\nUntuk lock slot, bayar deposit RM50 secara online.\nBaki kos servis dan minyak bayar selepas siap.',
  labels: {
    name: 'Nama penuh',
    phone: 'Nombor telefon',
    email: 'Emel (untuk resit pembayaran)',
    carModel: 'Model kereta',
    date: 'Tarikh pilihan',
    time: 'Slot masa',
    summary: 'Ringkasan booking',
  },
  helper: {
    afterService: 'Bayar selepas servis selesai',
    noHidden: 'Tiada caj tersembunyi',
    closedSunday: 'Tutup pada hari Ahad',
    confirmOil: 'Jumlah liter minyak akan disahkan dengan anda sebelum kerja bermula.',
    atOnly: 'Untuk automatic transmission sahaja',
    depositRefund: 'Deposit RM50 ditolak dari jumlah keseluruhan kos.',
  },
  formError: 'Sila lengkapkan nama, telefon, emel, model kereta, tarikh dan slot masa dahulu.',
  paymentError: 'Maaf, gagal memulakan pembayaran. Sila cuba lagi atau hubungi kami melalui WhatsApp.',
  submitBtn: 'Bayar Deposit RM50 & Confirm Slot',
  formNote: 'Anda akan diarahkan ke laman pembayaran selamat Lean.x. Slot akan disahkan selepas pembayaran berjaya.',
  depositSummaryLabel: 'Deposit hari ini',
  remainingLabel: 'Baki dibayar selepas servis',
} as const

function getMinDate() {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  if (tomorrow.getDay() === 0) tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0]
}

function formatCountdown(remainingMs: number) {
  const totalSeconds = Math.max(0, Math.floor(remainingMs / 1000))
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0')
  const seconds = String(totalSeconds % 60).padStart(2, '0')
  return { minutes, seconds }
}

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Promo Aidiladha Servis Gearbox AT RM74',
  serviceType: 'Automatic Transmission Service',
  provider: {
    '@type': 'AutoRepair',
    name: 'One X Transmission',
    telephone: business.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Shah Alam',
      addressRegion: 'Selangor',
      addressCountry: 'MY',
    },
  },
  areaServed: ['Klang Valley', 'Selangor'],
  offers: {
    '@type': 'Offer',
    price: '74',
    priceCurrency: 'MYR',
    description:
      'Servis gearbox automatik termasuk upah kerja, auto filter, full diagnose OBD2 scan dan free home to home service. Minyak Lubrimaxx dicaj berasingan pada RM65 seliter mengikut penggunaan.',
    availability: 'https://schema.org/LimitedAvailability',
  },
}

export default function AidiladhaCampaignPage({ locale: _locale }: AidiladhaCampaignPageProps) {
  const minDate = useMemo(() => getMinDate(), [])
  const whatsappNumber = business.whatsapp.replace(/[^0-9]/g, '')

  const [remainingMs, setRemainingMs] = useState(TIMER_MINUTES * 60 * 1000)
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', carModel: '', date: '', timeSlot: '' })

  useEffect(() => {
    const now = Date.now()
    const fallbackDeadline = now + TIMER_MINUTES * 60 * 1000
    let deadline = fallbackDeadline
    try {
      const stored = sessionStorage.getItem(TIMER_STORAGE_KEY)
      const parsed = stored ? Number(stored) : NaN
      if (!Number.isNaN(parsed) && parsed > now) {
        deadline = parsed
      } else {
        sessionStorage.setItem(TIMER_STORAGE_KEY, String(fallbackDeadline))
      }
    } catch {
      deadline = fallbackDeadline
    }

    const tick = () => {
      const remaining = deadline - Date.now()
      if (remaining <= 0) {
        const next = Date.now() + TIMER_MINUTES * 60 * 1000
        deadline = next
        try { sessionStorage.setItem(TIMER_STORAGE_KEY, String(next)) } catch { /* ignore */ }
        setRemainingMs(TIMER_MINUTES * 60 * 1000)
        return
      }
      setRemainingMs(remaining)
    }

    tick()
    const interval = window.setInterval(tick, 1000)
    return () => window.clearInterval(interval)
  }, [])

  const countdown = formatCountdown(remainingMs)

  const canSubmit = Boolean(
    form.name.trim() &&
      form.phone.trim() &&
      form.email.trim() &&
      form.carModel.trim() &&
      form.date &&
      form.timeSlot
  )

  const whatsappUrl = useMemo(() => {
    const lines = [
      'ONEX AIDILADHA AT SERVICE',
      `Nama: ${form.name || '-'}`,
      `Telefon: ${form.phone || '-'}`,
      `Model Kereta: ${form.carModel || '-'}`,
      `Tarikh: ${form.date || '-'}`,
      `Slot Masa: ${form.timeSlot || '-'}`,
      '',
      'Harga Servis: RM74 (upah, filter, inspection, OBD scan)',
      'Minyak: Lubrimaxx RM65 seliter (ikut penggunaan)',
      '',
      'Saya berminat dengan promo Aidiladha untuk kereta AT. Sila bantu saya tempah slot.',
    ]
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`
  }, [form, whatsappNumber])

  const handleDateChange = (value: string) => {
    const date = new Date(`${value}T00:00:00`)
    if (date.getDay() === 0) { setForm((c) => ({ ...c, date: '' })); return }
    setForm((c) => ({ ...c, date: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!canSubmit) { setFormError(copy.formError); return }
    if (submitting) return

    setFormError('')
    setSubmitting(true)

    try {
      const orderData = {
        orderType: 'aidiladha_promo',
        items: [],
        totalAmount: DEPOSIT_AMOUNT,
        depositAmount: DEPOSIT_AMOUNT,
        fullServicePrice: FULL_SERVICE_PRICE,
        customerName: form.name.trim(),
        customerPhone: form.phone.trim(),
        customerEmail: form.email.trim(),
        customerAddress: '',
        vehicleModel: form.carModel.trim(),
        preferredDate: form.date,
        timeSlot: form.timeSlot,
        notes: 'Aidiladha promo: RM74 servis + Lubrimaxx RM65/liter (mengikut penggunaan). Deposit RM50.',
        status: 'pending_payment',
        paymentStatus: 'pending',
        locale: 'ms',
        createdAt: new Date(),
      }

      const docRef = await addDoc(collection(db, 'orders'), orderData)

      const response = await fetch('/api/shop/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: DEPOSIT_AMOUNT,
          invoiceRef: `ORDER-${docRef.id}`,
          orderId: docRef.id,
          customerName: form.name.trim(),
          customerEmail: form.email.trim(),
          customerPhone: form.phone.trim(),
          returnPath: '/promo/success',
        }),
      })

      const contentType = response.headers.get('content-type') || ''
      if (!contentType.includes('application/json')) {
        throw new Error('Payment gateway not available')
      }
      const paymentData = await response.json()
      if (!response.ok || !paymentData.success || !paymentData.redirectUrl) {
        throw new Error(paymentData.message || paymentData.error || 'Payment init failed')
      }

      if (paymentData.billNo) {
        import('firebase/firestore').then(({ doc, updateDoc }) => {
          updateDoc(doc(db, 'orders', docRef.id), {
            leanxBillNo: paymentData.billNo,
            leanxInvoiceRef: paymentData.invoiceRef,
          }).catch(() => {})
        })
      }

      try { sessionStorage.setItem('onex_order_id', docRef.id) } catch { /* ignore */ }

      if (typeof window !== 'undefined') {
        const w = window as unknown as { dataLayer?: Record<string, unknown>[] }
        w.dataLayer = w.dataLayer || []
        w.dataLayer.push({
          event: 'initiate_checkout',
          value: DEPOSIT_AMOUNT,
          currency: 'MYR',
          content_name: SERVICE_LABEL,
        })
      }

      window.location.href = paymentData.redirectUrl
    } catch (err) {
      console.error('Aidiladha booking error:', err)
      setFormError(copy.paymentError)
      setSubmitting(false)
    }
  }

  const scrollToBooking = () => {
    document.getElementById('promo-booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const inputClasses =
    'w-full border border-neutral-300 bg-white px-5 py-4 text-body-sm text-neutral-900 outline-none transition-colors duration-200 placeholder:text-neutral-400 focus:border-brand-red'

  return (
    <div className="bg-white pb-24 text-neutral-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* Urgency Top Bar */}
      <div className="bg-brand-red px-4 py-2.5 text-center text-overline uppercase tracking-widest text-brand-white font-medium">
        {copy.urgencyBar}
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-black">
        <Image
          src="/images/asset promotion/hero-service.jpg"
          alt="One X Transmission gearbox AT service Aidiladha"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-brand-black/70" />

        <div className="container-wide relative z-10 flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center md:px-12 lg:px-20 lg:py-28">
          <span className="overline-label text-brand-white">{copy.badge}</span>
          <span className="mt-4 block w-12 h-px bg-brand-red" aria-hidden="true" />

          <h1 className="mt-8 text-h1 font-bold tracking-tight text-brand-white text-balance max-w-4xl">
            {copy.headline}{' '}
            <span className="inline-flex items-baseline gap-3">
              <span className="text-brand-white/40 line-through decoration-2">RM180</span>
              <span className="text-brand-red">RM74</span>
            </span>
            <span className="mt-3 block text-brand-white">{copy.headlineAccent}</span>
          </h1>

          <p className="mt-8 max-w-2xl text-body-lg text-neutral-300 leading-relaxed">
            {copy.subheadline}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <button type="button" onClick={scrollToBooking} className="cta-primary">
              {copy.ctaPrimary}
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-secondary"
            >
              {copy.ctaSecondary}
            </a>
          </div>
        </div>
      </section>

      {/* Section after hero. Home to home service */}
      <section className="section-padding bg-brand-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="overline-label">Home to Home Service</span>
              <span className="mt-3 block w-12 h-px bg-brand-red" aria-hidden="true" />
              <h2 className="mt-6 text-h2 font-bold text-neutral-950 text-balance">
                Kami datang ke lokasi anda. Anda tak perlu ke mana mana.
              </h2>
              <p className="mt-6 text-body-lg text-neutral-600 leading-relaxed max-w-xl">
                {copy.subheadline}
              </p>
              <p className="mt-4 text-body-sm text-neutral-500 max-w-xl">
                {copy.subheadlineNote}
              </p>

              <ul className="mt-10 grid gap-4 max-w-xl">
                {copy.valueBullets.map((item, i) => (
                  <li key={item} className="flex items-baseline gap-5 border-t border-neutral-200 pt-4">
                    <span className="text-overline text-brand-red font-medium tracking-widest shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-body text-neutral-800">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <button type="button" onClick={scrollToBooking} className="cta-primary">
                  {copy.ctaPrimary}
                </button>
                <a href={business.phoneTel} className="cta-secondary">
                  {business.phone}
                </a>
              </div>
            </div>

            <div className="w-full">
              <Image
                src="/images/asset promotion/home-to-home.jpeg"
                alt="One X Transmission home to home gearbox service"
                width={1080}
                height={1080}
                className="h-auto w-full"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="mt-16 lg:mt-24 grid grid-cols-3 border-t border-neutral-200">
            {copy.heroStats.map((stat) => (
              <div
                key={stat.label}
                className="border-r border-neutral-200 last:border-r-0 px-4 py-8 lg:py-10 text-center"
              >
                <p className="text-h3 font-bold text-neutral-950">{stat.value}</p>
                <p className="mt-2 text-overline uppercase tracking-widest text-neutral-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process steps */}
      <section className="section-padding bg-neutral-50">
        <div className="container-wide">
          <div className="max-w-3xl mb-12 lg:mb-16">
            <span className="overline-label">{copy.solutionLabel}</span>
            <span className="mt-3 block w-12 h-px bg-brand-red" aria-hidden="true" />
            <h2 className="mt-6 text-h2 font-bold text-neutral-950 text-balance">
              {copy.solutionTitle}
            </h2>
            <p className="mt-6 text-body-lg text-neutral-600 leading-relaxed">
              {copy.solutionSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200">
            {copy.solutionSteps.map((step) => (
              <div key={step.num} className="bg-neutral-50 p-8 lg:p-10">
                <p className="text-overline text-brand-red font-medium tracking-widest">{step.num}</p>
                <h3 className="mt-4 text-h4 font-medium text-neutral-950">{step.title}</h3>
                <p className="mt-4 text-body text-neutral-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="section-padding bg-brand-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-start">
            <div>
              <span className="overline-label">{copy.valueLabel}</span>
              <span className="mt-3 block w-12 h-px bg-brand-red" aria-hidden="true" />
              <h2 className="mt-6 text-h2 font-bold text-neutral-950 text-balance">
                {copy.valueTitle}
              </h2>
              <p className="mt-6 text-body-lg text-neutral-600 leading-relaxed max-w-md">
                {copy.valueSubtitle}
              </p>

              <div className="mt-10 border-t border-b border-neutral-200 py-6">
                <p className="text-overline text-brand-red font-medium tracking-widest">Harga pakej</p>
                <div className="mt-2 flex items-baseline gap-4">
                  <p className="text-display font-bold leading-none text-neutral-950">RM74</p>
                  <span className="text-h4 font-medium text-neutral-400 line-through">RM180</span>
                </div>
                <p className="mt-3 text-body-sm text-neutral-500">Semua perkara di sebelah termasuk.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-neutral-200 border border-neutral-200">
              {copy.valueItems.map((item) => (
                <div key={item.title} className="bg-brand-white p-6 lg:p-8">
                  <p className="text-overline text-brand-red font-medium tracking-widest">{item.num}</p>
                  <h3 className="mt-4 text-h4 font-medium text-neutral-950">{item.title}</h3>
                  <p className="mt-3 text-body-sm text-neutral-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing transparency */}
      <section id="pricing" className="section-padding bg-neutral-50">
        <div className="container-wide">
          <div className="max-w-3xl mb-12">
            <span className="overline-label">{copy.pricingLabel}</span>
            <span className="mt-3 block w-12 h-px bg-brand-red" aria-hidden="true" />
            <h2 className="mt-6 text-h2 font-bold text-neutral-950 text-balance">
              {copy.pricingTitle}
            </h2>
            <p className="mt-6 text-body-lg text-neutral-600 leading-relaxed">
              {copy.pricingSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-neutral-200 border border-neutral-200">
            <div className="bg-brand-white p-8 lg:p-10">
              <p className="text-overline text-brand-red font-medium tracking-widest">{copy.serviceLabel}</p>
              <p className="mt-4 text-h2 font-bold leading-none text-neutral-950">RM74</p>
              <p className="mt-4 text-body-sm text-neutral-600 leading-relaxed">
                Upah kerja, auto filter, inspection dan OBD scan termasuk.
              </p>
            </div>
            <div className="bg-brand-white p-8 lg:p-10">
              <p className="text-overline text-neutral-500 font-medium tracking-widest">{copy.oilLabel}</p>
              <p className="mt-4 text-h2 font-bold leading-none text-neutral-950">RM65</p>
              <p className="mt-4 text-body-sm text-neutral-600 leading-relaxed">
                Per liter, dikira mengikut penggunaan kereta anda.
              </p>
            </div>
            <div className="bg-brand-white p-8 lg:p-10">
              <p className="text-overline text-neutral-500 font-medium tracking-widest">{copy.estimateTitle}</p>
              <ul className="mt-4 grid gap-2">
                {costEstimates.map((est) => (
                  <li
                    key={est.litres}
                    className="flex items-center justify-between border-b border-neutral-200 pb-2 last:border-b-0 last:pb-0"
                  >
                    <span className="text-body-sm text-neutral-600">{est.litres} x RM65</span>
                    <span className="text-body font-bold text-neutral-950">RM{est.total}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-caption text-neutral-500 leading-relaxed">{copy.estimateNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Lubrimaxx */}
      <section id="oil" className="section-padding bg-brand-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="w-full bg-neutral-50">
              <Image
                src="/images/asset promotion/poster-rm114.jpg"
                alt="Lubrimaxx Autosyn Lo vis Multi Vehicle ATF gearbox oil"
                width={1080}
                height={1350}
                className="h-auto w-full"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div>
              <span className="overline-label">{copy.oilLabel2}</span>
              <span className="mt-3 block w-12 h-px bg-brand-red" aria-hidden="true" />
              <h2 className="mt-6 text-h2 font-bold text-neutral-950 text-balance">
                {copy.oilTitle}
              </h2>
              <p className="mt-6 text-body-lg text-neutral-600 leading-relaxed">
                {copy.oilSubtitle}
              </p>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-px bg-neutral-200 border border-neutral-200">
                {copy.oilItems.map((item) => (
                  <div key={item.title} className="bg-brand-white p-6">
                    <p className="text-overline text-brand-red font-medium tracking-widest">{item.num}</p>
                    <h3 className="mt-3 text-h4 font-medium text-neutral-950">{item.title}</h3>
                    <p className="mt-2 text-body-sm text-neutral-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency / countdown */}
      <section className="section-padding bg-brand-black text-brand-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-start">
            <div>
              <span className="overline-label">{copy.urgencyLabel}</span>
              <span className="mt-3 block w-12 h-px bg-brand-red" aria-hidden="true" />
              <h2 className="mt-6 text-h2 font-bold text-brand-white text-balance">
                {copy.urgencyTitle}
              </h2>
              <p className="mt-6 text-body-lg text-neutral-300 leading-relaxed max-w-xl">
                {copy.urgencySubtitle}
              </p>

              <ul className="mt-10 grid gap-4 max-w-xl">
                {copy.urgencyFeatures.map((f, i) => (
                  <li key={f} className="flex items-baseline gap-5 border-t border-neutral-800 pt-4">
                    <span className="text-overline text-brand-red font-medium tracking-widest shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-body text-neutral-200">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-neutral-800 p-8 lg:p-10">
              <p className="text-overline text-neutral-400 font-medium tracking-widest">{copy.urgencyTimer}</p>

              <div className="mt-6 flex items-baseline gap-4">
                <div>
                  <p className="text-display font-bold leading-none tabular-nums text-brand-white">
                    {countdown.minutes}
                  </p>
                  <p className="mt-2 text-overline uppercase tracking-widest text-neutral-500">Minit</p>
                </div>
                <span className="text-display font-bold text-neutral-700 leading-none" aria-hidden="true">:</span>
                <div>
                  <p className="text-display font-bold leading-none tabular-nums text-brand-white">
                    {countdown.seconds}
                  </p>
                  <p className="mt-2 text-overline uppercase tracking-widest text-neutral-500">Saat</p>
                </div>
              </div>

              <div className="mt-10 border-t border-neutral-800 pt-6">
                <div className="flex items-baseline justify-between">
                  <span className="text-overline uppercase tracking-widest text-neutral-400">{copy.urgencySlots}</span>
                  <span className="text-body font-bold text-brand-red">{copy.urgencySlotCount} / 25</span>
                </div>
                <div className="mt-3 h-1 w-full bg-neutral-800" aria-hidden="true">
                  <div
                    className="h-full bg-brand-red transition-all duration-700"
                    style={{ width: `${(7 / 25) * 100}%` }}
                  />
                </div>
                <p className="mt-3 text-caption text-neutral-500">18 slot telah ditempah hari ini.</p>
              </div>

              <button
                type="button"
                onClick={scrollToBooking}
                className="mt-8 cta-primary w-full text-center"
              >
                {copy.ctaPrimary}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-brand-white">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div className="max-w-xl">
              <span className="overline-label">{copy.socialLabel}</span>
              <span className="mt-3 block w-12 h-px bg-brand-red" aria-hidden="true" />
              <h2 className="mt-6 text-h2 font-bold text-neutral-950 text-balance">
                {copy.socialTitle}
              </h2>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-h3 font-bold text-neutral-950">{copy.socialRating}</p>
              <p className="text-overline uppercase tracking-widest text-neutral-500">{copy.socialCount}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200 border border-neutral-200">
            {copy.testimonials.map((t) => (
              <figure key={t.author} className="bg-brand-white p-8 lg:p-10 flex flex-col gap-6">
                <blockquote className="text-body text-neutral-700 leading-relaxed">
                  {t.quote}
                </blockquote>
                <figcaption className="border-t border-neutral-200 pt-4">
                  <p className="text-body font-semibold text-neutral-950">{t.author}</p>
                  <p className="text-caption text-neutral-500">{t.location}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-200 border border-neutral-200">
            {copy.trustChecks.map((item) => (
              <div key={item} className="bg-brand-white px-5 py-5 text-center">
                <p className="text-body-sm font-medium text-neutral-800">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking */}
      <section
        id="promo-booking"
        className="section-padding bg-neutral-50 scroll-mt-20"
      >
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-start">

            <div>
              <span className="overline-label">{copy.bookingLabel}</span>
              <span className="mt-3 block w-12 h-px bg-brand-red" aria-hidden="true" />
              <h2 className="mt-6 text-h2 font-bold text-neutral-950 text-balance">
                {copy.bookingTitle}
              </h2>
              <p className="mt-6 max-w-lg whitespace-pre-line text-body-lg text-neutral-600 leading-relaxed">
                {copy.bookingSubtitle}
              </p>

              <div className="mt-10 border-t border-b border-neutral-200 py-8">
                <p className="text-overline uppercase tracking-widest text-neutral-500">{copy.labels.summary}</p>
                <div className="mt-6 grid grid-cols-2 gap-px bg-neutral-200 border border-neutral-200">
                  <div className="bg-brand-white px-5 py-5">
                    <p className="text-overline text-brand-red font-medium tracking-widest">{copy.serviceLabel}</p>
                    <div className="mt-2 flex items-baseline gap-2">
                      <p className="text-h3 font-bold text-neutral-950">RM74</p>
                      <span className="text-body-sm font-medium text-neutral-400 line-through">RM180</span>
                    </div>
                  </div>
                  <div className="bg-brand-white px-5 py-5">
                    <p className="text-overline text-neutral-500 font-medium tracking-widest">{copy.oilLabel}</p>
                    <p className="mt-2 text-h4 font-bold text-neutral-950">RM65 / liter</p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-px bg-neutral-200 border border-neutral-200">
                  <div className="bg-brand-red px-5 py-5">
                    <p className="text-overline text-brand-white/70 font-medium tracking-widest">{copy.depositSummaryLabel}</p>
                    <p className="mt-2 text-h3 font-bold text-brand-white">RM{DEPOSIT_AMOUNT}</p>
                  </div>
                  <div className="bg-brand-white px-5 py-5">
                    <p className="text-overline text-neutral-500 font-medium tracking-widest">{copy.remainingLabel}</p>
                    <p className="mt-2 text-body-sm text-neutral-700 leading-relaxed">RM{FULL_SERVICE_PRICE - DEPOSIT_AMOUNT} servis + minyak Lubrimaxx ikut penggunaan.</p>
                  </div>
                </div>

                <ul className="mt-6 grid gap-3">
                  <li className="flex items-baseline gap-4 text-body-sm text-neutral-700">
                    <span className="text-overline text-brand-red font-medium tracking-widest w-8 shrink-0">01</span>
                    {copy.helper.depositRefund}
                  </li>
                  <li className="flex items-baseline gap-4 text-body-sm text-neutral-700">
                    <span className="text-overline text-brand-red font-medium tracking-widest w-8 shrink-0">02</span>
                    {copy.helper.noHidden}
                  </li>
                  <li className="flex items-baseline gap-4 text-body-sm text-neutral-700">
                    <span className="text-overline text-brand-red font-medium tracking-widest w-8 shrink-0">03</span>
                    {copy.helper.atOnly}
                  </li>
                </ul>

                <p className="mt-6 text-body-sm text-neutral-500 leading-relaxed">{copy.helper.confirmOil}</p>
                <a
                  href={business.phoneTel}
                  className="mt-6 inline-block text-body font-medium text-neutral-900 underline underline-offset-4 transition-colors hover:text-brand-red"
                >
                  {business.phone}
                </a>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-brand-white border border-neutral-200 p-6 md:p-10"
            >
              <div className="grid gap-6">
                <div>
                  <label htmlFor="book-name" className="mb-2 block text-overline uppercase tracking-widest text-neutral-500 font-medium">
                    {copy.labels.name}
                  </label>
                  <input
                    id="book-name"
                    value={form.name}
                    onChange={(e) => setForm((c) => ({ ...c, name: e.target.value }))}
                    className={inputClasses}
                    placeholder="Contoh Ahmad Zulkifli"
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="book-phone" className="mb-2 block text-overline uppercase tracking-widest text-neutral-500 font-medium">
                      {copy.labels.phone}
                    </label>
                    <input
                      id="book-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm((c) => ({ ...c, phone: e.target.value }))}
                      className={inputClasses}
                      placeholder="01X XXXXXXX"
                    />
                  </div>
                  <div>
                    <label htmlFor="book-email" className="mb-2 block text-overline uppercase tracking-widest text-neutral-500 font-medium">
                      {copy.labels.email}
                    </label>
                    <input
                      id="book-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((c) => ({ ...c, email: e.target.value }))}
                      className={inputClasses}
                      placeholder="contoh@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="book-car" className="mb-2 block text-overline uppercase tracking-widest text-neutral-500 font-medium">
                    {copy.labels.carModel}
                  </label>
                  <input
                    id="book-car"
                    value={form.carModel}
                    onChange={(e) => setForm((c) => ({ ...c, carModel: e.target.value }))}
                    className={inputClasses}
                    placeholder="Contoh Proton Persona 2019"
                  />
                </div>

                <div>
                  <label htmlFor="book-date" className="mb-2 block text-overline uppercase tracking-widest text-neutral-500 font-medium">
                    {copy.labels.date}
                  </label>
                  <input
                    id="book-date"
                    type="date"
                    min={minDate}
                    value={form.date}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className={`${inputClasses} [color-scheme:light]`}
                  />
                  <p className="mt-2 text-caption text-neutral-500">{copy.helper.closedSunday}</p>
                </div>

                <div>
                  <span className="mb-2 block text-overline uppercase tracking-widest text-neutral-500 font-medium">
                    {copy.labels.time}
                  </span>
                  <div className="grid grid-cols-2 gap-px bg-neutral-200 border border-neutral-200">
                    {TIME_SLOTS.map((slot) => {
                      const active = form.timeSlot === slot
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setForm((c) => ({ ...c, timeSlot: slot }))}
                          className={`px-4 py-4 text-body-sm font-medium transition-colors duration-200 ${
                            active
                              ? 'bg-brand-red text-brand-white'
                              : 'bg-brand-white text-neutral-700 hover:bg-neutral-50'
                          }`}
                          aria-pressed={active}
                        >
                          {slot}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {formError && (
                <div className="mt-6 border border-brand-red bg-brand-white px-5 py-4">
                  <p className="text-body-sm text-brand-red">{formError}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-8 cta-primary w-full text-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? copy.ctaSubmitLoading : copy.submitBtn}
              </button>

              <p className="mt-4 text-center text-caption text-neutral-500">{copy.formNote}</p>
            </form>

          </div>
        </div>
      </section>

      {/* Sticky bottom CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-neutral-800 bg-brand-black px-4 py-3">
        <div className="container-wide flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate text-body-sm font-semibold text-brand-white">Servis Gearbox AT RM74</p>
            <p className="text-caption text-neutral-400 truncate">Minyak Lubrimaxx RM65 seliter. Bayar selepas servis.</p>
          </div>
          <button
            type="button"
            onClick={scrollToBooking}
            className="cta-primary shrink-0"
          >
            {copy.stickyCta}
          </button>
        </div>
      </div>
    </div>
  )
}
