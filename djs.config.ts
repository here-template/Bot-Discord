import type { Config } from "@djs-core/dev";

const token = process.env.TOKEN;
if (!token) {
	throw new Error("TOKEN environment variable is required");
}

export default {
	token,
	servers: ["1333211545920077896"],
} satisfies Config;
