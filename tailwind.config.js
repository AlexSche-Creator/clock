/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F7FAFF',
        ink: '#0B1B36',
        inkSoft: '#5B6A86',
        inkMute: '#8A9AB7',
        line: '#E4ECF7',
      },
      boxShadow: {
        card: '0 18px 40px -16px rgba(20, 50, 110, 0.18), 0 6px 14px -8px rgba(20, 50, 110, 0.08)',
        cardLg: '0 28px 60px -22px rgba(20, 50, 110, 0.28), 0 10px 20px -10px rgba(20, 50, 110, 0.12)',
        glass: '0 24px 60px -28px rgba(15, 40, 100, 0.30), 0 8px 24px -12px rgba(15, 40, 100, 0.12)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
