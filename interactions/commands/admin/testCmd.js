const {ChatInputCommandInteraction, Client} = require("discord.js");

module.exports = {
	name: "test",
	description: "Une commande de test.",
	devOnly: true,
	/**
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 */
	runInteraction: async (client, interaction) => {
		await interaction.deferReply(); //si il ya un test long à faire
		return interaction.editReply("Aucun test de codé !");
	},
};
