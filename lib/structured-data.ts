import { business, googleReviews } from '@/content'

export function generateLocalBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['AutomotiveBusiness', 'LocalBusiness'],
    name: business.name,
    description:
      'Shah Alam’s most trusted CVT and automatic gearbox specialist. Free professional diagnosis, full overhaul, and transmission servicing for all major Malaysian car brands. 15 years experience, 12-month warranty.',
    slogan: 'Diagnosis Above All Else',
    url: 'https://onextransmission.com',
    telephone: business.phone,
    image: [
      'https://onextransmission.com/images/hero/Hero%201.jpeg',
      'https://onextransmission.com/images/Premise/Premise%201.jpeg',
      'https://onextransmission.com/images/Gallery/Toyota%20GT86.jpeg',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress:
        'GF LOT 184107 (LOT LAMA 3579), Jalan Haji Taib, Batu 7 1/2, Jln Kebun Tambahan',
      addressLocality: 'Shah Alam',
      addressRegion: 'Selangor',
      postalCode: '40460',
      addressCountry: 'MY',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.coords.lat,
      longitude: business.coords.lng,
    },
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: business.googleRating.toString(),
      bestRating: '5',
      ratingCount: '500',
    },
    review: googleReviews.map((r) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: r.author,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating.toString(),
        bestRating: '5',
      },
      reviewBody: r.text,
    })),
    priceRange: 'RM 150 – RM 10,000+',
    currenciesAccepted: 'MYR',
    paymentAccepted: 'Cash, Bank Transfer',
    keywords:
      'gearbox specialist Shah Alam, CVT transmission repair Malaysia, automatic gearbox overhaul Selangor, transmission workshop Klang Valley, best gearbox workshop Malaysia, trusted transmission repair, gearbox specialist Kulim, transmission workshop Kedah, CVT repair Penang, gearbox workshop Bukit Mertajam, transmission repair Sungai Petani, gearbox Nibong Tebal, gearbox Parit Buntar',
    sameAs: [
      'https://maps.google.com/?q=2.9790295931497934,101.51856181116906',
      'https://www.waze.com/ul?ll=2.9790295931497934%2C101.51856181116906&navigate=yes',
    ],
    areaServed: [
      { '@type': 'City', name: 'Shah Alam' },
      { '@type': 'City', name: 'Subang Jaya' },
      { '@type': 'City', name: 'Klang' },
      { '@type': 'City', name: 'Petaling Jaya' },
      { '@type': 'City', name: 'Puchong' },
      { '@type': 'City', name: 'Cyberjaya' },
      { '@type': 'AdministrativeArea', name: 'Selangor' },
      { '@type': 'AdministrativeArea', name: 'Klang Valley' },
      { '@type': 'City', name: 'Kulim' },
      { '@type': 'City', name: 'Bukit Mertajam' },
      { '@type': 'City', name: 'Sungai Petani' },
      { '@type': 'City', name: 'Nibong Tebal' },
      { '@type': 'City', name: 'Parit Buntar' },
      { '@type': 'AdministrativeArea', name: 'Kedah' },
      { '@type': 'AdministrativeArea', name: 'Penang' },
    ],
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: business.coords.lat,
        longitude: business.coords.lng,
      },
      geoRadius: '30000',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Transmission Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Free Gearbox Diagnosis',
            description: 'Complimentary professional diagnostic assessment using scanner tools.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Gearbox Overhaul (AT/CVT)',
            description:
              'Complete transmission rebuild with original/OEM parts and warranty.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Transmission Servicing',
            description:
              'Preventive maintenance including fluid replacement, filter change, and ECU reset.',
          },
        },
      ],
    },
  }
}

export function generateFAQJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function generateHowToJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How We Repair Your Gearbox',
    description:
      'A systematic 4-stage transmission repair process from diagnosis to road test, used by One X Transmission in Shah Alam.',
    totalTime: 'P5D',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Inspection',
        text: 'Professional scanner-based diagnostics and specialist assessment to identify the exact root cause of the transmission issue.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Disassembly',
        text: 'Methodical teardown with every component individually inspected, measured, and catalogued.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Restoration',
        text: 'Ultrasonic cleaning, precision part replacement with original or OEM-specification components, and careful reassembly to factory tolerances.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Calibration',
        text: 'Factory-spec recalibration and comprehensive road testing under real conditions to verify smooth, reliable performance.',
      },
    ],
  }
}

export function generateBreadcrumbJsonLd(
  locale: string,
  page: string,
  pageLabel: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `https://onextransmission.com/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: pageLabel,
        item: `https://onextransmission.com/${locale}/${page}`,
      },
    ],
  }
}
