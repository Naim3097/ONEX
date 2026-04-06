import { NextRequest, NextResponse } from 'next/server'

interface LeanXBillResponse {
  response_code: number
  description: string
  data: {
    collection_uuid: string
    redirect_url: string
    bill_no: string
    invoice_ref: string
  }
  breakdown_errors: string
}

export async function POST(request: NextRequest) {
  try {
    const { amount, invoiceRef, customerName, customerEmail, customerPhone } =
      await request.json()

    if (!amount || !invoiceRef || !customerName || !customerEmail || !customerPhone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (amount <= 0 || amount > 10000) {
      return NextResponse.json(
        { error: 'Invalid amount. Must be between 0.01 and 10,000 MYR' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(customerEmail)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    const phoneRegex = /^(\+?6?01)[0-9]{8,9}$/
    if (!phoneRegex.test(customerPhone.replace(/[\s-]/g, ''))) {
      return NextResponse.json(
        { error: 'Invalid phone number. Must be a valid Malaysian mobile number' },
        { status: 400 }
      )
    }

    const authToken = process.env.LEANX_AUTH_TOKEN?.trim()
    const collectionUuid = process.env.LEANX_COLLECTION_UUID?.trim()
    const apiHost = process.env.LEANX_API_HOST || 'https://api.leanx.io'

    if (!authToken || !collectionUuid) {
      console.error('Missing Lean.x credentials')
      return NextResponse.json(
        { error: 'Payment gateway not configured. Please contact support.' },
        { status: 500 }
      )
    }

    const protocol = request.headers.get('x-forwarded-proto') || 'https'
    const host = request.headers.get('host')
    const baseUrl = `${protocol}://${host}`
    const redirectUrl = `${baseUrl}/en/booking/success`
    const callbackUrl = `https://www.onextransmission.com/api/payment-webhook`

    console.log('Payment URLs:', { baseUrl, redirectUrl, callbackUrl })

    const leanxPayload = {
      collection_uuid: collectionUuid,
      amount: parseFloat(amount.toFixed(2)),
      invoice_ref: invoiceRef,
      redirect_url: redirectUrl,
      callback_url: callbackUrl,
      full_name: customerName,
      email: customerEmail,
      phone_number: customerPhone.replace(/[\s-]/g, ''),
    }

    const apiResponse = await fetch(
      `${apiHost}/api/v1/merchant/create-bill-page`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken,
        },
        body: JSON.stringify(leanxPayload),
      }
    )

    const data: LeanXBillResponse = await apiResponse.json()

    if (!apiResponse.ok || data.response_code !== 2000) {
      console.error('Lean.x API Error:', data)
      return NextResponse.json(
        {
          error: 'Payment gateway error',
          message: data.description,
          details: data.breakdown_errors,
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      redirectUrl: data.data.redirect_url,
      billNo: data.data.bill_no,
      invoiceRef: data.data.invoice_ref,
    })
  } catch (error) {
    console.error('Payment creation error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
