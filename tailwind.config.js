export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#0b5ea8', dark: '#083f73', light: '#e8f2fb' },
        accent: { DEFAULT: '#14a89b', dark: '#0e857a' },
        ink: '#1f2937',
      },
      fontFamily: { sans: ['Poppins', 'system-ui', 'sans-serif'] },
      maxWidth: { page: '1200px' },
    },
  },
  plugins: [],
};
