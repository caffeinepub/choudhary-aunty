import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,html,css}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        chart: {
          1: "oklch(var(--chart-1))",
          2: "oklch(var(--chart-2))",
          3: "oklch(var(--chart-3))",
          4: "oklch(var(--chart-4))",
          5: "oklch(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "oklch(var(--sidebar))",
          foreground: "oklch(var(--sidebar-foreground))",
          primary: "oklch(var(--sidebar-primary))",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground))",
          accent: "oklch(var(--sidebar-accent))",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground))",
          border: "oklch(var(--sidebar-border))",
          ring: "oklch(var(--sidebar-ring))",
        },
        // Brand-specific tokens
        saffron: "oklch(var(--saffron))",
        "saffron-light": "oklch(var(--saffron-light))",
        turmeric: "oklch(var(--turmeric))",
        terracotta: "oklch(var(--terracotta))",
        burgundy: "oklch(var(--burgundy))",
        cream: "oklch(var(--cream))",
        warmBrown: "oklch(var(--warmBrown))",
        gold: "oklch(var(--gold))",
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", '"Times New Roman"', "serif"],
        accent: ["Fraunces", '"Playfair Display"', "Georgia", "serif"],
        body: ["Figtree", '"Segoe UI"', "system-ui", "-apple-system", "sans-serif"],
        sans: ["Figtree", '"Segoe UI"', "system-ui", "-apple-system", "sans-serif"],
        serif: ['"Playfair Display"', "Georgia", '"Times New Roman"', "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        xs: "0 1px 3px 0 rgba(0,0,0,0.06)",
        warm: "0 4px 24px oklch(0.65 0.22 46 / 0.13), 0 1px 4px oklch(0.65 0.22 46 / 0.08)",
        "warm-lg": "0 10px 48px oklch(0.65 0.22 46 / 0.20), 0 4px 12px oklch(0.65 0.22 46 / 0.10)",
        deep: "0 10px 40px oklch(0.25 0.10 22 / 0.24)",
        inner: "inset 0 1px 4px oklch(0.65 0.22 46 / 0.12)",
      },
      backgroundImage: {
        "spice-gradient": "linear-gradient(135deg, oklch(var(--saffron)) 0%, oklch(var(--terracotta)) 100%)",
        "cream-gradient": "linear-gradient(180deg, oklch(var(--cream)) 0%, oklch(var(--muted)) 100%)",
        "hero-overlay": "linear-gradient(to bottom, oklch(var(--burgundy) / 0.3) 0%, oklch(var(--burgundy) / 0.75) 100%)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-warm": {
          "0%, 100%": { boxShadow: "0 0 0 0 oklch(0.62 0.19 43 / 0.4)" },
          "70%": { boxShadow: "0 0 0 10px oklch(0.62 0.19 43 / 0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 3s ease-in-out infinite",
        "pulse-warm": "pulse-warm 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
    },
  },
  plugins: [typography, containerQueries, animate],
};
