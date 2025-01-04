import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import headers from "eslint-plugin-headers";

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ files: ["**/*.{js,mjs,cjs,ts}"] },
	{ languageOptions: { globals: globals.node } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	{
		plugins: {
			headers,
		},
		files: ["internal/**/*.ts"],
		rules: {
			"headers/header-format": [
				"error",
				{
					source: "file",
					path: "internal/header.txt",
					style: "jsdoc",
          trailingNewlines: 2,
					variables: {
						year: "2025",
						author: "Cleboost & Youritch from Here-Template",
					},
				},
			],
		},
	},
];
