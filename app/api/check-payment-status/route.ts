import { NextRequest, NextResponse } from 'next/server'

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
    const invoiceNo = request.nextUrl.searchParams.get('invoiceNo')

    if (!invoiceNo) {
      return NextResponse.json(
        { error: 'Missing invoiceNo query parameter' },
        { status: 400 }
      )
    }

    const authToken = process.env.LEANX_AUTH_TOKEN?.trim()
    if (!authToken) {
      return NextResponse.json(
        { error: 'Payment gateway not configured' },
        { status: 500 }
      )
    }

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
      console.error('Lean.x API Error:', data)
      return NextResponse.json(
        { error: 'Payment gateway error', message: data.description },
        { status: 500 }
      )
    }

    const txn = data.data?.transaction_details
    const customer = data.data?.customer_details

    if (!txn) {
      console.error('Lean.x returned no transaction_details:', JSON.stringify(data))
      return NextResponse.json(
        { error: 'Transaction not found or still processing', message: 'No transaction details returned' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      transaction: {
        invoiceNo: txn.invoice_no,
        status: txn.invoice_status,
        amount: parseFloat(txn.amount),
        amountWithFee: txn.amount_with_fee,
        fee: txn.fee,
        paymentMethod: txn.providerTypeReference,
        bankProvider: txn.bank_provider,
        transactionId: txn.fpx_invoice_no,
      },
      customer: customer,
    })
  } catch (error) {
    console.error('Transaction status check error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
