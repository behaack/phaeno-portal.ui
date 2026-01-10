/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'oklch(var(--bg) / <alpha-value>)',
        'bg-subtle': 'oklch(var(--bg-subtle) / <alpha-value>)',

        surface: 'oklch(var(--surface) / <alpha-value>)',
        'on-surface': 'oklch(var(--on-surface) / <alpha-value>)',

        fg: 'oklch(var(--fg) / <alpha-value>)',
        'fg-muted': 'oklch(var(--fg-muted) / <alpha-value>)',

        primary: 'oklch(var(--primary) / <alpha-value>)',
        'primary-soft': 'oklch(var(--primary-soft) / <alpha-value>)',

        success: 'oklch(var(--success) / <alpha-value>)',
        warning: 'oklch(var(--warning) / <alpha-value>)',
        error: 'oklch(var(--error) / <alpha-value>)',
      },

      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },

      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },

      transitionTimingFunction: {
        smooth: 'var(--ease-out)',
      },

      transitionDuration: {
        fast: 'var(--fast)',
        normal: 'var(--normal)',
      },
    },
  },
  plugins: [],
}
