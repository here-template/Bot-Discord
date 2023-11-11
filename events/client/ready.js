const client = require("../../index").client;
const {blue} = require("cli-color");
const {ActivityType, Status} = require("discord.js");

client.once("ready", async () => {
	client.user.setPresence({
		activities: [{name: "status personnalisé", type: ActivityType.Watching}],
		status: Status.Connecting,
	});
	await client.application.commands.set(client.commands.map((cmd) => cmd));
	console.log(blue.bold.underline(`${client.user.tag} est connecté à discord !`));
});
