import type { Config } from "tailwindcss";

/* Design tokens de Encuadre expuestos a Tailwind.
   Los componentes complejos y reutilizables (LCD, dials, escenas, phone frame)
   viven en globals.css bajo @layer components para no inflar el JSX; el resto
   del layout usa utilidades Tailwind + estas variables. */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#14151A", 2: "#1E2027", 3: "#2A2D36" },
        paper: { DEFAULT: "#FBFAF7", 2: "#F2F0EA" },
        card: "#FFFFFF",
        line: "#E7E4DC",
        muted: { DEFAULT: "#71757F", 2: "#9A9EA7" },
        amber: { DEFAULT: "#F2A93B", deep: "#CE8114", soft: "#FBEBCB" },
        teal: { DEFAULT: "#12A594", deep: "#0C7D70", soft: "#D5F0EB" },
        danger: { DEFAULT: "#D9553B", soft: "#F8E1DB" },
      },
      fontFamily: {
        disp: ["var(--font-disp)", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: { xl2: "20px" },
      boxShadow: {
        soft: "0 1px 2px rgba(20,21,26,.04),0 8px 24px rgba(20,21,26,.06)",
        lg2: "0 20px 50px rgba(20,21,26,.18)",
      },
    },
  },
  plugins: [],
};
export default config;
