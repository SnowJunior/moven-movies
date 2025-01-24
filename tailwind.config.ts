import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom_gradient': 'radial-gradient(at top right, #7e22ce, #ffffff)',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'primary': '#7e22ce',
      },
    },
  },
  plugins: [],
} satisfies Config;
