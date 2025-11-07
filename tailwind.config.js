/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          900: '#0c4a6e',
        },
        kebele: {
          green: '#16a34a',
          blue: '#2563eb',
          red: '#dc2626',
          yellow: '#d97706'
        }
      },
      fontFamily: {
        'ethiopic': ['Noto Sans Ethiopic', 'sans-serif'],
      }
    },
  },
  plugins: [],
}