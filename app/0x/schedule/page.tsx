'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

interface Booking {
  id: string
  name: string
  phone: string
  address: string
  vehicleModel: string
  issues: string
  date: string
  timeSlot: string
  status: string
  paymentStatus: string
  paymentAmount: number
  createdAt: string
}

const statusColors: Record<string, string> = {
  confirmed: 'bg-emerald-900/50 text-emerald-400 border-emerald-800',
  completed: 'bg-blue-900/50 text-blue-400 border-blue-800',
  pending_payment: 'bg-yellow-900/50 text-yellow-400 border-yellow-800',
  pending: 'bg-yellow-900/50 text-yellow-400 border-yellow-800',
  cancelled: 'bg-red-900/50 text-red-400 border-red-800',
  unknown: 'bg-neutral-800 text-neutral-400 border-neutral-700',
}

function formatDate(d: Date): string {
  return d.toISOString().split('T')[0]
}

function displayDate(d: Date): string {
  return d.toLocaleDateString('en-MY', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })
}

function isToday(d: Date): boolean {
  const now = new Date()
  return formatDate(d) === formatDate(now)
}

function isTomorrow(d: Date): boolean {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return formatDate(d) === formatDate(tomorrow)
}

export default function SchedulePage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [authLoading, setAuthLoading] = useState(false)

  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  const fetchBookings = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/bookings')
      if (res.status === 401) { setAuthed(false); return }
      const data = await res.json()
      if (data.bookings) setBookings(data.bookings)
    } catch { /* */ }
    finally { setLoading(false) }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthLoading(true)
    setAuthError('')
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) { setAuthed(true); setPassword('') }
      else setAuthError('Wrong password')
    } catch { setAuthError('Network error') }
    finally { setAuthLoading(false) }
  }

  useEffect(() => {
    if (authed) fetchBookings()
  }, [authed, fetchBookings])

  useEffect(() => {
    fetch('/api/admin/bookings')
      .then(res => { if (res.ok) setAuthed(true) })
      .catch(() => {})
  }, [])

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center p-5">
        <form onSubmit={handleLogin} className="w-full max-w-xs space-y-4">
          <div className="text-center mb-8">
            <div className="w-10 h-10 border border-neutral-800 flex items-center justify-center mx-auto mb-4 text-neutral-600 text-xs font-mono">0x</div>
          </div>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 text-neutral-100 placeholder:text-neutral-600 text-sm focus:border-neutral-600 focus:ring-0 outline-none transition-colors"
          />
          {authError && <p className="text-red-400 text-xs">{authError}</p>}
          <button type="submit" disabled={authLoading || !password} className="w-full px-4 py-3 bg-neutral-800 text-neutral-300 text-sm font-medium hover:bg-neutral-700 transition-colors disabled:opacity-40">
            {authLoading ? '...' : 'Enter'}
          </button>
        </form>
      </div>
    )
  }

  // Filter confirmed/completed bookings for the selected date
  const paidStatuses = ['confirmed', 'completed']
  const dateStr = formatDate(selectedDate)

  const dayBookings = bookings
    .filter(b => {
      if (!paidStatuses.includes(b.status)) return false
      if (!b.date) return false
      // Handle Firestore timestamp or date string
      const bDate = typeof b.date === 'string' ? b.date.split('T')[0] : new Date(b.date).toISOString().split('T')[0]
      return bDate === dateStr
    })
    .sort((a, b) => {
      // Sort by time slot
      const timeA = a.timeSlot || ''
      const timeB = b.timeSlot || ''
      return timeA.localeCompare(timeB)
    })

  // Get all unique dates that have paid bookings (for quick nav)
  const upcomingDates = [...new Set(
    bookings
      .filter(b => paidStatuses.includes(b.status) && b.date)
      .map(b => typeof b.date === 'string' ? b.date.split('T')[0] : new Date(b.date).toISOString().split('T')[0])
  )].sort()

  const prevDay = () => {
    const d = new Date(selectedDate)
    d.setDate(d.getDate() - 1)
    setSelectedDate(d)
  }

  const nextDay = () => {
    const d = new Date(selectedDate)
    d.setDate(d.getDate() + 1)
    setSelectedDate(d)
  }

  const goToday = () => setSelectedDate(new Date())

  return (
    <div className="max-w-4xl mx-auto px-5 py-10">
      {/* Nav */}
      <div className="flex items-center justify-between mb-8">
        <Link href="/0x" className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors">
          ← All Bookings
        </Link>
        <button onClick={fetchBookings} className="px-3 py-1.5 text-xs border border-neutral-800 text-neutral-500 hover:text-neutral-300 hover:border-neutral-600 transition-colors">
          Refresh
        </button>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-lg font-bold text-white tracking-tight">Schedule</h1>
        <p className="text-xs text-neutral-600 mt-1">Confirmed bookings by inspection date</p>
      </div>

      {/* Date Navigator */}
      <div className="flex items-center justify-between gap-4 mb-8 bg-neutral-900 border border-neutral-800 p-4">
        <button onClick={prevDay} className="px-3 py-2 text-sm text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors">
          ←
        </button>
        <div className="text-center flex-1">
          <p className="text-white font-bold text-sm">{displayDate(selectedDate)}</p>
          {isToday(selectedDate) && <span className="text-[0.6rem] uppercase tracking-widest text-emerald-500 font-bold">Today</span>}
          {isTomorrow(selectedDate) && <span className="text-[0.6rem] uppercase tracking-widest text-blue-400 font-bold">Tomorrow</span>}
        </div>
        <button onClick={nextDay} className="px-3 py-2 text-sm text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors">
          →
        </button>
      </div>

      {/* Quick jump: Today button */}
      {!isToday(selectedDate) && (
        <div className="mb-6">
          <button onClick={goToday} className="px-3 py-1.5 text-xs border border-neutral-800 text-neutral-500 hover:text-neutral-300 hover:border-neutral-600 transition-colors">
            Jump to Today
          </button>
        </div>
      )}

      {/* Day count */}
      <div className="mb-6 flex items-center gap-3">
        <span className="text-2xl font-bold text-white">{dayBookings.length}</span>
        <span className="text-xs text-neutral-600 uppercase tracking-widest">
          {dayBookings.length === 1 ? 'Inspection' : 'Inspections'}
        </span>
      </div>

      {/* Loading */}
      {loading && <p className="text-neutral-500 text-sm mb-4">Loading...</p>}

      {/* Bookings for the day */}
      {dayBookings.length > 0 ? (
        <div className="space-y-3">
          {dayBookings.map(b => (
            <div key={b.id} className="bg-neutral-900 border border-neutral-800 p-5">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="font-bold text-white text-sm">{b.name}</p>
                  <a href={`tel:${b.phone}`} className="text-xs text-neutral-400 hover:text-white transition-colors">{b.phone}</a>
                </div>
                <div className="text-right shrink-0">
                  {b.timeSlot && (
                    <p className="text-sm font-bold text-white bg-neutral-800 border border-neutral-700 px-3 py-1 inline-block">
                      {b.timeSlot}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-neutral-600 uppercase tracking-wider block mb-0.5">Vehicle</span>
                  <span className="text-neutral-200">{b.vehicleModel}</span>
                </div>
                <div>
                  <span className="text-neutral-600 uppercase tracking-wider block mb-0.5">Address</span>
                  <span className="text-neutral-200">{b.address}</span>
                </div>
                {b.issues && (
                  <div className="sm:col-span-2">
                    <span className="text-neutral-600 uppercase tracking-wider block mb-0.5">Issue</span>
                    <span className="text-neutral-300 italic">{b.issues}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-800">
                <span className={`inline-block px-2 py-0.5 text-[0.6rem] uppercase tracking-wider border ${statusColors[b.status] || statusColors.unknown}`}>
                  {b.status}
                </span>
                <div className="flex gap-2">
                  <a
                    href={`https://wa.me/${b.phone.replace(/[^0-9+]/g, '')}?text=${encodeURIComponent(`Hi ${b.name}, this is One X Transmission. We're confirming your door-to-door inspection today at ${b.timeSlot || 'your scheduled time'}. See you soon!`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-[0.65rem] border border-emerald-800/50 text-emerald-400 hover:bg-emerald-950/30 transition-colors"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`tel:${b.phone}`}
                    className="px-3 py-1.5 text-[0.65rem] border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-600 transition-colors"
                  >
                    Call
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-neutral-600 text-sm border border-neutral-800 border-dashed">
          No confirmed inspections for this date
        </div>
      )}

      {/* Upcoming dates with bookings */}
      {upcomingDates.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xs text-neutral-600 uppercase tracking-widest font-bold mb-4">Dates with bookings</h2>
          <div className="flex flex-wrap gap-2">
            {upcomingDates.map(d => {
              const date = new Date(d + 'T00:00:00')
              const count = bookings.filter(b => {
                if (!paidStatuses.includes(b.status) || !b.date) return false
                const bd = typeof b.date === 'string' ? b.date.split('T')[0] : new Date(b.date).toISOString().split('T')[0]
                return bd === d
              }).length
              const isSelected = d === dateStr
              return (
                <button
                  key={d}
                  onClick={() => setSelectedDate(date)}
                  className={`px-3 py-2 text-xs border transition-colors ${
                    isSelected
                      ? 'border-white bg-white text-neutral-950 font-bold'
                      : 'border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600'
                  }`}
                >
                  {date.toLocaleDateString('en-MY', { day: '2-digit', month: 'short' })}
                  <span className="ml-1.5 text-[0.6rem] opacity-60">({count})</span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
