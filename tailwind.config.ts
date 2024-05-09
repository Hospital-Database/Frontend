import type { Config } from "tailwindcss";

const config = {
	darkMode: ["selector", '[data-mantine-color-scheme="dark"]'],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	important: true,
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
				fg: "hsl(var(--fg))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					fg: "hsl(var(--primary-fg))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					fg: "hsl(var(--secondary-fg))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					fg: "hsl(var(--destructive-fg))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					fg: "hsl(var(--muted-fg))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					fg: "hsl(var(--accent-fg))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					fg: "hsl(var(--popover-fg))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					fg: "hsl(var(--card-fg))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
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
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
