/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "calm-forest": "url('/src/assets/calm-forest-1.jpg')",
        "calm-lake": "url('/src/assets/calm-lake-1.jpg')",
      },
      fontFamily: {
        
      }
    },
  },
  plugins: [],
}

