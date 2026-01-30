module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f8fbff',
          100: '#eef6ff',
          200: '#d6e9ff',
          300: '#b8dbff',
          400: '#7cc0ff',
          500: '#3aa0ff',
          600: '#2b8be6',
          700: '#1f6fb3',
          800: '#174f80',
          900: '#0e2f4d',
        },
        accent: {
          50: '#fffaf6',
          100: '#fff1e6',
          200: '#ffdcb3',
          300: '#ffc48a',
          400: '#ffa65b',
          500: '#ff8a2e',
          600: '#e36f22',
          700: '#b85318',
          800: '#8b3b10',
          900: '#612508',
        },
      },
      boxShadow: {
        card: '0 6px 18px rgba(16,24,40,0.06)',
      },
    },
  },
  plugins: [],
}
