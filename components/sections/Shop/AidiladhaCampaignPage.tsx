'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { business, type Locale } from '@/content'

interface AidiladhaCampaignPageProps {
  locale: Locale
}

type IconName = 'shield' | 'clock' | 'scan' | 'drop' | 'gear' | 'check'

const TIME_SLOTS = [
  '9:00 AM - 11:00 AM',
  '11:00 AM - 1:00 PM',
  '2:00 PM - 4:00 PM',
  '4:00 PM - 6:00 PM',
]

const TIMER_MINUTES = 15
const TIMER_STORAGE_KEY = 'onex_aidiladha_countdown'

const campaignCopy = {
  en: {
    badge: 'Limited Aidiladha Promo',
    headline: 'AT Gearbox Service From RM74 - We Come To You',
    subheadline:
      'Aidiladha campaign for automatic transmission cars only. Labour, filter, inspection and OBD scan are included. Gearbox oil is charged separately based on actual usage.',
    ctaPrimary: 'Book Slot Now',
    ctaSecondary: 'Chat on WhatsApp',
    stickyCta: 'Confirm Booking Now',
    valueBullets: [
      'Home, office or cafe service visit',
      'Labour included',
      'Auto filter included',
      'Free gearbox inspection and OBD scan',
    ],
    heroStats: [
      { label: 'Google rating', value: `${business.googleRating}/5` },
      { label: 'Vehicles served', value: `${business.customersServed.toLocaleString()}+` },
      { label: 'Experience', value: `${business.yearsExperience} years` },
    ],
    painTitle: 'Do not wait until it turns into a major gearbox bill.',
    painItems: [
      'Rough or jerking gear changes',
      'Delay when shifting gear',
      'Never serviced the gearbox before',
      'Worried about being overcharged or upsold',
    ],
    painWarning:
      'Many drivers wait until the gearbox is already damaged. Repair costs can easily run into the thousands.',
    solutionTitle: 'A cleaner, faster booking flow with transparent pricing.',
    solutionBody:
      'We perform the service on-site, explain the oil requirement before work starts, and keep the process simple from booking to arrival.',
    solutionSteps: [
      'We inspect your gearbox condition and scan for fault codes.',
      'We service the AT gearbox and replace the auto filter.',
      'We confirm the oil quantity needed for your car and proceed transparently.',
    ],
    valueTitle: 'What you get for RM74',
    includedItems: [
      'Labour charge',
      'Auto filter',
      'Gearbox inspection',
      'OBD scanner diagnostic',
    ],
    pricingTitle: 'Clear pricing, no hidden charges.',
    pricingBody:
      'RM74 is the service fee only. Gearbox oil is billed separately at RM65 per litre because each AT car uses a different amount. That makes the final bill fairer and easier to explain.',
    pricingNote: 'Cheap service, oil follows actual usage - more fair for every customer.',
    serviceLabel: 'Service fee',
    serviceValue: 'RM74',
    oilLabel: 'Lubrimaxx oil',
    oilValue: 'RM65 / litre',
    estimateTitle: 'Estimated total cost',
    oilTitle: 'Why Lubrimaxx oil',
    oilItems: [
      'Smooth shifting with low-viscosity response',
      'Better heat resistance for daily traffic',
      'Anti-wear protection for longer gearbox life',
      'Stable performance in stop-go Malaysian driving',
    ],
    oilWarning: 'Cheap oils can cause jerking, heat build-up and long-term damage.',
    socialTitle: 'Trust signals that reduce hesitation.',
    testimonials: [
      {
        quote: 'Gear change feels smoother immediately. The technician explained the oil quantity first, so there were no surprises.',
        author: 'Hakim, Shah Alam',
      },
      {
        quote: 'Easy booking, arrived on time, and the OBD scan gave me confidence the car was checked properly.',
        author: 'Nadia, Subang',
      },
      {
        quote: 'Much easier than sending the car to a workshop. Clear pricing and proper explanation.',
        author: 'Firdaus, Klang',
      },
    ],
    bookingTitle: 'Book your slot in under a minute.',
    bookingBody:
      'Fill in the essentials, pick a date and time slot, then confirm through WhatsApp. Payment can be made after service.',
    sectionLabels: {
      pain: 'Pain points',
      solution: 'Solution',
      value: 'Value stack',
      pricing: 'Pricing',
      trust: 'Trust',
      booking: 'Booking',
    },
    trustChecks: [
      'AT cars only',
      'No hidden charges',
      'Pay after service',
      'WhatsApp confirmation',
    ],
    labels: {
      name: 'Name',
      phone: 'Phone number',
      carModel: 'Car model',
      date: 'Preferred date',
      time: 'Time slot',
      summary: 'Booking summary',
    },
    helper: {
      timer: 'Promo hold timer',
      atOnly: 'Automatic transmission only',
      afterService: 'Pay after service',
      noHidden: 'No hidden charges',
      closedSunday: 'Closed on Sunday',
      confirmOil: 'We confirm the required litre amount before starting work.',
      serviceIncludes: 'Labour + filter + inspection + OBD scan',
      includedDescription: 'Included inside the RM74 service fee.',
      estimateSuffix: 'Estimated',
      premiumTitle: 'Premium oil protects long-term gearbox performance.',
      premiumBody:
        'Lubrimaxx is positioned as the safer choice when you want smoother shifting and lower heat stress in daily driving.',
    },
    formError: 'Complete your name, phone, car model, date and time slot first.',
  },
  ms: {
    badge: 'Promo Aidiladha Terhad',
    headline: 'Servis Gearbox AT Serendah RM74 - Kami Datang Ke Anda',
    subheadline:
      'Kempen Aidiladha untuk kereta automatik sahaja. Upah kerja, filter, inspection dan OBD scan semua termasuk. Minyak gearbox dikira berasingan ikut penggunaan sebenar.',
    ctaPrimary: 'Book Slot Sekarang',
    ctaSecondary: 'WhatsApp Kami',
    stickyCta: 'Confirm Booking Sekarang',
    valueBullets: [
      'Servis di rumah, pejabat atau cafe',
      'Upah kerja termasuk',
      'Auto filter termasuk',
      'Inspection gearbox dan OBD scan percuma',
    ],
    heroStats: [
      { label: 'Rating Google', value: `${business.googleRating}/5` },
      { label: 'Kenderaan diservis', value: `${business.customersServed.toLocaleString()}+` },
      { label: 'Pengalaman', value: `${business.yearsExperience} tahun` },
    ],
    painTitle: 'Jangan tunggu sampai jadi bil gearbox yang besar.',
    painItems: [
      'Gear kasar atau hentak',
      'Delay masa tukar gear',
      'Tak pernah servis gearbox',
      'Risau kena caj lebih atau upsell tak jelas',
    ],
    painWarning:
      'Ramai pemandu tunggu sampai gearbox memang dah rosak. Bila itu jadi, kos repair boleh cecah ribuan ringgit.',
    solutionTitle: 'Flow yang lebih laju, lebih jelas, lebih senang nak book.',
    solutionBody:
      'Kami buat servis on-site, terangkan keperluan minyak sebelum mula kerja, dan pastikan proses dari booking sampai technician tiba berjalan lancar.',
    solutionSteps: [
      'Kami inspect keadaan gearbox dan scan fault code dahulu.',
      'Kami servis gearbox AT dan tukar auto filter.',
      'Kami sahkan jumlah minyak ikut kereta anda sebelum teruskan kerja.',
    ],
    valueTitle: 'Apa yang anda dapat dengan RM74',
    includedItems: [
      'Upah kerja',
      'Auto filter',
      'Inspection gearbox',
      'Diagnostic OBD scanner',
    ],
    pricingTitle: 'Harga jelas, tiada caj tersembunyi.',
    pricingBody:
      'RM74 ialah harga servis sahaja. Minyak gearbox dicaj berasingan RM65 seliter kerana setiap kereta AT guna jumlah minyak yang berbeza. Ini lebih adil dan lebih telus untuk anda.',
    pricingNote: 'Servis murah, minyak ikut penggunaan - lebih adil untuk setiap pelanggan.',
    serviceLabel: 'Harga servis',
    serviceValue: 'RM74',
    oilLabel: 'Minyak Lubrimaxx',
    oilValue: 'RM65 / liter',
    estimateTitle: 'Anggaran jumlah kos',
    oilTitle: 'Kenapa kami guna Lubrimaxx',
    oilItems: [
      'Pertukaran gear lebih lancar dengan respons kelikatan rendah',
      'Rintangan haba lebih baik untuk trafik harian',
      'Perlindungan anti-wear untuk jangka hayat gearbox',
      'Prestasi lebih stabil dalam pemanduan stop-go Malaysia',
    ],
    oilWarning: 'Minyak murah boleh sebabkan hentakan, panas berlebihan dan kerosakan jangka panjang.',
    socialTitle: 'Sebab pelanggan lebih yakin untuk terus book.',
    testimonials: [
      {
        quote: 'Lepas servis terus rasa gear lebih smooth. Technician explain dulu berapa liter minyak kena guna, jadi tak ada kejutan.',
        author: 'Hakim, Shah Alam',
      },
      {
        quote: 'Booking senang, datang ikut masa, dan OBD scan buat saya lebih yakin kereta memang diperiksa betul-betul.',
        author: 'Nadia, Subang',
      },
      {
        quote: 'Lebih mudah daripada pergi bengkel. Harga jelas dan penerangan pun kemas.',
        author: 'Firdaus, Klang',
      },
    ],
    bookingTitle: 'Book slot anda dalam masa kurang seminit.',
    bookingBody:
      'Isi maklumat penting, pilih tarikh dan slot masa, kemudian confirm melalui WhatsApp. Bayar selepas servis siap.',
    sectionLabels: {
      pain: 'Masalah',
      solution: 'Solusi',
      value: 'Nilai',
      pricing: 'Harga',
      trust: 'Kepercayaan',
      booking: 'Booking',
    },
    trustChecks: [
      'Kereta AT sahaja',
      'Tiada caj tersembunyi',
      'Bayar selepas servis',
      'Pengesahan melalui WhatsApp',
    ],
    labels: {
      name: 'Nama',
      phone: 'Nombor telefon',
      carModel: 'Model kereta',
      date: 'Tarikh pilihan',
      time: 'Slot masa',
      summary: 'Ringkasan booking',
    },
    helper: {
      timer: 'Timer promo anda',
      atOnly: 'Untuk automatic transmission sahaja',
      afterService: 'Bayar selepas servis',
      noHidden: 'Tiada caj tersembunyi',
      closedSunday: 'Tutup pada hari Ahad',
      confirmOil: 'Jumlah liter minyak akan disahkan dengan anda sebelum kerja bermula.',
      serviceIncludes: 'Upah kerja + filter + inspection + OBD scan',
      includedDescription: 'Semua ini termasuk dalam harga servis RM74.',
      estimateSuffix: 'Anggaran',
      premiumTitle: 'Minyak premium bantu lindungi prestasi gearbox untuk jangka panjang.',
      premiumBody:
        'Lubrimaxx dipilih sebagai pilihan yang lebih selamat bila anda mahukan pertukaran gear yang lebih smooth dan kurang tekanan haba dalam pemanduan harian.',
    },
    formError: 'Lengkapkan nama, telefon, model kereta, tarikh dan slot masa dahulu.',
  },
  zh: {
    badge: '开斋节后限时 Aidiladha 优惠',
    headline: 'AT 变速箱保养最低 RM74 - 我们上门服务',
    subheadline:
      '仅限自动变速箱车辆。人工、滤芯、检查和 OBD 扫描已包含。变速箱油按实际使用量另外计算。',
    ctaPrimary: '立即预约时段',
    ctaSecondary: 'WhatsApp 咨询',
    stickyCta: '立即确认预约',
    valueBullets: [
      '可到住家、办公室或 cafe 服务',
      '人工已包含',
      '自动滤芯已包含',
      '免费检查和 OBD 扫描',
    ],
    heroStats: [
      { label: 'Google 评分', value: `${business.googleRating}/5` },
      { label: '服务车辆', value: `${business.customersServed.toLocaleString()}+` },
      { label: '经验', value: `${business.yearsExperience} 年` },
    ],
    painTitle: '不要等到变成高额变速箱维修账单。',
    painItems: [
      '换挡粗糙或顿挫',
      '换挡延迟',
      '从来没做过变速箱保养',
      '担心收费不透明',
    ],
    painWarning: '很多车主拖到变速箱真的出问题才处理，维修费用往往高达数千令吉。',
    solutionTitle: '更顺畅、更透明的预约流程。',
    solutionBody:
      '我们提供上门服务，开工前先说明所需油量，让预约到到场的整个流程更简单。',
    solutionSteps: [
      '先检查变速箱状态并扫描故障码。',
      '进行 AT 变速箱保养并更换自动滤芯。',
      '根据车型确认所需油量后再继续施工。',
    ],
    valueTitle: 'RM74 包含什么',
    includedItems: ['人工', '自动滤芯', '变速箱检查', 'OBD 诊断'],
    pricingTitle: '价格透明，没有隐藏收费。',
    pricingBody:
      'RM74 只是服务费。变速箱油按每升 RM65 另外计算，因为不同 AT 车型所需油量不同。这样更公平，也更透明。',
    pricingNote: '服务费低，油量按实际使用计算，更公平。',
    serviceLabel: '服务费',
    serviceValue: 'RM74',
    oilLabel: 'Lubrimaxx 油',
    oilValue: 'RM65 / 升',
    estimateTitle: '预计总价',
    oilTitle: '为什么使用 Lubrimaxx',
    oilItems: [
      '低粘度反应，换挡更顺',
      '更耐高温，适合日常堵车路况',
      '抗磨损保护，延长变速箱寿命',
      '在马来西亚 stop-go 路况下更稳定',
    ],
    oilWarning: '便宜机油可能导致顿挫、过热和长期损伤。',
    socialTitle: '帮助客户更快做决定的信任信号。',
    testimonials: [
      {
        quote: '保养后换挡马上更顺。技师先说明需要多少油量，所以没有额外惊喜收费。',
        author: 'Hakim, Shah Alam',
      },
      {
        quote: '预约简单，准时到场，OBD 扫描也让我更放心。',
        author: 'Nadia, Subang',
      },
      {
        quote: '比跑去 workshop 更方便，价格透明，解释也很清楚。',
        author: 'Firdaus, Klang',
      },
    ],
    bookingTitle: '一分钟内完成预约。',
    bookingBody: '填写基本资料，选择日期和时段，然后通过 WhatsApp 确认。可在服务完成后付款。',
    sectionLabels: {
      pain: '痛点',
      solution: '方案',
      value: '价值',
      pricing: '价格',
      trust: '信任',
      booking: '预约',
    },
    trustChecks: ['仅限 AT 车', '无隐藏收费', '服务后付款', 'WhatsApp 确认'],
    labels: {
      name: '姓名',
      phone: '电话号码',
      carModel: '车型',
      date: '预约日期',
      time: '时段',
      summary: '预约摘要',
    },
    helper: {
      timer: '优惠倒计时',
      atOnly: '仅限自动变速箱',
      afterService: '服务后付款',
      noHidden: '无隐藏收费',
      closedSunday: '星期日休息',
      confirmOil: '开工前会先与您确认所需油量。',
      serviceIncludes: '人工 + 滤芯 + 检查 + OBD 扫描',
      includedDescription: '以上内容都包含在 RM74 服务费内。',
      estimateSuffix: '预计',
      premiumTitle: '高品质机油更适合长期保护变速箱表现。',
      premiumBody: 'Lubrimaxx 更适合希望换挡更顺、日常驾驶热压力更低的车主。',
    },
    formError: '请先填写姓名、电话、车型、日期和时段。',
  },
} as const

