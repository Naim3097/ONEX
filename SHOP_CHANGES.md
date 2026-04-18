# Shop & Service Booking — Major Changes Plan

> **Status**: Planning (not yet implemented)  
> **Date**: April 18, 2026

---

## Overview

Four major changes to the shop and booking system:

| # | Change | Summary |
|---|--------|---------|
| 1 | OBD2 Device → Coming Soon | Device listing stays visible but unpurchasable |
| 2 | Service Package → Deposit Model | Charge RM 50 booking deposit (RM 1 for testing) instead of full RM 460 |
| 3 | Live Stock Tracking | 40 OBD2 units, real-time stock decrements on purchase |
| 4 | Service Promo Admin + Time Slot Booking | Admin tracking + constrained booking window (next 3 days only) |

---

## 1. OBD2 Device → "Coming Soon"

### What Changes

The OBD2 Diagnostic Device (RM 50) must remain visible on the shop page but **cannot be purchased**. It should display a "Coming Soon" label.

### Files to Modify

| File | Change |
|------|--------|
| `lib/products.ts` | Add `comingSoon: boolean` to `Product` interface. Set OBD2 `inStock: false`, `comingSoon: true` |
| `components/sections/Shop/ShopGrid.tsx` | Stop filtering out `inStock: false` products. Show all products but differentiate purchasable vs coming-soon |
| `components/sections/Shop/ShopProductCard.tsx` | When `comingSoon: true`: replace "Add to Cart" button with "Coming Soon" badge. Grey out or style distinctly |
| `components/sections/Shop/ProductActions.tsx` | Disable "Add to Cart" for coming-soon products on product detail page |
| `content/index.ts` | Add `comingSoon` translation string (EN: "Coming Soon", MS: "Akan Datang", ZH: "即将推出") |

### UI Behavior

- Product card still shows image, name, price, description
- "Add to Cart" button → replaced with disabled "Coming Soon" label/badge
- Product detail page → same treatment, no add-to-cart action
- Cart: if somehow added (edge case), prevent checkout

---

## 2. Service Package → Booking Deposit Model

### What Changes

Instead of charging the full RM 460 through the cart/checkout, the ATF Gearbox Service Package now uses a **booking deposit** model:

- **Display price**: Still shows RM 460 (full service value) with ~~RM 580~~ original
- **Checkout charge**: **RM 1** (testing) → will become **RM 50** when going live
- **Concept**: Customer pays a small deposit to book the service; remainder paid at the workshop

### Deposit Amount Control

```
Current:  RM 460 (full price through cart checkout)
Testing:  RM 1   (deposit only)
Live:     RM 50  (deposit only)
```

### Files to Modify

| File | Change |
|------|--------|
| `lib/products.ts` | Add `depositAmount: number` field. Service package: `depositAmount: 1` (testing). Keep `price: 460` for display |
| `components/sections/Shop/ShopProductCard.tsx` | Show deposit amount info: "Book Now — RM 1 Deposit" instead of "Add to Cart" |
| `components/sections/Shop/ProductActions.tsx` | Same — show deposit CTA instead of add-to-cart |
| `components/sections/Shop/CheckoutPageClient.tsx` | Charge `depositAmount` instead of `totalPrice` for service items. Show "Deposit: RM 1" in order summary. Still display full service value for reference |
| `app/api/shop/create-payment/route.ts` | Validate that service orders charge the deposit amount, not full price |
| `lib/cart-context.tsx` | `totalPrice` should use `depositAmount` when present (for service items) |
| `content/index.ts` | Update promo section price display. Add deposit-related strings (EN/MS/ZH) |

### Checkout Flow Change

```
Before:  Add to Cart → Cart Page (RM 460) → Checkout → Pay RM 460
After:   Add to Cart → Cart Page (shows "Booking Deposit RM 1") → Checkout → Pay RM 1
```

### Order Summary Display

```
┌─────────────────────────────────────────────┐
│ ATF Gearbox Service Package                 │
│ Service Value: RM 460                       │
│ ─────────────────────────────────────────── │
│ Booking Deposit:                    RM 1.00 │
│ (Remaining RM 459 payable at workshop)      │
└─────────────────────────────────────────────┘
```

---

