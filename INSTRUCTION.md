# INSTRUCTION.md — One X Transmission Website Build

> **Created:** 2026-02-26
> **Status:** Pre-build planning

---

## Overview

Build a complete, production-ready, asset/visual-heavy, edgy, premium professional business profile website for **One X Transmission** (car gearbox / transmission workshop) using **React.js with Next.js (App Router) + TypeScript**.

---

## 1. How to Interpret the 4 Markdown Files

### BRAND.md — Strict Compliance

- Mandatory. Follow accurately for: typography, colour system, spacing/grid, logo usage, tone of voice, imagery rules, do/don't.
- Only subtle additions allowed (e.g., extra spacing steps, additional neutral shades, motion tokens) if they do not conflict and remain consistent.
- If something is unspecified, make the most conservative, brand-consistent choice.

### DESIGN.md & MOTION.md — Standards, Not Literal Instructions

- Treat as standards and references. Do not copy blindly.
- Interpret and adapt to: automotive/gearbox workshop context, One X Transmission's brand tone, usability, accessibility, and performance.
- If a referenced effect/layout is not appropriate for this business, replace it with something that achieves the same intent (premium, edgy, visual-forward) without harming clarity.

### CONTENT.md — Context, Not Exact Copy

- Context and raw material, not something to follow word-for-word.
- May rewrite, reorder, compress, expand, and reframe content to produce a premium, persuasive narrative.
- **Do not** create risky or unverifiable claims (e.g., "best in Malaysia", certifications, guaranteed results, brand partnerships, exact pricing, years in operation, customer counts) unless clearly supported by CONTENT.md.
- Contact/location/hours must be treated as factual if present. If missing, use `TODO_FROM_MD` placeholders.

---

## 2. Non-Negotiable Hard Constraints

- **No emojis.**
- **No icons at all** — no icon libraries, no pictograms, no arrow icons in CTAs, no decorative icon-like SVGs.
- **Mobile-first responsive** with excellent tablet/desktop.
- **Ultra smooth UI/UX** — refined hierarchy, spacing, typography, and interaction.
- **Not a generic brochure template** — avoid the predictable "Our Services / About / Contact" stacking. Build an editorial, premium business profile narrative.
- Must respect **accessibility** and **`prefers-reduced-motion: reduce`**.

---

## 3. Required Art Direction (Asset-Heavy + Edgy + Premium)

Create a cinematic, visual-forward site where imagery/video + typography carry the experience:

- Full-bleed hero (image/video), strong typographic composition, controlled overlays for readability.
- Alternating editorial spreads: full-bleed media blocks + tight typographic blocks.
- Edgy modern automotive vibe: engineered precision, confident grid, controlled asymmetry (only if brand-appropriate).
- No gimmicks; keep it professional and credible.
- If real assets are limited, implement an elegant placeholder system that allows easy replacement later (without breaking layout).

---

## 4. Motion System (Advanced but Tasteful)

Adapted from MOTION.md:

- Implement motion aligned to the **intent** (premium, smooth, confident), not necessarily the exact same effects.
- Use GPU-friendly transforms/opacity; avoid layout thrash.
- Lazy-load below-the-fold animation triggers and media.
- Provide global reduced-motion behaviour and disable/simplify effects accordingly.
- Use minimal dependencies; only use Framer Motion if necessary and justified.

---

## 5. Tech Stack (Required)

| Layer | Choice |
|-------|--------|
| Framework | Next.js App Router + TypeScript |
| Styling | Tailwind CSS or CSS Modules (choose based on BRAND.md) |
| Images | `next/image` with correct sizes, modern formats |
| SEO | Next.js Metadata API, `app/sitemap.ts`, `app/robots.ts`, JSON-LD |
| Content | MD/MDX in `content/` with a clean mapping layer |

---

## 6. Codebase Structure — Page-Segmentised

Even if the design feels cinematic, implement clean page segmentation for easy editing later.

### Required Routes / Pages

```
app/(site)/page.tsx                    → Home
app/(site)/about/page.tsx              → About
app/(site)/capabilities/page.tsx       → Capability clusters (avoid "services" unless brand says so)
app/(site)/process/page.tsx            → Process (only if applicable)
app/(site)/faq/page.tsx                → FAQ
app/(site)/contact/page.tsx            → Contact
```

### Required File Structure

