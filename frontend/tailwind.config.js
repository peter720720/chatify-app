import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ADD THIS SECTION
      animation: {
        'border': 'border-spin 3s linear infinite',
      },
    },
  },
  plugins: [daisyui],
};
