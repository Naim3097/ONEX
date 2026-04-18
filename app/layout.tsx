import type { Metadata } from 'next'
import Script from 'next/script'
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
    default: 'Gearbox Specialist Shah Alam | Free Diagnosis | One X Transmission',
    template: '%s | One X Transmission',
  },
  description:
    'Shah Alam’s most trusted CVT and automatic gearbox specialist. Free professional diagnosis, full overhaul, and transmission servicing. 15 years experience, 5,000+ vehicles, 12-month warranty.',
  keywords: [
    'gearbox specialist Shah Alam',
    'CVT repair Malaysia',
    'automatic transmission overhaul Selangor',
    'gearbox workshop Klang Valley',
    'transmission repair Shah Alam',
    'best gearbox workshop Malaysia',
    'CVT gearbox overhaul',
    'gearbox diagnosis free',
    'gearbox specialist Kulim',
    'transmission workshop Kedah',
    'CVT repair Penang',
    'gearbox workshop Bukit Mertajam',
    'transmission repair Sungai Petani',
    'gearbox specialist Nibong Tebal',
    'transmission workshop Parit Buntar',
    'bengkel gearbox Kulim',
    'bengkel gearbox Kedah',
    'gearbox repair near Penang',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_MY',
    alternateLocale: ['ms_MY', 'zh_MY'],
    siteName: 'One X Transmission',
    images: [
      {
        url: 'https://onextransmission.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'One X Transmission — Gearbox Specialist Shah Alam',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://onextransmission.com/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'geo.region': 'MY-10',
    'geo.placename': 'Shah Alam, Selangor',
    'geo.position': '2.9790295931497934;101.51856181116906',
    'ICBM': '2.9790295931497934, 101.51856181116906',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={satoshi.variable}>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MDXQ86XF');`}
        </Script>
        {/* End Google Tag Manager */}

        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1511178086105995');
fbq('track', 'PageView');`}
        </Script>
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1511178086105995&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
      <body className="font-satoshi">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MDXQ86XF"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  )
}
