/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFDF9',
          100: '#FFF6EC', // Primary background from reference
          200: '#FAECDC',
          300: '#F3DFC8',
          card: '#FFFDF8',
        },
        plum: {
          DEFAULT: '#3B1F3F', // Deep plum from reference
          light: '#532D59',
          lighter: '#6E3C75',
          dark: '#2B142F',
          deep: '#1D0C20',
          darkBg: '#150918',
        },
        pink: {
          accent: '#FF4F9A', // Vibrant hot pink headline accent
          hover: '#FF3388',
          light: '#FFE4F0',
        },
        orange: {
          accent: '#FF8A3D', // Warm sticker/badge orange
          hover: '#FF761F',
          light: '#FFF0E5',
          sun: '#FFA459',
        },
        softGray: {
          DEFAULT: '#7B6E7D',
          dark: '#A69AA8',
        }
      },
      fontFamily: {
        headline: ['"Barlow Condensed"', '"Bebas Neue"', 'sans-serif'],
        body: ['Manrope', '"DM Sans"', 'sans-serif'],
        script: ['Caveat', '"Reenie Beanie"', 'cursive'],
      },
      boxShadow: {
        'sticker': '0 8px 30px rgba(59, 31, 63, 0.08)',
        'sticker-hover': '0 16px 36px rgba(59, 31, 63, 0.14)',
        'polaroid': '0 12px 32px rgba(59, 31, 63, 0.12)',
        'polaroid-hover': '0 20px 48px rgba(59, 31, 63, 0.20)',
        'dark-card': '0 12px 32px rgba(0, 0, 0, 0.4)',
      },
      borderRadius: {
        '28': '28px',
        '32': '32px',
      },
      keyframes: {
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.04)' },
        }
      },
      animation: {
        'spin-slow': 'spin-slow 22s linear infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
        'pulse-subtle': 'pulse-subtle 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}

