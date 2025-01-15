module.exports = {
	customID: "testModal",
	/**
	 * @param {ModalSubmitInteraction} interaction
	 * @param {Client} client
	 */
	runInteraction: async (client, interaction) => {
		console.log(interaction.components);
		const champs1 = interaction.fields.getTextInputValue("favoriteColorInput");
		const champs2 = interaction.fields.getTextInputValue("hobbiesInput");
		
		await interaction.reply({content: `Champs 1: **${champs1}**\nChamps 2: **${champs2}**`, ephemeral: true});
	},
};
