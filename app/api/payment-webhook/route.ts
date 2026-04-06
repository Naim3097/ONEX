import { NextRequest, NextResponse } from 'next/server'
import { getAdminDb } from '@/lib/firebase-admin'

export async function GET() {
  return NextResponse.json({ status: 'Webhook endpoint active', timestamp: new Date().toISOString() })
}

interface LeanXWebhookPayload {
  invoice_no: string
  amount: string
  invoice_status: string
  providerTypeReference?: string
  bank_provider?: string
  fpx_invoice_no?: string
  customer_name?: string
  customer_email?: string
  customer_phone?: string
}

export async function POST(request: NextRequest) {
  try {
    let payload: LeanXWebhookPayload

    const contentType = request.headers.get('content-type') || ''

    if (contentType.includes('application/json')) {
      payload = await request.json()
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await request.formData()
      payload = Object.fromEntries(formData.entries()) as unknown as LeanXWebhookPayload
    } else {
      // Fallback: try JSON first, then form-decode
      const rawBody = await request.text()
      console.log('Webhook raw body:', rawBody)
      console.log('Webhook content-type:', contentType)
      try {
        payload = JSON.parse(rawBody)
      } catch {
        const params = new URLSearchParams(rawBody)
        payload = Object.fromEntries(params.entries()) as unknown as LeanXWebhookPayload
      }
    }

    console.log('Webhook parsed payload:', {
      invoice_no: payload.invoice_no,
      invoice_status: payload.invoice_status,
      amount: payload.amount,
    })

    if (!payload.invoice_no || !payload.invoice_status) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    const db = getAdminDb()
    let bookingRef
    let bookingDoc

    // Strategy 1: Try as our invoice_ref format (BOOKING-{docId})
    if (payload.invoice_no.startsWith('BOOKING-')) {
      const bookingId = payload.invoice_no.replace('BOOKING-', '')
      bookingRef = db.collection('bookings').doc(bookingId)
      bookingDoc = await bookingRef.get()
    }

    // Strategy 2: Try matching Lean.x billNo stored in Firestore
    if (!bookingDoc || !bookingDoc.exists) {
      console.log('Trying leanxBillNo lookup for:', payload.invoice_no)
      const snapshot = await db.collection('bookings')
        .where('leanxBillNo', '==', payload.invoice_no)
        .limit(1)
        .get()
      if (!snapshot.empty) {
        bookingRef = snapshot.docs[0].ref
        bookingDoc = snapshot.docs[0]
      }
    }

    // Strategy 3: Try matching by leanxInvoiceRef
    if (!bookingDoc || !bookingDoc.exists) {
      console.log('Trying leanxInvoiceRef lookup for:', payload.invoice_no)
      const snapshot = await db.collection('bookings')
        .where('leanxInvoiceRef', '==', payload.invoice_no)
        .limit(1)
        .get()
      if (!snapshot.empty) {
        bookingRef = snapshot.docs[0].ref
        bookingDoc = snapshot.docs[0]
      }
    }

    if (!bookingDoc || !bookingDoc.exists || !bookingRef) {
      console.error('Booking not found for invoice_no:', payload.invoice_no)
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    let bookingStatus = 'pending'
    if (payload.invoice_status === 'SUCCESS') {
      bookingStatus = 'confirmed'
    } else if (
      payload.invoice_status === 'FAILED' ||
      payload.invoice_status === 'CANCELLED'
    ) {
      bookingStatus = 'cancelled'
    }

    await bookingRef.update({
      status: bookingStatus,
      paymentStatus: payload.invoice_status,
      paymentInvoiceNo: payload.invoice_no,
      paymentAmount: parseFloat(payload.amount),
      paymentProvider: payload.bank_provider || 'Unknown',
      paymentMethod: payload.providerTypeReference || 'FPX',
      paymentTransactionId: payload.fpx_invoice_no || null,
      paymentUpdatedAt: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: 'Webhook processed successfully',
      bookingId: bookingRef.id,
      status: bookingStatus,
    })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
