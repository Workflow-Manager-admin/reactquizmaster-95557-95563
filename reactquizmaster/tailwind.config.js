/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./public/index.html"
    ],
    options: {
      safelist: [
        'bg-green-500',
        'bg-yellow-500',
        'bg-red-500',
        /^bg-.*-500\/20$/,
        /^text-.*-300$/,
        /^border-.*-500\/50$/
      ]
    }
  },
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
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
      backgroundColor: ['active', 'hover'],
      textColor: ['active', 'hover'],
    },
  },
  plugins: [],
}
