# SEO Audit & Improvement Guide
## One X Transmission — onextransmission.com

---

## Current State Audit

### What's Already In Place (Good)
- `metadata.ts` generates canonical URLs, hreflang alternates, OG, and Twitter cards per page
- `structured-data.ts` injects `AutomotiveBusiness` JSON-LD schema on every page
- `robots.ts` and `sitemap.ts` exist and cover all 3 locales × 6 pages = 18 URLs
- Multi-locale routing (`/en/`, `/ms/`, `/zh/`) with proper `x-default` hreflang
- Meta descriptions and titles per page

### What's Missing / Weak
| Gap | Impact |
|-----|--------|
| Page titles are generic ("About — One X Transmission") | Low keyword signal |
| No `og:image` defined — social shares show blank preview | Low CTR from social |
| Schema `areaServed` only covers Shah Alam, not Klang Valley | Limits local reach |
| No FAQ schema on FAQ page | Misses FAQ rich results in Google |
| No HowTo schema on Process page | Misses How-To rich results |
| No BreadcrumbList schema | Reduces SERP snippet real estate |
| No `sameAs` in schema (Google Business, Waze, Facebook) | Weakens entity authority |
| Sitemap has no `hreflang` annotations | Multilingual indexing confusion |
| No geo meta tags | Weak local signal |
| Rating count is hardcoded 500 (inaccurate) | Review schema trustworthiness |
| No location service area pages | Cannot rank for "gearbox Subang", "Klang" etc. |
| Content copy doesn't use top Malaysian search phrases | Keyword gap |
| No internal linking strategy | PageRank distribution is flat |

---

## Part 1 — Page Title & Meta Description Overhaul

Every title and description must target **intent + location + differentiator**.

### Home Page
```
Title: Gearbox Specialist Shah Alam | Free Diagnosis | One X Transmission
Description: Malaysia's trusted CVT and automatic gearbox specialist in Shah Alam. Free professional diagnosis, full overhaul, and transmission servicing. 15 years experience, 5,000+ vehicles, 12-month warranty.
```

### About Page
```
Title: Most Trusted Gearbox Workshop Shah Alam | About One X Transmission
Description: One X Transmission — a diagnostic-first gearbox workshop in Shah Alam, Selangor. 15 years of transmission expertise, rated 4.8/5 by thousands of Malaysian car owners.
```

### Capabilities Page
```
Title: CVT & Automatic Gearbox Repair Services Shah Alam | One X Transmission
Description: Professional gearbox diagnosis (free), AT and CVT overhaul, and transmission servicing. Covering all major Malaysian car brands — Perodua, Proton, Honda, Toyota, and more.
```

### Process Page
```
Title: Our Gearbox Repair Process | 4-Stage Diagnostic Method | One X Transmission
Description: See exactly how we fix transmissions — from scanner diagnosis to road test. A transparent, systematic 4-stage process trusted by Shah Alam and Klang Valley drivers.
```

### FAQ Page
```
Title: Gearbox Repair FAQ — Pricing, Warranty & Process | One X Transmission Shah Alam
Description: Common questions about gearbox diagnosis costs, AT/CVT overhaul pricing, warranty terms, original parts, and our repair process. Straight answers, no jargon.
```

### Contact Page
```
Title: Contact Gearbox Specialist Shah Alam | WhatsApp or Call | One X Transmission
Description: Reach One X Transmission for a free gearbox consultation. Workshop at Batu 7½ Shah Alam, Selangor. WhatsApp +60 10-202 0723. Mon–Fri 9am–6pm, Sat 9am–5pm.
```

**Implementation:** Update each page's `generateMetadata` call in `/app/[locale]/(site)/*/page.tsx`.

---

## Part 2 — Structured Data (JSON-LD) Improvements

### 2a — Expand `LocalBusiness` in `structured-data.ts`

Add these missing fields to `generateLocalBusinessJsonLd()`:

```typescript
// Add inside the returned object:

'@type': ['AutomotiveBusiness', 'LocalBusiness'],  // dual type

slogan: 'Diagnosis Above All Else',

image: [
  'https://onextransmission.com/images/hero/Hero 1.jpeg',
  'https://onextransmission.com/images/Premise/Premise 1.jpeg',
],

sameAs: [
  'https://g.co/kgs/YOUR_GOOGLE_BUSINESS_ID',   // replace with real GMB link
  'https://www.facebook.com/onextransmission',   // if exists
  'https://www.waze.com/ul?ll=2.9790,101.5185',
],

areaServed: [
  { '@type': 'City', name: 'Shah Alam' },
  { '@type': 'City', name: 'Subang Jaya' },
  { '@type': 'City', name: 'Klang' },
  { '@type': 'City', name: 'Petaling Jaya' },
  { '@type': 'City', name: 'Puchong' },
  { '@type': 'AdministrativeArea', name: 'Selangor' },
  { '@type': 'AdministrativeArea', name: 'Klang Valley' },
],

serviceArea: {
  '@type': 'GeoCircle',
  geoMidpoint: {
    '@type': 'GeoCoordinates',
    latitude: 2.9790295931497934,
    longitude: 101.51856181116906,
  },
  geoRadius: '30000',  // 30km radius
},

founder: {
  '@type': 'Person',
  name: 'One X Transmission Founder',  // replace with real name
},

foundingDate: '2009',  // adjust to actual founding year

keywords: 'gearbox repair Shah Alam, CVT transmission specialist Malaysia, gearbox overhaul Selangor, automatic transmission repair Klang Valley',
```

