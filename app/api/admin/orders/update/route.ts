import { NextRequest, NextResponse } from 'next/server'
import { getAdminDb } from '@/lib/firebase-admin'
import { createHash } from 'crypto'

export async function PATCH(request: NextRequest) {
  try {
    const cookie = request.cookies.get('admin_token')?.value
    const password = process.env.ADMIN_PASSWORD
    if (!cookie || !password) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const expectedToken = createHash('sha256')
      .update(password + process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID)
      .digest('hex')
    if (cookie !== expectedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { orderId, status } = await request.json()

    if (!orderId || !status) {
      return NextResponse.json({ error: 'Missing orderId or status' }, { status: 400 })
    }

    const validStatuses = ['pending_payment', 'confirmed', 'cancelled', 'completed']
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const db = getAdminDb()
    const orderRef = db.collection('orders').doc(orderId)
    const orderDoc = await orderRef.get()

    if (!orderDoc.exists) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    await orderRef.update({
      status,
      manuallyUpdatedAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true, orderId, status })
  } catch (error) {
    console.error('Order status update error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
