/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Military Command Center Theme
        tactical: {
          bg: {
            primary: '#0a0e0f',
            secondary: '#151a1c',
            tertiary: '#1f2628',
          },
          olive: {
            50: '#f4f5f0',
            100: '#e8eade',
            200: '#d4d7c0',
            300: '#b8bd98',
            400: '#9ba373',
            500: '#7d8a5a',
            600: '#5d6b43',
            700: '#475335',
            800: '#3a442c',
            900: '#323a27',
          },
          orange: {
            DEFAULT: '#ff6b35',
            dark: '#cc5529',
          },
          blue: {
            DEFAULT: '#4a90e2',
            dark: '#2e5a8f',
          },
          red: {
            DEFAULT: '#d32f2f',
            dark: '#9a2323',
          },
          grid: '#1a2e2a',
          border: '#2d4540',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
        tactical: ['Rajdhani', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
