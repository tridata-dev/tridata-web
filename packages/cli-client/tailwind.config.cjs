/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", "sans-serif"],
				mono: ["IBM Plex Mono", "monospace"],
			},
		},
	},
	plugins: [],
};
