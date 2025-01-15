import fs from "fs";
import { defineConfig } from "tsup";
import { spawn } from "child_process";
import path from "path";

export default defineConfig({
	format: ["cjs"],
	entryPoints: ["src/**/*.ts"],
	outDir: ".dev",
	splitting: false,
	silent: false,
	clean: true,
	watch: ["src"],
	onSuccess: async () => {
		fs.copyFileSync("src/.env", ".dev/.env");
		process.chdir(".dev");
		const command = process.platform === "win32" ? "node" : "node";
		const args = process.platform === "win32" ? ["."] : ["index.js"];
		const child = spawn(command, args, { stdio: "inherit" });
	}
});
