import { business } from '@/content'

export function generateLocalBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutomotiveBusiness',
    name: business.name,
    description:
      'Professional CVT and automatic gearbox repair, overhaul, and servicing in Shah Alam, Selangor.',
    url: 'https://onextransmission.com',
    telephone: business.phone,
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
    priceRange: 'RM 150 – RM 10,000+',
    currenciesAccepted: 'MYR',
    paymentAccepted: 'Cash, Bank Transfer',
    areaServed: {
      '@type': 'City',
      name: 'Shah Alam',
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
