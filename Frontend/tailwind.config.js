// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        kanit: ['Kanit', 'sans-serif'],
        bokor: ['Bokor', 'cursive'],
      },
    },
  },
  plugins: [],
}
