import { NextRequest, NextResponse } from 'next/server'
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

// GET: fetch all inventory
export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_token')?.value
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const db = getAdminDb()
    const snapshot = await db.collection('inventory').get()
    const inventory: Record<string, { stock: number; initialStock: number; updatedAt: string }> = {}
    snapshot.docs.forEach((doc) => {
      const data = doc.data()
      inventory[doc.id] = {
        stock: data.stock ?? 0,
        initialStock: data.initialStock ?? 0,
        updatedAt: data.updatedAt || '',
      }
    })

    return NextResponse.json({ inventory })
  } catch (error) {
    console.error('Admin inventory error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// PATCH: update stock for a product
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

    const { slug, stock } = await request.json()
    if (!slug || typeof stock !== 'number' || stock < 0) {
      return NextResponse.json({ error: 'Invalid slug or stock value' }, { status: 400 })
    }

    const db = getAdminDb()
    const docRef = db.collection('inventory').doc(slug)
    const doc = await docRef.get()

    if (doc.exists) {
      await docRef.update({ stock, updatedAt: new Date().toISOString() })
    } else {
      await docRef.set({ stock, initialStock: stock, updatedAt: new Date().toISOString() })
    }

    return NextResponse.json({ success: true, slug, stock })
  } catch (error) {
    console.error('Inventory update error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
