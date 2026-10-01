/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          950: '#070708',
          900: '#0d0d0f',
          850: '#121215',
          800: '#18181d',
          700: '#22222a',
          600: '#32323c',
          400: '#71717a',
          200: '#d4d4d8',
          100: '#f4f4f5',
          50: '#fafafa',
        },
        gold: {
          300: '#e8d29b',
          400: '#d8b96f',
          500: '#c5a059',
          600: '#a7813a',
        },
        cream: {
          50: '#faf8f5',
          100: '#f5f0e8',
          200: '#eae2d3',
          300: '#dcceb8',
        }
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      perspective: {
        '1000': '1000px',
        '2000': '2000px',
      },
      boxShadow: {
        'luxury': '0 20px 50px rgba(0, 0, 0, 0.5)',
        'luxury-gold': '0 10px 40px rgba(197, 160, 89, 0.15)',
        'glow': '0 0 35px rgba(216, 185, 111, 0.25)',
      },
    },
  },
  plugins: [],
};
