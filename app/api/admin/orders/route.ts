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
      .collection('orders')
      .orderBy('createdAt', 'desc')
      .limit(100)
      .get()

    const orders = snapshot.docs.map(doc => {
      const data = doc.data()
      return {
        id: doc.id,
        orderType: data.orderType || 'standard',
        items: data.items || [],
        totalAmount: data.totalAmount || 0,
        depositAmount: data.depositAmount || null,
        fullServicePrice: data.fullServicePrice || null,
        customerName: data.customerName || '',
        customerPhone: data.customerPhone || '',
        customerEmail: data.customerEmail || '',
        customerAddress: data.customerAddress || '',
        vehicleModel: data.vehicleModel || '',
        preferredDate: data.preferredDate || '',
        timeSlot: data.timeSlot || '',
        notes: data.notes || '',
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

    return NextResponse.json({ orders })
  } catch (error) {
    console.error('Admin orders error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
