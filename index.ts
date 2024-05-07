// Creation Date: 07.05.2024
// Description: Main file of the bot

// Import the CustomClient class
import {CustomClient} from "./class/CustomClient";

// Load the .env file
import * as dotenv from 'dotenv'
dotenv. config()

// Import the Collection class from discord.js
import {Collection} from "discord.js";
import {greenBright, redBright} from "cli-color";

const client: CustomClient = new CustomClient();

console.log(greenBright.bold.underline("Lancement du bot :"));

// Load the config file and set it to the client
// @ts-ignore
import configFile from "./config.json"
import {Config} from "./interface/config";
const config: Config = configFile as Config
client.config = config;

client.commands = new Collection();
client.buttons = new Collection();
client.selects = new Collection();
client.modals = new Collection();
export {client};


// Start the API
// require("./api/api");
// import

// Start the handlers
["command", "event", "button"].forEach(async (handler: string) => {
	await import(`./handlers/preload/${handler}`).then((e) => e.default(client));
});

console.log(greenBright.bold.underline("Connecting to Discord..."));

//Connection du bot :
client.login(process.env.TOKEN).catch((reason) => {
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