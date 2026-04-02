import { type Locale } from '@/content'
import { generatePageMetadata } from '@/lib/metadata'
import { generateBreadcrumbJsonLd } from '@/lib/structured-data'
import { business } from '@/content'
import FadeIn from '@/components/motion/FadeIn'
import RevealText from '@/components/motion/RevealText'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = l as Locale

  const titles: Record<string, string> = {
    en: 'Gearbox Problem in Kulim or Kedah? Free Diagnosis | One X Transmission',
    ms: 'Masalah Gearbox di Kulim atau Kedah? Diagnosis Percuma | One X Transmission',
    zh: 'Kulim或吉打变速箱问题？免费诊断 | One X Transmission',
  }
  const descriptions: Record<string, string> = {
    en: "CVT shuddering? Gearbox slipping? One X Transmission is Malaysia's trusted gearbox specialist — now serving Kulim, Kedah and Penang. Free professional diagnosis. 15 years experience. 12-month warranty. WhatsApp now.",
    ms: 'CVT bergetar? Gearbox slip? One X Transmission adalah pakar gearbox terpercaya Malaysia — kini melayani Kulim, Kedah dan Pulau Pinang. Diagnosis profesional percuma. 15 tahun pengalaman. Waranti 12 bulan. WhatsApp sekarang.',
    zh: 'CVT震动？变速箱打滑？One X Transmission是马来西亚值得信赖的变速箱专家——现在为Kulim、吉打和槟城提供服务。免费专业诊断。15年经验。12个月保修。立即WhatsApp。',
  }

  return {
    ...generatePageMetadata({
      locale,
      path: '/locations/kulim',
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
    }),
    other: {
      'geo.region': 'MY-02',
      'geo.placename': 'Kulim, Kedah',
    },
  }
}

const kulimWhatsApp =
  'https://wa.me/+601131051677?text=ONEX%20Kulim%20-%20Hi%2C%20I%20have%20a%20gearbox%20problem%20and%20would%20like%20a%20free%20diagnosis.'

const symptomsMap: Record<Locale, string[]> = {
  en: [
    'Car shudders or jerks when pulling away from a stop',
    "Engine revs high but speed doesn't follow (CVT slipping)",
    'Hesitation or delay after shifting into Drive',
    'Whining or humming noise, especially under load',
    'Gearbox warning light on the dashboard',
    'Fuel consumption has suddenly gone up',
    'Had a previous "fix" that didn\'t last',
  ],
  ms: [
    'Kereta bergegar atau terhentak ketika bergerak dari tempat berhenti',
    'Enjin meraung tinggi tetapi kelajuan tidak mengikut (CVT slip)',
    'Kelewatan atau jeda selepas pindah ke gear Drive',
    'Bunyi dengung atau deritan, terutama di bawah beban',
    'Lampu amaran gearbox menyala di papan pemuka',
    'Penggunaan bahan api tiba-tiba meningkat',
    'Pernah "dibaiki" sebelum ini tetapi masalah berulang',
  ],
  zh: [
    '汽车在起步时抖动或冲撞',
    '发动机转速高但车速不跟随（CVT打滑）',
    '换入Drive档后出现犹豫或延迟',
    '在负载下发出嗡嗡声或嘶嘶声',
    '仪表盘上变速箱警告灯亮起',
    '油耗突然增加',
    '曾经"修过"但问题再次出现',
  ],
}

