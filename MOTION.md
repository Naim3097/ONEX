# Animation & Motion Bible

> Every animation/motion pattern extracted from Zoox's production source bundles and implemented in our mockup. Copy-paste ready for any website.

---

## Table of Contents

1. [Dependencies & Setup](#1-dependencies--setup)
2. [Custom Easings (Motion Bible)](#2-custom-easings-motion-bible)
3. [Lenis Smooth Scroll](#3-lenis-smooth-scroll)
4. [Page Loader with Clip-Path Exit](#4-page-loader-with-clip-path-exit)
5. [Custom Cursor with Lerp](#5-custom-cursor-with-lerp)
6. [Navigation — Hide/Show on Scroll](#6-navigation--hideshow-on-scroll)
7. [Mobile Nav — Clip-Path Circle Expansion](#7-mobile-nav--clip-path-circle-expansion)
8. [SplitText 3D Word Reveal](#8-splittext-3d-word-reveal)
9. [Hero Parallax (Video/Image + Content)](#9-hero-parallax-videoimageontent)
10. [Marquee with Velocity Skew](#10-marquee-with-velocity-skew)
11. [Pinned Clip-Path Scroll Reveal (Bespoke Section)](#11-pinned-clip-path-scroll-reveal-bespoke-section)
12. [Staggered Card Entrance](#12-staggered-card-entrance)
13. [Full-Width Parallax Image Section](#13-full-width-parallax-image-section)
14. [Velocity-Based Card Skew](#14-velocity-based-card-skew)
15. [3D Tilt on Hover](#15-3d-tilt-on-hover)
16. [Horizontal Scroll Section](#16-horizontal-scroll-section)
17. [SVG Path Draw on Scroll](#17-svg-path-draw-on-scroll)
18. [Scroll-Scrubbed Video](#18-scroll-scrubbed-video)
19. [Animated Number Counters](#19-animated-number-counters)
20. [Footer Column Stagger](#20-footer-column-stagger)
21. [CTA Clip-Path Button Wrapper](#21-cta-clip-path-button-wrapper)
22. [Nav Link Underline Slide](#22-nav-link-underline-slide)
23. [Scroll Indicator Pulse](#23-scroll-indicator-pulse)
24. [Lenis Anchor Scroll](#24-lenis-anchor-scroll)

---

## 1. Dependencies & Setup

### CDN Links

```html
<!-- GSAP Core + Plugins -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/Flip.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/Observer.min.js"></script>

<!-- Club GSAP (premium — needs license for production) -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/CustomEase.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/SplitText.min.js"></script>

<!-- Lenis Smooth Scroll -->
<script src="https://unpkg.com/lenis@1.1.18/dist/lenis.min.js"></script>
```

### Plugin Registration

```js
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Flip, Observer);
gsap.defaults({ ease: 'none', duration: 0.5 });
```

---

## 2. Custom Easings (Motion Bible)

Zoox defines 3 core easings they call their "Motion Bible". These are registered via `CustomEase.create()` at app init.

### With CustomEase (Club GSAP)

```js
CustomEase.create('customEaseOut',   '0.00, 0.40, 0.00, 1.00');
CustomEase.create('customEaseIn',    '1.00, 0.00, 1.00, 0.60');
CustomEase.create('customEaseInOut', '0.20, 0.00, 0.00, 1.00');
```

### CSS Equivalents (for transitions)

```css
:root {
  --ease-out:    cubic-bezier(0, 0.4, 0, 1);
  --ease-in:     cubic-bezier(1, 0, 1, 0.6);
  --ease-in-out: cubic-bezier(0.2, 0, 0, 1);
}
```

### Fallbacks (no Club GSAP)

```js
const EASE_OUT    = 'power3.out';
const EASE_IN     = 'power3.in';
const EASE_IN_OUT = 'power3.inOut';
```

### When to Use Which

| Easing | Use For |
|--------|---------|
| `customEaseOut` | Text reveals, card entrances, element fade-ins — fast start, gentle land |
| `customEaseIn` | Exit animations, clip-path contracting — slow start, fast exit |
| `customEaseInOut` | Loader transitions, full-page reveals — smooth start and end |

---

## 3. Lenis Smooth Scroll

Provides buttery 60fps smooth scrolling. Synced to GSAP's ticker so ScrollTrigger stays in sync.

### JS

```js
const lenis = new Lenis();
window.lenis = lenis; // expose globally

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
```

### Important Notes
- Must call `lenis.stop()` when opening modals/mobile nav
- Must call `lenis.start()` when closing them
- `lagSmoothing(0)` prevents GSAP from throttling during heavy scroll

---

## 4. Page Loader with Clip-Path Exit

A counter + progress bar that fills up, then the entire loader slides away via clip-path.

### HTML

```html
<div class="loader" id="loader">
  <div class="loader-inner">
    <div class="loader-logo"><!-- SVG icon here --></div>
    <div class="loader-counter">
      <span class="loader-num" id="loaderNum">0</span>
    </div>
    <div class="loader-bar-track">
      <div class="loader-bar" id="loaderBar"></div>
    </div>
  </div>
</div>
```

### CSS

```css
.loader {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: #080808;
  display: flex;
  align-items: center;
  justify-content: center;
  clip-path: inset(0 0 0 0);  /* KEY — starts fully visible */
}
.loader-bar-track {
  width: 180px;
  height: 2px;
  background: rgba(255,255,255,.06);
  overflow: hidden;
}
.loader-bar {
  height: 100%;
  width: 0;
  background: var(--accent);
  transition: width .08s;
}
```

### JS — Counter + Clip-Path Exit

```js
let prog = 0;
const loaderTick = setInterval(() => {
  prog += Math.random() * 18 + 2;
  if (prog > 100) prog = 100;
  loaderNum.textContent = Math.round(prog);
  loaderBar.style.width = prog + '%';

  if (prog >= 100) {
    clearInterval(loaderTick);
    setTimeout(() => {
      gsap.to(loader, {
        clipPath: 'inset(0 0 100% 0)',   // slides upward
        duration: 0.9,
        ease: 'customEaseInOut',
        onComplete: () => { loader.remove(); boot(); }
      });
    }, 400);
  }
}, 60);
```

### Exit Direction Variants

```js
// Slide up
clipPath: 'inset(0 0 100% 0)'

// Slide down
clipPath: 'inset(100% 0 0 0)'

// Slide left
clipPath: 'inset(0 100% 0 0)'

// Slide right
clipPath: 'inset(0 0 0 100%)'

// Center pinch (horizontal)
clipPath: 'inset(0 50% 0 50%)'
```

---

## 5. Custom Cursor with Lerp

Smooth-following cursor using GSAP ticker for frame-perfect interpolation.

### HTML

```html
<div class="cursor" id="cursor">
  <div class="cursor-dot"></div>
  <div class="cursor-ring"></div>
</div>
```

### CSS

```css
@media (hover: hover) {
  body, a, button { cursor: none; }

  .cursor {
    position: fixed;
    top: 0; left: 0;
    z-index: 9999;
    pointer-events: none;
    mix-blend-mode: difference;
  }
  .cursor-dot {
    width: 6px; height: 6px;
    background: var(--accent);
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
  .cursor-ring {
    position: absolute;
    top: -17px; left: -17px;
    width: 40px; height: 40px;
    border: 1.5px solid rgba(230, 57, 70, .5);
    border-radius: 50%;
    transition: width .35s var(--ease-out), height .35s var(--ease-out),
                top .35s var(--ease-out), left .35s var(--ease-out);
  }
  .cursor.hover .cursor-ring {
    width: 64px; height: 64px;
    top: -29px; left: -29px;
    border-color: var(--accent);
  }
}
```

### JS

```js
function initCursor() {
  if (!matchMedia('(hover:hover)').matches) return;
  const cur = document.getElementById('cursor');
  let mx = 0, my = 0, cx = 0, cy = 0;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  // Lerp factor: 0.12 = smooth trail, 0.3 = snappy, 1 = instant
  gsap.ticker.add(() => {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    cur.style.transform = `translate(${cx}px, ${cy}px)`;
  });

  // Hover expansion on interactive elements
  document.querySelectorAll('a, button, .card').forEach(el => {
    el.addEventListener('mouseenter', () => cur.classList.add('hover'));
    el.addEventListener('mouseleave', () => cur.classList.remove('hover'));
  });
}
```

---

## 6. Navigation — Hide/Show on Scroll

Nav bar that: adds blur background after 60px scroll, hides on scroll down past 400px, shows on scroll up.

### CSS

```css
.nav {
  position: fixed;
  top: 0; left: 0; width: 100%;
  z-index: 1000;
  transition: background .4s, backdrop-filter .4s, transform .4s var(--ease-out);
}
.nav.scrolled {
  background: rgba(10, 10, 10, .85);
  backdrop-filter: blur(20px);
}
.nav.hidden {
  transform: translateY(-100%);
}
```

### JS

```js
let lastY = 0;
ScrollTrigger.create({
  onUpdate: () => {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 60);
    if (y > 400 && y > lastY) nav.classList.add('hidden');
    else nav.classList.remove('hidden');
    lastY = y;
  }
});
```

---

## 7. Mobile Nav — Clip-Path Circle Expansion

Full-screen mobile menu that expands from the hamburger button position using a clip-path circle.

### CSS

```css
.mobile-nav {
  position: fixed;
  inset: 0;
  z-index: 999;
  background: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
  clip-path: circle(0% at calc(100% - 44px) 36px);      /* collapsed at hamburger position */
  transition: clip-path .7s var(--ease-out);
}
.mobile-nav.open {
  clip-path: circle(150% at calc(100% - 44px) 36px);     /* fully expanded */
}
```

### Link Stagger (CSS-only)

```css
.mobile-nav-links a {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity .5s, transform .5s var(--ease-out);
}
.mobile-nav.open .mobile-nav-links a {
  opacity: 1;
  transform: translateY(0);
}
/* Stagger each link with increasing delay */
.mobile-nav-links a:nth-child(1) { transition-delay: .15s; }
.mobile-nav-links a:nth-child(2) { transition-delay: .20s; }
.mobile-nav-links a:nth-child(3) { transition-delay: .25s; }
.mobile-nav-links a:nth-child(4) { transition-delay: .30s; }
.mobile-nav-links a:nth-child(5) { transition-delay: .35s; }
.mobile-nav-links a:nth-child(6) { transition-delay: .40s; }
```

### JS — Toggle

```js
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');

  if (mobileNav.classList.contains('open')) {
    document.body.style.overflow = 'hidden';
    lenis.stop();
  } else {
    document.body.style.overflow = '';
    lenis.start();
  }
});
```

---

## 8. SplitText 3D Word Reveal

The signature Zoox text animation. Each word rotates into view from below with 3D perspective.

### Parameters (exact Zoox values)

| Property | Value | Purpose |
|----------|-------|---------|
| `type` | `"words"` | Split into words (not chars or lines) |
| `perspective` | `1000` | 3D depth for rotationX |
| `transformOrigin` | `"bottom"` | Words rotate from their bottom edge |
| `y` | `50` | Start 50px below final position |
| `rotationX` | `80` | 80° rotation on X axis |
| `opacity` | `0` | Start invisible |
| `duration` | `0.334` (standard) / `0.667` (hero) | Animation length |
| `stagger` | `0.067` | Delay between each word |
| `ease` | `customEaseOut` | Fast start, gentle land |

### JS — With SplitText (Club GSAP)

```js
const split = new SplitText(element, { type: 'words', wordsClass: 'word' });
gsap.set(split.words, { perspective: 1000, transformOrigin: 'bottom' });
gsap.from(split.words, {
  y: 50,
  rotationX: 80,
  opacity: 0,
  duration: 0.334,
  stagger: 0.067,
  ease: 'customEaseOut',
  scrollTrigger: { trigger: element, start: 'top 70%' }
});
```

### JS — Manual Fallback (no Club GSAP)

```js
function splitIntoWords(el) {
  const text = el.textContent;
  el.innerHTML = '';
  text.split(/\s+/).forEach((w, i, arr) => {
    if (!w) return;
    const span = document.createElement('span');
    span.className = 'word';
    span.textContent = w;
    el.appendChild(span);
    if (i < arr.length - 1) el.appendChild(document.createTextNode(' '));
  });
  return { words: el.querySelectorAll('.word') };
}
```

### CSS — Word Styling

```css
.word {
  display: inline-block;
  will-change: transform, opacity;
}
```

### Variations

```js
// Smaller movement for card headings
{ y: 30, rotationX: 60, stagger: 0.05, duration: 0.334 }

// Larger hero impact
{ y: 50, rotationX: 80, stagger: 0.067, duration: 0.667 }
```

---

## 9. Hero Parallax (Video/Image + Content)

Background video/image scales and shifts down on scroll. Content fades up and out faster.

### CSS

```css
.hero {
  position: relative;
  height: 100vh;
  overflow: hidden;
}
.hero-video-wrap {
  position: absolute;
  inset: 0;
}
.hero-video {
  transform: scale(1.15);  /* pre-scale for parallax room */
}
.hero-grad {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(to bottom,
    rgba(10,10,10,.3),
    rgba(10,10,10,.55) 50%,
    rgba(10,10,10,.97));
}
```

### JS

```js
// Background — moves down + scales up on scroll
gsap.to('.hero-video', {
  yPercent: 25,
  scale: 1.3,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
});

// Content — fades out + moves up faster
gsap.to('.hero-content', {
  yPercent: -30,
  opacity: 0,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: '60% top',
    scrub: true
  }
});
```

---

## 10. Marquee with Velocity Skew

Infinite horizontal scrolling text that skews based on scroll velocity.

### CSS — Infinite Scroll

```css
.marquee-strip {
  overflow: hidden;
  border-top: 1px solid rgba(255,255,255,.04);
  border-bottom: 1px solid rgba(255,255,255,.04);
}
.marquee-track {
  display: flex;
  white-space: nowrap;
  animation: marqueeScroll 30s linear infinite;
  will-change: transform;
}
@keyframes marqueeScroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

### HTML — Duplicate content for seamless loop

```html
<div class="marquee-track" id="marqueeTrack">
  <span>WORD ONE</span><i>◆</i>
  <span>WORD TWO</span><i>◆</i>
  <!-- ... repeat same set twice for seamless loop -->
</div>
```

### JS — Velocity Skew

```js
let skew = 0;
ScrollTrigger.create({
  onUpdate: self => {
    const velocity = self.getVelocity();
    const target = gsap.utils.clamp(-5, 5, velocity / 300);
    skew += (target - skew) * 0.1;  // smoothing
    gsap.set('#marqueeTrack', { skewX: skew });
  }
});
```

---

## 11. Pinned Clip-Path Scroll Reveal (Bespoke Section)

**The most complex animation.** A pinned section where an image reveals through animated CSS custom property clip-path while text slides horizontally.

### Key Concept
GSAP animates CSS custom properties (`--clip-top`, `--clip-right`, etc.), NOT the `clip-path` property directly. This gives per-edge control.

### HTML Structure

```html
<section class="bespoke-section">
  <div class="bespoke-root">
    <div class="bespoke-main">
      <!-- Text panels (slide horizontally) -->
      <div class="bespoke-horizontal-text">
        <div class="bespoke-text-panel"><!-- Panel 1 content --></div>
        <div class="bespoke-text-panel"><!-- Panel 2 content --></div>
      </div>

      <!-- Image with clip-path CSS vars -->
      <div class="bespoke-image-wrap">
        <div class="bespoke-clip-container" id="bespokeClip"
             style="--clip-top:2rem; --clip-right:2rem; --clip-bottom:2rem; --clip-left:55%; --clip-border-radius:3.6rem">
          <div class="bespoke-transform-container">
            <img src="..." class="bespoke-image">
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

### CSS — Clip-Path Pattern

```css
.bespoke-clip-container {
  --clip-border-radius: 3.6rem;
  clip-path: inset(
    var(--clip-top)
    var(--clip-right)
    var(--clip-bottom)
    var(--clip-left)
    round var(--clip-border-radius)
  );
  will-change: clip-path;
}

/* Text sits above image */
.bespoke-horizontal-text { z-index: 2; }
.bespoke-image-wrap { z-index: 1; }
```

### JS — Two Timelines

```js
// Initial state: image clipped to right side only
gsap.set(clip, {
  '--clip-top': '2rem',
  '--clip-right': '2rem',
  '--clip-bottom': '2rem',
  '--clip-left': '55%',        // image only visible on right 45%
  '--clip-border-radius': '3.6rem'
});

// TIMELINE 1: Animate-In (as section enters viewport)
gsap.timeline({
  scrollTrigger: {
    trigger: root,
    start: 'top bottom',
    end: 'top top',
    scrub: true,
  }
})
.to(clip, { '--clip-left': 'calc(50% - 20px)', duration: 1 }, 0);

// TIMELINE 2: Scroll-Pinning (pinned, scrubs through)
gsap.timeline({
  defaults: { ease: 'none' },
  scrollTrigger: {
    trigger: root,
    start: 'top top',
    scrub: true,
    pin: true,
    end: '+=200%',
  }
})
.to(horizontalText, { xPercent: -100, duration: 0.3 }, 0)  // text slides left
.to(clip, {
  '--clip-top': '2rem',
  '--clip-right': '2rem',
  '--clip-bottom': '2rem',
  '--clip-left': '2rem',       // image fills entire view
  duration: 0.3
}, '<');
```

### Labeled Timelines (for scroll-to navigation)

```js
timeline
  .addLabel('section-1')
  .addLabel('section-2')
  .addLabel('end');

// Then scroll to a label:
lenis.scrollTo(triggerElement, { offset: labelPosition });
```

---

## 12. Staggered Card Entrance

Cards start invisible and below, then animate in with staggered delay as they enter viewport.

### CSS — Initial State

```css
.card {
  opacity: 0;
  transform: translateY(40px);
}
```

### JS

```js
gsap.utils.toArray('.card').forEach((card, i) => {
  gsap.to(card, {
    opacity: 1,
    y: 0,
    duration: 0.667,
    delay: i * 0.1,
    ease: 'customEaseOut',
    scrollTrigger: {
      trigger: card,
      start: 'top 85%'
    }
  });
});
```

### With SplitText Heading Inside Each Card

```js
gsap.utils.toArray('.card').forEach((card, i) => {
  const h3 = card.querySelector('h3');
  if (h3) {
    splitIntoWords(h3);
    const words = h3.querySelectorAll('.word');
    gsap.set(words, { perspective: 1000, transformOrigin: 'bottom' });
    gsap.from(words, {
      y: 30, rotationX: 60, opacity: 0,
      duration: 0.334, stagger: 0.05,
      ease: 'customEaseOut',
      scrollTrigger: { trigger: card, start: 'top 85%' }
    });
  }

  gsap.to(card, {
    opacity: 1, y: 0,
    duration: 0.667, delay: i * 0.1,
    ease: 'customEaseOut',
    scrollTrigger: { trigger: card, start: 'top 85%' }
  });
});
```

---

## 13. Full-Width Parallax Image Section

A full-viewport image section with parallax and overlaid text.

### HTML

```html
<section class="showcase-section">
  <div class="showcase-img-wrap">
    <img src="..." class="showcase-img">
  </div>
  <div class="showcase-overlay"></div>
  <div class="showcase-content">
    <h2 class="split-words">Your headline here</h2>
    <p>Subtitle text</p>
  </div>
</section>
```

### CSS

```css
.showcase-section {
  position: relative;
  height: 100vh;
  overflow: hidden;
}
.showcase-img-wrap {
  position: absolute;
  inset: -20%;      /* extra room for parallax movement */
  z-index: 0;
}
.showcase-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(to bottom,
    rgba(10,10,10,.3),
    rgba(10,10,10,.7) 60%,
    rgba(10,10,10,.95));
}
.showcase-content {
  position: relative;
  z-index: 2;
}
```

### JS

```js
gsap.to('.showcase-img-wrap', {
  yPercent: 20,
  ease: 'none',
  scrollTrigger: {
    trigger: '.showcase-section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true
  }
});
```

---

## 14. Velocity-Based Card Skew

Cards dynamically skew based on how fast the user is scrolling.

### JS

```js
let skewY = 0;
ScrollTrigger.create({
  onUpdate: self => {
    const velocity = self.getVelocity();
    const target = gsap.utils.clamp(-8, 8, velocity / 400);
    skewY += (target - skewY) * 0.08;  // smoothing factor
    gsap.set('.vel-card', { skewY: skewY * 0.5 });
  }
});
```

### Parameters to Adjust

| Parameter | Effect |
|-----------|--------|
| `clamp(-8, 8, ...)` | Max skew angle in degrees |
| `velocity / 400` | Sensitivity — lower = more responsive |
| `* 0.08` | Smoothing — lower = smoother trail |
| `* 0.5` | Final multiplier — reduce for subtlety |

---

## 15. 3D Tilt on Hover

Cards tilt toward the mouse position in 3D space.

### JS

```js
if (matchMedia('(hover:hover)').matches) {
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;   // -0.5 to 0.5
      const y = (e.clientY - r.top) / r.height - 0.5;

      gsap.to(card, {
        rotateY: x * 15,          // tilt left/right
        rotateX: -y * 15,         // tilt up/down
        transformPerspective: 600,
        duration: 0.4,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        skewY: 0,
        duration: 0.7,
        ease: 'elastic.out(1, .5)'  // bouncy return
      });
    });
  });
}
```

---

## 16. Horizontal Scroll Section

A pinned section where vertical scroll drives horizontal movement.

### HTML

```html
<section class="hs-section">
  <div class="hs-wrap">
    <div class="hs-track">
      <div class="hs-panel"><!-- Panel 1 --></div>
      <div class="hs-panel"><!-- Panel 2 --></div>
      <div class="hs-panel"><!-- Panel 3 --></div>
    </div>
  </div>
</section>
```

### CSS

```css
.hs-section { overflow: hidden; }
.hs-track {
  display: flex;
  flex-wrap: nowrap;
  width: max-content;
}
.hs-panel {
  flex: 0 0 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### JS

```js
const track = document.querySelector('.hs-track');

gsap.to(track, {
  x: () => -(track.scrollWidth - window.innerWidth),
  ease: 'none',
  scrollTrigger: {
    trigger: '.hs-section',
    pin: true,
    scrub: 1,
    end: () => '+=' + (track.scrollWidth - window.innerWidth),
    invalidateOnRefresh: true,
  }
});
```

---

## 17. SVG Path Draw on Scroll

An SVG path that draws itself as the user scrolls.

### HTML

```html
<svg class="hs-svg" viewBox="0 0 500 200">
  <path class="hs-path" d="M10 100 Q 125 10 250 100 T 490 100"
        fill="none" stroke="var(--accent)" stroke-width="2"/>
</svg>
```

### JS

```js
const svgPath = document.querySelector('.hs-path');
const pathLength = svgPath.getTotalLength();

gsap.set(svgPath, {
  strokeDasharray: pathLength,
  strokeDashoffset: pathLength      // fully hidden
});

gsap.to(svgPath, {
  strokeDashoffset: 0,              // fully drawn
  ease: 'none',
  scrollTrigger: {
    trigger: '.hs-section',
    start: 'top top',
    end: () => '+=' + (track.scrollWidth - window.innerWidth),
    scrub: 1,
  }
});
```

---

## 18. Scroll-Scrubbed Video

Video playback position is controlled by scroll position.

### HTML

```html
<section class="vid-section" style="height: 300vh;">
  <div class="vid-sticky" style="position: sticky; top: 0; height: 100vh;">
    <video class="vid-el" muted playsinline preload="auto">
      <source src="video.mp4" type="video/mp4">
    </video>
    <div class="vid-dim"></div>
    <div class="vid-content">
      <h2>Heading</h2>
    </div>
    <!-- Progress ring -->
    <div class="vid-ring">
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,.1)" stroke-width="3"/>
        <circle cx="50" cy="50" r="44" fill="none" stroke="var(--accent)" stroke-width="3"
                stroke-dasharray="276" stroke-dashoffset="276" class="vr-fill"/>
      </svg>
      <span class="vr-pct">0%</span>
    </div>
  </div>
</section>
```

### JS

```js
const video = document.querySelector('.vid-el');

video.addEventListener('loadedmetadata', () => {
  const duration = video.duration;

  ScrollTrigger.create({
    trigger: '.vid-section',
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: self => {
      video.currentTime = self.progress * duration;

      // Update progress ring
      const ring = document.querySelector('.vr-fill');
      const pctEl = document.querySelector('.vr-pct');
      if (ring) ring.style.strokeDashoffset = 276 - (276 * self.progress);
      if (pctEl) pctEl.textContent = Math.round(self.progress * 100) + '%';
    }
  });
});
```

### Important Notes
- Use `preload="auto"` on the video element
- Video must have `muted` and `playsinline` attributes
- Section height (e.g. `300vh`) controls scroll duration
- `position: sticky` keeps video pinned while scrolling

---

## 19. Animated Number Counters

Numbers count up from 0 when they enter the viewport.

### HTML

```html
<div class="stat-num" data-val="60">0</div>
```

### JS

```js
document.querySelectorAll('.stat-num').forEach(num => {
  const targetVal = parseInt(num.dataset.val);

  ScrollTrigger.create({
    trigger: num,
    start: 'top 85%',
    once: true,                  // only fires once
    onEnter: () => {
      gsap.to({ v: 0 }, {
        v: targetVal,
        duration: 2,
        ease: 'power2.out',
        onUpdate: function() {
          num.textContent = Math.round(this.targets()[0].v);
        }
      });
    }
  });
});
```

---

## 20. Footer Column Stagger

Footer columns fade in with staggered delay.

### JS

```js
gsap.utils.toArray('.f-col').forEach((col, i) => {
  gsap.from(col, {
    y: 30,
    opacity: 0,
    duration: 0.667,
    delay: i * 0.08,
    ease: 'customEaseOut',
    scrollTrigger: {
      trigger: '.footer-cols',
      start: 'top 90%'
    }
  });
});
```

---

## 21. CTA Clip-Path Button Wrapper

Button reveals through a two-phase clip-path: contract inward, then expand outward with bounce.

### CSS

```css
.cta-wrapper {
  display: inline-block;
  clip-path: inset(
    var(--clip-top)
    var(--clip-right)
    var(--clip-bottom)
    var(--clip-left)
    round var(--clip-border-radius)
  );
}
```

### JS — Two-Phase Reveal

```js
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: button,
    start: 'top 80%',
    toggleActions: 'play none none none',
  }
});

// Phase 1: Contract inward (customEaseIn, fast)
tl.fromTo(wrapper, {
  '--clip-top': 'calc(0% + 0px)',
  '--clip-right': 'calc(0% + 0px)',
  '--clip-bottom': 'calc(0% + 0px)',
  '--clip-left': 'calc(0% + 0px)',
}, {
  '--clip-top': 'calc(0% + 0px)',
  '--clip-right': 'calc(50% + -26px)',
  '--clip-bottom': 'calc(0% + 0px)',
  '--clip-left': 'calc(50% + -26px)',
  ease: 'customEaseIn',
  duration: 0.334
}, 0);

// Phase 2: Expand to full (customEaseOut, slow)
tl.to(wrapper, {
  '--clip-top': 'calc(-1% + 2px)',
  '--clip-right': 'calc(-1% + 3px)',
  '--clip-bottom': 'calc(-1% + 2px)',
  '--clip-left': 'calc(-1% + 3px)',
  ease: 'customEaseOut',
  duration: 0.667
}, '>');
```

---

## 22. Nav Link Underline Slide

Underline that slides in from right on hover, slides out to left on unhover.

### CSS (pure CSS, no JS)

```css
.nav-links a {
  position: relative;
  overflow: hidden;
}
.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0;
  width: 100%;
  height: 1px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform .5s var(--ease-out);
}
.nav-links a:hover::after {
  transform: scaleX(1);
  transform-origin: left;    /* KEY — changes origin on hover for slide effect */
}
```

---

## 23. Scroll Indicator Pulse

A pulsing line at the bottom of the hero section.

### HTML

```html
<div class="scroll-indicator">
  <div class="si-line"></div>
  <span>SCROLL</span>
</div>
```

### CSS

```css
.scroll-indicator {
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0;       /* animated in by hero timeline */
}
.si-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, var(--accent), transparent);
  animation: scrollPulse 2s ease-in-out infinite;
}
@keyframes scrollPulse {
  0%, 100% { opacity: .3; transform: scaleY(.7); }
  50%      { opacity: 1;  transform: scaleY(1); }
}
```

---

## 24. Lenis Anchor Scroll

Smooth scroll to anchor targets using Lenis instead of native behavior.

### JS

```js
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target && lenis) {
      lenis.scrollTo(target, {
        offset: -20,       // pixels above target
        duration: 1         // scroll duration in seconds
      });
    }
  });
});
```

---

## Quick Reference — ScrollTrigger Patterns

### Scrub (progress tied to scroll position)
```js
scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true }
```

### Pin + Scrub (section stays fixed while scrolling)
```js
scrollTrigger: { trigger: el, start: 'top top', end: '+=200%', pin: true, scrub: true }
```

### One-Shot (play once when entering viewport)
```js
scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' }
```

### Once (fires callback once, then self-destructs)
```js
ScrollTrigger.create({ trigger: el, start: 'top 85%', once: true, onEnter: () => { ... } });
```

---

## Quick Reference — Common Values

| What | Value |
|------|-------|
| Standard reveal duration | `0.334s` |
| Hero/emphasis duration | `0.667s` |
| Word stagger delay | `0.067s` |
| Card stagger delay | `0.08s - 0.12s` |
| Perspective for 3D text | `1000` |
| RotationX for text reveal | `80°` |
| Y offset for text reveal | `50px` |
| Y offset for card entrance | `40px` |
| Lerp factor for cursor | `0.12` |
| Velocity skew clamp | `±5` to `±8` |
| Clip-path border radius | `3.6rem` |
| Pin scroll distance | `+=200%` |