const costEstimates = [
  { litres: '4L', total: 334 },
  { litres: '5L', total: 399 },
  { litres: '7L', total: 529 },
]

function getMinDate() {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  if (tomorrow.getDay() === 0) {
    tomorrow.setDate(tomorrow.getDate() + 1)
  }

  return tomorrow.toISOString().split('T')[0]
}

function formatCountdown(remainingMs: number) {
  const totalSeconds = Math.max(0, Math.floor(remainingMs / 1000))
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0')
  const seconds = String(totalSeconds % 60).padStart(2, '0')
  return `${minutes}:${seconds}`
}

function Icon({ name }: { name: IconName }) {
  const pathByIcon: Record<IconName, string> = {
    shield: 'M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3zm0 5.5v7',
    clock: 'M12 7v5l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z',
    scan: 'M4 7V5a1 1 0 011-1h2m10 0h2a1 1 0 011 1v2m0 10v2a1 1 0 01-1 1h-2m-10 0H5a1 1 0 01-1-1v-2m3-5h10',
    drop: 'M12 3c2.5 3 5 5.7 5 9a5 5 0 11-10 0c0-3.3 2.5-6 5-9z',
    gear: 'M12 8.5A3.5 3.5 0 1012 15.5 3.5 3.5 0 0012 8.5zm8 3.5l-1.8.8a6.9 6.9 0 00-.3 1l1 1.7-1.8 1.8-1.7-1a6.9 6.9 0 00-1 .3L12 20l-2.4-.6a6.9 6.9 0 00-1-.3l-1.7 1L5.1 18l1-1.7a6.9 6.9 0 00-.3-1L4 12l1.8-.8a6.9 6.9 0 00.3-1l-1-1.7L6.9 6l1.7 1a6.9 6.9 0 001-.3L12 4l2.4.6a6.9 6.9 0 001 .3l1.7-1 1.8 1.8-1 1.7c.1.3.2.7.3 1L20 12z',
    check: 'M5 12.5l4.2 4.2L19 7',
  }

  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand-red/20 bg-brand-red/10 text-brand-red">
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d={pathByIcon[name]} />
      </svg>
    </span>
  )
}

