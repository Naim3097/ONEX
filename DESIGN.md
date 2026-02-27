# Rivian.com — Design / Aesthetic / Layout Extraction

> **Purpose:** Reference document capturing the design standards, layout patterns, aesthetic choices and page structures used across rivian.com. Not to be followed exactly — but to know the standard when building our own site.

---

## Table of Contents

1. [Global Design Language](#1-global-design-language)
2. [Navigation & Header](#2-navigation--header)
3. [Footer](#3-footer)
4. [Homepage (rivian.com/)](#4-homepage)
5. [Vehicle Pages (R1S, R1T)](#5-vehicle-pages-r1s-r1t)
6. [R2 Pre-Launch Page](#6-r2-pre-launch-page)
7. [Technology Page](#7-technology-page)
8. [Our Company Page](#8-our-company-page)
9. [Common UI Components](#9-common-ui-components)
10. [Responsive & Performance Notes](#10-responsive--performance-notes)

---

## 1. Global Design Language

### Colour Palette

| Role | Colour | Notes |
|------|--------|-------|
| Primary Background | **White** `#FFFFFF` | Used on light sections, cards, product areas |
| Primary Background (Alt) | **Black / Near-Black** `#000000` / `#1A1A1A` | Hero sections, dark bands, footer |
| Accent / CTA | **Rivian Green** (muted nature-green) | "Buy", "Build", "Reserve" buttons |
| Secondary CTA | **White outlined** or **Ghost buttons** | "Learn more", "Explore" links |
| Text — Primary | **Black** on light backgrounds | Body copy, headings |
| Text — Inverted | **White** on dark backgrounds | Hero text, dark section headings |
| Subtle Greys | Various light greys | Dividers, secondary text, footnotes |

### Typography

- **Headings:** Clean, modern sans-serif (appears to be a custom/proprietary typeface — likely "Rivian Gothic" or similar geometric sans). Light to medium weight on large hero headings, bolder on sub-headings.
- **Body:** Same sans-serif family, regular weight, generous line-height (~1.5–1.7).
- **Stat numbers:** Very large (48–72px+), thin/light weight, used for range, horsepower, 0-60 stats.
- **Footnote / Legal:** Small (11–12px), grey, stacked at the bottom of each page.
- **Letter-spacing:** Tight on headings, normal on body.
- **Text-transform:** Minimal use of uppercase — mostly sentence case. Section labels occasionally uppercase.

### Spacing & Grid

- Maximum content width: ~1440px, centred.
- Generous whitespace throughout — sections have large vertical padding (80–120px typically).
- Grid: Appears to use a 12-column grid system.
- Section padding: Consistent horizontal gutters ~24–40px on mobile, ~60–80px on desktop sides.
- Vertical rhythm between sections: ~80–160px.

### General Aesthetic

- **Minimalist / Premium:** Very clean, lots of breathing room, limited decorative elements.
- **Nature-inspired:** Imagery dominated by outdoor/adventure photography — forests, mountains, coastlines, dirt roads.
- **Photography-first:** Hero images and video are the dominant visual elements; the design serves the imagery.
- **High contrast:** Dark sections alternate with white sections for strong visual rhythm.
- **Parallax effects:** Multiple sections use depth parallax (foreground/background image layers that move independently on scroll).
- **Smooth scrolling:** Uses scroll-triggered animations, fading in content blocks as user scrolls.
- **Video integration:** Auto-playing, muted background videos in hero areas and feature sections.
- **Rounded corners:** Subtle rounding on cards and buttons (~8–12px border-radius).

---

## 2. Navigation & Header

### Structure

```
[Logo (left)]   [R1T] [R1S] [R2] [Fleet]   [Shop ▾] [Sign In] [Menu ☰]
```

### Characteristics

- **Fixed / Sticky:** Header stays at top on scroll.
- **Transparent initially:** On hero sections, the nav is transparent with white text/logo, then transitions to solid white/black background as user scrolls past the hero.
- **Logo:** Wordmark "RIVIAN" in white or black depending on context (no icon-only logo in nav).
- **Nav links:** Simple text links, no dropdowns visible at first — some use hover/click flyout mega-menus.
- **CTA bar:** A slim promotional banner sits above the nav (e.g. "Save $1,000 on any new R1…") — full-width, dark background, small text with a link.
- **Mobile:** Hamburger menu icon; logo centred.
- **Height:** ~60–72px desktop.
- **Transitions:** Smooth opacity/background-colour transitions when switching from transparent to solid.

---

## 3. Footer

### Structure

```
[Vehicle Links]    [Shop Links]    [Education Links]    [Company Links]    [Resources]
[Email signup form — "Never miss an adventure"]
[Legal links row]  [Social icons]  [Region selector]
[© Copyright]
```

### Characteristics

- **Background:** Dark (black).
- **Text:** White / light grey, small size.
- **Layout:** Multi-column link lists on desktop, stacked on mobile.
- **Newsletter signup:** Inline form with Email + ZIP Code fields and "Subscribe" button.
- **Social icons:** LinkedIn, Instagram, X (Twitter), YouTube — simple SVG icons.
- **Legal links:** Terms, Privacy, Legal, Recalls, Accessibility.
- **Region/locale selector:** Country flag + dropdown.
- **Chat widget:** Floating chat icon in bottom-right corner (persistent across all pages).

---

## 4. Homepage

**URL:** `https://rivian.com/`

### Section Flow (Top to Bottom)

#### 4.1 Promo Banner
- Slim, full-width, dark background.
- Single line of promotional text with "Learn more" link.

#### 4.2 Hero Section
- **Full-viewport height** image/video of vehicle in nature.
- Vehicle driving on highway with motion blur / scenic backdrop.
- **Headline + CTA overlaid:** Large heading text ("Lease 2026 R1 Dual Standard for as low as $799/mo"), two CTA buttons side-by-side ("View offer" / "Book a drive").
- Multiple hero slides/cards — user can scroll/swipe through offers.
- Each card: Full-bleed image + overlaid headline + dual CTAs.

#### 4.3 Offers Carousel
- Several full-width offer cards stacked vertically (each is roughly viewport height).
- Topics: Lease offer, 0% APR offer, Apple Watch app announcement, additional lease offer.
- Each card has: Full-bleed background image, heading, short body text, two CTA buttons.
- Cards alternate between dark-image-with-white-text and light-image-with-dark-text.

#### 4.4 Vehicle Showcase (R1S / R1T)
- Side-by-side or stacked vehicle cards.
- Each card: Vehicle image with shadow layer underneath (creating a "floating" 3D effect), vehicle name, tagline, pricing, CTA buttons ("Explore" / "Buy").
- Specifications displayed inline: Price, est. monthly, EPA range.
- Background: Light/white.

#### 4.5 "Electric Vehicles Designed for Adventure" Section
- **Tabbed interface** with three tabs: Technology | Performance | Design.
- Each tab reveals different content + imagery.
- Descriptive paragraph + CTA links to relevant detail pages.

#### 4.6 Safety Awards Section
- Parallax background imagery of the vehicle.
- Safety badge image (IIHS Top Safety Pick+).
- Short copy about award-winning safety.

#### 4.7 Rivian Spaces (Retail Locations)
- Horizontal scrolling image gallery of retail space photography.
- Featured location card (e.g. "Seattle, WA") with address, hours, "Explore" + "See all locations" links.
- Interspersed: "Book a drive" prompt card with action-oriented heading ("Get behind the wheel").

#### 4.8 Charging Section
- Parallax foreground/background imagery (charger and vehicle).
- Heading: "Ready for electric exploration."
- Three info cards (each with image + short copy): Charger network, trip planning, home charging.

#### 4.9 Software/OTA Section
- Heading: "Designed to get better with time."
- Background video of infotainment system.
- Short paragraph about software-defined vehicles.

#### 4.10 Keep Exploring (Quick Links)
- Four icon/text links: Shop, Get updates, Trade in, Service.

#### 4.11 Email Sign-Up
- "More fully electric adventure is on the way."
- Email + Zip code fields, Subscribe button.

#### 4.12 Mission Statement
- Full-bleed background image (nature scene).
- Large, aspirational heading: "Keep the world adventurous forever."
- Video play button.

#### 4.13 Footnotes
- Numbered legal disclaimers in small, grey text. Very detailed.

---

## 5. Vehicle Pages (R1S, R1T)

**URLs:** `https://rivian.com/r1s` · `https://rivian.com/r1t`

Both pages follow an identical layout structure; only content/imagery differs.

### Section Flow

#### 5.1 Hero
- **Full-viewport** hero video (auto-play, muted) of the vehicle in motion.
- Floating price bar at top: vehicle name + "Leasing from $799/mo" + "Buy" CTA.
- Below video: Vehicle name, starting price, "Demo Drive" + "Buy" CTAs.
- Intro sentence describing the vehicle.

#### 5.2 Feature Highlights Carousel
- Horizontal drag/swipe carousel of feature cards.
- Each card: Large image + feature title (e.g. "Charging and range", "Spacious front trunk", "Elevated Interior", "Standout safety features", "Advanced driving dynamics").
- Drag indicator visible.

#### 5.3 Key Specs Bar
- Horizontal row of big stats:
  - EPA est. range: **410 mi**
  - 0-60 in under: **2.6 sec**
  - Capacity: **7 seats** (R1S) / Towing: **11,000 lb** (R1T)
  - Drivetrain: **AWD**
- Numbers are large, bold; labels smaller.

#### 5.4 Interior / Utility Section
- Title: "Make the most of every adventure" (R1S) / "Adventurous inside and out" (R1T).
- "View gallery" button.
- Horizontal scrolling feature cards: Seats, Built-in utility, Adventure Gear, Lift gate, Audio, Towing.
- Each card: Image + short title.

#### 5.5 Software & Technology Section
- Title: "Always ready for what's next" (R1S) / "Built for whatever you call a road" (R1T).
- Drive modes explainer callout.
- Horizontal scrolling cards: Always connected, Mobile app, Gear Guard, Utility modes, Autonomy+, Trip planning.
- Interior panoramic image below (pill-shaped, wide).

#### 5.6 360° / Tour Section
- Title: "Take a tour" — "Sink into the comfy seats or gaze through the roof."
- "Go inside" + "Size it up" toggle buttons.
- Vehicle dimension diagram with labeled measurements (height, width, wheelbase, length, approach angle, departure angle).

#### 5.7 Trip Planner Widget
- Interactive: "See what it's like to go electric."
- Input fields: "Leaving from" + "Going to" — with "Let's go" button.

#### 5.8 Trim Comparison Cards
- Title: "Find the [vehicle] that's right for you."
- "Schedule a demo drive" + "Compare options" links.
- Each trim level presented as a horizontal card:
  - **Trim name** (Dual Standard, Dual, Tri, Quad)
  - **Starting price + est. monthly**
  - Vehicle image (front 3/4 angle, clean background)
  - "Build" + "Shop inventory" CTAs
  - **Collapsible spec sections:**
    - Range (battery options, EPA miles)
    - Performance (drivetrain, 0-60, horsepower)
    - Paint (colour swatch circles)
    - Wheels (swatch circles)
    - Interior (swatch circles with material names)
    - Drive modes (icon circles)
  - Tagline (e.g. "Anything but standard.", "Elevated design for all your adventures.")

#### 5.9 FAQ Accordion
- Title: "Frequently asked questions."
- Expandable accordion items (click to reveal answer).
- Topics: Charging cost, leasing, delivery, dimensions, towing capacity, etc.

#### 5.10 Newsletter Sign-Up
- "Never miss an adventure — get updates, offers and invites."
- Email + ZIP Code fields, Subscribe button.

#### 5.11 Footnotes & Legal
- Numbered superscript references throughout the page, detailed disclaimers at bottom.

---

## 6. R2 Pre-Launch Page

**URL:** `https://rivian.com/r2`

### Aesthetic Differences from R1 Pages

- **Lighter, airier feel** — more white/cream backgrounds.
- **Distinct hero treatment:** "Coming Spring 2026" badge, "Reserve" CTA button prominent.
- Logo appears in **black** (vs. white on R1 pages), indicating a lighter overall palette on this page.

### Section Flow

#### 6.1 Hero
- Vehicle images/renders (multiple angles shown via swipeable gallery).
- "Coming Spring 2026" label + "Pricing, options and more announced March 12."
- "Reserve" CTA.
- Play button for reveal/promo video.
- Drag-through vehicle angle carousel.

#### 6.2 Quick Specs
- "Launching with Dual-Motor" callout.
- Est. range: **300+ mi**, 0-60 mph: **3.6 sec**.
- "Size it up" expandable section.

#### 6.3 Feature Highlight Cards
- Each feature: Full-width image + heading + body paragraph.
- Topics: NACS charge port ("Better charging"), Powered rear glass ("Get some air"), Technology platform ("All connected"), Front trunk ("More room for gear").

#### 6.4 "Designed for the Adventurous" Section
- Large typographic headline split across the viewport: "Designed for the adventurous."
- Horizontally scrolling detail cards:
  - Interior ("A whole world inside")
  - Storage ("A place for everything")
  - Materials ("Designed to endure" — birch wood, bio-based upholstery)
  - Steering wheel ("Controls close at hand")
  - Rivian Torch ("Light when you need it")
- "View R2 gallery" link.

#### 6.5 Reserve CTA Block
- "Pricing, options and more announced March 12."
- "Reserve" button.

#### 6.6 Cross-Sell — Available Now
- R1S and R1T mini-cards: image, name, tagline, lease price, "Book a drive" + "Learn more" links.

---

## 7. Technology Page

**URL:** `https://rivian.com/technology`

### Section Flow

#### 7.1 Hero
- Full-width landscape image (two R1S vehicles on mountain road).
- Title: "Technology designed for the road ahead."
- Subhead: "We design all our technology experiences — from hidden but powerful connected hardware to features you'll use every day."

#### 7.2 OTA / Software Updates Section
- Title: "An experience that keeps on evolving."
- Carousel of feature cards (image + heading + body): New features, Service diagnostics, Software updates, Daily-life features.
- "Explore the latest" link.

#### 7.3 Connected Vehicle Features
- Title: "Ready for many roads and trips."
- **Tab interface** with four tabs: Navigation | Entertainment | Gear Guard | Drive modes.
- Each tab shows a large infotainment screen screenshot + descriptive copy.

#### 7.4 Safety Section
- Title: "Designed with safety in mind."
- Description of sensor/camera system.
- Embedded video player with custom controls.

#### 7.5 Autonomy Section
- Title: "Adventurous meets intelligence."
- Stats: "360° perception", "200 trillion operations per second."
- Multiple embedded video players.
- Carousel of autonomy features (e.g. "Go hands-free on the highway").

#### 7.6 Driving Assistant
- Title: "Your driving assistant."
- Sensor/camera visual overview with video.

#### 7.7 Mobile App Section
- Title: "Dozens of features in your pocket."
- Phone mockups showing the Rivian app.
- Sub-sections with individual phone screens:
  - Easy access (lock/unlock),
  - EV trip planning,
  - Gear Guard,
  - Easy charging.
- Each sub-section: Phone image + heading + body copy, alternating left/right alignment.

#### 7.8 More App Features Grid
- Four feature cards in a grid: Remote controls, Climate controls, Service & support, Rivian widgets.
- Each: Icon/image + title + short description.

#### 7.9 Charging & Trip Planning
- Background image with overlay text.
- "See how it works" CTA.

#### 7.10 FAQ Accordion
- Same accordion component as vehicle pages.

#### 7.11 "Keep Exploring" — Quick Links
- CTA cards: Book a drive, Shop, Get updates, Trade-in, Service.

---

## 8. Our Company Page

**URL:** `https://rivian.com/our-company`

### Aesthetic

- More **editorial** / **long-form** feel than product pages.
- Heavy use of full-width photography and pull-out blockquotes.
- Dark hero, alternating light/dark content sections.

### Section Flow

#### 8.1 Hero
- Full-width background video.
- Title: "Forever Starts Now."

#### 8.2 Mission Statement
- Long-form, two-paragraph introductory text about the planet's carbon crisis and Rivian's mission.
- Philosophical tone, aspirational language.

#### 8.3 "Coming Together" Section
- Subtitle about collaborative culture, Climate Pledge (net-zero by 2040), transparent impact reporting.
- Full-width image break.

#### 8.4 "How We Design" Section
- Focus on lifecycle design: recyclable battery packs, animal-free interiors, ocean-bound plastic dunnage.
- Supporting image.

#### 8.5 "How We Operate" Section
- Network of offices, labs, experience centres, service centres, charging stations, manufacturing sites.
- Pull-out blockquote from RJ Scaringe (Founder & CEO) — large, styled differently:
  - Larger italic/serif-like text
  - Name and title below the quote

#### 8.6 Diversity & Inclusion Sections
- "A diverse workforce" — values, Compass Values (Come Together, Ask Why, Stay Open, Zoom Out, Over Deliver).
- "Embracing active allyship" — BRGs (Belonging Resource Groups).
- "Purpose-driven partnerships" — external org partnerships.
- Each section accompanied by full-width or large photography.

#### 8.7 "Supporting Our Team" Section
- Employee benefits callout.
- "Learn More" expandable block.

#### 8.8 Leadership Grid
- Title: "We surround problems with different perspectives."
- Grid of leadership headshots/cards:
  - Headshot image
  - Name (bold)
  - Title (smaller)
- ~13 leaders shown.

#### 8.9 Locations Section
- List of office locations: Irvine CA, Los Angeles CA, Palo Alto CA, Normal IL, Plymouth MI, Wittmann AZ, Vancouver BC.
- Short description of main facility focus.

#### 8.10 Careers CTA
- "The greatest impact comes when working as one team."
- "Careers" button.

---

## 9. Common UI Components

### Buttons

| Type | Style | Usage |
|------|-------|-------|
| Primary CTA | Solid fill (green or dark), rounded corners (~24px radius / pill), white text | "Buy", "Build", "Reserve" |
| Secondary CTA | Outlined / ghost (white or dark border), rounded, transparent fill | "Explore", "Learn more", "Demo Drive" |
| Text Link | Underlined or arrow-appended text, no button shape | Inline content links |
| Small CTA | Smaller sizing of primary/secondary, same radius | Card-level actions |

### Cards

- **Hero/Offer Cards:** Full-bleed image background, overlaid text + CTAs, typically viewport height.
- **Feature Cards:** Rounded rectangle, image on top, title below, horizontal scroll context.
- **Product Cards (Trim):** Landscape, left-aligned text + right-aligned vehicle image, expandable specs.
- **Stat Cards:** Large number + label, sometimes with icon, arranged in a horizontal row.
- **Info Cards:** Small image + heading + body paragraph, used in grids of 2–4.

### Carousels / Sliders

- Horizontal drag-to-scroll (no traditional dot indicators or arrow buttons in most cases).
- "Drag" label indicator sometimes shown.
- Cards snap into position.
- Used extensively: feature highlights, vehicle angles, interior details, app features.

### Accordions

- Used for FAQ sections.
- Chevron/plus icon on right side.
- Smooth expand/collapse animation.
- Clean borders between items.

### Tabs

- Horizontal tab bar with underline indicator.
- Smooth content transition between tabs.
- Used in: Homepage (Technology/Performance/Design), Technology page (Navigation/Entertainment/Gear Guard/Drive modes).

### Modals / Overlays

- Cookie consent modal on first visit (overlay with Accept All / Reject All / Manage Preferences).
- Gallery modals for interior tours.

### Forms

- **Newsletter signup:** Inline, two fields (Email + ZIP Code) + Subscribe button appearing in both footer and dedicated section.
- Input style: Clean underline or bordered inputs, minimal.

### Parallax Imagery

- Used in at least three homepage sections (Safety, Charging, Mission).
- Foreground + background layers that shift on scroll.
- Creates depth and visual interest without being distracting.

### Colour Swatches

- Small circles (~40–60px) used on vehicle trim cards to show paint, wheel, and interior options.
- Each swatch: Circle thumbnail image with material/colour label on hover or below.

### Sticky / Floating Elements

- **Nav:** Sticks to top.
- **Price bar:** On vehicle pages, a sticky bar at top shows model name + monthly price + "Buy" CTA while scrolling.
- **Chat widget:** Persistent bottom-right floating icon.

---

## 10. Responsive & Performance Notes

### Image Delivery

- Uses **Cloudinary** CDN (`media.rivian.com/image/upload/…`) with on-the-fly transformations:
  - `c_limit,w_1024` — responsive width limits.
  - `f_auto` — automatic format (WebP where supported).
  - `q_auto` — automatic quality optimisation.
  - `fl_progressive` — progressive loading.
- Multiple image sizes served based on viewport (art direction likely via `<picture>` / `srcset`).

### Video

- Auto-playing, muted, looping background videos for heroes.
- Custom video players with branded controls for feature sections.
- Poster images (`so_0` — first frame) as fallback.

### Responsive Strategy

- Fully responsive with distinct mobile/tablet/desktop layouts.
- Mobile: Single column, stacked sections, hamburger nav.
- Tablet: Two columns in some areas, adjusted image crops (`tablet` variants in image URLs).
- Desktop: Full multi-column layouts, side-by-side CTAs, expanded nav.

### Internationalisation

- Locale prefixed URLs: `/en-US/`, `/en-CA/`, `/fr-CA/`, `/en-GB/`, `/de-DE/`, `/fr-FR/`, etc.
- Region selector in footer.
- ~20+ locale variants per page.

### Accessibility

- Skip-to-main-content link.
- Alt text on images.
- ARIA labels on interactive elements.
- Dedicated `/accessibility` page.

### Performance Patterns

- Lazy-loaded images (placeholder GIFs visible in source: `data:image/gif;base64,...`).
- Progressive image loading.
- Client-side rendered (React/Next.js-based — error message references "client-side exception").
- Optimised CDN delivery with modern formats.

---

## Summary — Key Design Principles to Note

1. **Photography dominates** — the design is a frame for stunning outdoor/adventure imagery and vehicle shots.
2. **Full-viewport heroes** — nearly every page opens with a full-screen image or video.
3. **Alternating light/dark sections** — creates visual rhythm and prevents monotony.
4. **Horizontal carousels** over vertical scrolling for feature details — keeps pages scannable.
5. **Large typography for stats** — range, speed, horsepower displayed as oversized numbers.
6. **Generous whitespace** — premium, uncluttered feel throughout.
7. **Parallax depth** — layered imagery adds subtle dimension.
8. **Sticky navigation + price bars** — key actions always accessible.
9. **Consistent CTA hierarchy** — primary (solid/filled) vs. secondary (outlined/ghost) buttons.
10. **Unified footer & sign-up pattern** — identical "Never miss an adventure" form across all pages.
11. **Mobile-first polish** — drag carousels, hamburger nav, responsive images all tuned.
12. **Legal transparency** — detailed footnotes with superscript references woven throughout.
