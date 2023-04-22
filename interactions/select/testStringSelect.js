module.exports = {
	customID: "sendstringselect",
	runInteraction: async (client, interaction) => {
		const field = interaction.values[0];
		interaction.reply({ content: `Vous avez choisi l'option ${field}`, ephemeral: true });
	},
};
