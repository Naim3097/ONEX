// ─────────────────────────────────────────────
// Content Mapping Layer
// All site copy lives here. Pages consume this.
// Locale-aware: 'en' is complete; 'ms' and 'zh' scaffolded with TODO markers.
// ─────────────────────────────────────────────

export type Locale = 'en' | 'ms' | 'zh'

export const locales: Locale[] = ['en', 'ms', 'zh']
export const defaultLocale: Locale = 'en'

// ─── Contact / Business Facts (shared, not translatable) ───

export const business = {
  name: 'One X Transmission',
  phone: '+60 11-3105 1677',
  phoneTel: 'tel:+601131051677',
  landline: '03-5191 8330',
  landlineTel: 'tel:+60351918330',
  whatsapp: '+60 11-3105 1677',
  whatsappLink: 'https://wa.link/0hmj0n',
  whatsappInquiry:
    'https://wa.me/+601131051677?text=Hi%2C%20I%20would%20like%20to%20enquire%20about%20gearbox%20services.',
  address:
    'GF LOT 184107 (LOT LAMA 3579), Jalan Haji Taib, Batu 7 1/2, Jln Kebun Tambahan, Kampung Jln Kebun, 40460 Shah Alam, Selangor, Malaysia',
  addressShort: '40460 Shah Alam, Selangor',
  mapsUrl:
    'https://maps.google.com/?q=2.9790295931497934,101.51856181116906',
  coords: { lat: 2.9790295931497934, lng: 101.51856181116906 },
  hours: {
    weekdays: '9:00 AM – 6:00 PM',
    saturday: '9:00 AM – 5:00 PM',
    sunday: 'Closed',
  },
  emergency: '24/7 Emergency Line',
  googleRating: 4.8,
  yearsExperience: 15,
  customersServed: 5000,
  warrantyMonths: 12,
  logo: {
    black: '/images/logo-black.png',
    white: '/images/logo-white.png',
  },
} as const

// ─── Translatable Content ───

interface SiteContent {
  nav: {
    home: string
    about: string
    capabilities: string
    process: string
    faq: string
    contact: string
    cta: string
  }
  home: {
    hero: {
      overline: string
      headline: string
      subheadline: string
      ctaPrimary: string
      ctaSecondary: string
    }
    philosophy: {
      overline: string
      headline: string
      body: string[]
      caption: string
    }
    services: {
      overline: string
      headline: string
      items: {
        title: string
        description: string
        detail: string
      }[]
    }
    process: {
      overline: string
      headline: string
      steps: {
        number: string
        title: string
        description: string
      }[]
    }
    stats: {
      items: {
        value: string
        numericValue: number
        suffix: string
        label: string
      }[]
    }
    gallery: {
      overline: string
      headline: string
      cta: string
    }
    cta: {
      headline: string
      body: string
      ctaPrimary: string
      ctaSecondary: string
    }
  }
  about: {
    hero: {
      overline: string
      headline: string
      body: string
    }
    story: {
      headline: string
      paragraphs: string[]
    }
    whyUs: {
      headline: string
      reasons: { title: string; description: string }[]
    }
  }
  capabilities: {
    hero: {
      overline: string
      headline: string
      body: string
    }
    diagnosis: {
      title: string
      description: string
      price: string
      duration: string
      included: string[]
    }
    overhaul: {
      title: string
      description: string
      price: string
      duration: string
      warranty: string
      included: string[]
    }
    service: {
      title: string
      description: string
      price: string
      duration: string
      warranty: string
      included: string[]
    }
    other: {
      title: string
      description: string
      items: string[]
    }
  }
  process: {
    hero: {
      overline: string
      headline: string
      body: string
    }
    steps: {
      number: string
      title: string
      description: string
      detail: string
    }[]
  }
  faq: {
    hero: {
      overline: string
      headline: string
      body: string
    }
    items: {
      question: string
      answer: string
    }[]
  }
  contact: {
    hero: {
      overline: string
      headline: string
      body: string
    }
    form: {
      title: string
      fields: {
        name: string
        phone: string
        carModel: string
        problem: string
        message: string
      }
      submit: string
    }
    info: {
      hoursTitle: string
      emergencyTitle: string
      emergencyBody: string
    }
  }
  footer: {
    tagline: string
    copyright: string
    columns: {
      title: string
      links: { label: string; href: string }[]
    }[]
  }
}

// ─── English Content ───

