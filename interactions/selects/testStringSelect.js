module.exports = {
	customID: "sendStringSelect",
	type: "text",
	/**
	 * @param {StringSelectMenuInteraction} interaction
	 * @param {Client} client
	 */
	runInteraction: async (client, interaction) => {
		const field = interaction.values[0];
		interaction.reply({content: `Vous avez choisi l'option ${field}`, ephemeral: true});
	},
};
