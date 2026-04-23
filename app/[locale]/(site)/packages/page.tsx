import { type Locale } from '@/content'
import { generatePageMetadata } from '@/lib/metadata'
import AidiladhaCampaignPage from '@/components/sections/Shop/AidiladhaCampaignPage'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = l as Locale
  const titles: Record<string, string> = {
    en: 'Aidiladha AT Gearbox Service From RM74 | One X Transmission',
    ms: 'Promo Aidiladha Servis Gearbox AT RM74 | One X Transmission',
    zh: 'Aidiladha AT 变速箱保养 RM74 起 | One X Transmission',
  }
  const descriptions: Record<string, string> = {
    en: 'One-page landing page for the Aidiladha automatic transmission service campaign. RM74 service fee with transparent Lubrimaxx oil pricing, urgency, trust builders and WhatsApp-first booking.',
    ms: 'Landing page satu muka untuk kempen Aidiladha servis gearbox automatik. Harga servis RM74 dengan harga minyak Lubrimaxx yang telus, elemen urgency, trust dan flow booking terus ke WhatsApp.',
    zh: 'Aidiladha 自动变速箱保养活动单页。RM74 服务费，Lubrimaxx 油价透明，强化紧迫感、信任感与 WhatsApp 预约流程。',
  }
  return generatePageMetadata({
    locale,
    page: 'packages',
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
  })
}

export default async function PackagesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params
  const locale = l as Locale

  return <AidiladhaCampaignPage locale={locale} />
}
