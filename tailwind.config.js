/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#FDFBF7',
        card: '#F7F2E6',
        'card-hover': '#F1EBD8',
        ink: '#231D1A',
        muted: '#6B625C',
        maroon: {
          DEFAULT: '#5A1F24',
          hover: '#70262C',
          900: '#5A1F24',
          700: '#70262C',
        },
        gold: {
          DEFAULT: '#B08D57',
          500: '#B08D57',
          300: '#D4B87C',
        },
      },
      fontFamily: {
        serif: ['var(--font-tamil-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-tamil-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