const servicesMap: Record<Locale, { title: string; desc: string }[]> = {
  en: [
    {
      title: 'Free Gearbox Diagnosis',
      desc: "Scanner + physical inspection + road test — no charge, no commitment. We tell you exactly what's wrong before you decide anything.",
    },
    {
      title: 'CVT Overhaul',
      desc: "Full rebuild of CVT belt, pulleys, and valve body. We rebuild your existing unit — we don't just swap to an unknown reconditioned one.",
    },
    {
      title: 'Automatic Transmission Overhaul',
      desc: 'Complete AT strip-down, worn component replacement, pressure test, and recalibration with written warranty.',
    },
    {
      title: 'Transmission Fluid Service',
      desc: 'Full drain-and-refill with the brand-correct ATF or CVT fluid to manufacturer specification.',
    },
    {
      title: 'Torque Converter Service',
      desc: 'Lock-up clutch inspection, rebuild, or replacement — often the cause of shudder and overheating.',
    },
    {
      title: 'ECU / TCU Recalibration',
      desc: 'Transmission control unit reset and adaptation after overhaul or fluid service. Clears fault codes properly.',
    },
  ],
  ms: [
    {
      title: 'Diagnosis Gearbox Percuma',
      desc: 'Scanner + pemeriksaan fizikal + ujian jalan — tiada caj, tiada komitmen. Kami beritahu tepat apa yang salah sebelum anda membuat keputusan.',
    },
    {
      title: 'Overhaul CVT',
      desc: 'Bina semula penuh belt CVT, pulley, dan valve body. Kami membina semula unit sedia ada anda — bukan sekadar menukar kepada unit rekondisi yang tidak diketahui asalnya.',
    },
    {
      title: 'Overhaul Transmisi Automatik',
      desc: 'Pembongkaran penuh AT, penggantian komponen haus, ujian tekanan, dan rekalibrasi dengan waranti bertulis.',
    },
    {
      title: 'Servis Minyak Transmisi',
      desc: 'Saliran dan isi semula penuh dengan cecair ATF atau CVT yang betul mengikut spesifikasi pengeluar.',
    },
    {
      title: 'Servis Torque Converter',
      desc: 'Pemeriksaan, pembinaan semula, atau penggantian lock-up clutch — sering menjadi punca gegaran dan panas melampau.',
    },
    {
      title: 'Kalibrasi Semula ECU / TCU',
      desc: 'Tetapan semula unit kawalan transmisi dan penyesuaian selepas overhaul atau servis cecair. Kod ralat dipadam dengan betul.',
    },
  ],
  zh: [
    {
      title: '免费变速箱诊断',
      desc: '扫描仪 + 实体检查 + 道路测试——免费，无需承诺。在您做决定之前，我们会告诉您确切的问题所在。',
    },
    {
      title: 'CVT大修',
      desc: '全面重建CVT皮带、滑轮和阀体。我们重建您现有的变速箱——而不是换上来源不明的翻新零件。',
    },
    {
      title: '自动变速箱大修',
      desc: '完整拆解AT，更换磨损部件，压力测试，并附书面保修重新校准。',
    },
    {
      title: '变速箱油更换服务',
      desc: '按照制造商规格，使用正确品牌的ATF或CVT液进行全程排放和补充。',
    },
    {
      title: '液力变矩器服务',
      desc: '锁止离合器检查、重建或更换——通常是抖动和过热的根本原因。',
    },
    {
      title: 'ECU / TCU重新校准',
      desc: '大修或液体更换后重置变速箱控制单元并进行自适应标定，正确清除故障代码。',
    },
  ],
}

const stepsMap: Record<Locale, { num: string; title: string; desc: string }[]> = {
  en: [
    {
      num: '01',
      title: 'WhatsApp Us',
      desc: "Describe your car's symptoms — model, year, what you're experiencing. Takes 2 minutes. We respond fast.",
    },
    {
      num: '02',
      title: 'Free Diagnosis',
      desc: 'Bring your car in. We run a full scanner diagnostic and physical check at zero cost. You get an honest written assessment.',
    },
    {
      num: '03',
      title: 'Fixed with Warranty',
      desc: 'Approve the quote, we fix it. Every overhaul comes with a 12-month / 20,000 km warranty. No hidden charges.',
    },
  ],
  ms: [
    {
      num: '01',
      title: 'WhatsApp Kami',
      desc: 'Terangkan simptom kereta anda — model, tahun, apa yang anda alami. Ambil masa 2 minit. Kami balas dengan cepat.',
    },
    {
      num: '02',
      title: 'Diagnosis Percuma',
      desc: 'Bawa kereta anda masuk. Kami jalankan diagnostik scanner penuh dan pemeriksaan fizikal tanpa sebarang kos. Anda dapat penilaian bertulis yang jujur.',
    },
    {
      num: '03',
      title: 'Diperbaiki dengan Waranti',
      desc: 'Lulus sebut harga, kami baiki. Setiap overhaul disertakan waranti 12 bulan / 20,000 km. Tiada caj tersembunyi.',
    },
  ],
  zh: [
    {
      num: '01',
      title: '发送WhatsApp',
      desc: '描述您爱车的症状——车型、年份、您所遇到的问题。仅需2分钟。我们快速回复。',
    },
    {
      num: '02',
      title: '免费诊断',
      desc: '把您的车开来。我们免费进行完整的扫描仪诊断和实体检查，并提供诚实的书面评估报告。',
    },
    {
      num: '03',
      title: '修好并附保修',
      desc: '批准报价后，我们为您维修。每次大修均附12个月 / 20,000公里保修，无隐藏收费。',
    },
  ],
}

