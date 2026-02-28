import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'One X Transmission — Gearbox Specialist Shah Alam'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          backgroundColor: '#0a0a0a',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Red accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '6px',
            height: '100%',
            backgroundColor: '#AB2020',
          }}
        />

        {/* Top-right overline */}
        <div
          style={{
            position: 'absolute',
            top: '72px',
            right: '80px',
            fontSize: '14px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#AB2020',
            fontWeight: 700,
          }}
        >
          Shah Alam · Selangor · Malaysia
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize: '68px',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.05,
            marginBottom: '24px',
            letterSpacing: '-0.02em',
          }}
        >
          Gearbox Specialist
          <br />
          <span style={{ color: '#AB2020' }}>Shah Alam.</span>
        </div>

        {/* Sub-text */}
        <div
          style={{
            fontSize: '22px',
            color: '#a3a3a3',
            marginBottom: '48px',
            lineHeight: 1.5,
          }}
        >
          Free Professional Diagnosis · CVT &amp; Automatic Specialists · 12-Month Warranty
        </div>

        {/* Divider */}
        <div
          style={{
            width: '64px',
            height: '2px',
            backgroundColor: '#AB2020',
            marginBottom: '28px',
          }}
        />

        {/* Brand name */}
        <div
          style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#737373',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          One X Transmission
        </div>
      </div>
    ),
    { ...size },
  )
}
