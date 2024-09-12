/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      colors: {
        'dark': '#4f4745'
      },
      backgroundImage: {
        'doctors': "url('public/imgs/doctors.png')",
        'search': "url('public/imgs/search.svg')"
      },
      fontFamily: {
        'spectral': ['Spectral'],
        'sans': ['Montserrat']
      },
    },
    header: {
      height: '50rem'
    }
    
  },
  plugins: [],
}

