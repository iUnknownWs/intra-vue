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

          "accent": "#7c2d12",

          "neutral": "#1c1917",

          "base-100": "#f3f4f6",

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

