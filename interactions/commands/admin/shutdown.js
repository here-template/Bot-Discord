const {redBright} = require("cli-color");
const {ChatInputCommandInteraction, Client} = require("discord.js");

module.exports = {
	name: "stop",
	description: "Une commande pour stopper le bot.",
	/**
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 */
	runInteraction: async (client, interaction) => {
		interaction.reply("Shutdown du bot !");
		console.log(redBright.bold(`>> Shutdown (par ${interaction.user.username})! <<`));
		return client.destroy();
	},
};
