import { defineConfig } from "tsup";
import fs from "fs";
import { exec } from "child_process";
import { log } from "console";

export default defineConfig({
	format: ["cjs"],
	entryPoints: ["src/**/*.ts"],
	outDir: ".dev",
	splitting: false,
	silent: false,
	clean: true,
	watch: ["src"],
    onSuccess:"cp src/.env .dev/.env && cd .dev && node index.js",
});
