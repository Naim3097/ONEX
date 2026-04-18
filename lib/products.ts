// ─── Product Catalog ───
// All products/services available in the shop.
// Prices in MYR. Slugs used for URL routing.

export interface Product {
  slug: string
  image?: string
  name: Record<string, string>
  description: Record<string, string>
  shortDescription: Record<string, string>
  price: number
  originalPrice?: number
  badge?: Record<string, string>
  category: 'service' | 'device'
  includes?: Record<string, string[]>
  warranty?: Record<string, string>
  inStock: boolean
  comingSoon?: boolean
  depositAmount?: number
}

export const products: Product[] = [
  {
    slug: 'atf-gearbox-service-package',
    image: '/images/asset promotion/kedai promotion pakej amended.png',
    name: {
      en: 'ATF Gearbox Service Package',
      ms: 'Pakej Servis Gearbox ATF',
      zh: 'ATF变速箱保养套餐',
    },
    description: {
      en: 'Complete gearbox maintenance package — ATF oil replacement, auto filter change, and a FREE OBD2 diagnostic device. Keep your transmission running smooth and catch issues early.',
      ms: 'Pakej penyelenggaraan gearbox lengkap — penggantian minyak ATF, penukaran penapis auto, dan PERCUMA peranti diagnostik OBD2. Pastikan transmisi anda berjalan lancar dan kesan masalah awal.',
      zh: '完整变速箱保养套餐 — ATF换油、自动滤清器更换及免费OBD2诊断设备。保持变速箱顺畅运转，及早发现问题。',
    },
    shortDescription: {
      en: 'ATF Oil Replace + Auto Filter + FREE OBD2 Device',
      ms: 'Tukar Minyak ATF + Penapis Auto + PERCUMA OBD2',
      zh: 'ATF换油 + 自动滤清器 + 免费OBD2设备',
    },
    price: 439,
    originalPrice: 580,
    badge: {
      en: 'Best Value',
      ms: 'Nilai Terbaik',
      zh: '超值优惠',
    },
    category: 'service',
    includes: {
      en: ['ATF Oil Replace', 'Auto Filter', 'FREE OBD2 Device'],
      ms: ['Tukar Minyak ATF', 'Penapis Auto', 'PERCUMA Peranti OBD2'],
      zh: ['ATF变速箱油更换', '自动滤清器', '免费OBD2设备'],
    },
    inStock: true,
    depositAmount: 50,
  },
  {
    slug: 'obd2-diagnostic-device',
    image: '/images/asset promotion/obd2.png',
    name: {
      en: 'OBD2 Diagnostic Device',
      ms: 'Peranti Diagnostik OBD2',
      zh: 'OBD2诊断设备',
    },
    description: {
      en: 'Plug-and-play OBD2 scanner that connects to your phone via Bluetooth. Read engine and transmission error codes, monitor real-time data, and catch problems before they get expensive. Compatible with all OBD2-compliant vehicles (1996+).',
      ms: 'Pengimbas OBD2 plug-and-play yang bersambung ke telefon anda melalui Bluetooth. Baca kod ralat enjin dan transmisi, pantau data masa nyata, dan kesan masalah sebelum menjadi mahal. Serasi dengan semua kenderaan yang mematuhi OBD2 (1996+).',
      zh: '即插即用OBD2扫描仪，通过蓝牙连接手机。读取发动机和变速箱故障码，实时监测数据，在问题变严重前及早发现。兼容所有符合OBD2标准的车辆（1996年后）。',
    },
    shortDescription: {
      en: 'Bluetooth OBD2 scanner — read codes from your phone',
      ms: 'Pengimbas OBD2 Bluetooth — baca kod dari telefon',
      zh: '蓝牙OBD2扫描仪 — 手机读取故障码',
    },
    price: 50,
    category: 'device',
    includes: {
      en: ['OBD2 Bluetooth Scanner', 'Compatible with iOS & Android', 'Free diagnostic app guide'],
      ms: ['Pengimbas Bluetooth OBD2', 'Serasi dengan iOS & Android', 'Panduan aplikasi diagnostik percuma'],
      zh: ['OBD2蓝牙扫描仪', '兼容iOS和Android', '免费诊断应用指南'],
    },
    inStock: false,
    comingSoon: true,
  },
]

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductName(product: Product, locale: string): string {
  return product.name[locale] ?? product.name.en
}

export function getProductDescription(product: Product, locale: string): string {
  return product.description[locale] ?? product.description.en
}

export function getProductShortDescription(product: Product, locale: string): string {
  return product.shortDescription[locale] ?? product.shortDescription.en
}

export function getProductBadge(product: Product, locale: string): string | undefined {
  return product.badge?.[locale] ?? product.badge?.en
}

export function getProductIncludes(product: Product, locale: string): string[] {
  return product.includes?.[locale] ?? product.includes?.en ?? []
}

export function getProductWarranty(product: Product, locale: string): string | undefined {
  return product.warranty?.[locale] ?? product.warranty?.en
}
