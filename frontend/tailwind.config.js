/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Chakra Petch"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      colors: {
        base: {
          950: '#070B14',
          900: '#0B1220',
          850: '#0E1626',
          800: '#111A2E',
          700: '#16213A',
          600: '#1E2C48',
          500: '#2B3B5C'
        },
        line: '#233150',
        muted: '#8B98B5',
        faint: '#5B6785',
        risk: {
          critical: '#E23636',
          criticalDim: '#3A1616',
          high: '#F0883E',
          highDim: '#3A2410',
          moderate: '#EBC94C',
          moderateDim: '#3A3110',
          low: '#33C481',
          lowDim: '#0F3324',
          info: '#3B82F6',
          infoDim: '#132546'
        },
        accent: {
          cyan: '#3ED6D0',
          DEFAULT: '#3ED6D0'
        }
      },
      boxShadow: {
        panel: '0 1px 0 rgba(255,255,255,0.03), 0 8px 24px -12px rgba(0,0,0,0.5)',
        glow: '0 0 0 1px rgba(62,214,208,0.25), 0 0 24px -4px rgba(62,214,208,0.35)'
      },
      backgroundImage: {
        contour: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cg fill='none' stroke='%231E2C48' stroke-width='1'%3E%3Cpath d='M0 100 Q50 60 100 100 T200 100'/%3E%3Cpath d='M0 130 Q50 90 100 130 T200 130'/%3E%3Cpath d='M0 70 Q50 30 100 70 T200 70'/%3E%3C/g%3E%3C/svg%3E\")"
      },
      animation: {
        'radar-sweep': 'radar-sweep 4s linear infinite',
        'pulse-ring': 'pulse-ring 2.2s cubic-bezier(0.4,0,0.6,1) infinite',
        'fade-up': 'fade-up 0.4s ease-out both'
      },
      keyframes: {
        'radar-sweep': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: 0.7 },
          '70%': { transform: 'scale(1.6)', opacity: 0 },
          '100%': { transform: 'scale(1.6)', opacity: 0 }
        },
        'fade-up': {
          '0%': { transform: 'translateY(6px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 }
        }
      }
    }
  },
  plugins: []
}