const faqsMap: Record<Locale, { q: string; a: string }[]> = {
  en: [
    {
      q: 'Is it worth driving from Kulim or Penang to your workshop?',
      a: "Most customers from the north tell us: yes — especially after a previous failed repair elsewhere. A misdiagnosed gearbox costs more every time it goes back. We give you a proper written diagnosis first, so you're not guessing. Many repairs that local workshops price as RM 5,000–7,000 (replacement unit) we resolve as a RM 2,500–4,000 overhaul of the existing unit.",
    },
    {
      q: 'When is the Kulim branch opening?',
      a: "We are in the process of setting up our Kulim branch. WhatsApp us now and we'll notify you the moment it opens. In the meantime, our Shah Alam workshop is serving northern customers — and we offer door-to-door vehicle collection on request.",
    },
    {
      q: 'My car is difficult to drive — can you collect it?',
      a: "Yes. We offer door-to-door vehicle collection for customers whose car is unsafe or difficult to drive. WhatsApp us and we'll arrange pickup from your location in Kedah or Penang.",
    },
    {
      q: 'How long does a gearbox overhaul take?',
      a: "A standard CVT overhaul takes 3–5 working days. Automatic transmission overhauls typically take 4–7 days. We'll give you a clear timeline before we start, and update you throughout.",
    },
    {
      q: 'What does the 12-month warranty cover?',
      a: 'Our warranty covers the repaired or overhauled components — if the same issue reappears within 12 months or 20,000 km (whichever comes first), we fix it at no additional cost. Terms are stated in writing before you commit.',
    },
  ],
  ms: [
    {
      q: 'Adakah berbaloi untuk memandu dari Kulim atau Penang ke bengkel anda?',
      a: 'Kebanyakan pelanggan dari utara memberitahu kami: ya — terutama selepas pembaikan gagal di tempat lain. Gearbox yang salah diagnosis akan memakan lebih banyak kos setiap kali ia dikembalikan. Kami berikan diagnosis bertulis yang betul dahulu, supaya anda tidak perlu meneka. Banyak pembaikan yang bengkel tempatan hargakan sebagai RM 5,000–7,000 (unit ganti) kami selesaikan sebagai overhaul unit sedia ada pada kos RM 2,500–4,000.',
    },
    {
      q: 'Bilakah cawangan Kulim akan dibuka?',
      a: 'Kami sedang dalam proses menubuhkan cawangan Kulim kami. WhatsApp kami sekarang dan kami akan memberitahu anda sebaik sahaja ia dibuka. Sementara itu, bengkel Shah Alam kami sedang melayani pelanggan dari utara — dan kami menawarkan perkhidmatan pengambilan kenderaan dari pintu ke pintu atas permintaan.',
    },
    {
      q: 'Kereta saya susah dipandu — bolehkah anda mengambilnya?',
      a: 'Ya. Kami menawarkan perkhidmatan pengambilan kenderaan dari pintu ke pintu untuk pelanggan yang keretanya tidak selamat atau sukar dipandu. WhatsApp kami dan kami akan mengatur pengambilan dari lokasi anda di Kedah atau Pulau Pinang.',
    },
    {
      q: 'Berapa lama overhaul gearbox mengambil masa?',
      a: 'Overhaul CVT standard mengambil masa 3–5 hari bekerja. Overhaul transmisi automatik biasanya memakan masa 4–7 hari. Kami akan berikan garis masa yang jelas sebelum kami mulakan, dan mengemas kini anda sepanjang proses.',
    },
    {
      q: 'Apa yang dilindungi oleh waranti 12 bulan?',
      a: 'Waranti kami meliputi komponen yang telah dibaiki atau di-overhaul — jika masalah yang sama muncul semula dalam tempoh 12 bulan atau 20,000 km (yang mana lebih awal), kami membaikinya tanpa kos tambahan. Terma dinyatakan secara bertulis sebelum anda bersetuju.',
    },
  ],
  zh: [
    {
      q: '从Kulim或槟城开车到您的工作室值得吗？',
      a: '北部大多数顾客告诉我们：值得——尤其是在其他地方修过但失败之后。被误诊的变速箱每次回去都会花更多钱。我们先提供正确的书面诊断，让您不再猜测。许多当地车行报价RM 5,000–7,000（换整个单元）的维修，我们只需RM 2,500–4,000的大修即可解决。',
    },
    {
      q: 'Kulim分店什么时候开业？',
      a: '我们正在筹备Kulim分店的开设。现在发WhatsApp给我们，一旦开业我们会立即通知您。与此同时，我们的Shah Alam工作室正在为北部客户提供服务——我们也提供上门取车服务，欢迎提出要求。',
    },
    {
      q: '我的车难以驾驶——你们可以来取车吗？',
      a: '可以。我们为汽车不安全或难以驾驶的客户提供上门取车服务。发WhatsApp给我们，我们将安排从您在吉打或槟城的位置取车。',
    },
    {
      q: '变速箱大修需要多长时间？',
      a: '标准CVT大修需要3–5个工作日。自动变速箱大修通常需要4–7天。我们会在开始前给您明确的时间表，并在整个过程中随时更新进度。',
    },
    {
      q: '12个月保修涵盖哪些内容？',
      a: '我们的保修涵盖已维修或大修的部件——如果同一问题在12个月或20,000公里内（以先到者为准）再次出现，我们将免费修复。条款在您承诺之前以书面形式列明。',
    },
  ],
}

const tableRowsMap: Record<
  Locale,
  { label: string; gen: string; spec: string }[]
