/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'quizverse-primary': '#4A6FFF',
        'quizverse-secondary': '#6C63FF',
        'quizverse-accent': '#FF6B6B',
        'quizverse-dark': '#1A1A2E',
        'quizverse-light': '#F8F8FF',
      }
    },
  },
  plugins: [],
}
