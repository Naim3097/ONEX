import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#BC0000',
          'red-dark': '#950000',
          'red-light': '#D40000',
          black: '#000000',
          white: '#FFFFFF',
        },
        neutral: {
          950: '#0A0A0A',
          900: '#111111',
          850: '#1A1A1A',
          800: '#222222',
          700: '#333333',
          600: '#555555',
          500: '#777777',
          400: '#999999',
          300: '#BBBBBB',
          200: '#DDDDDD',
          150: '#E8E8E8',
          100: '#F0F0F0',
          50: '#F7F7F7',
        },
      },
      fontFamily: {
        satoshi: ['var(--font-satoshi)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '700' }],
        'h1': ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '700' }],
        'h2': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '500' }],
        'h3': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '500' }],
        'h4': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '500' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.7', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6', fontWeight: '400' }],
        'caption': ['0.8125rem', { lineHeight: '1.5', fontWeight: '300' }],
        'overline': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.1em', fontWeight: '500' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
      },
      maxWidth: {
        'content': '1200px',
        'wide': '1440px',
        'narrow': '800px',
      },
      transitionTimingFunction: {
        'ease-out-custom': 'cubic-bezier(0, 0.4, 0, 1)',
        'ease-in-custom': 'cubic-bezier(1, 0, 1, 0.6)',
        'ease-in-out-custom': 'cubic-bezier(0.2, 0, 0, 1)',
      },
      transitionDuration: {
        '334': '334ms',
        '667': '667ms',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'price-pop': {
          '0%, 100%': { transform: 'scale(1)',    color: '#fde047', filter: 'drop-shadow(0 0 22px rgba(250,204,21,0.65))' },
          '8%':        { transform: 'scale(1.28)', color: '#fffde7', filter: 'drop-shadow(0 0 65px rgba(255,255,200,1))' },
          '17%':       { transform: 'scale(1.18)', color: '#fef08a', filter: 'drop-shadow(0 0 38px rgba(250,204,21,0.85))' },
          '26%':       { transform: 'scale(1.26)', color: '#fffde7', filter: 'drop-shadow(0 0 58px rgba(255,255,200,0.95))' },
          '38%':       { transform: 'scale(1)',    color: '#fde047', filter: 'drop-shadow(0 0 22px rgba(250,204,21,0.65))' },
        },
        'underline-draw': {
          '0%, 6%':    { transform: 'scaleX(0)', opacity: '0', transformOrigin: 'left center' },
          '20%, 68%':  { transform: 'scaleX(1)', opacity: '1', transformOrigin: 'left center' },
          '82%, 100%': { transform: 'scaleX(0)', opacity: '0', transformOrigin: 'right center' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'price-pop': 'price-pop 3.5s ease-in-out infinite',
        'underline-draw': 'underline-draw 3.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
