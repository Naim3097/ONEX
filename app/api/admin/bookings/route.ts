import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createHash } from 'crypto'
import { getAdminDb } from '@/lib/firebase-admin'

function verifyToken(token: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) return false
  const expected = createHash('sha256')
    .update(adminPassword + process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID)
    .digest('hex')
  return token === expected
}

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_token')?.value

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const db = getAdminDb()
    const snapshot = await db
      .collection('bookings')
      .orderBy('createdAt', 'desc')
      .limit(100)
      .get()

    const bookings = snapshot.docs.map(doc => {
      const data = doc.data()
      return {
        id: doc.id,
        name: data.name || '',
        phone: data.phone || '',
        address: data.address || '',
        vehicleModel: data.vehicleModel || '',
        issues: data.issues || '',
        date: data.date?.toDate?.()?.toISOString() || data.date || '',
        timeSlot: data.timeSlot || '',
        status: data.status || 'unknown',
        paymentStatus: data.paymentStatus || '',
        paymentAmount: data.paymentAmount || 0,
        paymentProvider: data.paymentProvider || '',
        paymentInvoiceNo: data.paymentInvoiceNo || '',
        paymentMethod: data.paymentMethod || '',
        paymentUpdatedAt: data.paymentUpdatedAt || '',
        createdAt: data.createdAt?.toDate?.()?.toISOString() || '',
      }
    })

    return NextResponse.json({ bookings })
  } catch (error) {
    console.error('Admin bookings error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