const en: SiteContent = {
  nav: {
    home: 'Home',
    about: 'About',
    capabilities: 'Capabilities',
    process: 'Process',
    faq: 'FAQ',
    contact: 'Contact',
    cta: 'Get in Touch',
  },
  home: {
    hero: {
      overline: 'Gearbox Specialist — Shah Alam',
      headline: 'Precision diagnosis.\nDecisive repair.',
      subheadline:
        'Specialist CVT and automatic transmission repair with a diagnostic-first approach. Every fix starts with understanding the problem.',
      ctaPrimary: 'Book Free Diagnosis',
      ctaSecondary: 'Explore Capabilities',
    },
    philosophy: {
      overline: 'Our Approach',
      headline: 'Diagnosis above all else.',
      body: [
        'Most workshops replace parts and hope for the best. We start differently — with a thorough, methodical diagnosis that identifies the actual root cause before any wrench is turned.',
        'This diagnostic-first discipline means your transmission problem gets solved, not patched. It means fewer return visits, fewer unnecessary part swaps, and a repair built on certainty.',
      ],
      caption: 'Free professional diagnostic assessment on every vehicle.',
    },
    services: {
      overline: 'Capabilities',
      headline: 'What we do.',
      items: [
        {
          title: 'Professional Diagnosis',
          description:
            'Comprehensive scanner-based diagnostics, test drive assessment, fluid analysis, and leak detection. A full diagnostic report before any work begins.',
          detail: 'Complimentary · 30 to 45 minutes',
        },
        {
          title: 'Gearbox Overhaul',
          description:
            'Complete disassembly, inspection, and rebuild of automatic and CVT transmissions. Original and OEM parts, factory-spec calibration, and thorough road testing.',
          detail: '3 to 5 working days, warranty included',
        },
        {
          title: 'Transmission Servicing',
          description:
            'Scheduled maintenance including ATF/CVT fluid replacement, filter change, component inspection, ECU adaptation reset, and post-service road test.',
          detail: '4 to 8 hours, warranty included',
        },
      ],
    },
    process: {
      overline: 'How We Work',
      headline: 'Four stages of precision.',
      steps: [
        {
          number: '01',
          title: 'Inspection',
          description:
            'Thorough scanner-based diagnostics and specialist assessment to identify the exact root cause.',
        },
        {
          number: '02',
          title: 'Disassembly',
          description:
            'Methodical teardown with every component individually inspected and catalogued.',
        },
        {
          number: '03',
          title: 'Restoration',
          description:
            'Ultrasonic cleaning, precision part replacement with original/OEM components, and careful reassembly.',
        },
        {
          number: '04',
          title: 'Calibration',
          description:
            'Factory-spec recalibration and comprehensive road testing to verify performance under real conditions.',
        },
      ],
    },
    stats: {
      items: [
        { value: '15', numericValue: 15, suffix: '+', label: 'Years of Specialisation' },
        { value: '5000', numericValue: 5000, suffix: '+', label: 'Transmissions Rebuilt' },
        { value: '4.8', numericValue: 4.8, suffix: '/5', label: 'Google Rating' },
        { value: '12', numericValue: 12, suffix: ' mo', label: 'Warranty on Work' },
      ],
    },
    gallery: {
      overline: 'Recent Work',
      headline: 'From the workshop floor.',
      cta: 'View All Work',
    },
    cta: {
      headline: 'Transmission trouble?',
      body: 'Start with a free professional diagnosis. No obligation, no guesswork — just a clear understanding of what your gearbox needs.',
      ctaPrimary: 'WhatsApp Us',
      ctaSecondary: 'Call Now',
    },
  },
  about: {
    hero: {
      overline: 'About One X Transmission',
      headline: 'Built on diagnostic discipline.',
      body: 'A transmission workshop that believes certainty comes before repair. Every decision we make is grounded in thorough, honest diagnosis.',
    },
    story: {
      headline: 'The diagnostic-first workshop.',
      paragraphs: [
        'One X Transmission was founded on a simple conviction: most gearbox problems persist because the real cause was never properly identified.',
        'Operating from Shah Alam, Selangor, we have built our reputation on methodical diagnosis. Before any component is replaced, before any fluid is changed, we invest the time to understand exactly what is happening inside the transmission.',
        'This approach has earned the trust of thousands of vehicle owners who value transparency and precision over quick, uncertain fixes.',
        'We work exclusively with original and OEM-specification parts, and every repair carries a comprehensive warranty — because when diagnosis is right, the repair stands.',
      ],
    },
    whyUs: {
      headline: 'Why vehicle owners choose us.',
      reasons: [
        {
          title: 'Free Professional Diagnosis',
          description: 'Every vehicle receives a complimentary, thorough diagnostic assessment before we recommend any course of action.',
        },
        {
          title: 'Original and OEM Parts',
          description: 'We exclusively use original or OEM-specification components. No aftermarket compromises on the parts that matter most.',
        },
        {
          title: 'Comprehensive Warranty',
          description: 'Every repair is covered with a warranty of up to 12 months — reflecting our confidence in the work.',
        },
        {
          title: 'Transparent Process',
          description: 'Clear quotations before work begins. No hidden costs, no surprise additions. You know exactly what you are paying for.',
        },
      ],
    },
  },
  capabilities: {
    hero: {
      overline: 'Capabilities',
      headline: 'Transmission care,\nend to end.',
      body: 'From initial assessment to final road test, our capabilities cover every aspect of CVT and automatic transmission repair and maintenance.',
    },
    diagnosis: {
      title: 'Professional Diagnosis',
      description:
        'The foundation of every repair. Our diagnostic process uses professional-grade scanner tools, hands-on assessment, and test driving to build a complete picture of your transmission\u2019s condition.',
      price: 'Complimentary',
      duration: '30–45 minutes',
      included: [
        'Professional scanner-based diagnostic',
        'Test drive assessment',
        'Fluid level and quality inspection',
        'Leak detection and inspection',
        'Complete written diagnostic report',
      ],
    },
    overhaul: {
      title: 'Gearbox Overhaul',
      description:
        'A complete transmission rebuild. The gearbox is fully disassembled, every component inspected, worn parts replaced with original/OEM specifications, and the unit reassembled and calibrated to factory standards.',
      price: 'From RM 2,500',
      duration: '3–5 working days',
      warranty: '6 months / 10,000 km',
      included: [
        'Full disassembly and component-level inspection',
        'Replacement of all worn components',
        'Complete ATF flush and replacement',
        'New gasket set and seals',
        'Factory-specification calibration and road test',
      ],
    },
    service: {
      title: 'Transmission Servicing',
      description:
        'Preventive maintenance that extends the life of your transmission. We replace fluids, inspect components, reset the ECU adaptation, and road-test to confirm proper operation.',
      price: 'From RM 150',
      duration: '4–8 hours',
      warranty: '3 months / 5,000 km',
      included: [
        'ATF or CVT fluid replacement',
        'Gearbox filter replacement',
        'Component condition inspection',
        'ECU adaptation reset',
        'Post-service road test',
      ],
    },
    other: {
      title: 'Additional Services',
      description:
        'Beyond transmission work, we provide supporting maintenance services to keep your vehicle running precisely.',
      items: [
        'Spark plug replacement',
        'Brake pad replacement',
        'Timing belt replacement',
        'Coolant service',
        'Brake fluid service',
      ],
    },
  },
  process: {
    hero: {
      overline: 'Our Process',
      headline: 'Every repair follows the same discipline.',
      body: 'A systematic, four-stage process that ensures nothing is overlooked and every repair is built on a foundation of thorough understanding.',
    },
    steps: [
      {
        number: '01',
        title: 'Inspection',
        description: 'Thorough diagnosis using professional scanner tools and specialist expertise.',
        detail:
          'We begin with a comprehensive diagnostic scan, test drive assessment, fluid analysis, and visual inspection. The goal is simple: identify the exact root cause, not guess at symptoms.',
      },
      {
        number: '02',
        title: 'Disassembly',
        description: 'Methodical teardown with individual component inspection.',
        detail:
          'The transmission is carefully removed and systematically disassembled. Every component is inspected, measured, and catalogued to build a complete picture of what needs attention.',
      },
      {
        number: '03',
        title: 'Restoration',
        description: 'Precision cleaning, part replacement, and careful reassembly.',
        detail:
          'Components are cleaned using ultrasonic equipment and specialised chemicals. Worn or damaged parts are replaced with original or OEM-specification components, then reassembled to factory tolerances.',
      },
      {
        number: '04',
        title: 'Calibration',
        description: 'Factory-spec recalibration and real-world road testing.',
        detail:
          'The rebuilt transmission is recalibrated to manufacturer specifications, then subjected to thorough road testing under varied conditions to verify smooth, reliable performance.',
      },
    ],
  },
  faq: {
    hero: {
      overline: 'Frequently Asked Questions',
      headline: 'Common questions, clear answers.',
      body: 'Straightforward information about our transmission services, pricing, and process.',
    },
    items: [
      {
        question: 'Is the diagnosis really free?',
        answer:
          'Yes. Every vehicle receives a complimentary professional diagnostic assessment. There is no obligation to proceed with any recommended work after receiving your diagnosis report.',
      },
      {
        question: 'How long does an overhaul take?',
        answer:
          'A typical gearbox overhaul takes 3 to 5 working days, depending on the vehicle model and the extent of work required. We will provide a time estimate after diagnosis.',
      },
      {
        question: 'What warranty do you offer?',
        answer:
          'All overhaul work carries a warranty of up to 6 months or 10,000 km (whichever comes first). Servicing work is covered for 3 months or 5,000 km. Specific warranty terms are confirmed at the time of quotation.',
      },
      {
        question: 'Do you use original parts?',
        answer:
          'We exclusively use original manufacturer parts and OEM-specification components. We do not compromise on component quality.',
      },
      {
        question: 'Can I claim insurance for gearbox repair?',
        answer:
          'This depends on your insurance policy and the nature of the issue. We can provide the documentation needed for you to submit a claim to your insurance provider.',
      },
      {
        question: 'Do you offer payment plans?',
        answer:
          'Please contact us to discuss payment arrangements. We aim to be accommodating while maintaining transparency in all financial matters.',
      },
      {
        question: 'What car brands do you work on?',
        answer:
          'We service CVT and automatic transmissions across all major brands commonly found in Malaysia — including Perodua, Proton, Honda, Toyota, Nissan, Mazda, Ford, and more.',
      },
    ],
  },
  contact: {
    hero: {
      overline: 'Contact',
      headline: 'Ready when you are.',
      body: 'Reach out for a free diagnostic assessment or to discuss any transmission concern. We respond promptly.',
    },
    form: {
      title: 'Send an enquiry',
      fields: {
        name: 'Full Name',
        phone: 'Phone Number',
        carModel: 'Car Model',
        problem: 'Main Issue',
        message: 'Additional Details (optional)',
      },
      submit: 'Send via WhatsApp',
    },
    info: {
      hoursTitle: 'Operating Hours',
      emergencyTitle: '24/7 Emergency',
      emergencyBody: 'For emergency or towing assistance, call us anytime.',
    },
  },
  footer: {
    tagline:
      'Specialist CVT and automatic transmission repair and servicing in Shah Alam.',
    copyright: `\u00A9 ${new Date().getFullYear()} One X Transmission. All rights reserved.`,
    columns: [
      {
        title: 'Pages',
        links: [
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Capabilities', href: '/capabilities' },
          { label: 'Process', href: '/process' },
        ],
      },
      {
        title: 'Services',
        links: [
          { label: 'Gearbox Diagnosis', href: '/capabilities' },
          { label: 'CVT & AT Overhaul', href: '/capabilities' },
          { label: 'Transmission Servicing', href: '/capabilities' },
        ],
      },
      {
        title: 'Support',
        links: [
          { label: 'FAQ', href: '/faq' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
  },
}

// ─── Malay Content (Scaffolded) ───

const ms: SiteContent = {
  ...en,
  nav: {
    home: 'Utama',
    about: 'Tentang Kami',
    capabilities: 'Khidmat',
    process: 'Proses',
    faq: 'Soalan Lazim',
    contact: 'Hubungi',
    cta: 'Hubungi Kami',
  },
  home: {
    ...en.home,
    hero: {
      overline: 'Pakar Gearbox — Shah Alam',
      headline: 'Diagnosis tepat.\nPembaikan pasti.',
      subheadline:
        'Pakar pembaikan gearbox CVT dan automatik dengan pendekatan diagnosis-first. Setiap pembaikan bermula dengan memahami masalah.',
      ctaPrimary: 'Diagnosis Percuma',
      ctaSecondary: 'Lihat Khidmat Kami',
    },
  },
  footer: {
    ...en.footer,
    tagline: 'Pakar pembaikan dan servis gearbox CVT dan automatik di Shah Alam.',
    copyright: `\u00A9 ${new Date().getFullYear()} One X Transmission. Semua hak terpelihara.`,
  },
}

// ─── Chinese Content (Scaffolded) ───

const zh: SiteContent = {
  ...en,
  nav: {
    home: '首页',
    about: '关于我们',
    capabilities: '服务项目',
    process: '工作流程',
    faq: '常见问题',
    contact: '联系我们',
    cta: '联系我们',
  },
  home: {
    ...en.home,
    hero: {
      overline: '变速箱专家 — 莎阿南',
      headline: '精准诊断。\n可靠维修。',
      subheadline:
        '专业CVT和自动变速箱维修，以诊断为先的方法。每次维修始于全面了解问题根源。',
      ctaPrimary: '免费诊断预约',
      ctaSecondary: '查看服务项目',
    },
  },
  footer: {
    ...en.footer,
    tagline: '莎阿南专业CVT和自动变速箱维修与保养服务。',
    copyright: `\u00A9 ${new Date().getFullYear()} One X Transmission. 版权所有。`,
  },
}

// ─── Content Accessor ───

const contentMap: Record<Locale, SiteContent> = { en, ms, zh }

export function getContent(locale: Locale): SiteContent {
  return contentMap[locale] ?? contentMap[defaultLocale]
}

// ─── Gallery Data (not locale-dependent) ───

export const galleryImages = [
  { src: '/images/Gallery/Toyota%20GT86.jpeg',          alt: 'Toyota GT86 — Gearbox Overhaul',           width: 810,  height: 1080 },
  { src: '/images/Gallery/Honda%20City%20GM6%20%282%29.jpeg', alt: 'Honda City GM6 — CVT Transmission Repair',  width: 960,  height: 1280 },
  { src: '/images/Gallery/Honda%20Civic%20FC.jpeg',      alt: 'Honda Civic FC — AT Gearbox Service',        width: 960,  height: 1280 },
  { src: '/images/Gallery/Mercedes.jpeg',               alt: 'Mercedes — Transmission Diagnostic',         width: 810,  height: 1080 },
  { src: '/images/Gallery/Nissan%20X-Trail.jpeg',        alt: 'Nissan X-Trail — Gearbox Overhaul',          width: 960,  height: 1280 },
  { src: '/images/Gallery/Toyota%20Alphard.jpeg',        alt: 'Toyota Alphard — CVT Service',               width: 960,  height: 1280 },
  { src: '/images/Gallery/Toyota%20GT86%20II.jpeg',      alt: 'Toyota GT86 — Full Transmission Rebuild',    width: 720,  height: 1080 },
  { src: '/images/Gallery/Perodua%20Myvi.jpeg',          alt: 'Perodua Myvi — Gearbox Service',             width: 960,  height: 1280 },
] as const

// ─── Media Slot Manifest ───

export const mediaSlots = {
  heroBackground: {
    path: '/images/hero/hero-poster.jpg',
    video: '/videos/hero.mp4',
    poster: '/images/hero/hero-poster.jpg',
    alt: 'One X Transmission workshop — gearbox specialist',
    width: 1920,
    height: 1080,
    description: 'Full-bleed hero video background with poster fallback.',
  },
  aboutHero: {
    path: '/images/hero/Hero 2.jpeg',
    alt: 'One X Transmission team at work',
    width: 1920,
    height: 1080,
    description: 'About page hero. Team or workshop wide shot.',
  },
  capabilitiesHero: {
    path: '/images/hero/Hero 3.jpeg',
    alt: 'Professional transmission diagnostic equipment',
    width: 1920,
    height: 1080,
    description: 'Capabilities hero. Diagnostic tools or precision equipment close-up.',
  },
  processHero: {
    path: '/images/hero/Hero 4.jpeg',
    alt: 'Gearbox components laid out during overhaul',
    width: 1920,
    height: 1080,
    description: 'Process hero. Orderly component layout suggesting systematic methodology.',
  },
  diagnosisImage: {
    path: '/images/capabilities/diagnosis.jpg',
    alt: 'Scanner-based transmission diagnostic in progress',
    width: 800,
    height: 600,
    description: 'Diagnosis section. Diagnostic tool connected to vehicle.',
  },
  overhaulImage: {
    path: '/images/capabilities/overhaul.jpg',
    alt: 'Gearbox overhaul — complete transmission rebuild',
    width: 800,
    height: 600,
    description: 'Overhaul section. Open transmission showing internal components.',
  },
  serviceImage: {
    path: '/images/capabilities/service.jpg',
    alt: 'Transmission fluid service and maintenance',
    width: 800,
    height: 600,
    description: 'Service section. Fluid change or filter replacement in progress.',
  },
} as const
