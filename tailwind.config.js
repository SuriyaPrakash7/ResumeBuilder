/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ 
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
     colors:{
      txtprimary:"#555",
      txtLight:"#899",
      txtDark:"#222",
      bgPrimary: "#f1f1f1"
     } 
    },
  },
  plugins: [],
}

