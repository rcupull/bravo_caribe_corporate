import type { Config } from "tailwindcss";

const getCheckEditorMaxHClasses = () => {
  const hs = [
    5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95,
    100,
  ];

  return hs.reduce(
    (acc, h) => ({
      ...acc,
      [`.check-editor-max-h-${h}vh`]: {
        ".ck .ck-content": {
          maxHeight: `${h}vh`,
        },
      },
      [`.check-editor-min-h-${h}vh`]: {
        ".ck .ck-content": {
          minHeight: `${h}vh`,
        },
      },
    }),
    {}
  );
};

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwindcss/plugin")(({ addUtilities, theme }) => {
      addUtilities({
        ".no-bullets": {
          listStyleType: "none",
        },
        ".hyperlink": {
          color: theme("colors.blue.600"),
          textDecorationLine: "underline",
        },
        ".hyperlink:visited": {
          color: theme("colors.purple.600"),
          textDecorationLine: "underline",
        },
        ".no-preflight a": {
          color: theme("colors.primary"),
        },
        ".no-preflight a:hover": {
          textDecorationLine: "underline",
        },
        ////////////////////////////////////HX
        ".no-preflight h2": {
          fontSize: "1.5rem",
          fontWeight: "bold",
        },
        ////////////////////////////////////LISTS
        ".no-preflight ul": {
          listStyleType: "disc",
          listStylePosition: "inside",
        },
        ".no-preflight ol": {
          listStyleType: "decimal",
          listStylePosition: "inside",
        },
        ".no-preflight ul ul, ol ul": {
          listStyleType: "circle",
          listStylePosition: "inside",
          marginLeft: "15px",
        },
        ".no-preflight ol ol, ul ol": {
          listStyleType: "lower-latin",
          listStylePosition: "inside",
          marginLeft: "15px",
        },
        ".no-preflight li span": {
          display: "inline !important",
        },
        ...getCheckEditorMaxHClasses(),
      });
    }),
  ],
} satisfies Config;
