import tailwindcs from "@tailwindcss/vite";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
	plugins: [tailwindcs(), solid()],
	server: {
		port: 3000,
	},
	build: {
		target: "esnext",
		sourcemap: true,
	},
});
