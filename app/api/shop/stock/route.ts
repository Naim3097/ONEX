import { NextResponse } from 'next/server'
import { getAdminDb } from '@/lib/firebase-admin'

export async function GET() {
  try {
    const db = getAdminDb()
    const snapshot = await db.collection('inventory').get()

    const stock: Record<string, { stock: number; initialStock: number }> = {}
    snapshot.docs.forEach((doc) => {
      const data = doc.data()
      stock[doc.id] = {
        stock: data.stock ?? 0,
        initialStock: data.initialStock ?? 0,
      }
    })

    return NextResponse.json({ stock })
  } catch (error) {
    console.error('Stock fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch stock' }, { status: 500 })
  }
}
