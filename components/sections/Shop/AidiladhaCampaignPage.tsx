'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { business, type Locale } from '@/content'

interface AidiladhaCampaignPageProps {
  locale: Locale
}

type IconName =
  | 'shield'
  | 'clock'
  | 'scan'
  | 'drop'
  | 'gear'
  | 'check'
  | 'warning'
  | 'star'
  | 'location'
  | 'wrench'
  | 'fire'
  | 'bolt'

const TIME_SLOTS = [
  '9:00 AM – 11:00 AM',
  '11:00 AM – 1:00 PM',
  '2:00 PM – 4:00 PM',
  '4:00 PM – 6:00 PM',
]

const TIMER_MINUTES = 15
const TIMER_STORAGE_KEY = 'onex_aidiladha_countdown'

const costEstimates = [
  { litres: '4L', total: 334 },
  { litres: '5L', total: 399 },
  { litres: '7L', total: 529 },
]

const copy = {
  urgencyBar: 'Kempen Aidiladha — Slot terhad minggu ini sahaja',
  badge: 'Promo Aidiladha Terhad',
  headline: 'Servis Gearbox AT Serendah',
  headlineAccent: 'Home to Home Service!',
  subheadline:
    'Kempen Aidiladha untuk kereta jenis gearbox automatik sahaja. RM74 termasuk — Upah kerja, Auto filter, Free Diagnostik Scan dan Free home to home service.',
  subheadlineNote:
    '*Harga Minyak gearbox dikira berasingan mengikut penggunaan kereta anda.',
  ctaPrimary: 'Book Slot Sekarang',
  ctaSecondary: 'WhatsApp Kami',
  stickyCta: 'Book Slot',
  valueBullets: [
    'Kami datang ke rumah, pejabat atau cafe anda',
    'Upah kerja & auto filter termasuk',
    'Free Diagnose Scan',
  ],
  heroStats: [
    { label: 'Rating Google', value: `${business.googleRating}/5 ⭐` },
    { label: 'Kenderaan diservis', value: `${business.customersServed.toLocaleString()}+` },
    { label: 'Tahun pengalaman', value: `${business.yearsExperience}+` },
  ],
  empathyLabel: 'Masalah biasa',
  empathyTitle: 'Adakah kereta anda ada tanda-tanda ini?',
  empathySubtitle:
    'Ramai pemandu tunggu sampai gearbox memang dah rosak. Bila itu jadi, kos repair boleh cecah ribuan ringgit.',
  painItems: [
    { icon: 'gear' as IconName, title: 'Gear kasar atau hentak', desc: 'Rasa tak lancar masa tukar gear, terutama di lampu merah' },
    { icon: 'clock' as IconName, title: 'Delay masa tukar gear', desc: 'Ada jeda atau lambat respons bila tekan minyak' },
    { icon: 'warning' as IconName, title: 'Tak pernah servis gearbox', desc: 'Kebanyakan kereta perlu servis setiap 40,000–60,000 km' },
    { icon: 'fire' as IconName, title: 'Risau kena caj lebih', desc: 'Tak tahu berapa nak bayar dan takut kena overcharge' },
  ],
  empathyWarning:
    'Jangan tunggu sampai rosak — kos overhaul gearbox boleh cecah RM3,000 hingga RM8,000',
  solutionLabel: 'Penyelesaian',
  solutionTitle: 'Servis terus di lokasi anda — tanpa perlu ke bengkel',
  solutionSubtitle:
    'Jimat masa & tenaga, Kami akan buat servis on-site, terangkan keperluan minyak sebelum memulakan kerja, dan pastikan proses dari booking sampai technician tiba berjalan lancar.',
  solutionSteps: [
    {
      num: '01',
      title: 'Free Diagnostik & OBD Scan',
      desc: 'Technician kami diagnostik keadaan gearbox dan scan fault code dahulu sebelum memulakan pekerjaan.',
    },
    {
      num: '02',
      title: 'Sahkan & Terangkan',
      desc: 'Jumlah minyak dan kos disahkan dengan anda sebelum teruskan. Bayar selepas servis siap.',
    },
    {
      num: '03',
      title: 'Servis & Tukar Filter',
      desc: 'Kami servis gearbox AT dan tukar auto filter dengan minyak Lubrimaxx premium. Anggaran 20-30 minit sahaja.',
    },
  ],
  valueLabel: 'Apa yang anda dapat',
  valueTitle: 'Semua ini termasuk dalam RM74!!',
  valueSubtitle: 'Tiada charge tambahan - Kesemua kos utama sudah termasuk',
  valueItems: [
    { icon: 'wrench' as IconName, title: 'Upah kerja', desc: 'Kos tenaga kerja technician berpengalaman' },
    { icon: 'shield' as IconName, title: 'Auto filter baharu', desc: 'High-quality Auto filter untuk gearbox anda' },
    { icon: 'scan' as IconName, title: 'Free Full Diagnose OBD 2 scan', desc: 'Pemeriksaan menyeluruh kondisi gearbox' },
    { icon: 'location' as IconName, title: 'Free Home to Home Service', desc: 'Kami pergi ke tempat anda secara percuma, tiada charge untuk petrol atau tol.' },
  ],
  pricingLabel: 'Struktur harga',
  pricingTitle: 'Harga Servis Tetap, tiada caj tersembunyi',
  pricingSubtitle:
    'RM74 ialah harga servis sahaja. Minyak gearbox dicaj berasingan pada RM65 seliter — kerana setiap kereta AT menggunakan jumlah minyak yang berbeza. Team kami akan whatsapp untuk menjelaskan keperluan minyak untuk kereta anda.',
  pricingNote: 'Servis murah, minyak ikut penggunaan sebenar — lebih adil untuk setiap pelanggan',
  serviceLabel: 'Harga servis',
  serviceIncludes: 'Upah kerja + auto filter + inspection + OBD scan',
  oilLabel: 'Minyak Lubrimaxx',
  oilNote: 'Jumlah liter disahkan dengan anda sebelum kerja bermula',
  estimateTitle: 'Anggaran jumlah keseluruhan kos berdasarkan keperluan minyak',
  estimateNote: 'Termasuk: RM74 upah servis + minyak gearbox RM65/liter',
  estimateCardNote: 'Harga minyak gearbox dikira berasingan mengikut keperluan',
  oilLabel2: 'Lubrimaxx Premium',
  oilTitle: 'Kenapa kami guna Lubrimaxx dan bukan minyak biasa?',
  oilSubtitle:
    'Minyak murah boleh menyebabkan hentakan gear, panas berlebihan dan kerosakan jangka panjang pada gearbox anda.',
  oilItems: [
    { icon: 'gear' as IconName, title: 'Gear lebih lancar', desc: 'Low-viscosity formula untuk respons gear yang lebih responsif' },
    { icon: 'fire' as IconName, title: 'Rintangan haba tinggi', desc: 'Kurang overheat dalam trafik sesak harian Malaysia' },
    { icon: 'shield' as IconName, title: 'Perlindungan anti-wear', desc: 'Melindungi komponen dalaman gearbox untuk jangka hayat lebih panjang' },
    { icon: 'bolt' as IconName, title: 'Stabil stop-go', desc: 'Prestasi konsisten dalam trafik perlahan KL & Selangor' },
  ],
  oilContrast: 'Minyak murah = gear hentak + panas + rosak awal',
  oilPremium: 'Lubrimaxx = lancar + sejuk + tahan lama',
  urgencyLabel: 'Masa terhad',
  urgencyTitle: 'Promo Aidiladha — Slot adalah terhad !!',
  urgencySubtitle: 'Tawaran khas sempena Hari Raya Aidiladha sahaja. Slot makin penuh — lock sekarang sebelum harga kembali normal.',
  urgencyTimer: 'Slot promo akan tamat dalam masa :',
  urgencySlots: 'Slot baki hari ini',
  urgencySlotCount: '7',
  urgencyFeatures: [
    'Harga promo RM74 — terhad',
    'Slot booking terhad setiap hari',
    'Servis on-site — kami datang ke anda',
    'Bayar selepas servis siap',
  ],
  socialLabel: 'Ulasan pelanggan',
  socialTitle: 'Apa kata pelanggan kami',
  socialRating: '4.9/5',
  socialCount: `${business.customersServed.toLocaleString()}+ pelanggan`,
  testimonials: [
    {
      quote: 'Mula ingat harga RM74 tu gimmick je, tapi memang betul. Technician datang rumah, explain siap-siap apa yang buat. Lepas servis, gear memang rasa lebih smooth.',
      author: 'Hakim R.',
      location: 'Shah Alam',
      rating: 5,
    },
    {
      quote: 'Service datang terus ke rumah memang memudahkan. Tak perlu tunggu bengkel. Harga RM74 tu pun jelas dari awal — tak ada tambah-tambah bila dah siap.',
      author: 'Nadia A.',
      location: 'Subang Jaya',
      rating: 5,
    },
    {
      quote: 'Booking mudah, team datang on time. Paling best sebab tak perlu keluar rumah langsung. Harga RM74 tu memang legit, siap explain detail sebelum buat servis.',
      author: 'Firdaus M.',
      location: 'Klang',
      rating: 5,
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
    'Isi maklumat di bawah, pilih tarikh & slot masa.\nUntuk lock slot, hanya perlu deposit serendah RM50 sahaja.\nBaki selebihnya bayar selepas servis siap.',
  labels: {
    name: 'Nama penuh',
    phone: 'Nombor telefon',
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
    atOnly: 'Untuk automatic transmission (AT) sahaja',
  },
  formError: 'Sila lengkapkan nama, telefon, model kereta, tarikh dan slot masa dahulu.',
  submitBtn: 'Confirm Booking via WhatsApp',
  formNote: 'Anda akan dihubungkan ke WhatsApp untuk pengesahan akhir',
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

const iconPaths: Record<IconName, string> = {
  shield: 'M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z',
  clock: 'M12 7v5l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z',
  scan: 'M4 7V5a1 1 0 011-1h2m10 0h2a1 1 0 011 1v2m0 10v2a1 1 0 01-1 1h-2m-10 0H5a1 1 0 01-1-1v-2m3-5h10',
  drop: 'M12 3c2.5 3 5 5.7 5 9a5 5 0 11-10 0c0-3.3 2.5-6 5-9z',
  gear: 'M12 8.5A3.5 3.5 0 1012 15.5 3.5 3.5 0 0012 8.5zm8 3.5l-1.8.8a6.9 6.9 0 00-.3 1l1 1.7-1.8 1.8-1.7-1a6.9 6.9 0 00-1 .3L12 20l-2.4-.6a6.9 6.9 0 00-1-.3l-1.7 1L5.1 18l1-1.7a6.9 6.9 0 00-.3-1L4 12l1.8-.8a6.9 6.9 0 00.3-1l-1-1.7L6.9 6l1.7 1a6.9 6.9 0 001-.3L12 4l2.4.6a6.9 6.9 0 001 .3l1.7-1 1.8 1.8-1 1.7c.1.3.2.7.3 1L20 12z',
  check: 'M5 12.5l4.2 4.2L19 7',
  warning: 'M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z',
  star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  location: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
  wrench: 'M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z',
  fire: 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z',
  bolt: 'M13 10V3L4 14h7v7l9-11h-7z',
}

function Icon({ name, size = 'md' }: { name: IconName; size?: 'sm' | 'md' | 'lg' }) {
  const containerSize = size === 'sm' ? 'h-9 w-9' : size === 'lg' ? 'h-14 w-14' : 'h-11 w-11'
  const svgSize = size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'
  return (
    <span className={`flex ${containerSize} shrink-0 items-center justify-center rounded-2xl border border-brand-red/20 bg-brand-red/10 text-brand-red`}>
      <svg viewBox="0 0 24 24" fill="none" className={svgSize} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d={iconPaths[name]} />
      </svg>
    </span>
  )
}

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-yellow-400">
          <path d={iconPaths.star} />
        </svg>
      ))}
    </div>
  )
}