---

### 2b — FAQ Schema (add to FAQ page)

Create a new function in `structured-data.ts`:

```typescript
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
```

Then inject it in `/app/[locale]/(site)/faq/page.tsx`:
```tsx
import { generateFAQJsonLd } from '@/lib/structured-data'
import { getContent } from '@/content'

// In the page component:
const content = getContent(locale)
const faqSchema = generateFAQJsonLd(content.faq.items)

// In the JSX:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
/>
```

**Why it matters:** FAQ schema enables Google to show **collapsible FAQ dropdowns** directly in search results — massive CTR boost with no extra content needed.

---

### 2c — HowTo Schema (add to Process page)

```typescript
export function generateHowToJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How We Repair Your Gearbox',
    description: 'A systematic 4-stage transmission repair process from diagnosis to road test.',
    totalTime: 'P5D',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Inspection',
        text: 'Professional scanner-based diagnostics and specialist assessment to identify the exact root cause.',
        position: 1,
      },
      {
        '@type': 'HowToStep',
        name: 'Disassembly',
        text: 'Methodical teardown with every component individually inspected and catalogued.',
        position: 2,
      },
      {
        '@type': 'HowToStep',
        name: 'Restoration',
        text: 'Ultrasonic cleaning, precision part replacement with original/OEM components, and careful reassembly.',
        position: 3,
      },
      {
        '@type': 'HowToStep',
        name: 'Calibration',
        text: 'Factory-spec recalibration and comprehensive road testing under real conditions.',
        position: 4,
      },
    ],
  }
}
```

---

### 2d — BreadcrumbList Schema

Add to every inner page (About, Capabilities, Process, FAQ, Contact):

```typescript
export function generateBreadcrumbJsonLd(locale: string, page: string, pageLabel: string) {
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
```

---

## Part 3 — Local SEO (Highest Priority)

Local SEO is the #1 driver for "near me" and city-based searches. These steps are essential.

### 3a — Google Business Profile (GMB) — Must Do First

