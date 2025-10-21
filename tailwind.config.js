import containerQueries from '@tailwindcss/container-queries'
// import forms from '@tailwindcss/forms'

export default {
  content: [
    './*.{htm,html}',
    './components/**/*.{html,js}',
    './js/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        'chari-green': '#4aaa8d',
        'chari-sky': '#e6f0f9',
        'chari-blue': '#101518',
        'chari-gray': '#5c778a'
      }
    }
  },
  plugins: [containerQueries]
}
