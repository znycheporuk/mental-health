import tailwindcs from "@tailwindcss/vite";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [tsconfigPaths(), tailwindcs(), solid()],
	server: {
		port: 3000,
	},
	build: {
		target: "esnext",
		sourcemap: true,
		rollupOptions: {
			output: {
				manualChunks(id: string) {
					if (id.includes("node_modules")) {
						const packagePath = id.split("node_modules/")[1].split("/");
						const isOrg = packagePath[0].startsWith("@");
						const packageName = isOrg
							? `${packagePath[0]}-${packagePath[1]}`
							: packagePath[0];
						return packageName;
					}
					// if (id.includes("/src/")) {
					// 	return id.split("/").at(-1)?.split(".")[0];
					// }
				},
			},
		},
	},
});
