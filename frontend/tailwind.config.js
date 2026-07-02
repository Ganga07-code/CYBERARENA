/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0B1020',
        card: '#151C2F',
        primary: '#3B82F6',
        secondary: '#8B5CF6',
        success: '#22C55E',
        danger: '#EF4444'
      },
      boxShadow: {
        cyber: '0 0 0 1px rgba(59,130,246,.25), 0 20px 45px rgba(0,0,0,.35)'
      }
    }
  },
  plugins: []
};
