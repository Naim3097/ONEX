import { NextRequest, NextResponse } from 'next/server'
import { getAdminDb } from '@/lib/firebase-admin'
import { createHash } from 'crypto'

export async function PATCH(request: NextRequest) {
  try {
    // Verify admin auth
    const cookie = request.cookies.get('admin_token')?.value
    const password = process.env.ADMIN_PASSWORD
    if (!cookie || !password) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const expectedToken = createHash('sha256').update(password).digest('hex')
    if (cookie !== expectedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { bookingId, status } = await request.json()

    if (!bookingId || !status) {
      return NextResponse.json({ error: 'Missing bookingId or status' }, { status: 400 })
    }

    const validStatuses = ['pending_payment', 'confirmed', 'cancelled', 'completed']
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const db = getAdminDb()
    const bookingRef = db.collection('bookings').doc(bookingId)
    const bookingDoc = await bookingRef.get()

    if (!bookingDoc.exists) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    await bookingRef.update({
      status,
      manuallyUpdatedAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true, bookingId, status })
  } catch (error) {
    console.error('Status update error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
