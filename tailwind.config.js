/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        // System stack only — the venue wifi cannot be trusted with a font host.
        sans: [
          'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto',
          'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif',
        ],
        mono: [
          'ui-monospace', 'SFMono-Regular', 'SF Mono', 'Menlo', 'Consolas',
          'Liberation Mono', 'monospace',
        ],
      },
      keyframes: {
        bump: {
          '0%, 100%': { transform: 'none' },
          '35%': { transform: 'translateY(-4px) scale(1.05)' },
        },
        fade: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'none' },
        },
        pulse2: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
      },
      animation: {
        bump: 'bump 0.5s ease',
        fade: 'fade 0.25s ease',
        pulse2: 'pulse2 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
