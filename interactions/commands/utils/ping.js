const { CommandInteraction, Client } = require("discord.js");

module.exports = {
	name: "ping",
	description: "Permet d'obtenir la latence du bot.",
	cooldown: 30,
	/**
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	run: async (client, interaction) => {
		interaction.reply({ content: `Le bot à une latence de :\`${client.ws.ping}ms\`` });
	},
};