> = {
  en: [
    { label: 'Diagnosis approach', gen: 'Visual check, best guess', spec: 'Scanner + hydraulic pressure test + road test' },
    { label: 'When in doubt', gen: 'Replace entire unit (RM 4k–7k)', spec: 'Rebuild your existing unit (RM 2k–4.5k)' },
    { label: 'Parts used', gen: 'Unknown reconditioned', spec: 'Original or verified OEM' },
    { label: 'Warranty', gen: 'Rarely offered', spec: '12 months / 20,000 km — in writing' },
    { label: 'Experience level', gen: 'Gearbox is one of many jobs', spec: 'Transmissions only — 15 years' },
  ],
  ms: [
    { label: 'Kaedah diagnosis', gen: 'Pemeriksaan visual, andaian terbaik', spec: 'Scanner + ujian tekanan hidraulik + ujian jalan' },
    { label: 'Apabila tidak pasti', gen: 'Tukar unit keseluruhan (RM 4k–7k)', spec: 'Bina semula unit sedia ada anda (RM 2k–4.5k)' },
    { label: 'Bahagian digunakan', gen: 'Rekondisi tidak diketahui', spec: 'Asli atau OEM yang disahkan' },
    { label: 'Waranti', gen: 'Jarang ditawarkan', spec: '12 bulan / 20,000 km — secara bertulis' },
    { label: 'Tahap pengalaman', gen: 'Gearbox adalah salah satu daripada banyak kerja', spec: 'Transmisi sahaja — 15 tahun' },
  ],
  zh: [
    { label: '诊断方式', gen: '目测检查，凭经验猜测', spec: '扫描仪 + 液压压力测试 + 道路测试' },
    { label: '不确定时的做法', gen: '更换整个单元（RM 4k–7k）', spec: '重建您现有的单元（RM 2k–4.5k）' },
    { label: '使用零件', gen: '来源不明的翻新件', spec: '原装或已认证OEM零件' },
    { label: '保修', gen: '很少提供', spec: '12个月 / 20,000公里——书面保证' },
    { label: '经验水平', gen: '变速箱只是众多工作之一', spec: '专注变速箱——15年' },
  ],
}

