/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        juanfe: {
          DEFAULT: '#85da1a',
          dark: '#6ab514',
          light: '#f0fbe6',
        },
      },
    },
  },
  plugins: [],
}