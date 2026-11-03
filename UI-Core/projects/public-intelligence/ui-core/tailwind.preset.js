/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          700: 'var(--sdd-color-primary-700)', // #0F539C
          300: 'var(--sdd-color-primary-300)', // #66A1DE
          100: 'var(--sdd-color-primary-100)', // #9FD0FD
        },
        gray: {
          50: '#F8F8F8', // Override for header background
        },
        surface: {
          DEFAULT: 'var(--sdd-color-surface)',
          muted: 'var(--sdd-color-surface-muted)',
        },
        success: 'var(--sdd-color-success-700)',
        danger: 'var(--sdd-color-danger-700)',
        warning: 'var(--sdd-color-warning-700)',
        info: 'var(--sdd-color-info-700)',
      },
      fontFamily: {
        sans: ['var(--sdd-font-family-sans)'],
      },
      borderRadius: {
        sm: 'var(--sdd-radius-1)',
        DEFAULT: 'var(--sdd-radius-2)',
        lg: 'var(--sdd-radius-3)',
      },
      spacing: {
        // SDD spacing roughly aligns with Tailwind default 4px grid
        // but we can map specific SDD tokens if needed
      }
    },
  },
  plugins: [],
}
