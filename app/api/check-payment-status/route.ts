import { NextRequest, NextResponse } from 'next/server'
import { getAdminDb } from '@/lib/firebase-admin'

interface LeanXTransactionResponse {
  response_code: number
  description: string
  data: {
    transaction_details: {
      invoice_no: string
      fpx_invoice_no: string
      amount: string
      invoice_status: string
      providerTypeReference: string
      bank_provider: string
      amount_with_fee: number
      fee: number
    }
    customer_details: {
      name: string
      phone_number: string
      email: string
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    const bookingId = request.nextUrl.searchParams.get('bookingId')
    const orderId = request.nextUrl.searchParams.get('orderId')
    const docId = bookingId || orderId
    const collectionName = orderId ? 'orders' : 'bookings'
    const invoicePrefix = orderId ? 'ORDER' : 'BOOKING'

    if (!docId) {
      return NextResponse.json({ error: 'Missing bookingId or orderId' }, { status: 400 })
    }

    const authToken = process.env.LEANX_AUTH_TOKEN?.trim()
    if (!authToken) {
      return NextResponse.json({ error: 'Payment gateway not configured' }, { status: 500 })
    }

    // Get document from Firestore
    const db = getAdminDb()
    const bookingRef = db.collection(collectionName).doc(docId)
    const bookingDoc = await bookingRef.get()

    if (!bookingDoc.exists) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    const booking = bookingDoc.data()!

    // If already confirmed or completed, just return that
    if (booking.status === 'confirmed' || booking.status === 'completed') {
      return NextResponse.json({
        success: true,
        status: booking.status,
        paymentStatus: booking.paymentStatus || 'SUCCESS',
        amount: booking.totalAmount || booking.amount || null,
      })
    }

    // Try to find the Lean.x invoice number
    const invoiceNo = booking.leanxBillNo || booking.leanxInvoiceRef || `${invoicePrefix}-${docId}`

    const apiHost = process.env.LEANX_API_HOST || 'https://api.leanx.io'

    const apiResponse = await fetch(
      `${apiHost}/api/v1/merchant/manual-checking-transaction?invoice_no=${encodeURIComponent(invoiceNo)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken,
        },
      }
    )

    const data: LeanXTransactionResponse = await apiResponse.json()

    if (!apiResponse.ok || data.response_code !== 2000) {
      console.error('Lean.x check error:', data)
      return NextResponse.json({
        success: true,
        status: booking.status || 'pending_payment',
        paymentStatus: 'UNKNOWN',
        message: 'Could not verify with payment gateway',
      })
    }

    const txn = data.data?.transaction_details

    if (!txn) {
      return NextResponse.json({
        success: true,
        status: booking.status || 'pending_payment',
        paymentStatus: 'PROCESSING',
        message: 'Transaction still processing',
      })
    }

    // Map Lean.x status to booking status
    let bookingStatus = booking.status || 'pending_payment'
    if (txn.invoice_status === 'SUCCESS') {
      bookingStatus = 'confirmed'
    } else if (txn.invoice_status === 'FAILED' || txn.invoice_status === 'CANCELLED') {
      bookingStatus = 'cancelled'
    }

    // Update Firestore with the real status
    await bookingRef.update({
      status: bookingStatus,
      paymentStatus: txn.invoice_status,
      paymentInvoiceNo: txn.invoice_no,
      paymentAmount: parseFloat(txn.amount),
      paymentProvider: txn.bank_provider || 'Unknown',
      paymentMethod: txn.providerTypeReference || 'FPX',
      paymentTransactionId: txn.fpx_invoice_no || null,
      paymentUpdatedAt: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      status: bookingStatus,
      paymentStatus: txn.invoice_status,
      amount: parseFloat(txn.amount) || null,
      transactionId: txn.fpx_invoice_no || txn.invoice_no || null,
    })
  } catch (error) {
    console.error('Payment check error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