export default function AidiladhaCampaignPage({ locale }: AidiladhaCampaignPageProps) {
  const copy = campaignCopy[locale] ?? campaignCopy.en
  const minDate = useMemo(() => getMinDate(), [])
  const whatsappNumber = business.whatsapp.replace(/[^0-9]/g, '')

  const [remainingMs, setRemainingMs] = useState(TIMER_MINUTES * 60 * 1000)
  const [formError, setFormError] = useState('')
  const [form, setForm] = useState({
    name: '',
    phone: '',
    carModel: '',
    date: '',
    timeSlot: '',
  })

  useEffect(() => {
    const now = Date.now()
    const fallbackDeadline = now + TIMER_MINUTES * 60 * 1000

    let deadline = fallbackDeadline

    try {
      const storedValue = sessionStorage.getItem(TIMER_STORAGE_KEY)
      const parsedValue = storedValue ? Number(storedValue) : NaN

      if (!Number.isNaN(parsedValue) && parsedValue > now) {
        deadline = parsedValue
      } else {
        sessionStorage.setItem(TIMER_STORAGE_KEY, String(fallbackDeadline))
      }
    } catch {
      deadline = fallbackDeadline
    }

    const updateCountdown = () => {
      const remaining = deadline - Date.now()

      if (remaining <= 0) {
        const nextDeadline = Date.now() + TIMER_MINUTES * 60 * 1000
        deadline = nextDeadline

        try {
          sessionStorage.setItem(TIMER_STORAGE_KEY, String(nextDeadline))
        } catch {}

        setRemainingMs(TIMER_MINUTES * 60 * 1000)
        return
      }

      setRemainingMs(remaining)
    }

    updateCountdown()
    const interval = window.setInterval(updateCountdown, 1000)

    return () => window.clearInterval(interval)
  }, [])

  const canSubmit =
    form.name.trim() &&
    form.phone.trim() &&
    form.carModel.trim() &&
    form.date &&
    form.timeSlot

  const whatsappUrl = useMemo(() => {
    const message = [
      'ONEX AIDILADHA AT SERVICE',
      `Name: ${form.name || '-'}`,
      `Phone: ${form.phone || '-'}`,
      `Car Model: ${form.carModel || '-'}`,
      `Preferred Date: ${form.date || '-'}`,
      `Time Slot: ${form.timeSlot || '-'}`,
      'Service Price: RM74',
      'Oil Price: Lubrimaxx RM65/litre (usage-based)',
      'Please confirm my booking slot. I understand this promo is for AT cars only.',
    ].join('\n')

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
  }, [form, whatsappNumber])

  const inputClasses =
    'w-full rounded-[1.5rem] border border-white/10 bg-neutral-950 px-5 py-4 text-body-sm text-white outline-none transition-colors duration-200 placeholder:text-neutral-500 focus:border-brand-red'

  const scrollToBooking = () => {
    document.getElementById('promo-booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleDateChange = (value: string) => {
    const date = new Date(`${value}T00:00:00`)

    if (date.getDay() === 0) {
      setForm((current) => ({ ...current, date: '' }))
      return
    }

    setForm((current) => ({ ...current, date: value }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!canSubmit) {
      setFormError(copy.formError)
      return
    }

    setFormError('')
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="bg-brand-black pb-28 text-neutral-200">
      <section className="relative overflow-hidden border-b border-white/5 bg-[radial-gradient(circle_at_top_left,_rgba(171,32,32,0.35),_transparent_42%),linear-gradient(135deg,_#090909_0%,_#111111_55%,_#1a0c0c_100%)] pt-28 md:pt-32">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(0,0,0,0.45)_100%)]" />
        <div className="container-wide section-padding relative z-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-center">
            <div>
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-brand-red/30 bg-brand-red/10 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-brand-red">
                  {copy.badge}
                </span>
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-neutral-300">
                  {copy.helper.timer}: <span className="ml-2 font-semibold text-white">{formatCountdown(remainingMs)}</span>
                </div>
              </div>

              <h1 className="max-w-4xl text-display text-white">{copy.headline}</h1>
              <p className="mt-6 max-w-2xl text-body-lg text-neutral-300">{copy.subheadline}</p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {copy.valueBullets.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-[1.25rem] border border-white/8 bg-white/5 px-4 py-3 backdrop-blur-sm">
                    <Icon name="check" />
                    <span className="text-body-sm text-neutral-100">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button type="button" onClick={scrollToBooking} className="cta-primary rounded-full text-center">
                  {copy.ctaPrimary}
                </button>
                <Link href={business.whatsappInquiry} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full border border-white/10 px-8 py-4 text-body-sm font-medium tracking-wide text-white transition-colors duration-200 hover:border-brand-red hover:bg-brand-red/10">
                  {copy.ctaSecondary}
                </Link>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {copy.heroStats.map((item) => (
                  <div key={item.label} className="rounded-[1.5rem] border border-white/8 bg-black/25 p-5 backdrop-blur-sm">
                    <p className="text-h4 text-white">{item.value}</p>
                    <p className="mt-1 text-body-sm text-neutral-400">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-5 top-6 hidden h-28 w-28 rounded-full bg-brand-red/20 blur-3xl lg:block" />
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-950/80 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-sm">
                <div className="relative aspect-[4/4.2] overflow-hidden border-b border-white/10">
                  <Image
                    src="/images/asset promotion/PROMO 1 B.jpg"
                    alt="One X Transmission gearbox service promotion"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-3">
                    <span className="rounded-full bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-950">
                      {copy.helper.atOnly}
                    </span>
                    <span className="rounded-full border border-white/15 bg-black/35 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                      Lubrimaxx Premium Oil
                    </span>
                  </div>
                </div>

                <div className="grid gap-5 p-6 md:p-7">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[1.5rem] border border-brand-red/20 bg-brand-red/10 p-5">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-brand-red">{copy.serviceLabel}</p>
                      <p className="mt-2 text-h2 text-white">{copy.serviceValue}</p>
                      <p className="mt-2 text-body-sm text-neutral-300">{copy.helper.serviceIncludes}</p>
                    </div>
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-400">{copy.oilLabel}</p>
                      <p className="mt-2 text-h3 text-white">{copy.oilValue}</p>
                      <p className="mt-2 text-body-sm text-neutral-400">{copy.helper.confirmOil}</p>
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-5">
                    <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4 text-body-sm text-neutral-400">
                      <span>{copy.estimateTitle}</span>
                      <span>{copy.helper.noHidden}</span>
                    </div>
                    <div className="mt-4 grid gap-3">
                      {costEstimates.map((item) => (
                        <div key={item.litres} className="flex items-center justify-between rounded-[1rem] bg-white/5 px-4 py-3">
                          <span className="text-body text-neutral-200">{item.litres}</span>
                          <span className="text-body font-medium text-white">RM{item.total}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-light section-padding">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <span className="overline-label">{copy.sectionLabels.pain}</span>
              <h2 className="mt-5 max-w-xl text-h2 text-neutral-950">{copy.painTitle}</h2>
              <p className="mt-5 max-w-lg text-body-lg text-neutral-600">{copy.painWarning}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {copy.painItems.map((item, index) => (
                <div key={item} className="rounded-[1.75rem] border border-neutral-200 bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.05)]">
                  <div className="mb-4 flex items-center justify-between">
                    <Icon name={index % 2 === 0 ? 'gear' : 'clock'} />
                    <span className="text-[11px] uppercase tracking-[0.18em] text-neutral-400">0{index + 1}</span>
                  </div>
                  <p className="text-body text-neutral-800">{item}</p>
                </div>
              ))}
              <div className="rounded-[1.75rem] border border-brand-red/15 bg-brand-red/5 p-6 sm:col-span-2">
                <p className="text-h4 text-neutral-950">{copy.pricingNote}</p>
                <p className="mt-3 max-w-2xl text-body text-neutral-600">{copy.solutionBody}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-dark section-padding">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
            <div>
              <span className="overline-label">{copy.sectionLabels.solution}</span>
              <h2 className="mt-5 text-h2 text-white">{copy.solutionTitle}</h2>
              <p className="mt-5 max-w-xl text-body-lg text-neutral-400">{copy.solutionBody}</p>

              <div className="mt-8 grid gap-4">
                {copy.solutionSteps.map((item, index) => (
                  <div key={item} className="flex gap-4 rounded-[1.5rem] border border-white/8 bg-white/5 p-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-red text-sm font-semibold text-white">
                      0{index + 1}
                    </div>
                    <p className="pt-2 text-body text-neutral-200">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="rounded-[2rem] border border-white/10 bg-neutral-950 p-6 md:p-8">
                <span className="overline-label">{copy.sectionLabels.value}</span>
                <h3 className="mt-5 text-h3 text-white">{copy.valueTitle}</h3>
                <div className="mt-8 grid gap-4">
                  {copy.includedItems.map((item, index) => (
                    <div key={item} className="flex items-center gap-4 rounded-[1.25rem] border border-white/8 bg-white/5 px-5 py-4">
                      <Icon name={index === 3 ? 'scan' : index === 1 ? 'shield' : 'check'} />
                      <div>
                        <p className="text-body text-white">{item}</p>
                        <p className="text-body-sm text-neutral-400">{copy.helper.includedDescription}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-light section-padding" id="pricing">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="overline-label">{copy.sectionLabels.pricing}</span>
            <h2 className="mt-5 text-h2 text-neutral-950">{copy.pricingTitle}</h2>
            <p className="mt-5 text-body-lg text-neutral-600">{copy.pricingBody}</p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="grid gap-4">
              <div className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.05)]">
                <div className="flex items-center justify-between gap-4 border-b border-neutral-200 pb-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">{copy.serviceLabel}</p>
                    <p className="mt-2 text-h3 text-neutral-950">{copy.serviceValue}</p>
                  </div>
                  <Icon name="check" />
                </div>
                <p className="mt-4 text-body text-neutral-600">{copy.helper.serviceIncludes}</p>
              </div>

              <div className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.05)]">
                <div className="flex items-center justify-between gap-4 border-b border-neutral-200 pb-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">{copy.oilLabel}</p>
                    <p className="mt-2 text-h3 text-neutral-950">{copy.oilValue}</p>
                  </div>
                  <Icon name="drop" />
                </div>
                <p className="mt-4 text-body text-neutral-600">{copy.helper.confirmOil}</p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-neutral-200 bg-neutral-950 p-6 text-white shadow-[0_32px_100px_rgba(0,0,0,0.18)] md:p-8">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-5">
                <h3 className="text-h3">{copy.estimateTitle}</h3>
                <span className="rounded-full bg-brand-red px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-white">RM74 + oil usage</span>
              </div>
              <div className="mt-6 grid gap-4">
                {costEstimates.map((item) => (
                  <div key={item.litres} className="grid grid-cols-[1fr_auto_auto] items-center gap-4 rounded-[1.25rem] border border-white/8 bg-white/5 px-5 py-4">
                    <div>
                      <p className="text-body text-white">{item.litres} Lubrimaxx oil</p>
                      <p className="text-body-sm text-neutral-400">RM74 service + {item.litres.replace('L', '')} x RM65 oil</p>
                    </div>
                    <div className="hidden text-body-sm text-neutral-500 sm:block">{copy.helper.estimateSuffix}</div>
                    <div className="text-body-lg font-semibold text-white">RM{item.total}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-dark section-padding" id="oil">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <span className="overline-label">Lubrimaxx</span>
              <h2 className="mt-5 text-h2 text-white">{copy.oilTitle}</h2>
              <p className="mt-5 max-w-xl text-body-lg text-neutral-400">{copy.oilWarning}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {copy.oilItems.map((item, index) => (
                <div key={item} className="rounded-[1.75rem] border border-white/8 bg-white/5 p-6">
                  <Icon name={index === 0 ? 'gear' : index === 1 ? 'clock' : index === 2 ? 'shield' : 'drop'} />
                  <p className="mt-5 text-body text-neutral-100">{item}</p>
                </div>
              ))}
              <div className="rounded-[1.75rem] border border-brand-red/20 bg-brand-red/10 p-6 sm:col-span-2">
                <p className="text-h4 text-white">{copy.helper.premiumTitle}</p>
                <p className="mt-3 text-body text-neutral-200">{copy.helper.premiumBody}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-light section-padding">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="overline-label">{copy.sectionLabels.trust}</span>
            <h2 className="mt-5 text-h2 text-neutral-950">{copy.socialTitle}</h2>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="grid gap-4">
              {copy.trustChecks.map((item) => (
                <div key={item} className="flex items-center gap-4 rounded-[1.5rem] border border-neutral-200 bg-white px-5 py-4 shadow-[0_18px_50px_rgba(0,0,0,0.04)]">
                  <Icon name="check" />
                  <span className="text-body text-neutral-900">{item}</span>
                </div>
              ))}
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {copy.testimonials.map((item) => (
                <div key={item.author} className="rounded-[1.75rem] border border-neutral-200 bg-white p-6 shadow-[0_22px_70px_rgba(0,0,0,0.05)]">
                  <p className="text-body text-neutral-700">"{item.quote}"</p>
                  <p className="mt-6 text-body-sm font-medium text-neutral-950">{item.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="promo-booking" className="section-dark section-padding scroll-mt-24">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <span className="overline-label">{copy.sectionLabels.booking}</span>
              <h2 className="mt-5 text-h2 text-white">{copy.bookingTitle}</h2>
              <p className="mt-5 max-w-xl text-body-lg text-neutral-400">{copy.bookingBody}</p>

              <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-6">
                <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">{copy.labels.summary}</p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.25rem] bg-neutral-950 px-4 py-4">
                    <p className="text-body-sm text-neutral-500">{copy.serviceLabel}</p>
                    <p className="mt-2 text-h4 text-white">{copy.serviceValue}</p>
                  </div>
                  <div className="rounded-[1.25rem] bg-neutral-950 px-4 py-4">
                    <p className="text-body-sm text-neutral-500">{copy.oilLabel}</p>
                    <p className="mt-2 text-h4 text-white">{copy.oilValue}</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-3 text-body-sm text-neutral-400">
                  <span className="rounded-full border border-white/10 px-4 py-2">{copy.helper.afterService}</span>
                  <span className="rounded-full border border-white/10 px-4 py-2">{copy.helper.noHidden}</span>
                  <span className="rounded-full border border-white/10 px-4 py-2">{copy.helper.atOnly}</span>
                </div>
                <a href={business.phoneTel} className="mt-5 inline-block text-body-sm text-neutral-300 transition-colors duration-200 hover:text-white">
                  {business.phone}
                </a>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-neutral-900 p-6 shadow-[0_35px_120px_rgba(0,0,0,0.32)] md:p-8">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label htmlFor="aidiladha-name" className="mb-2 block text-body-sm text-neutral-400">{copy.labels.name}</label>
                  <input
                    id="aidiladha-name"
                    value={form.name}
                    onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                    className={inputClasses}
                    placeholder={copy.labels.name}
                  />
                </div>

                <div>
                  <label htmlFor="aidiladha-phone" className="mb-2 block text-body-sm text-neutral-400">{copy.labels.phone}</label>
                  <input
                    id="aidiladha-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                    className={inputClasses}
                    placeholder={copy.labels.phone}
                  />
                </div>

                <div>
                  <label htmlFor="aidiladha-car-model" className="mb-2 block text-body-sm text-neutral-400">{copy.labels.carModel}</label>
                  <input
                    id="aidiladha-car-model"
                    value={form.carModel}
                    onChange={(event) => setForm((current) => ({ ...current, carModel: event.target.value }))}
                    className={inputClasses}
                    placeholder={copy.labels.carModel}
                  />
                </div>

                <div>
                  <label htmlFor="aidiladha-date" className="mb-2 block text-body-sm text-neutral-400">{copy.labels.date}</label>
                  <input
                    id="aidiladha-date"
                    type="date"
                    min={minDate}
                    value={form.date}
                    onChange={(event) => handleDateChange(event.target.value)}
                    className={`${inputClasses} [color-scheme:dark]`}
                  />
                  <p className="mt-2 text-[11px] text-neutral-500">{copy.helper.closedSunday}</p>
                </div>

                <div>
                  <p className="mb-2 block text-body-sm text-neutral-400">{copy.labels.time}</p>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {TIME_SLOTS.map((slot) => {
                      const isSelected = form.timeSlot === slot

                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setForm((current) => ({ ...current, timeSlot: slot }))}
                          className={`rounded-[1rem] border px-4 py-3 text-body-sm transition-colors duration-200 ${
                            isSelected
                              ? 'border-brand-red bg-brand-red text-white'
                              : 'border-white/10 bg-neutral-950 text-neutral-300 hover:border-brand-red/50'
                          }`}
                        >
                          {slot}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {formError ? (
                <div className="mt-5 rounded-[1.25rem] border border-brand-red/20 bg-brand-red/10 px-4 py-3 text-body-sm text-neutral-200">
                  {formError}
                </div>
              ) : null}

              <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-black/25 p-5">
                <div className="flex items-center justify-between gap-3 text-body-sm text-neutral-400">
                  <span>{copy.helper.afterService}</span>
                  <span>{copy.helper.noHidden}</span>
                </div>
                <p className="mt-3 text-body text-white">{copy.helper.confirmOil}</p>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button type="submit" className="cta-primary flex-1 rounded-full text-center">
                  {copy.stickyCta}
                </button>
                <Link href={business.whatsappInquiry} target="_blank" rel="noopener noreferrer" className="inline-flex flex-1 items-center justify-center rounded-full border border-white/10 px-6 py-4 text-body-sm font-medium text-white transition-colors duration-200 hover:border-brand-red hover:bg-brand-red/10">
                  {copy.ctaSecondary}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-neutral-950/95 px-4 py-3 backdrop-blur-md">
        <div className="container-wide flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate text-body-sm text-white">{copy.headline}</p>
            <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">{copy.serviceValue} + {copy.oilValue}</p>
          </div>
          <button type="button" onClick={scrollToBooking} className="cta-primary shrink-0 rounded-full px-6 py-3 text-body-sm">
            {copy.stickyCta}
          </button>
        </div>
      </div>
    </div>
  )
}