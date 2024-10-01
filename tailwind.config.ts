import type { Config } from "tailwindcss";

// const config: Config = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         background: "var(--background)",
//         foreground: "var(--foreground)",
//       },
//     },
//   },
//   plugins: [],
// };
// export default config;

// import { Config } from "tailwindcss";

const config: Config = {
  mode: "jit",
  content: [
    // './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    // './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    // './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "720px",
      lg: "960px",
      "lg-max": { max: "960px" },
      xl: "1140px",
      "2xl": "1400px",
      "3xl": "1441px",
    },
    extend: {
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
        jakarta: ['"Plus Jakarta Sans"', "sans-serif"],
      },
      spacing: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
      },
      backgroundSize: {
        "200%": "200% auto",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(128deg, #EF4136 32.39%, #F7941D 93.22%)",
        bkgline: "url('/src/assets/images/bkgline.png')",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        dark: "#080A12",
        main: {
          bg: "#F9FAFB",
          100: "#E5EFFF",
          200: "#B7D3FF",
          300: "#8AB7FF",
          400: "#5C9BFF",
          500: "#2E7FFF",
          600: "#0061F9",
          700: "#0051D0",
          800: "#0041A7",
          900: "#00317F",
          901: "#002156",
          902: "#001433",
          903: "#030407",
        },
        sec: {
          100: "#F8F9FF",
          200: "#E4E9FF",
          300: "#D0D9FF",
          400: "#BBC8FF",
          500: "#A1AEE9",
          600: "#8391CC",
          700: "#6876AE",
          800: "#505D91",
          900: "#3B4674",
          901: "#283157",
          902: "#181E34",
        },
      },
      boxShadow: {
        "shadow-one": "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
      },
      animation: {
        fadeIn: "fadeIn 1s forwards",
        fadeOut: "fadeOut 1s forwards",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        fadeOut: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
      },
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "2rem",
        xl: "2rem",
        "2xl": "10rem",
      },
    },
  },
  plugins: [],
};
export default config;
