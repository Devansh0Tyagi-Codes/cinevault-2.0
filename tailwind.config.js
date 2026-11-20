/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#080B11',
        foreground: '#F8FAFC',
        card: {
          DEFAULT: '#0F141C',
          foreground: '#F8FAFC',
          hover: '#161D27',
        },
        popover: {
          DEFAULT: '#0F141C',
          foreground: '#F8FAFC',
        },
        cinema: {
          obsidian: '#080B11',
          carbon: '#0F141C',
          elevated: '#161D27',
          surface: '#1E2633',
          border: 'rgba(255, 255, 255, 0.08)',
          glow: 'rgba(229, 9, 20, 0.25)',
        },
        crimson: {
          DEFAULT: '#E50914',
          50: '#FDE8E8',
          100: '#FBD5D5',
          200: '#F8B4B4',
          300: '#F98080',
          400: '#F05252',
          500: '#E50914',
          600: '#C81E1E',
          700: '#9B1C1C',
          800: '#771D1D',
          900: '#4A1D1D',
        },
        gold: {
          DEFAULT: '#F5C518',
          400: '#FCD34D',
          500: '#F5C518',
          600: '#D97706',
        },
        muted: {
          DEFAULT: '#1E2633',
          foreground: '#94A3B8',
        },
        accent: {
          DEFAULT: 'rgba(229, 9, 20, 0.15)',
          foreground: '#F8FAFC',
        },
      },
      borderRadius: {
        lg: '0.75rem',
        md: '0.5rem',
        sm: '0.25rem',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Cabinet Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