## 3. Live Stock Tracking (OBD2 — 40 Units)

### What Changes

Track real-time stock for the OBD2 device. Stock decrements when a purchase is confirmed. The count is stored in Firestore and displayed live on the shop page.

> **Note**: While the OBD2 is currently "Coming Soon", this stock system is built for when it goes live. It also future-proofs the service package if needed.

### Architecture

#### Firestore Collection: `inventory`

```
Document ID: "obd2-diagnostic-device" (matches product slug)
{
  stock: 40,              // Current available units
  reserved: 0,            // Units in pending payment (optional)
  initialStock: 40,       // Original stock count
  updatedAt: Timestamp
}
```

#### Stock Lifecycle

```
1. Customer places order     → stock unchanged (payment pending)
2. Payment webhook SUCCESS   → stock decremented by quantity purchased
3. Payment webhook CANCELLED → no stock change
4. Admin can manually adjust → via admin panel
```

### Files to Create/Modify

| File | Change |
|------|--------|
| `lib/products.ts` | Add `stockQuantity?: number` to Product interface |
| `app/api/shop/stock/route.ts` | **NEW** — GET endpoint to fetch live stock from Firestore |
| `app/api/payment-webhook/route.ts` | On ORDER success: decrement stock in `inventory` collection |
| `components/sections/Shop/ShopProductCard.tsx` | Fetch and display live stock: "X units left" |
| `components/sections/Shop/ProductActions.tsx` | Same — show stock on product detail |
| `app/api/admin/inventory/route.ts` | **NEW** — Admin endpoint to view/update stock |
| `app/0x/page.tsx` | Add inventory section to admin dashboard |

### Stock Display Rules

| Stock Level | Display |
|-------------|---------|
| > 10 | "In Stock" (green) |
| 1–10 | "Only X left" (amber/urgent) |
| 0 | "Out of Stock" (red, disable purchase) |
| Coming Soon | "Coming Soon" (overrides stock display) |

### Initialization

Run once to seed Firestore:
```js
// In Firebase Console or via admin API
inventory/obd2-diagnostic-device: { stock: 40, initialStock: 40, reserved: 0 }
```

---

## 4. Service Promo — Admin Tracking + Time Slot Booking

### What Changes

The service package booking needs:
1. **Admin tracking** (like door-to-door bookings) — view service promo orders with time slots
2. **Time slot booking** — customer picks a date + time slot at checkout
3. **Date constraints** — cannot book same day, only 3 days forward (tomorrow, day+2, day+3)

### Booking Date Rules

```
Today: April 18, 2026 (Friday)

Available dates:
  ✓ April 19 (Saturday)  — tomorrow
  ✓ April 20 (Sunday)    — day+2 (if Sunday is allowed, else skip)
  ✓ April 21 (Monday)    — day+3

Blocked:
  ✗ April 18 (today)     — same-day booking not allowed
  ✗ April 22+             — beyond 3-day window
```

> **Decision needed**: Should Sundays be blocked? The door-to-door booking blocks Sundays. Same rule for service promo?

### Time Slots

Reuse the same slots as door-to-door booking:
```
- 9:00 AM – 11:00 AM
- 11:00 AM – 1:00 PM
- 2:00 PM – 4:00 PM
- 4:00 PM – 6:00 PM
```

### Checkout Flow (Service Package)

```
Step 1: Customer adds Service Package to cart
Step 2: Cart page shows "Booking Deposit: RM 1"
Step 3: Checkout form:
        - Name, Phone, Email, Address (existing fields)
        - Vehicle Model (NEW — needed for service)
        - Preferred Date (date picker: tomorrow to +3 days, no Sundays)
        - Time Slot (dropdown: 4 slots)
        - Issues/Notes (optional)
Step 4: Review & Pay RM 1 deposit
Step 5: Lean.x payment → redirect to success page
```

### Firestore: `orders` Collection Update

Add these fields to service package orders:

```js
{
  // ...existing order fields...
  orderType: 'service_promo',       // NEW — distinguish from device orders
  vehicleModel: 'Perodua Myvi',     // NEW
  preferredDate: '2026-04-19',      // NEW
  timeSlot: '9:00 AM – 11:00 AM',  // NEW
  depositAmount: 1,                 // NEW — the deposit charged
  fullServicePrice: 460,            // NEW — the full value
}
```

