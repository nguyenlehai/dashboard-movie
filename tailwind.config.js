/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        primary12: 'hsl(var(--primary), 0.12)',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        badge: {
          DEFAULT: 'hsl(var(--badge))',
        },
        chatReceive: {
          DEFAULT: 'hsl(var(--chat-receive))',
        },
        orange: {
          DEFAULT: '#FF851B',
          1: '#FDB022',
        },
        blue: {
          DEFAULT: '#0E4D92',
          1: '#2E90FA',
          2: '#0074D9',
        },
        yellow: {
          DEFAULT: '#FAC940',
        },
        purple: {
          DEFAULT: '#7B61FF',
          1: '#9B59B6',
        },
        green: {
          DEFAULT: '#03AA82',
          500: '#12B76A',
          1: '#04BE76',
          2: '#008080',
        },
        error: {
          DEFAULT: '#F04438',
        },
        gradientStart: '#007cf0',
        gradientMiddle: '#00dfd8',
        gradientEnd: '#ff0080',
      },
      keyframes: {
        backgroundAnim: {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        pop: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
        'scroll-text': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        slideIn: {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        pop: 'pop 2000ms cubic-bezier(0.18, 0.67, 0.6, 1.22)',
        'scroll-text': 'scroll-text linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        backgroundAnim: 'backgroundAnim 8s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        slideIn: 'slideIn 0.5s ease-out forwards',
      },
      backgroundSize: {
        400: '400% 100%',
      },
      fontFamily: {
        sfp: ['var(--font-sfp-pro-display)'],
      },
      height: {
        'screen-d': '100dvh',
      },
      width: {
        'screen-d': '100dvw',
        fill: '-webkit-fill-available',
      },
      fontSize: {
        title: ['2rem', '2.375rem'],
      },
      opacity: {
        12: '0.12',
      },
      backgroundOpacity: {
        12: '0.12',
      },
    },
  },
  plugins: [],
};
