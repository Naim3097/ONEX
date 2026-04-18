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
  whatsappLink: 'https://wa.me/+601131051677?text=ONEX%20-%20Hi%2C%20I%27d%20like%20to%20make%20an%20enquiry.',
  whatsappInquiry:
    'https://wa.me/+601131051677?text=ONEX%20-%20Hi%2C%20I%20would%20like%20to%20enquire%20about%20gearbox%20services.',
  whatsappDoorToDoor:
    'https://wa.me/+601131051677?text=ONEX%20-%20Hi%2C%20I%20would%20like%20to%20book%20a%20door-to-door%20inspection.',
  bookingUrl: '/booking',
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
    blog: string
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
    doorToDoor: {
      title: string
      description: string
      coverage: string
      available: string
      steps: {
        number: string
        title: string
        description: string
      }[]
      cta: string
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
  booking: {
    hero: {
      overline: string
      headline: string
      body: string
    }
    form: {
      stepDetails: string
      stepReview: string
      detailsTitle: string
      detailsSubtitle: string
      reviewTitle: string
      reviewSubtitle: string
      fields: {
        name: string
        phone: string
        address: string
        vehicleModel: string
        issues: string
        dateTime: string
      }
      labels: {
        customer: string
        contact: string
        vehicle: string
        date: string
        time: string
        location: string
        problem: string
      }
      depositNotice: string
      depositAmount: string
      next: string
      back: string
      pay: string
      processing: string
    }
    timeSlots: string[]
    success: {
      title: string
      body: string
      invoice: string
      amount: string
      payment: string
      receipt: string
      home: string
    }
    cancelled: {
      title: string
      body: string
      retry: string
      home: string
    }
    error: {
      title: string
      body: string
      retry: string
      home: string
    }
    loading: {
      title: string
      body: string
    }
  }
  promo: {
    badge: string
    overline: string
    headline: string
    subheadline: string
    price: string
    originalPrice: string
    ctaPrimary: string
    ctaSecondary: string
    // Landing page
    landing: {
      heroHeadline: string
      heroBody: string
      includedTitle: string
      included: { title: string; description: string }[]
      whoTitle: string
      whoItems: string[]
      modelsTitle: string
      models: string[]
      warrantyTitle: string
      warrantyBody: string
      footerCta: string
      footerBody: string
    }
  }
  shop: {
    nav: string
    hero: {
      overline: string
      headline: string
      body: string
    }
    categories: {
      all: string
      service: string
      device: string
    }
    addToCart: string
    added: string
    viewDetails: string
    items: string
    includes: string
    warranty: string
    comingSoon: string
    bookNow: string
    depositLabel: string
    cart: {
      title: string
      empty: string
      continueShopping: string
      remove: string
      total: string
      checkout: string
      quantity: string
    }
    checkout: {
      title: string
      subtitle: string
      fields: {
        name: string
        phone: string
        email: string
        address: string
        notes: string
        vehicleModel: string
        preferredDate: string
        timeSlot: string
      }
      orderSummary: string
      payNow: string
      payDeposit: string
      depositLabel: string
      depositNotice: string
      processing: string
    }
    success: {
      title: string
      body: string
      orderId: string
      amount: string
      home: string
      whatsapp: string
      waSuccess: string
    }
    cancelled: {
      title: string
      body: string
      retry: string
      whatsapp: string
      waFail: string
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
    blog: 'Blog',
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
        {
          title: 'Door-to-Door Service',
          description:
            'We come to your location for a professional on-site diagnosis. If repairs are needed, we collect your vehicle, carry out the work, and return it to your door.',
          detail: 'Klang Valley · By appointment',
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
    doorToDoor: {
      title: 'Door-to-Door Inspection & Delivery',
      description:
        'We bring the diagnosis to you. Book an appointment and our technician visits your home or office to perform a complete professional assessment. If you decide to proceed with repairs, we collect your car, carry out the work at our workshop, and return it to your door.',
      coverage: 'Klang Valley',
      available: 'By appointment · Book online',
      steps: [
        {
          number: '01',
          title: 'Book online',
          description: 'Reserve your slot through our booking system. Pay a small RM 10 deposit to confirm. We schedule a technician to your location.',
        },
        {
          number: '02',
          title: 'We inspect at your location',
          description: 'Our technician performs a full professional diagnostic assessment on-site — the same rigorous process as a workshop visit. Free of charge, no obligation.',
        },
        {
          number: '03',
          title: 'We collect your vehicle',
          description: 'If you decide to proceed with our recommended repairs, we arrange all transport. No towing fees, no extra charges — we handle the logistics.',
        },
        {
          number: '04',
          title: 'We return your car',
          description: 'Once repairs are complete and quality-checked, we deliver your vehicle back to your door, ready to drive.',
        },
      ],
      cta: 'Book Door-to-Door',
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
      {
        question: 'What is the cost of gearbox repair in Malaysia?',
        answer:
          'Transmission servicing starts from RM 150. A full gearbox overhaul (AT or CVT) starts from RM 2,500 depending on the vehicle model and extent of damage. We provide a detailed written quote after a free diagnostic assessment — no hidden costs, no surprise additions.',
      },
      {
        question: 'Which car models do you specialise in?',
        answer:
          'We regularly service Perodua (Myvi, Axia, Bezza, Aruz), Proton (Saga, X50, X70, Iriz), Honda (City, Civic, Jazz, CR-V), Toyota (Vios, Alphard, Camry, RAV4), Nissan (X-Trail, Almera, Serena), and many more. Both CVT and automatic transmissions across Japanese, Korean, and European brands.',
      },
      {
        question: 'How do I know if my gearbox needs repair?',
        answer:
          'Common warning signs include: jerking or hesitation when changing gears, slipping gears, the car not moving despite the engine running, a burning smell from under the bonnet, unusual noises in drive or reverse, or the check engine light appearing. If you notice any of these, bring your vehicle in for a free diagnosis before the issue worsens.',
      },
      {
        question: 'Do you offer door-to-door inspection?',
        answer:
          'Yes. Our door-to-door service covers the full Klang Valley area. A technician visits your home or office to carry out a complete professional diagnostic assessment on-site — free of charge. If you decide to proceed with repairs, we collect your vehicle, complete all work at our workshop, and deliver it back to your door. Book your appointment online with a small RM 10 deposit to confirm your slot.',
      },
      {
        question: 'Are there extra charges for door-to-door pick-up and delivery?',
        answer:
          'No. If you proceed with a repair after our on-site diagnosis, we collect and return your vehicle at no additional cost. Pick-up and delivery is included as part of the repair — our way of making professional gearbox care as convenient as possible.',
      },
      {
        question: 'Do you serve customers outside Shah Alam?',
        answer:
          'Yes. While our workshop is located in Shah Alam, we regularly serve customers from across the Klang Valley — including Subang Jaya, Petaling Jaya, Klang, Puchong, Cyberjaya, and Kuala Lumpur. Many customers reach out via WhatsApp first for a consultation before visiting.',
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
  booking: {
    hero: {
      overline: 'Door-to-Door Booking',
      headline: 'Book your inspection.',
      body: 'Reserve a door-to-door diagnostic visit. A technician comes to your location for a full professional assessment.',
    },
    form: {
      stepDetails: 'Details',
      stepReview: 'Review & Pay',
      detailsTitle: 'Booking Details',
      detailsSubtitle: 'Fill in your information to proceed',
      reviewTitle: 'Confirm Booking',
      reviewSubtitle: 'Review your details before payment',
      fields: {
        name: 'Full Name',
        phone: 'Phone Number',
        address: 'Home Address',
        vehicleModel: 'Car Model',
        issues: 'Describe the problem...',
        dateTime: 'Select Date & Time',
      },
      labels: {
        customer: 'Customer',
        contact: 'Contact',
        vehicle: 'Vehicle',
        date: 'Date',
        time: 'Time',
        location: 'Home Address',
        problem: 'Problem Description',
      },
      depositNotice: 'To confirm booking, pay a deposit of',
      depositAmount: 'RM 10',
      next: 'Review Booking',
      back: 'Back',
      pay: 'Pay RM 10 Deposit',
      processing: 'Processing...',
    },
    timeSlots: [
      '08:00 AM - 10:00 AM',
      '10:00 AM - 12:00 PM',
      '01:00 PM - 03:00 PM',
      '03:00 PM - 05:00 PM',
    ],
    success: {
      title: 'Payment Successful',
      body: 'Your booking is confirmed. We have received your deposit.',
      invoice: 'Invoice',
      amount: 'Amount',
      payment: 'Payment',
      receipt: 'Download Receipt',
      home: 'Return to Home',
    },
    cancelled: {
      title: 'Payment Cancelled',
      body: 'You cancelled the payment process.',
      retry: 'Try Again',
      home: 'Return to Home',
    },
    error: {
      title: 'Payment Issue',
      body: 'There was an issue with your payment. Please try again.',
      retry: 'Try Again',
      home: 'Return to Home',
    },
    loading: {
      title: 'Verifying Payment...',
      body: 'Please wait while we confirm your transaction.',
    },
  },
  promo: {
    badge: 'Limited Time',
    overline: 'Promo Package',
    headline: 'Gearbox Service Package',
    subheadline: 'ATF Oil Replace + Auto Filter + FREE OBD2 Device — everything your transmission needs in one visit.',
    price: 'RM 460',
    originalPrice: 'RM 580',
    ctaPrimary: 'Claim This Offer',
    ctaSecondary: 'Learn More',
    landing: {
      heroHeadline: 'Complete Gearbox\nService Package',
      heroBody: 'ATF oil replacement, automatic filter change, and a FREE OBD2 diagnostic device — bundled into one affordable visit. Keep your transmission healthy and monitor your vehicle anytime.',
      includedTitle: "What's Included",
      included: [
        {
          title: 'ATF Oil Replace',
          description: 'Complete drain and replacement with premium automatic transmission fluid matched to your vehicle specification. Fresh fluid restores smooth shifting and reduces heat buildup.',
        },
        {
          title: 'Auto Filter',
          description: 'Your gearbox filter catches metal particles and debris that accumulate over time. A new filter ensures clean fluid circulation and protects internal components from wear.',
        },
        {
          title: 'FREE OBD2 Device',
          description: 'Get a complimentary OBD2 diagnostic device with your service. Monitor your vehicle\'s health, read error codes, and catch potential issues early — right from your phone.',
        },
      ],
      whoTitle: 'Who Should Get This',
      whoItems: [
        'Vehicles above 40,000 km that haven\'t had a gearbox service',
        'Cars experiencing rough or delayed gear shifts',
        'Owners who want to extend transmission lifespan',
        'Vehicles with dark or burnt-smelling ATF fluid',
        'Anyone preparing for a long road trip or vehicle inspection',
      ],
      modelsTitle: 'Compatible Models',
      models: [
        'Perodua Myvi, Axia, Bezza, Aruz, Alza',
        'Proton Saga, X50, X70, Iriz, Persona',
        'Honda City, Civic, Jazz, CR-V, HR-V',
        'Toyota Vios, Camry, Alphard, RAV4',
        'Nissan Almera, X-Trail, Serena',
        'Mazda 2, 3, CX-5, CX-3',
        'And more — contact us for your specific model',
      ],
      warrantyTitle: '3-Month Warranty',
      warrantyBody: 'Every service package comes with a 3-month / 5,000 km warranty. If anything doesn\'t feel right after your service, bring it back — we\'ll make it right.',
      footerCta: 'Book Your Service Package',
      footerBody: 'Limited time pricing. Walk in or WhatsApp us to secure your slot.',
    },
  },
  shop: {
    nav: 'Shop',
    hero: {
      overline: 'Shop',
      headline: 'Products & Services',
      body: 'Gearbox service packages and diagnostic tools — order online and we\'ll handle the rest.',
    },
    categories: {
      all: 'All',
      service: 'Services',
      device: 'Devices',
    },
    addToCart: 'Add to Cart',
    added: 'Added',
    viewDetails: 'View Details',
    items: 'items',
    includes: 'Includes',
    warranty: 'Warranty',
    comingSoon: 'Coming Soon',
    bookNow: 'Book Now',
    depositLabel: 'Booking Deposit',
    cart: {
      title: 'Your Cart',
      empty: 'Your cart is empty.',
      continueShopping: 'Continue Shopping',
      remove: 'Remove',
      total: 'Total',
      checkout: 'Proceed to Checkout',
      quantity: 'Qty',
    },
    checkout: {
      title: 'Checkout',
      subtitle: 'Fill in your details to complete your order.',
      fields: {
        name: 'Full Name',
        phone: 'Phone Number',
        email: 'Email Address',
        address: 'Delivery / Service Address',
        notes: 'Order Notes (optional)',
        vehicleModel: 'Vehicle Model (e.g. Perodua Myvi)',
        preferredDate: 'Preferred Date',
        timeSlot: 'Time Slot',
      },
      orderSummary: 'Order Summary',
      payNow: 'Pay Now',
      payDeposit: 'Pay Deposit',
      depositLabel: 'Booking Deposit',
      depositNotice: 'Remaining balance payable at the workshop on your service date.',
      processing: 'Processing...',
    },
    success: {
      title: 'Order Confirmed',
      body: 'Your payment has been received. Our team will contact you shortly to arrange your service or delivery.',
      orderId: 'Order ID',
      amount: 'Amount Paid',
      home: 'Back to Home',
      whatsapp: 'Confirm via WhatsApp',
      waSuccess: 'ONEX ORDER - Hi, I\'ve just paid the deposit for the service package. Please confirm my order. Thank you!',
    },
    cancelled: {
      title: 'Payment Cancelled',
      body: 'Your payment was cancelled or failed. Your order has not been confirmed. You can try again anytime.',
      retry: 'Try Again',
      whatsapp: 'Contact via WhatsApp',
      waFail: 'ONEX ORDER - Hi, I tried to make a payment for the service package but it didn\'t go through. Could you help me?',
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
          { label: 'Service Package', href: '/packages' },
          { label: 'Door-to-Door Service', href: '/capabilities' },
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

// ─── Malay Content (Full Translation) ───

const ms: SiteContent = {
  nav: {
    home: 'Utama',
    about: 'Tentang Kami',
    capabilities: 'Khidmat',
    process: 'Proses',
    faq: 'Soalan Lazim',
    contact: 'Hubungi',
    blog: 'Blog',
    cta: 'Hubungi Kami',
  },
  home: {
    hero: {
      overline: 'Pakar Gearbox — Shah Alam',
      headline: 'Diagnosis tepat.\nPembaikan pasti.',
      subheadline:
        'Pakar pembaikan gearbox CVT dan automatik dengan pendekatan mengutamakan diagnosis. Setiap pembaikan bermula dengan memahami punca sebenar masalah.',
      ctaPrimary: 'Tempah Diagnosis Percuma',
      ctaSecondary: 'Lihat Perkhidmatan',
    },
    philosophy: {
      overline: 'Pendekatan Kami',
      headline: 'Diagnosis di atas segalanya.',
      body: [
        'Kebanyakan bengkel mengganti bahagian dan berharap keadaan menjadi lebih baik. Kami bermula secara berbeza — dengan diagnosis yang teliti dan sistematik untuk mengenal pasti punca sebenar masalah sebelum apa-apa kerja dilakukan.',
        'Disiplin mengutamakan diagnosis ini bermakna masalah transmisi anda diselesaikan, bukan ditampal. Ia bermakna lawatan ulangan yang lebih sedikit, pertukaran bahagian yang tidak perlu lebih sedikit, dan pembaikan yang dibina atas kepastian.',
      ],
      caption: 'Penilaian diagnostik profesional percuma pada setiap kenderaan.',
    },
    services: {
      overline: 'Perkhidmatan',
      headline: 'Apa yang kami lakukan.',
      items: [
        {
          title: 'Diagnosis Profesional',
          description:
            'Diagnostik berasaskan pengimbas yang komprehensif, penilaian ujian memandu, analisis cecair, dan pengesanan kebocoran. Laporan diagnostik penuh sebelum sebarang kerja bermula.',
          detail: 'Percuma · 30 hingga 45 minit',
        },
        {
          title: 'Baik Pulih Gearbox',
          description:
            'Pembongkaran, pemeriksaan, dan pembinaan semula transmisi automatik dan CVT yang lengkap. Bahagian asli dan OEM, kalibrasi mengikut spesifikasi kilang, dan ujian jalan yang teliti.',
          detail: '3 hingga 5 hari bekerja, waranti disertakan',
        },
        {
          title: 'Servis Transmisi',
          description:
            'Penyelenggaraan berjadual termasuk penggantian cecair ATF/CVT, penukaran penapis, pemeriksaan komponen, penetapan semula adaptasi ECU, dan ujian jalan selepas servis.',
          detail: '4 hingga 8 jam, waranti disertakan',
        },
        {
          title: 'Servis Pintu ke Pintu',
          description:
            'Kami datang ke lokasi anda untuk diagnosis profesional di tempat. Jika pembaikan diperlukan, kami mengambil kenderaan anda, menjalankan kerja, dan menghantarnya kembali ke pintu anda.',
          detail: 'Lembah Klang · Mengikut temujanji',
        },
      ],
    },
    process: {
      overline: 'Cara Kami Bekerja',
      headline: 'Empat peringkat ketepatan.',
      steps: [
        {
          number: '01',
          title: 'Pemeriksaan',
          description:
            'Diagnostik menyeluruh menggunakan pengimbas profesional dan penilaian pakar untuk mengenal pasti punca sebenar.',
        },
        {
          number: '02',
          title: 'Pembongkaran',
          description:
            'Pembongkaran yang sistematik dengan setiap komponen diperiksa dan dikatalog secara individu.',
        },
        {
          number: '03',
          title: 'Pemulihan',
          description:
            'Pembersihan ultrasonik, penggantian bahagian tepat dengan komponen asli/OEM, dan pemasangan semula yang berhati-hati.',
        },
        {
          number: '04',
          title: 'Kalibrasi',
          description:
            'Penentukuran semula spesifikasi kilang dan ujian jalan yang komprehensif untuk mengesahkan prestasi dalam keadaan sebenar.',
        },
      ],
    },
    stats: {
      items: [
        { value: '15', numericValue: 15, suffix: '+', label: 'Tahun Pengkhususan' },
        { value: '5000', numericValue: 5000, suffix: '+', label: 'Transmisi Dibaiki' },
        { value: '4.8', numericValue: 4.8, suffix: '/5', label: 'Penilaian Google' },
        { value: '12', numericValue: 12, suffix: ' bln', label: 'Waranti Kerja' },
      ],
    },
    gallery: {
      overline: 'Kerja Terkini',
      headline: 'Dari lantai bengkel.',
      cta: 'Lihat Semua Kerja',
    },
    cta: {
      headline: 'Masalah transmisi?',
      body: 'Mulakan dengan diagnosis profesional percuma. Tiada obligasi, tiada tekaan — hanya pemahaman yang jelas tentang apa yang diperlukan gearbox anda.',
      ctaPrimary: 'WhatsApp Kami',
      ctaSecondary: 'Hubungi Sekarang',
    },
  },
  about: {
    hero: {
      overline: 'Tentang One X Transmission',
      headline: 'Dibina atas disiplin diagnostik.',
      body: 'Bengkel transmisi yang percaya bahawa kepastian datang sebelum pembaikan. Setiap keputusan yang kami buat berasaskan diagnosis yang teliti dan jujur.',
    },
    story: {
      headline: 'Bengkel yang mengutamakan diagnosis.',
      paragraphs: [
        'One X Transmission diasaskan atas satu keyakinan yang mudah: kebanyakan masalah gearbox berterusan kerana punca sebenar tidak pernah dikenal pasti dengan betul.',
        'Beroperasi dari Shah Alam, Selangor, kami telah membina reputasi kami atas diagnosis yang sistematik. Sebelum sebarang komponen diganti, sebelum sebarang cecair ditukar, kami meluangkan masa untuk memahami dengan tepat apa yang berlaku di dalam transmisi.',
        'Pendekatan ini telah mendapat kepercayaan ribuan pemilik kenderaan yang menghargai ketelusan dan ketepatan berbanding pembaikan yang cepat dan tidak pasti.',
        'Kami bekerja secara eksklusif dengan bahagian asli dan OEM, dan setiap pembaikan membawa waranti yang komprehensif — kerana apabila diagnosis betul, pembaikan akan bertahan.',
      ],
    },
    whyUs: {
      headline: 'Mengapa pemilik kenderaan memilih kami.',
      reasons: [
        {
          title: 'Diagnosis Profesional Percuma',
          description: 'Setiap kenderaan menerima penilaian diagnostik percuma yang teliti sebelum kami mengesyorkan sebarang tindakan.',
        },
        {
          title: 'Bahagian Asli dan OEM',
          description: 'Kami menggunakan komponen asli atau spesifikasi OEM secara eksklusif. Tiada kompromi dengan bahagian pasaran bebas untuk komponen yang paling penting.',
        },
        {
          title: 'Waranti Komprehensif',
          description: 'Setiap pembaikan dilindungi dengan waranti sehingga 12 bulan — mencerminkan keyakinan kami terhadap kualiti kerja yang dilakukan.',
        },
        {
          title: 'Proses Telus',
          description: 'Sebut harga yang jelas sebelum kerja bermula. Tiada kos tersembunyi, tiada tambahan mengejut. Anda tahu dengan tepat apa yang anda bayar.',
        },
      ],
    },
  },
  capabilities: {
    hero: {
      overline: 'Perkhidmatan',
      headline: 'Penjagaan transmisi,\ndari awal hingga akhir.',
      body: 'Dari penilaian awal hingga ujian jalan akhir, kemampuan kami meliputi setiap aspek pembaikan dan penyelenggaraan transmisi CVT dan automatik.',
    },
    diagnosis: {
      title: 'Diagnosis Profesional',
      description:
        'Asas setiap pembaikan. Proses diagnostik kami menggunakan alat pengimbas gred profesional, penilaian langsung, dan ujian memandu untuk membina gambaran lengkap keadaan transmisi anda.',
      price: 'Percuma',
      duration: '30–45 minit',
      included: [
        'Diagnostik berasaskan pengimbas profesional',
        'Penilaian ujian memandu',
        'Pemeriksaan paras dan kualiti cecair',
        'Pengesanan dan pemeriksaan kebocoran',
        'Laporan diagnostik bertulis yang lengkap',
      ],
    },
    overhaul: {
      title: 'Baik Pulih Gearbox',
      description:
        'Pembinaan semula transmisi yang lengkap. Gearbox dibongkar sepenuhnya, setiap komponen diperiksa, bahagian yang haus diganti dengan spesifikasi asli/OEM, dan unit dipasang semula serta dikalibrasi mengikut piawaian kilang.',
      price: 'Dari RM 2,500',
      duration: '3–5 hari bekerja',
      warranty: '6 bulan / 10,000 km',
      included: [
        'Pembongkaran penuh dan pemeriksaan peringkat komponen',
        'Penggantian semua komponen yang haus',
        'Tukar ganti dan penggantian ATF yang lengkap',
        'Set gasket dan penutup baru',
        'Kalibrasi spesifikasi kilang dan ujian jalan',
      ],
    },
    service: {
      title: 'Servis Transmisi',
      description:
        'Penyelenggaraan pencegahan yang memanjangkan jangka hayat transmisi anda. Kami mengganti cecair, memeriksa komponen, menetapkan semula adaptasi ECU, dan melakukan ujian jalan untuk mengesahkan operasi yang betul.',
      price: 'Dari RM 150',
      duration: '4–8 jam',
      warranty: '3 bulan / 5,000 km',
      included: [
        'Penggantian cecair ATF atau CVT',
        'Penggantian penapis gearbox',
        'Pemeriksaan keadaan komponen',
        'Penetapan semula adaptasi ECU',
        'Ujian jalan selepas servis',
      ],
    },
    doorToDoor: {
      title: 'Servis Pintu ke Pintu',
      description:
        'Kami bawa diagnosis ke tempat anda. Buat temujanji dan juruteknik kami akan melawat rumah atau pejabat anda untuk menjalankan penilaian profesional kenderaan anda yang lengkap. Jika anda memutuskan untuk meneruskan pembaikan, kami mengambil kereta anda, menjalankan kerja di bengkel kami, dan menghantarnya semula ke pintu anda.',
      coverage: 'Lembah Klang',
      available: 'Mengikut temujanji · Tempah dalam talian',
      steps: [
        {
          number: '01',
          title: 'Tempah dalam talian',
          description: 'Tempah slot anda melalui sistem tempahan kami. Bayar deposit RM 10 untuk mengesahkan. Kami menjadualkan juruteknik ke lokasi anda.',
        },
        {
          number: '02',
          title: 'Kami memeriksa di lokasi anda',
          description: 'Juruteknik kami menjalankan penilaian diagnostik profesional penuh di tempat — proses yang sama seperti lawatan bengkel. Percuma, tiada obligasi.',
        },
        {
          number: '03',
          title: 'Kami mengambil kenderaan anda',
          description: 'Jika anda memutuskan untuk meneruskan pembaikan yang disyorkan, kami mengatur semua pengangkutan. Tiada bayaran tunda, tiada cas tambahan.',
        },
        {
          number: '04',
          title: 'Kami memulangkan kereta anda',
          description: 'Setelah pembaikan selesai dan telah diperiksa kualitinya, kami menghantar kenderaan anda kembali ke pintu anda, sedia untuk dipandu.',
        },
      ],
      cta: 'Tempah Servis Pintu ke Pintu',
    },
    other: {
      title: 'Perkhidmatan Tambahan',
      description:
        'Selain kerja transmisi, kami menyediakan perkhidmatan penyelenggaraan sokongan untuk memastikan kenderaan anda berjalan dengan tepat.',
      items: [
        'Penggantian plug pencucuh',
        'Penggantian pad brek',
        'Penggantian tali masa',
        'Servis penyejuk',
        'Servis cecair brek',
      ],
    },
  },
  process: {
    hero: {
      overline: 'Proses Kami',
      headline: 'Setiap pembaikan mengikut disiplin yang sama.',
      body: 'Proses empat peringkat yang sistematik untuk memastikan tiada yang diabaikan dan setiap pembaikan dibina atas asas pemahaman yang teliti.',
    },
    steps: [
      {
        number: '01',
        title: 'Pemeriksaan',
        description: 'Diagnosis menyeluruh menggunakan alat pengimbas profesional dan kepakaran pakar.',
        detail:
          'Kami bermula dengan imbasan diagnostik komprehensif, penilaian ujian memandu, analisis cecair, dan pemeriksaan visual. Matlamatnya mudah: kenal pasti punca sebenar, bukan tekaan gejala.',
      },
      {
        number: '02',
        title: 'Pembongkaran',
        description: 'Pembongkaran yang sistematik dengan pemeriksaan komponen individu.',
        detail:
          'Transmisi dikeluarkan dengan berhati-hati dan dibongkar secara sistematik. Setiap komponen diperiksa, diukur, dan dikatalog untuk membina gambaran lengkap tentang apa yang memerlukan perhatian.',
      },
      {
        number: '03',
        title: 'Pemulihan',
        description: 'Pembersihan tepat, penggantian bahagian, dan pemasangan semula yang berhati-hati.',
        detail:
          'Komponen dibersihkan menggunakan peralatan ultrasonik dan bahan kimia khusus. Bahagian yang haus atau rosak diganti dengan komponen spesifikasi asli atau OEM, kemudian dipasang semula mengikut toleransi kilang.',
      },
      {
        number: '04',
        title: 'Kalibrasi',
        description: 'Penentukuran semula spesifikasi kilang dan ujian jalan di dunia nyata.',
        detail:
          'Transmisi yang telah dibaiki dikalibrasi semula mengikut spesifikasi pengeluar, kemudian menjalani ujian jalan yang menyeluruh dalam pelbagai keadaan untuk mengesahkan prestasi yang lancar dan boleh dipercayai.',
      },
    ],
  },
  faq: {
    hero: {
      overline: 'Soalan Lazim',
      headline: 'Soalan biasa, jawapan jelas.',
      body: 'Maklumat yang mudah tentang perkhidmatan transmisi, harga, dan proses kami.',
    },
    items: [
      {
        question: 'Adakah diagnosis benar-benar percuma?',
        answer:
          'Ya. Setiap kenderaan menerima penilaian diagnostik profesional percuma. Tiada obligasi untuk meneruskan kerja yang disyorkan selepas menerima laporan diagnosis anda.',
      },
      {
        question: 'Berapa lama masa yang diperlukan untuk baik pulih?',
        answer:
          'Baik pulih gearbox yang biasa mengambil masa 3 hingga 5 hari bekerja, bergantung pada model kenderaan dan luas kerja yang diperlukan. Kami akan memberikan anggaran masa selepas diagnosis.',
      },
      {
        question: 'Apakah waranti yang anda tawarkan?',
        answer:
          'Semua kerja baik pulih membawa waranti sehingga 6 bulan atau 10,000 km (yang mana lebih awal). Kerja servis dilindungi selama 3 bulan atau 5,000 km. Terma waranti khusus disahkan pada masa sebut harga.',
      },
      {
        question: 'Adakah anda menggunakan bahagian asli?',
        answer:
          'Kami menggunakan bahagian asli pengeluar dan komponen spesifikasi OEM secara eksklusif. Kami tidak berkompromi dengan kualiti komponen.',
      },
      {
        question: 'Bolehkah saya menuntut insurans untuk pembaikan gearbox?',
        answer:
          'Ini bergantung pada polisi insurans anda dan sifat masalah tersebut. Kami boleh menyediakan dokumentasi yang diperlukan untuk anda mengemukakan tuntutan kepada pembekal insurans anda.',
      },
      {
        question: 'Adakah anda menawarkan pelan pembayaran?',
        answer:
          'Sila hubungi kami untuk membincangkan pengaturan pembayaran. Kami berusaha untuk memberikan kemudahan sambil mengekalkan ketelusan dalam semua perkara kewangan.',
      },
      {
        question: 'Jenama kereta apa yang anda servis?',
        answer:
          'Kami menservis transmisi CVT dan automatik merentas semua jenama utama yang biasa ditemui di Malaysia — termasuk Perodua, Proton, Honda, Toyota, Nissan, Mazda, Ford, dan banyak lagi.',
      },
      {
        question: 'Berapakah kos pembaikan gearbox di Malaysia?',
        answer:
          'Servis transmisi bermula dari RM 150. Baik pulih gearbox penuh (AT atau CVT) bermula dari RM 2,500 bergantung pada model kenderaan dan tahap kerosakan. Kami menyediakan sebut harga bertulis terperinci selepas penilaian diagnostik percuma — tiada kos tersembunyi, tiada tambahan mengejut.',
      },
      {
        question: 'Model kereta apa yang anda pakar?',
        answer:
          'Kami kerap menservis Perodua (Myvi, Axia, Bezza, Aruz), Proton (Saga, X50, X70, Iriz), Honda (City, Civic, Jazz, CR-V), Toyota (Vios, Alphard, Camry, RAV4), Nissan (X-Trail, Almera, Serena), dan banyak lagi. Transmisi CVT dan automatik merentas jenama Jepun, Korea, dan Eropah.',
      },
      {
        question: 'Bagaimana saya tahu kalau gearbox saya memerlukan pembaikan?',
        answer:
          'Tanda amaran biasa termasuk: terhentak atau teragak semasa menukar gear, gear melincir, kereta tidak bergerak walaupun enjin berjalan, bau terbakar dari bawah bonet, bunyi luar biasa dalam drive atau reverse, atau lampu check engine menyala. Jika anda melihat mana-mana tanda ini, bawa kenderaan anda untuk diagnosis percuma sebelum masalah bertambah teruk.',
      },
      {
        question: 'Adakah anda menawarkan pemeriksaan pintu ke pintu?',
        answer:
          'Ya. Perkhidmatan pintu ke pintu kami meliputi seluruh kawasan Lembah Klang. Juruteknik kami akan melawat rumah atau pejabat anda untuk menjalankan penilaian diagnostik profesional di tempat — percuma. Jika anda memutuskan untuk meneruskan pembaikan, kami mengambil kenderaan, menyelesaikan kerja di bengkel, dan menghantarnya kembali ke pintu anda. Tempah dalam talian dengan deposit RM 10 untuk mengesahkan slot anda.',
      },
      {
        question: 'Adakah terdapat caj tambahan untuk pengambilan dan penghantaran pintu ke pintu?',
        answer:
          'Tidak. Jika anda meneruskan pembaikan selepas diagnosis di tempat kami, kami mengambil dan memulangkan kenderaan anda tanpa kos tambahan. Perkhidmatan pengambilan dan penghantaran disertakan sebagai sebahagian daripada pembaikan — cara kami menjadikan penjagaan gearbox profesional semudah yang mungkin.',
      },
      {
        question: 'Adakah anda melayani pelanggan di luar Shah Alam?',
        answer:
          'Ya. Walaupun bengkel kami terletak di Shah Alam, kami kerap melayani pelanggan dari seluruh Lembah Klang — termasuk Subang Jaya, Petaling Jaya, Klang, Puchong, Cyberjaya, dan Kuala Lumpur. Ramai pelanggan menghubungi kami melalui WhatsApp terlebih dahulu untuk perundingan sebelum melawat.',
      },
    ],
  },
  contact: {
    hero: {
      overline: 'Hubungi Kami',
      headline: 'Sedia apabila anda bersedia.',
      body: 'Hubungi kami untuk penilaian diagnostik percuma atau untuk membincangkan sebarang kebimbangan transmisi. Kami memberi respons dengan segera.',
    },
    form: {
      title: 'Hantar pertanyaan',
      fields: {
        name: 'Nama Penuh',
        phone: 'Nombor Telefon',
        carModel: 'Model Kereta',
        problem: 'Isu Utama',
        message: 'Maklumat Tambahan (pilihan)',
      },
      submit: 'Hantar melalui WhatsApp',
    },
    info: {
      hoursTitle: 'Waktu Operasi',
      emergencyTitle: 'Kecemasan 24/7',
      emergencyBody: 'Untuk bantuan kecemasan atau tunda, hubungi kami bila-bila masa.',
    },
  },
  booking: {
    hero: {
      overline: 'Tempahan Pintu ke Pintu',
      headline: 'Tempah pemeriksaan anda.',
      body: 'Tempah lawatan diagnostik pintu ke pintu. Juruteknik kami akan datang ke lokasi anda untuk penilaian profesional.',
    },
    form: {
      stepDetails: 'Butiran',
      stepReview: 'Semak & Bayar',
      detailsTitle: 'Butiran Tempahan',
      detailsSubtitle: 'Isi maklumat anda untuk meneruskan',
      reviewTitle: 'Sahkan Tempahan',
      reviewSubtitle: 'Semak butiran anda sebelum pembayaran',
      fields: {
        name: 'Nama Penuh',
        phone: 'Nombor Telefon',
        address: 'Alamat Rumah',
        vehicleModel: 'Model Kereta',
        issues: 'Huraikan masalah...',
        dateTime: 'Pilih Tarikh & Masa',
      },
      labels: {
        customer: 'Pelanggan',
        contact: 'Hubungi',
        vehicle: 'Kenderaan',
        date: 'Tarikh',
        time: 'Masa',
        location: 'Alamat Rumah',
        problem: 'Huraian Masalah',
      },
      depositNotice: 'Untuk mengesahkan tempahan, bayar deposit sebanyak',
      depositAmount: 'RM 10',
      next: 'Semak Tempahan',
      back: 'Kembali',
      pay: 'Bayar Deposit RM 10',
      processing: 'Memproses...',
    },
    timeSlots: [
      '08:00 AM - 10:00 AM',
      '10:00 AM - 12:00 PM',
      '01:00 PM - 03:00 PM',
      '03:00 PM - 05:00 PM',
    ],
    success: {
      title: 'Pembayaran Berjaya',
      body: 'Tempahan anda disahkan. Kami telah menerima deposit anda.',
      invoice: 'Invois',
      amount: 'Jumlah',
      payment: 'Pembayaran',
      receipt: 'Muat Turun Resit',
      home: 'Kembali ke Utama',
    },
    cancelled: {
      title: 'Pembayaran Dibatalkan',
      body: 'Anda telah membatalkan proses pembayaran.',
      retry: 'Cuba Lagi',
      home: 'Kembali ke Utama',
    },
    error: {
      title: 'Isu Pembayaran',
      body: 'Terdapat masalah dengan pembayaran anda. Sila cuba lagi.',
      retry: 'Cuba Lagi',
      home: 'Kembali ke Utama',
    },
    loading: {
      title: 'Mengesahkan Pembayaran...',
      body: 'Sila tunggu sementara kami mengesahkan transaksi anda.',
    },
  },
  promo: {
    badge: 'Tawaran Terhad',
    overline: 'Pakej Promosi',
    headline: 'Pakej Servis Gearbox',
    subheadline: 'Tukar Minyak ATF + Penapis Auto + PERCUMA Peranti OBD2 — semua yang transmisi anda perlukan dalam satu lawatan.',
    price: 'RM 460',
    originalPrice: 'RM 580',
    ctaPrimary: 'Dapatkan Tawaran Ini',
    ctaSecondary: 'Ketahui Lebih Lanjut',
    landing: {
      heroHeadline: 'Pakej Servis\nGearbox Lengkap',
      heroBody: 'Penggantian minyak ATF, penukaran penapis automatik, dan PERCUMA peranti diagnostik OBD2 — digabungkan dalam satu lawatan yang berpatutan. Jaga kesihatan transmisi anda dan pantau kenderaan anda bila-bila masa.',
      includedTitle: 'Apa Yang Termasuk',
      included: [
        {
          title: 'Tukar Minyak ATF',
          description: 'Penyaliran dan penggantian lengkap dengan cecair transmisi automatik premium yang sepadan dengan spesifikasi kenderaan anda. Cecair baru memulihkan penukaran gear yang lancar dan mengurangkan pembentukan haba.',
        },
        {
          title: 'Penapis Auto',
          description: 'Penapis gearbox anda menangkap zarah logam dan serpihan yang terkumpul dari masa ke masa. Penapis baru memastikan peredaran cecair yang bersih dan melindungi komponen dalaman daripada haus.',
        },
        {
          title: 'PERCUMA Peranti OBD2',
          description: 'Dapatkan peranti diagnostik OBD2 percuma dengan servis anda. Pantau kesihatan kenderaan, baca kod ralat, dan kesan masalah awal — terus dari telefon anda.',
        },
      ],
      whoTitle: 'Siapa Perlu Dapatkan Ini',
      whoItems: [
        'Kenderaan melebihi 40,000 km yang belum pernah membuat servis gearbox',
        'Kereta yang mengalami penukaran gear yang kasar atau lambat',
        'Pemilik yang ingin memanjangkan jangka hayat transmisi',
        'Kenderaan dengan cecair ATF yang gelap atau berbau hangit',
        'Sesiapa yang bersiap untuk perjalanan jauh atau pemeriksaan kenderaan',
      ],
      modelsTitle: 'Model Yang Sesuai',
      models: [
        'Perodua Myvi, Axia, Bezza, Aruz, Alza',
        'Proton Saga, X50, X70, Iriz, Persona',
        'Honda City, Civic, Jazz, CR-V, HR-V',
        'Toyota Vios, Camry, Alphard, RAV4',
        'Nissan Almera, X-Trail, Serena',
        'Mazda 2, 3, CX-5, CX-3',
        'Dan banyak lagi — hubungi kami untuk model spesifik anda',
      ],
      warrantyTitle: 'Waranti 3 Bulan',
      warrantyBody: 'Setiap pakej servis disertakan waranti 3 bulan / 5,000 km. Jika ada sebarang masalah selepas servis, bawa kembali — kami akan selesaikan.',
      footerCta: 'Tempah Pakej Servis Anda',
      footerBody: 'Harga tawaran terhad. Walk-in atau WhatsApp kami untuk menempah slot anda.',
    },
  },
  shop: {
    nav: 'Kedai',
    hero: {
      overline: 'Kedai',
      headline: 'Produk & Perkhidmatan',
      body: 'Pakej servis gearbox dan alat diagnostik — tempah dalam talian dan kami uruskan selebihnya.',
    },
    categories: {
      all: 'Semua',
      service: 'Perkhidmatan',
      device: 'Peranti',
    },
    addToCart: 'Tambah ke Troli',
    added: 'Ditambah',
    viewDetails: 'Lihat Butiran',
    items: 'item',
    includes: 'Termasuk',
    warranty: 'Waranti',
    comingSoon: 'Akan Datang',
    bookNow: 'Tempah Sekarang',
    depositLabel: 'Deposit Tempahan',
    cart: {
      title: 'Troli Anda',
      empty: 'Troli anda kosong.',
      continueShopping: 'Teruskan Membeli',
      remove: 'Buang',
      total: 'Jumlah',
      checkout: 'Teruskan ke Pembayaran',
      quantity: 'Kuantiti',
    },
    checkout: {
      title: 'Pembayaran',
      subtitle: 'Isi butiran anda untuk menyelesaikan pesanan.',
      fields: {
        name: 'Nama Penuh',
        phone: 'Nombor Telefon',
        email: 'Alamat Emel',
        address: 'Alamat Penghantaran / Servis',
        notes: 'Nota Pesanan (pilihan)',
        vehicleModel: 'Model Kenderaan (cth. Perodua Myvi)',
        preferredDate: 'Tarikh Pilihan',
        timeSlot: 'Slot Masa',
      },
      orderSummary: 'Ringkasan Pesanan',
      payNow: 'Bayar Sekarang',
      payDeposit: 'Bayar Deposit',
      depositLabel: 'Deposit Tempahan',
      depositNotice: 'Baki selebihnya dibayar di bengkel pada tarikh servis anda.',
      processing: 'Memproses...',
    },
    success: {
      title: 'Pesanan Disahkan',
      body: 'Pembayaran anda telah diterima. Pasukan kami akan menghubungi anda untuk mengatur servis atau penghantaran.',
      orderId: 'ID Pesanan',
      amount: 'Jumlah Dibayar',
      home: 'Kembali ke Utama',
      whatsapp: 'Sahkan melalui WhatsApp',
      waSuccess: 'ONEX ORDER - Hi, saya telah membayar deposit untuk pakej servis. Sila sahkan pesanan saya. Terima kasih!',
    },
    cancelled: {
      title: 'Pembayaran Dibatalkan',
      body: 'Pembayaran anda dibatalkan atau gagal. Pesanan anda belum disahkan. Anda boleh cuba semula bila-bila masa.',
      retry: 'Cuba Semula',
      whatsapp: 'Hubungi melalui WhatsApp',
      waFail: 'ONEX ORDER - Hi, saya cuba membuat pembayaran untuk pakej servis tetapi gagal. Boleh tolong saya?',
    },
  },
  footer: {
    tagline: 'Pakar pembaikan dan servis gearbox CVT dan automatik di Shah Alam.',
    copyright: `\u00A9 ${new Date().getFullYear()} One X Transmission. Semua hak terpelihara.`,
    columns: [
      {
        title: 'Halaman',
        links: [
          { label: 'Utama', href: '/' },
          { label: 'Tentang Kami', href: '/about' },
          { label: 'Khidmat', href: '/capabilities' },
          { label: 'Proses', href: '/process' },
        ],
      },
      {
        title: 'Perkhidmatan',
        links: [
          { label: 'Diagnosis Gearbox', href: '/capabilities' },
          { label: 'Baik Pulih CVT & AT', href: '/capabilities' },
          { label: 'Servis Transmisi', href: '/capabilities' },
          { label: 'Pakej Servis', href: '/packages' },
          { label: 'Servis Pintu ke Pintu', href: '/capabilities' },
        ],
      },
      {
        title: 'Sokongan',
        links: [
          { label: 'Soalan Lazim', href: '/faq' },
          { label: 'Hubungi', href: '/contact' },
        ],
      },
    ],
  },
}

// ─── Chinese Content (Full Translation) ───

const zh: SiteContent = {
  nav: {
    home: '首页',
    about: '关于我们',
    capabilities: '服务项目',
    process: '工作流程',
    faq: '常见问题',
    contact: '联系我们',
    blog: 'Blog',
    cta: '联系我们',
  },
  home: {
    hero: {
      overline: '变速箱专家 — 莎阿南',
      headline: '精准诊断。\n可靠维修。',
      subheadline:
        '专业CVT和自动变速箱维修，以诊断为先的方法。每次维修始于全面了解问题根源。',
      ctaPrimary: '预约免费诊断',
      ctaSecondary: '查看服务项目',
    },
    philosophy: {
      overline: '我们的理念',
      headline: '诊断高于一切。',
      body: [
        '大多数维修店更换零件后只是寄望问题能自行解决。我们从不同角度出发，通过彻底、系统的诊断识别真正病因，再动工维修。',
        '诊断优先的原则意味着您的变速箱问题得到彻底解决，而非暂时修补。更少的返厂次数，更少不必要的零件更换，每次维修都建立在确定性之上。',
      ],
      caption: '每台车辆均提供免费专业诊断评估。',
    },
    services: {
      overline: '服务项目',
      headline: '我们的专业服务。',
      items: [
        {
          title: '专业诊断',
          description:
            '全面的扫描仪诊断、路试评估、液体分析及渗漏检测。维修前提供完整诊断报告。',
          detail: '免费 · 30至45分钟',
        },
        {
          title: '变速箱大修',
          description:
            '自动波箱和CVT的完整拆卸、检查和重建。使用原厂及OEM配件，按厂家规格校准，并进行全面路试。',
          detail: '3至5个工作日，含保修',
        },
        {
          title: '变速箱保养',
          description:
            '定期保养服务，包括ATF/CVT液更换、滤芯更换、零件检查、ECU自适应重置及保养后路试。',
          detail: '4至8小时，含保修',
        },
        {
          title: '上门检测服务',
          description:
            '我们上门为您进行专业现场诊断。如需维修，我们收取车辆、完成所有维修工作，并将车辆送回您家门口。',
          detail: '巴生谷 · 须预约',
        },
      ],
    },
    process: {
      overline: '工作方式',
      headline: '四个精准步骤。',
      steps: [
        {
          number: '01',
          title: '检测',
          description: '使用专业扫描仪工具进行全面诊断及专家评估，精准识别根本原因。',
        },
        {
          number: '02',
          title: '拆卸',
          description: '系统性拆卸，每个零件逐一检查并记录。',
        },
        {
          number: '03',
          title: '修复',
          description: '超声波清洗，精准更换原厂/OEM零件，细致重新组装。',
        },
        {
          number: '04',
          title: '校准',
          description: '按厂家规格重新校准，并在真实条件下进行全面路试验证。',
        },
      ],
    },
    stats: {
      items: [
        { value: '15', numericValue: 15, suffix: '+', label: '年专业经验' },
        { value: '5000', numericValue: 5000, suffix: '+', label: '变速箱维修台数' },
        { value: '4.8', numericValue: 4.8, suffix: '/5', label: 'Google评分' },
        { value: '12', numericValue: 12, suffix: ' 个月', label: '维修保修期' },
      ],
    },
    gallery: {
      overline: '近期作品',
      headline: '来自维修车间。',
      cta: '查看全部作品',
    },
    cta: {
      headline: '变速箱出问题了？',
      body: '从免费专业诊断开始。无需承诺，无需猜测——只需清楚了解您的变速箱需要什么。',
      ctaPrimary: 'WhatsApp 联系我们',
      ctaSecondary: '立即致电',
    },
  },
  about: {
    hero: {
      overline: '关于 One X Transmission',
      headline: '建立在诊断纪律之上。',
      body: '一家坚信确定性先于维修的变速箱维修店。我们每一个决定都建立在彻底、诚实的诊断基础上。',
    },
    story: {
      headline: '诊断优先的维修店。',
      paragraphs: [
        'One X Transmission 的创立源于一个简单的信念：大多数变速箱问题之所以持续存在，是因为真正的根本原因从未被正确识别。',
        '我们位于雪兰莪州莎阿南，多年来凭借系统性诊断建立了良好口碑。在更换任何零件、更换任何液体之前，我们都会花时间准确了解变速箱内部发生了什么。',
        '这一方式赢得了数千名车主的信赖，他们看重的是透明和精准，而非快速但不确定的维修。',
        '我们专门使用原厂及OEM规格零件，每次维修都附带全面保修——因为诊断正确，维修才能持久。',
      ],
    },
    whyUs: {
      headline: '为什么车主选择我们。',
      reasons: [
        {
          title: '免费专业诊断',
          description: '每台车辆在我们提出任何建议之前，都会获得免费、全面的诊断评估。',
        },
        {
          title: '原厂及OEM零件',
          description: '我们专门使用原厂或OEM规格零件。在最关键的零件上，我们绝不妥协。',
        },
        {
          title: '全面保修',
          description: '每次维修均提供长达12个月的保修——体现了我们对工作质量的信心。',
        },
        {
          title: '透明流程',
          description: '动工前提供清晰报价。没有隐藏费用，没有意外加收。您清楚知道自己在为什么付费。',
        },
      ],
    },
  },
  capabilities: {
    hero: {
      overline: '服务项目',
      headline: '全面的变速箱\n维修与保养。',
      body: '从初始评估到最终路试，我们的服务涵盖CVT和自动变速箱维修与保养的每个环节。',
    },
    diagnosis: {
      title: '专业诊断',
      description:
        '每次维修的基础。我们的诊断流程使用专业级扫描工具、实地评估及路试，全面掌握您变速箱的状况。',
      price: '免费',
      duration: '30–45分钟',
      included: [
        '专业扫描仪诊断',
        '路试评估',
        '液体液位及质量检查',
        '渗漏检测及检查',
        '完整书面诊断报告',
      ],
    },
    overhaul: {
      title: '变速箱大修',
      description:
        '完整的变速箱重建。完全拆卸，逐一检查每个零件，按原厂/OEM规格更换磨损部件，重新组装并校准至厂家标准。',
      price: '起价 RM 2,500',
      duration: '3–5个工作日',
      warranty: '6个月 / 10,000公里',
      included: [
        '完整拆卸及零件级检查',
        '更换所有磨损零件',
        '完整ATF冲洗及更换',
        '全新垫圈套件及密封件',
        '厂家规格校准及路试',
      ],
    },
    service: {
      title: '变速箱保养',
      description:
        '延长变速箱使用寿命的预防性保养。我们更换液体、检查零件、重置ECU自适应，并进行路试确认正常运作。',
      price: '起价 RM 150',
      duration: '4–8小时',
      warranty: '3个月 / 5,000公里',
      included: [
        '更换ATF或CVT液体',
        '更换变速箱滤芯',
        '零件状态检查',
        'ECU自适应重置',
        '保养后路试',
      ],
    },
    doorToDoor: {
      title: '上门检测与收送服务',
      description:
        '我们将诊断送上门。预约后，我们的技术员将前往您的住所或办公室，为您的车辆进行完整的专业评估。如您决定进行维修，我们负责收车、在维修店完成所有维修工作，并将车辆送回您家门口。',
      coverage: '巴生谷',
      available: '须预约 · 在线预约',
      steps: [
        {
          number: '01',
          title: '在线预约',
          description: '通过我们的预约系统预订时间段。支付RM 10押金确认预约。我们将安排技术员前往您的所在地。',
        },
        {
          number: '02',
          title: '我们上门检测',
          description: '我们的技术员在现场进行完整的专业诊断评估——与到店服务相同的严谨流程。免费，无需承诺。',
        },
        {
          number: '03',
          title: '我们收取您的车辆',
          description: '如您决定按建议进行维修，我们安排所有运输事宜。无拖车费，无额外收费——物流由我们处理。',
        },
        {
          number: '04',
          title: '我们将车辆送回',
          description: '维修完成并通过质量检查后，我们将您的车辆送回家门口，随时可以上路。',
        },
      ],
      cta: '预约上门服务',
    },
    other: {
      title: '其他服务',
      description: '除变速箱维修外，我们还提供辅助保养服务，确保您的车辆精准运行。',
      items: [
        '更换火花塞',
        '更换刹车片',
        '更换正时皮带',
        '冷却液保养',
        '刹车液保养',
      ],
    },
  },
  process: {
    hero: {
      overline: '工作流程',
      headline: '每次维修遵循相同的纪律。',
      body: '系统性的四步骤流程，确保没有任何遗漏，每次维修都建立在全面理解的基础上。',
    },
    steps: [
      {
        number: '01',
        title: '检测',
        description: '使用专业扫描工具及专家经验进行全面诊断。',
        detail:
          '我们从全面诊断扫描、路试评估、液体分析和目视检查开始。目标很简单：识别真正的根本原因，而非猜测症状。',
      },
      {
        number: '02',
        title: '拆卸',
        description: '系统性拆卸，逐一检查各零件。',
        detail:
          '变速箱被仔细取出并系统性拆卸。每个零件都经过检查、测量和记录，全面掌握需要处理的问题。',
      },
      {
        number: '03',
        title: '修复',
        description: '精准清洗、零件更换及细致重新组装。',
        detail:
          '零件使用超声波设备和专用化学品清洗。磨损或损坏的部件以原厂或OEM规格零件替换，然后按厂家公差重新组装。',
      },
      {
        number: '04',
        title: '校准',
        description: '按厂家规格重新校准及实际路试。',
        detail:
          '重建后的变速箱按制造商规格重新校准，然后在各种条件下进行全面路试，验证平稳可靠的性能。',
      },
    ],
  },
  faq: {
    hero: {
      overline: '常见问题',
      headline: '常见问题，清晰解答。',
      body: '关于我们变速箱服务、价格及流程的直接信息。',
    },
    items: [
      {
        question: '诊断真的免费吗？',
        answer:
          '是的。每台车辆都享有免费专业诊断评估。收到诊断报告后，您无需承担任何后续维修的义务。',
      },
      {
        question: '大修需要多长时间？',
        answer:
          '一般变速箱大修需要3至5个工作日，具体取决于车型及工作量。我们会在诊断后提供时间估算。',
      },
      {
        question: '你们提供什么保修？',
        answer:
          '所有大修工作均附带最长6个月或10,000公里的保修（以先到者为准）。保养工作保修3个月或5,000公里。具体保修条款在报价时确认。',
      },
      {
        question: '你们使用原厂零件吗？',
        answer:
          '我们专门使用原厂零件及OEM规格零件，在零件质量上绝不妥协。',
      },
      {
        question: '我可以申请保险赔偿变速箱维修费用吗？',
        answer:
          '这取决于您的保险条款及问题性质。我们可以提供所需文件，以便您向保险公司提交索赔。',
      },
      {
        question: '你们提供分期付款吗？',
        answer:
          '请联系我们讨论付款安排。我们致力于提供便利，同时在所有财务事项上保持透明。',
      },
      {
        question: '你们维修哪些汽车品牌？',
        answer:
          '我们维修马来西亚所有主要品牌的CVT和自动变速箱——包括Perodua、Proton、Honda、Toyota、Nissan、Mazda、Ford等。',
      },
      {
        question: '马来西亚变速箱维修费用是多少？',
        answer:
          '变速箱保养起价RM 150。完整变速箱大修（AT或CVT）起价RM 2,500，具体取决于车型及损坏程度。免费诊断评估后提供详细书面报价——没有隐藏费用，没有意外加收。',
      },
      {
        question: '你们专注哪些车型？',
        answer:
          '我们经常维修Perodua（Myvi、Axia、Bezza、Aruz）、Proton（Saga、X50、X70、Iriz）、Honda（City、Civic、Jazz、CR-V）、Toyota（Vios、Alphard、Camry、RAV4）、Nissan（X-Trail、Almera、Serena）等。涵盖日系、韩系及欧系品牌的CVT和自动变速箱。',
      },
      {
        question: '如何判断我的变速箱需要维修？',
        answer:
          '常见警示迹象包括：换挡时抖动或迟疑、滑档、发动机正常但车辆不动、引擎盖下有烧焦味、接合或退档时有异响、或发动机故障灯亮起。如发现上述任何迹象，请尽快来店免费诊断，以免问题恶化。',
      },
      {
        question: '你们提供上门检测服务吗？',
        answer:
          '是的。我们的上门服务覆盖整个巴生谷地区。技术员将前往您的住所或办公室，在现场进行完整的专业诊断评估——免费。如果您决定进行维修，我们收取车辆、在维修店完成所有工作，并将车辆送回您家门口。在线预约，支付RM 10押金即可确认预约。',
      },
      {
        question: '上门收送车辆是否有额外费用？',
        answer:
          '没有。如在现场诊断后确认进行维修，我们的收送车服务不收取额外费用。收送服务已包含在维修套餐内——这是我们让专业变速箱维修尽可能方便的方式。',
      },
      {
        question: '你们为莎阿南以外的客户提供服务吗？',
        answer:
          '是的。我们的维修店位于莎阿南，但经常为整个巴生谷的客户提供服务——包括梳邦再也、八打灵再也、巴生、蒲种、赛博再也及吉隆坡。许多客户会先通过WhatsApp与我们联系咨询，再来店拜访。',
      },
    ],
  },
  contact: {
    hero: {
      overline: '联系我们',
      headline: '随时恭候。',
      body: '联系我们获取免费诊断评估，或讨论任何变速箱问题。我们会及时回复。',
    },
    form: {
      title: '发送查询',
      fields: {
        name: '全名',
        phone: '电话号码',
        carModel: '车型',
        problem: '主要问题',
        message: '其他详情（可选）',
      },
      submit: '通过WhatsApp发送',
    },
    info: {
      hoursTitle: '营业时间',
      emergencyTitle: '24/7紧急服务',
      emergencyBody: '如需紧急或拖车协助，请随时致电我们。',
    },
  },
  booking: {
    hero: {
      overline: '上门预约',
      headline: '预约您的检测。',
      body: '预约上门诊断服务。技术员将前往您的所在地进行全面专业评估。',
    },
    form: {
      stepDetails: '详情',
      stepReview: '确认 & 付款',
      detailsTitle: '预约详情',
      detailsSubtitle: '填写您的信息以继续',
      reviewTitle: '确认预约',
      reviewSubtitle: '付款前请确认您的信息',
      fields: {
        name: '全名',
        phone: '电话号码',
        address: '家庭地址',
        vehicleModel: '车型',
        issues: '描述问题...',
        dateTime: '选择日期及时间',
      },
      labels: {
        customer: '客户',
        contact: '联系方式',
        vehicle: '车辆',
        date: '日期',
        time: '时间',
        location: '家庭地址',
        problem: '问题描述',
      },
      depositNotice: '确认预约需支付押金',
      depositAmount: 'RM 10',
      next: '确认预约',
      back: '返回',
      pay: '支付 RM 10 押金',
      processing: '处理中...',
    },
    timeSlots: [
      '08:00 AM - 10:00 AM',
      '10:00 AM - 12:00 PM',
      '01:00 PM - 03:00 PM',
      '03:00 PM - 05:00 PM',
    ],
    success: {
      title: '付款成功',
      body: '您的预约已确认。我们已收到您的押金。',
      invoice: '发票号',
      amount: '金额',
      payment: '支付方式',
      receipt: '下载收据',
      home: '返回首页',
    },
    cancelled: {
      title: '付款已取消',
      body: '您已取消付款流程。',
      retry: '重试',
      home: '返回首页',
    },
    error: {
      title: '付款问题',
      body: '处理您的付款时出现问题，请重试。',
      retry: '重试',
      home: '返回首页',
    },
    loading: {
      title: '验证付款中...',
      body: '请稍候，正在确认您的交易。',
    },
  },
  promo: {
    badge: '限时优惠',
    overline: '促销套餐',
    headline: '变速箱保养套餐',
    subheadline: 'ATF换油 + 自动滤清器 + 免费OBD2设备 — 一次到位，满足变速箱所有需求。',
    price: 'RM 460',
    originalPrice: 'RM 580',
    ctaPrimary: '立即预约',
    ctaSecondary: '了解更多',
    landing: {
      heroHeadline: '完整变速箱\n保养套餐',
      heroBody: 'ATF变速箱油更换、自动滤清器更换及免费OBD2诊断设备 — 一次经济实惠的到店服务。保持变速箱健康运转，随时监测车辆状态。',
      includedTitle: '套餐包含',
      included: [
        {
          title: 'ATF变速箱油更换',
          description: '完全排放并更换匹配您车辆规格的优质自动变速箱油。新鲜的变速箱油能恢复顺畅换挡并减少热量积聚。',
        },
        {
          title: '自动滤清器',
          description: '变速箱滤清器会随时间积累金属颗粒和碎屑。新滤清器确保油液清洁循环，保护内部零件免受磨损。',
        },
        {
          title: '免费OBD2设备',
          description: '保养即送OBD2诊断设备。随时监测车辆健康状态、读取故障码、及早发现潜在问题 — 直接通过手机操作。',
        },
      ],
      whoTitle: '适用对象',
      whoItems: [
        '行驶超过40,000公里且未做过变速箱保养的车辆',
        '换挡粗糙或延迟的汽车',
        '希望延长变速箱使用寿命的车主',
        'ATF油液变黑或有烧焦味的车辆',
        '准备长途旅行或车辆检查的车主',
      ],
      modelsTitle: '适用车型',
      models: [
        'Perodua Myvi, Axia, Bezza, Aruz, Alza',
        'Proton Saga, X50, X70, Iriz, Persona',
        'Honda City, Civic, Jazz, CR-V, HR-V',
        'Toyota Vios, Camry, Alphard, RAV4',
        'Nissan Almera, X-Trail, Serena',
        'Mazda 2, 3, CX-5, CX-3',
        '更多车型 — 请联系我们确认您的具体型号',
      ],
      warrantyTitle: '3个月保修',
      warrantyBody: '每个保养套餐均附赠3个月/5,000公里保修。如果保养后有任何不适，请带回来 — 我们会妥善处理。',
      footerCta: '预约保养套餐',
      footerBody: '限时优惠价格。到店或WhatsApp我们预约。',
    },
  },
  shop: {
    nav: '商店',
    hero: {
      overline: '商店',
      headline: '产品与服务',
      body: '变速箱保养套餐和诊断工具 — 在线下单，我们为您安排一切。',
    },
    categories: {
      all: '全部',
      service: '服务',
      device: '设备',
    },
    addToCart: '加入购物车',
    added: '已添加',
    viewDetails: '查看详情',
    items: '件商品',
    includes: '包含',
    warranty: '保修',
    comingSoon: '即将推出',
    bookNow: '立即预约',
    depositLabel: '预约押金',
    cart: {
      title: '购物车',
      empty: '购物车为空。',
      continueShopping: '继续购物',
      remove: '移除',
      total: '合计',
      checkout: '去结算',
      quantity: '数量',
    },
    checkout: {
      title: '结算',
      subtitle: '填写您的信息以完成订单。',
      fields: {
        name: '姓名',
        phone: '电话号码',
        email: '电子邮箱',
        address: '送货/服务地址',
        notes: '订单备注（选填）',
        vehicleModel: '车型（例如 Perodua Myvi）',
        preferredDate: '首选日期',
        timeSlot: '时间段',
      },
      orderSummary: '订单摘要',
      payNow: '立即支付',
      payDeposit: '支付押金',
      depositLabel: '预约押金',
      depositNotice: '余额将在服务当天于车间支付。',
      processing: '处理中...',
    },
    success: {
      title: '订单已确认',
      body: '您的付款已收到。我们的团队将尽快联系您安排服务或配送。',
      orderId: '订单编号',
      amount: '支付金额',
      home: '返回首页',
      whatsapp: '通过WhatsApp确认',
      waSuccess: 'ONEX ORDER - 您好，我已支付服务套餐的押金。请确认我的订单。谢谢！',
    },
    cancelled: {
      title: '付款已取消',
      body: '您的付款已取消或失败。订单尚未确认。您可以随时重试。',
      retry: '重试',
      whatsapp: '通过WhatsApp联系',
      waFail: 'ONEX ORDER - 您好，我尝试支付服务套餐但失败了。请问可以帮忙吗？',
    },
  },
  footer: {
    tagline: '莎阿南专业CVT和自动变速箱维修与保养服务。',
    copyright: `\u00A9 ${new Date().getFullYear()} One X Transmission. 版权所有。`,
    columns: [
      {
        title: '页面',
        links: [
          { label: '首页', href: '/' },
          { label: '关于我们', href: '/about' },
          { label: '服务项目', href: '/capabilities' },
          { label: '工作流程', href: '/process' },
        ],
      },
      {
        title: '服务',
        links: [
          { label: '变速箱诊断', href: '/capabilities' },
          { label: 'CVT & AT大修', href: '/capabilities' },
          { label: '变速箱保养', href: '/capabilities' },
          { label: '保养套餐', href: '/packages' },
          { label: '上门检测服务', href: '/capabilities' },
        ],
      },
      {
        title: '支持',
        links: [
          { label: '常见问题', href: '/faq' },
          { label: '联系我们', href: '/contact' },
        ],
      },
    ],
  },
}

// ─── Content Accessor ───

const contentMap: Record<Locale, SiteContent> = { en, ms, zh }

export function getContent(locale: Locale): SiteContent {
  return contentMap[locale] ?? contentMap[defaultLocale]
}

// ─── Gallery Data (not locale-dependent) ───

export const galleryImages = [
  { src: '/images/Gallery/Toyota%20GT86.jpeg',              alt: 'Toyota GT86 gearbox overhaul at One X Transmission Shah Alam',           width: 810,  height: 1080 },
  { src: '/images/Gallery/Honda%20City%20GM6%20%282%29.jpeg', alt: 'Honda City GM6 CVT transmission repair at One X Transmission Shah Alam',  width: 960,  height: 1280 },
  { src: '/images/Gallery/Honda%20Civic%20FC.jpeg',          alt: 'Honda Civic FC automatic gearbox service at One X Transmission',         width: 960,  height: 1280 },
  { src: '/images/Gallery/Mercedes.jpeg',                   alt: 'Mercedes transmission diagnostic at One X Transmission Shah Alam',        width: 810,  height: 1080 },
  { src: '/images/Gallery/Nissan%20X-Trail.jpeg',            alt: 'Nissan X-Trail gearbox overhaul at One X Transmission Selangor',         width: 960,  height: 1280 },
  { src: '/images/Gallery/Toyota%20Alphard.jpeg',            alt: 'Toyota Alphard CVT service at One X Transmission Shah Alam',             width: 960,  height: 1280 },
  { src: '/images/Gallery/Toyota%20GT86%20II.jpeg',          alt: 'Toyota GT86 full transmission rebuild at One X Transmission Shah Alam',   width: 720,  height: 1080 },
  { src: '/images/Gallery/Perodua%20Myvi.jpeg',              alt: 'Perodua Myvi gearbox service at One X Transmission Shah Alam',           width: 960,  height: 1280 },
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

// ─── Testimonials (not in SiteContent — locale-independent) ───

export const testimonials = [
  {
    id: 1,
    quote:
      'My Perodua Myvi CVT was slipping badly. One X diagnosed the problem in under an hour — free of charge — and gave me a clear written report before touching anything. The repair has been solid for over a year.',
    author: 'Hafizuddin R.',
    vehicle: 'Perodua Myvi 2018',
    rating: 5,
  },
  {
    id: 2,
    quote:
      'Brought my Honda City in after two other workshops gave me different stories. These guys pinpointed the issue immediately. Professional, honest, and the 12-month warranty gives real peace of mind.',
    author: 'Jasmine T.',
    vehicle: 'Honda City GM6',
    rating: 5,
  },
  {
    id: 3,
    quote:
      'Toyota Vios gearbox was jerking at low speed. Full overhaul done within the week. The car drives smoother than it did when I first bought it. Highly recommend One X Transmission.',
    author: 'Mohd Izzat K.',
    vehicle: 'Toyota Vios 2020',
    rating: 5,
  },
]

export type Testimonial = (typeof testimonials)[number]
