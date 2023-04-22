module.exports = {
	customID: "testmodal",
	runInteraction: async (client, interaction) => {
		const champs1 = interaction.data.values[0];
		const champs2 = interaction.data.values[1];

		await interaction.reply({content: `Champs 1: ${champs1}\nChamps 2: ${champs2}`, ephemeral: true});
	},
};
