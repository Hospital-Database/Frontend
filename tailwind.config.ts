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
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				fg: "hsl(var(--fg))",
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
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
