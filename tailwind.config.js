/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lol-primary': '#0A1428',
        'lol-secondary': '#1E2328',
        'lol-accent': '#C89B3C',
        'lol-gold': '#F0E6D2',
        'lol-blue': '#0BC5EA',
        'lol-purple': '#9333EA',
        'lol-red': '#DC2626',
        'lol-green': '#10B981',
      },
      fontFamily: {
        'display': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'hextech': "linear-gradient(135deg, #0A1428 0%, #1E2328 100%)",
      },
      animation: {
        'flip': 'flip 0.6s ease-in-out',
        'glow': 'glow 1s ease-in-out',
        'shake': 'shake 0.5s ease-in-out',
        'levelup': 'levelup 0.8s ease-out',
      },
      keyframes: {
        flip: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(12, 197, 234, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(12, 197, 234, 1)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-10px)' },
          '75%': { transform: 'translateX(10px)' },
        },
        levelup: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
