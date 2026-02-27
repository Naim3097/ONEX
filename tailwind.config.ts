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
          red: '#AB2020',
          'red-dark': '#8A1A1A',
          'red-light': '#C43030',
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
    },
  },
  plugins: [],
}

export default config
