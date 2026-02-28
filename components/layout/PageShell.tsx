import { type Locale } from '@/content'
import Header from './Header'
import Footer from './Footer'
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp'

interface PageShellProps {
  locale: Locale
  children: React.ReactNode
}

export default function PageShell({ locale, children }: PageShellProps) {
  return (
    <>
      <Header locale={locale} />
      <main className="min-h-screen">{children}</main>
      <Footer locale={locale} />
      <FloatingWhatsApp />
    </>
  )
}
