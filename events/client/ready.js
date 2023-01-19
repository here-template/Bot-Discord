const client = require("../../index").client;
const clc = require("cli-color");
const { ActivityType } = require("discord.js");

client.on("ready", async () => {
	client.user.setPresence({
		activities: [{ name: "la communauté", type: ActivityType.Watching }],
		status: "online",
	});
	
	await client.application.commands.set(client.commands.map((cmd) => cmd));
	console.log(clc.blue.bold.underline(`${client.user.tag} est connecté à discord.`));
});
