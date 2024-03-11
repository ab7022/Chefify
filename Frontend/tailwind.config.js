/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.html",
    "./src/**/*.js",
    "./src/**/*.jsx",
    "./src/**/*.tsx",

  ],
  
  theme: {
    extend: {
      colors:{
        green:{
          900:"#128C7E"
        },
        yellow:{
          900: "#ffeecd"
        },
        gray:{
          900: "#54656F"
        }
      },
      fontSize:{
        'small': '.6rem'
      }
    },
  },
  plugins: [],
}

