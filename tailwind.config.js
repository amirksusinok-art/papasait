/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#030712',
          900: '#070f26',
          850: '#091536',
          800: '#0c1b40',
          750: '#0f2250',
          700: '#13285c',
          600: '#1b377a',
        },
        gold: {
          50: '#fffdf5',
          100: '#fef7dc',
          200: '#fdebb2',
          300: '#fcd980',
          400: '#f5c042',
          500: '#d4af37',
          600: '#b89224',
          700: '#8f6f15',
          800: '#6d5312',
          900: '#4d390a',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'gold-sm': '0 2px 10px rgba(212, 175, 55, 0.2)',
        'gold': '0 4px 20px rgba(212, 175, 55, 0.35)',
        'gold-lg': '0 10px 40px rgba(212, 175, 55, 0.45)',
        'gold-glow': '0 0 50px rgba(212, 175, 55, 0.4)',
        'card-dark': '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 1px 1px rgba(212, 175, 55, 0.2)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        ribbonWiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-3deg)' },
          '75%': { transform: 'rotate(3deg)' },
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'ribbon': 'ribbonWiggle 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
