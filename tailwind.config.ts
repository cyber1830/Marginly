import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FAF7F2",
        ink: "#1B1714",
        forest: "#0F5B3A",
        tomato: "#E4472B",
        saffron: "#F2A93B",
        night: "#14110F",
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        sans: ["DM Sans", "ui-sans-serif", "system-ui"],
      },
      borderRadius: { card: "20px" },
    },
  },
  plugins: [],
};
export default config;
