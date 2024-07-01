/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'left': '-6px 2px 30px -11px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}