```
components/
  sections/<PageName>/<SectionName>.tsx
  layout/           → Header, Footer, Nav, PageShell
  media/            → ResponsiveImage, BackgroundVideo, MediaGrid, Caption
  typography/       → Aligned to brand tokens

content/
  index.ts          → Single mapping layer consumed by pages
```

### Content Rule

- Avoid hardcoding copy in components.
- Copy should come from MD/MDX and be easy to edit.

---

## 7. SEO Requirements (Ultra Optimised — EN + MS + ZH)

**Goal:** Appear for gearbox/transmission workshop searches in English, Malay, and Chinese.

### Must Implement

- Semantic headings (one H1 per page)
- Per-page metadata (title / description / canonical / OG / Twitter)
- JSON-LD structured data (`LocalBusiness` or `AutomotiveBusiness`) using only factual fields available
- Sitemap + robots
- Image SEO (alt text, optimisation, lazy loading)
- Internal linking and clean URLs

### Multilingual Strategy

Implement separate localised routes + hreflang support:

```
/en     → English
/ms     → Malay (Bahasa Malaysia)
/zh     → Chinese
```

**Rules:**
- May localise SEO targeting responsibly, but do not invent business facts.
- If translations are not provided, scaffold routes and show `TODO_TRANSLATION_NEEDED` placeholders while keeping the system ready.

---

## 8. Conversion Goal & Tone

Make visitors interested, confident, and ready to contact/visit One X Transmission:

- Text-only CTAs (no icons)
- Frictionless contact options (as provided in content)
- Premium, engineered, calm confidence tone

---

## 9. Required Deliverables

| # | Deliverable |
|---|-------------|
| 1 | Complete Next.js codebase (file tree + all files) |
| 2 | Mapping: MD sections → pages/sections |
| 3 | Asset placeholder plan + manifest listing all media slots and recommended dimensions |
| 4 | Setup instructions (install / dev / build / deploy) |
| 5 | SEO checklist and confirmation (metadata, JSON-LD, sitemap/robots, hreflang) |
| 6 | Performance checklist for asset-heavy visuals and motion |

---

## 10. Clarifying Questions Policy

- Ask only if BRAND.md is missing critical tokens (fonts/colours/spacing rules) or if contact/location data is absent and cannot be left as placeholders.
- Otherwise proceed and build.

---

## Build Order

| Phase | Task | Details | Status |
|-------|------|---------|--------|
| **1** | Read remaining reference files | Review CONTENT.md + MOTION.md to understand full business context and motion standards | Not started |
| **2** | Scaffold project | `create-next-app` with App Router + TypeScript, install Tailwind, configure brand tokens (colours, fonts, spacing), establish folder structure per Section 6 | Not started |
| **3** | Layout shell | Build Header, Footer, Nav, PageShell components; implement typography system aligned to Satoshi font + brand tokens | Not started |
| **4** | Content mapping layer | Structure `content/` directory, create MD/MDX files from CONTENT.md, build `content/index.ts` as single mapping layer consumed by pages | Not started |
| **5** | Home page | Hero (full-bleed image/video) + editorial sections — the cinematic centrepiece of the site | Not started |
| **6** | Inner pages | About, Capabilities, Process (if applicable), FAQ, Contact — each with editorial layout, not generic brochure stacking | Not started |
| **7** | Motion system | Scroll-triggered animations, GPU-friendly transforms/opacity, lazy-load triggers, global `prefers-reduced-motion` support; use Framer Motion only if justified | Not started |
| **8** | SEO + i18n | Per-page metadata, JSON-LD (`LocalBusiness`/`AutomotiveBusiness`), `sitemap.ts`, `robots.ts`, hreflang, scaffold `/en` `/ms` `/zh` routes with `TODO_TRANSLATION_NEEDED` placeholders | Not started |
| **9** | Polish + deliverables | Asset placeholder manifest (all media slots + recommended dimensions), performance checklist, setup instructions (install/dev/build/deploy), SEO confirmation checklist | Not started |

---

## Reference Files

| File | Role | Compliance Level |
|------|------|-----------------|
| [BRAND.md](BRAND.md) | Brand guideline | **Strict** |
| [CONTENT.md](CONTENT.md) | Business context | Rewritable context |
| [DESIGN.md](DESIGN.md) | Design standard | Adaptive reference |
| [MOTION.md](MOTION.md) | Motion standard | Adaptive reference |
