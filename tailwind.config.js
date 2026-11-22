/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Premium Blue-Grey Editorial Theme Tokens
        minimal: {
          canvas: '#446879',
          'section-alt': '#385665',
          surface: '#FFFFFF',
          'surface-secondary': '#527789',
          'surface-dark': '#385665',
          'surface-subtle': '#527789',
        },
        bluegrey: {
          canvas: '#446879',
          lighter: '#527789',
          darker: '#385665',
          border: '#6D8795',
          btntext: '#304957',
          text: '#FFFFFF',
          secondary: '#E1E9ED',
          muted: '#C4D2D9',
        },
        ink: {
          primary: '#FFFFFF',
          secondary: '#E1E9ED',
          muted: '#C4D2D9',
          inactive: '#8CA4B1',
        },
        border: {
          default: '#6D8795',
          strong: '#8CA4B1',
          divider: '#527789',
          card: '#DEDFDC',
        },
        accent: {
          primary: '#FFFFFF',
          hover: '#E1E9ED',
          text: '#304957',
          success: '#64836F',
          warning: '#D4AF37',
          error: '#E06D6D',
          wash: '#527789',
          gold: '#FFFFFF',
          amber: '#D4AF37',
          theatre: '#E1E9ED',
          ott: '#C4D2D9',
          warm: '#FFFFFF',
        },
        cinema: {
          canvas: '#446879',
          surface: '#385665',
          card: '#FFFFFF',
          rule: '#6D8795',
          border: '#6D8795',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#E1E9ED',
          caption: '#C4D2D9',
        },
        paper: {
          canvas: '#446879',
          surface: '#FFFFFF',
          rule: '#6D8795',
          highlight: '#385665',
        },
        rating: {
          gold: '#A58B60',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'JetBrains Mono', 'Courier New', 'monospace'],
      },
      letterSpacing: {
        widest: '0.15em',
        tightest: '-0.02em',
      },
      maxWidth: {
        '7xl': '1380px',
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
        'card': '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
};
