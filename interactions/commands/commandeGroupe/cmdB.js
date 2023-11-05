const {ChatInputCommandInteraction, Client} = require("discord.js");

module.exports = {
	name: "b",
	description: "2eme choix.",
	subCommande: true,//obligatoire
	/**
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 */
	runInteraction: async (client, interaction) => {
		return interaction.reply({content: "Vous avez utilisé l'option **B** !!"});
	},
};
