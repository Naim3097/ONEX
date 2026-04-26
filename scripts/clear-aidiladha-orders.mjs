// One-off cleanup: delete all Firestore `orders` where orderType == 'aidiladha_promo'.
// Usage: node --env-file=.env.local scripts/clear-aidiladha-orders.mjs
// Add --dry-run to preview without deleting.

import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const dryRun = process.argv.includes('--dry-run')

if (getApps().length === 0) {
  initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    }),
  })
}

const db = getFirestore()

const snap = await db
  .collection('orders')
  .where('orderType', '==', 'aidiladha_promo')
  .get()

console.log(`Found ${snap.size} aidiladha_promo orders.`)

if (snap.size === 0) process.exit(0)

snap.docs.forEach((d) => {
  const x = d.data()
  console.log(`  - ${d.id} | ${x.customerName ?? x.name ?? '?'} | ${x.preferredDate ?? '?'} ${x.timeSlot ?? ''} | status=${x.status ?? '?'}`)
})

if (dryRun) {
  console.log('\n[dry-run] No documents deleted.')
  process.exit(0)
}

let batch = db.batch()
let count = 0
for (const d of snap.docs) {
  batch.delete(d.ref)
  count++
  if (count % 400 === 0) {
    await batch.commit()
    batch = db.batch()
  }
}
await batch.commit()

console.log(`\nDeleted ${count} aidiladha_promo orders.`)
process.exit(0)
