import { generatePageMetadata } from '@/lib/metadata'
import AidiladhaCampaignPage from '@/components/sections/Shop/AidiladhaCampaignPage'

export async function generateMetadata() {
  return generatePageMetadata({
    locale: 'ms',
    page: 'packages',
    title: 'Promo Aidiladha Servis Gearbox AT RM74 | One X Transmission',
    description:
      'Kempen Aidiladha untuk kereta automatik sahaja. Servis RM74 termasuk upah kerja, auto filter, inspection dan OBD scan. Minyak Lubrimaxx RM65/liter dikira berasingan. Kami datang ke anda.',
  })
}

export default function PromoPage() {
  return <AidiladhaCampaignPage locale="ms" />
}