export default function AidiladhaCampaignPage({ locale: _locale }: AidiladhaCampaignPageProps) {
  const minDate = useMemo(() => getMinDate(), [])
  const whatsappNumber = business.whatsapp.replace(/[^0-9]/g, '')

  const [remainingMs, setRemainingMs] = useState(TIMER_MINUTES * 60 * 1000)
  const [formError, setFormError] = useState('')
  const [form, setForm] = useState({ name: '', phone: '', carModel: '', date: '', timeSlot: '' })

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
    form.name.trim() && form.phone.trim() && form.carModel.trim() && form.date && form.timeSlot
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
      'Harga Servis: RM74 (upah + filter + inspection + OBD scan)',
      'Minyak: Lubrimaxx RM65/liter (ikut penggunaan)',
      '',
      'Saya faham promo ini untuk kereta AT sahaja dan bayar selepas servis. Sila confirm slot saya.',
    ]
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`
  }, [form, whatsappNumber])

  const handleDateChange = (value: string) => {
    const date = new Date(`${value}T00:00:00`)
    if (date.getDay() === 0) { setForm((c) => ({ ...c, date: '' })); return }
    setForm((c) => ({ ...c, date: value }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!canSubmit) { setFormError(copy.formError); return }
    setFormError('')
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  const scrollToBooking = () => {
    document.getElementById('promo-booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const inputClasses =
    'w-full rounded-2xl border border-neutral-200 bg-white px-5 py-4 text-body-sm text-neutral-900 outline-none transition-colors duration-200 placeholder:text-neutral-400 focus:border-brand-red focus:ring-1 focus:ring-brand-red/20'

  return (
    <div className="bg-white pb-24 text-neutral-900">

      {/* ─── Urgency Top Bar ──────────────────────────────────── */}
      <div className="bg-brand-red px-4 py-2.5 text-center text-[12px] font-semibold uppercase tracking-[0.14em] text-white">
        {copy.urgencyBar}
      </div>

      {/* ─── SECTION 1: Hero Banner ───────────────────────────── */}
      <section className="relative overflow-hidden border-b border-neutral-900 bg-neutral-950">
        {/* Background image */}
        <Image
          src="/images/asset promotion/hero-service.jpg"
          alt="One X Transmission gearbox service"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark gradient overlay */}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-neutral-950/70 via-neutral-950/60 to-neutral-950/80" />

        <div className="container-wide relative z-10 flex min-h-[60vh] flex-col items-center justify-center px-6 py-20 text-center md:px-12 lg:px-20">
          {/* Badges */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-red px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_30px_rgba(188,0,0,0.5)]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
              {copy.badge}
            </span>
            <div className="flex items-center gap-2 rounded-full border border-green-500/40 bg-green-500/15 px-4 py-2 text-[11px]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
              <span className="font-medium text-green-300">Slot terbuka hari ini</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(2.6rem,7vw,5.5rem)] font-bold leading-[1.05] tracking-tight text-white drop-shadow-lg">
            {copy.headline}{' '}
            <span className="inline-flex items-baseline gap-3">
              <span className="relative inline-block">
                <span className="text-white/40 line-through decoration-white/60 decoration-2">RM180</span>
              </span>
              <span className="relative inline-block animate-price-pop">
                RM74
                <span className="absolute -bottom-1 left-0 block h-[3px] w-full origin-left animate-underline-draw rounded-full bg-yellow-300" />
              </span>
            </span>
            <span className="mt-3 block text-brand-red">{copy.headlineAccent}</span>
          </h1>

          {/* Scroll-down hint */}
          <div className="mt-12 flex flex-col items-center gap-2 text-white/80">
            <span className="text-[11px] font-semibold uppercase tracking-widest drop-shadow-md">Lihat pakej</span>
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 animate-bounce drop-shadow-md" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: Detail ────────────────────────────────── */}
      <section className="border-b border-neutral-100 bg-white">
        <div className="container-wide px-6 md:px-12 lg:px-20 py-10 md:py-14 lg:py-16">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">

            {/* Left copy */}
            <div>
              {/* Car brand compatibility strip */}
              <div>
                <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-neutral-400">Serasi dengan semua kereta AT</p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                  {[
                    { name: 'Toyota', slug: 'toyota' },
                    { name: 'Honda', slug: 'honda' },
                    { name: 'Hyundai', slug: 'hyundai' },
                    { name: 'Mazda', slug: 'mazda' },
                    { name: 'Nissan', slug: 'nissan' },
                    { name: 'BMW', slug: 'bmw' },
                  ].map(({ name, slug }) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={slug}
                      src={`https://cdn.simpleicons.org/${slug}/9ca3af`}
                      alt={name}
                      title={name}
                      width={36}
                      height={36}
                      className="h-7 w-auto"
                    />
                  ))}
                  {[
                    { name: 'Perodua', src: '/images/brands/perodua.png' },
                    { name: 'Proton',  src: '/images/brands/proton.png'  },
                    { name: 'Mercedes', src: '/images/brands/mercedes.png' },
                  ].map(({ name, src }) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={name}
                      src={src}
                      alt={name}
                      title={name}
                      width={36}
                      height={36}
                      className="h-7 w-auto grayscale opacity-40"
                    />
                  ))}
                </div>
              </div>

              <p className="mt-8 max-w-xl text-body-lg leading-relaxed text-neutral-700">
                {copy.subheadline}
              </p>
              <p className="mt-3 max-w-xl text-[13px] leading-relaxed text-neutral-500">
                {copy.subheadlineNote}
              </p>

              {/* Location tags */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 shrink-0 text-neutral-400" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={iconPaths.location} />
                </svg>
                <span className="text-[11px] font-medium text-neutral-500">Kawasan perkhidmatan:</span>
                {['Klang Valley', 'Selangor'].map((loc) => (
                  <span key={loc} className="inline-flex items-center rounded-full border border-brand-red/30 bg-brand-red/8 px-3 py-1 text-[11px] font-semibold text-brand-red">
                    {loc}
                  </span>
                ))}
              </div>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {copy.valueBullets.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3.5">
                    <svg viewBox="0 0 24 24" fill="none" className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d={iconPaths.check} />
                    </svg>
                    <span className="text-body-sm font-medium text-neutral-800">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={scrollToBooking}
                  className="cta-primary rounded-full px-8 py-4 text-center text-[15px] font-semibold tracking-wide shadow-[0_0_40px_rgba(188,0,0,0.3)]"
                >
                  {copy.ctaPrimary}
                </button>
                <button
                  type="button"
                  onClick={scrollToBooking}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#25D366] bg-[#25D366] px-8 py-4 text-[15px] font-medium text-white transition-all duration-200 hover:bg-[#1ebe5d] hover:border-[#1ebe5d]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.845L0 24l6.335-1.652A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.685-.498-5.24-1.371l-.374-.222-3.882 1.012 1.036-3.785-.243-.389A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                  {copy.ctaSecondary}
                </button>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-3">
                {copy.heroStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-center">
                    <p className="text-[clamp(1rem,2.5vw,1.4rem)] font-bold text-neutral-950">{stat.value}</p>
                    <p className="mt-1 text-[11px] leading-tight text-neutral-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right promo card */}
            <div className="relative">
              <div aria-hidden="true" className="absolute -right-8 -top-8 h-64 w-64 rounded-full bg-brand-red/8 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.1)]">
                <div className="relative aspect-[1/1] overflow-hidden">
                  <Image
                    src="/images/asset promotion/poster-rm114.jpg"
                    alt="Full Package Gearbox Service RM114 — Lubrimaxx ATF"
                    fill
                    priority
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </div>

                <div className="p-5 md:p-6">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-brand-red/25 bg-brand-red/10 p-4">
                      <p className="text-[10px] uppercase tracking-widest text-brand-red">Harga servis</p>
                      <div className="mt-1.5 flex items-baseline gap-2">
                        <p className="text-[2rem] font-bold leading-none text-neutral-950">RM74</p>
                        <span className="text-[13px] font-medium text-neutral-400 line-through">RM180</span>
                      </div>
                      <p className="mt-2 text-[11px] leading-snug text-neutral-500">Upah + Auto filter + Free Scan Diagnose + Free Home to home service</p>
                    </div>
                    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                      <p className="text-[10px] uppercase tracking-widest text-neutral-500">Minyak Lubrimaxx</p>
                      <p className="mt-1.5 text-[1.4rem] font-bold leading-none text-neutral-950">RM65</p>
                      <p className="mt-2 text-[11px] leading-snug text-neutral-500">Per liter ikut penggunaan kereta anda</p>
                    </div>
                  </div>

                  {/* Estimated cost table */}
                  <div className="mt-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-brand-red shrink-0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 7H6a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-3M13 3h5m0 0v5m0-5L10 16"/></svg>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Anggaran jumlah keseluruhan kos berdasarkan keperluan minyak</p>
                    </div>
                    <div className="grid gap-1.5">
                      {costEstimates.map((est, i) => (
                        <div key={est.litres} className={`flex items-center justify-between rounded-xl px-3 py-2.5 ${i === 0 ? 'bg-brand-red/10 border border-brand-red/20' : 'bg-white border border-neutral-200'}`}>
                          <span className={`text-[11px] font-medium ${i === 0 ? 'text-brand-red' : 'text-neutral-600'}`}>{est.litres} × RM65</span>
                          <span className="text-body-sm font-bold text-neutral-900">RM{est.total}</span>
                        </div>
                      ))}
                    </div>
                    <p className="mt-3 text-[11px] leading-relaxed text-neutral-500">
                      Termasuk: <span className="text-neutral-700">RM74</span> upah servis + minyak gearbox <span className="text-neutral-700">RM65/liter</span>
                    </p>
                  </div>

                  {/* WhatsApp confirm note */}
                  <div className="mt-3 flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-3">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="mt-0.5 h-4 w-4 shrink-0 text-green-600"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.845L0 24l6.335-1.652A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.685-.498-5.24-1.371l-.374-.222-3.882 1.012 1.036-3.785-.243-.389A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                    <p className="text-[11px] leading-relaxed text-green-700">
                      Team kami akan WhatsApp untuk sahkan bilangan liter yang sesuai untuk kereta anda sebelum servis bermula.
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-[11px] text-neutral-600">Bayar selepas servis</span>
                    <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-[11px] text-neutral-600">AT sahaja</span>
                    <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-[11px] text-neutral-600">Tiada caj tersembunyi</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── SECTION 3: Solution ──────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-20 pt-4 md:pt-6 pb-8 md:pb-12 lg:pb-14 bg-neutral-50 text-neutral-900 border-t border-neutral-100">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
            <div>
              <span className="overline-label">{copy.solutionLabel}</span>
              <h2 className="mt-4 text-h2 text-neutral-950">{copy.solutionTitle}</h2>
              <p className="mt-4 max-w-lg text-body-lg text-neutral-600">{copy.solutionSubtitle}</p>

              <div className="mt-10 grid gap-4">
                {copy.solutionSteps.map((step) => (
                  <div key={step.num} className="flex gap-5 rounded-[1.5rem] border border-neutral-200 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-red text-sm font-bold text-white">
                      {step.num}
                    </div>
                    <div className="pt-1">
                      <p className="text-body font-semibold text-neutral-950">{step.title}</p>
                      <p className="mt-1.5 text-body-sm leading-relaxed text-neutral-600">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ─── SECTION 4: Value Stack (nested) ───────────────── */}
            <div className="rounded-[2rem] border border-neutral-200 bg-white p-6 md:p-8 shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
              <span className="overline-label">{copy.valueLabel}</span>
              <h3 className="mt-4 text-h3 text-neutral-950">{copy.valueTitle}</h3>
              <p className="mt-2 text-body-sm text-neutral-600">{copy.valueSubtitle}</p>

              <div className="mt-6 grid gap-3">
                {copy.valueItems.map((item) => (
                  <div key={item.title} className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4">
                    <Icon name={item.icon} />
                    <div>
                      <p className="text-body font-medium text-neutral-950">{item.title}</p>
                      <p className="text-body-sm text-neutral-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-brand-red/25 bg-brand-red/10 px-5 py-4">
                <p className="text-[11px] uppercase tracking-widest text-brand-red">Harga pakej</p>
                <p className="mt-1 text-[2.25rem] font-bold text-neutral-950">RM74</p>
                <p className="text-body-sm text-neutral-600">Semua di atas termasuk</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5+6+7: Pricing ───────────────────────────── */}
      <section id="pricing" className="section-light px-6 md:px-12 lg:px-20 py-4 md:py-6">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl">
            <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-6 shadow-sm">
              <span className="overline-label">{copy.pricingLabel}</span>
              <h2 className="mt-3 text-h2 text-neutral-950">{copy.pricingTitle}</h2>
              <p className="mt-3 text-body-lg text-neutral-600">{copy.pricingSubtitle}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 8: Oil USP ───────────────────────────────── */}
      <section id="oil" className="border-t border-neutral-100 bg-neutral-50 px-6 py-10 md:px-12 md:py-14 lg:px-20">
        <div className="container-wide">

          {/* Header */}
          <div className="mb-6">
            <span className="overline-label">{copy.oilLabel2}</span>
            <h2 className="mt-3 text-h2 text-neutral-950">{copy.oilTitle}</h2>
            <p className="mt-2 max-w-xl text-body text-neutral-600">{copy.oilSubtitle}</p>
          </div>

          <div className="grid gap-3 lg:gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            {/* Left — poster */}
            <div className="overflow-hidden">
              <Image
                src="/images/asset promotion/poster-rm114.jpg"
                alt="Lubrimaxx Autosyn Lo-vis Multi Vehicle ATF — Full Package RM114"
                width={800}
                height={800}
                className="block h-auto w-full"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Right — cards + contrast */}
            <div>
              <div className="grid grid-cols-2 gap-3">
                {copy.oilItems.map((item) => (
                  <div
                    key={item.title}
                    className="cursor-default rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-red/30 hover:shadow-[0_6px_24px_rgba(188,0,0,0.1)]"
                  >
                    <Icon name={item.icon} />
                    <h3 className="mt-3 text-[13px] font-semibold text-neutral-950">{item.title}</h3>
                    <p className="mt-1 text-[12px] leading-relaxed text-neutral-500">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Contrast row */}
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3.5">
                  <span className="shrink-0 text-base" aria-hidden="true">❌</span>
                  <p className="text-[13px] text-red-700">{copy.oilContrast}</p>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-3.5">
                  <span className="shrink-0 text-base" aria-hidden="true">✅</span>
                  <p className="text-[13px] font-medium text-green-800">{copy.oilPremium}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── SECTION 9: Urgency / Promo ───────────────────────── */}
      <section className="border-t border-neutral-200 bg-white px-6 py-10 md:px-12 md:py-14 lg:px-20">
        <div className="container-wide">
          <div className="mx-auto max-w-4xl">

            {/* Top label */}
            <div className="flex items-center gap-2 mb-6">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-red" />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-brand-red">{copy.urgencyLabel}</span>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              {/* Left — title + features */}
              <div>
                <h2 className="text-h2 text-neutral-950">{copy.urgencyTitle}</h2>
                <p className="mt-3 max-w-lg text-body text-neutral-500">{copy.urgencySubtitle}</p>

                <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {copy.urgencyFeatures.map((f) => (
                    <div key={f} className="flex items-start gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2.5">
                      <svg viewBox="0 0 24 24" fill="none" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-red" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d={iconPaths.check} />
                      </svg>
                      <span className="text-[12px] font-medium text-neutral-700">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — countdown + slot + CTA */}
              <div className="flex flex-col items-center gap-4 rounded-3xl border border-neutral-200 bg-neutral-50 px-8 py-7 shadow-sm lg:min-w-[260px]">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">{copy.urgencyTimer}</p>

                {/* Countdown */}
                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-center rounded-2xl border border-brand-red/20 bg-white px-5 py-3 shadow-sm">
                    <span className="text-[2.5rem] font-bold leading-none tabular-nums text-neutral-950">{countdown.minutes}</span>
                    <span className="mt-1 text-[10px] uppercase tracking-widest text-neutral-400">minit</span>
                  </div>
                  <span className="text-[2rem] font-bold text-neutral-300" aria-hidden="true">:</span>
                  <div className="flex flex-col items-center rounded-2xl border border-brand-red/20 bg-white px-5 py-3 shadow-sm">
                    <span className="text-[2.5rem] font-bold leading-none tabular-nums text-neutral-950">{countdown.seconds}</span>
                    <span className="mt-1 text-[10px] uppercase tracking-widest text-neutral-400">saat</span>
                  </div>
                </div>

                {/* Slot progress bar */}
                <div className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] text-neutral-500">{copy.urgencySlots}</span>
                    <span className="text-[11px] font-bold text-brand-red">{copy.urgencySlotCount} / 25 slot</span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-neutral-200" aria-hidden="true">
                    <div
                      className="h-full rounded-full bg-brand-red transition-all duration-700"
                      style={{ width: `${(7 / 25) * 100}%` }}
                    />
                  </div>
                  <p className="mt-1.5 text-[10px] text-neutral-400">18 slot telah ditempah hari ini</p>
                </div>

                <button
                  type="button"
                  onClick={scrollToBooking}
                  className="w-full rounded-2xl bg-brand-red px-6 py-3.5 text-[14px] font-semibold text-white shadow-[0_4px_20px_rgba(188,0,0,0.35)] transition-all duration-200 hover:bg-brand-red-dark"
                >
                  {copy.ctaPrimary}
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── SECTION 10: Social Proof ─────────────────────────── */}
      <section className="section-light border-t border-neutral-100 px-6 py-8 md:px-12 md:py-10 lg:px-20">
        <div className="container-wide">

          {/* Header row — compact */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <span className="overline-label">{copy.socialLabel}</span>
              <h2 className="mt-1 text-h3 text-neutral-950">{copy.socialTitle}</h2>
            </div>
            <div className="flex items-center gap-2">
              <StarRating count={5} />
              <span className="text-body-sm font-semibold text-neutral-900">{copy.socialRating}</span>
              <span className="text-[11px] text-neutral-400">·</span>
              <span className="text-[11px] text-neutral-500">{copy.socialCount}</span>
            </div>
          </div>

          {/* Trust pills row */}
          <div className="flex flex-wrap gap-2 mb-6">
            {copy.trustChecks.map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-[12px] font-medium text-neutral-700">
                <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 text-green-600 shrink-0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={iconPaths.check} />
                </svg>
                {item}
              </span>
            ))}
          </div>

          {/* Review cards — single row */}
          <div className="grid gap-3 md:grid-cols-3">
            {copy.testimonials.map((t) => (
              <div key={t.author} className="flex gap-3 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                {/* Avatar square */}
                <div className="h-10 w-10 shrink-0 rounded-xl bg-brand-red/10 flex items-center justify-center">
                  <span className="text-[13px] font-bold text-brand-red">{t.author.charAt(0)}</span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <StarRating count={t.rating} />
                  </div>
                  <p className="text-[12px] leading-relaxed text-neutral-600">"{t.quote}"</p>
                  <p className="mt-2 text-[11px] font-semibold text-neutral-900">{t.author} <span className="font-normal text-neutral-400">· {t.location}</span></p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── SECTION 11+12+13: Booking ────────────────────────── */}
      <section id="promo-booking" className="px-6 md:px-12 lg:px-20 py-8 md:py-12 lg:py-14 bg-white text-neutral-900 border-t border-neutral-100 scroll-mt-20">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">

            {/* Info */}
            <div>
              <span className="overline-label">{copy.bookingLabel}</span>
              <h2 className="mt-4 text-h2 text-neutral-950">{copy.bookingTitle}</h2>
              <p className="mt-4 max-w-lg whitespace-pre-line text-body-lg text-neutral-600">{copy.bookingSubtitle}</p>

              <div className="mt-8 rounded-[2rem] border border-neutral-200 bg-neutral-50 p-6">
                <p className="text-[11px] uppercase tracking-widest text-neutral-500">{copy.labels.summary}</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-brand-red/20 bg-brand-red/10 px-4 py-4">
                    <p className="text-[10px] uppercase tracking-widest text-brand-red">{copy.serviceLabel}</p>
                    <div className="mt-2 flex items-baseline gap-2">
                      <p className="text-[1.75rem] font-bold text-neutral-950">RM74</p>
                      <span className="text-[13px] font-medium text-neutral-400 line-through">RM180</span>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-4">
                    <p className="text-[10px] uppercase tracking-widest text-neutral-500">{copy.oilLabel}</p>
                    <p className="mt-2 text-[1.4rem] font-bold text-neutral-950">RM65/liter</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  <span className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-[11px] text-neutral-600">{copy.helper.afterService}</span>
                  <span className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-[11px] text-neutral-600">{copy.helper.noHidden}</span>
                  <span className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-[11px] text-neutral-600">{copy.helper.atOnly}</span>
                </div>
                <p className="mt-5 text-body-sm leading-relaxed text-neutral-600">{copy.helper.confirmOil}</p>
                <a href={business.phoneTel} className="mt-4 inline-block text-body-sm text-neutral-700 transition-colors hover:text-brand-red">
                  📞 {business.phone}
                </a>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-[0_8px_40px_rgba(0,0,0,0.08)] md:p-8"
            >
              <div className="grid gap-5">
                <div>
                  <label htmlFor="book-name" className="mb-2 block text-body-sm font-medium text-neutral-700">
                    {copy.labels.name}
                  </label>
                  <input
                    id="book-name"
                    value={form.name}
                    onChange={(e) => setForm((c) => ({ ...c, name: e.target.value }))}
                    className={inputClasses}
                    placeholder="Contoh: Ahmad Zulkifli"
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="book-phone" className="mb-2 block text-body-sm font-medium text-neutral-700">
                      {copy.labels.phone}
                    </label>
                    <input
                      id="book-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm((c) => ({ ...c, phone: e.target.value }))}
                      className={inputClasses}
                      placeholder="01X-XXXXXXX"
                    />
                  </div>
                  <div>
                    <label htmlFor="book-car" className="mb-2 block text-body-sm font-medium text-neutral-700">
                      {copy.labels.carModel}
                    </label>
                    <input
                      id="book-car"
                      value={form.carModel}
                      onChange={(e) => setForm((c) => ({ ...c, carModel: e.target.value }))}
                      className={inputClasses}
                      placeholder="Contoh: Proton Persona 2019"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="book-date" className="mb-2 block text-body-sm font-medium text-neutral-700">
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
                  <p className="mt-1.5 text-[11px] text-neutral-600">{copy.helper.closedSunday}</p>
                </div>

                <div>
                  <p className="mb-3 block text-body-sm font-medium text-neutral-700">{copy.labels.time}</p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {TIME_SLOTS.map((slot) => {
                      const selected = form.timeSlot === slot
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setForm((c) => ({ ...c, timeSlot: slot }))}
                          className={`rounded-2xl border px-4 py-3.5 text-body-sm font-medium transition-all duration-200 ${
                            selected
                              ? 'border-brand-red bg-brand-red text-white shadow-[0_0_20px_rgba(188,0,0,0.4)]'
                              : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-brand-red/40 hover:text-neutral-900'
                          }`}
                        >
                          {slot}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {formError && (
                <div className="mt-5 flex items-start gap-3 rounded-2xl border border-brand-red/25 bg-brand-red/10 px-4 py-3">
                  <svg viewBox="0 0 24 24" fill="none" className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={iconPaths.warning} />
                  </svg>
                  <p className="text-body-sm text-neutral-200">{formError}</p>
                </div>
              )}

              <div className="mt-5 flex flex-wrap items-start justify-between gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4">
                <p className="text-body-sm text-neutral-600">{copy.helper.afterService} · {copy.helper.noHidden}</p>
                <p className="text-body-sm text-neutral-500">{copy.helper.confirmOil}</p>
              </div>

              <div className="mt-6 grid gap-3">
                <button
                  type="submit"
                  className="cta-primary w-full rounded-2xl py-5 text-center text-[16px] font-semibold tracking-wide"
                >
                  {copy.submitBtn}
                </button>
                <button
                  type="button"
                  onClick={scrollToBooking}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#25D366] bg-[#25D366] py-4 text-body-sm font-medium text-white transition-all duration-200 hover:bg-[#1ebe5d] hover:border-[#1ebe5d]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.845L0 24l6.335-1.652A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.685-.498-5.24-1.371l-.374-.222-3.882 1.012 1.036-3.785-.243-.389A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                  {copy.ctaSecondary}
                </button>
              </div>

              <p className="mt-4 text-center text-[11px] text-neutral-500">{copy.formNote}</p>
            </form>

          </div>
        </div>
      </section>

      {/* ─── Sticky Bottom CTA ────────────────────────────────── */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/8 bg-neutral-950/95 px-4 py-3 backdrop-blur-md">
        <div className="container-wide flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate text-body-sm font-semibold text-white">Servis Gearbox AT — RM74</p>
            <p className="text-[11px] text-neutral-500">Minyak Lubrimaxx RM65/liter · Bayar selepas servis</p>
          </div>
          <button
            type="button"
            onClick={scrollToBooking}
            className="cta-primary shrink-0 rounded-full px-6 py-3 text-body-sm font-semibold"
          >
            {copy.stickyCta}
          </button>
        </div>
      </div>

    </div>
  )
}
