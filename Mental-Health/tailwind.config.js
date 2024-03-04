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
        orange:{
          900:"#e68a00"
        },
        yellow:{
          900: "#ffeecd"
        },
        gray:{
          900: "#54656F"
        }
      }
    },
  },
  plugins: [],
}

