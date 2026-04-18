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
    let docRef: FirebaseFirestore.DocumentReference | undefined
    let docSnap: FirebaseFirestore.DocumentSnapshot | undefined

    // Determine collection based on invoice prefix
    const isOrder = payload.invoice_no.startsWith('ORDER-')
    const collectionName = isOrder ? 'orders' : 'bookings'

    // Strategy 1: Try as our invoice_ref format (BOOKING-{docId} or ORDER-{docId})
    if (payload.invoice_no.startsWith('BOOKING-') || payload.invoice_no.startsWith('ORDER-')) {
      const docId = payload.invoice_no.replace(/^(BOOKING|ORDER)-/, '')
      docRef = db.collection(collectionName).doc(docId)
      docSnap = await docRef.get()
    }

    // Strategy 2: Try matching Lean.x billNo stored in Firestore (both collections)
    if (!docSnap || !docSnap.exists) {
      console.log('Trying leanxBillNo lookup for:', payload.invoice_no)
      for (const col of ['bookings', 'orders']) {
        const snapshot = await db.collection(col)
          .where('leanxBillNo', '==', payload.invoice_no)
          .limit(1)
          .get()
        if (!snapshot.empty) {
          docRef = snapshot.docs[0].ref
          docSnap = snapshot.docs[0]
          break
        }
      }
    }

    // Strategy 3: Try matching by leanxInvoiceRef (both collections)
    if (!docSnap || !docSnap.exists) {
      console.log('Trying leanxInvoiceRef lookup for:', payload.invoice_no)
      for (const col of ['bookings', 'orders']) {
        const snapshot = await db.collection(col)
          .where('leanxInvoiceRef', '==', payload.invoice_no)
          .limit(1)
          .get()
        if (!snapshot.empty) {
          docRef = snapshot.docs[0].ref
          docSnap = snapshot.docs[0]
          break
        }
      }
    }

    if (!docSnap || !docSnap.exists || !docRef) {
      console.error('Document not found for invoice_no:', payload.invoice_no)
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    let docStatus = 'pending'
    if (payload.invoice_status === 'SUCCESS') {
      docStatus = 'confirmed'
    } else if (
      payload.invoice_status === 'FAILED' ||
      payload.invoice_status === 'CANCELLED'
    ) {
      docStatus = 'cancelled'
    }

    await docRef.update({
      status: docStatus,
      paymentStatus: payload.invoice_status,
      paymentInvoiceNo: payload.invoice_no,
      paymentAmount: parseFloat(payload.amount),
      paymentProvider: payload.bank_provider || 'Unknown',
      paymentMethod: payload.providerTypeReference || 'FPX',
      paymentTransactionId: payload.fpx_invoice_no || null,
      paymentUpdatedAt: new Date().toISOString(),
    })

    // Decrement stock on successful order payment
    if (docStatus === 'confirmed' && isOrder) {
      try {
        const orderData = docSnap.data()
        const items = orderData?.items || []
        for (const item of items) {
          if (item.slug && item.quantity) {
            const inventoryRef = db.collection('inventory').doc(item.slug)
            const inventoryDoc = await inventoryRef.get()
            if (inventoryDoc.exists) {
              const currentStock = inventoryDoc.data()?.stock ?? 0
              const newStock = Math.max(0, currentStock - item.quantity)
              await inventoryRef.update({
                stock: newStock,
                updatedAt: new Date().toISOString(),
              })
            }
          }
        }
      } catch (stockErr) {
        console.error('Stock decrement error:', stockErr)
        // Don't fail the webhook — stock error is non-critical
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Webhook processed successfully',
      docId: docRef.id,
      status: docStatus,
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
