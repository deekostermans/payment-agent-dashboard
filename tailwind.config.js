/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: 'var(--color-brand)',
          hover: 'var(--color-brand-hover)',
        },
        surface: 'var(--surface-1)',
        page: 'var(--page-plane)',
        ink: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        hairline: 'var(--border-hairline)',
        gridline: 'var(--gridline)',
        good: 'var(--status-good)',
        warning: 'var(--status-warning)',
        critical: 'var(--status-critical)',
        deposit: 'var(--type-deposit)',
        payout: 'var(--type-payout)',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        panel: '0 10px 40px rgba(11, 11, 11, 0.12)',
      },
    },
  },
  plugins: [],
}