const tMap: Record<Locale, {
  bookingBadge: string
  branchBadge: string
  heroH1: string
  heroBody: string
  heroWACta: string
  trustRating: string
  trustYears: string
  trustCars: string
  trustWarranty: string
  symptomOverline: string
  symptomH2: string
  symptomBody: string
  symptomCta: string
  whyOverline: string
  whyH2: string
  tableHeaderGen: string
  tableHeaderSpec: string
  processOverline: string
  processH2: string
  processBody: string
  processStep1Cta: string
  servicesOverline: string
  servicesH2: string
  servicesBody: string
  areasLabel: string
  faqOverline: string
  faqH2: string
  ctaOverline: string
  ctaH2: string
  ctaBody: string
  ctaNote: string
  ctaWACta: string
  footerWorkshop: string
  footerHours: string
  footerBranch: string
  footerBranchValue: string
  microRating: string
  microYears: string
  microCars: string
  microFree: string
}> = {
  en: {
    bookingBadge: 'Accepting Kedah & Penang Bookings Now',
    branchBadge: 'Kulim Branch Opening Soon',
    heroH1: 'Gearbox Problem in Kulim or Kedah? Get It Diagnosed Free.',
    heroBody: "Malaysia's trusted CVT and automatic gearbox specialist is now serving the north. Free professional diagnosis. Honest written quote. 12‑month warranty on all overhaul work. No fix, no charge.",
    heroWACta: 'WhatsApp for Free Diagnosis',
    trustRating: 'Google Rating',
    trustYears: 'Transmission Only',
    trustCars: 'Cars Fixed',
    trustWarranty: 'Overhaul Warranty',
    symptomOverline: 'Sound Familiar?',
    symptomH2: 'Is Your Car Doing Any of These?',
    symptomBody: "These are the most common gearbox symptoms reported by Kedah and Penang drivers. If your car shows any of them, don't delay — gearbox problems compound fast.",
    symptomCta: 'WhatsApp — Get Free Diagnosis',
    whyOverline: 'Why It Matters',
    whyH2: 'General Workshop vs. Transmission Specialist',
    tableHeaderGen: 'General Workshop',
    tableHeaderSpec: 'One X Transmission',
    processOverline: 'Simple Process',
    processH2: 'How It Works',
    processBody: 'Three steps. No guesswork. No pressure to commit until you see the diagnosis.',
    processStep1Cta: 'Start with Step 1 — WhatsApp Now',
    servicesOverline: 'What We Fix',
    servicesH2: 'Services for Kedah & Penang Drivers',
    servicesBody: 'Every service available at our Shah Alam workshop — and coming to Kulim soon. All major Malaysian and Japanese car brands covered.',
    areasLabel: 'Serving drivers from',
    faqOverline: 'Common Questions',
    faqH2: 'Questions from Kedah & Penang Drivers',
    ctaOverline: 'Ready to Get It Fixed?',
    ctaH2: "Don't Drive a Failing Gearbox Any Longer.",
    ctaBody: "Every kilometre on a slipping or shuddering gearbox adds to the repair cost. WhatsApp us now — describe your symptoms, get an honest response within the hour, and schedule your free diagnosis.",
    ctaNote: 'Northern customers: we are now taking bookings for Kedah and Penang. Kulim branch opening soon.',
    ctaWACta: 'WhatsApp — Free Diagnosis',
    footerWorkshop: 'Workshop (Open Now)',
    footerHours: 'Hours',
    footerBranch: 'Kulim Branch',
    footerBranchValue: 'Kulim, Kedah — Opening Soon',
    microRating: '★ 4.8 Google Rating',
    microYears: '15 Years Specialising in Transmissions',
    microCars: '5,000+ Vehicles Serviced',
    microFree: 'Free Diagnosis — No Commitment',
  },
  ms: {
    bookingBadge: 'Kini Menerima Tempahan Kedah & Pulau Pinang',
    branchBadge: 'Cawangan Kulim Akan Dibuka Tidak Lama Lagi',
    heroH1: 'Masalah Gearbox di Kulim atau Kedah? Dapatkan Diagnosis Percuma.',
    heroBody: 'Pakar CVT dan gearbox automatik terpercaya Malaysia kini melayani utara. Diagnosis profesional percuma. Sebut harga bertulis yang jujur. Waranti 12 bulan untuk semua kerja overhaul. Tiada pembaikan, tiada caj.',
    heroWACta: 'WhatsApp untuk Diagnosis Percuma',
    trustRating: 'Penilaian Google',
    trustYears: 'Khusus Transmisi',
    trustCars: 'Kereta Dibaiki',
    trustWarranty: 'Waranti Overhaul',
    symptomOverline: 'Kedengaran Biasa?',
    symptomH2: 'Adakah Kereta Anda Menunjukkan Ini?',
    symptomBody: 'Ini adalah simptom gearbox paling biasa yang dilaporkan oleh pemandu Kedah dan Pulau Pinang. Jika kereta anda menunjukkan sebarang tanda ini, jangan tangguh — masalah gearbox berkembang dengan cepat.',
    symptomCta: 'WhatsApp — Dapatkan Diagnosis Percuma',
    whyOverline: 'Mengapa Ia Penting',
    whyH2: 'Bengkel Biasa vs. Pakar Transmisi',
    tableHeaderGen: 'Bengkel Biasa',
    tableHeaderSpec: 'One X Transmission',
    processOverline: 'Proses Mudah',
    processH2: 'Cara Ia Berfungsi',
    processBody: 'Tiga langkah. Tiada reka-reka. Tiada tekanan untuk berkomitmen sehingga anda lihat diagnosis.',
    processStep1Cta: 'Mulakan Langkah 1 — WhatsApp Sekarang',
    servicesOverline: 'Apa Yang Kami Baiki',
    servicesH2: 'Servis untuk Pemandu Kedah & Pulau Pinang',
    servicesBody: 'Setiap servis yang tersedia di bengkel Shah Alam kami — dan akan hadir di Kulim tidak lama lagi. Semua jenama kereta Malaysia dan Jepun utama diliputi.',
    areasLabel: 'Melayani pemandu dari',
    faqOverline: 'Soalan Lazim',
    faqH2: 'Soalan daripada Pemandu Kedah & Pulau Pinang',
    ctaOverline: 'Bersedia untuk Dibaiki?',
    ctaH2: 'Jangan Pandu Gearbox yang Rosak Lebih Lama.',
    ctaBody: 'Setiap kilometer dengan gearbox yang slip atau bergetar menambah kos pembaikan. WhatsApp kami sekarang — huraikan simptom anda, dapatkan jawapan jujur dalam masa sejam, dan jadualkan diagnosis percuma anda.',
    ctaNote: 'Pelanggan utara: kami kini menerima tempahan untuk Kedah dan Pulau Pinang. Cawangan Kulim akan dibuka tidak lama lagi.',
    ctaWACta: 'WhatsApp — Diagnosis Percuma',
    footerWorkshop: 'Bengkel (Buka Sekarang)',
    footerHours: 'Waktu Operasi',
    footerBranch: 'Cawangan Kulim',
    footerBranchValue: 'Kulim, Kedah — Akan Dibuka',
    microRating: '★ 4.8 Penilaian Google',
    microYears: '15 Tahun Pakar Transmisi',
    microCars: '5,000+ Kenderaan Dibaiki',
    microFree: 'Diagnosis Percuma — Tanpa Komitmen',
  },
  zh: {
    bookingBadge: '现已接受吉打及槟城预约',
    branchBadge: 'Kulim分店即将开业',
    heroH1: 'Kulim或吉打有变速箱问题？免费诊断。',
    heroBody: '马来西亚值得信赖的CVT和自动变速箱专家现已为北部地区提供服务。免费专业诊断。诚实书面报价。所有大修工程附12个月保修。不修好不收费。',
    heroWACta: 'WhatsApp获取免费诊断',
    trustRating: 'Google评分',
    trustYears: '专注变速箱',
    trustCars: '已修车辆',
    trustWarranty: '大修保修',
    symptomOverline: '听起来熟悉吗？',
    symptomH2: '您的爱车有以下情况吗？',
    symptomBody: '这些是吉打和槟城车主最常报告的变速箱症状。如果您的车出现其中任何一种，请勿拖延——变速箱问题会迅速恶化。',
    symptomCta: 'WhatsApp——获取免费诊断',
    whyOverline: '为何重要',
    whyH2: '普通车行 vs. 变速箱专家',
    tableHeaderGen: '普通车行',
    tableHeaderSpec: 'One X Transmission',
    processOverline: '简单流程',
    processH2: '如何进行',
    processBody: '三个步骤。无需猜测。在看到诊断结果之前无需承诺。',
    processStep1Cta: '从第1步开始——立即WhatsApp',
    servicesOverline: '我们的维修项目',
    servicesH2: '为吉打及槟城车主提供的服务',
    servicesBody: '我们Shah Alam工作室提供的所有服务——即将在Kulim推出。涵盖所有主要马来西亚及日本汽车品牌。',
    areasLabel: '服务范围覆盖',
    faqOverline: '常见问题',
    faqH2: '来自吉打及槟城车主的问题',
    ctaOverline: '准备好修车了吗？',
    ctaH2: '不要再驾驶一辆变速箱故障的汽车。',
    ctaBody: '每一公里的打滑或抖动都在增加维修成本。立即WhatsApp我们——描述您的症状，在一小时内获得诚实的回复，并预约您的免费诊断。',
    ctaNote: '北部客户：我们现已接受吉打和槟城的预约。Kulim分店即将开业。',
    ctaWACta: 'WhatsApp——免费诊断',
    footerWorkshop: '工作室（现已开放）',
    footerHours: '营业时间',
    footerBranch: 'Kulim分店',
    footerBranchValue: 'Kulim, Kedah——即将开业',
    microRating: '★ 4.8 Google评分',
    microYears: '专注变速箱15年',
    microCars: '5,000+辆车已修',
    microFree: '免费诊断——无需承诺',
  },
}

