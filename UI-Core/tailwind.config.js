/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./projects/demo/src/**/*.{html,ts}",
    "./projects/public-intelligence/ui-core/src/**/*.{html,ts}",
    "./node_modules/@public-intelligence/ui-core/**/*.{html,ts,mjs,js}"
  ],
  theme: {
    extend: {
      colors: {
        'gob-blue': '#0056b3',
      },
    },
  },
  plugins: [],
};
