import '@/app/globals.css'

export const metadata = {
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-950 font-satoshi text-neutral-100">
      {children}
    </div>
  )
}
