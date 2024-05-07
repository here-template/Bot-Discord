// Creation Date: 07.05.2024
// Template Version: 1.0
// Created By: Cleboost & Youritch in My-Template Organization
// Description: Main file of the bot


import {CustomClient} from "./class/CustomClient";
import * as dotenv from 'dotenv'
import {Collection} from "discord.js";
import {greenBright, magenta, redBright} from "cli-color";
import Logger from "./class/logger/Logger";
// Load the config file and set it to the client
// @ts-ignore
import configFile from "./config.json"
import {Config} from "./interface/config";
import Loader from "./class/logger/Loader";
import {AsciiTree} from "oo-ascii-tree";

dotenv. config()


const client: CustomClient = new CustomClient();
const logger: Logger = new Logger();

const config: Config = configFile as Config
client.config = config;
client.logger = logger;

client.commands = new Collection();
client.buttons = new Collection();
client.selects = new Collection();
client.modals = new Collection();
export {client};


// Start the API
// require("./api/api");
// import

// Start the handlers
// @ts-ignore


(async () => {
	const loader: Loader = new Loader();
	loader.start()
	const tree = new AsciiTree("bot");
	for (const handler of ["command", "event", "button"]) {
		loader.setText("Loading of " + handler);
		const module = await import(`./handlers/preload/${handler}`);
		await module.default(client, loader, tree);
	}
	loader.stop();
	tree.printTree();
})().then(() => {
	console.log(magenta.bold.underline("All handlers loaded !"));
	process.stdout.write(greenBright.bold.underline("Connecting to Discord..."));
	client.login(process.env.TOKEN).catch((reason) => {
		process.stdout.write('\x1B[0G\x1B[2K');
		console.log(redBright.bold("Discord connection failed !"));
		switch (reason.code) {
			case "ENOTFOUND":
				console.log(redBright("> Error: No internet connection !"));
				break;
			case "TokenInvalid":
				console.log(redBright("> Token invalide ! Please check your token in the .env file or reset it (https://discord.com/developers/applications)!"));
				break;
			default:
				if (process.env.DEBUG === "false") console.log(reason);
				break;
		}
		if (process.env.DEBUG === "true") console.log(reason);
	});
})