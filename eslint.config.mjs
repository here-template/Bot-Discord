import globals from "globals";
import js from "@eslint/js";
import ts from "typescript-eslint";
import headers from "eslint-plugin-headers";

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ files: ["**/*.{js,mjs,cjs,ts}"] },
	{ languageOptions: { globals: globals.node } },
	js.configs.recommended,
	...ts.configs.recommended,
	{
		plugins: {
			headers,
		},
		files: ["internal/**/*.ts","index.ts"],
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
