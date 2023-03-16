import { defineConfig } from "vite";

export default defineConfig({
	build: {
		emptyOutDir: true,
		outDir: "dist",
		sourcemap: true,
		lib: {
			entry: {
				index: "./src/index.ts",
				r: "./src/r.ts",
				python: "./src/python.ts",
				sql: "./src/sql.ts",
			},
			formats: ["es", "cjs"],
		},
	},
});
