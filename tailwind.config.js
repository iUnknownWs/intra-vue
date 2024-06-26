/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#1c1917",

          "secondary": "#d1d5db",

          "accent": "#a551e9",

          "neutral": "#4f5765",

          "base-100": "#f3f4f6",

          "base-200": "#90A3BF",

          "base-300": "#4f5765",

          "info": "#299efe",

          "success": "#84cc16",

          "warning": "#e4a91c",

          "error": "#b91c1c",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}

