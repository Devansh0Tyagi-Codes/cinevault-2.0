/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: {
          canvas: '#F9F8F6',
          surface: '#F2EFE9',
          rule: '#E2DDD5',
          highlight: '#E8E4DC',
        },
        ink: {
          primary: '#121316',
          muted: '#484B52',
          caption: '#575B62',
        },
        accent: {
          warm: '#C2410C',
          hover: '#9A3412',
          wash: '#FAF0EB',
        },
        rating: {
          gold: '#9A4E08',
        },
      },
      fontFamily: {
        serif: ['Newsreader', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'JetBrains Mono', 'Courier New', 'monospace'],
      },
      letterSpacing: {
        widest: '0.18em',
        tightest: '-0.025em',
      },
      maxWidth: {
        '7xl': '1380px',
      },
    },
  },
  plugins: [],
};
