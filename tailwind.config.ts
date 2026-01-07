import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Scans src folder
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Scans app folder
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // Scans pages folder
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Scans components
  ],
  theme: {
    extend: {
      colors: {
        // These are the custom colors your code relies on
        surface: "#0f172a", // Dark slate background
        primary: "#3b82f6", // Blue
        secondary: "#8b5cf6", // Purple
        accent: "#10b981", // Emerald green
      },
    },
  },
  plugins: [],
};
export default config;