### Admin Dashboard Changes

#### New Tab/Section in `/0x/` Admin

```
┌─────────────────────────────────────────────────────┐
│  [Door-to-Door Bookings]  [Service Promo Bookings]  │  ← Tab switcher
├─────────────────────────────────────────────────────┤
│                                                     │
│  Stats: Total | Confirmed | Pending | Revenue       │
│                                                     │
│  ┌─────┬──────────┬─────────┬──────┬────────┬────┐  │
│  │ Date│ Customer │ Vehicle │ Slot │ Status │ $  │  │
│  ├─────┼──────────┼─────────┼──────┼────────┼────┤  │
│  │ 4/19│ Ahmad    │ Myvi    │ 9-11 │ ✓ Paid │ 1  │  │
│  │ 4/20│ Siti     │ Vios    │ 2-4  │ ⏳ Pend│ —  │  │
│  └─────┴──────────┴─────────┴──────┴────────┴────┘  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### Admin API Routes (New)

| Route | Method | Purpose |
|-------|--------|---------|
| `app/api/admin/orders/route.ts` | GET | List all service promo orders |
| `app/api/admin/orders/update/route.ts` | PATCH | Update order status |

#### Schedule View Enhancement

Extend `/0x/schedule` to show service promo bookings alongside door-to-door bookings, differentiated by type/color.

---

## File Change Summary

### New Files

| File | Purpose |
|------|---------|
| `app/api/shop/stock/route.ts` | Public stock query endpoint |
| `app/api/admin/orders/route.ts` | Admin: list service promo orders |
| `app/api/admin/orders/update/route.ts` | Admin: update order status |

### Modified Files

| File | Changes |
|------|---------|
| `lib/products.ts` | Add `comingSoon`, `depositAmount`, `stockQuantity` fields |
| `lib/cart-context.tsx` | Use `depositAmount` for total calculation |
| `content/index.ts` | New strings (coming soon, deposit, vehicle, date, slot) in EN/MS/ZH |
| `components/sections/Shop/ShopGrid.tsx` | Show coming-soon products, don't filter by inStock |
| `components/sections/Shop/ShopProductCard.tsx` | Coming Soon badge, deposit label, live stock |
| `components/sections/Shop/ProductActions.tsx` | Disable for coming-soon, deposit CTA |
| `components/sections/Shop/CheckoutPageClient.tsx` | Add vehicle/date/slot fields, charge deposit |
| `app/api/shop/create-payment/route.ts` | Accept deposit amount, validate |
| `app/api/payment-webhook/route.ts` | Decrement stock on order success |
| `app/0x/page.tsx` | Add service promo tab, order management |
| `app/0x/schedule/page.tsx` | Show service promo bookings on schedule |

---

## Testing Checklist

- [ ] OBD2 card shows "Coming Soon" — cannot add to cart
- [ ] OBD2 product detail page shows "Coming Soon" — no purchase action
- [ ] Service package card shows "Book Now — RM 1 Deposit"
- [ ] Service checkout shows deposit breakdown (RM 1 charged, RM 460 service value)
- [ ] Checkout requires vehicle model, date, time slot for service orders
- [ ] Date picker: only tomorrow, +2 days, +3 days available
- [ ] Date picker: Sundays blocked (if decided)
- [ ] Same-day dates blocked
- [ ] Payment of RM 1 via Lean.x succeeds
- [ ] Webhook updates order status in Firestore
- [ ] Stock decrements on confirmed OBD2 purchase (when enabled)
- [ ] Admin dashboard shows service promo bookings in new tab
- [ ] Admin can view/update service promo order status
- [ ] Admin schedule shows service promo time slots
- [ ] Live stock count displays correctly on shop page
- [ ] Change deposit from RM 1 → RM 50 (single value in `lib/products.ts`)

---

## Future: Going Live

When ready to go live with these changes:

1. **OBD2 Device**: Set `comingSoon: false`, `inStock: true` in `lib/products.ts`
2. **Service Deposit**: Change `depositAmount: 1` → `depositAmount: 50` in `lib/products.ts`
3. **Stock**: Verify Firestore `inventory/obd2-diagnostic-device` has correct count
