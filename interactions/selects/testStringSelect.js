module.exports = {
	customID: "sendstringselect",
	type: "text",
	runInteraction: async (client, interaction) => {
		const field = interaction.values[0];
		interaction.reply({ content: `Vous avez choisi l'option ${field}`, ephemeral: true });
	},
};
