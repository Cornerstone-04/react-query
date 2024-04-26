/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        "fit-screen": "calc(100vh - 80px)",
      },
      maxHeight: {
        "fit-screen": "calc(100vh - 80px)",
      },
    },
  },
  plugins: [],
};
