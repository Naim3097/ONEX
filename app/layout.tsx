import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const satoshi = localFont({
  src: [
    { path: '../Satoshi Font/Satoshi-Light.otf', weight: '300', style: 'normal' },
    { path: '../Satoshi Font/Satoshi-LightItalic.otf', weight: '300', style: 'italic' },
    { path: '../Satoshi Font/Satoshi-Regular.otf', weight: '400', style: 'normal' },
    { path: '../Satoshi Font/Satoshi-Italic.otf', weight: '400', style: 'italic' },
    { path: '../Satoshi Font/Satoshi-Medium.otf', weight: '500', style: 'normal' },
    { path: '../Satoshi Font/Satoshi-MediumItalic.otf', weight: '500', style: 'italic' },
    { path: '../Satoshi Font/Satoshi-Bold.otf', weight: '700', style: 'normal' },
    { path: '../Satoshi Font/Satoshi-BoldItalic.otf', weight: '700', style: 'italic' },
    { path: '../Satoshi Font/Satoshi-Black.otf', weight: '900', style: 'normal' },
    { path: '../Satoshi Font/Satoshi-BlackItalic.otf', weight: '900', style: 'italic' },
  ],
  variable: '--font-satoshi',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://onextransmission.com'),
  title: {
    default: 'One X Transmission — Gearbox Specialist Shah Alam',
    template: '%s — One X Transmission',
  },
  description:
    'Professional CVT and automatic gearbox repair, overhaul, and servicing in Shah Alam. Free diagnosis, original parts, warranty on all work.',
  openGraph: {
    type: 'website',
    locale: 'en_MY',
    alternateLocale: ['ms_MY', 'zh_MY'],
    siteName: 'One X Transmission',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={satoshi.variable}>
      <body className="font-satoshi">
        {children}
      </body>
    </html>
  )
}
