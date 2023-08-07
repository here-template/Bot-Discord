const {ChatInputCommandInteraction, Client} = require("discord.js");

module.exports = {
	name: "ping",
	description: "Permet d'obtenir la latence du bot.",
	cooldown: 30,
	/**
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 */
	runInteraction: async (client, interaction) => {
		interaction.reply({content: `Le bot a une latence de \`${client.ws.ping}ms\``});
	},
};
