/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        surface: 'var(--surface)',
        card: 'var(--card)',
        border: 'var(--border)',
        'border-focus': 'var(--border-focus)',
        foreground: 'var(--foreground)',
        'muted-foreground': 'var(--muted-foreground)',
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'Courier New', 'monospace'],
        plexCondensed: ['"IBM Plex Sans Condensed"', 'sans-serif'],
        spaceMono: ['"Space Mono"', 'monospace'],
      },
      borderRadius: {
        'card': '12px',
      },
    },
  },
  plugins: [],
};

