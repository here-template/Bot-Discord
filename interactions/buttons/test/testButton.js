module.exports = {
	customID: "sendButton",
	/**
	 * @param {ButtonInteraction} interaction
	 * @param {Client} client
	 */
	runInteraction: async (client, interaction) => {
		interaction.reply({content: "Vous avez cliqué sur le bouton !", ephemeral: true});
	},
};
