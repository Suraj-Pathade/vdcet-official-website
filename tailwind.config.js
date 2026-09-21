/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        apple: {
          bg: '#fbfbfd',
          card: '#ffffff',
          darkBg: '#000000',
          darkCard: '#1c1c1e',
          text: '#1d1d1f',
          subtext: '#86868b',
          blue: '#0066cc',
          blueHover: '#0077ed',
          border: 'rgba(0, 0, 0, 0.08)',
          darkBorder: 'rgba(255, 255, 255, 0.12)',
        },
      },
      boxShadow: {
        'apple-sm': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'apple-md': '0 4px 20px rgba(0, 0, 0, 0.06)',
        'apple-lg': '0 12px 40px rgba(0, 0, 0, 0.08)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