const areas = [
  'Kulim', 'Sungai Petani', 'Bukit Mertajam', 'Nibong Tebal',
  'Parit Buntar', 'Penang', 'Butterworth', 'Alor Setar', 'Baling', 'Gurun',
]

export default async function KulimLocationPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: l } = await params
  const locale = l as Locale

  const symptoms = symptomsMap[locale] ?? symptomsMap.en
  const services = servicesMap[locale] ?? servicesMap.en
  const steps = stepsMap[locale] ?? stepsMap.en
  const faqs = faqsMap[locale] ?? faqsMap.en
  const tableRows = tableRowsMap[locale] ?? tableRowsMap.en
  const copy = tMap[locale] ?? tMap.en

  const breadcrumbSchema = generateBreadcrumbJsonLd(locale, 'locations/kulim', 'Kulim Branch')

  const kulimBranchSchema = {
    '@context': 'https://schema.org',
    '@type': ['AutomotiveBusiness', 'LocalBusiness'],
    name: 'One X Transmission — Kulim Branch',
    description:
      'CVT and automatic gearbox specialist opening in Kulim, Kedah. Free diagnosis, full overhaul, 12-month warranty. Serving Kedah and Penang drivers.',
    branchOf: {
      '@type': 'Organization',
      name: 'One X Transmission',
      url: 'https://onextransmission.com',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kulim',
      addressRegion: 'Kedah',
      addressCountry: 'MY',
    },
    telephone: business.phone,
    url: `https://onextransmission.com/${locale}/locations/kulim`,
    areaServed: [
      { '@type': 'City', name: 'Kulim' },
      { '@type': 'City', name: 'Sungai Petani' },
      { '@type': 'City', name: 'Bukit Mertajam' },
      { '@type': 'City', name: 'Nibong Tebal' },
      { '@type': 'City', name: 'Parit Buntar' },
      { '@type': 'City', name: 'Butterworth' },
      { '@type': 'AdministrativeArea', name: 'Kedah' },
      { '@type': 'AdministrativeArea', name: 'Penang' },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '17:00',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(kulimBranchSchema) }}
      />

      {/* ── HERO ── */}
      <section className="relative min-h-[85vh] flex items-end pb-16 md:pb-24 pt-28 md:pt-32 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-neutral-950 bg-cover bg-center"
            style={{ backgroundImage: `url('/images/hero/Hero 1.jpeg')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/50 via-neutral-950/65 to-neutral-950" />
        </div>

        <div className="relative z-10 max-w-wide mx-auto px-5 md:px-10 w-full">
          <div className="max-w-3xl">
            <FadeIn delay={0.1} immediate>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  {copy.bookingBadge}
                </span>
                <span className="text-neutral-400 text-xs">{copy.branchBadge}</span>
              </div>
            </FadeIn>
            <RevealText
              text={copy.heroH1}
              as="h1"
              className="text-h1 text-white mb-6 md:mb-8"
              delay={0.3}
              immediate
            />
            <FadeIn delay={0.6} immediate>
              <p className="text-body-lg text-neutral-300 max-w-2xl leading-relaxed mb-10">
                {copy.heroBody}
              </p>
            </FadeIn>

            {/* Primary CTAs */}
            <FadeIn delay={0.8} immediate>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <a
                  href={kulimWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-brand-red text-white px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-red-700 transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.855L.057 23.617a.75.75 0 0 0 .92.92l5.762-1.476A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.716 9.716 0 0 1-4.983-1.373l-.357-.213-3.714.951.968-3.632-.233-.373A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                  </svg>
                  {copy.heroWACta}
                </a>
                <a
                  href={business.phoneTel}
                  className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-4 text-sm font-medium tracking-widest uppercase hover:border-white/70 transition-colors"
                >
                  Call {business.phone}
                </a>
              </div>
            </FadeIn>

            {/* Trust micro-signals */}
            <FadeIn delay={1.0} immediate>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-neutral-400">
                <span>{copy.microRating}</span>
                <span>·</span>
                <span>{copy.microYears}</span>
                <span>·</span>
                <span>{copy.microCars}</span>
                <span>·</span>
                <span>{copy.microFree}</span>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section className="bg-neutral-900 border-y border-neutral-800 py-6">
        <div className="max-w-wide mx-auto px-5 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '4.8★', label: copy.trustRating },
              { value: '15 Yrs', label: copy.trustYears },
              { value: '5,000+', label: copy.trustCars },
              { value: '12 Mo.', label: copy.trustWarranty },
            ].map((t) => (
              <div key={t.label}>
                <div className="text-xl font-bold text-white">{t.value}</div>
                <div className="text-xs text-neutral-400 uppercase tracking-wider mt-1">{t.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SYMPTOM CHECKLIST ── */}
      <section className="section-light section-padding">
        <div className="max-w-wide mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <FadeIn>
                <span className="inline-block text-brand-red text-sm font-medium tracking-[0.2em] uppercase mb-4">
                  {copy.symptomOverline}
                </span>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="text-h2 text-neutral-900 mb-6">
                  {copy.symptomH2}
                </h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-neutral-600 text-body mb-8 leading-relaxed">
                  {copy.symptomBody}
                </p>
              </FadeIn>
              <FadeIn delay={0.25}>
                <ul className="space-y-3 mb-10">
                  {symptoms.map((s) => (
                    <li key={s} className="flex items-start gap-3">
                      <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-brand-red/10 border border-brand-red/30 flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-brand-red" />
                      </span>
                      <span className="text-neutral-700 text-body">{s}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
              <FadeIn delay={0.3}>
                <a
                  href={kulimWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-brand-red text-white px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-red-700 transition-colors"
                >
                  {copy.symptomCta}
                </a>
              </FadeIn>
            </div>

            {/* Why specialist matters */}
            <div>
              <FadeIn delay={0.1}>
                <span className="inline-block text-brand-red text-sm font-medium tracking-[0.2em] uppercase mb-4">
                  {copy.whyOverline}
                </span>
              </FadeIn>
              <FadeIn delay={0.15}>
                <h2 className="text-h2 text-neutral-900 mb-6">
                  {copy.whyH2}
                </h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="space-y-0 border border-neutral-200">
                  {/* Table header */}
                  <div className="grid grid-cols-[1fr_1fr_1fr] text-xs border-b border-neutral-200 bg-neutral-100">
                    <div className="p-3 font-semibold text-neutral-500 border-r border-neutral-200" />
                    <div className="p-3 font-semibold text-neutral-600 border-r border-neutral-200">{copy.tableHeaderGen}</div>
                    <div className="p-3 font-semibold text-neutral-900 bg-red-50">{copy.tableHeaderSpec}</div>
                  </div>
                  {tableRows.map((row, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-[1fr_1fr_1fr] text-xs border-b border-neutral-200 last:border-b-0"
                    >
                      <div className="p-4 font-medium text-neutral-700 border-r border-neutral-200 bg-neutral-50">
                        {row.label}
                      </div>
                      <div className="p-4 text-neutral-500 border-r border-neutral-200">
                        {row.gen}
                      </div>
                      <div className="p-4 text-neutral-900 font-medium bg-red-50">
                        {row.spec}
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="mt-3 flex justify-end">
                  <span className="text-xs text-neutral-400 flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-50 border border-neutral-200 inline-block" />
                    One X Transmission
                  </span>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section-dark section-padding">
        <div className="max-w-wide mx-auto px-5 md:px-10">
          <FadeIn>
            <span className="inline-block text-brand-red text-sm font-medium tracking-[0.2em] uppercase mb-4">
              {copy.processOverline}
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-h2 text-white mb-4">{copy.processH2}</h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-neutral-400 text-body max-w-xl mb-16">
              {copy.processBody}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-800">
            {steps.map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.1}>
                <div className="bg-neutral-950 p-10 h-full">
                  <div className="text-5xl font-bold text-neutral-800 mb-6">{step.num}</div>
                  <h3 className="text-white text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <a
                href={kulimWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-brand-red text-white px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-red-700 transition-colors"
              >
                {copy.processStep1Cta}
              </a>
              <a
                href={business.phoneTel}
                className="inline-flex items-center justify-center gap-2 border border-neutral-700 text-neutral-300 px-8 py-4 text-sm font-medium tracking-widest uppercase hover:border-neutral-500 transition-colors"
              >
                Or Call {business.phone}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section-light section-padding">
        <div className="max-w-wide mx-auto px-5 md:px-10">
          <FadeIn>
            <span className="inline-block text-brand-red text-sm font-medium tracking-[0.2em] uppercase mb-4">
              {copy.servicesOverline}
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-h2 text-neutral-900 mb-4">{copy.servicesH2}</h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-neutral-600 text-body max-w-2xl mb-14">
              {copy.servicesBody}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.05}>
                <div className="border border-neutral-200 p-8 h-full">
                  <h3 className="text-neutral-900 font-semibold text-lg mb-3">{s.title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── AREAS SERVED ── */}
      <section className="bg-neutral-100 py-12">
        <div className="max-w-wide mx-auto px-5 md:px-10">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-shrink-0">
              <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                  {copy.areasLabel}
                </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {areas.map((area) => (
                <span
                  key={area}
                  className="bg-white border border-neutral-200 px-4 py-2 text-sm text-neutral-700 font-medium"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-light section-padding">
        <div className="max-w-wide mx-auto px-5 md:px-10">
          <div className="max-w-3xl">
            <FadeIn>
              <span className="inline-block text-brand-red text-sm font-medium tracking-[0.2em] uppercase mb-4">
                {copy.faqOverline}
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-h2 text-neutral-900 mb-14">{copy.faqH2}</h2>
            </FadeIn>

            <div className="space-y-0 divide-y divide-neutral-200 border-y border-neutral-200">
              {faqs.map((faq, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="py-8">
                    <h3 className="text-neutral-900 font-semibold text-lg mb-4">{faq.q}</h3>
                    <p className="text-neutral-600 text-body leading-relaxed">{faq.a}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="bg-neutral-950 section-padding">
        <div className="max-w-wide mx-auto px-5 md:px-10">
          <div className="max-w-3xl">
            <FadeIn>
              <span className="inline-block text-brand-red text-sm font-medium tracking-[0.2em] uppercase mb-5">
                {copy.ctaOverline}
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-h2 text-white mb-4">
                {copy.ctaH2}
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-neutral-400 text-body-lg max-w-2xl mb-3 leading-relaxed">
                {copy.ctaBody}
              </p>
            </FadeIn>
            <FadeIn delay={0.25}>
              <p className="text-neutral-500 text-sm mb-10">
                {copy.ctaNote}
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a
                  href={kulimWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-brand-red text-white px-8 py-5 text-sm font-semibold tracking-widest uppercase hover:bg-red-700 transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.855L.057 23.617a.75.75 0 0 0 .92.92l5.762-1.476A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12-12zm0 21.75a9.716 9.716 0 0 1-4.983-1.373l-.357-.213-3.714.951.968-3.632-.233-.373A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                  </svg>
                  {copy.ctaWACta}
                </a>
                <a
                  href={business.phoneTel}
                  className="inline-flex items-center justify-center gap-2 border border-neutral-700 text-neutral-300 px-8 py-5 text-sm font-medium tracking-widest uppercase hover:border-neutral-500 transition-colors"
                >
                  Call {business.phone}
                </a>
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="border-t border-neutral-800 pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
                <div>
                  <span className="block text-neutral-300 font-medium mb-1">{copy.footerWorkshop}</span>
                  <span className="text-neutral-500">{business.addressShort}</span>
                </div>
                <div>
                  <span className="block text-neutral-300 font-medium mb-1">{copy.footerHours}</span>
                  <span className="text-neutral-500">
                    Mon–Fri {business.hours.weekdays}<br />
                    Sat {business.hours.saturday}
                  </span>
                </div>
                <div>
                  <span className="block text-neutral-300 font-medium mb-1">{copy.footerBranch}</span>
                  <span className="text-neutral-500">{copy.footerBranchValue}</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
