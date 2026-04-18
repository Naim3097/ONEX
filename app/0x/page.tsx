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
  paymentProvider: string
  paymentInvoiceNo: string
  paymentMethod: string
  paymentUpdatedAt: string
  createdAt: string
}

interface Order {
  id: string
  orderType: string
  items: { slug: string; name: string; price: number; quantity: number; depositAmount?: number }[]
  totalAmount: number
  depositAmount: number | null
  fullServicePrice: number | null
  customerName: string
  customerPhone: string
  customerEmail: string
  customerAddress: string
  vehicleModel: string
  preferredDate: string
  timeSlot: string
  notes: string
  status: string
  paymentStatus: string
  paymentAmount: number
  paymentProvider: string
  paymentInvoiceNo: string
  paymentMethod: string
  paymentUpdatedAt: string
  createdAt: string
}

type AdminTab = 'bookings' | 'orders'

const statusColors: Record<string, string> = {
  confirmed: 'bg-emerald-900/50 text-emerald-400 border-emerald-800',
  completed: 'bg-blue-900/50 text-blue-400 border-blue-800',
  pending_payment: 'bg-yellow-900/50 text-yellow-400 border-yellow-800',
  pending: 'bg-yellow-900/50 text-yellow-400 border-yellow-800',
  cancelled: 'bg-red-900/50 text-red-400 border-red-800',
  unknown: 'bg-neutral-800 text-neutral-400 border-neutral-700',
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [authLoading, setAuthLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<AdminTab>('bookings')

  const [bookings, setBookings] = useState<Booking[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState<Booking | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [updating, setUpdating] = useState(false)
  const [verifying, setVerifying] = useState(false)

  const fetchBookings = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/bookings')
      if (res.status === 401) {
        setAuthed(false)
        return
      }
      const data = await res.json()
      if (data.bookings) setBookings(data.bookings)
      else setError(data.error || 'Failed to load')
    } catch {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/orders')
      if (res.status === 401) return
      const data = await res.json()
      if (data.orders) setOrders(data.orders)
    } catch {
      // silently fail
    }
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
      if (res.ok) {
        setAuthed(true)
        setPassword('')
      } else {
        setAuthError('Wrong password')
      }
    } catch {
      setAuthError('Network error')
    } finally {
      setAuthLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    setAuthed(false)
    setBookings([])
    setOrders([])
  }

  useEffect(() => {
    if (authed) {
      fetchBookings()
      fetchOrders()
    }
  }, [authed, fetchBookings, fetchOrders])

  // Check if already authed on mount
  useEffect(() => {
    fetch('/api/admin/bookings')
      .then(res => {
        if (res.ok) setAuthed(true)
      })
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
          <button
            type="submit"
            disabled={authLoading || !password}
            className="w-full px-4 py-3 bg-neutral-800 text-neutral-300 text-sm font-medium hover:bg-neutral-700 transition-colors disabled:opacity-40"
          >
            {authLoading ? '...' : 'Enter'}
          </button>
        </form>
      </div>
    )
  }

  const updateStatus = async (bookingId: string, newStatus: string) => {
    setUpdating(true)
    try {
      const res = await fetch('/api/admin/bookings/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, status: newStatus }),
      })
      if (res.ok) {
        setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b))
        setSelected(prev => prev ? { ...prev, status: newStatus } : null)
      }
    } catch {
      // silently fail
    } finally {
      setUpdating(false)
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    setUpdating(true)
    try {
      const res = await fetch('/api/admin/orders/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus }),
      })
      if (res.ok) {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
        setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null)
      }
    } catch {
      // silently fail
    } finally {
      setUpdating(false)
    }
  }

  const verifyPayment = async (bookingId: string) => {
    setVerifying(true)
    try {
      const res = await fetch(`/api/check-payment-status?bookingId=${bookingId}`)
      const data = await res.json()
      if (data.success && data.status) {
        setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: data.status, paymentStatus: data.paymentStatus || b.paymentStatus } : b))
        setSelected(prev => prev ? { ...prev, status: data.status, paymentStatus: data.paymentStatus || prev.paymentStatus } : null)
      }
    } catch {
      // silently fail
    } finally {
      setVerifying(false)
    }
  }

  const verifyOrderPayment = async (orderId: string) => {
    setVerifying(true)
    try {
      const res = await fetch(`/api/check-payment-status?orderId=${orderId}`)
      const data = await res.json()
      if (data.success && data.status) {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: data.status, paymentStatus: data.paymentStatus || o.paymentStatus } : o))
        setSelectedOrder(prev => prev ? { ...prev, status: data.status, paymentStatus: data.paymentStatus || prev.paymentStatus } : null)
      }
    } catch {
      // silently fail
    } finally {
      setVerifying(false)
    }
  }

  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length

  const bookingStats = {
    total: bookings.length,
    confirmed: confirmedCount,
    pending: bookings.filter(b => b.status === 'pending_payment' || b.status === 'pending').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    revenue: bookings.filter(b => b.status === 'confirmed').reduce((sum, b) => sum + (b.paymentAmount || 0), 0),
  }

  const serviceOrders = orders.filter(o => o.orderType === 'service_promo')
  const orderStats = {
    total: serviceOrders.length,
    confirmed: serviceOrders.filter(o => o.status === 'confirmed').length,
    pending: serviceOrders.filter(o => o.status === 'pending_payment' || o.status === 'pending').length,
    cancelled: serviceOrders.filter(o => o.status === 'cancelled').length,
    revenue: serviceOrders.filter(o => o.status === 'confirmed').reduce((sum, o) => sum + (o.paymentAmount || 0), 0),
  }

  const currentStats = activeTab === 'bookings' ? bookingStats : orderStats

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-bold text-white tracking-tight">Admin</h1>
          <p className="text-xs text-neutral-600 mt-1">Booking & service management</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/0x/schedule"
            className="px-3 py-1.5 text-xs border border-emerald-800/50 text-emerald-400 hover:bg-emerald-950/30 hover:border-emerald-700 transition-colors"
          >
            Schedule
          </Link>
          <button
            onClick={() => { fetchBookings(); fetchOrders() }}
            className="px-3 py-1.5 text-xs border border-neutral-800 text-neutral-500 hover:text-neutral-300 hover:border-neutral-600 transition-colors"
          >
            Refresh
          </button>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 text-xs text-neutral-600 hover:text-neutral-400 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-px mb-8">
        {[
          { key: 'bookings' as AdminTab, label: 'Door-to-Door', count: bookings.length },
          { key: 'orders' as AdminTab, label: 'Service Promo', count: serviceOrders.length },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              activeTab === tab.key
                ? 'bg-white text-neutral-950'
                : 'bg-neutral-900 text-neutral-500 hover:text-neutral-300 border border-neutral-800'
            }`}
          >
            {tab.label}
            <span className={`ml-2 ${activeTab === tab.key ? 'text-neutral-600' : 'text-neutral-700'}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-px bg-neutral-800 mb-10">
        {[
          { label: 'Total', value: currentStats.total },
          { label: 'Confirmed', value: currentStats.confirmed },
          { label: 'Pending', value: currentStats.pending },
          { label: 'Cancelled', value: currentStats.cancelled },
          { label: 'Revenue', value: `RM ${currentStats.revenue.toFixed(2)}` },
        ].map(s => (
          <div key={s.label} className="bg-neutral-950 p-5">
            <p className="text-[0.65rem] uppercase tracking-widest text-neutral-600 mb-1">{s.label}</p>
            <p className="text-xl font-bold text-white">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Error / Loading */}
      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
      {loading && <p className="text-neutral-500 text-sm mb-4">Loading...</p>}

      {/* Bookings Table */}
      {activeTab === 'bookings' && bookings.length > 0 && (
        <div className="border border-neutral-800 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-800 text-left">
                {['Date', 'Customer', 'Vehicle', 'Location', 'Time Slot', 'Status', 'Payment'].map(h => (
                  <th key={h} className="px-4 py-3 text-[0.65rem] uppercase tracking-widest text-neutral-600 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr
                  key={b.id}
                  onClick={() => setSelected(b)}
                  className="border-b border-neutral-900 hover:bg-neutral-900/50 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3 text-neutral-400 whitespace-nowrap">
                    {b.createdAt ? new Date(b.createdAt).toLocaleDateString('en-MY', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{b.name}</p>
                    <p className="text-xs text-neutral-600">{b.phone}</p>
                  </td>
                  <td className="px-4 py-3 text-neutral-300">{b.vehicleModel}</td>
                  <td className="px-4 py-3 text-neutral-400">{b.address}</td>
                  <td className="px-4 py-3 text-neutral-400 whitespace-nowrap">
                    {b.date ? new Date(b.date).toLocaleDateString('en-MY', { day: '2-digit', month: 'short' }) : '-'}
                    {b.timeSlot && <span className="block text-xs text-neutral-600">{b.timeSlot}</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 text-[0.65rem] uppercase tracking-wider border ${statusColors[b.status] || statusColors.unknown}`}>
                      {b.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-neutral-400">
                    {b.paymentAmount ? `RM ${b.paymentAmount.toFixed(2)}` : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'bookings' && !loading && bookings.length === 0 && (
        <div className="text-center py-20 text-neutral-600 text-sm">No bookings yet</div>
      )}

      {/* Service Promo Orders Table */}
      {activeTab === 'orders' && serviceOrders.length > 0 && (
        <div className="border border-neutral-800 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-800 text-left">
                {['Date', 'Customer', 'Vehicle', 'Service Date', 'Time Slot', 'Status', 'Deposit'].map(h => (
                  <th key={h} className="px-4 py-3 text-[0.65rem] uppercase tracking-widest text-neutral-600 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {serviceOrders.map(o => (
                <tr
                  key={o.id}
                  onClick={() => setSelectedOrder(o)}
                  className="border-b border-neutral-900 hover:bg-neutral-900/50 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3 text-neutral-400 whitespace-nowrap">
                    {o.createdAt ? new Date(o.createdAt).toLocaleDateString('en-MY', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{o.customerName}</p>
                    <p className="text-xs text-neutral-600">{o.customerPhone}</p>
                  </td>
                  <td className="px-4 py-3 text-neutral-300">{o.vehicleModel || '-'}</td>
                  <td className="px-4 py-3 text-neutral-400 whitespace-nowrap">
                    {o.preferredDate || '-'}
                  </td>
                  <td className="px-4 py-3 text-neutral-400 whitespace-nowrap">
                    {o.timeSlot || '-'}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 text-[0.65rem] uppercase tracking-wider border ${statusColors[o.status] || statusColors.unknown}`}>
                      {o.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-neutral-400">
                    {o.paymentAmount ? `RM ${o.paymentAmount.toFixed(2)}` : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'orders' && !loading && serviceOrders.length === 0 && (
        <div className="text-center py-20 text-neutral-600 text-sm">No service promo orders yet</div>
      )}

      {/* Booking Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-5 z-50" onClick={() => setSelected(null)}>
          <div
            className="bg-neutral-950 border border-neutral-800 w-full max-w-md max-h-[85vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-neutral-800">
              <h2 className="text-sm font-bold text-white">Booking Details</h2>
              <button onClick={() => setSelected(null)} className="text-neutral-600 hover:text-neutral-400 text-lg">&times;</button>
            </div>
            <div className="p-5 space-y-3 text-sm">
              {[
                { label: 'Booking ID', value: selected.id },
                { label: 'Customer', value: selected.name },
                { label: 'Phone', value: selected.phone },
                { label: 'Vehicle', value: selected.vehicleModel },
                { label: 'Location', value: selected.address },
                { label: 'Issue', value: selected.issues || '-' },
                { label: 'Inspection Date', value: selected.date ? new Date(selected.date).toLocaleDateString('en-MY', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }) : '-' },
                { label: 'Time Slot', value: selected.timeSlot || '-' },
                { label: 'Status', value: selected.status.replace('_', ' ').toUpperCase() },
                { label: 'Payment Status', value: selected.paymentStatus || '-' },
                { label: 'Amount', value: selected.paymentAmount ? `RM ${selected.paymentAmount.toFixed(2)}` : '-' },
                { label: 'Payment Method', value: selected.paymentMethod || '-' },
                { label: 'Bank', value: selected.paymentProvider || '-' },
                { label: 'Invoice No', value: selected.paymentInvoiceNo || '-' },
                { label: 'Booked At', value: selected.createdAt ? new Date(selected.createdAt).toLocaleString('en-MY') : '-' },
                { label: 'Payment Updated', value: selected.paymentUpdatedAt ? new Date(selected.paymentUpdatedAt).toLocaleString('en-MY') : '-' },
              ].map(row => (
                <div key={row.label} className="flex justify-between gap-4 py-2 border-b border-neutral-900">
                  <span className="text-neutral-600 text-xs uppercase tracking-wider shrink-0">{row.label}</span>
                  <span className="text-neutral-200 text-right break-all">{row.value}</span>
                </div>
              ))}

              {/* Verify Payment with Lean.x */}
              <div className="pt-4 border-t border-neutral-800">
                <button
                  onClick={() => verifyPayment(selected.id)}
                  disabled={verifying || selected.status === 'confirmed' || selected.status === 'completed'}
                  className="w-full px-4 py-2.5 text-xs font-medium border border-emerald-800/50 bg-emerald-950/30 text-emerald-400 hover:bg-emerald-900/40 hover:border-emerald-700 transition-colors disabled:opacity-40 disabled:cursor-default"
                >
                  {verifying ? 'Checking Lean.x...' : selected.status === 'confirmed' || selected.status === 'completed' ? 'Payment Verified ✓' : 'Verify Payment with Lean.x'}
                </button>
              </div>

              {/* Manual Status Update */}
              <div className="pt-4 border-t border-neutral-800">
                <p className="text-neutral-600 text-xs uppercase tracking-wider mb-2">Update Status</p>
                <div className="flex gap-2 flex-wrap">
                  {['confirmed', 'pending_payment', 'cancelled', 'completed'].map(s => (
                    <button
                      key={s}
                      disabled={updating || selected.status === s}
                      onClick={() => updateStatus(selected.id, s)}
                      className={`px-3 py-1.5 text-xs border transition-colors ${
                        selected.status === s
                          ? 'border-neutral-600 text-neutral-400 opacity-50 cursor-default'
                          : 'border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 cursor-pointer'
                      }`}
                    >
                      {updating ? '...' : s.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-5 z-50" onClick={() => setSelectedOrder(null)}>
          <div
            className="bg-neutral-950 border border-neutral-800 w-full max-w-md max-h-[85vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-neutral-800">
              <h2 className="text-sm font-bold text-white">Service Promo Order</h2>
              <button onClick={() => setSelectedOrder(null)} className="text-neutral-600 hover:text-neutral-400 text-lg">&times;</button>
            </div>
            <div className="p-5 space-y-3 text-sm">
              {[
                { label: 'Order ID', value: selectedOrder.id },
                { label: 'Customer', value: selectedOrder.customerName },
                { label: 'Phone', value: selectedOrder.customerPhone },
                { label: 'Email', value: selectedOrder.customerEmail },
                { label: 'Vehicle', value: selectedOrder.vehicleModel || '-' },
                { label: 'Service Date', value: selectedOrder.preferredDate || '-' },
                { label: 'Time Slot', value: selectedOrder.timeSlot || '-' },
                { label: 'Status', value: selectedOrder.status.replace('_', ' ').toUpperCase() },
                { label: 'Deposit Paid', value: selectedOrder.paymentAmount ? `RM ${selectedOrder.paymentAmount.toFixed(2)}` : '-' },
                { label: 'Full Service Value', value: selectedOrder.fullServicePrice ? `RM ${selectedOrder.fullServicePrice}` : '-' },
                { label: 'Payment Status', value: selectedOrder.paymentStatus || '-' },
                { label: 'Payment Method', value: selectedOrder.paymentMethod || '-' },
                { label: 'Bank', value: selectedOrder.paymentProvider || '-' },
                { label: 'Invoice No', value: selectedOrder.paymentInvoiceNo || '-' },
                { label: 'Notes', value: selectedOrder.notes || '-' },
                { label: 'Ordered At', value: selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleString('en-MY') : '-' },
                { label: 'Payment Updated', value: selectedOrder.paymentUpdatedAt ? new Date(selectedOrder.paymentUpdatedAt).toLocaleString('en-MY') : '-' },
              ].map(row => (
                <div key={row.label} className="flex justify-between gap-4 py-2 border-b border-neutral-900">
                  <span className="text-neutral-600 text-xs uppercase tracking-wider shrink-0">{row.label}</span>
                  <span className="text-neutral-200 text-right break-all">{row.value}</span>
                </div>
              ))}

              {/* Items list */}
              {selectedOrder.items.length > 0 && (
                <div className="pt-4 border-t border-neutral-800">
                  <p className="text-neutral-600 text-xs uppercase tracking-wider mb-2">Items</p>
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="flex justify-between py-1 text-xs">
                      <span className="text-neutral-300">{item.name} × {item.quantity}</span>
                      <span className="text-neutral-500">RM {item.price}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Verify Payment with Lean.x */}
              <div className="pt-4 border-t border-neutral-800">
                <button
                  onClick={() => verifyOrderPayment(selectedOrder.id)}
                  disabled={verifying || selectedOrder.status === 'confirmed' || selectedOrder.status === 'completed'}
                  className="w-full px-4 py-2.5 text-xs font-medium border border-emerald-800/50 bg-emerald-950/30 text-emerald-400 hover:bg-emerald-900/40 hover:border-emerald-700 transition-colors disabled:opacity-40 disabled:cursor-default"
                >
                  {verifying ? 'Checking Lean.x...' : selectedOrder.status === 'confirmed' || selectedOrder.status === 'completed' ? 'Payment Verified ✓' : 'Verify Payment with Lean.x'}
                </button>
              </div>

              {/* Manual Status Update */}
              <div className="pt-4 border-t border-neutral-800">
                <p className="text-neutral-600 text-xs uppercase tracking-wider mb-2">Update Status</p>
                <div className="flex gap-2 flex-wrap">
                  {['confirmed', 'pending_payment', 'cancelled', 'completed'].map(s => (
                    <button
                      key={s}
                      disabled={updating || selectedOrder.status === s}
                      onClick={() => updateOrderStatus(selectedOrder.id, s)}
                      className={`px-3 py-1.5 text-xs border transition-colors ${
                        selectedOrder.status === s
                          ? 'border-neutral-600 text-neutral-400 opacity-50 cursor-default'
                          : 'border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 cursor-pointer'
                      }`}
                    >
                      {updating ? '...' : s.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
