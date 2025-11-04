/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f6f5ff',
          100: '#ebe9ff',
          200: '#d8d5ff',
          300: '#c0bbfb',
          400: '#a4a0f4',
          500: '#8b87ee',
          600: '#6f69d7',
          700: '#5852b8',
          800: '#443f95',
          900: '#2e2b66',
          DEFAULT: '#8b87ee',
        },
        neon: {
          400: '#fde2b5',
          500: '#f9c97d',
          600: '#eda65b',
        },
        graphite: {
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
        },
      },
      boxShadow: {
        glow: '0 12px 40px rgba(80, 118, 255, 0.35)',
        'inner-glow': 'inset 0 0 0 1px rgba(255, 255, 255, 0.08)',
      },
      backgroundImage: {
        'stellar-grid': 'radial-gradient(circle at 15% 20%, rgba(139,135,238,0.15), transparent 55%), radial-gradient(circle at 75% 18%, rgba(249,201,125,0.18), transparent 55%), linear-gradient(160deg, #f8f9ff 0%, #f4f0ff 45%, #fff6ec 100%)',
        'glow-ring': 'radial-gradient(circle at center, rgba(249, 201, 125, 0.4), transparent 65%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -12px, 0)' },
        },
      },
    },
  },
  plugins: [],
}
