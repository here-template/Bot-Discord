import { defineConfig } from "tsup";
import fs from "fs";

export default defineConfig({
	format: ["cjs"],
	entryPoints: ["src/**/*.ts"],
    outDir: "dist",
    splitting: false, 
    clean: true,
    watch: true,
    minify: true,
    onSuccess: async () => {
        const packageJson = JSON.parse(fs.readFileSync("package.json", "utf-8"));
        packageJson.main = "index.js";
        delete packageJson.scripts.build;
        packageJson.scripts.start = "node .";
        delete packageJson.devDependencies;
        fs.writeFileSync("dist/package.json", JSON.stringify(packageJson, null, 4));
    }
});