1. Claim/create at [business.google.com](https://business.google.com)
2. Business name: **One X Transmission**
3. Category: **Transmission Shop** (primary) + **Auto Repair Shop** (secondary)
4. Address: GF LOT 184107, Jalan Haji Taib, Batu 7½, Shah Alam, 40460, Selangor
5. Phone: +60 10-202 0723
6. Website: https://onextransmission.com
7. Hours: Mon–Fri 9am–6pm, Sat 9am–5pm
8. Add **all 7 gallery photos** from the website
9. Write a business description using these exact phrases:
   > "One X Transmission is Shah Alam's trusted gearbox specialist. We offer free professional diagnosis, CVT and automatic transmission overhaul, and gearbox servicing for all major Malaysian car brands including Perodua, Proton, Honda, Toyota, and Nissan. Located at Batu 7½ Shah Alam, serving the Klang Valley. 15 years experience, 12-month warranty on all work."

10. Add Services in GMB:
    - Free Gearbox Diagnosis
    - CVT Gearbox Overhaul
    - Automatic Transmission Overhaul
    - Transmission Fluid Service
    - Gearbox Inspection

11. Enable **messaging** on the profile
12. Post **weekly** updates (workshop photos, completed jobs) — GMB posts index in Google

### 3b — Citation Building (NAP Consistency)

Your **Name, Address, Phone** must be identical everywhere:
- **Name:** One X Transmission
- **Address:** GF LOT 184107, Jalan Haji Taib, Batu 7½, Shah Alam, 40460, Selangor
- **Phone:** +60 10-202 0723

Submit to these directories:
| Directory | URL |
|-----------|-----|
| Waze | waze.com/business |
| Carlist.my | carlist.my |
| Mudah.my | mudah.my |
| iPrice Malaysia | iprice.my |
| Yelp Malaysia | yelp.com |
| Foursquare | foursquare.com |
| Apple Maps | mapsconnect.apple.com |

### 3c — Add Geo Meta Tags to `app/layout.tsx`

```tsx
// Add inside the metadata export in app/layout.tsx
other: {
  'geo.region': 'MY-10',        // Selangor ISO code
  'geo.placename': 'Shah Alam',
  'geo.position': '2.9790295931497934;101.51856181116906',
  'ICBM': '2.9790295931497934, 101.51856181116906',
}
```

### 3d — Reviews Strategy

Google ranks businesses with **more recent reviews** higher in local pack:
- After every completed job, send customer a WhatsApp message:
  > "Thank you for trusting One X Transmission! If you're happy with the service, a quick Google review would mean the world to us 🙏 [short GMB review link]"
- Target: **50+ reviews, 4.5+ stars**
- Respond to every review — Google sees this as engagement

---

## Part 4 — Keyword Strategy by Target

### "Best Workshop" Signals
These phrases must appear naturally in page copy:

- "Most trusted transmission workshop in Shah Alam"
- "Rated 4.8/5 by Klang Valley drivers"
- "15 years as Selangor's gearbox specialist"
- "Thousands of satisfied customers"
- "Recommended by Malaysian car owners"

Add to: About page body copy, WhyUs section, FAQ answer phrasing.

---

### "Gearbox Specialist" Signals
These must appear in headings (H1/H2) and the first 100 words of pages:

- "CVT gearbox specialist"
- "automatic transmission specialist Malaysia"
- "gearbox overhaul specialist Shah Alam"
- "transmission diagnostic specialist"

Currently the Hero overline says *"Gearbox Specialist — Shah Alam"* — good.  
Capabilities hero says *"Transmission care, end to end"* — needs "specialist" added.

---

### Malaysian Automotive Angles
Target these search variations in FAQ answers and content:

| Search Intent | Phrase to Use |
|---------------|---------------|
| Brand-specific | "Perodua Myvi gearbox repair", "Honda City CVT", "Toyota Alphard AT overhaul" |
| Problem-based | "gearbox jerking Malaysia", "transmission slipping fix", "CVT shudder" |
| Price-based | "gearbox overhaul price Malaysia", "CVT repair cost Shah Alam" |
| Near me | "gearbox workshop near me Shah Alam", "transmission repair Klang Valley" |
| Urgency | "emergency gearbox repair Selangor", "gearbox won't engage Malaysia" |

Add 2–3 of these as **new FAQ items** in `content/index.ts`.

---

### "Most Trusted" Signals
Trust needs to be demonstrated with specifics:

1. **Add to FAQ or About:** Mention the 12-month warranty explicitly with km limit
2. **Add to structured data:** Accurate review count from real GMB reviews
3. **Content addition:** Add a "Warranty" section or callout on the Capabilities page
4. **Photo evidence:** The gallery already shows real cars — add captions with car model and service done (already done ✅)

---

## Part 5 — Content Additions for SEO

### 5a — Add These FAQ Questions to `content/index.ts`

```typescript
{
  question: 'What is the cost of gearbox repair in Malaysia?',
  answer:
    'Transmission servicing starts from RM 150. A full gearbox overhaul (AT or CVT) starts from RM 2,500 depending on the vehicle model and extent of damage. We provide a detailed quote after a free diagnostic assessment — no hidden costs.',
},
{
  question: 'Which car brands do you specialise in?',
  answer:
    'We work on all major Malaysian car brands — Perodua (Myvi, Axia, Bezza, Aruz), Proton (Saga, X50, X70, Iriz), Honda (City, Civic, Jazz, CR-V), Toyota (Vios, Alphard, Camry, RAV4), Nissan (X-Trail, Almera, Serena), Mazda, Ford, and more. Both CVT and AT transmissions.',
},
{
  question: 'How do I know if my gearbox needs repair?',
  answer:
    'Common signs include: jerking or hesitation during gear changes, slipping gears, the car not moving despite engine running, burning smell from under the hood, unusual noises in drive or reverse, or the check engine light appearing. If you experience any of these, bring your vehicle in for a free diagnosis.',
},
{
  question: 'Do you serve customers outside Shah Alam?',
  answer:
    'Yes. While our workshop is in Shah Alam, we regularly serve customers from across the Klang Valley — including Subang Jaya, Petaling Jaya, Klang, Puchong, Cyberjaya, and even Kuala Lumpur. Many customers contact us via WhatsApp first for a consultation before visiting.',
},
```

### 5b — Add OG Image

Create a dedicated OG image (1200×630px) with:
- One X Transmission logo
- Workshop photo background
- Text: "Gearbox Specialist | Shah Alam | Free Diagnosis"

Save as `public/images/og-image.jpg` and add to `metadata.ts`:

```typescript
openGraph: {
  ...
  images: [
    {
      url: `${baseUrl}/images/og-image.jpg`,
      width: 1200,
      height: 630,
      alt: 'One X Transmission — Gearbox Specialist Shah Alam',
    },
  ],
},
twitter: {
  card: 'summary_large_image',
  images: [`${baseUrl}/images/og-image.jpg`],
}
```

---

## Part 6 — Technical SEO Fixes

### 6a — Sitemap Priority Differentiation

Update `sitemap.ts` to give FAQ higher priority (FAQ rich results are high-value):

```typescript
const priorities: Record<string, number> = {
  '':              1.0,   // home
  '/capabilities': 0.9,  // service pages are commercial
  '/contact':      0.9,  // conversion page
  '/about':        0.8,
  '/faq':          0.8,  // FAQ schema boosts this
  '/process':      0.7,
}

// Use priorities[page] ?? 0.7 instead of hardcoded 0.8
```

### 6b — Ensure Canonical Handles Locale Redirect

The site redirects `/` to `/en/` via middleware. Make sure the root `app/layout.tsx` metadata includes:

```typescript
alternates: {
  canonical: 'https://onextransmission.com/en',
  languages: {
    'x-default': 'https://onextransmission.com/en',
    'en': 'https://onextransmission.com/en',
    'ms': 'https://onextransmission.com/ms',
    'zh': 'https://onextransmission.com/zh',
  },
},
```

### 6c — Image Alt Text Audit

Every `<Image>` and every gallery photo must have descriptive alt text that includes:
- What's in the image
- The service performed
- Location context where relevant

Example: `alt="Honda City GM6 CVT gearbox overhaul at One X Transmission Shah Alam"`  
(Currently just: `alt="Honda City GM6 — CVT Transmission Repair"` — needs location added)

---

## Part 7 — Implementation Priority Order

Do these in order — highest ROI first:

| Priority | Task | Effort | Impact |
|----------|------|--------|--------|
| 1 | Set up / optimise Google Business Profile | 1 hour | 🔴 Very High |
| 2 | Update all 6 page titles and meta descriptions | 30 mins | 🔴 Very High |
| 3 | Add FAQ schema to FAQ page | 1 hour | 🔴 High |
| 4 | Add 4 new FAQ questions about pricing, brands, symptoms, area | 20 mins | 🔴 High |
| 5 | Expand `areaServed` and `sameAs` in structured data | 30 mins | 🟠 High |
| 6 | Create and add OG image | 1 hour | 🟠 Medium-High |
| 7 | Add geo meta tags | 10 mins | 🟠 Medium |
| 8 | Add HowTo schema to Process page | 30 mins | 🟡 Medium |
| 9 | Add BreadcrumbList schema to all inner pages | 1 hour | 🟡 Medium |
| 10 | Submit to citation directories (Waze, Carlist, Mudah) | 1 hour | 🟡 Medium |
| 11 | Update sitemap priorities | 15 mins | 🟢 Low |
| 12 | Update image alt text with location context | 30 mins | 🟢 Low |
| 13 | Start weekly GMB posts with job photos | Ongoing | 🔴 High (cumulative) |
| 14 | Review request after every completed job | Ongoing | 🔴 Very High (cumulative) |

---

## Part 8 — Tracking & Monitoring

Set up these before launching:

1. **Google Search Console** — verify `onextransmission.com`, submit sitemap URL: `https://onextransmission.com/sitemap.xml`
2. **Google Analytics 4** — add GA4 measurement ID to `app/layout.tsx`
3. **Monitor these queries monthly in Search Console:**
   - `gearbox specialist shah alam`
   - `CVT repair selangor`
   - `transmission workshop near me`
   - `gearbox overhaul malaysia`
   - `best gearbox workshop`

4. **Use these free tools to validate schema:**
   - [Google Rich Results Test](https://search.google.com/test/rich-results)
   - [Schema.org Validator](https://validator.schema.org)

---

## Quick Reference — Target Keywords

### Primary (must rank for)
- `gearbox specialist shah alam`
- `CVT repair shah alam`
- `automatic transmission overhaul selangor`
- `gearbox workshop shah alam`

### Secondary (build toward)
- `gearbox repair klang valley`
- `transmission specialist malaysia`
- `CVT gearbox overhaul malaysia`
- `best gearbox workshop selangor`
- `trusted transmission repair malaysia`

### Long-tail (FAQ and content)
- `how much does gearbox repair cost malaysia`
- `Perodua Myvi CVT gearbox problem`
- `Honda City GM6 transmission repair`
- `gearbox jerking when accelerating Malaysia`
- `CVT shudder fix selangor`

---

*Guide prepared for One X Transmission — onextransmission.com*  
*Last updated: February 2026*
