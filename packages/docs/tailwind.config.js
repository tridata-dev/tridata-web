/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class", '[data-theme="dark"]'],
	content: [
		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-sans)", ...fontFamily.sans],
				serif: ["var(--font-serif)", ...fontFamily.serif],
				mono: ["var(--font-mono)", ...fontFamily.mono],
			},
			keyframes: {
				"accordion-down": {
					from: { height: 0 },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: 0 },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
